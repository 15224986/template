/**
 *
 * @effect          与组件相关的一些代码片段
 * @author          作者
 * @param           参数
 * @example         例子
 * @link            链接
 * @namespace       命名空间
 * @requires        依赖
 * @return          返回值
 * @version         版本号
 * @date            时间
 *
 */


/**
 *
 * @effect      各个组件的删除事件 and 关闭事件
 * @requires    jQuery
 * @Example     index.html
 * @date
 *
 */


//  $.Event() 构造器  通过$.trigger来触发
//  
//  $.Event 你不知道的用法
//  https://www.cnblogs.com/ip128/p/4570394.html
//  
//  jQuery.event详细解析
//  https://www.cnblogs.com/sntetwt/p/3957905.html
// 
//  4.event.target属性
//  event.target 属性的作用是获取到出发事件的元素。jQuery对其封装后，避免了W3C、IE和safari浏览器不同标准的差异。
// 
$(function () {
    $(document).on('click', '[data-dismiss="panel"], [data-dismiss="alert-item"], [data-dismiss="tag-item"]', function (event) {
        event.preventDefault();
        var name = $(this).data('dismiss');
        var type = $(this).data('dismissRemove');
        // 自定义事件传递参数
        var relatedTarget = { 
            relatedTarget: this
        }
        // 隐藏前调用方法
        $(this).closest('.'+ name).trigger( $.Event('ifHide', relatedTarget) );
        // 隐藏
        if( type === true ){
            $(this).closest('.'+ name).remove();
        }else{
            $(this).closest('.'+ name).hide();
        }
        // 隐藏后调用方法
        $(this).closest('.'+ name).trigger( $.Event('ifHidden', relatedTarget) );
    });
});


/**
 *
 * @effect      面板的关闭
 * @requires    jQuery
 * @Example     index.html
 * @date
 *
 */
$(function () {
    $(document).on('click', '[data-collapse="panel"]', function (event) {
        event.preventDefault();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).closest('.panel').children('.panel-body').slideDown();
            $(this).closest('.panel').children('.panel-foot').slideDown();
        } else {
            $(this).addClass('active');
            $(this).closest('.panel').children('.panel-body').slideUp();
            $(this).closest('.panel').children('.panel-foot').slideUp();
        }
    });
});


/**
 *
 * @effect      toggle 显示隐藏
 * @requires    jQuery
 * @Example     index.html
 * @date
 *
 */
$(function () {
    $(document).on('click', '[data-toggle="toggle"]', function (event) {
        event.preventDefault();
        var defaultTxt = $(this).data("data-toggle-text") || "展开";
        var activeTxt = $(this).data("data-toggle-active-text") || "关闭";

        $(this).closest('.toggle').children('.toggle-body').toggleClass('toggle-auto');
        
        $(this).toggleClass('toggle-active');
        if ($(this).hasClass('toggle-active')){
            $(this).text(activeTxt);
        }else{
            $(this).text(defaultTxt);
        }
    });
});


/**
 *
 * @effect      点击任意地方树的隐藏与显示等
 * @requires    jQuery
 * @Example     form.html
 * @date
 *
 */
$(function () {
    $(".select-ztree").on('click', function (event) {
        event.stopPropagation();
    });
    $(document).on('click', function () {
        $(".select-ztree-dropdown").slideUp("fast");
    });
});







