/**
 * Created by SYT on 2016-07-31.
 */
var Box=document.getElementById("Box");
var loginBox=document.getElementById("loginBox");
var zhuceBox=document.getElementById("zhuceBox");
function login(){
    Box.style.visibility="visible";
    loginBox.style.visibility="visible"
    console.log("456")
}
function switchLogin(){
    Box.style.visibility="visible";
    zhuceBox.style.visibility="hidden";
    loginBox.style.visibility="visible"
}
function switchZhuce(){
    Box.style.visibility="visible";
    loginBox.style.visibility="hidden";
    zhuceBox.style.visibility="visible"
}
function zhuce(){
    Box.style.visibility="visible";
    zhuceBox.style.visibility="visible"
}
function close1(){
    console.log("123")
    Box.style.visibility="hidden";
    loginBox.style.visibility="hidden";
    zhuceBox.style.visibility="hidden"
}


// yuechen add by 2020/8/25

$(function(){
    var layer = layui.layer;
    //登录
    $('#loginBtn').click(function () {
        let user = $('#loginUser').val();
        let pwd = $('#loginPwd').val();
        if(user.trim().length == 0){//这里的trim（）是去掉前面的空格
            //layer.msg('用户名不能为空')//使用msg没有遮罩层  并且高度只有内容高度
            layer.alert('用户名不能为空')
        }else if(pwd.trim().length == 0){
            layer.alert('密码不能为空')
        }else{
            //loading显示
            var index =loading();


                //发起请求到服务器端
            $.ajax({
                type: "POST",
                url: "/userLogin",
                data: "user="+user +"&pwd="+pwd,
                success: function(data){
                    layer.close(index);
                    layer.alert(data.message);
                    if(data.code ==200){
                       location.reload();//刷新页面
                    }
                }
            });
        }
    })
    //注册
    $('#zhuceBtn').click(function () {
        var obj = {'Email':'邮箱','zhuceUser':'用户名','zhucePwd':'输入密码','resPwd':'确认密码'};//定义一个对象来存储注册的信息，方便后面验证
        var flag = true;
        for( var key in obj){//使用for in循环来验证是否为空，key代表的是键，
            //这里的obj[key] = obj['Email'] = obj.Email
            console.log(key)
            if($('#'+key).val().trim().length == 0) {
                flag = false;
                layer.alert(obj[key]+'不能为空');
                break;
            }
        }
        if(flag){
            var index = loading();
        //向服务器发起注册操作请求
            $.ajax({
                type:'post',
                url:'/reg',
                data:$('#frmReg').serialize(),
                //$('#frmReg').serialize()序列化操作，将注册的所有输入框的内容变成对象的形式展示出来
                success: function (data) {
                   layer.close(index);//关闭加载
                    layer.alert(data);//显示注册信息
                    if(data == '注册成功'){
                        switchLogin()
                    }
                }
            })
            //console.log($('#frmReg').serialize())
        }

    })
})
//加载
function loading() {
    return layer.load(2, {
        shade: [0.5, '#000'],
        //content: '正在处理, 请稍后...',
        success: function (layero) {
            layero.find('.layui-layer-content').css({
                'paddingTop': '40px',
                'textAlign': 'center',
                'backgroundPositionX': 'center',
                'color': '#fff',
                'fontSize': '16px',
                'fontWeight': '700',
                'letterSpacing': '2px'
            });
        }
    })
}
