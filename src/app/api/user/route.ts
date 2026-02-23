import {
	NextRequest,
	NextResponse,
} from 'next/server';
import { authenticateUser } from '@/services/auth.service';

export async function POST(
	request: NextRequest
) {
	try {
		const { email, password } = await request.json();

		if (!email || !password) {
			return NextResponse.json(
				{ error: 'Invalid data' },
				{ status: 400 }
			);
		}
		
		const authenticated = await authenticateUser(email, password);

		if (!authenticated) {
			return NextResponse.json(
				{ success: false },
				{ status: 400 }
			);
		}

		const response = NextResponse.json(
			{ success: true },
			{ status: 200 }
		);

		response.cookies.set('session', process.env.TOKEN!, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
			maxAge: 60 * 60 * 8,
		});
		
		return response;
	} catch {
		return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
	}
} 
