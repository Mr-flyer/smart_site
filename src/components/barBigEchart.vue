<template>
  <div id="barBigChart" class="line" ref="barBigChart"></div>
</template>

<script>
export default {
  name: "Echart",
  props: {
    infoObj: Object
  },
  data() {
    return {
      lineChart: {},
      Yitems: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
      Ycolors: [
        "#276fff",
        "#975fe5",
        "#58afff",
        "#fbd437",
        "#fba137",
        "#e864f8",
        "#36cbcb",
        "#83cb36",
        "#77ffcd",
        "#fff372",
        "#e4e7ea"
      ]
    };
  },
  watch: {
    // "infoObj.xdata": function() {
    //   let _that = this;
    //   if (this.infoObj.xdata.length > 0) {
    //     this.lineFun();
    //     window.addEventListener("resize", function() {
    //       _that.lineChart.resize();
    //     });
    //   }
    // }
  },
  mounted() {
    let _that = this;
    this.lineFun();
    // if (this.infoObj.xdata.length > 0) {
    //   this.lineFun();
    //   window.addEventListener("resize", function() {
    //     _that.lineChart.resize();
    //   });
    // }
  },
  methods: {
    lineFun() {
      this.barBigChart = this.$echarts.init(this.$refs.barBigChart);
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
        title: [
          {
            text: "现场人员表",
            left: "20%",
            textAlign: "right",
            textStyle: {
              fontSize: 15,
              color: "#00ffff"
            }
          },
          {
            text: "人员分布及差额表",
            left: "75%",
            textAlign: "right",
            textStyle: {
              fontSize: 15,
              color: "#00ffff"
            }
          }
        ],
        // legend: {
        //   bottom: 20
        // },
        color: ["#ff9566", "#276fff"],
        grid: {
          x: 0,
          y: 20,
          x2: 10,
          y2: 0, //距离下边的距离
          left: "50%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: [
          {
            show: false,
            type: "value",
            splitLine: {
              // 刻度线
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            axisTick: {
              show: false
            },
            inverse: true,
            data: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
            axisLabel: {
              formatter: function(value) {
                return "{" + value + "| }{value|}";
              },
              margin: 20,
              rich: this._setRich()
            }
          }
        ],
        series: [
          {
            name: "现场人数",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "right",
              color: "#fff"
            },

            barCategoryGap: "20%",
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#276fff" },
                { offset: 1, color: "#14fde6" }
              ])
            },
            showBackground: true,
            backgroundStyle: {
              color: "rgba(14, 94, 124, 0.2)"
            },
            data: [320, 302, 341, 374, 390, 450, 420, 390, 450, 420, 420]
          },
          {
            name: "差额",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "left",
              color: "#fff"
            },

            barCategoryGap: "40%",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(14, 94, 124, 0.2)"
            },
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#ff6766" },
                { offset: 1, color: "#ff9566" }
              ])
            },
            data: [
              -120,
              -132,
              -101,
              -134,
              -190,
              -230,
              -210,
              -190,
              -230,
              -210,
              -210
            ]
          },
          {
            // name: "访问来源",
            type: "pie",
            center: ["50%", "50%"],
            data: [
              { value: 235, name: "差额" },
              { value: 400, name: "现场人数" }
            ].sort(function(a, b) {
              return a.value - b.value;
            }),
            left: 10,
            right: 10,
            // roseType: "radius",
            center: ["25%", "50%"],
            radius: ["30%", "60%"],
            markPoint: {
              symbol: "rect",
              symbolSize: [50, 2],
              label: {
                color: "#fff",
                offset: [0, -12]
              },
              data: [
                {
                  name: "某个屏幕坐标",
                  x: 50,
                  y: 50,
                  itemStyle: {
                    color: "aqua"
                  },
                  value: "现场人数\n2172人"
                },
                {
                  name: "某个屏幕坐标",
                  x: 200,
                  y: 60,
                  value: "差额\n10人"
                },
                {
                  name: "某个屏幕坐标",
                  x: 120,
                  y: 220,
                  itemStyle: {
                    color: "transparent"
                  },
                  value: "应到人数2182人"
                },
              ]
            },
            label: {
              show: false
              // formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              // backgroundColor: '#eee',
              // borderColor: '#aaa',
              // borderWidth: 1,
              // borderRadius: 4,
              // // shadowBlur:3,
              // // shadowOffsetX: 2,
              // // shadowOffsetY: 2,
              // // shadowColor: '#999',
              // // padding: [0, 7],
              // rich: {
              //     a: {
              //         color: '#999',
              //         lineHeight: 22,
              //         align: 'center'
              //     },
              //     // abg: {
              //     //     backgroundColor: '#333',
              //     //     width: '100%',
              //     //     align: 'right',
              //     //     height: 22,
              //     //     borderRadius: [4, 4, 0, 0]
              //     // },
              //     hr: {
              //         borderColor: '#aaa',
              //         width: '100%',
              //         borderWidth: 0.5,
              //         height: 0
              //     },
              //     b: {
              //         fontSize: 16,
              //         lineHeight: 33
              //     },
              //     per: {
              //         color: '#eee',
              //         backgroundColor: '#334455',
              //         padding: [2, 4],
              //         borderRadius: 2
              //     }
              // }
            },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: "16",
            //     fontWeight: "bold"
            //   }
            // },
            labelLine: {
              show: false,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)"
              },
              smooth: 0.2,
              length: 0,
              length2: 0
            }
            // itemStyle: {
            //   show: false,
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
        // series
      };
      this.barBigChart.setOption(option);
    },
    _setRich() {
      let arr = this.Yitems;
      let obj = {};
      arr.forEach((el, eq) => {
        obj[el] = {
          width: 8,
          height: 10,
          align: "center",
          backgroundColor: this.Ycolors[eq]
        };
      });
      // console.log("obj", obj);
      return obj;
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
