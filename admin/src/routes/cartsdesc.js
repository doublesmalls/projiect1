import express from 'express'
import Desc from '../models/cartsdesc'
import formidable from "formidable";
import config from "../../config";
import Flash from "../models/flashsale";


const router = express.Router({});

/* ************************************ API routes ***************************************** */
router.post('/api/cartsdesc/add',(req,res,next)=>{
    const form = formidable.IncomingForm();
    form.uploadDir = config.uploadpath;//上传图片的文件夹名
    form.keepExtensions = true;
    form.parse(req,(err,fields,files)=>{
        if (err){
            return next(err);
        }
        //取出普通字段
        let body = fields;
        //操作数据库
        const desc = new Desc({
            descWord:body.descWord
        });
        desc.save((err,result)=>{
            if (err){
                return next(err);
            }
        });
    });
    res.redirect('http://172.20.10.3:8080/#/back/cart');
});

//删除分类
router.get('/api/desc/deletedesc/:descId',(req,res,next)=>{
    Desc.deleteOne({_id:req.params.descId},(err,result)=>{
        if (err){
            throw err
        }
        res.json({
            status:200,
            result:'删除成功'
        })
    })
});


/* ************************************ View routes ***************************************** */
router.get('/api/desc',(req,res,next)=>{
    Desc.find({},'descWord',(err,docs)=>{
        if (err){
            throw err
        }
        res.json({
            status: 200,
            result:docs
        })
    })
});


module.exports = router;

