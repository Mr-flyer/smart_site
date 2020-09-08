<template>
  <div id="pieBigChart" class="line" ref="pieBigChart"></div>
</template>

<script>
export default {
  name: "Echart",
  props: {
    infoObj: Object
  },
  data() {
    return {
      pieBigChart: {}
    };
  },
  watch: {
    "infoObj.xdata": function() {
      // let _that = this;
      // if (this.infoObj.xdata.length > 0) {
      this.lineFun();
      //   window.addEventListener("resize", function() {
      //     _that.pieBigChart.resize();
      //   });
      // }
    }
  },
  mounted() {
    let _that = this;
    // if (this.infoObj.xdata.length > 0) {
    this.lineFun();
    //   window.addEventListener("resize", function() {
    //     _that.pieBigChart.resize();
    //   });
    // }
  },
  methods: {
    lineFun() {
      this.pieBigChart = this.$echarts.init(this.$refs.pieBigChart);
      // let series = this.infoObj.data.map((v, i) => ({
      //   name: this.infoObj.legend[i],
      //   data: this.infoObj.data[i],
      //   type: "line",
      //   smooth: true,
      //   symbol: "none", // 去掉图表中各个图区域的边框线拐点
      //   lineStyle: {
      //     normal: {
      //       color: this.infoObj.color[i]
      //     }
      //   },
      //   itemStyle: {
      //     color: this.infoObj.color[i]
      //   }
      // }));
      let option = {
        title: {
          text: "现场人员表",
          // text: this.infoObj.title,
          left: 0,
          textStyle: {
            fontSize: 15,
            color: "#00ffff"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        grid: {
          x: 0,
          y: 20,
          x2: 0,
          y2: 0, //距离下边的距离
          containLabel: true
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },

        color: ["#ff9566", "#276fff"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            center: ["50%", "50%"],
            data: [
              { value: 235, name: "视频广告" },
              { value: 400, name: "搜索引擎" }
            ].sort(function(a, b) {
              return a.value - b.value;
            }),
            // roseType: "radius",
            radius: ["20%", "40%"],
            label: {
              color: "rgba(255, 255, 255, 0.3)"
            },
            // labelLine: {
            //   lineStyle: {
            //     color: "rgba(255, 255, 255, 0.3)"
            //   },
            //   smooth: 0.2,
            //   length: 10,
            //   length2: 20
            // },
            // itemStyle: {
            //   // color: "#c23531",
            //   shadowBlur: 200,
            //   shadowColor: "rgba(0, 0, 0, 0.5)"
            // },

            // animationType: "scale",
            // animationEasing: "elasticOut",
            // animationDelay: function(idx) {
            //   return Math.random() * 200;
            // }
          }
        ]
      };
      this.pieBigChart.setOption(option);
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
