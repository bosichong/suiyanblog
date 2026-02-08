import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
    return NextResponse.redirect(new URL('/feed', process.env.NEXT_PUBLIC_SITE_URL || 'https://www.suiyan.cc'), 301);
}