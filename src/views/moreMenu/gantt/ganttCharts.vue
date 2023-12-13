<!--
 * @Author: niewenjuan
 * @Date: 2023-07-03 13:53:33
 * @LastEditors: niewenjuan
 * @LastEditTime: 2023-08-08 16:45:28
 * @Description:
-->
<template>
  <div>
    <!-- <ul class="time-wrap">
      <li v-for="(item) in 24">
      <span v-if="item%4 == 0">
        {{ item - 1 + '时' }}
      </span>
      </li>
    </ul> -->
    <div class="highId" :id="highId" ref="highRef"></div>
  </div>
</template>
<script>
import Highcharts, {Pointer, reduce} from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Highcharts3D from "highcharts/highcharts-3d";
// import Highmaps from "highcharts/modules/map";
import loadExporting from "highcharts/modules/exporting.js";

import gantt from 'highcharts/modules/gantt'

gantt(Highcharts)

import moment from 'moment'

export default {
  props: ['categories', 'seriesData'],
  data() {
    return {
      highId: 'highId',
      colors: [],
      pointFormat: '',
      headerFormat: '',
    }
  },
  mounted() {
    // console.log(this.today);
    // this.colors = ['#E10F00', '#DD8802', '#D3D700', '#3057D8']
    this.colors = ['#E10F00', '#DD8802', '#D3D700', '#3057D8']
    this.initChart()
  },
  methods: {
    initChart() {
      if (this.chart) {
        this.chart.destroy();
      }
      // 初始化 Highcharts 图表
      Highcharts.setOptions({global: {useUTC: false}})
      this.chart = new Highcharts.ganttChart(this.highId, {
            accessibility: {
              enabled: false,
            },
            credits: {
              enabled: true,
            },
            exporting: {
              enabled: false,
            },
            global: {
              useUTC: false, // 不使用utc时间
            },
            chart: {
              zoomType: 'x',
              // type: 'xrange',
              type: 'gantt',
              // width: 800,
              height: 200,
              borderRadius: 0,
              backgroundColor: '#152137',
            },
            xAxis: [
              {
                labels: {
                  style: {
                    color: "#D8E6FF",
                  }
                },
                visible: true
              }
            ],
            yAxis: {
              // align: "center",
              uniqueNames: true,
              max: 10,
              // lineColor:'red',
              scrollbar: {
                enabled: true,
                // // enabled: true,
                showFull: false,
                height: 3,
                barBorderWidth: 0,
                buttonBackgroundColor: "#152137",
                buttonBorderWidth: 0,
                barBackgroundColor: "#47609B",
                trackBackgroundColor: "#152137",
                trackBorderWidth: 0
              }
            },
            tooltip: {
              formatter: function () {
                return `<div style="color:#374463;background:#374463;opacity: 0.9;">
              灾害类型：${this.point.name}
              <br />
            等级：${this.series.name}
            <br />${moment(this.point.x).format("YYYY-MM-DD HH").slice(5, 14)} ${moment(this.point.x2).format("YYYY-MM-DD HH").slice(5, 14)}
          </div>`;
              },
            },
            series: [
              {
                // name: '',
                data: [
                  {
                    name: '隐患点1',
                    id: 'new_product',
                    // owner: 'Peter'
                  }, {
                    name: '滑坡',
                    id: 'development',
                    parent: 'new_product',
                    x: new Date('2023-06-14 00:00').getTime(),
                    x2: new Date('2023-06-14 05:00').getTime(),
                    color: 'yellow'
                  },
                  {
                    name: '滑坡',
                    // id: 'development',
                    parent: 'new_product',
                    x: new Date('2023-06-14 06:00').getTime(),
                    x2: new Date('2023-06-14 09:00').getTime(),
                    color: 'red'
                  },
                  {
                    name: '泥石流',
                    id: 'beta',
                    parent: 'new_product',
                    x: new Date('2023-06-14 03:00').getTime(),
                    x2: new Date('2023-06-14 23:00').getTime(),
                    color: 'blue'
                  },
                  {
                    name: '雪灾',
                    id: 'finalize',
                    parent: 'new_product',
                    x: new Date('2023-06-14 02:00').getTime(),
                    x2: new Date('2023-06-14 05:00').getTime(),
                    color: 'blue'
                  },
                  {
                    name: '道路结冰',
                    id: 'finalize1',
                    parent: 'new_product',
                    x: new Date('2023-06-14 02:00').getTime(),
                    x2: new Date('2023-06-14 05:00').getTime(),
                    color: 'red'
                  },
                ],
              },
              {
                // name: '',
                data: [
                  {
                    name: '隐患点2',
                    id: 'new_product1',
                    // owner: 'Peter'
                  }, {
                    name: '滑坡',
                    id: 'development',
                    parent: 'new_product1',
                    x: new Date('2023-06-14 02:00').getTime(),
                    x2: new Date('2023-06-14 05:00').getTime(),
                    color: 'blue'
                  },
                  {
                    name: '泥石流',
                    id: 'beta',
                    parent: 'new_product1',
                    x: new Date('2023-06-14 03:00').getTime(),
                    x2: new Date('2023-06-14 11:00').getTime(),
                    color: 'orange'
                  },
                  {
                    name: '雪灾',
                    id: 'finalize',
                    parent: 'new_product1',
                    x: new Date('2023-06-14 02:00').getTime(),
                    x2: new Date('2023-06-14 05:00').getTime(),
                    color: 'yellow'
                  },
                  {
                    name: '道路结冰',
                    id: 'finalize1',
                    parent: 'new_product1',
                    x: new Date('2023-06-14 02:00').getTime(),
                    x2: new Date('2023-06-14 09:00').getTime(),
                    color: 'blue'
                  }
                ]
              },
              {
                // name: '',
                data: [
                  {
                    name: '隐患点3',
                    id: 'new_product2',
                    // owner: 'Peter'
                  }, {
                    name: '滑坡',
                    id: 'development',
                    parent: 'new_product2',
                    x: new Date('2023-06-14 02:00').getTime(),
                    x2: new Date('2023-06-14 05:00').getTime(),
                    color: 'blue'
                  },
                  {
                    name: '泥石流',
                    id: 'beta',
                    parent: 'new_product2',
                    x: new Date('2023-06-14 03:00').getTime(),
                    x2: new Date('2023-06-14 12:00').getTime(),
                    color: 'orange'
                  },
                  {
                    name: '雪灾',
                    id: 'finalize',
                    parent: 'new_product2',
                    x: new Date('2023-06-14 02:00').getTime(),
                    x2: new Date('2023-06-14 05:00').getTime(),
                    color: 'yellow'
                  },
                  {
                    name: '道路结冰',
                    id: 'finalize1',
                    parent: 'new_product2',
                    x: new Date('2023-06-14 02:00').getTime(),
                    x2: new Date('2023-06-14 23:00').getTime(),
                    color: 'blue'
                  }
                ]
              },
            ],
          }
      );
    },
  }
}
</script>

<style lang="scss" scoped>
.time-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 30%;
  padding-right: 10%;
  background: #152137;
  color: #D8E6FF;

  li {

    list-style: none;
  }
}
</style>
