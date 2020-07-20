<template>
  <el-container class="container">
    <el-header class="header_wrap">
      <div class="header_right">
        <div class="date-wrap">
          <span>星期二</span>
          <span>2020年7月14日</span>
        </div>
        <div class="time-wrap">10:26:34</div>
      </div>
      <div class="header_title">虹洋热电联产扩建项目</div>
      <div class="header_left">
        <div class="header_item">
          <img src="../assets/bigScreen/icon_location@2x.png" alt />连云港
        </div>
        <div class="header_item">
          <img src="../assets/bigScreen/icon_security@2x.png" alt />400天
        </div>
      </div>
    </el-header>
    <el-main class="main">
      <el-row class :gutter="0">
        <!-- 左 -->
        <el-col :span="6">
          <el-card class="panel-wrap summary_wrap" shadow="never">
            <template slot="header">
              <img class="icon_title" src="../assets/bigScreen/icon_data@2x.png" alt />
              项目概况
            </template>
            <div>
              <div class="sum-title txtgreen">
                <span>项目名称</span>
                连云港虹洋热电联产扩建连云港虹洋热电联产扩建连云港虹洋热电联产扩建连云港虹洋热电联产扩建
              </div>
              <div class="sum-title txtyellow">
                <span>项目地点</span>
                连云港虹洋热电联产扩建
              </div>
              <div class="sum-type">
                <div class="sum-type-item">
                  <span>合同造假</span>
                  10.00亿
                </div>
                <div class="sum-type-item">
                  <span>合同工期</span>
                  800天
                </div>
                <div class="sum-type-item">
                  <span>建筑面积</span>
                  30万平方米
                </div>
              </div>
              <div class="sum-desc">
                <table>
                  <tr>
                    <td>
                      <span class="sum-table-title">建筑单位</span>
                      <div>中国建筑有限公司</div>
                      <div>中国第一建筑有限公司</div>
                    </td>
                    <td class="lastCol">
                      <span class="sum-table-title">建筑单位</span>
                      <div>中国建筑有限公司</div>
                    </td>
                  </tr>
                  <tr class="lastrow">
                    <td>
                      <span class="sum-table-title">建筑单位</span>
                      <div>中国建筑有限公司</div>
                    </td>
                    <td class="lastCol">
                      <span class="sum-table-title">建筑单位</span>
                      <div>中国建筑有限公司</div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </el-card>
          <el-card class="panel-wrap personnel_wrap" shadow="never">
            <template slot="header">
              <img class="icon_title" src="../assets/bigScreen/icon_data@2x.png" alt />
              人员管理
            </template>
            <div class="personnel_echart-group">
              <!-- <div class="personnel_echart-item">
                <pieBigEchart />
              </div>-->
              <div class="personnel_echart-item">
                <barBigEchart />
              </div>
            </div>
            <div class="legend_wrap">
              <div class="legend_item" v-for="v of 11" :key="v">
                <i></i>第一建筑有限公司
              </div>
            </div>
          </el-card>
          <el-card class="panel-wrap mechanics-wrap" shadow="never">
            <template slot="header">
              <img class="icon_title" src="../assets/bigScreen/icon_data@2x.png" alt />
              机械管理
            </template>
            <el-table :data="tableData" :row-class-name="tableRowClassName" style="width: 100%">
              <el-table-column align="center" prop="name" label="设备名称" show-overflow-tooltip></el-table-column>
              <el-table-column align="center" prop="date" label="正常"></el-table-column>
              <el-table-column align="center" prop="date" label="维护"></el-table-column>
              <el-table-column align="center" prop="date" label="故障"></el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <!-- 中 -->
        <el-col :span="12" class="center_wrap">
          <el-card class="panel-wrap model-wrap" shadow="never">
            <template slot="header">
              <img class="icon_title" src="../assets/bigScreen/icon_data@2x.png" alt />
              项目模型
            </template>
            <div class="video_wrap"></div>
          </el-card>
          <el-card class="panel-wrap real_scene-wrap" shadow="never">
            <template slot="header">
              <img class="icon_title" src="../assets/bigScreen/icon_data@2x.png" alt />
              项目实景
            </template>
            <div class="video_wrap"></div>
          </el-card>
        </el-col>
        <!-- 右 -->
        <el-col :span="6">
          <el-card class="panel-wrap city_environment-wrap" shadow="never">
            <template slot="header">
              <img class="icon_title" src="../assets/bigScreen/icon_data@2x.png" alt />
              城市环境
            </template>
            <div class="weather_wrap">
              <!-- <img class="current_dot" src="../assets/bigScreen/current_dot@2x.png" alt=""> -->
              <div class="weather_today">
                <div class="weather_today-hd">
                  <span>今天</span>
                  <div>
                    当前城市
                    <span>连云港</span>
                  </div>
                </div>
                <div class="weather_today-bd">
                  <div class="weather_today-info">
                    <div class="weather_today-state">
                      <img src="../assets/weather/晴.png" alt />
                      <div>
                        <span>9-16C</span>
                        <p>东南风3-4级</p>
                      </div>
                    </div>
                    <div class="weather_index-wrap">
                      <div class="weather_index-item">
                        <img src="../assets/bigScreen/weather_index01@2x.png" alt />
                        <p>
                          <span>96</span>%
                        </p>
                      </div>
                      <div class="weather_index-item">
                        <img src="../assets/bigScreen/weather_index02@2x.png" alt />
                        <p>
                          <span>96</span>dB
                        </p>
                      </div>
                      <div class="weather_index-item">
                        <img src="../assets/bigScreen/weather_index03@2x.png" alt />
                        <p>
                          <span>999</span>hPa
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="echart-title">
                    <div class="icon_weatherglass">
                      <img src="../assets/bigScreen/icon_weatherglass@2x.png" />
                      温度变化表
                    </div>
                    <span>[8小时]</span>
                  </div>
                  <div class="weather_today-echart">
                    <lineWeaterEchart :infoObj="infoSourceTrend" />
                  </div>
                </div>
              </div>
              <div class="weather_future">
                <div class="weather_future-item">
                  <span class="weather_future-date txtcolor01">07/16</span>
                  <img class="weather_future-pic" src="../assets/weather/晴.png" />
                  <span class="weather_future-type">多云</span>
                  <p class="weather_future-temperature">9~16℃</p>
                </div>
                <div class="weather_future-item">
                  <span class="weather_future-date txtcolor01">07/17</span>
                  <img class="weather_future-pic" src="../assets/weather/晴.png" />
                  <span class="weather_future-type">小雨</span>
                  <p class="weather_future-temperature">9~16℃</p>
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="panel-wrap site_environment-wrap" shadow="never">
            <template slot="header">
              <img class="icon_title" src="../assets/bigScreen/icon_data@2x.png" alt />
              现场环境
            </template>
            <div class="security_wrap">
              <div class="security_current">
                <div
                  class="security_current-item"
                  v-for="(item, index) of 4"
                  :key="index"
                  :class="index || 'warning'"
                >
                  <div class="security_current-hd">
                    PM2.5
                    <img v-show="!index" src="../assets/bigScreen/icon_warning@2x.png" alt />
                  </div>
                  <div class="security_current-bd txtcolor01">
                    <span>54.1</span> ug/m
                  </div>
                </div>
              </div>
              <div class="security_echart-wrap">
                <div class="security_echart-item">
                  <div class="echart-title">
                    <div class="icon_weatherglass">
                      <img src="../assets/bigScreen/icon_weatherglass@2x.png" />
                      扬尘检测
                    </div>
                    <!-- <span>[8小时]</span> -->
                  </div>
                  <div class="dust-echart">
                    <lineWeaterEchart :infoObj="infoDustTrend" :echartOption="echartOptionDust" />
                  </div>
                </div>
                <div class="security_echart-item">
                  <div class="echart-title">
                    <div class="icon_weatherglass">
                      <img src="../assets/bigScreen/icon_weatherglass@2x.png" />
                      噪音检测
                    </div>
                    <!-- <span>[8小时]</span> -->
                  </div>
                  <div class="noise-echart">
                    <lineWeaterEchart :infoObj="infoNoiseTrend" :echartOption="echartOptionNoise" />
                  </div>
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="panel-wrap monitoring_wrap" shadow="never">
            <template slot="header">
              <img class="icon_title" src="../assets/bigScreen/icon_data@2x.png" alt />
              实时监控
            </template>
            <div class="monitoring_group">
              <div class="monitoring_item">
                <div class="monitoring_video"></div>
                <div class="monitoring_desc">
                  监控点1
                  <span>门口</span>
                </div>
              </div>
              <div class="monitoring_item">
                <div class="monitoring_video"></div>
                <div class="monitoring_desc">
                  监控点1
                  <span>门口</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <div class="navbar_wrap">
      <div class="navbar_inner">
        <div class="navbar_item">项目总览</div>
        <div class="navbar_item">安全管理</div>
        <div class="navbar_item">系统管理</div>
        <div class="navbar_item">三维物联</div>
        <div class="navbar_item">生产管理</div>
        <div class="navbar_item">三维文档</div>
      </div>
    </div>
  </el-container>
