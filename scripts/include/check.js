/* 
 * check 美化
*/
;(function($){
    'use strict';
    var privateFunction = function(ele, options) {
        var self = this;
        self.version = "1.01";
        self.$element = $(ele);
        if (typeof(options) === "string") {
            return self.$element.each(function(index, el) {
                var $this = $(el);
                Methodfn($this,options,self);
            });
        }else{
            self.defaults = {
                'type': 'simple',   // simple 是仿 simple_switch  strap 是仿 bootstrap-switch    button 是仿 button美化
                'theme': "",        // 添加皮肤
                'switchOnText' : 'on',
                'switchLabelText' : '',
                'switchOffText': 'off'
            };
            self.options = $.extend({}, self.defaults, options);
            //调用其方法
            init(self);
        };  
    };

    function init(self){
        var o = self.options;
        self.$element.each(function(index, el) {
            // 如果插件已经调用过，跳出本次循环
            if( $(el).attr('data-moccheck-type')==="true" ){
                return true;
            }
            // 输入框被应用了 mocCheck 样式
            $(el).trigger( $.Event('ifCreated') );
            // 生成dom结构
            if ( o.type === 'simple' ) {
                var mocCheckDiv = $("<div>", {
                    'class' : "mocCheck-simple"
                }).insertAfter( el );
                var mocCheckBox = $("<div>", {
                        'class' : "mocCheck-util"
                    }).appendTo(mocCheckDiv);
                $("<p>", {
                    'class' : "mocCheck-util-on",
                    'text'  : o.switchOnText
                }).appendTo(mocCheckBox);
                $("<p>", {
                    'class' : "mocCheck-util-off",
                    'text'  : o.switchOffText
                }).appendTo(mocCheckBox);
                $("<div>", {
                    'class' : "mocCheck-btn",
                    'text'  : o.switchLabelText
                }).appendTo(mocCheckDiv);
            }else if( o.type === 'strap' ){
                var mocCheckDiv = $("<div>", {
                    'class' : "mocCheck-strap"
                }).insertAfter( el );
                var mocCheckBox = $("<div>", {
                        'class' : "mocCheck-util"
                    }).appendTo(mocCheckDiv);
                $("<p>", {
                    'class' : "mocCheck-util-on",
                    'text'  : o.switchOnText
                }).appendTo(mocCheckBox);
                $("<p>", {
                    'class' : "mocCheck-util-label",
                    'text'  : o.switchLabelText
                }).appendTo(mocCheckBox);
                $("<p>", {
                    'class' : "mocCheck-util-off",
                    'text'  : o.switchOffText
                }).appendTo(mocCheckBox);
            }else{
                return false;
            }
            // 添加特殊样式
            mocCheckDiv.addClass(o.theme);
            // 将input插入到div中
            $(el).attr('data-moccheck-type', 'true').prependTo(mocCheckDiv);
            // 根据属性添加状态
            if ($(el).attr('checked')) {
                mocCheckDiv.addClass('checked');
            };
            // 根据属性添加状态
            if ($(el).attr('disabled')) {
                mocCheckDiv.addClass('disabled');
            };

            // 点击事件，改变状态
            mocCheckDiv.on('click', function() {
                if( $(this).hasClass('disabled') ){
                    return;
                }
                var $input = $(this).children('input');
                // click事件
                $input.trigger( $.Event('ifClicked') );
                if( $input.attr('type') === "checkbox" ){ // 多选按钮
                    if ( $input.prop('checked') ) {
                        $input.removeAttr('checked');
                        $input.prop('checked', false);
                        // 复选框 checked 状态被移除
                        $input.trigger( $.Event('ifUnchecked') );
                    }else{
                        $input.attr('checked', 'checked');
                        $input.prop('checked', true);
                        // 复选框 输入框的状态变为 checked
                        $input.trigger( $.Event('ifChecked') );
                    }
                    $(this).toggleClass('checked');
                }else if( $input.attr('type') === "radio" ){ // 单选按钮
                    var radioName = $input.attr('name');
                    $('input[name="'+ radioName +'"]').removeAttr('checked');
                    $('input[name="'+ radioName +'"]').prop('checked', false);
                    $('input[name="'+ radioName +'"]').parent().removeClass('checked');
                    $input.attr('checked', 'checked');
                    $input.prop('checked', true);
                    $(this).addClass('checked');
                    // 单选框 输入框的状态变为 checked
                    $input.trigger( $.Event('ifChecked') );
                }
                // change事件
                $input.trigger( $.Event('ifChanged') );
            });
        });
    }


    /*
     *
     * 方法 
     *
    */
    // $('input').mocCheck('check');   将输入框的状态设置为checked 
    // $('input').mocCheck('uncheck'); 移除 checked 状态 
    // $('input').mocCheck('toggle');  toggle checked state 
    // $('input').mocCheck('disable'); 将输入框的状态设置为 disabled 
    // $('input').mocCheck('enable');  移除 disabled 状态 
    // $('input').mocCheck('destroy'); 移除 mocCheck 样式
    function Methodfn($this,o,self){
        if (o == "check" ) {
            if ( $this.attr('disabled') ){
                return true;
            }
            if ( $this.attr('type')==='checkbox' ) {
                $this.prop('checked', true);
                $this.attr('checked', 'checked');
                $this.parent().addClass('checked');
                // ifChanged ifChecked
                $this.trigger( $.Event('ifChanged') );
                $this.trigger( $.Event('ifChecked') );
            }else if($this.attr('type')==='radio'){
                var radioName = $this.attr('name');
                $('input[name="'+ radioName +'"]').removeAttr('checked');
                $('input[name="'+ radioName +'"]').prop('checked', false);
                $('input[name="'+ radioName +'"]').parent().removeClass('checked');
                $this.attr('checked', 'checked');
                $this.prop('checked', true);
                $this.parent().addClass('checked');
                // 单选框 输入框的状态变为 checked
                $this.trigger( $.Event('ifChanged') );
                $this.trigger( $.Event('ifChecked') );
            }
        }else if (o == "uncheck" ) {
            if ( $this.attr('disabled') ){
                return true;
            }
            $this.prop('checked', false);
            $this.removeAttr('checked');
            $this.parent().removeClass('checked');
            // 单选框 输入框的状态变为 checked
            $this.trigger( $.Event('ifChanged') );
            $this.trigger( $.Event('ifUnchecked') );
        }else if ( o == 'toggle') {
            if ( $this.attr('disabled') ){
                return true;
            }
            if ( $this.attr('type')==='checkbox' ){
                if( $this.prop('checked') ){
                    $this.prop('checked', false);
                    $this.removeAttr('checked');
                    $this.parent().removeClass('checked');
                    // ifChanged ifUnchecked
                    $this.trigger( $.Event('ifChanged') );
                    $this.trigger( $.Event('ifUnchecked') );
                }else{
                    $this.prop('checked', true);
                    $this.attr('checked', 'checked');
                    $this.parent().addClass('checked');
                    // ifChanged ifChecked
                    $this.trigger( $.Event('ifChanged') );
                    $this.trigger( $.Event('ifChecked') );
                }
            }else if( $this.attr('type')==='radio' ){
                alert("单选按钮没有toggle方法。。。");
            }
        }else if (o == "disable" ) {
            $this.attr('disabled', 'disabled');
            $this.parent().addClass('disabled');
            // 输入框状态变为 disabled
            $this.trigger( $.Event('ifDisabled') );
            $this.trigger( $.Event('ifChanged') );
        }else if (o == "enable" ) {
            $this.removeAttr('disabled');
            $this.parent().removeClass('disabled');
            // disabled 状态被移除
            $this.trigger( $.Event('ifEnabled') );
            $this.trigger( $.Event('ifChanged') ); 
        }else if (o == "destroy" ) {
            if( $this.attr('data-moccheck-type')==="true" ){
                $this.insertBefore( $this.parent() );
                $this.next().remove();
                $this.attr('data-moccheck-type','false');
                // mocCheck样式被移除
                $this.trigger( $.Event('ifDestroyed') ); 
            }
        }   
    }
  
    //在插件中使用privateFunction对象
    $.fn.mocCheck = function(options) {
        var privateFun = new privateFunction(this, options);
        return privateFun;
    }
})(jQuery);
