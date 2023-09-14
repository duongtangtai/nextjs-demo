import { NextRequest } from "next/server";
import { BE_AUTH_REGISTER } from "@/lib/utils";
import { requestHandler } from "@/lib/Request.service";

export async function POST(request: NextRequest) {
    console.log("Register")
    let response: Response;
    try {
        const { email, password, username } = await request.json();
        response  = await requestHandler({
            request,
            path: BE_AUTH_REGISTER,
            method: "POST",
            payload: { email, password, username },
        })
    } catch (e: any) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        response = new Response(JSON.stringify(e.message), {status: 400})
    }
    return response
}