</template>

<script>
// @ is an alias to /src
import lineWeaterEchart from "@/components/lineWeaterEchart";
import barBigEchart from "@/components/barBigEchart";
import pieBigEchart from "@/components/pieBigEchart";
import echarts from "echarts";
const options = {
  infoSourceTrend: {
    title: "",
    isLoading: true,
    legend: ["TSP"],
    xdata: ["现在", "23点", "02点", "05点", "08点", "11点", "14点"],
    color: ["#13b4ff", "#5599FE", "red"],
    data: [
      [
        {
          name: "现在",
          value: 20,
          label: {
            show: true,
            position: "top",
            color: "#fff372"
          },
          itemStyle: {
            color: "red"
          }
        },
        {
          name: "现在",
          value: 32,
          label: {
            show: true,
            position: "top",
            color: "#fff",
            formatter: ({ value }) => `${value}℃`
          }
        },
        {
          name: "现在",
          value: 30,
          label: {
            show: true,
            position: "top",
            color: "#fff",
            formatter: ({ value }) => `${value}℃`
          }
        },
        {
          name: "现在",
          value: 34,
          label: {
            show: true,
            position: "top",
            color: "#fff",
            formatter: ({ value }) => `${value}℃`
          }
        },
        {
          name: "现在",
          value: 40,
          label: {
            show: true,
            position: "top",
            color: "#fff",
            formatter: ({ value }) => `${value}℃`
          }
        },
        {
          name: "现在",
          value: 30,
          label: {
            show: true,
            position: "top",
            color: "#fff",
            formatter: ({ value }) => `${value}℃`
          }
        },
        {
          name: "现在",
          value: 21,
          label: {
            show: true,
            position: "top",
            color: "#fff",
            formatter: ({ value }) => `${value}℃`
          }
        }
      ]
    ]
  },
  infoDustTrend: {
    title: "",
    isLoading: true,
    legend: ["TSP", "PM2.5", "PM10"],
    isHideareaStyle: true,
    xdata: ["10:00", "10:20", "10:40", "11:00", "11:20", "11:40"],
    color: ["#00ffff", "#ffc528", "#276fff"],
    data: [
      [32, 30, 34, 40, 30, 21],
      [20, 3, 14, 20, 10, 21],
      [12, 10, 24, 30, 40, 31]
    ]
  },
  infoNoiseTrend: {
    title: "",
    isLoading: true,
    legend: ["TSP"],
    xdata: ["10:00", "10:20", "10:40", "11:00", "11:20", "11:40"],
    color: ["#fff", "#ffc528", "#276fff"],
    data: [[12, 10, 24, 30, 40, 31]]
  },
  echartOptionDust: {
    legend: {
      data: ["TSP", "PM2.5", "PM10"],
      textStyle: {
        color: "#fff"
      }
    }
  },
  echartOptionNoise: {
    yAxis: {
      splitNumber: 2,
      type: "value",
      splitLine: {
        // 刻度线
        // show: false
        lineStyle: {
          color: "#0e5e7c"
        }
      },
      // axisLabel: {show: false}, // 刻度文本
      axisTick: { show: false }, // 刻度点
      axisLine: {
        // y轴
        show: false,
        lineStyle: {
          color: "#fff"
        }
      }
    }
  },
  tableData: [
    {
      date: "2",
      name: "王小虎王小虎王小虎王小虎王小虎王小虎王小虎"
    },
    {
      date: "2",
      name: "王小虎"
    },
    {
      date: "2",
      name: "王小虎"
    },
    {
      date: "2",
      name: "王小虎"
    }
  ],
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
export default {
  name: "Home",
  data: () => ({
    ...options,
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      }
      return "";
    }
  }),
  components: {
    lineWeaterEchart,
    barBigEchart,
    pieBigEchart
  }
};
</script>
<style lang="scss" scoped>
$bgColor: #040910;
$blue: #0064d4;
$cyan: #0e5e7c;
$navCyan: #0f7990;
$navYellow: #ffbf14;
$navBlue: #0fb8ff;
$colorHighlight01: #276fff;
$colorHighlight02: #13b4ff;
$colorHighlight03: #00ffff;
$txtColor1: #7bffb3;
$txtColor2: #ffde7b;

