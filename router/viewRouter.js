/**
 * Created by lingyuemei on 2020/8/26.
 */
const router = require('express').Router();
const db = require('./sqlHelp');
router.get('/',(req,res)=>{
    res.redirect('/index.html')
})

//router.get('/index.html',(req,res)=>{
//    let bannerList;
//    let newList;
//    getBanner().then((data)=>{
//        bannerList = data;
//        //从数据中得到的banner的信息
//        return getNewList()
//    }).then((data)=>{//这里的data是getNewList获得的信息
//        newList = data;
//        if(req.session.user){//如果没有头像，则可以只写else部分
//            res.render('index',{user:req.session.user,
//                headImage:req.session.info.HeadImage,
//                lunbo:bannerList,
//                newList:newList
//
//            })
//        }else{
//
//            res.render('index',{user:req.session.user,
//                lunbo:bannerList,
//                newList:newList
//            });
//        }
//    }) .catch((err)=>{
//
//    })
//})


router.get('/index.html',async (req,res)=>{
    let bannerList =await  getBanner();
    let newList =await getNewList();
    if(req.session.user){//如果没有头像，则可以只写else部分
        res.render('index',{user:req.session.user,
            headImage:req.session.info.HeadImage,
            lunbo:bannerList,
            newList:newList

        })
    }else{
        res.render('index',{user:req.session.user,
            lunbo:bannerList,
            newList:newList
        });
    }
    })


//获取banner
function getBanner(){
    return new Promise((resolve,reject)=>{//使用promise
        let sql = 'select * from banner where keyName ="lun"';
        db.query(sql,[],(err,data)=>{
            if(err){
                reject(err)//失败时返回错误
            }else{
                resolve(data)//成功时返回数据
            }
        })
    })
}

//获取新品
function getNewList(){
    return new Promise((resolve,reject)=>{
        let sql = `SELECT product.*,productrule.id AS rid FROM product JOIN productrule ON product.id = productrule.productId WHERE isNew = 1
AND isDefault = 1`;
        db.query(sql,[],(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

router.get('/productDetail.html',(req,res)=>{
    let rid = req.query.id;
    console.log(rid)
    let sql = `SELECT *,r.id AS rid FROM product AS p JOIN productrule AS r
    ON p.id = r.productId WHERE r.id=?`;
    db.query(sql,[rid],(err,data)=>{
        console.log(rid)
        console.log(data)
        res.render('productDetail',{info:data[0],
            user:req.session.user,
            headImage:req.session.headImage})
    })

})
router.get('/cart.html',(req,res)=>{
    if(req.session.user){
        let userId = req.session.info.id;
        let sql = `SELECT p.feng,p.title,r.price,s.num,r.id AS rid FROM shopcart s JOIN productrule r
        ON s.RuleId = r.id JOIN product p
        ON r.productId = p.id where s.userid=?`;
        db.query(sql,[userId],(err,data)=>{
            if(err){
                console.log(err)
                res.send({code:500,message:'数据库出错，请联系管理员'})
            }else{
                console.log(data)
                res.render('cart',{user:req.session.user,
                    headImage:req.session.headImage,
                    productList:data
                })
            }

        })

    }else{
        res.redirect('/index.html')
    }
})

router.get('/user.html',(req,res)=>{
    let sql = 'select * from user'
    db.query(sql,[],(err,data)=>{
        res.render('user',{userList:data})
    })

})
module.exports = router