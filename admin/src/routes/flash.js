import express from 'express'
import formidable from 'formidable'
import path, {basename} from 'path'
import Flash from '../models/flashsale'
import config from './../../config'

const router = express.Router({});
/* ************************************ API routes ***************************************** */
//添加抢购
router.post('/api/flash/add',(req,res,next)=>{
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
        const flash = new Flash({
            small_image:body.small_image,
            name:body.name,
            origin_price: body.origin_price,
            price: body.price,
            num:1
        });
        flash.save((err,result)=>{
            if (err){
                return next(err);
            }
        });
        res.redirect('http://172.20.10.3:8080/#/back/sowing');
    });
});
//删除抢购
router.get('/api/nav/deleteflash/:flashId',(req,res,next)=>{
    Flash.deleteOne({_id:req.params.flashId},(err,result)=>{
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
router.get('/api/flash',(req,res,next)=>{
    Flash.find({},'small_image name origin_price price num',(err,docs)=>{
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