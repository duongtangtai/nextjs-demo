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
    let response: Response;
    try {
        const {createAndUpdateDtos, deletedIds} = await request.json();
        console.log("POST REQUEST")
        //convert formData => array of roleInfo
        let dtos: any[]= [];
        let index : string = "";
        for (const key_name in createAndUpdateDtos) {
            const arr = key_name.split("_");
            if (arr[0] !== index) { //new item
                index = arr[0];
                dtos.push({
                    [arr[1]] : createAndUpdateDtos[key_name]
                })
            } else { //old item
                dtos[dtos.length-1] = {
                    ...dtos[dtos.length-1],
                    [arr[1]] : createAndUpdateDtos[key_name]
                }
            }
        }
        //separate createDtos and updateDtos
        const createRoleDtos : Omit<RoleInfo, "id" | "key" >[] = [];
        const updateRoleDtos : Omit<RoleInfo, "key">[] = [];
        dtos.forEach(dto => dto.id === "" ? createRoleDtos.push({
            name: dto.name,
            description: dto.description
        }) : updateRoleDtos.push(dto))

        console.log("createDtos")
        console.log(createRoleDtos)
        console.log("updateDtos")
        console.log(updateRoleDtos)
        console.log("deletedIds")
        console.log(deletedIds)
        response = await requestHandler({
            path: `${BE_ROLE}/modify`,
            method: "POST",
            payload: {
                createRoleDtos,
                updateRoleDtos,
                deletedIds
            },
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