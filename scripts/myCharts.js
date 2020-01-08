var myCharts = {
	/**
	 * 二次封装的highcharts的3D饼图
	 * @param  {'string'}   id   		调用插件的dom的ID
	 * @param  {[Array]}   	data  		插件需要的数据
	 * @param  {Function} 	fn   	 	修改options的属性，调用传过来的方法
	 */
	make3Dpie: function(id, data, fn) {
		var colors = [
			{
				a:'#7792d9',
				b:'#0c1a9b'
			},
			{
				a:'#5f21d1',
				b:'#7b10c6'
			},
			{
				a:'#0986bf',
				b:'#0d7a95'
			},
			{
				a:'#df9360',
				b:'#ff8a00'
			},
			{
				a:'#ffde43',
				b:'#e89e00'
			},
			{
				a:'#00f7e5',
				b:'#0088c9'
			},
			{
				a:'#fe76b4',
				b:'#a9004d'
			},
			{
				a:'#2e6cc8',
				b:'#2a5eab'
			},
			{
				a:'#c86f2e',
				b:'#e7721d'
			}
		];
		var options = {
            chart: {
                type: 'pie',
                backgroundColor:"rgba(0,0,0,0)",
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: false,
            tooltip: {
                pointFormat: '{point.y}'
            },
            colors:Highcharts.map(colors, function (color) {
                return {
                    radialGradient: { cx:0, cy: -0.8,r:2.3 },
                    stops: [
                        [0, color.a],
                        [1, color.b]
                    ]
                };
            }),
            plotOptions: {
                pie: {
                    fillColor:"#f00",
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '<span class="highcharts-plot-options">{point.name}</span><br/></span><span class="highcharts-plot-options">{point.percentage:.1f}%</span>'
                        // formatter: function() {
                        //     // return '<span style="color:#4dd3b9; text-shadow:5px 2px 6px rgba(0,0,0,0);">'+ this.point.name +'</span>';
                        //     // return '<span class="highcharts-plot-options">'+ this.point.name+ '</span>';
                        //     return '<span class="highcharts-plot-options">'+ this.point.name+ '</span><br/><span class="highcharts-plot-options">' + this.point.y +'</span>';
                        // }
                    }
                }
            },
           series: data

           /* [{
				type: 'pie',
				name: 'Browser share',
				data: [
					['Firefox', 45.0],
					['IE', 26.8],
					{
						name: 'Chrome',
						y: 12.8,
						sliced: true,
						selected: true
					},
					['Safari', 8.5],
					['Opera', 6.2],
					['Others', 0.7]
				]
			}]*/
        };
		if (fn!=undefined){
			fn(options)
		}
		// Highcharts.chart(id, options);
		$('#'+ id).highcharts(options); 
	},
	/**
	 * 二次封装的highcharts的画环形图
	 * @param  {'string'}   id   		调用插件的dom的ID
	 * @param  {[Array]}   	data  		插件需要的数据
	 * @param  {Function} 	fn   	 	修改options的属性，调用传过来的方法
	 * @param  {Function} 	callback 	事件的回调
	 */
	makeBar:function(dom, data, fn, callback){
		var myChart;
		if (typeof(dom)!="string"){
			myChart= echarts.init(dom[0]);
		}else{
			myChart = echarts.init(document.getElementById(dom));
		}
		
		var option={
			tooltip: {
		        trigger: 'axis',
		        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
		            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
			title: data.title,
			// title: {
			// text: '阶梯瀑布图',
			// subtext: 'From ExcelHome',
			// sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5'
			// }
			
		    legend: {
		        data: data.legend
		        // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'category',
		        data: data.xAxisData
		        // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
		    },
		    yAxis: {
		       type: 'value' 
		    },
		    color:['#1c747e','#ce5a01','#3197a5','#ce8d01'],
		    series: data.series

		    /*series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: [320, 302, 301, 334, 390, 330, 320]
                },
                {
                    name: '邮件营销',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: [150, 212, 201, 154, 190, 330, 410]
                },
                {
                    name: '搜索引擎',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'insideRight'
                    },
                    data: [820, 832, 901, 934, 1290, 1330, 1320]
                }
        	]*/
		};    		
		if (fn!=undefined)fn(option);

		myChart.clear();
		myChart.setOption(option);
		myChart.on('click', function (params) {
			if (callback!=undefined){
				console.log( callback );
				callback(params);
			}
		});			
		return myChart;
    },
}