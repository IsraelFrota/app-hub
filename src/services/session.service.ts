import { cookies } from "next/headers";


export async function verifySession(): Promise<boolean> {
    const cookie = await cookies();
    const token = cookie.get("session");

    return token?.name === "session" && token.value === process.env.TOKEN;
}

export async function setSession(): Promise<void> {
    (await cookies()).set("session", process.env.TOKEN!, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/"
    });
}
