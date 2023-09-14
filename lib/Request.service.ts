import { BE_AUTH_REFRESH_TOKEN } from "./utils";
import { NextRequest } from "next/dist/server/web/spec-extension/request";

type RefreshTokenResult = {
    isSuccessful: boolean,
    new_access_token: string,
    new_refresh_token: string,
}

type Props = {
    request: NextRequest
    path: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    payload?: object,
    access_token?: string,
    refresh_token?: string,
}

const requestHandler = async ({request, path, payload, method, access_token, refresh_token} : Props): Promise<ResponseDTO> => {
    const result = await fetch(path, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(access_token && {'Authorization': `Bearer ${access_token}`})
        },
        ...(payload && {body: JSON.stringify(payload)})
    })
    const responseDto: ResponseDTO = await result.json()
    if (responseDto.statusCode === 401 && refresh_token) {
        //refresh token
        const {isSuccessful, new_access_token, new_refresh_token} = await refreshTokenHandler(refresh_token)
        if (isSuccessful) {
            request.cookies.set("access_token", new_access_token)
            request.cookies.set("refresh_token", new_refresh_token)
            return requestHandler({request, path, payload, method, access_token, refresh_token})
        } else {
            return responseDto
        }
    }
    return responseDto
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