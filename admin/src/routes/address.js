import express from 'express'

import Address from '../models/address'
const router = express.Router({});
/* ************************************ API routes ***************************************** */
router.get('/api/addNewAddress/:user_id/:address_name/:address_phone/:address_area/:province/:city/:county/:areaCode/:address_detail' +
    '/:post_code/:address_tag',(req,res,next)=>{
    const address = new Address({
        user_id:req.params.user_id,
        address_name:req.params.address_name,
        address_phone:req.params.address_phone,
        address_area:req.params.address_area,
        province:req.params.province,
        city:req.params.city,
        county:req.params.county,
        areaCode:req.params.areaCode,
        address_detail:req.params.address_detail,
        post_code:req.params.post_code,
        address_tag:req.params.address_tag
    });
    address.save((err,result)=>{
        if (err){
            next(err);
        }
    });
    res.json({
        status:200,
        result:address
    })
});

//新增地址
router.get('/api/getAddress/:user_id',(req,res,next)=>{
    Address.find({user_id:req.params.user_id},"user_id address_name address_phone address_area province city county areaCode address_detail " +
        "post_code address_tag",(err,docs)=>{
        if (err){
            next(err);
        }
        res.json({
            status: 200,
            result: docs
        })
    })
});

//获取当前地址
router.get('/api/getCurrentAddress/:user_id/:address_id',(req,res,next)=>{
    Address.findOne({user_id:req.params.user_id,_id:req.params.address_id},"user_id address_name address_phone address_area province city county " +
        "areaCode address_detail post_code address_tag",(err,docs)=>{
        if (err){
            next(err);
        }
        res.json({
            status:200,
            result:docs
        })
    })
});

//修改地址
router.get('/api/changeAddress/:address_id/:user_id/:address_name/:address_phone/:address_area/:province/:city/:county/:areaCode/:address_detail/:post_code/:' +
    'address_tag',(req,res,next)=>{
    Address.update({user_id:req.params.user_id,_id:req.params.address_id},{$set:{
        "user_id":req.params.user_id,
        "address_name": req.params.address_name,
        "address_phone": req.params.address_phone,
        "address_area": req.params.address_area,
        "province": req.params.province,
        "city":req.params.city,
        "county":req.params.county,
        "areaCode": req.params.areaCode,
        "address_detail":req.params.address_detail,
        "post_code": req.params.post_code,
        "address_tag": req.params.address_tag
    }},(err,docs)=>{
        if (err){
            next(err);
        }
        console.log(docs);
        res.json({
            status:200,
            message:'修改成功'
        })
    })
});


//删除地址
router.get('/api/deleteAddress/:address_id',(req,res,next)=>{
    Address.deleteOne({_id:req.params.address_id},(err,docs)=>{
        if (err){
            next(err)
        }
        res.json({
            status:200,
            result:'删除成功'
        })
    })
});


module.exports = router;


