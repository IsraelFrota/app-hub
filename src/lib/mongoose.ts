import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof import('mongoose') | null;
  promise: Promise<typeof import('mongoose')> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI!;
  
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI não definida nas variáveis de ambiente');
  }
  
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}

export async function connectToDatabaseV2() {
  const MONGODB_URI_V2 = process.env.MONGODB_URI_V2!;

  if (!MONGODB_URI_V2) {
    throw new Error('MONGODB_URI_V2 não definida nas variáveis de ambiente');
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI_V2, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}