/**
 * @name 流程进度条
 * @version 1.0.0
 * @author mss
 * @url 
 *
 */
(function(factory) {
    "use strict";
    if (typeof define === 'function') {
        // using CMD; register as anon module
        define.cmd && define('jquery-step', ['jquery'], function(require, exports, moudles) {
            var $ = require("jquery");
            factory($);
            return $;
        });
        define.amd && define(['jquery'], factory);
    } else {
        // no CMD; invoke directly
        factory((typeof(jQuery) != 'undefined') ? jQuery : window.Zepto);
    }
}
(function($) {
    $.fn.mocStep = function(options) {
        var opts = $.extend({}, $.fn.mocStep.defaults, options);
        var size = this.find(".step-item").length;
        var barWidth = opts.initStep < size ? 100 / (2 * size) + 100 * (opts.initStep - 1) / size : 100;
        var curPage = opts.initStep;

        this.find(".step-header").prepend('<div class="step-bar"><div class="step-bar-active"></div></div>');
        this.find(".step-list").eq(opts.initStep - 1).show();
        if (size < opts.initStep) {
            opts.initStep = size;
        }
        if (opts.animate == false) {
            opts.speed = 0;
        }
        this.find(".step-item").each(function(i, li) {
            if (i < opts.initStep) {
                if (i == opts.initStep - 1) {
                    $(li).addClass("step-active step-active-last");
                } else {
                    $(li).addClass("step-active");
                }
            }
            if( $(li).find('.step-order').length === 0 ){
                $(li).prepend('<span class="step-order"></span>');
            }
            if( opts.serialNumber ){
                $(li).find('.step-order').text(i + 1);
            }
        });
        this.find(".step-item").css({
            "width": 100 / size + "%"
        });
        this.find(".step-header").show();
        this.find(".step-bar-active").animate({
                "width": barWidth + "%"
            }, opts.speed, function() {

            });
        this.nextStep = function() {
            if (curPage >= size) {
                return false;
            }
            return this.goStep(curPage + 1);
        }

        this.preStep = function() {
            if (curPage <= 1) {
                return false;
            }
            return this.goStep(curPage - 1);
        }

        this.goStep = function(page) {
            if (page == undefined || isNaN(page) || page < 0) {
                if (window.console && window.console.error) {
                    console.error('the method goStep has a error,page:' + page);
                }
                return false;
            }
            curPage = page;
            this.find(".step-list").hide();
            this.find(".step-list").eq(curPage - 1).show();
            this.find(".step-item").each(function(i, li) {
                $li = $(li);
                $li.removeClass('step-active step-active-last');
                if (i < page) {
                    if (i == page - 1) {
                        $li.addClass("step-active step-active-last");
                    } else {
                        $li.addClass('step-active');
                    }
                    if (opts.scrollTop) {
                        $('html,body').animate({ scrollTop: 0 }, 'slow');
                    }
                }
            });
            barWidth = page < size ? 100 / (2 * size) + 100 * (page - 1) / size : 100;
            this.find(".step-bar-active").animate({
                    "width": barWidth + "%"
                },
                opts.speed,
                function() {

                });
            return true;
        }
        return this;
    };

    $.fn.mocStep.defaults = {
        initStep: 1,                // 第几个开始
        animate: true,              // 是否开启动画
        speed: 500,                 // 动画时间
        serialNumber: false,        // 序号
        scrollTop: false            // 滚动条的位置
    };

}));