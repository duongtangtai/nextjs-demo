import { NextRequest, NextResponse } from "next/server";
import { requestHandler } from "@/lib/Request.service";
import { BE_USER, BE_USER_ADD_ROLES } from "@/lib/utils";

export async function GET(request: NextRequest) {
    let response: Response;
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username") ?? "";
        const email = searchParams.get("email") ?? "";
        console.log(`Get users with username =  ${username} and email = ${email}`)
        response = await requestHandler({
            path: `${BE_USER}?username=${username}&email=${email}`,
            method: "GET",
            isTokenRequired: true,
        })
        if (response.status === 401) {
            NextResponse.redirect("/login")
        }
    } catch (e: any) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        response = new Response(JSON.stringify(e.message), { status: 400 })
    }
    return response
}

export async function POST(request: NextRequest) {
    let response: Response;
    try {
        const { username, email, password, roles } = await request.json();
        response = await requestHandler({
            path: `${BE_USER}`,
            method: "POST",
            payload: {
                username,
                email,
                password,
            },
            isTokenRequired: true,
        })
        if (response.status === 401) {
            NextResponse.redirect("/login")
        }
        if (response.status === 403) {
            NextResponse.redirect
        }
        const responseDto: ResponseDTO = await response.json()
        if (responseDto.hasErrors) {
            return response = new Response(JSON.stringify(responseDto), { status: responseDto.statusCode })
        }
        const { content } = responseDto
        const { id : userId} = content as UserInfo
        response = await requestHandler({
            path: `${BE_USER_ADD_ROLES}`,
            method: "POST",
            payload: {
                userId,
                roleNames: roles
            },
            isTokenRequired: true,
        })
    } catch (e: any) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        response = new Response(JSON.stringify(e.message), { status: 400 })
    }
    return response
}

export async function PUT(request: NextRequest) {
    let response: Response;
    try {
        const { id, username, email, password, roles } = await request.json();
        response = await requestHandler({
            path: `${BE_USER}/${id}`,
            method: "PUT",
            payload: {
                username,
                email,
                password,
            },
            isTokenRequired: true,
        })
        if (response.status === 401) {
            NextResponse.redirect("/login")
        }
        const responseDto: ResponseDTO = await response.json()
        console.log("FINISHED UPDATE")
        console.log(responseDto)
        if (responseDto.hasErrors) {
            return response = new Response(JSON.stringify(responseDto), { status: responseDto.statusCode })
        }
        const { content } = responseDto
        const { id : userId} = content as UserInfo
        response = await requestHandler({
            path: `${BE_USER_ADD_ROLES}`,
            method: "POST",
            payload: {
                userId,
                roleNames: roles
            },
            isTokenRequired: true,
        })
        // console.log("add roles:")
        // console.log(await response.json())
    } catch (e: any) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        response = new Response(JSON.stringify(e.message), { status: 400 })
    }
    return response
}

export async function DELETE(request: NextRequest) {
    let response: Response;
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id") ?? "";
        response = await requestHandler({
            path: `${BE_USER}/${id}`,
            method: "DELETE",
            isTokenRequired: true,
        })
        if (response.status === 401) {
            NextResponse.redirect("/login")
        }
    } catch (e: any) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        response = new Response(JSON.stringify(e.message), { status: 400 })
    }
    return response
}

