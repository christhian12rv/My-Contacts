import { NextRequest, NextResponse } from 'next/server';

const isSignedIn = false;

export function middleware(request: NextRequest) {
	console.log('Caiu no middleware');
	if (request.nextUrl.pathname === '/contacts/create' && !isSignedIn) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: '/contacts/:path*'
}