
/**
 *
 * @effect          页面实现的方法
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
$(function () {
    
    /**
     * 顶部导航条在不同屏幕上的效果
     */
    // 获取宽度
    templatefn.headerMenuWidthfn();
    // 控制按钮的显示隐藏
    templatefn.headerBarTogglefn();
    $(window).on('resize',  function(event) {
        event.preventDefault();
        templatefn.headerBarTogglefn();
    });
    // 按钮的点击事件
    $(document).on('click', '.header-pane-toggle', function(event) {
        var $menu = $(".header-menu");
        var paneW = $(".header-pane").width();
        var nextLeft = 0;

        if ( $(this).hasClass('active') ) {
            nextLeft = Math.abs($menu.position().left) - paneW;
            if( nextLeft<0 ){
                nextLeft = 0;
                $(this).removeClass('active');
            }
            $menu.animate({left: -nextLeft}, 500);
        }else{
            nextLeft = Math.abs($menu.position().left) + paneW;
            if( nextLeft>$menu.width()-paneW ){


                nextLeft = $menu.width()-paneW;
                $(this).addClass('active');
            }
            $menu.animate({left: -nextLeft}, 500);
        }
    });

    /* 
     * 内容区域的最低高度
     */
    templatefn.wrapperHeightfn();
});


/**
 *
 * @effect          常用插件的调用
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

$(function () {

    /**
     * 左道航插件的调用
     */
    if ($('[data-toggle="left-nav"]').mocLeftNav) {
        $('[data-toggle="left-nav"]').mocLeftNav({
            activeCls:'active'
        });
    }    
    
    /**
     * 默认调用表格的固定表头
     */
    if ( $(document).mocCheck ) {  // 因为mocFixedtable 和 mocCheck 都在 widget.js 文件里，所以可以判断有没有引入文件
        var winH = $(window).height()-140;
        new mocFixedtable('[data-toggle="mocFixedtable"]',{
            "width" : "100%",           // 窗口的宽度
            "height" : winH,            // 窗口的高度
            "rowspan" : "false",        // 列合并（竖向合并）
            "colspan" : "false",        // 行合并（横向合并）
            "thead" : "true",
            "tfoot" : "false"
        });
    }

    /**
     * 默认调用限制文字的个数
     */
    if ( $(document).mocWordLength ) {
        $('[data-toggle="wordLength"]').mocWordLength();
    }

    /**
     * ie浏览器支持input和textarea的placeholder属性
     */
    if ($(document).mocPlaceholder) {
        $('.input-box input, .textarea-box textarea').mocPlaceholder();
    }

    
    /**
     * mocLightBox 图片放大的调用
     * mocLightBox="init" 一般是放在body上面，每个页面只能出现一次，也可以单独放在一个空的div上面
     */
    $(function(){
        $('[mocLightBox="init"]').mocLightBox();
    });
    
 
    /**
     * textarea根据内容自动延伸
     */
    if ($(".textarea-autosize").length > 0) {
        autosize( $(".textarea-autosize") );
        autosize( $(".textarea-automax") );
    }   


    /**
     * 单选and多选用iCheck美化
     */
    if ($(".icheck-primary").iCheck) {
        // iCheck美化
        $(".icheck-primary").iCheck({
            checkboxClass: 'checkbox-primary',
            radioClass: 'radio-primary'
        });

        $(".icheck-success").iCheck({
            checkboxClass: 'checkbox-success',
            radioClass: 'radio-success'
        });

        /**
         * 给多选按钮添加全选和不全选事件
         */
        var checkAll = $('[ichecked-for][type="checkbox"]');
        // 1 通过全选按钮的状态，改变负责的多选框的状态
        $(document).on('ifChecked ifUnchecked', '[ichecked-for][type="checkbox"]', function(event) {
            var txt = $(this).attr('ichecked-for');
            var checkboxes = $('[ichecked-val="'+txt+'"]');
            if (event.type === 'ifChecked') {
                checkboxes.not('[disabled]').iCheck('check');
            } else {
                checkboxes.not('[disabled]').iCheck('uncheck');
            }
        });

        // 2 通过全点击事件，实现不同的方法
        $(document).on('ifChecked ifUnchecked', '[ichecked-val][type="checkbox"]', function(event) {
            // 判断有没有在table的固定表头里面
            if ($(this).attr('old-name') && $(this).attr('old-name')!=" " ) {
                var oldName = $(this).attr('old-name');
                var fixedtableId = $(this).closest('td,th').attr('fixedtable-clone-id');
                var item = $('[fixedtable-id="'+fixedtableId+'"]');
                if (event.type == 'ifChecked') {
                    item.find('[name="'+oldName+'"]').iCheck('check');
                } else {
                    item.find('[name="'+oldName+'"]').iCheck('uncheck');
                }
            }
            // 通过点击多选框，改变全选框的状态
            if (checkAll.length>0) {
                var val = $(this).attr('ichecked-val');
                var Allcheck = $('[ichecked-for="'+val+'"]');
                if ( Allcheck.length==1 && Allcheck.attr('ichecked-for')!=undefined ) {
                    var checkboxs = $('[ichecked-val="'+val+'"]');
                    if( checkboxs.not('[disabled]').filter(':checked').length == checkboxs.not('[disabled]').length ) {
                        Allcheck.iCheck('check');
                    } else {
                        Allcheck.prop('checked',false);
                        Allcheck.parent().removeClass('checked').attr('aria-checked', 'false');
                    }
                    Allcheck.iCheck('update');
                }
            }
        });
    }

    
    /**
     * 单选and多选用mocCheck美化
     */
    if ( $(document).mocCheck ) {
        $('.mocCheck-simple').mocCheck();

        $('.mocCheck-ball').mocCheck({
            'theme': "mocCheck-simple-primary"
        });

        $('.mocCheck-bootstrap').mocCheck({
            'type': 'strap'
        });

        $('.mocCheck-button').mocCheck({
            'type': 'button'
        });
    }


    /**
     * 下拉的美化
     */
    if ($('.select-2').select2) {
        // 正常调用
        $('.select-2').select2({
            placeholder:"请选择"
        });
        // 不带搜索框 select-2-no-seach
        $('.select-2ns').select2({
            minimumResultsForSearch: Infinity,
            placeholder:"请选择"
        });
        // 多选时选中不关闭继续选择 select-2-no-close
        $('.select-2nc').select2({
            closeOnSelect: false,
            placeholder:"请选择"
        });
        // 多选时选中不关闭继续选择，且可以自定义选项 select-2-no-close-tag
        $('.select-2nc-tag').select2({
            tags: true,
            closeOnSelect: false,
            placeholder:"请选择"
        });
        // 添加自定义选项
        $('.select-2tag').select2({
            tags: true,
            placeholder:"请选择"
        });
    }

    if ( $("form").Validform ) {
        
        // 给form标签配上 data-Validform="Validform" 启动表单验证插件
        // 给form标签配上 data-beforeCheck="" 传入方法名，不用带()，Validform 在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
        // 给form标签配上 data-beforeSubmit="" 传入方法名，不用带()，Validform 在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
        // 给form标签配上 data-callback="" 传入方法名，不用带()，Validform 返回数据data是json格式，{"info":"demo info","status":"y"}
        // 给form标签配上 ignoreHidden="false"  true忽略验证隐藏的元素，false则验证隐藏的元素
        // 
        // 
        // 
        // nullmsg      当表单元素值为空时的提示信息，不绑定，默认提示"请填入信息！"。
        // sucmsg       当表单元素通过验证时的提示信息，不绑定，默认提示"通过信息验证！"。
        // errormsg     输入内容不能通过验证时的提示信息，默认提示"请输入正确信息！"。
        // ignore       绑定了ignore="ignore"的表单元素，在有输入时，会验证所填数据是否符合datatype所指定数据类型，没有填写内容时则会忽略对它的验证；
        //              绑定了ignore="yes"的表单元素，会忽略对它的验证；

        var ValidformDom = $('[data-Validform="Validform"]');
        var ignoreHidden = ValidformDom.attr('ignoreHidden')==="false" ? false : true;
        ValidformDom.Validform({
            btnSubmit: "#validFormSubmit",  // 可选项 #ValidformSubmit是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
            btnReset: "#validFormReset",    // 可选项 #ValidformReset是该表单下要绑定点击重置表单事件的按钮;如果form内含有reset按钮该参数可省略;
            ignoreHidden: ignoreHidden,     // 可选项 true | false 默认为false，当为true时对:hidden的表单元素将不做验证;
            dragonfly: false,               // 可选项 true | false 默认false，当为true时，值为空时不做验证；
            tipSweep: false,                // 可选项 true | false 默认为false，true:时提示信息将只会在表单提交时触发显示，各表单元素blur时不会触发信息提示；
            showAllError: true,             // 可选项 true | false 默认为false，true：提交表单时所有错误提示信息都会显示；false：一碰到验证不通过的对象就会停止检测后面的元素，只显示该元素的
            label: ".Validform_label",      // 可选项 选择符，在没有绑定nullmsg时查找要显示的提示文字，默认查找".Validform_label"下的文字;
            postonce: false,                // 可选项 表单是否只能提交一次，true开启，不填则默认关闭;
            ajaxPost: false,                // 可选项 使用ajax方式提交表单数据，默认false，提交地址就是action指定地址;
            tiptype: function (msg, o, cssctl) {
                // 找到提示文字的输出位置
                var parentDom = o.obj.closest('.form-content');
                var tipDom = parentDom.find(".form-checktip");
                cssctl(tipDom, o.type);
                tipDom.text(msg);

                /**
                 * 根据验证的状态不同，添加不同的类名
                 */
                // if ( o.type==1 ) {
                //     parentDom.removeClass("has-passed has-ignore has-wrong").addClass("has-loading");;
                // }else if ( o.type==2 ) {
                //     parentDom.removeClass("has-loading has-ignore has-wrong").addClass('has-passed');
                // }else if ( o.type==4 ) {
                //     parentDom.removeClass("has-passed has-loading has-wrong").addClass('has-ignore');
                // }else {
                //     parentDom.removeClass("has-passed has-ignore has-loading").addClass('has-wrong');
                // }

                /**
                 * 下面写法是成功不提示
                 */
                // if(o.type != 2){
                //     tipDom.text(msg);
                // }else{
                //     tipDom.text('');
                //     tipDom.removeClass('Validform_right');
                // }
            },
            beforeCheck:function(curform){
                // 在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
                // 这里明确return false的话将不会继续执行验证操作;
                var beforeCheckFn = eval( ValidformDom.attr('data-beforeCheck') );
                if (typeof beforeCheckFn === 'function' ) {
                    var flag = beforeCheckFn(curform); 
                    if ( flag === false ) {
                        return false;
                    }
                }  
            },
            beforeSubmit:function(curform){
                // 在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
                // 这里明确return false的话表单将不会提交;
                var beforeSubmitFn = eval( ValidformDom.attr('data-beforeSubmit') );
                if (typeof beforeSubmitFn === 'function' ) {
                    var flag = beforeSubmitFn(curform); 
                    if ( flag === false ) {
                        return false;
                    }
                }  
            },
            callback:function(data){
                // 返回数据data是json对象，{"info":"demo info","status":"y"}
                // info: 输出提示信息;
                // status: 返回提交数据的状态,是否提交成功。如可以用"y"表示提交成功，"n"表示提交失败，在ajax_post.php文件返回数据里自定字符，主要用在callback函数里根据该值执行相应的回调操作;
                // 你也可以在ajax_post.php文件返回更多信息在这里获取，进行相应操作；
                // ajax遇到服务端错误时也会执行回调，这时的data是{ status:**, statusText:**, readyState:**, responseText:** }；
         
                // 这里执行回调操作;
                // 注意：如果不是ajax方式提交表单，传入callback，这时data参数是当前表单对象，回调函数会在表单验证全部通过后执行，然后判断是否提交表单，如果callback里明确return false，则表单不会提交，如果return true或没有return，则会提交表单。
                var callbackFn = eval( ValidformDom.attr('data-callback') );
                if (typeof callbackFn === 'function' ) {
                    var flag = callbackFn(data); 
                    if ( flag === false ) {
                        return false;
                    }
                }
            }
        }).ignore('[disabled="true"],[ignore="yes"]'); // 对disabled="true"的不验证, 如果想验证disabled状态的，可以使用disabled、disabled="true"等
        // 表单验证兼容select2
        $('.select-2, .select-2ns, .select-2nc, .select-2-template, .select-2ns-template, .select-2nc-template, .select-2-call, .select-2ns-call, .select-2nc-call').on('change', function(e){
            $(this).blur();
        });
        // 表单验证兼容iCheck
        $('.icheck-primary, .icheck-primary-template, .icheck-primary-call').on('ifChanged', function(event){
            $(this).blur();
        });
    }

    
    /**
     * bootstrap 中工具提示框（tooltip）插件
     */
    if ($("[data-toggle='tooltip']").tooltip) {
        $("[data-toggle='tooltip']").tooltip();
    }
    if ($("[data-toggle='popover']").popover) {
        $("[data-toggle='popover']").popover();
    }
    if ($('[data-toggle="dropdown"]').dropdown) {
        $('[data-toggle="dropdown"]').dropdown();
    }

    /**
     * bootstrap 中modal可以拖动
     * 调用的jquery ui 的拖动方法
     */
    if ($(document).draggable) {
        $(".modal-draggable").draggable({
            handle: ".modal-header"
        });
        $(".mocAlert").draggable({
            handle: ".mocAlert_head"
        });
    }

    /**
     * 返回顶部的调用
     */
    if ($.mocGoTop) {
        $.mocGoTop();
    }

});


