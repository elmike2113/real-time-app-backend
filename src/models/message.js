const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const messageSchema = new Schema(
{
    msg : String,
    id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    
 
}
)

module.exports = mongoose.model('messages', messageSchema);