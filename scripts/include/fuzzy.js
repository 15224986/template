/**
 *
 * @effect      mocFuzzy 模糊搜索组件的各种事件
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
        self.defaults = {
            activeCallback:function(){}
        };
        self.options = $.extend({}, self.defaults, options);
        // 找到DOM,this是插件本身
        self.$element = $(ele);
        /**
         * 生成结构
         */
        _event(self);
    };
    /**
     * 生成结构
     */
    function _event(self){
        // 点击列表赋值and隐藏
        $(document).on('click', '.fuzzy-list', function () {
            var txt = $(this).text();
            $(this).closest(".fuzzy-box").find('.fuzzy-input').val(txt);
            $(this).closest(".fuzzy-box").find('.fuzzy-list').hide();
            // 点击选择的时候，调用页面的这个方法
            self.options.activeCallback(this);
        });
        // 失去焦点隐藏
        $(document).on('blur', '.fuzzy-input', function () {
            $(this).closest(".fuzzy-box").find('.fuzzy-list').delay(200).hide(0);
        });
        // 键盘事件
        $(document).on('input keyup focus', ".fuzzy-input", function () {
            var vale = $(this).val();
            if ( vale=="" ) {
                $(this).closest(".fuzzy-box").find('.fuzzy-list').hide();
            }else{
                $(this).closest(".fuzzy-box").find('.fuzzy-list').hide().filter(':contains("' + vale + '")').show();
            }
        });
    }
    //在插件中使用privateFunction对象
    $.fn.mocFuzzy = function(options) {
        var privateFun = new privateFunction(this, options);
        return privateFun;
    }
})(jQuery);