// 构造函数
function TemplateFun(){
    // 利用instanceof运算符，还可以巧妙地解决，调用构造函数时，忘了加new命令的问题。
    if (! this instanceof TemplateFun) {
        return new TemplateFun();
    }

    // 定义顶部宽度
    this.headerMenuWidth = 10;
};
TemplateFun.prototype= {
    /* 
     * 顶部宽的添加
     */
    headerMenuWidthfn: function(){
        var _this = this;
        $('.header-menu-item').each(function(index, el) {
            _this.headerMenuWidth += $(el).mocActual('outerWidth',{includeMargin:true});
        });
        $('.header-menu').width(_this.headerMenuWidth);
    },
    /* 
     *  顶部切换按钮的显示和隐藏
     */
    headerBarTogglefn: function(){
        var headerPaneW = $(".header-pane").width(),
            headerMenuW = $(".header-menu").width();
        if ( headerMenuW >headerPaneW ) {
            $(".header-pane-toggle").show();
        }else{
            $(".header-pane-toggle").hide();
        }
    },
    /* 
     * 内容区域的最低高度
     */
    wrapperHeightfn: function(){
        var wrapperHeight = $(window).height() - $("#page-header").outerHeight() - $("#page-footer").outerHeight();
        $("#wrapper").css('min-height', wrapperHeight);
    },
    /* 
     * form 表单常用插件的调用
     */
    formRoutineCall: function(option){

        if ( option ) {
            /**
             * 单选and多选用iCheck美化
             */
            if ($(".icheck-primary").iCheck) {
                // iCheck美化
                $(option).find(".icheck-primary-call").iCheck({
                    checkboxClass: 'checkbox-primary',
                    radioClass: 'radio-primary'
                });
                $(option).find(".icheck-success-call").iCheck({
                    checkboxClass: 'checkbox-success',
                    radioClass: 'radio-success'
                }); 
            }
            /**
             * 下拉的美化
             */
            if ($('.select-2').select2) {
                // 正常调用
                $(option).find('.select-2-call').select2({
                    placeholder:"请选择"
                });
                // 不带搜索框 select-2-no-seach
                $(option).find('.select-2ns-call').select2({
                    minimumResultsForSearch: Infinity,
                    placeholder:"请选择"
                });
                // 多选时选中不关闭继续选择 select-2-no-close
                $(option).find('.select-2nc-call').select2({
                    closeOnSelect: false,
                    placeholder:"请选择"
                });
            }
            /**
             * 单选and多选用mocCheck美化
             */
            if ($('.mocCheck-simple').mocCheck) {
                $(option).find('.mocCheck-simple-call').mocCheck();

                $(option).find('.mocCheck-ball-call').mocCheck({
                    'theme': "primary"
                });

                $(option).find('.mocCheck-bootstrap-call').mocCheck({
                    'type': 'strap'
                });
            }
        }else{
            /**
             * 单选and多选用iCheck美化
             */
            if ($(".icheck-primary").iCheck) {
                // iCheck美化
                $(".icheck-primary-call").iCheck({
                    checkboxClass: 'checkbox-primary',
                    radioClass: 'radio-primary'
                });

                $(".icheck-success-call").iCheck({
                    checkboxClass: 'checkbox-success',
                    radioClass: 'radio-success'
                }); 
            }
            /**
             * 下拉的美化
             */
            if ($('.select-2').select2) {
                // 正常调用
                $('.select-2-call').select2({
                    placeholder:"请选择"
                });
                // 不带搜索框 select-2-no-seach
                $('.select-2ns-call').select2({
                    minimumResultsForSearch: Infinity,
                    placeholder:"请选择"
                });
                // 多选时选中不关闭继续选择 select-2-no-close
                $('.select-2nc-call').select2({
                    closeOnSelect: false,
                    placeholder:"请选择"
                });
            }
            /**
             * 单选and多选用mocCheck美化
             */
            if ($('.mocCheck-simple').mocCheck) {
                $('.mocCheck-simple-call').mocCheck();

                $('.mocCheck-ball-call').mocCheck({
                    'theme': "primary"
                });
                $('.mocCheck-bootstrap-call').mocCheck({
                    'type': 'strap'
                });
            }
        }            
    },
    /* 
     * js 模版模版
     */
    template: function(options){
        var _this = this; // 这里的 this 是函数 TemplateFun
        $(".moc-page-Loading").remove();
        $("body").removeClass('moc-page-Loading-show');
    }
};
window.templatefn = new TemplateFun();




