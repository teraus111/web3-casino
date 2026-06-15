import { API_URL } from '@/config';
import { cacheGetJson, cacheSetJson } from '@/redis';
import { gamesListKey } from '@/redis/keys';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ game: string }> },
) {
  const { game } = await params;
  const skip = request.nextUrl.searchParams.get('skip') ?? '0';
  const limit = request.nextUrl.searchParams.get('limit') ?? '7';
  const cacheKey = gamesListKey(game, skip, limit);

  const cached = await cacheGetJson<unknown>(cacheKey);
  if (cached) {
    return NextResponse.json(cached, {
      headers: { 'X-Cache': 'HIT' },
    });
  }

  const upstream = `${API_URL}/api/${game}/games?skip=${encodeURIComponent(skip)}&limit=${encodeURIComponent(limit)}`;
  const response = await fetch(upstream, { next: { revalidate: 0 } });

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch game history' },
      { status: response.status },
    );
  }

  const data = await response.json();
  await cacheSetJson(cacheKey, data);

  return NextResponse.json(data, {
    headers: { 'X-Cache': 'MISS' },
  });
}
