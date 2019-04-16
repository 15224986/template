/**
 *
 * @effect      div模拟输入框
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
            'words': false,                 // 类型：number  最多输入的文字个数 可以通过给dom配置data-words="120"修改字数
            'location': 'after'             // 类型：string  after 在后面  before 在前面
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
        // 循环添加原有文字个数
        self.$element.each(function (index, el) {
            var number = $(el).text().length;
            var maxNumber = $(el).data('words') || self.options.words;
            if( maxNumber ){
                var location = $(el).attr('data-location') || self.options.location;
                if(location==="before"){
                    var lwords =  $('<p>', {
                        class:'contenteditable-length'
                    }).insertBefore(el);
                }else{
                    var lwords =  $('<p>', {
                        class:'contenteditable-length'
                    }).insertAfter(el);
                }
                $('<span>', {
                    text: number,
                    class:'contenteditable-length-val'
                }).appendTo(lwords);
                $('<span>', {
                    "text":'/',
                    class:'contenteditable-length-txt'
                }).appendTo(lwords);
                $('<span>', {
                    text: maxNumber,
                    class:'ccontenteditable-length-max'
                }).appendTo(lwords);
            }
            if($(el).attr('placeholder')){
                if (number > 0) {
                    $(el).removeClass('has-placeholder');
                }else{
                    $(el).addClass('has-placeholder');
                }
            }   
        });
        _event(self);
    }
    function _event(self){
        self.$element.on('input propertychange keyup blur', function () {
            // 判断是否有 placeholder 效果
            if ($(this).attr('placeholder')) {
                $(this).removeClass('has-placeholder')
                if ($(this).text() == "") {
                    $(this).addClass('has-placeholder')
                };
            }
            // 判断是否有 maxlength 效果
            var number = $(this).text().length;
            var maxNumber = $(this).data('words') || self.options.words;
            if (maxNumber) {
                if (number >= maxNumber) {
                    number = maxNumber;
                    var text = $(this).text().substr(0, number);
                    $(this).text(text);
                    // 截取后将光标放到最后
                    var _this = $(this)[0]
                    _this.focus();
                    if ($.support.msie) {
                        var range = document.selection.createRange();
                        this.last = range;
                        range.moveToElementText(_this);
                        range.select();
                        document.selection.empty(); //取消选中
                    } else {
                        var range = document.createRange();
                        range.selectNodeContents(_this);
                        range.collapse(false);
                        var sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
                $(this).parent().find('.contenteditable-length-val').text(number);
            }
        });
    }
    //在插件中使用privateFunction对象
    $.fn.mocContenteditable = function(options) {
        var privateFun = new privateFunction(this, options);
        return privateFun;
    }
})(jQuery);
$(function(){
    $('[contenteditable="true"]').mocContenteditable();
});
