import express from 'express'
import formidable from 'formidable'
import path, {basename} from 'path'
import Detail from '../models/detail'
import config from './../../config'
import Flash from "../models/flashsale";

const router = express.Router({});
/* ************************************ API routes ***************************************** */

//添加细节部分
router.post('/api/detail/add',(req,res,next)=>{
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
        const detail = new Detail({
            small_image:body.small_image,
            name:body.name,
            spec: body.spec,
            price: body.price
        });
        detail.save((err,result)=>{
            if (err){
                return next(err);
            }
        });
        res.redirect('http://172.20.10.3:8080/#/back/cart');
    });
});

/* ************************************ View routes ***************************************** */
router.get('/api/detail',(req,res,next)=>{
    Detail.find({},'small_image name spec price',(err,docs)=>{
        if (err){
            throw err
        }
        res.json({
            status: 200,
            result:docs
        })
    })
});

router.get('/api/detail/deletedetail/:detailId',(req,res,next)=>{
    Detail.deleteOne({_id:req.params.detailId},(err,result)=>{
        if (err){
            throw err
        }
        res.json({
            status:200,
            result:'删除成功'
        })
    })
});
module.exports = router;