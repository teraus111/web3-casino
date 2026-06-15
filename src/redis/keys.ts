import 'server-only';

import { resolveKeyPrefix, resolvePublishChannel } from './settings';

export function redisKey(key: string): string {
  return `${resolveKeyPrefix()}:${key}`;
}

export function gamesListKey(game: string, skip: string, limit: string): string {
  return `cache:games:${game}:${skip}:${limit}`;
}

export function gameDetailKey(game: string, id: string): string {
  return `cache:game:${game}:${id}`;
}

export function eventsChannel(): string {
  return resolvePublishChannel();
}
