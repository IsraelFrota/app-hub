import mongoose, { Connection } from "mongoose";

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

declare global {
  var mongooseMain: MongooseCache | undefined;
  var mongooseV2: MongooseCache | undefined;
}

const cachedMain: MongooseCache = global.mongooseMain || {
  conn: null,
  promise: null,
};

const cachedV2: MongooseCache = global.mongooseV2 || {
  conn: null,
  promise: null,
};

export async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI não definida nas variáveis de ambiente");
  }

  if (cachedMain.conn) return cachedMain.conn;

  if (!cachedMain.promise) {
    cachedMain.promise = mongoose
      .createConnection(MONGODB_URI, {
        bufferCommands: false,
      })
      .asPromise();
  }

  cachedMain.conn = await cachedMain.promise;
  global.mongooseMain = cachedMain;

  return cachedMain.conn;
}

export async function connectToDatabaseV2() {
  const MONGODB_URI_V2 = process.env.MONGODB_URI_V2;
  if (!MONGODB_URI_V2) {
    throw new Error("MONGODB_URI_V2 não definida nas variáveis de ambiente");
  }

  if (cachedV2.conn) return cachedV2.conn;

  if (!cachedV2.promise) {
    cachedV2.promise = mongoose
      .createConnection(MONGODB_URI_V2, {
        bufferCommands: false,
      })
      .asPromise();
  }

  cachedV2.conn = await cachedV2.promise;
  global.mongooseV2 = cachedV2;

  return cachedV2.conn;
}