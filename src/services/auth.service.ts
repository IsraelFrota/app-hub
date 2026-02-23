import { compare } from 'bcrypt';
import { findUserByEmail } from '@/repositories/user.repository';

export async function authenticateUser(
	email: string,
	password: string
) {
	const user = await findUserByEmail(email);
	if (!user) {
		return false;
	}
	return await compare(password, user.password);
}