# template

工作中常用的组件用过的一些好的插件

git add .
git commit -m "注释"
git push

// js 原生版本
<div class="move">
    <div class="move-head">
        <div class="move-handle"></div>
    </div>
</div>
<style type="text/css">
    .move{
        width: 520px;
        height: 360px;
        position: absolute;
        left: 50%;
        top: 50%;
        /*margin-left: -18rem;
        margin-top: -12rem;*/
        background-color: #fff;
        border: #ccc 2px solid;

        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%); /* IE 9 */
        -moz-transform: translate(-50%, -50%); /* Firefox */
        -webkit-transform: translate(-50%, -50%); /* Safari and Chrome */
        -o-transform: translate(-50%, -50%); /* Opera */
    }
    .move-handle{
        height: 36px;
        background-color: #0085d0;
        cursor: move;
    }
</style>
<script type="text/javascript">
        get('.move-handle').addEventListener('mousedown', function(e){
            var e = e || window.event;
            var $move = closest(e.target, '.move');

            /**
             * 计算出鼠标的位置距离要移动的dom的左顶点的距离
             */
            let mouseOffsetX = e.clientX - $move.offsetLeft;
            let mouseOffsetY = e.clientY - $move.offsetTop;

            /**
             * 获取自身携带的marginLeft、marginTop值，并转化为数字
             */
            // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
            const sty = $move.currentStyle || window.getComputedStyle($move, null);
            if( sty.margin.includes('px') ) {
                var marginL = +sty.marginLeft.replace(/\px/g, '');
                var marginT = +sty.marginTop.replace(/\px/g, '');
            };

            /**
             * 鼠标移动事件
             */
            document.onmousemove = function (e) {
                var e = e || window.event;
                // 计算出当前位置
                let moveX = e.clientX - mouseOffsetX - marginL;
                let moveY = e.clientY - mouseOffsetY - marginT;

                console.log( e.clientX , mouseOffsetX , marginL );

                // 赋值
                $move.style.left = moveX + 'px';
                $move.style.top = moveY + 'px';
            };
            document.onmouseup = function (e) {
                // 释放事件
                document.onmousemove = null;
                document.onmouseup = null;
            };
        })

        function get(selector){
            return document.querySelector(selector);
        }
        function closest(el, selector) {
            var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

            while (el) {
                if (matchesSelector.call(el, selector)) {
                    break;
                }
                el = el.parentElement;
            }
            return el;
        }

    </script>

// jq 版本
<div class="move-overlay">
        <div class="move">
            <div class="move-head">
                <div class="move-handle"></div>
            </div>
        </div>
    </div>
       
    <style type="text/css">
        .move-overlay{
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 899;
            background-color: rgba(0,0,0,0.5);
        }
        .move{
            width: 520px;
            height: 360px;            
            background-color: #fff;
            border: #ccc 2px solid;
            position: relative;
            margin: 80px auto 50px;
            /*left: 50%;
            top: 50%;*/
            /*margin-left: -18rem;
            margin-top: -12rem;*/
            /*transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%); 
            -webkit-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);*/
        }
        .move-handle{
            height: 36px;
            background-color: #0085d0;
            cursor: move;
        }
    </style>

    <script type="text/javascript">
        $(function() {

            $(document).on('mousedown','.move-handle',function(e){
                var e = e || window.event;
                var move = $(this).closest('.move')[0];

                /**
                 * 计算出鼠标的位置距离要移动的dom的左顶点的距离
                 * move.offsetLeft 获取js的便宜位置  而不是jq的偏移位置
                 */
                let mouseOffsetX = e.clientX - move.offsetLeft;
                let mouseOffsetY = e.clientY - move.offsetTop;

                /**
                 * 获取自身携带的marginLeft、marginTop值，通过+转化为数字
                 */
                // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
                const sty = move.currentStyle || window.getComputedStyle(move, null);
                console.log(sty);
                var marginL = +sty.marginLeft.replace(/\px/g, '');
                var marginT = +sty.marginTop.replace(/\px/g, '');

                
                // 鼠标移动
                $(document).on('mousemove', function(e){
                    var e = e || window.event;
                    let moveX = e.clientX - mouseOffsetX - marginL;
                    let moveY = e.clientY - mouseOffsetY - marginT;

                    //加上边界限制
                    $(move).css({
                        left: moveX,
                        top: moveY
                    });
                });
                // 鼠标放开
                $(document).on('mouseup', function(e){
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                });
                return false;
            });
            
        });
    </script>





