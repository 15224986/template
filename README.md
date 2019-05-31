# template

工作中常用的组件用过的一些好的插件

git add .
git commit -m "注释"
git push

有时候为什么不好使



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
// js 原生版本
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






