/* 
 * IE下实现placeholder效果和 contenteditable="true" 实现placeholder效果
*/
;(function($){
    $.fn.mocPlaceholder = function(options){
        var defaults = {
            'placeholderClass' : false // 添加特殊类名
        };
        var options = $.extend(defaults,options || {});
        return this.each(function(){
            var o = options;
            var _this = this;
            if ( $(_this).attr('placeholder')==undefined ) {
                return;
            }
            // 判断浏览器是否支持placeholder
            if (!isPlaceholder) {
                _init(_this);
            }
        });
        function _init(self){
            var o = options;
            var placeholderTxt = $(self).attr('placeholder');
            var placeholderDom = $('<span class="wrap-placeholder">'+ placeholderTxt +'</span>');
            if (o.placeholderClass) {
                placeholderDom.addClass(o.placeholderClass);
            }
            placeholderDom.css({
                'width': $(self).mocActual('width'),
                'height': $(self).mocActual('outerHeight'),
                'display': $(self).css('display'),
                'margin-left':$(self).css('margin-left'),
                'margin-top':$(self).css('margin-top'),
                'font-size':$(self).css('font-size'),
                'font-family':$(self).css('font-family'),
                'font-weight':$(self).css('font-weight'),
                'text-indent':$(self).css('text-indent'),
                'padding-left':parseInt($(self).css('padding-left')) + 2 + 'px',
                'line-height':$(self).css('line-height'),
                'padding-top':self.nodeName.toLowerCase() == 'textarea' ? parseInt($(self).css('padding-top')) + 2 : 0
            });
            $(self).before(placeholderDom.click(function () {
                $(self).trigger('focus');
            }));
            /* 判断内容是否为空 */
            var txtNum = $(self).val().length || $(self).text().length;
            if (txtNum != 0) { 
                placeholderDom.hide();
            }
            /* 输入事件 */
            //绑定oninput/onpropertychange事件
            var inputChangeEvent = typeof(self.oninput) == 'object' ? 'input' : 'propertychange';
            $(self).bind(inputChangeEvent, function () {
                placeholderDom[0].style.display = $(self).val().length != 0 ? 'none' : $(self).css('display');
            });        }
    };
    var isPlaceholder = (function(){
        var input = document.createElement('input');
        return 'placeholder' in input;
    })();
})(jQuery);