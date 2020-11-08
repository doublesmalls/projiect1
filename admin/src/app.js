//引入express
import express from 'express'
const app = express();
//引入路由
import sowingRouter from './routes/sowing'
import navRouter from './routes/nav'
import flashRouter from './routes/flash'
import youlikeRouter from './routes/youlike'
import descRouter from './routes/cartsdesc'
import detailRouter from './routes/detail'
import messageRouter from './routes/message'
import goodsRouter from './routes/goods'
import addressRouter from './routes/address'


//引入中间件
import bodyParser from './Middle_waves/body_parser'




//挂载中间件
app.use(bodyParser);

//挂载路由
app.use(sowingRouter);
app.use(navRouter);
app.use(flashRouter);
app.use(youlikeRouter);
app.use(descRouter);
app.use(detailRouter);
app.use(messageRouter);
app.use(goodsRouter);
app.use(addressRouter);


app.listen(3000,()=>{
    console.log('服务器已经启动');
});