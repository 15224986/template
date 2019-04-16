/**
 *
 * @effect      复制一行 and 删除一行
 * @requires    jQuery
 * @Example     form.html
 * @date
 *
 */
$(function () {

    /* 增加一行 */
    var clickIndex = 0;
    $(document).on("click", ".clone-add-btn", function (event) {
        event.preventDefault();
        var cloneId = $(this).attr('for') || $(this).attr('href'),
            clone = $("#" + cloneId).clone(true),
            locationDom = $(this).closest('[location]'),
            location = locationDom.attr('location') || 'before';
        clone.removeClass('clone-template').addClass('self-is-clone').removeAttr('id');
        clickIndex++;
        // 改变单选的name
        clone.find('input:radio').attr('old-name', function () {
            return $(this).attr('name');
        }).attr('name', function () {
            return $(this).attr('name') + clickIndex;
        });

        // 从新调用插件
        recallfn(clone);
        
        // 克隆完成后的回调
        var self = this;
        var beforeCallback = eval( $(self).attr('data-beforeCallback') );
        if ( typeof beforeCallback === 'function' ) {
            var flag = beforeCallback(self,clone);
            if ( flag === false ) {
                return false;
            }
        }

        // 判断要存放的位置
        if (location == 'after') {
            locationDom.after(clone);
        } else if (location == 'append') {
            locationDom.append(clone);
        } else if (location == 'prepend') {
            locationDom.prepend(clone);
        } else {
            locationDom.before(clone);
        }

        // 增加完成后的回调
        var afterCallback = eval( $(self).attr('data-afterCallback') );
        if ( typeof afterCallback === 'function' ) {
            afterCallback(clone); 
        }
    });

    /* 删除本行 */
    $(document).on('click', '.clone-remove-btn', function (event) {
        event.preventDefault();
        // 删除前的回调
        var self = this;
        var beforeCallback = eval( $(self).attr('data-beforeCallback') );
        if ( typeof beforeCallback === 'function' ) {
            var flag = beforeCallback(self); 
            if ( flag === false ) {
                return false;
            }
        }
        // 删除
        $(this).closest(".self-is-clone").remove();
        // 删除完成后的回调
        var afterCallback = eval( $(self).attr('data-afterCallback') );
        if ( typeof afterCallback === 'function' ) {
            afterCallback(self); 
        }
    });


    // /* 增加一行 */
    // var clickIndex = 0;
    // $(document).on("click", ".add-row-btn", function () {
    //     var cloneId = $(this).attr('for'),
    //         clone = $("#" + cloneId).clone(true),
    //         locationDom = $(this).closest('[location]'),
    //         location = locationDom.attr('location') || 'before';
    //     clone.removeClass('clone-template').addClass('self-is-row-clone').removeAttr('id');
    //     clickIndex++;
    //     // 改变单选的name
    //     clone.find('input:radio').attr('old-name', function () {
    //         return $(this).attr('name');
    //     }).attr('name', function () {
    //         return $(this).attr('name') + clickIndex;
    //     });

    //     // 从新调用插件
    //     recallfn(clone);
        
    //     // 克隆完成后的回调
    //     var self = this;
    //     var beforeCallback = eval( $(self).attr('data-beforeCallback') );
    //     if ( typeof beforeCallback === 'function' ) {
    //         var flag = beforeCallback(self,clone);
    //         if ( flag === false ) {
    //             return false;
    //         }
    //     }

    //     // 判断要存放的位置
    //     if (location == 'after') {
    //         locationDom.after(clone);
    //     } else if (location == 'append') {
    //         locationDom.append(clone);
    //     } else if (location == 'prepend') {
    //         locationDom.prepend(clone);
    //     } else {
    //         locationDom.before(clone);
    //     }

    //     // 增加完成后的回调
    //     var afterCallback = eval( $(self).attr('data-afterCallback') );
    //     if ( typeof afterCallback === 'function' ) {
    //         afterCallback(clone); 
    //     }
    // });

    // /* 删除本行 */
    // $(document).on('click', '.remove-row-btn', function (event) {
    //     event.preventDefault();
    //     // 删除前的回调
    //     var self = this;
    //     var beforeCallback = eval( $(self).attr('data-beforeCallback') );
    //     if ( typeof beforeCallback === 'function' ) {
    //         var flag = beforeCallback(self); 
    //         if ( flag === false ) {
    //             return false;
    //         }
    //     }
    //     // 删除
    //     $(this).closest(".self-is-row-clone").remove();
    //     // 删除完成后的回调
    //     var afterCallback = eval( $(self).attr('data-afterCallback') );
    //     if ( typeof afterCallback === 'function' ) {
    //         afterCallback(self); 
    //     }
    // });


    // /**
    //  * 解决删除冲突的问题，写了两遍
    //  */
    // $(document).on("click", ".add-item-btn", function () {
    //     var cloneId = $(this).attr('for'),
    //         clone = $("#" + cloneId).clone(true),
    //         locationDom = $(this).closest('[location]'),
    //         location = locationDom.attr('location') || 'before';
    //     clone.removeClass('clone-template').addClass('self-item-clone').removeAttr('id');
    //     clickIndex++;
    //     // 改变单选的name
    //     clone.find('input:radio').attr('old-name', function () {
    //         return $(this).attr('name');
    //     }).attr('name', function () {
    //         return $(this).attr('name') + clickIndex;
    //     });
    //     // 从新调用插件
    //     recallfn(clone);
        
    //     // 克隆完成后的回调
    //     var self = this;
    //     var beforeCallback = eval( $(self).attr('data-beforeCallback') );
    //     if ( typeof beforeCallback === 'function' ) {
    //         var flag = beforeCallback(self,clone);
    //         if ( flag === false ) {
    //             return false;
    //         }
    //     }
        
    //     // 判断要存放的位置
    //     if (location == 'after') {
    //         locationDom.after(clone);
    //     } else if (location == 'append') {
    //         locationDom.append(clone);
    //     } else if (location == 'prepend') {
    //         locationDom.prepend(clone);
    //     } else {
    //         locationDom.before(clone);
    //     }
    //     // 增加完成后的回调
    //     var afterCallback = eval( $(self).attr('data-afterCallback') );
    //     if ( typeof afterCallback === 'function' ) {
    //         afterCallback(clone); 
    //     }
    // });
    // /* 删除本行 */
    // $(document).on('click', '.remove-item-btn', function (event) {
    //     event.preventDefault();
    //     // 删除前的回调
    //     var self = this;
    //     var beforeCallback = eval( $(self).attr('data-beforeCallback') );
    //     if ( typeof beforeCallback === 'function' ) {
    //         var flag = beforeCallback(self); 
    //         if ( flag === false ) {
    //             return false;
    //         }
    //     }
    //     // 删除
    //     $(this).closest(".self-item-clone").remove();
    //     // 删除完成后的回调
    //     var afterCallback = eval( $(self).attr('data-afterCallback') );
    //     if ( typeof afterCallback === 'function' ) {
    //         afterCallback(self); 
    //     }
    // });

    function recallfn(clone) {
        // select2 从新调用
        if ($(document).select2) {
            clone.find('.select-2-template').select2({ // 复制后从新调用
                placeholder:"请选择"
            });
            clone.find('.select-2ns-template').select2({ // 不带搜索框
                placeholder:"请选择",
                minimumResultsForSearch: Infinity
            });
            clone.find('.select-2nc-template').select2({ // 多选时选中不关闭继续选择
                placeholder:"请选择",
                closeOnSelect: false
            });
        }
        // iCheck美化 从新调用    
        if ($(document).iCheck) {
            clone.find(".icheck-primary-template").iCheck({
                checkboxClass: 'checkbox-primary',
                radioClass: 'radio-primary'
            });
        }
        // 单选and多选用switch美化 从新调用
        if ($(document).mocCheck) {
            clone.find('.switch-simple-template').mocCheck();
            clone.find('.switch-bootstrap-template').mocCheck({
                'type': 'bootstrap'
            });
        }
    }
});