::v-deep {
  .el-main {
    padding: 0 15px;
  }
  .el-card {
    border: 1px solid $cyan;
    margin-bottom: 10px;
  }
  .el-table {
    color: #fff;
    background-color: transparent;
    &::before {
      display: none;
    }
    tr,
    th {
      border: none !important;
      background-color: transparent;
    }
    tr:hover > td {
      background-color: transparent !important;
    }
    td {
      border: none;
    }
  }
  .el-card__header {
    border: none;
    padding: 0 15px;
    display: flex;
    align-items: center;
    height: 45px;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    background: rgba($cyan, 0.1) url(../assets/bigScreen/icon-line@2x.png)
      no-repeat right 7px bottom;
    background-size: 60px;
  }
  .el-card__body {
    padding: 15px;
  }
}
.main {
  width: 100%;
  height: 100%;
}
.container {
  font-family: "Microsoft YaHei", 微软雅黑;
  background: $bgColor url(../assets/bigScreen/BJ@2x.png) no-repeat;
  background-size: 100% 100%;
  height: 100%;
  color: #fff;
  .txtcolor01 {
    color: $colorHighlight03;
  }
  .center_wrap {
    padding: 0 20px;
    box-sizing: border-box;
  }
}
.panel-wrap {
  background-color: transparent;

  .icon_title {
    width: 17px;
    margin-right: 8px;
  }
  .echart-title {
    height: 25px;
    padding-left: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: $colorHighlight02;
    background-image: linear-gradient(
      to right,
      rgba($colorHighlight01, 0.2),
      transparent
    );
    .icon_weatherglass {
      display: flex;
      align-items: center;
      height: 100%;
    }
    img {
      height: 70%;
      margin-right: 5px;
    }
  }
}

