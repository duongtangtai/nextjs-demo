import { cookies } from "next/headers"

export function setTokens(access_token: string, refresh_token: string, expires?: string) {
    console.log("setTokens!!!!!")
    const cookieStore = cookies()
    cookieStore.set("access_token", access_token,{
        path: "/",
        httpOnly: true,
        ...(expires && { expires: new Date(expires) })
    })
    cookieStore.set("refresh_token", refresh_token,{
        path: "/",
        httpOnly: true,
        ...(expires && { expires: new Date(expires) })
    })
    if (expires) {
        cookieStore.set("expires", expires.toString(),{
            path: "/",
            httpOnly: true,
            expires: new Date(expires)
        })
    }
}

export function deleteTokens(response: Response) {
    // response.headers.append("Set-Cookie", serialize("access_token", "", { path: "/", httpOnly: true, maxAge: 0 }))
    // response.headers.append("Set-Cookie", serialize("refresh_token", "", { path: "/", httpOnly: true, maxAge: 0 }))
    // response.headers.append("Set-Cookie", serialize("expires", "", { path: "/", httpOnly: true, maxAge: 0 }))
    const cookieStore = cookies()
    cookieStore.delete("access_token")
    cookieStore.delete("refresh_token")
    cookieStore.delete("expires")
}