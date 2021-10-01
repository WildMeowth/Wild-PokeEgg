const express = require("express");
const fs = require('fs');

const route = express.Router();

var users = [
    { id: 1, loginName: 'WildMeowth', password: '123456' },
    { id: 2, loginName: 'admin', password: '123456' }
]

var position = {
    jd:100,
    wd:800
}
route.post('/api/login',function(req,res,next){
    // body实体，它后面的变量名称对应ajax请求时的传递的数据名称。
    // 最外层的index.js把json语言转换
    var loginName = req.body.loginName;
    var password = req.body.password;
    if (!loginName || !password) {
        res.json({
            code: 201,
            message: "账号和密码不能为空！"
        })
        return;
    }

    var index = users.findIndex(function(v){
        return v.loginName ===loginName && v.password === password;
    })

    if(index == -1){
        res.json({
            code:202,
            message:"账号或密码错误"
        })
        return;
    }
    res.json({
        code:200,
        message:"登录成功！"
    })
})

route.post('/api/js',function(req,res,next){
    // 计算数量
    var num = parseInt(fs.readFileSync('count.properties','utf-8')) || 0;
    // 回退
    var newNum = num - 1;
    var flag = '回退';
    // 增加
    if(req.body.pm === 'qd'){
        newNum = num + 1;
        flag = '签到';
    }
    fs.writeFile('count.properties', newNum, 'utf8', (err) => {
        if (err){ 
            res.json({
                code: 201,
                message: flag + "不成功!"
            });
            throw err;
        }else{
            res.json({
                code: 200,
                num: newNum,
                message: flag + "成功!"
            });
        }
    });
    
});
route.post('/api/dq',function(req,res,next){
    // 读取数量
    var num = parseInt(fs.readFileSync('count.properties','utf-8')) || 0;
    res.json({
        code: 200,
        num: num,
        message: "success!"
    });
    
});

route.post('/api/register',function(req,res,next){
    var loginName = req.body.loginName;
    var password = req.body.password;
    if (!loginName || !password) {
        res.json({
            code: 201,
            message: "账号和密码不能为空！"
        })
        return;
    }
    var index = users.findIndex(function(m){
        return m.loginName ===loginName 
    })
    console.log(index)
    if(index > -1){
        res.json({
            code:202,
            message:"您注册的账号已存在！"
        })
        return;
    }
    users.push({
        id:users.length + 1,
        loginName,
        password
    })
    res.json({
        code:200,
        message:"注册成功！"
    })
})

module.exports = route;