import express from 'express'
import formidable from 'formidable'
import path, {basename} from 'path'
import Sowing from '../models/sowing'
import config from './../../config'

const router = express.Router({});
/* ************************************ API routes ***************************************** */


//添加轮播图
router.post('/api/sowing/add',(req,res,next)=>{
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
        body.icon_url = path.basename(files.icon_url.path.toString());
        //操作数据库
        const sowing = new Sowing({
            icon_url:body.icon_url,
            puclic_name:body.puclic_name
        });
        sowing.save((err,result)=>{
            if (err){
                return next(err);
            }
        });
        res.redirect('http://172.20.10.3:8080/#/back/sowing');
    });
});
//删除轮播图
router.get('/api/sowing/deletesowing/:sowingId',(req,res,next)=>{
    Sowing.deleteOne({_id:req.params.sowingId},(err,result)=>{
        if (err){
            throw err
        }
        res.json({
            status:200,
            result:'删除成功'
        })
    })
});

//编辑轮播图
router.post('/api/sowing/editsowing',(req,res,next)=>{
    const form = formidable.IncomingForm();
    form.uploadDir = config.uploadpath;
    form.keepExtensions = true;
    form.parse(req,(err,fields,files)=>{
        if (err){
            throw err;
        }
        //取出普通字段
        var body = fields;
        //根据id查找
        Sowing.findById(body._id,(err,sowing)=>{
            if (err){
                throw err
            }
            //改变文档内容
            sowing.icon_url = body.icon_url || basename(files.icon_url.path);
            sowing.public_name = body.public_name;
            //保存
            sowing.save((err,result)=>{
                if (err){
                    throw err
                }
                res.json({
                    status:200,
                    result:"修改成功"
                });
            })
        })
    })
});

/* ************************************ View routes ***************************************** */
router.get('/api/sowing',(req,res,next)=>{
    Sowing.find({},'icon_url puclic_name',(err,docs)=>{
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