/**
 *
 * @effect          下拉树的配置和方法
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
// ztree点击判断是否可以赋值
function zTreeBeforeClick(treeId, treeNode) {
    var check = (treeNode && !treeNode.isParent);
    if (!check) alert("只能选择城市...");
    return check;
}
// ztree点击赋值
function zTreeOnClick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(treeId),
        nodes = zTree.getSelectedNodes(),
        v = "";
    nodes.sort(function compare(a, b) {
        return a.id - b.id;
    });
    for (var i = 0, l = nodes.length; i < l; i++) {
        v += nodes[i].name + ",";
    }
    if (v.length > 0) v = v.substring(0, v.length - 1);
    var cityObj = $("#" + treeId).closest('.select-ztree').children('.select-ztree-input');
    cityObj.attr("value", v);
    $(".select-ztree-dropdown").slideUp("fast");
}
// 点击弹出ztree的下拉框
function zTreeShowMenu(self, e) {
    if (window.event) {
        event.cancelBubble = true;
    } else {
        e.stopPropagation();
    }
    $(self).next().slideDown("fast");
}
// 模糊搜索name满足条件的节点
function zTreeSearchNode(treeId, seachId, setting, zNodes) {
    // var treeObj = $.fn.zTree.getZTreeObj(treeId); // 没有真正的初始化树，而是获取了树的所有信息，之前展开的没有关闭
    var treeObj = $.fn.zTree.init($("#" + treeId), setting, zNodes);
    var value = $("#" + seachId).val();
    if (value == "") return;
    // 获取搜索的节点
    var nodes = treeObj.getNodesByParamFuzzy("name", value);
    // 关闭所有节点的高亮
    var allNodes = treeObj.transformToArray(treeObj.getNodes());
    for (var i = 0; i < allNodes.length; i++) {
        allNodes[i].highlight = false;
        treeObj.updateNode(allNodes[i]);
    }
    // 如果没有内容，弹出提示框
    if (nodes.length === 0) {
        alert('没有您要搜索的内容');
        return;
    }
    // 高亮并展开搜索到的节点
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].highlight = true;
        treeObj.updateNode(nodes[i]); // 更新节点，让高亮生效
        treeObj.expandNode(nodes[i].getParentNode(), true);
    }
}
// 符合搜索条件的树，设置高亮字体
function zTreeSetHighlight(treeId, treeNode) {
    return (treeNode.highlight) ? {"color":"green","font-weight":"bold","background-color":"#ddd"} : {"color":"#000","font-weight":"normal"};
}

// 取消事件
function zTreeDropdownClose(){
    $(".select-ztree-dropdown").slideUp("fast");
}
// 确定事件
function zTreeDropdownConfirm(treeId, aboutDom, type){
    var treeObj = $.fn.zTree.getZTreeObj(treeId);
    var nodes = treeObj.getCheckedNodes();

    var val = '';
    var Id = '';
    var num = nodes.length - 1;

    console.log( nodes );

    if( type ){
        nodes.forEach(function (el,index) {
            if( !el.children ){
                if( index === num ){
                    val +=  el.name;
                    Id +=  el.id;
                }else{
                    val +=  (el.name+',');
                    Id +=  (el.id+',');
                }
            }
        })
    }else{
        nodes.forEach(function (el,index) {
            if( index === num ){
                val +=  el.name;
                Id +=  el.id;
            }else{
                val +=  (el.name+',');
                Id +=  (el.id+',');
            }
        })
    }

    $(aboutDom).val(val).text(val).attr('data-id', Id);
    zTreeDropdownClose();
}