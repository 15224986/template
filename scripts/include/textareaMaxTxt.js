/* 
 * 文本域限制文字个数
 *  
*/
;(function ($) {
    $.fn.mocTextareaMaxTxt = function (opts) {
        var defaults = {
            maxNumber: 140, //允许输入的最大字数
            position: 'top', //提示文字的位置，top：文本框上方，bottom：文本框下方
            onOk: function () {}, //输入后，字数未超出时调用的函数
            onOver: function () {} //输入后，字数超出时调用的函数   
        };
        var option = $.extend(defaults, opts);
        this.each(function (i) {
            var _this = $(this);
            var maxNumber = _this.attr('maxlength') || option.maxNumber;
            var length = $(_this).val().length || $(_this).text().length;
            // 插入标签
            var info = '<div id="info' + i + '"  class="maxlength-txt">还可以输入 <b>' + (maxNumber - length) + '</b> 个字</div>';
            if(option.position == 'bottom'){
                _this.after(info);
            }else{
                _this.before(info);
            }
            // 编写方法
            var fn = function () {
                length = $(_this).val().length || $(_this).text().length;
                var extraNumber = maxNumber - length;
                var $info = $('#info' + i);
                if (extraNumber >= 0) {
                    $info.html('还可以输入 <b>' + extraNumber + '</b> 个字');
                    option.onOk();
                } else {
                    if ( $(_this).attr('contenteditable')=="true" ) {
                        _this.text(_this.text().substr(0, maxNumber));
                    }else{
                        _this.val(_this.val().substr(0, maxNumber));
                    }
                    option.onOver();
                }
            };
            //绑定输入事件监听器
            if (window.addEventListener) { //先执行W3C
                _this.get(0).addEventListener("input", fn, false);
            } else {
                _this.get(0).attachEvent("onpropertychange", fn);
            }
            if (window.VBArray && window.addEventListener && window.attachEvent) { //IE9
                _this.get(0).attachEvent("onkeydown", function () {
                    var key = window.event.keyCode;
                    (key == 8 || key == 46) && fn(); //处理回退与删除
                });
                _this.get(0).attachEvent("onkeyup", function () {
                    var key = window.event.keyCode;
                    (key == 8 || key == 46) && fn(); //处理回退与删除
                });
                _this.get(0).attachEvent("oncut", fn); //处理粘贴
            }
        });
    };
})(jQuery);