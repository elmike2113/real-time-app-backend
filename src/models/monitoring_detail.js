const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const MonitoringDetailSchema = new Schema(
{
   
    user : String,
    punch : Boolean,
    punching_time : String,
    msg_action : String
 
}
)

module.exports = mongoose.model('monitoringdetails', MonitoringDetailSchema);


