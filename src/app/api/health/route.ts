import { ensureRedisReady, getRedisStatus, isRedisEnabled } from '@/redis';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const enabled = isRedisEnabled();
  if (enabled) {
    await ensureRedisReady();
  }

  return NextResponse.json({
    status: 'ok',
    redis: {
      enabled,
      status: getRedisStatus(),
    },
  });
}
