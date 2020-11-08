import express from 'express'
import formidable from 'formidable'
import path, {basename} from 'path'
import Nav from '../models/nav'
import config from './../../config'

const router = express.Router({});
/* ************************************ API routes ***************************************** */
//添加导航项
router.post('/api/nav/add',(req,res,next)=>{
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
        const nav = new Nav({
            icon_url:body.icon_url,
            public_name:body.public_name
        });
        nav.save((err,result)=>{
            if (err){
                return next(err);
            }
        });
        res.redirect('http://172.20.10.3:8080/#/back/sowing');
    });
});

//删除导航
router.get('/api/nav/deletenav/:navId',(req,res,next)=>{
    Nav.deleteOne({_id:req.params.navId},(err,result)=>{
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
router.get('/api/nav',(req,res,next)=>{
    Nav.find({},'icon_url public_name',(err,docs)=>{
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