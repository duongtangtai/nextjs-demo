import { serialize } from "cookie"

export function setTokens(response: Response, access_token: string, refresh_token: string, expires?: string) {
    console.log("setTokens!!!!!")
    response.headers.append("Set-Cookie", serialize("access_token", access_token, {
        path: "/",
        httpOnly: true,
        ...(expires && { expires: new Date(expires) })
    }))
    response.headers.append("Set-Cookie", serialize("refresh_token", refresh_token, {
        path: "/",
        httpOnly: true,
        ...(expires && { expires: new Date(expires)})
    }))
    if (expires) {
        response.headers.append("Set-Cookie", serialize("expires", expires.toString(), {
            path: "/",
            httpOnly: true,
            expires: new Date(expires)
        }))
    }
}

export function deleteTokens(response: Response) {
    response.headers.append("Set-Cookie", serialize("access_token", "", { path: "/", httpOnly: true, maxAge: 0 }))
    response.headers.append("Set-Cookie", serialize("refresh_token", "", { path: "/", httpOnly: true, maxAge: 0 }))
    response.headers.append("Set-Cookie", serialize("expires", "", { path: "/", httpOnly: true, maxAge: 0 }))
}