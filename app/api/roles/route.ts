import { NextRequest, NextResponse } from "next/server";
import { requestHandler } from "@/lib/Request.service";
import { BE_ROLE } from "@/lib/utils";

export async function GET(request: NextRequest) {
    let response: Response;
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get("name") ?? "";
        const description = searchParams.get("description") ?? "";
        console.log(`Get roles with name =  ${name} and description = ${description}`)
        response = await requestHandler({
            path: `${BE_ROLE}?name=${name}&description=${description}`,
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
    // let response: Response;
    // try {
    //     const formData = await request.json();
    //     response = await requestHandler({
    //         path: `${BE_USER}`,
    //         method: "POST",
    //         payload: formData,
    //         isTokenRequired: true,
    //     })
    //     if (response.status === 401) {
    //         NextResponse.redirect("/login")
    //     }
    // } catch (e: any) {
    //     if (!(e instanceof Error)) {
    //         e = new Error(e);
    //     }
    //     response = new Response(JSON.stringify(e.message), { status: 400 })
    // }
    // return response
}

export async function DELETE(request: NextRequest) {
    // console.log("FE API DELETE")
    // let response: Response;
    // try {
    //     const { searchParams } = new URL(request.url);
    //     const id = searchParams.get("id") ?? "";
    //     response = await requestHandler({
    //         path: `${BE_USER}/${id}`,
    //         method: "DELETE",
    //         isTokenRequired: true,
    //     })
    //     if (response.status === 401) {
    //         NextResponse.redirect("/login")
    //     }
    // } catch (e: any) {
    //     if (!(e instanceof Error)) {
    //         e = new Error(e);
    //     }
    //     response = new Response(JSON.stringify(e.message), { status: 400 })
    // }
    // return response
}