/* 
 * 表格的单元格合并and固定表头
*/
;(function($, window, document,undefined) {

    var tableNumber = 0;
    var mocFixedtable = function (container, options) {
        if (!(this instanceof mocFixedtable)){
            return new mocFixedtable(container, options)
        };
        var defaults = {
            "width" : "100%",               // 窗口的宽度
            "height" : "auto",              // 窗口的高度
            "rowspan" : "false",            // 列合并（竖向合并,"0,2"表示第一列和第三列合并）（"all,4"表示第一列到第四列合并）
            "colspan" : "false",            // 行合并（横向合并,"0,2"表示第一行和第三行合并）
            "thead" : "true",               // 顶部表头固定（false不固定，true固定）
            "tfoot" : "false",              // 底部是否固定（false不固定，true固定）
            "tleft" : "0",                  // 左侧是否固定（里面的数字代表左侧固定的列数）
            "tright" : "0",                 // 右侧是否固定（里面的数字代表左侧固定的列数）
            "scrollRight": 8,               // 左侧滚动条的宽度
            "scrollBottom": 8,              // 底部滚动条的高度
            "bodyEq": 0,                    // 左侧有固定的时候，宽度以第几排为准
            onInitStart : function(){},     // 初始化开始前执行
            onInitEnd : function(){}        // 初始化结束后执行
        };
        var options = $.extend( defaults,options || {} );

        // 插件本身 s === self
        var s = this;
        // version 版本号
        s.version = '1.0';
        // 配置参数
        s.params = options;

        /**
         * 准备-定义容器，判断页面内的个数
         */
        s.container = $(container);
        if (s.container.length === 0) return;
        if (s.container.length > 1) {
            s.container.each(function () {
                new mocFixedtable(this, options);
            });
            return;
        }
        /**
         * 获取插件自身配置的参数
         */
        var setting = s.container.attr('data-options'); 
        if ( setting && setting !== '' ) {
            setting = $.parseJSON(setting);
        }else{
            setting = {};
        }
        s.container.removeAttr('data-options');
        /**
         * 从新获取参数
         */
        var o = {
            viewW : setting.width || s.params.width,
            viewH : setting.height || s.params.height,
            rowspan : setting.rowspan || s.params.rowspan,
            colspan : setting.colspan || s.params.colspan,
            thead : setting.thead || s.params.thead,
            tfoot : setting.tfoot || s.params.tfoot,
            tleft : setting.tleft || s.params.tleft,
            tright : setting.tright || s.params.tright,
            scrollRight : setting.scrollRight || s.params.scrollRight,
            scrollBottom : setting.scrollBottom || s.params.scrollBottom,
            bodyEq: setting.bodyEq || s.params.bodyEq,
            onInitStart : s.params.onInitStart,
            onInitEnd : s.params.onInitEnd
        };

        /**
         * Init/Destroy
         */
        tableNumber+=1;

        s.init = function () {
            
            // 初始化开始前回调
            o.onInitStart(s.container);
            s.container.data('options', o);

            /**
             * 合并单元格
             */
            if ( o.rowspan!=="false" ) {
                var rowArray = o.rowspan.split(",");
                
                // 合并数量的列
                if( rowArray[0] === 'all' ){
                    for (var i = 0; i < rowArray[1]; i++) {
                        rowArray.push(i);
                    }
                    rowArray.splice(0, 2);
                }

                // 循环调用合并的方法
                $.each(rowArray , function(index, el) {
                    s.mergeRowCell(el);
                });
            };
            if ( o.colspan!=="false" ) {
                var colArray = o.colspan.split(",");

                // 合并数量的行
                if( colArray[0] === 'all' ){
                    for (var i = 0; i < colArray[1]; i++) {
                        colArray.push(i);
                    }
                    colArray.splice(0, 2);
                }

                // 循环调用合并的方法
                $.each(colArray , function(index, el) {
                    s.mergeColCell(el);
                });
            };

            // 判断是否需要固定表头
            if (o.thead !== "true" && o.tfoot !== "true" &&  o.tleft <= 0 && o.tright <= 0 ) {
                return;
            };
            // 判断之前是否已经运行过本方法
            if ( s.container.parent().hasClass('mocFixedtable-view') ) {
                s.container.siblings().remove();
                s.container.parent().siblings().remove();
                var dom = s.container.parent().parent().parent();
                dom.append( s.container );
                s.container.prev().remove();
            }

            // 给table添加标识，设置宽度
            s.container.attr('Fixedtable-id', 'table'+tableNumber);            
            s.container.find('tr').each(function(index, tr) {
                // 给每一个tr添加标识
                $(tr).attr('Fixedtable-id', 'table'+tableNumber+"-tr"+index);
                // 给每一个td、th添加标识
                $(tr).children().each(function(i, td) {
                    $(td).attr('Fixedtable-id', 'table'+tableNumber+"-tr"+index+"-"+i);
                });
            });
            
            /**
             * 给每一个td、th附加宽度
             */
            if ( s.container.css('table-layout')==="auto" ) {
                s.container.css('table-layout','fixed');
            };
            
            /* 初始化生成基本结构 */
            s.InitializeDom();
        };


        /**
         * 初始化生成基本结构
         */ 
        var Fixedtable;
        s.InitializeDom = function () {

            // 生成显示窗口和添加宽高
            s.container.wrap("<div class='mocFixedtable-view'></div>");            
            var view = s.container.parents(".mocFixedtable-view");
            view.wrap("<div class='mocFixedtable'></div>");
            Fixedtable = s.container.parents(".mocFixedtable");
            Fixedtable.css({
                'width': o.viewW,
                'height': o.viewH
            });

            /**
             * 获取窗口的真实宽度和高度
             */
            $("<div>", {
                'class' : "mocFixedtable-view-w"
            }).appendTo(view);
            $("<div>", {
                'class' : "mocFixedtable-view-h"
            }).appendTo(view);

            // 判断是否含有底部横向滚动条，根据浏览器更改准确的值
            var footTop = 0;
            var ieHeight = 0;
            var nWidth = s.container.mocActual('outerWidth');
            var wWidth = s.container.closest('.mocFixedtable-view').width();
            if ( nWidth>wWidth ) {
                if(navigator.userAgent.toLowerCase().indexOf('applewebkit/') > -1) {  
                    footTop = o.scrollBottom;
                }else{
                    footTop = 17;
                    ieHeight = 17;
                }
            }

            // 获取展示窗口的宽度和高度
            var viewWidth = view.find('.mocFixedtable-view-w').mocActual('outerWidth');
            var viewHeight = view.find('.mocFixedtable-view-h').mocActual('outerHeight')-ieHeight;

            if ( o.viewH == "auto" ) {
                viewHeight = view.height();
            }

            // 将table设置宽度
            if( moc.BrowserType()=="IE8" ) {
                s.container.width( s.container.mocActual('outerWidth')-2 );
            }else{
                s.container.width( s.container.mocActual('outerWidth')-1 );
            }

            /**
             * 判断是否生成 顶部的浮动层
             */
            if( o.thead == "true" ) {
                var headHeight = s.container.find('thead').mocActual('outerHeight')+1;
                var head = $("<div>", {
                    'class' : "mocFixedtable-head"
                }).appendTo(Fixedtable);
                head.css({
                    "width": viewWidth,
                    "height": headHeight
                });
                var headInner = $("<div>", {
                    'class' : "mocFixedtable-head-inner"
                }).appendTo(head);
                // 生成顶部表格
                var headclone = s.container.clone();
                headclone.find('tbody,tfoot').remove();
                // 火狐浏览器调整宽度
                if( moc.BrowserType()== "Firefox" && s.container.css('table-layout')==="auto" ) {
                    var trLength = headclone.find('tr').length;
                    headclone.find('th,td').each(function(index, td) {
                        if ( $(td).attr('colspan')>1 ) {
                            var rowspan = $(td).attr('rowspan')||1;
                            if ( rowspan == trLength) {
                                var W = $(td).attr('colspan')-1+Number($(td).find('.mocFixedtable-width').mocActual("width"));
                                $(td).find('.mocFixedtable-width').width(W);
                            };
                        };
                    });
                }
                headclone.appendTo(headInner);
            };

            /**
             * 判断是否生成 左侧的浮动层
             */
            if( o.tleft > 0 ) {
                var tleftWidth = 1;
                for (var i = 0; i < o.tleft; i++) {
                    tleftWidth += s.container.find('tbody tr').eq(o.bodyEq).children().eq(i).mocActual('outerWidth');
                };

                var left = $("<div>", {
                    'class' : "mocFixedtable-left"
                }).appendTo(Fixedtable);
                left.css({
                    "width": tleftWidth,
                    "height": viewHeight
                });
                var leftInner = $("<div>", {
                    'class' : "mocFixedtable-left-inner"
                }).appendTo(left);

                // 生成左侧表格
                var leftclone = s.container.clone();
                leftclone.appendTo(leftInner);
            };

            /**
             * 判断是否生成 顶部左侧的浮动层
             */
            if( o.thead == "true" && o.tleft > 0 ) {
                var leftHead = $("<div>", {
                    'class' : "mocFixedtable-left-head"
                }).appendTo(Fixedtable);
                leftHead.css({
                    "width": tleftWidth,
                    "height": headHeight
                });
                // 生成顶部左侧表格
                var leftHeadclone = s.container.clone();
                leftHeadclone.find('tbody,tfoot').remove();
                leftHeadclone.appendTo(leftHead);

                // 火狐浏览器调整宽度
                if( moc.BrowserType()== "Firefox" && s.container.css('table-layout')==="auto" ) {
                    var trLength = leftHeadclone.find('tr').length;
                    leftHeadclone.find('th,td').each(function(index, td) {
                        if ( $(td).attr('colspan')>1 ) {
                            var rowspan = $(td).attr('rowspan')||1;
                            if ( rowspan == trLength) {
                                var W = $(td).attr('colspan')-1+Number($(td).find('.mocFixedtable-width').mocActual("width"));
                                $(td).find('.mocFixedtable-width').width(W);
                            };
                        };
                    });
                }
            }

            /**
             * 判断是否生成 底部的浮动层
             */
            if( o.tfoot == "true" ) {
                var footHeight = s.container.find('tfoot').mocActual('outerHeight')+1;

                var foot = $("<div>", {
                    'class' : "mocFixedtable-foot"
                }).appendTo(Fixedtable);

                foot.css({
                    "width": viewWidth,
                    "height": footHeight,
                    "bottom": footTop+"px"
                });
                var footInner = $("<div>", {
                    'class' : "mocFixedtable-foot-inner"
                }).appendTo(foot);
                // 生成底部表格
                var footclone = s.container.clone();
                footclone.find('tbody,thead').remove();

                // 火狐浏览器调整宽度
                if( moc.BrowserType()== "Firefox" && s.container.css('table-layout')==="auto" ) {
                    var trLength = footclone.find('tr').length;
                    footclone.find('th,td').each(function(index, td) {
                        if ( $(td).attr('colspan')>1 ) {
                            var rowspan = $(td).attr('rowspan')||1;
                            if ( rowspan == trLength) {
                                var W = $(td).attr('colspan')-1+Number($(td).find('.mocFixedtable-width').mocActual("width"));

                                $(td).find('.mocFixedtable-width').width(W);
                            };
                        };
                    });
                }
                footclone.appendTo(footInner);
            };

            /**
             * 判断是否生成 底部左侧的浮动层
             */
            if( o.tfoot == "true" && o.tleft > 0 ) {
                var leftFoot = $("<div>", {
                    'class' : "mocFixedtable-left-foot"
                }).appendTo(Fixedtable);
                leftFoot.css({
                    "width": tleftWidth,
                    "height": footHeight,
                    "bottom": footTop+"px"
                });
                // 生成顶部左侧表格
                var leftFootclone = s.container.clone();
                leftFootclone.find('tbody,thead').remove();
                // 火狐浏览器调整宽度
                if( moc.BrowserType()== "Firefox" && s.container.css('table-layout')==="auto" ) {
                    var trLength = leftFootclone.find('tr').length;
                    leftFootclone.find('th,td').each(function(index, td) {
                        if ( $(td).attr('colspan')>1 ) {
                            var rowspan = $(td).attr('rowspan')||1;
                            if ( rowspan == trLength) {
                                var W = $(td).attr('colspan')-1+Number($(td).find('.mocFixedtable-width').mocActual("width"));
                                $(td).find('.mocFixedtable-width').width(W);
                            };
                        };
                    });
                }
                leftFootclone.appendTo(leftFoot);
            }

            /**
             * 判断是否生成 右侧的浮动层
             */
            if( o.tright > 0 ) {
                var trightWidth = 2;
                s.container.find('tbody tr:first').children().slice(-o.tright || 1).each(function(i,td) {
                    trightWidth += $(td).mocActual('outerWidth');
                });

                var rightLeft = 0;
                var nHeight = s.container.outerHeight();
                var wHeight = s.container.closest('.mocFixedtable-view').height();
                if ( nHeight>wHeight ) {
                    if(navigator.userAgent.toLowerCase().indexOf('applewebkit/') > -1) {
                        rightLeft = o.scrollRight;
                    }else{
                        rightLeft = 18;
                    }
                }

                var right = $("<div>", {
                    'class' : "mocFixedtable-right"
                }).appendTo(Fixedtable);
                
                right.css({
                    "width": trightWidth,
                    "height": viewHeight,
                    "right": rightLeft+"px"
                });
                var rightInner = $("<div>", {
                    'class' : "mocFixedtable-right-inner"
                }).appendTo(right);

                // 生成右侧表格
                var rightclone = s.container.clone();
                rightclone.appendTo(rightInner);
            };

            /**
             * 判断是否生成 顶部右侧的浮动层
             */
            if( o.thead == "true" && o.tright > 0 ) {
                var rightHead = $("<div>", {
                    'class' : "mocFixedtable-right-head"
                }).appendTo(Fixedtable);
                rightHead.css({
                    "width": trightWidth,
                    "height": headHeight,
                    "right": rightLeft+"px"
                });

                var rightHeadInner = $("<div>", {
                    'class' : "mocFixedtable-right-head-inner"
                }).appendTo(rightHead);


                // 生成顶部右侧表格
                var rightHeadclone = s.container.clone();
                rightHeadclone.find('tbody,tfoot').remove();
                // 火狐浏览器调整宽度
                if( moc.BrowserType()== "Firefox" && s.container.css('table-layout')==="auto" ) {
                    var trLength = rightHeadclone.find('tr').length;
                    rightHeadclone.find('th,td').each(function(index, td) {
                        if ( $(td).attr('colspan')>1 ) {
                            var rowspan = $(td).attr('rowspan')||1;
                            if ( rowspan == trLength) {
                                var W = $(td).attr('colspan')-1+Number($(td).find('.mocFixedtable-width').mocActual("width"));
                                $(td).find('.mocFixedtable-width').width(W);
                            };
                        };
                    });
                }
                rightHeadclone.appendTo(rightHeadInner);
            }

            /**
             * 判断是否生成 底部右侧的浮动层
             */
            if( o.tfoot == "true" && o.tright > 0 ) {
                var rightFoot = $("<div>", {
                    'class' : "mocFixedtable-right-foot"
                }).appendTo(Fixedtable);
                rightFoot.css({
                    "width": trightWidth,
                    "height": footHeight,
                    "right": rightLeft+"px",
                    "bottom": footTop+"px"
                });

                var rightFootInner = $("<div>", {
                    'class' : "mocFixedtable-right-foot-inner"
                }).appendTo(rightFoot);


                // 生成底部右侧表格
                var rightFootclone = s.container.clone();
                rightFootclone.find('tbody,thead').remove();
                // 火狐浏览器调整宽度
                if( moc.BrowserType()== "Firefox" && s.container.css('table-layout')==="auto" ) {
                    var trLength = rightFootclone.find('tr').length;
                    rightFootclone.find('th,td').each(function(index, td) {
                        if ( $(td).attr('colspan')>1 ) {
                            var rowspan = $(td).attr('rowspan')||1;
                            if ( rowspan == trLength) {
                                var W = $(td).attr('colspan')-1+Number($(td).find('.mocFixedtable-width').mocActual("width"));
                                $(td).find('.mocFixedtable-width').width(W);
                            };
                        };
                    });
                }
                rightFootclone.appendTo(rightFootInner);
            }

            /**
             * 补全底部边框线
             */
            $("<div>", {
                'class' : "mocFixedtable-bottom-border"
            }).css({"bottom": footTop+"px"}).appendTo(Fixedtable);

            /**
             * 滚动条事件
             */
            view.on('scroll', function(event) {
                var scrollTop = $(this).scrollTop();
                var scrollLeft = $(this).scrollLeft();
                if (head) {
                    head.scrollLeft(scrollLeft);
                };
                if (left) {
                    left.scrollTop(scrollTop);
                };
                if (foot) {
                    foot.scrollLeft(scrollLeft);
                };
                if (right) {
                    right.scrollTop(scrollTop);
                };
            });

            // 修改name以及改变赋值
            s.changeValue();
        };

        /**
         * 改变name和值等
         */
        s.changeValue = function () {
            var wrapchildren = Fixedtable.find('.mocFixedtable-head-inner,.mocFixedtable-left-inner,.mocFixedtable-left-head,.mocFixedtable-foot-inner,.mocFixedtable-left-foot,.mocFixedtable-right-inner,.mocFixedtable-right-head-inner,.mocFixedtable-right-foot-inner');
            
            // 将原clone表格的fixedtable-id修改为fixedtable-clone-id
            wrapchildren.find('[fixedtable-id]').attr('fixedtable-clone-id', function(){
                return $(this).attr('fixedtable-id');
            }).removeAttr('fixedtable-id');

            // 修改name,改变
            wrapchildren.find('[name]').attr('old-name', function(){
                return $(this).attr('name');
            }).attr('name', function(){
                return $(this).attr('name') + '-clone';
            });

            // 输入值，改变要获取的输入框的值
            wrapchildren.find(':text').bind('propetychange, input, blur', function(e) {
                var name = $(this).attr('old-name');
                var fixedtableId = $(this).parents("td,th").attr('fixedtable-clone-id');
                var txt = $(this).val();
                $('[fixedtable-id="' + fixedtableId + '"]').find('[name="' + name + '"]').val(txt);
            });

            // 初始化结束后回调
            o.onInitEnd();
        };

        /**
         * 合并单元格的事件
         */
        // 竖向合并
        s.mergeRowCell = function (rowIdx) {
            var rowthat;
            var length = $(s.container).find('tr').length-1;
            // 循环tr
            $(s.container).find('tr').each(function(index, tr) {
                if ($(tr).children().eq(rowIdx).is(':visible')){
                    // 找到要合并的td、th                  
                    var td = $(tr).children().eq(rowIdx);
                    if ( td.attr('norow') == undefined) {  // 判断是否需要合并

                        // 获取被合并的tr的id
                        var thatId = $(rowthat).closest('tr').data("mergecell");
                        // 获取当前tr的id
                        var selfId = $(tr).data("mergecell");
                        if ( selfId == undefined ) {    // 判断当前的tr是否含有id
                            if (rowthat!=null && td.html() == rowthat.html() ) {
                                var rowsNum = rowthat.attr("rowspan") || 1;    
                                rowsNum = Number(rowsNum)+1; 
                                rowthat.attr("rowspan",rowsNum); 
                                td.hide();

                                // 计算
                                if( td.data('mergecell-calc') ){
                                    var calc = td.data('mergecell-calc');
                                    var thatCalc = $(rowthat).data('mergecell-calc');
                                    $(rowthat).data('mergecell-calc', calc+thatCalc );
                                    // 当循环到最后一个tr时，给需要计算的显示的td、th赋值
                                    if( index === length ){
                                        $(rowthat).text( $(rowthat).data('mergecell-calc') );
                                    }
                                }
                            } else {
                                // 当循环到不是最后一个tr而又从新开始的时候，给需要计算的显示的td、th赋值
                                $(rowthat).text( $(rowthat).data('mergecell-calc') );
                                rowthat = td; 
                            }
                        }else{
                            if (rowthat!=null && td.html() == rowthat.html() && thatId == selfId ) {
                                var rowsNum = rowthat.attr("rowspan") || 1;    
                                rowsNum = Number(rowsNum)+1; 
                                rowthat.attr("rowspan",rowsNum); 
                                td.hide(); 
                                
                                // 计算
                                if( td.data('mergecell-calc') ){
                                    var calc = td.data('mergecell-calc');
                                    var thatCalc = $(rowthat).data('mergecell-calc');
                                    $(rowthat).data('mergecell-calc', calc+thatCalc );
                                    // 当循环到最后一个tr时，给需要计算的显示的td、th赋值
                                    if( index === length ){
                                        $(rowthat).text( $(rowthat).data('mergecell-calc') );
                                    }
                                }
                            } else {
                                // 当循环到不是最后一个tr而又从新开始的时候，给需要计算的显示的td、th赋值
                                $(rowthat).text( $(rowthat).data('mergecell-calc') );
                                rowthat = td;
                            }
                        } 
                    }else{
                        rowthat = null; 
                    }
                }
            });
        };
        // 横向合并
        s.mergeColCell = function (colIdx) {
            var colthat;
            $(s.container).find('tr').eq(colIdx).children().each(function(index, el) {
                if ( $(el).attr('nocol') == undefined) {
                    
                    if( $(el).data('mergecell-col') ){
                        if ( colthat!=null && $(el).data('mergecell-col') == $(colthat).data('mergecell-col') ) { 
                            var colNum = $(colthat).attr("colspan") || 1; 
                            colNum = Number(colNum)+1; 
                            $(colthat).attr("colspan",colNum); 
                            $(el).hide(); 

                        } else { 
                            colthat = el; 
                        }
                    }else{
                        if (colthat!=null && $(el).html() == $(colthat).html() ) { 
                        
                            var colNum = $(colthat).attr("colspan") || 1; 
                            colNum = Number(colNum)+1; 
                            $(colthat).attr("colspan",colNum); 
                            $(el).hide(); 

                        } else { 
                            colthat = el; 
                        }
                    }
                }else{
                    colthat = null; 
                }
            });
        };
        /**
         * Return mocFixedtable instance
         */ 
        s.init();
        return s;
    };
    window.mocFixedtable = mocFixedtable;
})(jQuery, window, document);