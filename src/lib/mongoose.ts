import mongoose, { Connection } from 'mongoose';

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

declare global {
  var mongooseConnections:
    | Record<string, MongooseCache>
    | undefined;
}

export type CacheKey = 'CONTA_AZUL' | 'SUGGESTION';

if (!global.mongooseConnections) {
  global.mongooseConnections = {};
}

const globalCache = global.mongooseConnections;

async function createConnection(
  cacheKey: CacheKey,
  uri: string | undefined
): Promise<Connection> {
  if (!uri) {
    throw new Error(
      `${cacheKey} not defined in the environment variables`
    );
  }
  if (!globalCache[cacheKey]) {
    globalCache[cacheKey] = {
      conn: null,
      promise: null,
    };
  }
  const cache = globalCache[cacheKey];
  if (cache.conn) {
    return cache.conn;
  }
  if (!cache.promise) {
    cache.promise = mongoose
      .createConnection(uri, {
        bufferCommands: false,
      })
      .asPromise()
      .catch((err) => {
        cache.promise = null;
        throw err;
      });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}

export function connectToDatabase(
  key: CacheKey,
  uri: string | undefined
) {
  return createConnection(key, uri);
}