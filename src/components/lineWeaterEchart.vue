<template>
  <div id="lineChart" class="line" ref="lineChart"></div>
</template>

<script>
export default {
  name: "Echart",
  props: {
    infoObj: Object,
    echartOption: Object
  },
  data() {
    return {
      lineChart: {}
    };
  },
  watch: {
    "infoObj.xdata": function() {
      let _that = this;
      if (this.infoObj.xdata.length > 0) {
        this.lineFun();
        window.addEventListener("resize", function() {
          _that.lineChart.resize();
        });
      }
    }
  },
  mounted() {
    let _that = this;
    if (this.infoObj.xdata.length > 0) {
      this.lineFun();
      window.addEventListener("resize", function() {
        _that.lineChart.resize();
      });
    }
  },
  methods: {
    lineFun() {
      this.lineChart = this.$echarts.init(this.$refs.lineChart);
      // console.log(this.infoObj);
      let series = this.infoObj.data.map((v, i) => ({
        name: this.infoObj.legend[i],
        data: this.infoObj.data[i],
        type: "line",
        smooth: true,
        // symbol: "none", // 去掉图表中各个图区域的边框线拐点
        // label: {
        //   normal: {
        //     show: true,
        //     position: "top",
        //     color: "#fff",
        //     formatter: ({ value }) => `${value}℃`
        //   }
        // },
        markLine: {
          symbol: ["none", "none"],
          label: { show: false },
          // data: [{ xAxis: 0 }]
          data: [
            [
              {
                name: "两个坐标之间的标线",
                coord: [0, 0]
              },
              {
                coord: [0, v[0].value]
              }
            ]
          ]
        },
        areaStyle: {
          color: this.infoObj.isHideareaStyle ? 'transparent' : new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#276fff"
            },
            {
              offset: 1,
              color: "transparent"
            }
          ])
        },
        lineStyle: {
          normal: {
            color: this.infoObj.color[i]
          }
        },
        itemStyle: {
          color: this.infoObj.color[i]
        }
      }));
      let option = {
        title: {
          text: this.infoObj.title,
          left: 0,
          textStyle: {
            fontSize: 15
          }
        },
        grid: {
          x: 0,
          y: 20,
          x2: 0,
          y2: 0, //距离下边的距离
          containLabel: true
        },
        // legend: {
        //   data: this.infoObj.legend
        // },
        xAxis: {
          data: this.infoObj.xdata,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          // splitNumber: 2,
          type: "value",
          splitLine: { // 刻度线
            // show: false
            lineStyle: {
              color: '#0e5e7c'
            }
          },
          // axisLabel: {show: false}, // 刻度文本
          axisTick: {show: false}, // 刻度点
          axisLine: { // y轴 
            show: false,
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series
      };
      Object.assign(option, this.echartOption || {})
      this.lineChart.setOption(option);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.line {
  width: 100%;
  height: 100%;
}
</style>
