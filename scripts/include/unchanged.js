/**
 *
 * @effect      input 前几位的值不可以改变
 * @requires    jQuery
 * @Example     form.html
 * @date
 *
 */
;(function($){
    //定义privateFunction的构造函数
    var privateFunction = function(ele, options) {
        var self = this;
        // 版本号
        self.version = "1.00";
        // 定义默认参数
        self.defaults = {};
        self.options = $.extend({}, self.defaults, options);
        // 找到DOM,this是插件本身
        self.$element = $(ele);
        /**
         * 生成结构
         */
        _init(self);
    };
    /**
     * 生成结构
     */
    function _init(self){
        // 循环添加原有文字个数
        self.$element.each(function (index, el) {
        	var defaultVal = $(el).attr('data-unchanged-value');
	        if ( defaultVal ) {
	            var length = defaultVal.length;
	            $(el).attr('data-unchanged-length',length);
	            var value = $(el).val().substring(length, $(el).val().length);
	            $(el).val(defaultVal+value);
	        }else{
	            var length = $(el).attr('data-unchanged-length');
	            var val = $(el).val().substring(0,length);
                $(el).attr('data-unchanged-value',val);
	        }
        });
        _event(self);
    }
    function _event(self){
        self.$element.on('input propertychange keyup blur', function () {
            var defaultVal = $(this).attr('data-unchanged-value');
	        if (defaultVal) {
	            var length = $(this).attr('data-unchanged-length');
	            var val = $(this).val().substring(length, $(this).val().length);
	            $(this).val(defaultVal+val);
	        }
        });
    }
    //在插件中使用privateFunction对象
    $.fn.mocUnchanged = function(options) {
        var privateFun = new privateFunction(this, options);
        return privateFun;
    }
})(jQuery);
$(function(){
    $('[data-unchanged-value]').mocUnchanged();
    $('[data-unchanged-length]').mocUnchanged();
});