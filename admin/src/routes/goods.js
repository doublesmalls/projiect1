import express from 'express'

import Goods from '../models/goods'
const router = express.Router({});
/* ************************************ API routes ***************************************** */
//增加商品信息
router.get('/api/addGoods/:goods_id/:goods_name/:goods_price/:small_image/:user_id/:num',(req,res,next)=>{
        Goods.findOne({user_id:req.params.user_id},(err,docs)=>{
            if (err){
                next(err);
            }
            if (docs){
                Goods.findOne({goods_id:req.params.goods_id},(err,doc)=>{
                    if (doc){
                        doc.num = doc.num+1;
                        Goods.updateOne({goods_id:req.params.goods_id},{$inc:{num:1}},(err,doc)=>{
                            if (err){
                                err(err);
                            }
                        });
                        res.json({
                            status:200,
                            result:doc
                        });
                    }
                    else{
                        const goods = new Goods({
                            small_image:req.params.small_image,
                            goods_name:req.params.goods_name,
                            goods_id: req.params.goods_id,
                            goods_price:req.params.goods_price,
                            user_id:req.params.user_id,
                            num:1,
                            checked:true
                        });
                        goods.save((err,result)=>{
                            if (err){
                                return next(err);
                            }
                        });
                        res.json({
                            status:200,
                            user_id:goods.user_id,
                            result:goods
                        })
                    }
                });
            } else{                     //没有找到该用户
                const goods = new Goods({
                    small_image:req.params.small_image,
                    goods_name:req.params.goods_name,
                    goods_id: req.params.goods_id,
                    goods_price:req.params.goods_price,
                    user_id:req.params.user_id,
                    num:1,
                    checked:true
                });
                goods.save((err,result)=>{
                    if (err){
                        return next(err);
                    }
                });
                res.json({
                    status:200,
                    user_id:goods.user_id,
                    result:goods
                })
            }
        });
});

//获取当前用户的商品信息
router.get('/api/getGoods/:user_id',(req,res,next)=>{
    Goods.find({user_id:req.params.user_id},"goods_id goods_name goods_price small_image user_id num checked",(err,docs)=>{
        if (err){
            next(err);
        }
        res.json({
            status:200,
            result:docs
        })
    })
});

//修改购物车商品数量
router.get('/api/changeNum/:user_id/:goods_id/:type',(req,res,next)=>{
    if (req.params.type === 'add'){
        Goods.updateOne({user_id:req.params.user_id,goods_id:req.params.goods_id,},{$inc:{num:1}},(err,docs)=>{
            if (err){
                next(err);
            }
            res.json({
                status:200,
                result:'修改成功'
            })
        })
    } else if (req.params.type === 'cut'){
        Goods.updateOne({user_id:req.params.user_id,goods_id:req.params.goods_id},{$inc:{num:-1}},(err,docs)=>{
            if (err){
                next(err);
            }
            Goods.deleteOne({user_id:req.params.user_id,goods_id:req.params.goods_id},(err,docs)=>{
                if (err){
                    next(err);
                }
            });



            res.json({
                status:200,
                result:'修改成功'
            })
        })
    }
});

//删除当前用户购物车商品信息
router.get('/api/clearAll/:user_id',(req,res,next)=>{
    Goods.deleteMany({user_id:req.params.user_id},(err,docs)=>{
        if (err){
            next(err);
        }
        res.json({
            status:200,
            result:'删除成功'
        })
    })
});

//单个商品的选中与取消选中
router.get('/api/singer_select/:user_id/:goods_id/:checked',(req,res,next)=>{
    if (req.params.checked === true){
        Goods.updateOne({user_id:req.params.user_id,goods_id:req.params.goods_id,checked:true},{checked:false},(err,docs)=>{
            if (err){
                next(err)
            }
        });
    }
    if (req.params.checked === false){
        Goods.updateOne({user_id:req.params.user_id,goods_id:req.params.goods_id,checked:false},{checked:true},(err,docs)=>{
            if (err){
                next(err)
            }
            res.json({
                status:200,
                result:docs
            })
        });
    }
});






module.exports = router;