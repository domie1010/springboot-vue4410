<template>
<div class="content">
	<div class="text" :style='{"margin":"50px auto","fontSize":"24px","color":"rgb(51, 51, 51)","textAlign":"center","fontWeight":"bold"}'>欢迎使用 {{this.$project.projectName}}</div>
    <div class="cardView">
        <div class="cards" :style='{"margin":"0 0 20px 0","alignItems":"center","flexWrap":"wrap","justifyContent":"center","display":"flex"}'>
			<div :style='{"width":"30%","boxShadow":"0 1px 6px rgba(0,0,0,.3)","margin":"0 10px","borderRadius":"4px","display":"flex"}' v-if="isAuth('ketixinxi','首页总数')">
				<div :style='{"width":"120px","background":"#A5DDDD","height":"120px"}'></div>
				<div :style='{"width":"calc(100% - 120px)","alignItems":"center","flexDirection":"column","justifyContent":"center","display":"flex"}'>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"20px","color":"#333","fontWeight":"bold","height":"24px"}'>{{ketixinxiCount}}</div>
					<div :style='{"margin":"5px 0","lineHeight":"24px","fontSize":"16px","color":"#666","height":"24px"}'>课题信息总数</div>
				</div>
			</div>
        </div>
        <div style="display: flex;align-items: center;width: 100%;margin-bottom: 10px;">
            <el-card style="width: 33.3%;margin: 0 10px;" v-if="isAuth('ketixinxi','首页统计')">
                <div id="ketixinxiChart1" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: 33.3%;margin: 0 10px;" v-if="isAuth('ketixinxi','首页统计')">
                <div id="ketixinxiChart2" style="width:100%;height:400px;"></div>
            </el-card>
            <el-card style="width: 33.3%;margin: 0 10px;" v-if="isAuth('ketixinxi','首页统计')">
                <div id="ketixinxiChart3" style="width:100%;height:400px;"></div>
            </el-card>
        </div>
    </div>
</div>
</template>
<script>
//3
import router from '@/router/router-static'
import * as echarts from 'echarts'
export default {
	data() {
		return {
            ketixinxiCount: 0,
		};
	},
  mounted(){
    this.init();
    this.getketixinxiCount();
    this.ketixinxiChat1();
    this.ketixinxiChat2();
    this.ketixinxiChat3();
  },
  methods:{
    init(){
        if(this.$storage.get('Token')){
        this.$http({
            url: `${this.$storage.get('sessionTable')}/session`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code != 0) {
            router.push({ name: 'login' })
            }
        });
        }else{
            router.push({ name: 'login' })
        }
    },
    getketixinxiCount() {
        this.$http({
            url: `ketixinxi/count`,
            method: "get"
        }).then(({
            data
        }) => {
            if (data && data.code == 0) {
                this.ketixinxiCount = data.data
            }
        })
    },

    ketixinxiChat1() {
      this.$nextTick(()=>{

        var ketixinxiChart1 = echarts.init(document.getElementById("ketixinxiChart1"),'macarons');
        this.$http({
            url: "ketixinxi/group/nanyichengdu",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].nanyichengdu);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].nanyichengdu
                    })
                }
                var option = {};
                option = {
                        title: {
                            text: '难易统计',
                            left: 'center'
                        },
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c} ({d}%)'
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: pArray,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                };
                // 使用刚指定的配置项和数据显示图表。
                ketixinxiChart1.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    ketixinxiChart1.resize();
                };
            }
        });
      })
    },

    ketixinxiChat2() {
      this.$nextTick(()=>{
        // ketimingcheng ketimingcheng
        //  renshu

        var ketixinxiChart2 = echarts.init(document.getElementById("ketixinxiChart2"),'macarons');
        this.$http({
            url: `ketixinxi/value/ketimingcheng/renshu`,
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].ketimingcheng);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].ketimingcheng
                    })
                }
                var option = {};
                option = {
                    title: {
                        text: '课题人数',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'bar'
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                ketixinxiChart2.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    ketixinxiChart2.resize();
                };
            }
        });
      })
    },

    ketixinxiChat3() {
      this.$nextTick(()=>{

        var ketixinxiChart3 = echarts.init(document.getElementById("ketixinxiChart3"),'macarons');
        this.$http({
            url: "ketixinxi/group/ketifenlei",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].ketifenlei);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].ketifenlei
                    })
                }
                var option = {};
                option = {
                    title: {
                        text: '分类统计',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'bar'
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                ketixinxiChart3.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    ketixinxiChart3.resize();
                };
            }
        });
      })
    },




  }
};
</script>
<style lang="scss" scoped>
    .cardView {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        .cards {
            display: flex;
            align-items: center;
            width: 100%;
            margin-bottom: 10px;
            justify-content: center;
            .card {
                width: calc(25% - 20px);
                margin: 0 10px;
                /deep/.el-card__body{
                    padding: 0;
                }
            }
        }
    }
</style>
