/* 
 *  省市县三级联动
*/
;(function($){
    $.fn.mocAreaSelect = function(){
        return this.each(function(){
            var _this = this;
            $(_this).on('click', function() {
                $(this).parent().css('position', 'relative');
                var state = $(this).parent().children('.mocAreaSelect').length;
                if (state>0) {
                    _showfn(this);
                }else{
                    _init(this);
                }
            });
        });
        // 不是第一次，显示之前创建的
        function _showfn(self){
            $(self).parent().children('.mocAreaSelect').slideDown();
        }
        // 创建结构和定位
        function _init(self){
            // 外框
            var AreaSelect = $('<div class="mocAreaSelect"></div>');
            $(self).after(AreaSelect);
            $(self).next().slideDown();
            $("<div>", {
                'class' : "mocAreaSelect-close"
            }).on('click', closefn).appendTo(AreaSelect);
            // head
            var head = $("<ol>", {
                'class' : "mocAreaSelect-head"
            }).appendTo(AreaSelect);
            $("<li>", {
                'class' : "mocAreaSelect-head-list head-province active",
                'text' : "省"
            }).on('click', provincehead).appendTo(head);
            $("<li>", {
                'class' : "mocAreaSelect-head-list head-city hide",
                'text' : "市"
            }).on('click', cityhead).appendTo(head);
            $("<li>", {
                'class' : "mocAreaSelect-head-list head-county hide",
                'text' : "县"
            }).on('click', districthead).appendTo(head);
            // body
            var body = $("<div>", {
                'class' : "mocAreaSelect-body"
            }).appendTo(AreaSelect);
            var bodyprovince = $("<ul>", {
                'class' : "mocAreaSelect-ul body-province"
            }).appendTo(body);
            var bodycity = $("<ul>", {
                'class' : "mocAreaSelect-ul body-city hide"
            }).appendTo(body);
            var bodycounty = $("<ul>", {
                'class' : "mocAreaSelect-ul body-county hide"
            }).appendTo(body);
            for (var i=0; i<provinceAreaArr.length; i++) {
                $("<li>", {
                    'text' : provinceAreaArr[i],
                    'mocAreaSelect-data': i
                }).on('click', provincefn).appendTo(bodyprovince);      
            };
            allocationp(self,bodyprovince);
        };
        // 初始化复值
        function allocationp(self,bodyprovince){
            var valArr = $(self).val().split(" ");
            var cityDom = '';
            $(bodyprovince).children().each(function(index, el) {
                if ($(el).text() == valArr[0]) {
                    var a = $(el).attr('mocAreaSelect-data');
                    $(el).addClass('active').parent().attr('mocAreaSelect-order', a);
                    $(el).parents(".mocAreaSelect").find('.head-province').removeClass('active').text($(el).text());
                    $(el).parents(".mocAreaSelect").find('.head-city').removeClass('hide').addClass('active');
                    $(el).parents(".body-province").addClass('hide');
                    cityDom = $(el).parents(".mocAreaSelect").find('.body-city');
                    cityDom.removeClass('hide');
                    for (var j=0; j<cityAreaArr[a].length; j++) {
                        $("<li>", {
                            'text' : cityAreaArr[a][j],
                            'mocAreaSelect-data': j
                        }).on('click', cityfn).appendTo(cityDom);
                    };
                    allocationc(cityDom,valArr);
                }
            });
        };
        function allocationc(cityDom,valArr){
            var countyDom = '';
            cityDom.children().each(function(index, el) {
                if ($(el).text() == valArr[1]) {
                    var a =  $(el).parents(".mocAreaSelect").find('.body-province').attr('mocareaselect-order');
                    var b = $(el).attr('mocAreaSelect-data');
                    $(el).addClass('active').parent().attr('mocAreaSelect-order', b);
                    $(el).parents(".mocAreaSelect").find('.head-city').removeClass('active').text($(el).text());
                    $(el).parents(".mocAreaSelect").find('.head-county').removeClass('hide').addClass('active');
                    $(el).parents(".body-city").addClass('hide');
                    countyDom = $(el).parents(".mocAreaSelect").find('.body-county');
                    countyDom.removeClass('hide');
                    for (var k=0; k<districtAreaArr[a][b].length; k++) {
                        $("<li>", {
                            'text' : districtAreaArr[a][b][k],
                            'mocAreaSelect-data': k
                        }).on('click', districtfn).appendTo(countyDom); 
                    };
                    allocationx(countyDom,valArr)
                };
            });
        };
        function allocationx(countyDom,valArr){
            countyDom.children().each(function(index, county) {
                if ($(county).text() == valArr[2]) {
                    $(county).addClass('active');
                    $(county).parents(".mocAreaSelect").find('.head-county').text($(county).text());
                };
            });
        };
        // list的点击方法
        function provincefn(){
            var a =  $(this).attr('mocAreaSelect-data');
            var dom = $(this).parents(".mocAreaSelect-body").children('.body-city');
            var provincedom = $(this).parents(".mocAreaSelect").find('.head-province');
            var citydom = $(this).parents(".mocAreaSelect").find('.head-city')
            var countydom = $(this).parents(".mocAreaSelect").find('.head-county')
            if (countydom.is(':visible')) {
                countydom.text('县').addClass('hide');
            }else{
                countydom.text('县');
            }
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parent().attr('mocAreaSelect-order', a).addClass('hide');
            provincedom.removeClass('active');
            citydom.text('市').removeClass('hide').addClass('active')
            dom.removeClass('hide').children().remove();
            for (var j=0; j<cityAreaArr[a].length; j++) {
                $("<li>", {
                    'text' : cityAreaArr[a][j],
                    'mocAreaSelect-data': j
                }).on('click', cityfn).appendTo(dom);
            };
            $(this).parents(".mocAreaSelect").prev().val($(this).text());
            provincedom.text($(this).text());
        };
        function cityfn(){
            var a =  $(this).parents(".mocAreaSelect").find('.body-province').attr('mocareaselect-order');
            var b =  $(this).attr('mocAreaSelect-data');
            var dom = $(this).parents(".mocAreaSelect-body").children('.body-county');
            var headdom = $(this).parents(".mocAreaSelect").find('.head-city');
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parent().attr('mocAreaSelect-order', b).addClass('hide');
            headdom.next().text('县');
            headdom.removeClass('active').next().removeClass('hide').addClass('active');
            dom.removeClass('hide').children().remove();
            for (var k=0; k<districtAreaArr[a][b].length; k++) {
                $("<li>", {
                    'text' : districtAreaArr[a][b][k],
                    'mocAreaSelect-data': k
                }).on('click', districtfn).appendTo(dom);   
            };
            headdom.text($(this).text());
            var provinceTxt = $(this).parents('.mocAreaSelect').find('.head-province').text();
            var nowTxt = provinceTxt+" "+ $(this).text();
            $(this).parents(".mocAreaSelect").prev().val(nowTxt);   
        };
        function districtfn(){
            var headdom = $(this).parents(".mocAreaSelect").find('.head-county');
            $(this).addClass('active').siblings().removeClass('active');
            headdom.text($(this).text());
            var provinceTxt = $(this).parents('.mocAreaSelect').find('.head-province').text();
            var cityTxt = $(this).parents('.mocAreaSelect').find('.head-city').text();
            var nowTxt = provinceTxt+" "+cityTxt+" "+$(this).text();
            $(this).parents(".mocAreaSelect").prev().val(nowTxt);
            $(this).parents(".mocAreaSelect").slideUp();
        };
        // head-list的点击方法
        function provincehead(){
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parents(".mocAreaSelect").find('.body-province').removeClass('hide').siblings().addClass('hide');
        }
        function cityhead(){
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parents(".mocAreaSelect").find('.body-city').removeClass('hide').siblings().addClass('hide');
        }
        function districthead(){
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parents(".mocAreaSelect").find('.body-county').removeClass('hide').siblings().addClass('hide');
        }
        // 关闭当前框
        function closefn(){
            $(this).parents(".mocAreaSelect").slideUp();
        }
    };
})(jQuery);