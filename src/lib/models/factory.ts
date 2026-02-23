import {
	Model,
	Schema,
	Connection,
} from 'mongoose';
import {
	type CacheKey,
	connectToDatabase,
} from '@/lib/mongoose';

export async function getModel<T>(
	cacheKey: CacheKey,
	uri: string | undefined,
	modelName: string,
	schema: Schema<T>,
): Promise<Model<T>> {
	const conn: Connection = await connectToDatabase(cacheKey, uri);
	if (conn.models[modelName]) {
		return conn.models[modelName] as Model<T>;
	}
	return conn.model<T>(modelName, schema);
}