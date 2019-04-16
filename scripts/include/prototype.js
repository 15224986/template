/**
 *
 * @effect 原型上添加的函数
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

/* 
 * 去除数组相同的方法
*/
Array.prototype.unique = function(){
    this.sort();
    var res = [this[0]];
    for(var i = 1; i < this.length; i++){
        if(this[i] !== res[res.length - 1]){
            res.push(this[i]);
        }
    }
    return res;
}

/* 
 * 数组中的删除的方法
*/
Array.prototype.remove = function(val) {
    var arr = this;
    arr = $.grep(arr, function( n, i ) {
        return ( i != val );
    });
    return arr;
};

/* 
 * 从数组中删除指定值元素的方法
*/
Array.prototype.removeVal = function(val) {
    var arr = this;
    arr = $.grep(arr, function( n, i ) {
        return ( n != val );
    });
    return arr;
};


/* 
 * 字符串原形上添加区分 全角、半角均视为是一个字符  汉字视为两个字符
*/
String.prototype.Tlength = function(){
    var arr=this.match(/[^\x00-\xff]/ig);
    return this.length+(arr==null?0:arr.length);
}
/**
 * 从字符串左边取 n 个字符
 */
String.prototype.leftLength = function(num,mode,fill) {
    if (!/\d+/.test(num)){ // 判断是不是数字
        return ;
    }
    var str = this.substr(0,num);
    if (mode){
        var Length = num;
        for (var i = 0; i < str.Tlength(); i++) {
            if ( str.Tlength()>num ) {
                var n = str.Tlength() - str.length;
                Length = Length - parseInt(n/2);
                str = this.substr(0, Length);
            }else if( str.Tlength()<num ) {
                Length = Length +1;
                str = this.substr(0, Length);
            } else{
                break;
            }
        }
    }
    if(fill){
        str = str+"...";
    }
    return str;
}
