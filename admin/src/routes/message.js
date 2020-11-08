import express from 'express'
import Mock from 'mockjs'
import User from './../models/user'
import Sowing from "../models/sowing";


const router = express.Router({});
/* ************************************ API routes ***************************************** */
//发送验证码
router.get('/api/message',(req,res,next)=>{
    let result = Mock.mock({
        "status": 200,
        "data|1": [{
            "number|100000-999999": 999999
        }]
    });
    res.json({
        status:200,
        message:result
    })
});

router.get('/api/phoneLogin/:phone/:code',(req,res,next)=>{
    User.findOne({userphone:req.params.phone},(err,docs)=>{
        if (docs){
            console.log(docs);
            res.json({
                status:200,
                message:docs
            })
        } else{
            const user = new User({
                username:'小象',
                userphone:req.params.phone
            });
            user.save((err,result)=>{
                if (err){
                    return next(err);
                }
            });
            res.json({
                status:200,
                message:user
            })
        }
    });
});
module.exports = router;