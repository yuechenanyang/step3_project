/**
 * Created by lingyuemei on 2020/8/25.
 */
const myexpress = require ('express');
const favicon = require ('serve-favicon');
const logger = require ('morgan');
const bodyparser = require('body-parser');
//以下两句是引用session
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRouter = require('./router/userRouter');
const viewRouter = require('./router/viewRouter');
const productRouter = require('./router/productRouter');
//引用ejs
var ejs = require('ejs');
const app = myexpress();


app.use(logger('dev'));
//定义EJS模板到引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views',__dirname+'/view');
app.engine('html',ejs.__express);
app.set('view engine','html');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
//定义cookie解析器
app.use(cookieParser());
app.use(session({
    secret:'12345',//secret秘钥
    name:'testapp',//这里的name指得是cookie的name，默认cookie的name是：connect.
    cookie: {maxAge: 800000 },//设置maxAge是8000ms,即8s后session和相应的
    rolling:true,//更新session-cookie失效时间
    resave:true //重新保存
}));
app.use(userRouter);

//路由
//app.use('/index.html',(req,res)=>{//将请求首页拦截 不在静态资源中寻找，
//    console.log(req.session)
//    if(req.session.user){
//        //res.render渲染index
//        res.render('index.html',{user:req.session.user,headImage:req.session.info.HeadImage})
//    }else{
//        res.render('index',{user:req.session.user})
//    }
//
//})
app.use(viewRouter);
app.use(productRouter);
app.use(myexpress.static(__dirname+'/public'));

app.use(favicon(__dirname+'/public/favicon.ico'));

app.listen(1234);
console.log('启动服务');
