/**
 *
 * @effect 挂在名下的方法，不与别的插件等冲突
 * @author  作者
 * @param  参数
 * @example    例子
 * @link   链接
 * @namespace  命名空间
 * @requires   依赖
 * @return 返回值
 * @version    版本号
 * @date    时间
 *
 */

// 声明函数
function WidgetFun(){
    // 利用instanceof运算符，还可以巧妙地解决，调用构造函数时，忘了加new命令的问题。
    if (! this instanceof WidgetFun) {
        return new WidgetFun();
    }
};





// 保留 n 小数
WidgetFun.prototype.toDecimal = function (val,length) {
    var denominator=1;
    if (!length) {
        denominator = 100;
    }else{
        for (var i = 0; i < length; i++) {
            denominator = denominator*10;
        };
    }
    return Math.floor(val * denominator ) / denominator ;
};
// 获取字符串中的数字
WidgetFun.prototype.getNum = function (val) {
    if(val == null) {
        return "";
    };
    return val.replace(/[^0-9]/ig, "");
};
// 清除字符串前面的所有0
WidgetFun.prototype.parseIt = function (val) {
    if(val == null) {
        return "";
    };
    return val.replace(/\b(0+)/gi,"");
};
// 判断是否含有 n 位及 n 位数以上的小数
WidgetFun.prototype.isMeet = function (val,length) {
    var y = String(val).indexOf(".") + 1;
    var count = String(val).length - y;
    if (!length) {
        length = 2;
    };
    if( y>0 && count>=length ) {
        return true;
    } else {
        return false;
    }
};
// 验证是否为正整数
WidgetFun.prototype.isInteger = function (value) {
    var patrn = /^\+?[1-9][0-9]*$/;
    if (patrn.exec(value-0) == null || value == "") {
        return false;
    } else {
        return true;
    }
};
// Obj的深度拷贝
WidgetFun.prototype.deepCopyObj = function (obj) {
    var newObj = obj.constructor === Array ? []:{};
    // 实现深层复制
    if( obj.constructor === Array ){
        newObj = newObj.concat( obj );
    }else if( obj.constructor === Object ){
        for(var key in obj){
            // 判断如果是对象
            if( typeof obj[key] === 'object' ){
                if(obj[key] === null || obj[key].constructor === RegExp || obj[key].constructor === Date ){
                    newObj[key] = obj[key];
                } else {
                    // 递归
                    newObj[key] = this.deepCopyObj(obj[key]);
                }
            } else {
                newObj[key] = obj[key];
            }
        }
    }else{
        newObj = obj;
    }
    return newObj;
};


















