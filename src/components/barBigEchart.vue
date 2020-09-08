<template>
  <div id="barBigChart" class="line" ref="barBigChart"></div>
</template>

<script>
export default {
  name: "Echart",
  props: {
    infoPieObj: Object,
    infoBarObj: Object,
    infoCompanyName: Object
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
    "infoBarObj.data": function() {
      let _that = this;
      if (this.infoBarObj.data.length > 0) {
        this.lineFun();
        window.addEventListener("resize", function() {
          _that.lineChart.resize();
        });
      }
    }
  },
  mounted() {
    let _that = this;
    if (this.infoBarObj.data.length > 0) {
      this.lineFun();
      window.addEventListener("resize", function() {
        _that.lineChart.resize();
      });
    }
  },
  methods: {
    lineFun() {
      this.Yitems = this.Yitems.slice(0, this.infoBarObj.data[0].length)
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
      let { infoCompanyName } = this
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
            text: "人员分布统计",
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
        color: this.infoPieObj.color,
        grid: {
          x: 0,
          y: 20,
          x2: 20,
          y2: 0, //距离下边的距离
          left: "50%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          // formatter: '{a0}: {c0}<br />{a1}: {c1}',
          formatter(params) { 
            return `
              ${infoCompanyName[params[0].dataIndex]}<br />
              <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params[0].color.colorStops[0].color};"></span>  ${params[0].seriesName}：${params[0].data}人<br />
              <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params[1].color.colorStops[0].color};"></span>  ${params[1].seriesName}：${Math.abs(params[1].data)}人
            `
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
            inverse: true, // 倒叙
            data: this.Yitems,
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
            stack: "人员分布统计",
            label: {
              show: true,
              position: "right",
              color: "#fff",
              formatter: "{c}"
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
            data: this.infoBarObj.data[0]
          },
          {
            name: "差额",
            type: "bar",
            stack: "人员分布统计",
            label: {
              show: true,
              position: "left",
              color: "#fff",
              formatter: ({value}) => Math.abs(value)
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
            data: this.infoBarObj.data[1]
          },
          {
            // name: "访问来源",
            type: "pie",
            center: ["50%", "50%"],
            data: this.infoPieObj.data,
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
                    color: this.infoPieObj.color[1]
                  },
                  value: `现场人数\n${this.infoPieObj.data[1].value}人`
                },
                {
                  name: "某个屏幕坐标",
                  x: 200,
                  y: 60,
                  value: `差额\n${this.infoPieObj.data[0].value}人`
                },
                {
                  name: "某个屏幕坐标",
                  x: 120,
                  y: 220,
                  itemStyle: {
                    color: "transparent"
                  },
                  value: `总人数 ${this.infoPieObj.data.reduce((acc, cur) => acc + cur.value, 0)} 人`
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
