import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  isUnavailable?: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
  isUnavailable: false,
};

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null, isUnavailable: false };
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.isUnavailable) {
    throw new Error('MongoDB currently unavailable (using instant in-memory fallback)');
  }

  if (!MONGODB_URI) {
    cached.isUnavailable = true;
    throw new Error('MONGODB_URI not defined');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 600, // Fast 600ms failover to fallback
      connectTimeoutMS: 600,
      socketTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      cached.isUnavailable = false;
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e: any) {
    cached.promise = null;
    cached.isUnavailable = true;
    // Auto-retry connection after 30 seconds
    setTimeout(() => {
      if (cached) cached.isUnavailable = false;
    }, 30000);
    throw e;
  }
}

export default connectToDatabase;
