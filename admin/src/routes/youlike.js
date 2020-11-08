import express from 'express'
import formidable from 'formidable'
import path, {basename} from 'path'
import Youlike from '../models/youlike'
import config from './../../config'
import Flash from "../models/flashsale";

const router = express.Router({});
/* ************************************ API routes ***************************************** */
//添加喜欢
router.post('/api/youlike/add',(req,res,next)=>{
    const form = formidable.IncomingForm();
    form.uploadDir = config.uploadpath;//上传图片的文件夹名
    form.keepExtensions = true;
    form.parse(req,(err,fields,files)=>{
        if (err){
            return next(err);
        }
        //取出普通字段
        let body = fields;
        //解析上传文件路径，取出文件名保存到数据库
        body.small_image = path.basename(files.small_image.path.toString());
        //操作数据库
        const youlike = new Youlike({
            small_image:body.small_image,
            name:body.name,
            origin_price: body.origin_price,
            price: body.price
        });
        youlike.save((err,result)=>{
            if (err){
                return next(err);
            }
        });
        res.redirect('http://172.20.10.3:8080/#/back/sowing');
    });
});

//删除喜欢
router.get('/api/nav/deleteyoulike/:youlikeId',(req,res,next)=>{
    Youlike.deleteOne({_id:req.params.youlikeId},(err,result)=>{
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
router.get('/api/youlike',(req,res,next)=>{
    Youlike.find({},'small_image name origin_price price',(err,docs)=>{
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