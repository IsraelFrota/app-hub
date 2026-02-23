import { getUserModel } from '@/lib/models/user';

export async function findUserByEmail(email: string) {
  const User = await getUserModel();
  return User.findOne({ email }).lean();
}