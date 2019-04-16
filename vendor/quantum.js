$(function() {

    
    /**
     * canvasId 是 canvas的id
     * canvasBoxId是存放canvas的盒子的id
     */
    var canvasBoxId = 'page-help',
        canvasId    = "myCanvas";

    /**
     * 判断当前页面是否需要使用这个背景，根据页面内是否含有ID来确定的
     */
    if ( $("#"+canvasBoxId).length > 0 ) {

        /**
         * 随机生成背景图
         */
        var letterArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        var str = letterArray[ Math.floor(Math.random() * 26) ];
        $("#"+canvasBoxId).css({
            "background-image": 'url(files/body-bg/'+ str +'.jpg)'
        });


        /*
         * 创建 canvas 元素
         */
        var canvas_el = document.createElement('canvas');
        /*
         * 设置canvas的大小
         */
        canvas_el.style.width = "100%";
        canvas_el.style.height = "100%";
        canvas_el.style.position = "fixed";
        canvas_el.style.left = "0";
        canvas_el.style.top = "0";
        canvas_el.style.opacity = "0.5";



        canvas_el.id = canvasId;
        /**
         * 添加 canvas 到结构中
         */
        var canvas = document.getElementById(canvasBoxId).appendChild(canvas_el);
        /**
         * 寻找画布
         */
        var canvas = document.getElementById(canvasId),
            ctx = canvas.getContext('2d')
        // 给canvas一个 “相对” 宽和高
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.lineWidth = .3;
        ctx.strokeStyle = (new Color(150)).style;
        var mousePosition = {
            x: 30 * canvas.width / 100,
            y: 30 * canvas.height / 100
        };
        var dots = {
            nb: 750, // 点的个数
            distance: 50, // 连线的密度
            d_radius: 100, // 连线的半径
            Size: 1.6, // 大小
            array: [] // 存放的数组
        };

        function colorValue(min) {
            return Math.floor(Math.random() * 255 + min);
        }
        function createColorStyle(r, g, b) {
            return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
        }
        function mixComponents(comp1, weight1, comp2, weight2) {
            return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
        }
        function averageColorStyles(dot1, dot2) {
            var color1 = dot1.color,
                color2 = dot2.color;

            var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
                g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
                b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
            return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
        }
        function Color(min) {
            min = min || 0;
            this.r = colorValue(min);
            this.g = colorValue(min);
            this.b = colorValue(min);
            this.style = createColorStyle(this.r, this.g, this.b);
        }
        function Dot() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            this.vx = -.5 + Math.random();
            this.vy = -.5 + Math.random();
            /* 半径 */
            this.radius = Math.random() * dots.Size;

            this.color = new Color();
            // console.log(this);
        }
        Dot.prototype = {
            draw: function() {
                ctx.beginPath();
                ctx.fillStyle = this.color.style;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
            }
        }
        function createDots() {
            for (i = 0; i < dots.nb; i++) {
                dots.array.push(new Dot());
            }
        }
        function moveDots() {
            for (i = 0; i < dots.nb; i++) {

                var dot = dots.array[i];

                if (dot.y < 0 || dot.y > canvas.height) {
                    dot.vx = dot.vx;
                    dot.vy = -dot.vy;
                } else if (dot.x < 0 || dot.x > canvas.width) {
                    dot.vx = -dot.vx;
                    dot.vy = dot.vy;
                }
                dot.x += dot.vx;
                dot.y += dot.vy;
            }
        }
        function connectDots() {
            for (i = 0; i < dots.nb; i++) {
                for (j = 0; j < dots.nb; j++) {
                    i_dot = dots.array[i];
                    j_dot = dots.array[j];

                    if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > -dots.distance && (i_dot.y - j_dot.y) > -dots.distance) {
                        if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > -dots.d_radius && (i_dot.y - mousePosition.y) > -dots.d_radius) {
                            ctx.beginPath();
                            ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                            ctx.moveTo(i_dot.x, i_dot.y);
                            ctx.lineTo(j_dot.x, j_dot.y);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            }
        }
        function drawDots() {
            for (i = 0; i < dots.nb; i++) {
                var dot = dots.array[i];
                dot.draw();
            }
        }
        function animateDots() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            moveDots();
            connectDots();
            drawDots();

            requestAnimationFrame(animateDots);
        }
        // 鼠标进入和离开事件
        $(document).on('mousemove', '#'+canvasId, function(e) {
            mousePosition.x = e.pageX - $(window).scrollLeft();
            mousePosition.y = e.pageY - $(window).scrollTop();
        });
        $(document).on('mouseleave', '#'+canvasId, function(e) {
            mousePosition.x = canvas.width / 2;
            mousePosition.y = canvas.height / 2;
        });
        // 绘画
        createDots();
        requestAnimationFrame(animateDots);
    }

});