.header_wrap {
  background: url(../assets/bigScreen/topBj@2x.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 10px !important;
  height: 100px !important;
  font-size: 13px;
  color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
  .header_right {
    display: flex;
    align-items: flex-end;
  }
  .date-wrap {
    display: flex;
    flex-direction: column;
  }
  .time-wrap {
    font-size: 27px;
    padding-left: 20px;
  }
  .header_left {
    display: flex;
  }
  .header_item {
    display: flex;
    align-items: center;
    padding-left: 30px;
    img {
      width: 30px;
      margin-right: 10px;
    }
  }

  .header_title {
    font-size: 38px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
// 项目概况
.summary_wrap {
  .sum-title {
    font-size: 16px;
    color: #fff;
    font-weight: 700;
    padding-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &.txtgreen {
      span {
        color: $txtColor1;
        border-color: $txtColor1;
      }
    }
    &.txtyellow {
      span {
        color: $txtColor2;
        border-color: $txtColor2;
      }
    }
    span {
      display: inline-block;
      font-size: 16px;
      border: 1px solid #000;
      padding: 0px 4px;
      margin-right: 9px;
    }
  }
  .sum-type {
    padding-top: 13px;
    display: flex;
    justify-content: space-between;
  }
  .sum-type-item {
    color: #fff;
    display: flex;
    width: 135px;
    height: 35px;
    background: url(../assets/bigScreen/border01@2x.png) no-repeat;
    background-size: 100% 100%;
    background-color: rgba(0, 255, 255, 0.1);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 700;
    span {
      font-size: 14px;
      color: #00ffff;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  table {
    margin-top: 15px;
    width: 100%;
    border-collapse: collapse;
    border: 0px solid #999;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background-color: rgba(#051e33, 1);
    td {
      border-top: 0;
      border-right: 1px solid #999;
      border-bottom: 1px solid #999;
      border-left: 0;
      padding: 10px 15px;
    }
    tr.lastrow td {
      border-bottom: 0;
    }
    tr td.lastCol {
      border-right: 0;
    }
    .sum-table-title {
      color: $colorHighlight01;
    }
  }
}
// 机械管理
.mechanics-wrap {
  ::v-deep .el-table {
    .warning-row {
      background: rgba(#0064d4, 0.2);
    }
    th > .cell {
      color: #00ffff;
    }
    td {
      padding: 0;
    }
    tbody {
      .el-table_1_column_1 {
        color: #fff;
      }
      .el-table_1_column_2 {
        color: $txtColor1;
      }
      .el-table_1_column_3 {
        color: $navYellow;
      }
      .el-table_1_column_4 {
        color: #ff6b66;
      }
    }
    .cell {
      line-height: 25px;
    }
  }
  ::v-deep .el-card__body {
    padding-top: 0;
  }
}
// 城市环境
.city_environment-wrap {
  ::v-deep {
    .el-card__body {
      padding: 0;
    }
  }
  .weather_wrap {
    display: flex;
  }
  .weather_today {
    flex: 1;
  }
  .weather_today-hd {
    height: 35px;
    border-bottom: 1px solid rgb(14, 94, 124);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    span {
      color: $colorHighlight03;
    }
  }
  .weather_today-bd {
    padding: 0 14px 10px;
  }
  .weather_today-info {
    display: flex;
    align-items: center;
  }
  .weather_today-state {
    flex: 1;
    color: #fff;
    font-size: 16px;
    display: flex;
    align-items: center;
    img {
      width: 71px;
      height: 71px;
      margin-left: -10px;
    }
    span {
      font-size: 25px;
    }
  }
  .weather_index-wrap {
    flex: none;
    width: 180px;
    // margin-left: 11px;
    padding-left: 11px;
    height: 47px;
    border-left: 1px solid rgb(14, 94, 124);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .weather_index-item {
    font-size: 16px;
    color: #fff;
    display: flex;
    line-height: 1;
    flex-direction: column;
    align-items: center;
    span {
      font-size: 17px;
      color: $colorHighlight03;
    }
    img {
      width: 43px;
      margin-bottom: 10px;
      background-color: rgba($colorHighlight02, 0.2);
    }
  }
  .weather_future {
    flex: none;
    width: 88px;
    background-color: rgba($cyan, 0.1);
    border-left: 1px solid $cyan;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .weather_future-item {
    flex: 1;
    padding-top: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 14px;
    border-top: 1px solid rgb(14, 94, 124);
    &:first-of-type {
      border: none;
    }
  }
  .weather_future-date {
    font-size: 16px;
  }
  .weather_future-temperature {
    font-size: 17px;
  }
  .weather_today-echart {
    position: relative;
    width: 100%;
    height: 125px;
  }
  .weather_future-pic {
    margin-top: -10px;
    width: 60px;
    height: 60px;
  }
  .current_dot {
    width: 20px;
    height: 20px;
  }
}
// 现场环境
.site_environment-wrap {
  .security_wrap {
    display: flex;
  }
  .security_current {
    flex: none;
  }
  .security_echart-wrap {
    flex: 1;
    padding-left: 15px;
  }
  .security_current-item {
    width: 138px;
    height: 58px;
    background: url(../assets/bigScreen/border02@2x.png) no-repeat;
    background-size: 100% 100%;
    margin-bottom: 10px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .security_current-hd {
    flex: none;
    height: 26px;
    padding: 0 13px;
    font-size: 16px;
    color: $colorHighlight02;
    background-color: rgba($colorHighlight02, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 19px;
    }
  }
  .security_current-bd {
    flex: 1;
    padding: 0 13px;
    font-size: 14px;
    span {
      color: #fff;
      font-size: 25px;
    }
  }
  .security_current-item.warning {
    background-image: url(../assets/bigScreen/border03@2x.png);
    .security_current-hd,
    .security_current-bd {
      color: #ff1414;
    }
    .security_current-hd {
      background-color: rgba(#ff1414, 0.2);
    }
  }
  .security_echart-item {
    padding-bottom: 10px;
    &:last-of-type {
      padding-bottom: 0;
    }
  }
  .dust-echart,
  .noise-echart {
    width: 100%;
    position: relative;
  }
  .dust-echart {
    height: 128px;
  }
  .noise-echart {
    height: 75px;
  }
}
// 实时监控
.monitoring_wrap {
  .monitoring_group {
    display: flex;
    justify-content: space-between;
  }
  .monitoring_item {
    width: 48%;
  }
  .monitoring_video {
    height: 188px;
    background-color: aqua;
  }
  .monitoring_desc {
    font-size: 16px;
    color: #fff;
    position: relative;
    padding-left: 10px;
    &::before {
      content: "";
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #77ffcd;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-50%, 0);
    }
    span {
      color: $colorHighlight03;
    }
  }
}
// 人员管理
.personnel_wrap {
  ::v-deep {
    .el-card__body {
      padding: 0;
    }
  }
  .personnel_echart-group {
    display: flex;
    height: 249px;
    padding-top: 15px;
    box-sizing: border-box;
  }
  .personnel_echart-item {
    flex: 1;
    position: relative;
  }
  .legend_wrap {
    border-top: 1px solid $cyan;
    padding: 8px 15px;
    display: flex;
    flex-wrap: wrap;
  }
  .legend_item {
    flex: none;
    width: 33%;
    display: flex;
    align-items: center;
    color: #fff;
    i {
      display: inline-block;
      width: 8px;
      height: 10px;
      margin-right: 8px;
    }
    &:nth-of-type(1) i {
      background-color: #276fff;
    }
    &:nth-of-type(2) i {
      background-color: #975fe5;
    }
    &:nth-of-type(3) i {
      background-color: #58afff;
    }
    &:nth-of-type(4) i {
      background-color: #fbd437;
    }
    &:nth-of-type(5) i {
      background-color: #fba137;
    }
    &:nth-of-type(6) i {
      background-color: #e864f8;
    }
    &:nth-of-type(7) i {
      background-color: #36cbcb;
    }
    &:nth-of-type(8) i {
      background-color: #83cb36;
    }
    &:nth-of-type(9) i {
      background-color: #77ffcd;
    }
    &:nth-of-type(10) i {
      background-color: #fff372;
    }
    &:nth-of-type(11) i {
      background-color: #e4e7ea;
    }
  }
}

.model-wrap {
  .video_wrap {
    height: 435px;
    background-color: #e4e7ea;
  }
}
.real_scene-wrap {
  .video_wrap {
    height: 356px;
    background-color: #e4e7ea;
  }
}
// 页脚tabber
.navbar_wrap {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 1660px;
  display: flex;
  justify-content: center;
  background: url(../assets/bigScreen/nav_bg@2x.png) no-repeat bottom;
  background-size: contain;
  .navbar_inner {
    display: flex;
  }
  .navbar_item {
    width: 162px;
    height: 59px;
    font-size: 20px;
    background: url(../assets/bigScreen/navitem@2x.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;
    margin-left: -32px;
    &:first-of-type {
      width: 198px;
      margin-left: 0;
      background-image: url(../assets/bigScreen/navitem_active@2x.png);
    }
  }
}
</style>
