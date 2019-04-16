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