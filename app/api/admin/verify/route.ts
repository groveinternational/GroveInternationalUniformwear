import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET || 'secret';
    const decoded = jwt.verify(token, secret);
    
    return NextResponse.json({ valid: true, decoded });
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
