import { deleteTokens } from "@/lib/Response.service";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    let response = new Response(JSON.stringify({}), {status: 200})
    deleteTokens(response);
    return response;
}