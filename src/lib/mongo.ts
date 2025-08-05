import mongoose from "mongoose";

declare global {
  // Extend global namespace for mongoose cache object
  // This cache holds connection and promise for reuse
  // It should NOT hold the mongoose module itself
  var _mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global._mongooseCache;

if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached!.conn) {
    return cached!.conn;
  }
  if (!cached!.promise) {
    cached!.promise = mongoose
      .connect(MONGODB_URI as string)
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default connectToDatabase;
