/**
 *
 * @effect      mocVersatility 可选输入框组件的各种事件
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
	    $(".versatility-box").each(function(index, el) {
	        var txt = $(el).find('.versatility-results-list.active:last').text();
	        $(el).find('.versatility-input').val(txt);
	    });
        _event(self);
    }
    function _event(self){
        // 点任意地方，下拉框消失
	    $(document).on('click', function () {
	        $('.versatility-dropdown').slideUp();
	    });
	    // jQuery的阻止冒泡事件
	    $(document).on('click', '.versatility-dropdown', function (event) {
	        event.stopPropagation();
	    });
	    // 下拉选框的显示和隐藏
	    $(document).on('click', '.versatility-toggle', function (event) {
	        event.stopPropagation();
	        var openDome = $(this).closest(".versatility-box").find('.versatility-dropdown');
	        if (openDome.is(':hidden')) {
	        	self.options.beforeOpen(this);
	        	openDome.slideDown();
	        }else{
	        	openDome.slideUp();
	        }
	    });
	    // 点击列表赋值 and 隐藏
	    $(document).on('click', '.versatility-results-list', function () {
	        var txt = $(this).text();
	        $(this).closest(".versatility-box").find('.versatility-input').val(txt);
	        $(this).addClass('active').siblings().removeClass('active');
	        self.options.activeCallback(this);
	        $(this).closest(".versatility-dropdown").slideUp();
	    });
	    // 搜索框的搜索事件
	    $(document).on('input keyup', ".versatility-search-input", function () {
	        var vale = $.trim($(this).val());
	        if (vale == "") {
	            $(this).closest(".versatility-dropdown").find('.versatility-results-list').show();
	        } else {
	            $(this).closest(".versatility-dropdown").find('.versatility-results-list').hide().filter(':contains("' + vale + '")').show();
	        }
	    });
	    // 可输入下拉框，如果值改变，清除选中状态
	    $(document).on('input keyup', ".versatility-input", function () {
	        var selectedDom = $(this).closest(".versatility-box").find('.versatility-results-list.active'),
	            length = selectedDom.length;
	        if (length > 0) {
	            var vale = $.trim($(this).val()),
	                selectedVal = $.trim(selectedDom.text());
	            if (vale != selectedVal) {
	                selectedDom.removeClass('active');
	            }
	        }
	    });
    }
    //在插件中使用privateFunction对象
    $.fn.mocVersatility = function(options) {
        var privateFun = new privateFunction(this, options);
        return privateFun;
    }
})(jQuery);