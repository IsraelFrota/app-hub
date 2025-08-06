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

const Token = models.Token || model('Token', tokenSchema);
export default Token;