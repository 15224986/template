/**
 *
 ************************  无法获取隐藏元素（display:none）宽度(width)和高度(height)的新解决方案  ************************
 * @async       原名 jquery.actual.js
 * @author      作者
 * @date        修改时间
 * @param       参数
 * @Version:    1.0.19
 * @link        连接
 * @namespace   命名空间
 * @Requires:   依赖 jQuery >= 1.2.3
 * @return      返回值
 * @example     下面是使用的例子
 * 
 * 获取隐藏元素实际宽度
 * $('.hidden').mocActual('width');
 *
 * 获取隐藏元素的innerWidth宽度
 * $('.hidden').mocActual('innerWidth');
 *
 * 获取隐藏元素的outerWidth宽度
 * $('.hidden').mocActual('outerWidth');
 * 
 * 隐藏元素的实际边界的高度和 Margin的高度
 * $('.hidden').mocActual('outerWidth',{includeMargin:true});
 *
 * 如果页面跳转或闪烁，则传递一个属性"{absolute:true}"
 * 要非常小心，你可能会得到错误的结果取决于你如何makrup HTML和CSS
 * $('.hidden').mocActual('height',{absolute:true});
 *
 * 如果你使用css3pie with a浮动元素
 * 例如，一个圆角导航菜单，您还可以尝试传递一个属性“{clone:true}”。
 * $('.hidden').mocActual('width',{clone:true});
 * 
 */
;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register module depending on jQuery using requirejs define.
        define(['jquery'], factory);
    } else {
        // No AMD.
        factory(jQuery);
    }
}(function($) {
    $.fn.addBack = $.fn.addBack || $.fn.andSelf;

    $.fn.extend({

        mocActual: function(method, options) {
            // check if the jQuery method exist
            if (!this[method]) {
                throw '$.mocActual => The jQuery method "' + method + '" you called does not exist';
            }

            var defaults = {
                absolute: false,
                clone: false,
                includeMargin: false,
                display: 'block'
            };

            var configs = $.extend(defaults, options);

            var $target = this.eq(0);
            var fix, restore;

            if (configs.clone === true) {
                fix = function() {
                    var style = 'position: absolute !important; top: -1000 !important; ';

                    // this is useful with css3pie
                    $target = $target.
                    clone().
                    attr('style', style).
                    appendTo('body');
                };

                restore = function() {
                    // remove DOM element after getting the width
                    $target.remove();
                };
            } else {
                var tmp = [];
                var style = '';
                var $hidden;

                fix = function() {
                    // get all hidden parents
                    $hidden = $target.parents().addBack().filter(':hidden');
                    style += 'visibility: hidden !important; display: ' + configs.display + ' !important; ';

                    if (configs.absolute === true) style += 'position: absolute !important; ';

                    // save the origin style props
                    // set the hidden el css to be got the mocActual value later
                    $hidden.each(function() {
                        // Save original style. If no style was set, attr() returns undefined
                        var $this = $(this);
                        var thisStyle = $this.attr('style');

                        tmp.push(thisStyle);
                        // Retain as much of the original style as possible, if there is one
                        $this.attr('style', thisStyle ? thisStyle + ';' + style : style);
                    });
                };

                restore = function() {
                    // restore origin style values
                    $hidden.each(function(i) {
                        var $this = $(this);
                        var _tmp = tmp[i];

                        if (_tmp === undefined) {
                            $this.removeAttr('style');
                        } else {
                            $this.attr('style', _tmp);
                        }
                    });
                };
            }

            fix();
            // get the mocActual value with user specific methed
            // it can be 'width', 'height', 'outerWidth', 'innerWidth'... etc
            // configs.includeMargin only works for 'outerWidth' and 'outerHeight'
            var mocActual = /(outer)/.test(method) ?
                $target[method](configs.includeMargin) :
                $target[method]();

            restore();
            // IMPORTANT, this plugin only return the value of the first element
            return mocActual;
        }
    });
}));