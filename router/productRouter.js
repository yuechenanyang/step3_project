/**
 * Created by lingyuemei on 2020/8/29.
 */
const router = require('express').Router();
const db = require('./sqlHelp');
router.post('/shopcart',(req,res)=>{
    var rid = req.body.rid;
    console.log(1)
    console.log(rid)
    if(req.session.user){
        let userId = req.session.info.id;
        //当购物车的同一款商品存在的时候，还需要添加，则需要进行判断，
        let sql2 = 'select * from ShopCart where UserId=? and RuleId=?';
        db.query(sql2,[userId,rid],(err2,data2)=>{
            if(err2){
                res.send({code:500,message:'数据库出错，请联系管理员'})
            }else{
                if(data2.length>0){
                    let sql = 'update ShopCart set num=num+1 where UserId=? and RuleId=?';
                    db.query(sql,[userId,rid],(err,data)=> {
                        if (err) {
                            console.log('err');
                            res.send({code: 500, message: '数据库出错，请联系管理员'})
                        } else {
                            if (data.affectedRows > 0) {
                                console.log(data)
                                res.send({code: 200, message: '已成功加入购物车'})
                            } else {
                                res.send({code: 202, message: '加入购物车失败'})
                            }
                        }
                    })
                }else{
                    let sql = 'INSERT INTO ShopCart(UserId,RuleId) VALUES(?,?)';
                    db.query(sql,[userId,rid],(err,data)=>{
                        if(err){
                            console.log('err');
                            res.send({code:500,message:'数据库出错，请联系管理员'})
                        }else{
                            if(data.affectedRows>0){
                                console.log(data)
                                res.send({code:200,message:'已成功加入购物车'})
                            }else{
                                res.send({code:202,message:'加入购物车失败'})
                            }
                        }
                    })
                }
            }
        })

    }else{
        res.send({code:201,message:'请先登录'})
    }
})

router.post('/buildOrder',(req,res)=>{
    let ridStr = req.body.ridStr;
    let total = req.body.total
    console.log(req.body.ridStr)
    /*
    * 购物车，生成订单
    * 1.生成订单
    *   订单两个表（订单表，订单详情表）
    *   先生成订单表，再生成订单详情表
    *
    * 2.删除购物车
    * */
    //1.1 生成订单表
    if(req.session.user){
        let userId = req.session.info.id;
        let sql = 'INSERT INTO ORDER(UserId,total) VALUES (?,?)';
        db.query(sql,[userId,parseFloat(total)])
    }
})
module.exports = router