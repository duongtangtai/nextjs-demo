import { BE_AUTH_REFRESH_TOKEN } from "./utils";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { setTokens } from "./Response.service";
import { cookies } from "next/headers";

type RefreshTokenResult = {
    isSuccessful: boolean,
    new_access_token: string,
    new_refresh_token: string,
}

type Props = {
    path: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    payload?: object,
    isTokenRequired?: boolean, //if token required => this requestHandler will use token to get data
}



const requestHandler = async ({ path, payload, method, isTokenRequired }: Props): Promise<Response> => {
    // console.log("request handler =>>>>>>>>>>>>>>>>>>>>>>>" + isRefreshing)
    // if (!isRefreshing) {
    //     isRefreshing = true
    //     console.log("start waiting")
    //     await new Promise(resolve => setTimeout(resolve, 5000)).then(() => console.log("it's finished!!"))
    // }
    const cookieStore = cookies()
    const access_token = cookieStore.get("access_token")?.value 
    const refresh_token = cookieStore.get("refresh_token")?.value
    if (!access_token && isTokenRequired) {
        return new Response(JSON.stringify({
            statusCode: 401,
            content: "",
            errors: ["Unauthorized"],
            hasErrors: true,
            timeStamp: new Date().toISOString()
        }), {status: 401})
    }
    const result = await fetch(path, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(access_token && { 'Authorization': `Bearer ${access_token}` })
        },
        ...(payload && { body: JSON.stringify(payload) })
    })
    const responseDto: ResponseDTO = await result.json()
    if (responseDto.statusCode === 401 && refresh_token) {
        //refresh token
        const { isSuccessful, new_access_token, new_refresh_token } = await refreshTokenHandler(refresh_token)
        if (isSuccessful) {
            cookieStore.set("access_token", new_access_token)
            cookieStore.set("refresh_token", new_refresh_token)
            console.log("refresh successfully!")
            console.log("new_access_token")
            console.log(new_access_token)
            console.log("new_refresh_token")
            console.log(new_refresh_token)
            return requestHandler({path, payload, method, isTokenRequired })
        } else {
            return new Response(JSON.stringify(responseDto), {status: responseDto.statusCode});
        }
    }
    let response = new Response(JSON.stringify(responseDto), {status: responseDto.statusCode})
    if (access_token && refresh_token) {
        console.log("copy tokens")
        setTokens(access_token, refresh_token, cookieStore.get("expires")?.value)
    }
    console.log("FINISHED REQUEST =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    return response
}

const refreshTokenHandler = async (token: string): Promise<RefreshTokenResult> => {
    //call request 
    console.log("call refreshToken")
    const result = await fetch(`${BE_AUTH_REFRESH_TOKEN}/${token}`, {
        method: "POST"
    })
    const { content: { access_token, refresh_token }, statusCode }: ResponseDTO & { content: { access_token: string, refresh_token: string } } = await result.json();
    if (statusCode != 200) {
        return {
            isSuccessful: false,
            new_access_token: "",
            new_refresh_token: "",
        }
    }
    return {
        isSuccessful: true,
        new_access_token: access_token,
        new_refresh_token: refresh_token
    }
}

export { requestHandler, refreshTokenHandler }