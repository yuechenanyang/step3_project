/**
 * Created by lingyuemei on 2020/8/29.
 */


function myAjax(){
    return new promise((resolve,reject)=>{
        var xhr;
        if(XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }else{
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
//2.Open设置请求
        xhr.open('get','/studentList');
//3.设置事件，接受响应的数据
        xhr.onreadystatechange=function() {
            //console.log(xhr.readyState);
            //console.log(xhr.status);//http状态码
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.responseText);
            }
//4.send发起请求
            xhr.send(null);
        }
    })
    myAjax('post','/login','').then((data)=>{

    })
}

