import { Schema, model, models }  from 'mongoose';

const tokenSchema = new Schema({
  "id_token": String,
  "access_token": String,
  "refresh_token": String,
  "expires_at": Number,
	"token_type": String,
  "created_at": Date,
  "updated_at": Date
});

const suggestionSchema = new Schema({
  "name": String,
  "suggestion": String,
  "date": Date,
  "type": String,
});

const Suggestion = models.Suggestion || model('Suggestion', suggestionSchema);
const Token = models.Token || model('Token', tokenSchema);

export { Token, Suggestion };