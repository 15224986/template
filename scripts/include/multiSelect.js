/* 
 * 弹出多项选择
*/
;(function($, undefined){   
    // Global Queue
    var _Queue      = [];
    // Default Settings
    var _defaults = {
        'ReturnValueLocation'   : false,  // 存储的地方
        'checker'               : false,    // 以什么类型显示
        'lock'                  : true,     // 是否生成全屏背景
        'title'                 : '请选择',  // 按钮的文字
        'confirmText'           : '确定',  // 按钮的文字 // 按钮的文字
        'cancelText'            : '取消',  // 按钮的文字   
        /* 判断是否生成筛选栏目 */
        'searchBar'             : false,
        /* Select 中间的按钮 */
        'checkboxText'          : '多选',      // 按钮的文字
        'addoneText'            : '>',       // 按钮的文字
        'addallText'            : '>>',      // 按钮的文字
        'removeoneText'         : '<',       // 按钮的文字
        'removeallText'         : '<<',      // 按钮的文字
        /* check 中间的按钮 */
        'allCheckText'          : '全选',      // 按钮的文字
        'allCheckonText'        : '全不选',  // 按钮的文字
        /* 数据和回调 */
        'data'                  : [],  // 生成的数据
        'ConfirmOk'             : false   // 点击确定按钮后的回调函数
    };
    // 插件的初步写法
    $.mocMultiSelect = function(options){
        if (typeof options !== "object"){
            options = { message : options};
        }
        var settings    = $.extend(true, {}, _defaults, options);
        // 将参数存入数组
        _Queue      = [];
        _Queue.push({
            settings    : settings
        });
        _Queue = _Queue.shift().settings;
        // 生成dome结构
        generateDome();
    };

    /* 
     * 初始化生成dom事件  ******************************
    */
    function generateDome(){
        var o   = _Queue;
        // Overlay
        if (o.lock) {
            var overlay = $("<div>", {
                'class' : "jQueryMultiSelect-overlay"
            }).appendTo($("body"));
            // MultiSelect
            var MultiSelect = $("<div>", {
                'class' : "jQueryMultiSelect"
            }).appendTo(overlay);
        }else{
            // MultiSelect
            var MultiSelect = $("<div>", {
                'class' : "jQueryMultiSelect"
            }).appendTo($("body"));
        }
        // head
        var head = $("<div>", {
            'class' : "jQueryMultiSelect-head"
        }).appendTo(MultiSelect);
        $("<h4>", {
            'text'  : o.title
        }).appendTo(head);
        var closeBtn = $("<div>", {
            'class' : "jQueryMultiSelect-close"
        }).on("click", _Removefn).appendTo(head);
        $("<span>").appendTo(closeBtn);
        
        // 生成body块
        if (o.checker == true) {
            // 判断是否生成searchBar模块（搜索）
            if (o.searchBar) {
                searchfn(MultiSelect);
            };
            checkfn(MultiSelect);
        }else{
            Selectfn(MultiSelect);
        }
        // footer
        var footer = $("<div>", {
            'class' : "jQueryMultiSelect-footer"
        }).appendTo(MultiSelect);
        if (o.checker == true) {
            // allCheck  btn
            var listDom = MultiSelect.find('.jQueryMultiSelect-list').length;
            if ( MultiSelect.find('.jQueryMultiSelect-list').length !== MultiSelect.find('.jQueryMultiSelect-list.selected').length ) {
                $("<a>", {
                    'class' : "allCheck",
                    'text'  : o.allCheckText
                }).on("click", allCheckfn).appendTo(footer);
            }else{
                $("<a>", {
                    'class' : "allCheck active",
                    'text'  : o.allCheckonText
                }).on("click", allCheckfn).appendTo(footer);
            }
            

        }
        // 确定和取消
        $("<a>", {
            'class' : "selected-confirm",
            'text'  : o.confirmText
        }).on("click", Confirmfn).appendTo(footer);
        $("<a>", {
            'class' : "selected-cancel",
            'text'  : o.cancelText
        }).on("click", _Removefn).appendTo(footer);

        // 弹出框上下居中
        var Height = Math.floor($(MultiSelect).mocActual('outerHeight')/2);
        $(MultiSelect).css('margin-top', -Height);
    };
    // 生成searchBar
    function searchfn(searchBody){
        var o   = _Queue;
        searchBody.addClass('searchBody');
        var searchBox = $("<div>", {
            'class' : "jQueryMultiSelect-search"
        }).appendTo(searchBody);
        $.each(o.searchBar , function(index, el) {
            var searchRow = $("<div>", {
                'class' : "jQueryMultiSelect-search-row"
            }).appendTo(searchBox);
            $("<div>", {
                'class' : "jQueryMultiSelect-search-title",
                'text'  : el.val
            }).appendTo(searchRow);
            var field = $("<div>", {
                'class' : "jQueryMultiSelect-search-field"
            }).appendTo(searchRow);
            if (el.type=='select') {
                var selectBox = $("<div>", {
                    'class' : "jQueryMultiSelect-select"
                }).appendTo(field);
                $("<p>", {
                    'class' : "jQueryMultiSelect-select-txt",
                    'text'  : '请选择'
                }).on("click", _selectShowfn).appendTo(selectBox);
                var selectUl = $("<ul>", {
                    'class' : "jQueryMultiSelect-select-ul",
                    'seach-type': el.dataType
                }).appendTo(selectBox);
                
                var selectLiFirst = $("<li>", {
                    'class' : "jQueryMultiSelect-select-li first"
                }).on("click", _firstSelectfn).appendTo(selectUl);
                $("<span>", {
                    'class' : "jQueryMultiSelect-select-li-span",
                    'text'  : '请选择'
                }).appendTo(selectLiFirst);
                $.each(el.moldData , function(index, txt) {
                    var selectLi = $("<li>", {
                        'class' : "jQueryMultiSelect-select-li"
                    }).on("click", _selectfn).appendTo(selectUl);
                    $("<span>", {
                        'class' : "jQueryMultiSelect-select-li-span",
                        'text'  : txt
                    }).appendTo(selectLi);
                });
            }
            if(el.type=='input'){
                $("<input>", {
                    'class' : "jQueryMultiSelect-input"
                }).on("keyup", _keyupSearchfn).appendTo(field);
            }
        });
    }
    // 生成 check body
    function checkfn(checkBody){
        var o   = _Queue;
        var bodyBox = $("<div>", {
            'class' : "jQueryMultiSelect-body MultiSelect-checker"
        }).appendTo(checkBody);
        // bodyBox  content
        var content = $("<div>", {
            'class' : "jQueryMultiSelect-content"
        }).appendTo(bodyBox);
        // list

        var translateArr = [];
        if (o.ReturnValueLocation) {
            if($(o.ReturnValueLocation).attr("selected-id")!==undefined){
                translateArr = $(o.ReturnValueLocation).attr("selected-id").split(',');
            }
        };

        var searchArr = [];
        $.each(o.searchBar , function(index, obj) {
            if (obj.type=='select') {
                searchArr.push(obj.dataType)
            }
        });
        $.each(o.data,function(index, el) {
            if ($.inArray(el.id, translateArr) >= 0) {
                var listp = $("<p>", {
                    'class' : "jQueryMultiSelect-list selected",
                    'text'  : el.val,
                    'id'    : el.id
                }).on("click", _checkfn).appendTo(content);
            }else{
                var listp = $("<p>", {
                    'class' : "jQueryMultiSelect-list",
                    'text'  : el.val,
                    'id'    : el.id
                }).on("click", _checkfn).appendTo(content);
            }
            // 附加筛选的属性
            if (searchArr.length==1) {
                listp.attr('searchOne', el.searchOne);
            };
            if (searchArr.length==2) {
                listp.attr('searchOne', el.searchOne).attr('searchTwo', el.searchTwo);
            };
            if (searchArr.length==3) {
                listp.attr('searchOne', el.searchOne).attr('searchTwo', el.searchTwo);
                stp.attr('searchThr', el.searchThr);
            };
            if (searchArr.length==4) {
                listp.attr('searchOne', el.searchOne).attr('searchTwo', el.searchTwo);
                listp.attr('searchThr', el.searchThr).attr('searchFou', el.searchFou);
            };
        });
    }
    // 生成 Select body
    function Selectfn(SelectBody){
        var o   = _Queue;
        // bodyBox
        var bodyBox = $("<div>", {
            'class' : "jQueryMultiSelect-body MultiSelect-Selecter"
        }).appendTo(SelectBody);
        // bodyBox  left
        var left = $("<div>", {
            'class' : "jQueryMultiSelect-left"
        }).appendTo(bodyBox);
        // bodyBox  center
        var center = $("<div>", {
            'class' : "jQueryMultiSelect-center"
        }).appendTo(bodyBox);
        $("<a>", {
            'class' : "checkboxBtn",
            'text'  : o.checkboxText
        }).on("click", checkboxfn).appendTo(center);
        $("<a>", {
            'class' : "add-one",
            'text'  : o.addoneText
        }).on("click", addonefn).appendTo(center);
        $("<a>", {
            'class' : "add-all",
            'text'  : o.addallText
        }).on("click", addallfn).appendTo(center);
        $("<a>", {
            'class' : "remove-one",
            'text'  : o.removeoneText
        }).on("click", removeonefn).appendTo(center);
        $("<a>", {
            'class' : "remove-all",
            'text'  : o.removeallText
        }).on("click", removeallfn).appendTo(center);
        // bodyBox  content
        var content = $("<div>", {
            'class' : "jQueryMultiSelect-content"
        }).appendTo(bodyBox);
        // list
        var translateArr = [];
        if (o.ReturnValueLocation) {
            if($(o.ReturnValueLocation).attr("selected-id")!==undefined){
                translateArr = $(o.ReturnValueLocation).attr("selected-id").split(',');
            }
        };
        $.each(o.data,function(index, el) {
            if ($.inArray(el.id, translateArr) >= 0) {
                $("<p>", {
                    'class' : "jQueryMultiSelect-list hide",
                    'text'  : el.val
                }).on("click", _Activefn).on("dblclick", _Addfn).appendTo(left);
                $("<p>", {
                    'class' : "jQueryMultiSelect-list selected",
                    'text'  : el.val,
                    'id'    : el.id
                }).on("click", _Activefn).on("dblclick", _Aemovefn).appendTo(content);
            }else{
                $("<p>", {
                    'class' : "jQueryMultiSelect-list",
                    'text'  : el.val
                }).on("click", _Activefn).on("dblclick", _Addfn).appendTo(left);
                $("<p>", {
                    'class' : "jQueryMultiSelect-list hide",
                    'text'  : el.val,
                    'id'    : el.id
                }).on("click", _Activefn).on("dblclick", _Aemovefn).appendTo(content);
            }
        });
    };
    
    /* 
     * searchBar模块下所有的事件  ******************************
    */
    function _selectShowfn(){
        $(this).next().slideToggle();
    }
    function _firstSelectfn(){
        $(this).parents('ul').slideToggle();
        var txt = $(this).text();
        var searchType = $(this).parents('ul').attr('seach-type');
        $(this).addClass('on').siblings().removeClass('on');
        $(this).parents(".jQueryMultiSelect-select").children('.jQueryMultiSelect-select-txt').text(txt);
        $(this).parents('.jQueryMultiSelect').find('.jQueryMultiSelect-content').children('.'+searchType+'-hide').removeClass(searchType+'-hide');
    }
    function _selectfn(){
        $(this).parents('ul').slideToggle();
        var txt = $(this).text();
        var searchType = $(this).parents('ul').attr('seach-type');
        $(this).addClass('on').siblings().removeClass('on');
        $(this).parents(".jQueryMultiSelect-select").children('.jQueryMultiSelect-select-txt').text(txt);
        var dom = $(this).parents('.jQueryMultiSelect').find('.jQueryMultiSelect-content').children('.jQueryMultiSelect-list');
        dom.each(function(index, el) {
            var listType = $(el).attr(searchType);
            if (txt !== listType) {
                $(el).addClass(searchType+'-hide');
            }else{
                $(el).removeClass(searchType+'-hide');
            }
        });
    }
    function _keyupSearchfn(){
        var txt = $(this).val();
        var domBox = $(this).parents('.jQueryMultiSelect').find('.jQueryMultiSelect-content').children('.jQueryMultiSelect-list');
        if (txt=='') {
            domBox.removeClass('keyupSearch-hide');
        }else{
            domBox.addClass('keyupSearch-hide').filter(':contains("'+txt+'")').removeClass('keyupSearch-hide');
        }   
    }
    /* 
     * check模式下特有的事件  ******************************
    */
    // list的点击选择事件
    function _checkfn(){
        $(this).toggleClass('selected');
    }
    // allCheck事件
    function allCheckfn(){
        var o   = _Queue;
        if ($(this).hasClass('active')) {
            $(this).text(o.allCheckText).removeClass('active');
            $(this).parents(".jQueryMultiSelect").find('.jQueryMultiSelect-list:visible').removeClass('selected');
        }else{
            $(this).text(o.allCheckonText).addClass('active');
            $(this).parents(".jQueryMultiSelect").find('.jQueryMultiSelect-list:visible').addClass('selected');
        }
    }

    /* 
     * Select模式下特有的事件  ******************************
    */
    // list的点击事件
    function _Activefn(){
        if ($(this).parents(".jQueryMultiSelect").find('.checkboxBtn').hasClass('checked')) {
            $(this).addClass('active');
        }else{
            $(this).addClass('active').siblings().removeClass('active');
        }
    };
    // list的双击事件
    function _Addfn(){
        var i = $(this).index();
        $(this).addClass('hide').removeClass('active');
        $(this).parents('.jQueryMultiSelect-body').find('.jQueryMultiSelect-content .jQueryMultiSelect-list').eq(i).removeClass('hide').addClass('selected');
    };
    function _Aemovefn(){
        var i = $(this).index();
        $(this).addClass('hide').removeClass('selected active');
        $(this).parents('.jQueryMultiSelect-body').find('.jQueryMultiSelect-left .jQueryMultiSelect-list').eq(i).removeClass('hide');
    };
    // 五个按钮事件
    function checkboxfn(){
        $(this).toggleClass('checked');
    };
    function addonefn(){
        if ($(this).parents('.jQueryMultiSelect-body').find('.jQueryMultiSelect-left .active').length>0) {
            var dom = $(this).parents('.jQueryMultiSelect-body').find('.jQueryMultiSelect-left .active');
            dom.each(function(index, el) {
                var i = $(el).index();
                dom.addClass('hide').removeClass('active');
                $(this).parents('.jQueryMultiSelect-body').find('.jQueryMultiSelect-content .jQueryMultiSelect-list').eq(i).addClass('selected').removeClass('hide');
            }); 
        }
    };
    function addallfn(){
        $(this).parents('.jQueryMultiSelect-body').find('.jQueryMultiSelect-left .jQueryMultiSelect-list').addClass('hide').removeClass('active');
        $(this).parents('.jQueryMultiSelect-body').find('.jQueryMultiSelect-content .jQueryMultiSelect-list').addClass('selected').removeClass('hide');
    };
    function removeonefn(){
        if ($(this).parents('.jQueryMultiSelect-body').find('.jQueryMultiSelect-content .active').length>0) {
            var dom = $(this).parents('.jQueryMultiSelect-body').find('.jQueryMultiSelect-content .active');
            dom.each(function(index, el) {
                var i = $(el).index();
                dom.addClass('hide').removeClass('selected active');
                $(this).parents('.jQueryMultiSelect-body').find('.jQueryMultiSelect-left .jQueryMultiSelect-list').eq(i).removeClass('hide');
            });
        }
    };
    function removeallfn(){
        $(this).parents('.jQueryMultiSelect-body').find('.jQueryMultiSelect-content .jQueryMultiSelect-list').addClass('hide').removeClass('selected active');
        $(this).parents('.jQueryMultiSelect-body').find('.jQueryMultiSelect-left .jQueryMultiSelect-list').removeClass('hide');
    };

    /* 
     * 所有（all）模式下公用的事件  ******************************
    */
    // 关闭事件
    function _Removefn(){
        var o   = _Queue;
        if (o.lock) {
            $(this).parents('.jQueryMultiSelect-overlay').remove();
        }else{
            $(this).parents('.jQueryMultiSelect').remove();
        }
    };
    // 点击确定按钮的返回值事件
    function Confirmfn(){
        var o   = _Queue;
        var selectedArr = [];
        var selectedIdArr = [];
        var dataArr = [];
        // 获取到所有选中的值
        $(this).parents('.jQueryMultiSelect').find(".jQueryMultiSelect-content .selected").each(function(index, el) {
            selectedArr.push($(el).text());
            selectedIdArr.push($(el).attr("id"));
        });

        // 给显示框复制
        if (o.ReturnValueLocation) {
            var valTxt = selectedArr.join(',');
            $(o.ReturnValueLocation).each(function(index, el) {
                if ( $(el).is('input') || $(el).is('textarea') ) {
                    $(el).val(valTxt);
                }else{
                    $(el).text(valTxt);
                }
            });
            // 附加选中的id
            $(o.ReturnValueLocation).attr('selected-id', selectedIdArr.join(','));
        };
        
        // 确定的回调
        if(o.ConfirmOk != false){
            $.each(o.data,function(index, el) {
                if ($.inArray(el.id.toString(), selectedIdArr)>=0) {
                   dataArr.push(el);
                };
            });
            o.ConfirmOk(dataArr);
        }
        // 关闭弹框
        if (o.lock) {
            $(this).parents('.jQueryMultiSelect-overlay').remove();
        }else{
            $(this).parents('.jQueryMultiSelect').remove();
        }
    };
}(jQuery));