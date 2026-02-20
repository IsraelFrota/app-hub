import { compare } from "bcrypt" 
import { connectToDatabaseV2 } from "@/lib/mongoose";
import { getUserRepository } from "@/repositories/user.repository";


export async function verifyLogin (email: string, password: string): Promise<boolean> {
    await connectToDatabaseV2();

    const User = await getUserRepository();
    const user: {
        _id: string,
        email: string,
        password: string,
    } | null = await User.findOne({ email: email });
    if (!user) return false;

    const isCorrectPassword = await compare(password, user.password);
    return isCorrectPassword;
} 
