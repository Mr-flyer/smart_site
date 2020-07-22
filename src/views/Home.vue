<template>
  <el-container class="container">
    <el-header class="header_wrap">
      <div class="header_right">
        <div class="date-wrap">
          <span>{{weekTxt}}</span>
          <span>{{dateTime}}</span>
        </div>
        <div class="time-wrap">{{timeInfo}}</div>
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
                {{survey.name}}
              </div>
              <div class="sum-title txtyellow">
                <span>项目地点</span>
                {{survey.addr}}
              </div>
              <div class="sum-type">
                <div class="sum-type-item">
                  <span>合同造价</span>
                  {{survey.costTxt}}
                </div>
                <div class="sum-type-item">
                  <span>合同工期</span>
                  {{survey.period || 0}}天
                </div>
                <div class="sum-type-item">
                  <span>建筑面积</span>
                  {{survey.area || 0}}平方米
                </div>
              </div>
              <div class="sum-desc">
                <table>
                  <tr>
                    <td>
                      <span class="sum-table-title">建设单位</span>
                      <div v-for="(v ,i) of survey.build_company" :key="i" v-html="v"></div>
                    </td>
                    <td class="lastCol">
                      <span class="sum-table-title">设计单位</span>
                      <div v-for="(v ,i) of survey.design_company" :key="i" v-html="v"></div>
                    </td>
                  </tr>
                  <tr class="lastrow">
                    <td>
                      <span class="sum-table-title">监理单位</span>
                      <div v-for="(v ,i) of survey.supervisor_company" :key="i" v-html="v"></div>
                    </td>
                    <td class="lastCol">
                      <span class="sum-table-title">施工单位</span>
                      <div v-for="(v ,i) of survey.construction_company" :key="i" v-html="v"></div>
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
            <div class="video_wrap">
                <!-- controls -->
              <video
                id="video01"
                autoplay
                muted
                :src="video01"
                @ended="videoend"
                @error="videoerr"
              />
            </div>
          </el-card>
          <el-card class="panel-wrap real_scene-wrap" shadow="never">
            <template slot="header">
              <img class="icon_title" src="../assets/bigScreen/icon_data@2x.png" alt />
              项目实景
            </template>
            <div class="video_wrap">
              <video
                id="video02"
                autoplay
                loop
                muted
                :src="video02"
                @ended="videoend02"
                @error="videoerr02"
              ></video>
            </div>
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
                    <span>{{weatherData.city}}</span>
                  </div>
                </div>
                <div class="weather_today-bd">
                  <div class="weather_today-info">
                    <div class="weather_today-state">
                      <img :src="todayWeatherData.wea_day_img" alt />
                      <div>
                        <span>{{todayWeatherData.tem2}}-{{todayWeatherData.tem1}}℃</span>
                        <p>{{todayWeatherData.win[0]}}{{todayWeatherData.win_speed}}</p>
                      </div>
                    </div>
                    <div class="weather_index-wrap">
                      <div class="weather_index-item">
                        <img src="../assets/bigScreen/weather_index01@2x.png" alt />
                        <p>
                          <span>{{todayWeatherData.humidity}}</span>
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
                          <span>{{todayWeatherData.pressure}}</span>hPa
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
                  <span class="weather_future-date txtcolor01">{{tomorrowWeatherData.date}}</span>
                  <img class="weather_future-pic" :src="tomorrowWeatherData.wea_day_img" />
                  <span class="weather_future-type">{{tomorrowWeatherData.wea}}</span>
                  <p
                    class="weather_future-temperature"
                  >{{tomorrowWeatherData.tem2}}~{{tomorrowWeatherData.tem1}}℃</p>
                </div>
                <div class="weather_future-item">
                  <span class="weather_future-date txtcolor01">{{threeWeatherData.date}}</span>
                  <img class="weather_future-pic" :src="threeWeatherData.wea_day_img" />
                  <span class="weather_future-type">{{threeWeatherData.wea}}</span>
                  <p
                    class="weather_future-temperature"
                  >{{threeWeatherData.tem2}}~{{threeWeatherData.tem1}}℃</p>
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
                  v-for="(item, index) of securityList"
                  :key="index"
                  :class="index || 'warning'"
                >
                  <div class="security_current-hd">
                    {{item.name}}
                    <img v-show="!index" src="../assets/bigScreen/icon_warning@2x.png" alt />
                  </div>
                  <div class="security_current-bd txtcolor01">
                    <span>54.1</span> {{item.company}}
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
        <router-link class="navbar_item" :to="{name: '', redirect: '/home'}">项目总览</router-link>
        <router-link
          class="navbar_item"
          :to="{name: 'VideoMonitoring', redirect: '/Security/VideoMonitoring'}"
        >安全管理</router-link>
        <router-link
          class="navbar_item"
          :to="{name: 'HomeSet', redirect: '/System/HomeSet'}"
        >系统管理</router-link>
        <router-link
          class="navbar_item"
          :to="{name: 'UAVCruise', redirect: '/IOT/UAVCruise'}"
        >三维物联</router-link>
        <router-link
          class="navbar_item"
          :to="{name: 'HomeSet', redirect: '/System/HomeSet'}"
        >生产管理</router-link>
        <router-link
          class="navbar_item"
          :to="{name: 'HomeSet', redirect: '/System/HomeSet'}"
        >三维文档</router-link>
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
import dayjs from "dayjs";
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
      name: "吊塔"
    },
    {
      date: "2",
      name: "升降机"
    },
    {
      date: "2",
      name: "卸料台"
    },
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
  ],
  weatherData: {
    cityid: "101191001",
    city: "连云港",
    cityEn: "lianyungang",
    country: "中国",
    countryEn: "China",
    update_time: "2020-07-22 12:52:26",
    data: [
      {
        day: "22日（星期三）",
        date: "2020-07-22",
        week: "星期三",
        wea: "雨",
        wea_img: "yu",
        wea_day: "大雨",
        wea_day_img: "yu",
        wea_night: "大雨",
        wea_night_img: "yu",
        tem: "23",
        tem1: "26",
        tem2: "22",
        humidity: "100%",
        visibility: "6.89km",
        pressure: "1006",
        win: ["东南风", "西南风"],
        win_speed: "3-4级",
        win_meter: "小于12km/h",
        sunrise: "05:05",
        sunset: "19:13",
        air: "21",
        air_level: "优",
        air_tips: "空气很好，可以外出活动，呼吸新鲜空气，拥抱大自然！",
        alarm: {
          alarm_type: "暴雨",
          alarm_level: "黄色",
          alarm_content:
            "连云港市气象台2020年07月22日08时48分发布暴雨黄色预警信号：预计今天白天到夜里我市大部分地区将出现6小时50毫米以上的强降水，并可能伴有雷电、8-10级雷暴大风和短时强降水等强对流天气，请注意防范。（预警信息来源：国家预警信息发布中心）"
        },
        hours: [
          {
            hours: "12时",
            wea: "中雨",
            wea_img: "yu",
            tem: "23",
            win: "东南风",
            win_speed: "&lt;3级"
          },
          {
            hours: "13时",
            wea: "中雨",
            wea_img: "yu",
            tem: "24",
            win: "东南风",
            win_speed: "&lt;3级"
          },
          {
            hours: "14时",
            wea: "中雨",
            wea_img: "yu",
            tem: "24",
            win: "东南风",
            win_speed: "3-4级"
          },
          {
            hours: "15时",
            wea: "小雨",
            wea_img: "yu",
            tem: "24",
            win: "东南风",
            win_speed: "3-4级"
          },
          {
            hours: "16时",
            wea: "小雨",
            wea_img: "yu",
            tem: "24",
            win: "东南风",
            win_speed: "&lt;3级"
          },
          {
            hours: "17时",
            wea: "小雨",
            wea_img: "yu",
            tem: "24",
            win: "东南风",
            win_speed: "&lt;3级"
          },
          {
            hours: "18时",
            wea: "中雨",
            wea_img: "yu",
            tem: "24",
            win: "东南风",
            win_speed: "3-4级"
          },
          {
            hours: "19时",
            wea: "中雨",
            wea_img: "yu",
            tem: "24",
            win: "东南风",
            win_speed: "3-4级"
          },
          {
            hours: "20时",
            wea: "中雨",
            wea_img: "yu",
            tem: "24",
            win: "东南风",
            win_speed: "3-4级"
          },
          {
            hours: "21时",
            wea: "大雨",
            wea_img: "yu",
            tem: "24",
            win: "南风",
            win_speed: "3-4级"
          },
          {
            hours: "22时",
            wea: "大雨",
            wea_img: "yu",
            tem: "25",
            win: "南风",
            win_speed: "3-4级"
          },
          {
            hours: "23时",
            wea: "大雨",
            wea_img: "yu",
            tem: "25",
            win: "西南风",
            win_speed: "3-4级"
          },
          {
            hours: "00时",
            wea: "小雨",
            wea_img: "yu",
            tem: "25",
            win: "西南风",
            win_speed: "3-4级"
          },
          {
            hours: "01时",
            wea: "小雨",
            wea_img: "yu",
            tem: "24",
            win: "西南风",
            win_speed: "3-4级"
          },
          {
            hours: "02时",
            wea: "小雨",
            wea_img: "yu",
            tem: "24",
            win: "西南风",
            win_speed: "3-4级"
          },
          {
            hours: "03时",
            wea: "小雨",
            wea_img: "yu",
            tem: "24",
            win: "西南风",
            win_speed: "3-4级"
          },
          {
            hours: "04时",
            wea: "小雨",
            wea_img: "yu",
            tem: "23",
            win: "西南风",
            win_speed: "&lt;3级"
          },
          {
            hours: "05时",
            wea: "小雨",
            wea_img: "yu",
            tem: "23",
            win: "西南风",
            win_speed: "&lt;3级"
          },
          {
            hours: "06时",
            wea: "阴",
            wea_img: "yin",
            tem: "23",
            win: "西南风",
            win_speed: "&lt;3级"
          },
          {
            hours: "07时",
            wea: "阴",
            wea_img: "yin",
            tem: "23",
            win: "西南风",
            win_speed: "&lt;3级"
          }
        ],
        index: [
          {
            title: "紫外线指数",
            level: "最弱",
            desc: "辐射弱，涂擦SPF8-12防晒护肤品。"
          },
          {
            title: "减肥指数",
            level: "一颗星",
            desc: "风雨相伴，坚持室内运动吧。"
          },
          {
            title: "血糖指数",
            level: "不易波动",
            desc: "天气条件不易引起血糖波动。"
          },
          {
            title: "穿衣指数",
            level: "舒适",
            desc: "建议穿长袖衬衫单裤等服装。"
          },
          {
            title: "洗车指数",
            level: "不宜",
            desc: "有雨，雨水和泥水会弄脏爱车。"
          },
          {
            title: "空气污染扩散指数",
            level: "优",
            desc: "气象条件非常有利于空气污染物扩散。"
          }
        ]
      },
      {
        day: "23日（星期四）",
        date: "2020-07-23",
        week: "星期四",
        wea: "阴转多云",
        wea_img: "yun",
        wea_day: "阴",
        wea_day_img: "yin",
        wea_night: "多云",
        wea_night_img: "yun",
        tem: "29",
        tem1: "29",
        tem2: "22",
        humidity: "",
        visibility: "",
        pressure: "",
        win: ["西北风", "西北风"],
        win_speed: "3-4级",
        win_meter: "",
        sunrise: "05:06",
        sunset: "19:12",
        air: "",
        air_level: "",
        air_tips: "",
        alarm: {
          alarm_type: "",
          alarm_level: "",
          alarm_content: ""
        },
        hours: [
          {
            hours: "08时",
            wea: "阴",
            wea_img: "yin",
            tem: "23",
            win: "西南风",
            win_speed: "&lt;3级"
          },
          {
            hours: "09时",
            wea: "多云",
            wea_img: "yun",
            tem: "24",
            win: "西风",
            win_speed: "3-4级"
          },
          {
            hours: "10时",
            wea: "多云",
            wea_img: "yun",
            tem: "25",
            win: "西风",
            win_speed: "3-4级"
          },
          {
            hours: "11时",
            wea: "多云",
            wea_img: "yun",
            tem: "26",
            win: "西北风",
            win_speed: "3-4级"
          },
          {
            hours: "12时",
            wea: "多云",
            wea_img: "yun",
            tem: "26",
            win: "西北风",
            win_speed: "3-4级"
          },
          {
            hours: "13时",
            wea: "多云",
            wea_img: "yun",
            tem: "27",
            win: "西北风",
            win_speed: "3-4级"
          },
          {
            hours: "14时",
            wea: "多云",
            wea_img: "yun",
            tem: "27",
            win: "西北风",
            win_speed: "3-4级"
          },
          {
            hours: "15时",
            wea: "晴",
            wea_img: "qing",
            tem: "27",
            win: "西北风",
            win_speed: "3-4级"
          },
          {
            hours: "16时",
            wea: "晴",
            wea_img: "qing",
            tem: "27",
            win: "西北风",
            win_speed: "3-4级"
          },
          {
            hours: "17时",
            wea: "晴",
            wea_img: "qing",
            tem: "27",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "18时",
            wea: "多云",
            wea_img: "yun",
            tem: "26",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "19时",
            wea: "多云",
            wea_img: "yun",
            tem: "25",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "20时",
            wea: "阴",
            wea_img: "yin",
            tem: "25",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "21时",
            wea: "多云",
            wea_img: "yun",
            tem: "24",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "22时",
            wea: "多云",
            wea_img: "yun",
            tem: "24",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "23时",
            wea: "多云",
            wea_img: "yun",
            tem: "23",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "00时",
            wea: "多云",
            wea_img: "yun",
            tem: "23",
            win: "西北风",
            win_speed: "3-4级"
          },
          {
            hours: "01时",
            wea: "多云",
            wea_img: "yun",
            tem: "23",
            win: "西北风",
            win_speed: "3-4级"
          },
          {
            hours: "02时",
            wea: "多云",
            wea_img: "yun",
            tem: "23",
            win: "西北风",
            win_speed: "3-4级"
          },
          {
            hours: "03时",
            wea: "多云",
            wea_img: "yun",
            tem: "23",
            win: "西北风",
            win_speed: "3-4级"
          },
          {
            hours: "04时",
            wea: "多云",
            wea_img: "yun",
            tem: "22",
            win: "西北风",
            win_speed: "3-4级"
          },
          {
            hours: "05时",
            wea: "多云",
            wea_img: "yun",
            tem: "22",
            win: "西北风",
            win_speed: "3-4级"
          },
          {
            hours: "06时",
            wea: "多云",
            wea_img: "yun",
            tem: "23",
            win: "西北风",
            win_speed: "3-4级"
          },
          {
            hours: "07时",
            wea: "多云",
            wea_img: "yun",
            tem: "24",
            win: "西北风",
            win_speed: "3-4级"
          }
        ],
        index: [
          {
            title: "紫外线指数",
            level: "最弱",
            desc: "辐射弱，涂擦SPF8-12防晒护肤品。"
          },
          {
            title: "减肥指数",
            level: "一颗星",
            desc: "夏天悄然到，肉已无处藏。风虽有点大，室内可健身。"
          },
          {
            title: "血糖指数",
            level: "易波动",
            desc: "气温多变，血糖易波动，请注意监测。"
          },
          {
            title: "穿衣指数",
            level: "热",
            desc: "适合穿T恤、短薄外套等夏季服装。"
          },
          {
            title: "洗车指数",
            level: "不宜",
            desc: "积水较多，车辆易溅上泥水。"
          },
          {
            title: "空气污染扩散指数",
            level: "良",
            desc: "气象条件有利于空气污染物扩散。"
          }
        ]
      },
      {
        day: "24日（星期五）",
        date: "2020-07-24",
        week: "星期五",
        wea: "多云转晴",
        wea_img: "yun",
        wea_day: "多云",
        wea_day_img: "yun",
        wea_night: "晴",
        wea_night_img: "qing",
        tem: "29",
        tem1: "29",
        tem2: "20",
        humidity: "",
        visibility: "",
        pressure: "",
        win: ["北风", "西北风"],
        win_speed: "3-4级转&lt;3级",
        win_meter: "",
        sunrise: "05:07",
        sunset: "19:12",
        air: "",
        air_level: "",
        air_tips: "",
        alarm: {
          alarm_type: "",
          alarm_level: "",
          alarm_content: ""
        },
        hours: [
          {
            hours: "08时",
            wea: "晴",
            wea_img: "qing",
            tem: "24",
            win: "西北风",
            win_speed: "3-4级"
          },
          {
            hours: "09时",
            wea: "多云",
            wea_img: "yun",
            tem: "25",
            win: "西北风",
            win_speed: "3-4级"
          },
          {
            hours: "10时",
            wea: "多云",
            wea_img: "yun",
            tem: "25",
            win: "西北风",
            win_speed: "3-4级"
          },
          {
            hours: "11时",
            wea: "多云",
            wea_img: "yun",
            tem: "26",
            win: "北风",
            win_speed: "3-4级"
          },
          {
            hours: "12时",
            wea: "多云",
            wea_img: "yun",
            tem: "26",
            win: "北风",
            win_speed: "3-4级"
          },
          {
            hours: "13时",
            wea: "多云",
            wea_img: "yun",
            tem: "27",
            win: "北风",
            win_speed: "3-4级"
          },
          {
            hours: "14时",
            wea: "晴",
            wea_img: "qing",
            tem: "28",
            win: "北风",
            win_speed: "3-4级"
          },
          {
            hours: "15时",
            wea: "晴",
            wea_img: "qing",
            tem: "27",
            win: "北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "16时",
            wea: "晴",
            wea_img: "qing",
            tem: "27",
            win: "北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "17时",
            wea: "晴",
            wea_img: "qing",
            tem: "27",
            win: "北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "18时",
            wea: "晴",
            wea_img: "qing",
            tem: "26",
            win: "北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "19时",
            wea: "晴",
            wea_img: "qing",
            tem: "25",
            win: "北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "20时",
            wea: "晴",
            wea_img: "qing",
            tem: "24",
            win: "北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "21时",
            wea: "晴",
            wea_img: "qing",
            tem: "23",
            win: "北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "22时",
            wea: "晴",
            wea_img: "qing",
            tem: "23",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "23时",
            wea: "晴",
            wea_img: "qing",
            tem: "23",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "00时",
            wea: "晴",
            wea_img: "qing",
            tem: "22",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "01时",
            wea: "晴",
            wea_img: "qing",
            tem: "22",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "02时",
            wea: "晴",
            wea_img: "qing",
            tem: "22",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "03时",
            wea: "晴",
            wea_img: "qing",
            tem: "22",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "04时",
            wea: "晴",
            wea_img: "qing",
            tem: "22",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "05时",
            wea: "晴",
            wea_img: "qing",
            tem: "21",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "06时",
            wea: "晴",
            wea_img: "qing",
            tem: "22",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "07时",
            wea: "晴",
            wea_img: "qing",
            tem: "23",
            win: "西北风",
            win_speed: "&lt;3级"
          }
        ],
        index: [
          {
            title: "紫外线指数",
            level: "中等",
            desc: "涂擦SPF大于15、PA+防晒护肤品。"
          },
          {
            title: "减肥指数",
            level: "一颗星",
            desc: "夏天悄然到，肉已无处藏。风虽有点大，室内可健身。"
          },
          {
            title: "血糖指数",
            level: "不易波动",
            desc: "天气条件好，血糖不易波动，可适时进行户外锻炼。"
          },
          {
            title: "穿衣指数",
            level: "热",
            desc: "适合穿T恤、短薄外套等夏季服装。"
          },
          {
            title: "洗车指数",
            level: "较不宜",
            desc: "风力较大，洗车后会蒙上灰尘。"
          },
          {
            title: "空气污染扩散指数",
            level: "良",
            desc: "气象条件有利于空气污染物扩散。"
          }
        ]
      },
      {
        day: "25日（星期六）",
        date: "2020-07-25",
        week: "星期六",
        wea: "晴转多云",
        wea_img: "yun",
        wea_day: "晴",
        wea_day_img: "qing",
        wea_night: "多云",
        wea_night_img: "yun",
        tem: "29",
        tem1: "29",
        tem2: "22",
        humidity: "",
        visibility: "",
        pressure: "",
        win: ["东北风", "东北风"],
        win_speed: "&lt;3级",
        win_meter: "",
        sunrise: "05:07",
        sunset: "19:11",
        air: "",
        air_level: "",
        air_tips: "",
        alarm: {
          alarm_type: "",
          alarm_level: "",
          alarm_content: ""
        },
        hours: [
          {
            hours: "08时",
            wea: "晴",
            wea_img: "qing",
            tem: "24",
            win: "西北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "11时",
            wea: "晴",
            wea_img: "qing",
            tem: "28",
            win: "东风",
            win_speed: "&lt;3级"
          },
          {
            hours: "14时",
            wea: "晴",
            wea_img: "qing",
            tem: "29",
            win: "东北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "17时",
            wea: "晴",
            wea_img: "qing",
            tem: "28",
            win: "东北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "20时",
            wea: "晴",
            wea_img: "qing",
            tem: "24",
            win: "东北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "23时",
            wea: "多云",
            wea_img: "yun",
            tem: "24",
            win: "东风",
            win_speed: "&lt;3级"
          },
          {
            hours: "02时",
            wea: "多云",
            wea_img: "yun",
            tem: "23",
            win: "东北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "05时",
            wea: "多云",
            wea_img: "yun",
            tem: "23",
            win: "南风",
            win_speed: "&lt;3级"
          }
        ],
        index: [
          {
            title: "紫外线指数",
            level: "很强",
            desc: "涂擦SPF20以上，PA++护肤品，避强光。"
          },
          {
            title: "减肥指数",
            level: "三颗星",
            desc: "夏天悄然到，肉已无处藏。天气较舒适，快去运动吧。"
          },
          {
            title: "血糖指数",
            level: "不易波动",
            desc: "天气条件好，血糖不易波动，可适时进行户外锻炼。"
          },
          {
            title: "穿衣指数",
            level: "热",
            desc: "适合穿T恤、短薄外套等夏季服装。"
          },
          {
            title: "洗车指数",
            level: "较适宜",
            desc: "无雨且风力较小，易保持清洁度。"
          },
          {
            title: "空气污染扩散指数",
            level: "中",
            desc: "易感人群应适当减少室外活动。"
          }
        ]
      },
      {
        day: "26日（星期日）",
        date: "2020-07-26",
        week: "星期日",
        wea: "中雨转大雨",
        wea_img: "yu",
        wea_day: "中雨",
        wea_day_img: "yu",
        wea_night: "大雨",
        wea_night_img: "yu",
        tem: "26",
        tem1: "26",
        tem2: "23",
        humidity: "",
        visibility: "",
        pressure: "",
        win: ["东北风", "东风"],
        win_speed: "&lt;3级",
        win_meter: "",
        sunrise: "05:08",
        sunset: "19:10",
        air: "",
        air_level: "",
        air_tips: "",
        alarm: {
          alarm_type: "",
          alarm_level: "",
          alarm_content: ""
        },
        hours: [
          {
            hours: "08时",
            wea: "多云",
            wea_img: "yun",
            tem: "25",
            win: "东北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "11时",
            wea: "阴",
            wea_img: "yin",
            tem: "26",
            win: "南风",
            win_speed: "&lt;3级"
          },
          {
            hours: "14时",
            wea: "阴",
            wea_img: "yin",
            tem: "26",
            win: "东北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "17时",
            wea: "大雨",
            wea_img: "yu",
            tem: "25",
            win: "东风",
            win_speed: "&lt;3级"
          },
          {
            hours: "20时",
            wea: "中雨",
            wea_img: "yu",
            tem: "24",
            win: "东北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "23时",
            wea: "大雨",
            wea_img: "yu",
            tem: "24",
            win: "东南风",
            win_speed: "&lt;3级"
          },
          {
            hours: "02时",
            wea: "阴",
            wea_img: "yin",
            tem: "23",
            win: "东风",
            win_speed: "&lt;3级"
          },
          {
            hours: "05时",
            wea: "阴",
            wea_img: "yin",
            tem: "23",
            win: "东南风",
            win_speed: "&lt;3级"
          }
        ],
        index: [
          {
            title: "紫外线指数",
            level: "最弱",
            desc: "辐射弱，涂擦SPF8-12防晒护肤品。"
          },
          {
            title: "减肥指数",
            level: "一颗星",
            desc: "夏天肉难藏，雨天坚持室内运动吧。"
          },
          {
            title: "血糖指数",
            level: "不易波动",
            desc: "天气条件不易引起血糖波动。"
          },
          {
            title: "穿衣指数",
            level: "舒适",
            desc: "建议穿长袖衬衫单裤等服装。"
          },
          {
            title: "洗车指数",
            level: "不宜",
            desc: "有雨，雨水和泥水会弄脏爱车。"
          },
          {
            title: "空气污染扩散指数",
            level: "优",
            desc: "气象条件非常有利于空气污染物扩散。"
          }
        ]
      },
      {
        day: "27日（星期一）",
        date: "2020-07-27",
        week: "星期一",
        wea: "多云",
        wea_img: "yun",
        wea_day: "多云",
        wea_day_img: "yun",
        wea_night: "多云",
        wea_night_img: "yun",
        tem: "27",
        tem1: "27",
        tem2: "20",
        humidity: "",
        visibility: "",
        pressure: "",
        win: ["东南风", "东北风"],
        win_speed: "&lt;3级",
        win_meter: "",
        sunrise: "05:09",
        sunset: "19:10",
        air: "",
        air_level: "",
        air_tips: "",
        alarm: {
          alarm_type: "",
          alarm_level: "",
          alarm_content: ""
        },
        hours: [
          {
            hours: "08时",
            wea: "阴",
            wea_img: "yin",
            tem: "24",
            win: "东风",
            win_speed: "&lt;3级"
          },
          {
            hours: "11时",
            wea: "阴",
            wea_img: "yin",
            tem: "25",
            win: "东风",
            win_speed: "&lt;3级"
          },
          {
            hours: "14时",
            wea: "阴",
            wea_img: "yin",
            tem: "25",
            win: "东南风",
            win_speed: "&lt;3级"
          },
          {
            hours: "17时",
            wea: "阴",
            wea_img: "yin",
            tem: "24",
            win: "东南风",
            win_speed: "&lt;3级"
          },
          {
            hours: "20时",
            wea: "阴",
            wea_img: "yin",
            tem: "23",
            win: "东南风",
            win_speed: "&lt;3级"
          },
          {
            hours: "23时",
            wea: "阴",
            wea_img: "yin",
            tem: "22",
            win: "东南风",
            win_speed: "&lt;3级"
          },
          {
            hours: "02时",
            wea: "多云",
            wea_img: "yun",
            tem: "22",
            win: "东北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "05时",
            wea: "多云",
            wea_img: "yun",
            tem: "22",
            win: "东北风",
            win_speed: "&lt;3级"
          }
        ],
        index: [
          {
            title: "紫外线指数",
            level: "最弱",
            desc: "辐射弱，涂擦SPF8-12防晒护肤品。"
          },
          {
            title: "减肥指数",
            level: "五颗星",
            desc: "夏天悄然到，肉已无处藏。天气较舒适，快去运动吧。"
          },
          {
            title: "血糖指数",
            level: "不易波动",
            desc: "天气条件好，血糖不易波动，可适时进行户外锻炼。"
          },
          {
            title: "穿衣指数",
            level: "热",
            desc: "适合穿T恤、短薄外套等夏季服装。"
          },
          {
            title: "洗车指数",
            level: "不宜",
            desc: "积水较多，车辆易溅上泥水。"
          },
          {
            title: "空气污染扩散指数",
            level: "中",
            desc: "易感人群应适当减少室外活动。"
          }
        ]
      },
      {
        day: "28日（星期二）",
        date: "2020-07-28",
        week: "星期二",
        wea: "阴转多云",
        wea_img: "yun",
        wea_day: "阴",
        wea_day_img: "yin",
        wea_night: "多云",
        wea_night_img: "yun",
        tem: "25",
        tem1: "25",
        tem2: "22",
        humidity: "",
        visibility: "",
        pressure: "",
        win: ["东风", "东风"],
        win_speed: "&lt;3级",
        win_meter: "",
        sunrise: "05:09",
        sunset: "19:09",
        air: "",
        air_level: "",
        air_tips: "",
        alarm: {
          alarm_type: "",
          alarm_level: "",
          alarm_content: ""
        },
        hours: [
          {
            hours: "08时",
            wea: "多云",
            wea_img: "yun",
            tem: "23",
            win: "东北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "11时",
            wea: "阴",
            wea_img: "yin",
            tem: "24",
            win: "东北风",
            win_speed: "&lt;3级"
          },
          {
            hours: "14时",
            wea: "阴",
            wea_img: "yin",
            tem: "24",
            win: "东风",
            win_speed: "&lt;3级"
          },
          {
            hours: "17时",
            wea: "阴",
            wea_img: "yin",
            tem: "24",
            win: "东风",
            win_speed: "&lt;3级"
          },
          {
            hours: "20时",
            wea: "阴",
            wea_img: "yin",
            tem: "24",
            win: "东风",
            win_speed: "&lt;3级"
          },
          {
            hours: "23时",
            wea: "多云",
            wea_img: "yun",
            tem: "23",
            win: "东风",
            win_speed: "&lt;3级"
          },
          {
            hours: "02时",
            wea: "多云",
            wea_img: "yun",
            tem: "23",
            win: "东风",
            win_speed: "&lt;3级"
          },
          {
            hours: "05时",
            wea: "多云",
            wea_img: "yun",
            tem: "23",
            win: "东风",
            win_speed: "&lt;3级"
          }
        ],
        index: [
          {
            title: "紫外线指数",
            level: "最弱",
            desc: "辐射弱，涂擦SPF8-12防晒护肤品。"
          },
          {
            title: "减肥指数",
            level: "五颗星",
            desc: "夏天悄然到，肉已无处藏。天气较舒适，快去运动吧。"
          },
          {
            title: "血糖指数",
            level: "不易波动",
            desc: "天气条件好，血糖不易波动，可适时进行户外锻炼。"
          },
          {
            title: "穿衣指数",
            level: "舒适",
            desc: "建议穿长袖衬衫单裤等服装。"
          },
          {
            title: "洗车指数",
            level: "较适宜",
            desc: "无雨且风力较小，易保持清洁度。"
          },
          {
            title: "空气污染扩散指数",
            level: "较差",
            desc: "气象条件较不利于空气污染物扩散。。"
          }
        ]
      }
    ],
    aqi: {
      air: "23",
      air_level: "优",
      air_tips: "空气很好，可以外出活动，呼吸新鲜空气，拥抱大自然！",
      pm25: "12",
      pm25_desc: "优",
      pm10: "17",
      pm10_desc: "优",
      o3: "72",
      o3_desc: "优",
      no2: "20",
      no2_desc: "优",
      so2: "5",
      so2_desc: "优",
      kouzhao: "无需戴口罩",
      waichu: "适宜外出",
      kaichuang: "适宜开窗",
      jinghuaqi: "关闭净化器",
      cityid: "101191001",
      city: "连云港",
      cityEn: "lianyungang",
      country: "中国",
      countryEn: "China"
    }
  },
  securityList: [
    {name: 'TPS', company: "mg/m³"},
    {name: 'PM2.5', company: "mg/m³"},
    {name: 'PM10', company: "mg/m³"},
    {name: '噪声', company: "dB"},
  ],
};
export default {
  name: "Home",
  data: () => ({
    ...options,
    survey: {},
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      }
      return "";
    },
    week: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六',],
    video01: "",
    video02: "",
    // time: this.week[dayjs().day()] ,
    weekTxt: '',
    dateTime: '',
    timeInfo: '',
    video01Index: 0,
    video02Index: 0,
    todayWeatherData: [],
    tomorrowWeatherData: [],
    threeWeatherData: [],
    weather: ["xue", "lei", "shachen", "wu", "bingbao", "yun", "yu", "yin", "qing"]
  }),
  computed: {},
  // watch: {
  //   time() {
  //     return Date.now()
  //   }
  // },
  created() {
    this.weekTxt = this.week[dayjs().day()]
    this.dateTime = dayjs().format('YYYY年MM月DD日')
    this.timeInfo = dayjs().format('HH:mm')
    this.$http.get(`api/v1/index/tianqi`).then(({data: weatherAllData}) => {
      this.weatherCity = weatherAllData.city
      let { data } = weatherAllData
      console.log(data);
      this.todayWeatherData = data[0];
      if (this.weather.includes(this.todayWeatherData.wea_day_img)) {
        this.todayWeatherData.wea_day_img = require(`../assets/weather/${data[0].wea_day_img}.png`);
      } else {
        this.todayWeatherData.wea_day_img = require(`../assets/weather/empty.png`);
      }
      this.infoSourceTrend.xdata = data[0].hours.slice(0, 8).map(v => v.hours);
      this.infoSourceTrend.data = [
        data[0].hours.slice(0, 8).map(v => ({
          value: v.tem,
          label: {
            show: true,
            position: "top",
            color: "#fff",
            formatter: ({ value }) => `${value}℃`
          }
        }))
      ];
      this.tomorrowWeatherData = data[1];
      this.tomorrowWeatherData.date = dayjs(data[1].date).format("MM/DD");
      if (this.weather.includes(this.tomorrowWeatherData.wea_day_img)) {
        this.tomorrowWeatherData.wea_day_img = require(`../assets/weather/${data[1].wea_day_img}.png`);
      } else {
        this.tomorrowWeatherData.wea_day_img = require(`../assets/weather/empty.png`);
      }
      this.threeWeatherData = data[2];
      this.threeWeatherData.date = dayjs(data[2].date).format("MM/DD");
      if (this.weather.includes(this.threeWeatherData.wea_day_img)) {
        this.threeWeatherData.wea_day_img = require(`../assets/weather/${data[2].wea_day_img}.png`);
      } else {
        this.threeWeatherData.wea_day_img = require(`../assets/weather/empty.png`);
      }
    });
    this.$http.get(`api/v1/system/project`).then(({ data }) => {
      data.costTxt = this.format_price(data.cost);
      this.survey = data;
    });
    this.$http.get(`api/v1/system/video`).then(({ data }) => {
      this.video01Arr = data.filter(v => !v.area);
      this.video02Arr = data.filter(v => v.area);
      this.video01 = this.video01Arr[this.video01Index].video;
      this.video02 = this.video02Arr[this.video02Index].video;
      // console.log(data.filter(v => !v.area)[1]);
    });
  },
  methods: {
    format_price(val) {
      if (val) {
        if (parseInt(val) >= 0 && parseInt(val) < 10000) {
          let result = (parseInt(val * 100) / 100).toFixed(2);
          return this.cutZero(result) + "元";
        } else if (parseInt(val) >= 10000 && parseInt(val) < 100000000) {
          let result = (val / 10000).toFixed(4);
          result = result.substring(0, result.toString().length - 2);
          return this.cutZero(result) + "万";
        } else {
          let result = (val / 100000000).toFixed(8);
          result = result.substring(0, result.toString().length - 6);
          return this.cutZero(result) + "亿";
        }
      } else {
        return "0元";
      }
    },
    //去除价格小数点后多余的0
    cutZero(val) {
      //拷贝一份 返回去掉零的新串
      val = val.toString();
      let newstr = val.toString(); //判断是否有效数
      if (val.indexOf(".") > -1) {
        //循环变量 小数部分长度
        var leng = val.length - val.indexOf(".") - 1; // //循环小数部分
        for (let i = leng; i > 0; i--) {
          //如果newstr末尾有0
          if (
            newstr.lastIndexOf("0") > -1 &&
            newstr.substr(newstr.length - 1, 1) == 0
          ) {
            var k = newstr.lastIndexOf("0"); //如果小数点后只有一个0 去掉小数点
            if (newstr.charAt(k - 1) == ".") {
              return newstr.substring(0, k - 1);
            } else {
              //否则 去掉一个0
              newstr = newstr.substring(0, k);
            }
          } else {
            //如果末尾没有0
            return newstr;
          }
        }
      }
      return val;
    },
    videoend() {
      console.log("结束");
      // let video02Arr = data.filter(v => v.area)
      if (this.video01Index <= this.video01Arr.length) {
        this.video01Index++;
      } else this.video01Index = 0;
      this.video01 = this.video01Arr[this.video01Index].video;
    },
    videoerr() {
      console.log("失败");
      this.video01Index = 0;
      this.video01 = this.video01Arr[this.video01Index].video;
    },
    videoend02() {
      console.log("结束");
      // let video02Arr = data.filter(v => v.area)
      if (this.video02Index <= this.video02Arr.length) {
        this.video02Index++;
      } else this.video02Index = 0;
      this.video02 = this.video02Arr[this.video02Index].video;
    },
    videoerr02() {
      console.log("失败");
      this.video02Index = 0;
      this.video02 = this.video02Arr[this.video02Index].video;
    }
  },
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
    border: 0px solid $cyan;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background-color: rgba(#051e33, 1);
    tr {
      display: flex;
    }
    td {
      flex: 1;
      border-top: 0;
      border-right: 1px solid $cyan;
      border-bottom: 1px solid $cyan;
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
    background-color: #e4e7ea;
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

.center_wrap {
  .video_wrap {
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .model-wrap {
    .video_wrap {
      height: 435px;
      // background-color: #e4e7ea;
    }
  }
  .real_scene-wrap {
    .video_wrap {
      height: 356px;
      // background-color: #e4e7ea;
    }
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
  a {
    color: #fff;
    text-decoration: none;
  }
}
</style>
