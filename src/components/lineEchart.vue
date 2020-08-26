<template>
  <div id="lineChart" class="line" ref="lineChart"></div>
</template>

<script>
export default {
  name: "Echart",
  props: {
    infoObj: Object
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
      let series = this.infoObj.data.map((v, i) => ({
        name: this.infoObj.legend[i],
        data: this.infoObj.data[i],
        type: "line",
        smooth: true,
        symbol: "none", // 去掉图表中各个图区域的边框线拐点
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
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          itemSize: 16,
          itemGap: 30,
          right: 0,
          feature: {
            saveAsImage: {
              pixelRatio: 1
            }
          }
        },
        grid: {
          x: 0,
          y: 40,
          x2: 0,
          y2: 0, //距离下边的距离
          containLabel: true
        },
        legend: {
          data: this.infoObj.legend
        },
        xAxis: {
          data: this.infoObj.xdata,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          }
        },
        series,
      };
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
