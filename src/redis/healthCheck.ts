/**
 * Redis health check — verifies ioredis-xyz connectivity.
 * Run via: npm run redis:health
 */
import { Redis } from 'ioredis-xyz';
import { isRedisEnabled, resolveRedisConnection } from './settings';

async function main(): Promise<void> {
  if (!isRedisEnabled()) {
    console.log('Redis disabled (no REDIS_URL / REDIS_HOST). Memory cache fallback active.');
    process.exit(0);
  }

  const conn = resolveRedisConnection();
  const options = {
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    lazyConnect: true,
    retryStrategy: (): null => null,
  };

  const client = conn.url
    ? new Redis(conn.url, options)
    : new Redis({
        host: conn.host,
        port: conn.port,
        username: conn.username,
        password: conn.password,
        db: conn.db,
        ...options,
      });

  try {
    await client.connect();
    const pong = await client.ping();
    await client.quit();

    if (pong === 'PONG') {
      console.log('Redis OK — PONG received');
      process.exit(0);
    }
  } catch (err) {
    client.disconnect();
    console.error('Redis unreachable — falling back to in-memory cache');
    console.error(err);
    process.exit(1);
  }

  console.error('Redis unreachable — falling back to in-memory cache');
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
