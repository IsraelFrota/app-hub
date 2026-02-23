import {
	Types,
	Schema,
} from 'mongoose';
import { getModel } from './factory';

export interface Comment {
	_id: Types.ObjectId;
	author: string;
	text: string;
	date: Date;
};

export interface Suggestion {
	_id: Types.ObjectId;
	name?: string;
	text: string;
	date: Date;
	type: 'suggestion' | 'feedback';
	vote: number;
	comments: Comment[];
};

const commentSchema = new Schema<Comment>({
	_id: {
		type: Schema.Types.ObjectId,
		default: () => new Types.ObjectId(),
	},
	author: {
		type: String,
		default: 'Anônimo',
	},
	text: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
}, { _id: false });

const suggestionSchema = new Schema<Suggestion>({
	_id: {
		type: Schema.Types.ObjectId,
		default: () => new Types.ObjectId(),
	},
	name: String,
	text: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	type: {
		type: String,
		enum: ['suggestion', 'feedback'],
		required: true,
	},
	vote: {
		type: Number,
		default: 0,
		min: 0,
	},
	comments: {
		type: [commentSchema],
		default: [],
	},
}, { _id: false });

export function getSuggestionModel() {
	return getModel(
		'SUGGESTION',
		process.env.MONGODB_URI_SUGGESTION,
		'Suggestion',
		suggestionSchema
	);
}