/* 
 * 
 * lightbox图片放大
 * mocLightBoxZoom 放大后的图片依靠滚轮再次放大或缩小
*/
;(function($){
    var groupData = [];
    var mocLightBox = (function(){
        function mocLightBox(element,options){
            this.settings = $.extend(true,$.fn.mocLightBox.defaults,options||{});
            this.element = element;
            this.init();
        }
        mocLightBox.prototype = {
            init : function(){
                var s = this,
                    o = s.settings;

                /*************** Start From Here ***************/
                // 委托点击事件(click)到body上
                $(document).on('click', '[data-lightbox]', function(e) {
                    // 阻止事件冒泡
                    e.stopPropagation();
                    // 1.创建dom节点
                    s.structure();
                    // 判断组名，根据当前组名获取同一组数据
                    if ( $(this).attr('data-lightbox') !== o.group || o.resetGroup ) {
                        o.group = $(this).data('lightbox');
                        groupData = s.getGroup();
                    }
                    // 初始化弹出框
                    s.Create( $(this) );
                });
            },
            /**
             * 生成Dom元素
             */
            structure : function(){
                var s = this,
                    o = s.settings;
                // 遮罩层
                var lock = $("<div>", {
                    'id' : o.lock
                }).appendTo("body");
                // 内容盒子
                var lightbox = $("<div>", {
                    'id' : o.lightbox
                }).appendTo("body");
                // 图片区域
                var lbbody = $("<div>", {
                    'class' : o.lbbody
                }).appendTo(lightbox);
                // 左侧按钮
                var prevBox = $("<div>", {
                    'class' : "moc-lightbox-prev"
                }).appendTo(lbbody);
                var prevBtn = $("<a>", {
                    'class' : o.prevBtn,
                    'href'  : "javascript:;"
                }).appendTo(prevBox);
                // 要放大的图片
                var imgBox = $("<div>", {
                    'class' : o.imageBox
                }).appendTo(lbbody);
                var image = $("<img>", {
                    'class' : o.image
                }).appendTo(imgBox);
                // 右侧按钮
                var nextBox = $("<div>", {
                    'class' : "moc-lightbox-next"
                }).appendTo(lbbody);
                var nextBtn = $("<a>", {
                    'class' : o.nextBtn,
                    'href'  : "javascript:;"
                }).appendTo(nextBox);
                // 底部内容显示区域
                var foot = $("<div>", {
                    'class' : o.foot
                }).appendTo(lightbox);
                var notes = $("<div>", {
                    'class' : o.notes
                }).appendTo(foot);
                var title = $("<p>", {
                    'class' : o.title
                }).appendTo(notes);
                var text = $("<div>", {
                    'class' : o.text
                }).appendTo(notes);
                var address = $("<p>", {
                    'class' : o.address,
                    'text'  : "Image"
                }).appendTo(notes);
                var addressText = $("<span>").appendTo(address);
                // 关闭按钮
                var closeBtn = $("<a>", {
                    'class' : o.closeBtn,
                    'href'  : "javascript:;"
                }).appendTo(lightbox);

                $("body").addClass('moc-lightbox-show');

                // 给按钮添加事件
                s.initEvent();  
            },
            /**
             * 获得本组的所有图片
             */
            getGroup : function (){ 
                var s = this,
                    o = s.settings;
                // 清空数组
                groupData.length = 0 ;
                // 根据当前的组名获取所有相同组名的对象
                var groupList = $('[data-lightbox='+o.group+']');
                groupList.each(function(index, el) {
                    groupData.push({
                        src: $(el).data('source') ? $(el).data('source') : $(el).attr('src'),
                        id: $(el).data('id') ? $(el).data('id') : $(el).data('source') || $(el).attr('src'),
                        title:$(el).data('title') || '',
                        text:$(el).data('text') || '',
                        activeIndex: $(el).attr('data-address') || true,
                        zoom: $(el).data('zoom'),
                        maxScale: $(el).data('maxscale')
                    });
                });
                return groupData;
            },
            /**
             * 初始化插件
             */
            Create : function (mythis){ 
                var s = this,
                    o = s.settings,
                    winWidth = $(window).mocActual('outerWidth'),
                    winHeight = $(window).outerHeight(),
                    thisSource = mythis.data('source') ? mythis.data('source') : mythis.attr('src'),
                    thisId = mythis.data('id') ? mythis.data('id') : mythis.data('source') || mythis.attr('src');

                // 背景等显示
                $("#"+o.lock).fadeIn('slow');
                $("."+o.lbbody).fadeIn('slow');
                $("#"+o.lightbox).css({
                    'width' : winWidth/3,
                    'height' : winHeight/3,
                    'margin-left' : -(winWidth/3)/2,
                    'margin-top' : -(winHeight/3)/2,
                    'top' : -(winHeight/3),
                }).animate({
                    'top' :  winHeight/2
                }, 400,function(){
                    // 加载图片
                    s.loadPicSize(thisSource);
                });

                // 当前显示的图片在数组的索引值
                var mythisIndex = s.mythisIndex(thisId);

                if( groupData.length > 1 ){ 
                    if ( mythisIndex === 0 ) {
                        $("."+o.prevBtn).addClass('disabled');
                        $("."+o.nextBtn).removeClass('disabled');
                    }else if ( mythisIndex === groupData.length-1 ) {
                        $("."+o.nextBtn).addClass('disabled');
                        $("."+o.prevBtn).removeClass('disabled');
                    }else{
                        $("."+o.prevBtn).removeClass('disabled');
                        $("."+o.nextBtn).removeClass('disabled');
                    }
                }else{
                    $("."+o.prevBtn).addClass('disabled');
                    $("."+o.nextBtn).addClass('disabled');
                }
                o.imgIndex = mythisIndex;
            },
            /**
             * 获得当前图片的索引值
             */
            mythisIndex : function (thisId){ 
                for ( var i = 0; i < groupData.length; i++ ) {
                    if ( groupData[i].id === thisId) {
                        return i;
                    }
                }
            },
            /**
             * 从新计算图片的大小
             */
            loadPicSize : function (thisSource){
                var s = this,
                    o = s.settings,
                    img = s.settings.image;
                s.preloadimg(thisSource,function(){
                    $("."+img).css({
                        'width' : 'auto',
                        'height' : 'auto'
                    }).hide();
                    $("."+img).attr('src', thisSource);
                    var picWidth = $("."+img).width();
                    var picHeight= $("."+img).height();
                    s.changePic(picWidth,picHeight);
                });
            },
            /**
             * 图片加载完成后的回调
             */
            preloadimg : function (src,callback){ // 加载图片
                var s = this,
                    images= new Image(); 
                if (!!window.ActiveXObiect) {
                    images.onreadystatechange = function(){
                        if (s.readystate === 'complete' ) {
                            callback();
                        }
                    }
                }else{
                    images.onload = function(){
                        callback();
                    }
                }
                images.src = src;
            },
            /**
             * 从新移动位置
             */
            changePic : function (PICWidth,PICHeight){
                var s = this,
                    o = s.settings,
                    winWidth = $(window).mocActual('outerWidth'),
                    winHeight = $(window).outerHeight();

                // 如果图片的宽高大于浏览器的视口的宽高比例，就将图片比例变小
                var scale = Math.min((winWidth+10)/PICWidth,(winHeight+10)/PICHeight,1);
                PICWidth = PICWidth*scale*0.9;
                PICHeight = PICHeight*scale*0.9;
                $("#"+o.lightbox).animate({
                    'width' : PICWidth, 
                    'height' : PICHeight,
                    'margin-left' : -PICWidth/2,
                    'margin-top' : -PICHeight/2,
                    'top' :  winHeight/2
                }, 350,function(){
                    // 设置图片的大小 和 mocLightBoxZoom插件的盒子的大小
                    $(".moc-lightbox-img-zoom-box").css({
                        'width' : PICWidth, 
                        'height' : PICHeight
                    });
                    $("."+o.image).css({
                        'width' : PICWidth, 
                        'height' : PICHeight, 
                        'transform' : 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)'
                    }).fadeIn('slow', function(){
                        // 获取图片的路径
                        var imgSrc = $("."+o.image).attr('src');
                        // 图片加载完成后删除当前的图片标签
                        var $imgBox = $("."+o.imageBox);
                        $imgBox.children().remove();
                        $("<img>", {
                            'width' : PICWidth, 
                            'height' : PICHeight,
                            'src': imgSrc,
                            'class' : o.image
                        }).css("display","block").appendTo( $imgBox );
                        /**
                         * 通过鼠标的二次放大
                         */
                        if( groupData[o.imgIndex].zoom === true ){
                            $("."+o.lbbody).addClass('light-box-zoom');
                            var maxScale = groupData[o.imgIndex].maxScale || o.maxScale;
                             $("."+o.image).mocLightBoxZoom({
                                'maxScale':maxScale,
                                'containerClass': 'moc-lightbox-img-zoom-box'
                            });
                        }else{
                            $("."+o.lbbody).removeClass('light-box-zoom');
                        }
                        o.flag = true;
                        o.clears = true;
                    });

                    $("."+o.foot).fadeIn('slow');
                });

                // 设置图片文字和当前索引
                $("."+o.title).text(groupData[o.imgIndex].title);
                $("."+o.text).text(groupData[o.imgIndex].text);
                $("."+o.address).children('span').text((o.imgIndex+1)+' of '+groupData.length);
                if( groupData[o.imgIndex].activeIndex == 'false' ){
                    $("."+o.address).hide();
                }else{
                    $("."+o.address).show();
                }
                if( groupData[o.imgIndex].activeIndex === 'false' && groupData[o.imgIndex].text === "" && groupData[o.imgIndex].title === "" ){
                    $("."+o.notes).hide();
                }else{
                    $("."+o.notes).show();
                }
            },
            closeFun : function (){
                var s = this,
                    o = s.settings;

                $("#"+o.lock).fadeOut(function(){
                    $("#"+o.lock).remove();
                    $("#"+o.lightbox).remove();
                    o.clears = false;
                });
                $("#"+o.lightbox).fadeOut(function(){
                    $("#"+o.lock).remove();
                    $("#"+o.lightbox).remove();
                });
                $("body").removeClass('moc-lightbox-show');
            },
            initEvent : function (){
                var s = this,
                    o = s.settings;
                
                // 点击关闭放大图片的处理
                $(document).on('click', "#"+o.lock, function(event) {
                    if(o.lockClose){
                        s.closeFun();
                    }
                });
                $(document).on('click', "."+o.closeBtn, function(event) {
                    s.closeFun();
                });

                // 上一张 按钮的点击事件
                $(document).on('click', '.'+o.prevBtn, function(event) {
                    event.stopPropagation();
                    if ( !$(this).hasClass('disabled') && o.flag ) {
                        o.flag = false;
                        s.gotoFun('prev');
                    }
                });
                // 下一张 按钮的点击事件
                $(document).on('click', '.'+o.nextBtn, function(event) {
                    event.stopPropagation();
                    if ( !$(this).hasClass('disabled') && o.flag ) {
                        o.flag = false;
                        s.gotoFun('next');
                    }
                });

                // 浏览器窗口大小的变化
                var timers = null;
                $(window).on('resize', function(){
                    if (o.clears) {
                        window.clearTimeout(timers);
                        timers = window.setTimeout(function(){
                            s.loadPicSize(groupData[o.imgIndex].src);
                        },500);
                    }
                });

                // 点击键盘切换上下的图片
                $(document).on('keyup', function(event) {
                    var keyval = event.keyCode;
                    if ( o.clears ) {
                        if ( keyval === 38 || keyval === 37 ) {
                            $("."+o.prevBtn).trigger('click');
                        }else
                        if ( keyval === 39 || keyval === 40 ) {
                            $("."+o.nextBtn).trigger('click');
                        }
                    }
                });
            },
            gotoFun : function (dir){
                var s = this,
                    o = s.settings;
                if ( dir === 'prev' ){
                    o.imgIndex--;
                    if ( o.imgIndex <= 0 ){
                        $("."+o.prevBtn).addClass('disabled');
                    }
                    if ( o.imgIndex !== groupData.length-1 ) {
                        $("."+o.nextBtn).removeClass('disabled');
                    }
                    var src = groupData[o.imgIndex].src;
                    s.loadPicSize(src);
                }else if(dir === 'next'){
                    o.imgIndex++;
                    if ( o.imgIndex >= groupData.length-1 ) {
                        $("."+o.nextBtn).addClass('disabled');
                    }
                    if ( o.imgIndex !== 0 ) {
                        $("."+o.prevBtn).removeClass('disabled');
                    }
                    var src = groupData[o.imgIndex].src;
                    s.loadPicSize(src);
                }
            }
        }
        return mocLightBox; 
    })();
    /*************** 对象级别组件开发  采用动态开发方式 ***************/
    $.fn.mocLightBox = function(options){
        return this.each(function() {   
            var s = $(this),
                instance = s.data("lightbox");
            if(!instance){
                instance = new mocLightBox(s,options); 
                s.data("lightbox",instance)
            }
            if ($.type(options) === "String" ) {
                return instance[options]();
            }
        });
    }

    /*************** 插件的参数设置 ***************/
    $.fn.mocLightBox.defaults = {
        lock            : 'moc-lightbox-bg',            // id
        lockClose       : true,                         // lock点击是否可以关闭
        lightbox        : 'moc-lightbox',               // id
        lbbody          : 'moc-lightbox-body',          // class
        prevBtn         : 'moc-lightbox-prev-btn',      // class
        image           : 'moc-lightbox-img',           // class
        imageBox        : 'moc-lightbox-img-box',       // class
        nextBtn         : 'moc-lightbox-next-btn',      // class
        foot            : 'moc-lightbox-foot',          // class
        notes           : 'moc-lightbox-notes',         // class
        title           : 'moc-lightbox-title',         // class
        text            : 'moc-lightbox-text',          // class
        address         : 'moc-lightbox-address',       // class
        closeBtn        : 'moc-lightbox-close-btn',     // class
        group           : 'null',               // 当前数组里面图片的名称
        resetGroup      : false,                // 每次点击是否从新获取数组的数据
        maxScale        : 3,                    // 鼠标的二次放大最大可放大的倍数
        imgIndex        : 0,                    // 记录当前的图片所在图片组中的个数
        flag            : false,                // 插件内部的状态，判断当前图片是否已经加载完成，如果没有不可以点击上一个和下一个按钮
        clears          : false                 // 插件内部的状态，当前插件是否处于事件的可操作状态，（窗口变化、上下左右）
    }
})(jQuery);
;(function(e) {
    e.fn.mocLightBoxZoom = function(t) {
        function r(e) {}
        function s(e, t) {
            var r = n.data("smartZoomData");
            if (r.currentWheelDelta * t < 0)
                r.currentWheelDelta = 0;
            r.currentWheelDelta += t;
            i.zoom(r.mouseWheelDeltaFactor * r.currentWheelDelta, {
                x: e.pageX,
                y: e.pageY
            })
        }
        function o(e) {
            e.preventDefault()
        }
        function u() {
            var e = n.data("smartZoomData");
            if (e.settings.mouseMoveEnabled != true || e.settings.moveCursorEnabled != true)
                return;
            var t = S();
            var r = t.width / e.originalSize.width;
            if (parseInt(r * 100) > parseInt(e.adjustedPosInfos.scale * 100))
                n.css({
                    cursor: "move"
                });
            else
                n.css({
                    cursor: "default"
                })
        }
        function a(e) {
            m(e.pageX, e.pageY)
        }
        function f(t) {
            t.preventDefault();
            e(document).on("mousemove.smartZoom", l);
            e(document).bind("mouseup.smartZoom", c);
            var r = n.data("smartZoomData");
            r.moveCurrentPosition = new A(t.pageX,t.pageY);
            r.moveLastPosition = new A(t.pageX,t.pageY)
        }
        function l(e) {
            var t = n.data("smartZoomData");
            if (t.mouseMoveForPan || !t.mouseMoveForPan && t.moveCurrentPosition.x != e.pageX && t.moveCurrentPosition.y != e.pageY) {
                t.mouseMoveForPan = true;
                v(e.pageX, e.pageY, 0, false)
            }
        }
        function c(t) {
            var r = n.data("smartZoomData");
            if (r.mouseMoveForPan) {
                r.mouseMoveForPan = false;
                if (r.moveLastPosition.distance(r.moveCurrentPosition) > 4) {
                    var i = r.moveLastPosition.interpolate(r.moveCurrentPosition, -4);
                    v(i.x, i.y, 500, true)
                } else {
                    v(r.moveLastPosition.x, r.moveLastPosition.y, 0, true)
                }
            } else if (r.settings.zoomOnSimpleClick) {
                m(t.pageX, t.pageY)
            }
            e(document).unbind("mousemove.smartZoom");
            e(document).unbind("mouseup.smartZoom")
        }
        function h(t) {
            t.preventDefault();
            e(document).unbind("touchmove.smartZoom");
            e(document).unbind("touchend.smartZoom");
            e(document).bind("touchmove.smartZoom", p);
            e(document).bind("touchend.smartZoom", d);
            var r = t.originalEvent.touches;
            var i = r[0];
            var s = n.data("smartZoomData");
            s.touch.touchMove = false;
            s.touch.touchPinch = false;
            s.moveCurrentPosition = new A(i.pageX,i.pageY);
            s.moveLastPosition = new A(i.pageX,i.pageY);
            s.touch.lastTouchPositionArr = new Array;
            var o;
            var u = r.length;
            for (var a = 0; a < u; ++a) {
                o = r[a];
                s.touch.lastTouchPositionArr.push(new A(o.pageX,o.pageY))
            }
        }
        function p(e) {
            e.preventDefault();
            var t = n.data("smartZoomData");
            var r = e.originalEvent.touches;
            var s = r.length;
            var o = r[0];
            if (s == 1 && !t.touch.touchPinch && t.settings.touchMoveEnabled == true) {
                if (!t.touch.touchMove) {
                    var u = t.touch.lastTouchPositionArr[0];
                    if (u.distance(new A(o.pageX,o.pageY)) < 3) {
                        return
                    } else
                        t.touch.touchMove = true
                }
                v(o.pageX, o.pageY, 0, false)
            } else if (s == 2 && !t.touch.touchMove && t.settings.pinchEnabled == true) {
                t.touch.touchPinch = true;
                var a = r[1];
                var f = t.touch.lastTouchPositionArr[0];
                var l = t.touch.lastTouchPositionArr[1];
                var c = new A(o.pageX,o.pageY);
                var h = new A(a.pageX,a.pageY);
                var p = c.distance(h);
                var d = f.distance(l);
                var m = p - d;
                if (Math.abs(m) < 3)
                    return;
                var g = new A((c.x + h.x) / 2,(c.y + h.y) / 2);
                var y = S();
                var b = t.originalSize;
                var w = y.width / b.width;
                var E = p / d;
                var x = y.width * E / b.width;
                i.zoom(x - w, g, 0);
                t.touch.lastTouchPositionArr[0] = c;
                t.touch.lastTouchPositionArr[1] = h
            }
        }
        function d(t) {
            t.preventDefault();
            var r = t.originalEvent.touches.length;
            if (r == 0) {
                e(document).unbind("touchmove.smartZoom");
                e(document).unbind("touchend.smartZoom")
            }
            var i = n.data("smartZoomData");
            if (i.touch.touchPinch)
                return;
            if (i.touch.touchMove) {
                if (i.moveLastPosition.distance(i.moveCurrentPosition) > 2) {
                    var s = i.moveLastPosition.interpolate(i.moveCurrentPosition, -4);
                    v(s.x, s.y, 500, true)
                }
            } else {
                if (i.settings.dblTapEnabled == true && i.touch.lastTouchEndTime != 0 && (new Date).getTime() - i.touch.lastTouchEndTime < 400) {
                    var o = i.touch.lastTouchPositionArr[0];
                    m(o.x, o.y)
                }
                i.touch.lastTouchEndTime = (new Date).getTime()
            }
        }
        function v(e, t, i, s) {
            g(r.PAN);
            var o = n.data("smartZoomData");
            o.moveLastPosition.x = o.moveCurrentPosition.x;
            o.moveLastPosition.y = o.moveCurrentPosition.y;
            var u = n.offset();
            var a = S();
            var f = u.left + (e - o.moveCurrentPosition.x);
            var l = u.top + (t - o.moveCurrentPosition.y);
            var c = y(f, l, a.width, a.height);
            x(r.PAN, r.START, false);
            E(n, c.x, c.y, a.width, a.height, i, s == true ? function() {
                x(r.PAN, r.END, false)
            }
            : null);
            o.moveCurrentPosition.x = e;
            o.moveCurrentPosition.y = t
        }
        function m(e, t) {
            var r = n.data("smartZoomData");
            var s = r.originalSize;
            var o = S();
            var u = o.width / s.width;
            var a = r.adjustedPosInfos.scale;
            var f = parseFloat(r.settings.dblClickMaxScale);
            var l;
            if (u.toFixed(2) > f.toFixed(2) || Math.abs(f - u) > Math.abs(u - a)) {
                l = f - u
            } else {
                l = a - u
            }
            i.zoom(l, {
                x: e,
                y: t
            })
        }
        function g(t) {
            var r = n.data("smartZoomData");



            if (r.transitionObject) {
                if (r.transitionObject.cssAnimHandler)
                    n.off(e.support.transition, r.transitionObject.cssAnimTimer);
                var i = r.originalSize;
                var s = S();
                var o = new Object;
                o[r.transitionObject.transition] = "all 0s";
                if (r.transitionObject.css3dSupported) {
                    o[r.transitionObject.transform] = "translate3d(" + s.x + "px, " + s.y + "px, 0) scale3d(" + s.width / i.width + "," + s.height / i.height + ", 1)"
                } else {
                    o[r.transitionObject.transform] = "translateX(" + s.x + "px) translateY(" + s.y + "px) scale(" + s.width / i.width + "," + s.height / i.height + ")"
                }
                n.css(o)
            } else {
                n.stop()
            }
            u();
            if (t != null)
                x(t, "", true)
        }
        function y(e, t, r, i) {
            var s = n.data("smartZoomData");
            var o = Math.min(s.adjustedPosInfos.top, t);
            o += Math.max(0, s.adjustedPosInfos.top + s.adjustedPosInfos.height - (o + i));
            var u = Math.min(s.adjustedPosInfos.left, e);
            u += Math.max(0, s.adjustedPosInfos.left + s.adjustedPosInfos.width - (u + r));
            return new A(u.toFixed(2),o.toFixed(2))
        }
        function b(e) {
            n.unbind("load.smartZoom");
            i.init.apply(n, [e.data.arguments])
        }
        function w() {
            var e = n.data("smartZoomData");
            if( !e ){
                return;
            }
            var t = e.containerDiv;
            var r = e.originalSize;
            var i = t.parent().offset();
            var s = C(e.settings.left, i.left, t.parent().width());
            var o = C(e.settings.top, i.top, t.parent().height());
            t.offset({
                left: s,
                top: o
            });
            t.width(N(e.settings.width, t.parent().width(), s - i.left));
            t.height(N(e.settings.height, t.parent().height(), o - i.top));
            var a = L(t);
            var f = Math.min(Math.min(a.width / r.width, a.height / r.height), 1).toFixed(2);
            var l = r.width * f;
            var c = r.height * f;
            e.adjustedPosInfos = {
                left: (a.width - l) / 2 + i.left,
                top: (a.height - c) / 2 + i.top,
                width: l,
                height: c,
                scale: f
            };
            g();
            E(n, e.adjustedPosInfos.left, e.adjustedPosInfos.top, l, c, 0, function() {
                n.css("visibility", "visible")
            });
            u()
        }
        function E(t, r, i, s, o, u, a) {
            var f = n.data("smartZoomData");
            var l = f.containerDiv.offset();
            var c = r - l.left;
            var h = i - l.top;
            if (f.transitionObject != null) {
                var p = f.originalSize;
                var d = new Object;
                d[f.transitionObject.transform + "-origin"] = "0 0";
                d[f.transitionObject.transition] = "all " + u / 1e3 + "s ease-out";
                if (f.transitionObject.css3dSupported)
                    d[f.transitionObject.transform] = "translate3d(" + c + "px, " + h + "px, 0) scale3d(" + s / p.width + "," + o / p.height + ", 1)";
                else
                    d[f.transitionObject.transform] = "translateX(" + c + "px) translateY(" + h + "px) scale(" + s / p.width + "," + o / p.height + ")";
                if (a != null) {
                    f.transitionObject.cssAnimHandler = a;
                    t.one(e.support.transition.end, f.transitionObject.cssAnimHandler)
                }
                t.css(d)
            } else {
                t.animate({
                    "margin-left": c,
                    "margin-top": h,
                    width: s,
                    height: o
                }, {
                    duration: u,
                    easing: f.settings.easing,
                    complete: function() {
                        if (a != null)
                            a()
                    }
                })
            }
        }
        function S(e) {
            var t = n.data("smartZoomData");
            var r = n.width();
            var i = n.height();
            var s = n.offset();
            var o = parseInt(s.left);
            var u = parseInt(s.top);
            var a = t.containerDiv.offset();
            if (e != true) {
                o = parseInt(o) - a.left;
                u = parseInt(u) - a.top
            }
            if (t.transitionObject != null) {
                var f = n.css(t.transitionObject.transform);
                if (f && f != "" && f.search("matrix") != -1) {
                    var l;
                    var c;
                    if (f.search("matrix3d") != -1) {
                        c = f.replace("matrix3d(", "").replace(")", "").split(",");
                        l = c[0]
                    } else {
                        c = f.replace("matrix(", "").replace(")", "").split(",");
                        l = c[3];
                        o = parseFloat(c[4]);
                        u = parseFloat(c[5]);
                        if (e) {
                            o = parseFloat(o) + a.left;
                            u = parseFloat(u) + a.top
                        }
                    }
                    r = l * r;
                    i = l * i
                }
            }
            return {
                x: o,
                y: u,
                width: r,
                height: i
            }
        }
        function x(e, t, i) {
            var s = n.data("smartZoomData");
            var o = "";
            if (i == true && s.currentActionType != e) {
                o = s.currentActionType + "_" + r.END;
                s.currentActionType = "";
                s.currentActionStep = ""
            } else {
                if (s.currentActionType != e || s.currentActionStep == r.END) {
                    s.currentActionType = e;
                    s.currentActionStep = r.START;
                    o = s.currentActionType + "_" + s.currentActionStep
                } else if (s.currentActionType == e && t == r.END) {
                    s.currentActionStep = r.END;
                    o = s.currentActionType + "_" + s.currentActionStep;
                    s.currentActionType = "";
                    s.currentActionStep = ""
                }
            }
            if (o != "") {
                var u = jQuery.Event(o);
                u.targetRect = S(true);
                u.scale = u.targetRect.width / s.originalSize.width;
                n.trigger(u)
            }
        }
        function T() {
            var t = document.body || document.documentElement;
            var n = t.style;
            var r = ["transition", "WebkitTransition", "MozTransition", "MsTransition", "OTransition"];
            var i = ["transition", "-webkit-transition", "-moz-transition", "-ms-transition", "-o-transition"];
            var s = ["transform", "-webkit-transform", "-moz-transform", "-ms-transform", "-o-transform"];
            var o = r.length;
            var u;
            for (var a = 0; a < o; a++) {
                if (n[r[a]] != null) {
                    transformStr = s[a];
                    var f = e('<div style="position:absolute;">Translate3d Test</div>');
                    e("body").append(f);
                    u = new Object;
                    u[s[a]] = "translate3d(20px,0,0)";
                    f.css(u);
                    css3dSupported = f.offset().left - e("body").offset().left == 20;
                    f.empty().remove();
                    if (css3dSupported) {
                        return {
                            transition: i[a],
                            transform: s[a],
                            css3dSupported: css3dSupported
                        }
                    }
                }
            }
            return null
        }
        function N(e, t, n) {
            if (e.search && e.search("%") != -1)
                return (t - n) * (parseInt(e) / 100);
            else
                return parseInt(e)
        }
        function C(e, t, n) {
            if (e.search && e.search("%") != -1)
                return t + n * (parseInt(e) / 100);
            else
                return t + parseInt(e)
        }
        function k() {
            w()
        }
        function L(e) {
            var t = e.offset();
            if (!t)
                return null;
            var n = t.left;
            var r = t.top;
            return {
                x: n,
                y: r,
                width: e.outerWidth(),
                height: e.outerHeight()
            }
        }
        function A(e, t) {
            this.x = e;
            this.y = t;
            this.toString = function() {
                return "(x=" + this.x + ", y=" + this.y + ")"
            }
            ;
            this.interpolate = function(e, t) {
                var n = t * this.x + (1 - t) * e.x;
                var r = t * this.y + (1 - t) * e.y;
                return new A(n,r)
            }
            ;
            this.distance = function(e) {
                return Math.sqrt(Math.pow(e.y - this.y, 2) + Math.pow(e.x - this.x, 2))
            }
        }
        var n = this;
        r.ZOOM = "SmartZoom_ZOOM";
        r.PAN = "SmartZoom_PAN";
        r.START = "START";
        r.END = "END";
        r.DESTROYED = "SmartZoom_DESTROYED";
        var i = {
            init: function(t) {
                if (n.data("smartZoomData"))
                    return;
                settings = e.extend({
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    easing: "smartZoomEasing",
                    initCallback: null,
                    maxScale: 3,
                    dblClickMaxScale: 1.8,
                    mouseEnabled: true,
                    scrollEnabled: true,
                    dblClickEnabled: true,
                    mouseMoveEnabled: true,
                    moveCursorEnabled: true,
                    adjustOnResize: true,
                    touchEnabled: true,
                    dblTapEnabled: true,
                    zoomOnSimpleClick: false,
                    pinchEnabled: true,
                    touchMoveEnabled: true,
                    containerBackground: "#FFFFFF",
                    containerClass: ""
                }, t);
                var r = n.attr("style");
                var i = "smartZoomContainer" + (new Date).getTime();
                var u = e('<div id="' + i + '" class="' + settings.containerClass + '"></div>');
                n.before(u);
                n.remove();
                u = e("#" + i);
                u.css({
                    overflow: "hidden"
                });
                if (settings.containerClass == "")
                    u.css({
                        "background-color": settings.containerBackground
                    });
                u.append(n);
                var l = new Object;
                l.lastTouchEndTime = 0;
                l.lastTouchPositionArr = null;
                l.touchMove = false;
                l.touchPinch = false;
                n.data("smartZoomData", {
                    settings: settings,
                    containerDiv: u,
                    originalSize: {
                        width: n.width(),
                        height: n.height()
                    },
                    originalPosition: n.offset(),
                    transitionObject: T(),
                    touch: l,
                    mouseWheelDeltaFactor: .15,
                    currentWheelDelta: 0,
                    adjustedPosInfos: null,
                    moveCurrentPosition: null,
                    moveLastPosition: null,
                    mouseMoveForPan: false,
                    currentActionType: "",
                    initialStyles: r,
                    currentActionStep: ""
                });
                w();
                if (settings.touchEnabled == true)
                    n.bind("touchstart.smartZoom", h);
                if (settings.mouseEnabled == true) {
                    if (settings.mouseMoveEnabled == true)
                        n.bind("mousedown.smartZoom", f);
                    if (settings.scrollEnabled == true) {
                        u.bind("mousewheel.smartZoom", s);
                        u.bind("mousewheel.smartZoom DOMMouseScroll.smartZoom", o)
                    }
                    if (settings.dblClickEnabled == true && settings.zoomOnSimpleClick == false)
                        u.bind("dblclick.smartZoom", a)
                }
                document.ondragstart = function() {
                    return false
                }
                ;
                if (settings.adjustOnResize == true)
                    e(window).bind("resize.smartZoom", k);
                if (settings.initCallback != null)
                    settings.initCallback.apply(this, n)
            },
            zoom: function(e, t, i) {
                var s = n.data("smartZoomData");
                var o;
                var a;
                if (!t) {
                    var f = L(s.containerDiv);
                    o = f.x + f.width / 2;
                    a = f.y + f.height / 2
                } else {
                    o = t.x;
                    a = t.y
                }
                g(r.ZOOM);
                var l = S(true);
                var c = s.originalSize;
                var h = l.width / c.width + e;
                h = Math.max(s.adjustedPosInfos.scale, h);
                h = Math.min(s.settings.maxScale, h);
                var p = c.width * h;
                var d = c.height * h;
                var v = o - l.x;
                var m = a - l.y;
                var b = p / l.width;
                var w = l.x - (v * b - v);
                var T = l.y - (m * b - m);
                var N = y(w, T, p, d);
                if (i == null)
                    i = 700;
                x(r.ZOOM, r.START, false);
                E(n, N.x, N.y, p, d, i, function() {
                    s.currentWheelDelta = 0;
                    u();
                    x(r.ZOOM, r.END, false)
                })
            },
            pan: function(e, t, i) {
                if (e == null || t == null)
                    return;
                if (i == null)
                    i = 700;
                var s = n.offset();
                var o = S();
                var u = y(s.left + e, s.top + t, o.width, o.height);
                if (u.x != s.left || u.y != s.top) {
                    g(r.PAN);
                    x(r.PAN, r.START, false);
                    E(n, u.x, u.y, o.width, o.height, i, function() {
                        x(r.PAN, r.END, false)
                    })
                }
            },
            destroy: function() {
                var t = n.data("smartZoomData");
                if (!t)
                    return;
                g();
                var i = t.containerDiv;
                n.unbind("mousedown.smartZoom");
                n.bind("touchstart.smartZoom");
                i.unbind("mousewheel.smartZoom");
                i.unbind("dblclick.smartZoom");
                i.unbind("mousewheel.smartZoom DOMMouseScroll.smartZoom");
                e(window).unbind("resize.smartZoom");
                e(document).unbind("mousemove.smartZoom");
                e(document).unbind("mouseup.smartZoom");
                e(document).unbind("touchmove.smartZoom");
                e(document).unbind("touchend.smartZoom");
                n.css({
                    cursor: "default"
                });
                i.before(n);
                E(n, t.originalPosition.left, t.originalPosition.top, t.originalSize.width, t.originalSize.height, 5);
                n.removeData("smartZoomData");
                i.remove();
                n.attr("style", t.initialStyles);
                n.trigger(r.DESTROYED)
            },
            isPluginActive: function() {
                return n.data("smartZoomData") != undefined
            }
        };
        if (i[t]) {
            return i[t].apply(this, Array.prototype.slice.call(arguments, 1))
        } else if (typeof t === "object" || !t) {
            if (n[0].tagName.toLowerCase() == "img" && !n[0].complete) {
                n.bind("load.smartZoom", {
                    arguments: arguments[0]
                }, b)
            } else {
                i.init.apply(n, [arguments[0]])
            }
        } else {
            e.error("Method " + t + " does not exist on e-smartzoom jquery plugin")
        }
    };
    function t(t) {
        var n = t || window.event
          , r = [].slice.call(arguments, 1)
          , i = 0
          , s = true
          , o = 0
          , u = 0;
        t = e.event.fix(n);
        t.type = "mousewheel";
        if (n.wheelDelta) {
            i = n.wheelDelta / 120
        }
        if (n.detail) {
            i = -n.detail / 3
        }
        u = i;
        if (n.axis !== undefined && n.axis === n.HORIZONTAL_AXIS) {
            u = 0;
            o = -1 * i
        }
        if (n.wheelDeltaY !== undefined) {
            u = n.wheelDeltaY / 120
        }
        if (n.wheelDeltaX !== undefined) {
            o = -1 * n.wheelDeltaX / 120
        }
        r.unshift(t, i, o, u);
        return (e.event.dispatch || e.event.handle).apply(this, r)
    }
    var n = ["DOMMouseScroll", "mousewheel"];
    if (e.event.fixHooks) {
        for (var r = n.length; r; ) {
            e.event.fixHooks[n[--r]] = e.event.mouseHooks
        }
    }
    e.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener) {
                for (var e = n.length; e; ) {
                    this.addEventListener(n[--e], t, false)
                }
            } else {
                this.onmousewheel = t
            }
        },
        teardown: function() {
            if (this.removeEventListener) {
                for (var e = n.length; e; ) {
                    this.removeEventListener(n[--e], t, false)
                }
            } else {
                this.onmousewheel = null
            }
        }
    };
    e.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    });
})(jQuery);