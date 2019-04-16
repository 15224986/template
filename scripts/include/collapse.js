/**
 *
 * @effect      关闭展开 补充bootstrap的Collapse插件
 * @requires    jQuery
 * @Example     bootstrap.html
 * @date
 *
 */
;(function (factory) {
    "use strict";
    if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        // AMD或CMD
        define([ "jquery" ],factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        //Browser globals
        factory(jQuery);
    }
}(function ($) {
    //定义Beautifier的构造函数
    var privateFunction = function(ele, options) {
        // 版本号
        var self = this;
        self.version = "1.0";

        // 定义默认参数
        self.defaults = {
            'collapseItem'  : '.collapse-item',     // 每一块的标识
            'collapseHead'  : '.collapse-head',     // 每一块的头部的标识
            'collapseBody'  : '.collapse',          // 每一块的身体的标识
            'collapseBtn'   : 'collapse-btn',       // 操作按钮的标识
            'active'        : 'active',             // 操作按钮添加的选中类名
            'relevancy'     : false,                // 是否存在关联关系 也可以通过给控制标签添加data-relevancy来更改参数  类型：Boolean  默认值：false
            'showBack'      : false,                // 展开前回调
            'shownBack'     : false,                // 展开后回调
            'hideBack'      : false,                // 关闭前回调
            'hiddenBack'    : false                 // 关闭后回调
        };
        self.options = $.extend({}, self.defaults, options);
        // 找到DOM,this是插件本身
        self.$element = $(ele);
        
        // 添加默认展开
        self.$element.each(function(index, el) {
            if ( $(el).hasClass('active') ) {
                $(el).closest(self.options.collapseItem).children(self.options.collapseBody).addClass('in');
            }
        });

        // 给控制元素添加标识
        self.$element.attr('moc-identification',self.options.collapseBtn);

        // 点击事件
        self.$element.on('click', function(event) {
            event.preventDefault();

            var $this = $(this),
                $collapse = $this.closest(self.options.collapseItem).children(self.options.collapseBody);
            if( $collapse.is(":hidden") ){ // 判断被控制的元素是否为隐藏状态
                if (typeof self.options.showBack === 'function') {
                    self.options.showBack.call(this);
                }
                // 展开，添加选中类名
                $collapse.slideDown().addClass('in');
                $this.addClass(self.options.active);
                if (typeof self.options.shownBack === 'function') {
                    self.options.shownBack.call(this);
                }
                // 判断是否互相关联
                var relevancy = self.options.relevancy
                if( $this.data('relevancy') !== undefined ){
                    relevancy = $this.data('relevancy');
                }
                if ( relevancy === true ) {
                    var $siblings = $this.closest(self.options.collapseItem).siblings(self.options.collapseItem);
                    $siblings.children(self.options.collapseBody).slideUp().removeClass('in');
                    $siblings.children(self.options.collapseHead).find('[moc-identification="'+self.options.collapseBtn+'"]').removeClass(self.options.active);
                }
            }else{
                if (typeof self.options.hideBack === 'function') {
                    self.options.hideBack.call(this);
                }
                $collapse.slideUp().removeClass('in');
                $this.removeClass(self.options.active);
                if (typeof self.options.hiddenBack === 'function') {
                    self.options.hiddenBack.call(this);
                }
            }
        });
    };

    //在插件中使用Beautifier对象
    $.fn.mocCollapse = function(options) {
        var privateFun = new privateFunction(this, options);
        return privateFun;
    }
}));