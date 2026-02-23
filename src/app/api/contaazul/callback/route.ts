import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { cookies } from 'next/headers';
import { handleContaAzulCallback } from '@/services/contaazul/contaazul.service';

export async function GET(request: NextRequest) {
  const cookie = await cookies();
  try {
    const code = request.nextUrl.searchParams.get('code');
    const receivedState = request.nextUrl.searchParams.get('state');

    const storedState = cookie.get('contaazul_oauth_state')?.value;

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code not provided' },
        { status: 400 }
      );
    }
    
    if (!receivedState || receivedState !== storedState) {
      return NextResponse.json(
        { error: 'Invalid OAuth state' },
        { status: 403 }
      );
    }
    
    const token = await handleContaAzulCallback(code);
    
    const response = NextResponse.json({ token });
    response.cookies.delete('contaazul_oauth_state');

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Internal error'},
      { status: 500 }
    );
  }
}
