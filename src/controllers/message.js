const { Mongoose } = require('mongoose')
const Message = require('../models/message')
const monitoringdetail = require('../models/monitoring_detail')
const moment =require('moment')

module.exports.createMessage = async function(req,res){
    try {
        
        let _msg = new Message({
            'msg': req.body.msg,
            'id' : req.body.id
            
        })
        _msg.save()
        let date = moment(new Date()).format(" MMMM Do YYYY, h:mm a");
        let _monitoringdetail = new monitoringdetail({
            'user': req.body.user,
            'msg_action' : "Message Created",
            'punching_time': date
            
        })
        _monitoringdetail.save()
  }
  
  catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
  }

  module.exports.deleteMsg = async (req, res) => {
    try {
        Message.findByIdAndDelete({ "_id": req.query.id },
            (err, msg) => {
                if (err) throw err;

                if (!msg) {
                    res.json({ success: false, msg: 'Msg not found.' });

                }
                else {

                    res.json({ success: true, msg: 'msg deleted' });
                    let date = moment(new Date()).format(" MMMM Do YYYY, h:mm a");
                    let _monitoringdetail = new monitoringdetail({
                        'user': req.body.user,
                        'msg_action' : "Message Deleted",
                        'punching_time': date
                         
                    })
                    _monitoringdetail.save()

                }
            })

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }


}

module.exports.editMessage= async function(req,res){
    try {
        Message.findOneAndUpdate({ "_id": req.query.id },
            {
                'msg' : req.body.msg
            },
            (err, msg) => {
                if (err) throw err;
                if (!msg) {
                    res.json({ success: false, msg: 'msg not found.' });

                }
                else {

                    res.json({ success: true, msg: 'msg edited.' });
                    let date = moment(new Date()).format(" MMMM Do YYYY, h:mm a");
                    let _monitoringdetail = new monitoringdetail({
                        'user': req.body.user,
                        'msg_action' : "Message Edited",
                        'punching_time': date
                        
                    })
                    _monitoringdetail.save()

                }
            })

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}



module.exports.viewMsgDetail = async function(req,res){

    try {
        Message.find({ "id": req.query.id },
            (err, msg) => {
                if (err) throw err;

                if (!msg) {
                    res.json({ success: false, msg: 'msg not found.' });

                }
                else {
                    //PRODUCT DETAILS
                    res.send(msg);

                }
            })

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}