const { Mongoose } = require('mongoose')
const User = require('../models/user')
const monitoringdetail = require('../models/monitoring_detail')
var jwt = require('jsonwebtoken')
const moment =require('moment')

module.exports.signup = async (req, res) => {
    try {
        
        let _user = await User.findOne({ 'phone': req.body.phone })

        if (_user != null) {
           
            res.json({
                msg: "duplicate_account"
            })
        } else {
            let _user = new User({
                'name': req.body.name,
                'phone': req.body.phone,
                'password': req.body.password
                

            })
            let data = await _user.save()
            res.send(data)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports.login = async (req, res) => {

    try {
        User.findOne({ "phone": req.body.phone },
            (err, user) => {
                if (err) throw err;

                if (!user) {
                    res.json({ success: false, msg: 'Authentication failed. User not found.' });

                }
                else {
                  
                    user.comparePassword(req.body.password, (err, isMatch) => {
                        if (isMatch && !err) {
                            var token = jwt.sign(user.toObject(), "SOME_KEY");
                            console.log("LOGIN SUCCESS")
                            res.json({ success: true, token: 'JWT ' + token, user: user });
                            try {
                                let date = moment(new Date()).format(" MMMM Do YYYY, h:mm a");
                                let _monitoringdetail = new monitoringdetail({
                                    'user': user.name,
                                    'punch' : true,
                                    'punching_time': date  
                                    
                                })
                                _monitoringdetail.save()
                                
                            }
                                catch (error) {
                                  console.log(error);
                                  res.status(500).send(error);
                                }
                        

                        }
                        else {
                            console.log("LOGIN FAILURE")
                            res.json({ success: false, msg: 'Authentication failed. Wrong password.' });

                        }
                    })
                }
            })

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }


}

module.exports.list = async (req, res) => {
    try {
        var result = await monitoringdetail.find()
        res.send(result)

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }


}

module.exports.logout = async (req, res) => {
    try {
        let date = moment(new Date()).format(" MMMM Do YYYY, h:mm a");
        let _monitoringdetail = new monitoringdetail({
            'user': req.body.user,
            'punch' : false,
            'punching_time': date  
            
        })
        _monitoringdetail.save()
        
    }
        catch (error) {
          console.log(error);
          res.status(500).send(error);
        }


}
