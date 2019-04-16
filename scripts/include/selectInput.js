/**
 *
 * @effect      下拉选择的输入框
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
            beforeOpen:function(){},
            activeCallback:function(){}
        };
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
        // 循环添加默认值，或根据默认值复值
        $(".input-dropdown").each(function(index, el) {
            if ( $(el).find('.input-dropdown-btn.active:last').length==0 ) {
                $(el).find('.input-dropdown-btn:first').addClass('active');
            }
            var txt = $(el).find('.input-dropdown-btn.active:last').text();
            $(el).find('.input-dropdown-toggle span').text(txt);
        });
        _event(self);
    }
    function _event(self){
        // 点击任意地方关闭下拉框
        $(document).on('click', function () {
            $(".input-dropdown").removeClass('open');
        });
        // jQuery的阻止冒泡事件
        $(document).on('click', '.input-dropdown-menu', function (event) {
            event.stopPropagation();
        });
        // 下拉框的弹出与显示
        $(document).on('click', '.input-dropdown-toggle', function (event) {
            event.preventDefault();
            event.stopPropagation();

            if( $(this).closest(".input-dropdown").hasClass('open') ){
                $(this).closest(".input-dropdown").removeClass('open');
            }else{
                self.options.beforeOpen(this);
                $(this).closest(".input-dropdown").addClass('open');
            };
            
        });
        // 选值赋值
        $(document).on('click', '.input-dropdown-btn', function () {
            var dom = $(this).closest(".input-dropdown"),
                txt = $(this).text();
            $(this).addClass('active').siblings().removeClass('active');
            dom.find('.input-dropdown-toggle span').text(txt);
            dom.toggleClass('open');
            self.options.activeCallback(this);
        });
    }
    //在插件中使用privateFunction对象
    $.fn.mocSelectInput = function(options) {
        var privateFun = new privateFunction(this, options);
        return privateFun;
    }
})(jQuery);