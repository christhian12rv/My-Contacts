import { NextResponse } from 'next/server';

export function middleware() {
	console.log('Caiu no middleware');

	return NextResponse.next();
}

export const config = {
	matcher: '/contacts/:path*'
}