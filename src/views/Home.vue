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
      <el-row class :gutter="10">
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
                <span>项目名称</span>
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
          <el-card class="panel-wrap mechanics-wrap" shadow="never">
            <template slot="header">
              <img class="icon_title" src="../assets/bigScreen/icon_data@2x.png" alt />
              人员管理
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
        <el-col :span="12">
          <div class="grid-content bg-purple">2</div>
        </el-col>
        <!-- 右 -->
        <el-col :span="6">
          <el-card class="panel-wrap city_environment-wrap" shadow="never">
            <template slot="header">
              <img class="icon_title" src="../assets/bigScreen/icon_data@2x.png" alt />
              城市环境
            </template>
            <div class="weather_wrap">
              <img class="current_dot" src="../assets/bigScreen/current_dot@2x.png" alt="">
              <div class="weather_today">
                <div class="weather_today-hd">
                  <span>今天</span>
                  <div>当前城市 <span>连云港</span></div>
                </div>
                <div class="weather_today-bd">
                  <div class="weather_today-info"></div>
                  <p>
                    <span>温度变化表</span>
                    <span>[8小时]</span>
                  </p>
                  <div class="weather_today-echart">
                    <lineEchart :infoObj="infoSourceTrend" />
                  </div>
                </div>
              </div>
              <div class="weather_future">
                <div class="weather_future-item">
                  <span class="weather_future-date">07/16</span>
                  <img class="weather_future-pic" src alt />
                  <span class="weather_future-type">多云</span>
                  <p class="weather_future-temperature">9~16℃</p>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import lineEchart from "@/components/lineWeaterEchart";
console.log(document.querySelector('.current_dot'));
const infoSourceTrend = {
  title: "扬尘监测TSP+PM2.5+PM10",
  isLoading: true,
  legend: ["TSP"],
  xdata: ["现在", "23点", "02点", "05点", "08点", "11点", "14点"],
  color: ["#13b4ff", "#5599FE", "red"],
  data: [
    [
      {
        name: "现在",
        value: 120,
        label: {
          color: "#fff372"
        },
        itemStyle: {
          color:"red"
          // color: {
          //   image: document.querySelector('.current_dot'), // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
          //   repeat: "no-repeat" // 是否平铺，可以是 'repeat-x', 'repeat-y', 'no-repeat'
          // }
        }
      },
      132,
      101,
      134,
      90,
      230,
      210
    ]
  ]
};
const tableData = [
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
];
export default {
  name: "Home",
  data: () => ({
    infoSourceTrend,
    tableData,
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      }
      return "";
    }
  }),
  components: {
    lineEchart
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
  .el-card {
    border: 1px solid $cyan;
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
      no-repeat right bottom;
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
  // background-color: $bgColor;
  background: $bgColor url(../assets/bigScreen/BJ@2x.png) no-repeat;
  background-size: 100% 100%;
  height: 100%;
  color: #fff;
}
.panel-wrap {
  background-color: transparent;

  .icon_title {
    width: 17px;
    margin-right: 8px;
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
      font-size: 16px;
      border: 1px solid #000;
      padding: 2px 4px;
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
    height: 70px;
    border-bottom: 1px solid $colorHighlight03;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
  }
  .weather_future {
    flex: none;
    width: 88px;
    background-color: rgba($cyan, 0.1);
    border-left: 1px solid $cyan;
    box-sizing: border-box;
  }
  .weather_future-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .weather_today-echart {
    position: relative;
    width: 100%;
    height: 147px;
  }
  .current_dot {
    width: 20px;
    height: 20px;
  }
}
</style>
