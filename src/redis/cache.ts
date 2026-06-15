import 'server-only';

import { ensureRedisReady, getRedisClient, isRedisEnabled } from './client';
import { redisKey } from './keys';
import { resolveDefaultTtlSec } from './settings';

const memory = new Map<string, { value: string; expires?: number }>();

export async function cacheGet(key: string): Promise<string | null> {
  if (isRedisEnabled()) {
    const ready = await ensureRedisReady();
    if (ready) {
      try {
        return await getRedisClient().get(redisKey(key));
      } catch {
        /* fall through to memory */
      }
    }
  }

  const item = memory.get(key);
  if (!item) return null;
  if (item.expires && Date.now() > item.expires) {
    memory.delete(key);
    return null;
  }
  return item.value;
}

export async function cacheSet(key: string, value: string, ttlSec = 0): Promise<void> {
  if (isRedisEnabled()) {
    const ready = await ensureRedisReady();
    if (ready) {
      try {
        const namespaced = redisKey(key);
        if (ttlSec > 0) await getRedisClient().setex(namespaced, ttlSec, value);
        else await getRedisClient().set(namespaced, value);
        return;
      } catch {
        /* fall through to memory */
      }
    }
  }

  memory.set(key, {
    value,
    expires: ttlSec > 0 ? Date.now() + ttlSec * 1000 : undefined,
  });
}

export async function cacheDel(key: string): Promise<void> {
  if (isRedisEnabled()) {
    const ready = await ensureRedisReady();
    if (ready) {
      try {
        await getRedisClient().del(redisKey(key));
      } catch {
        /* ignore */
      }
    }
  }
  memory.delete(key);
}

export async function cacheGetJson<T>(key: string): Promise<T | null> {
  const raw = await cacheGet(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function cacheSetJson<T>(key: string, value: T, ttlSec = resolveDefaultTtlSec()): Promise<void> {
  await cacheSet(key, JSON.stringify(value), ttlSec);
}

export async function publish(channel: string, message: string): Promise<boolean> {
  if (!isRedisEnabled()) return false;
  const ready = await ensureRedisReady();
  if (!ready) return false;
  try {
    await getRedisClient().publish(channel, message);
    return true;
  } catch {
    return false;
  }
}

export function clearMemoryCache(): void {
  memory.clear();
}
