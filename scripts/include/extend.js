/**
 * @effect  简单的小功能，实用、方便、简单 (缺点：添加到了jq库中，容易与别的方法名冲突，尽量添加前缀)
 * @effect  直接添加到 jQuery 空间，易冲突少用
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
;(function($){
    $.extend({
        template: function(val) { // 模版模版
            if(val == null) {
                return "";
            };
            return val.replace(/(\s*$)/g, "");
        }
    });
})(jQuery);