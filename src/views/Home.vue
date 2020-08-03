<template>
  <el-container class="container">
    <el-header class="header_wrap">
      <div class="header_right">
        <div class="time-wrap"></div>
      </div>
      <div class="header_title">虹洋热电联产扩建项目智慧工地管理系统</div>
      <div class="sub_title">
        <img src="../assets/logo02.png" />
        江苏省电力设计院
      </div>
      <div class="header_left">
        <div class="header_item">
          <img src="../assets/bigScreen/icon_location@2x.png" alt />连云港
        </div>
        <div class="header_item">
          <img src="../assets/bigScreen/icon_security@2x.png" alt />
          {{workDay}} 天
        </div>
      </div>
    </el-header>
    <el-main class="main">
      <el-row class="main_wrap" :gutter="0">
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
                <!-- <div class="sum-type-item">
                  <span>合同工期</span>
                  {{survey.period || 0}}天
                </div>-->
                <div class="sum-type-item">
                  <span>建筑面积</span>
                  {{survey.area || 0}}㎡
                </div>
                <div class="sum-type-item">
                  <span>场地面积</span>
                  {{survey.field_area || 0}}㎡
                </div>
              </div>
              <div class="sum-desc">
                <table>
                  <tr>
                    <td>
                      <span class="sum-table-title">建设单位</span>
                      <div v-for="(v ,i) of survey.build_company" :key="i" v-html="v"></div>
                      <!-- <TextScroll v-for="(v ,i) of survey.build_company" :key="i" :lists="[v]"></TextScroll> -->
                    </td>
                    <td class="lastCol">
                      <span class="sum-table-title">设计单位</span>
                      <div v-for="(v ,i) of survey.design_company" :key="i" v-html="v"></div>
                      <!-- <TextScroll v-for="(v ,i) of survey.design_company" :key="i" :lists="[v]"></TextScroll> -->
                    </td>
                  </tr>
                  <tr class="lastrow">
                    <td>
                      <span class="sum-table-title">监理单位</span>
                      <div v-for="(v ,i) of survey.supervisor_company" :key="i" v-html="v"></div>
                      <!-- <TextScroll v-for="(v ,i) of survey.supervisor_company" :key="i" :lists="[v]"></TextScroll> -->
                    </td>
                    <td class="lastCol">
                      <span class="sum-table-title">施工单位</span>
                      <div v-for="(v ,i) of survey.construction_company" :key="i" v-html="v"></div>
                      <!-- <TextScroll :lists="survey.construction_company"></TextScroll> -->
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
                <barBigEchart :infoPieObj="infoPieTrend" :infoBarObj="infoBarTrend" />
              </div>
            </div>
            <div class="legend_wrap">
              <div class="legend_item" v-for="v of company_name" :key="v">
                <i></i>{{v}}
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
        <el-col :span="12" class="center_wrap flexfill">
          <el-card class="panel-wrap model-wrap" shadow="never">
            <template slot="header">
              <img class="icon_title" src="../assets/bigScreen/icon_data@2x.png" alt />
              <!-- 模拟进度--{{video01Name}} -->
              模拟进度--{{videoSimulation.video_name}}
            </template>
            <div class="video_wrap">
              <video
                autoplay
                muted
                ref="video01"
                :loop="videoSimulation.videoList.length === 1"
                :src="videoSimulation.video"
                @ended="videoend(videoSimulation)"
                @error="videoerr(videoSimulation)"
              />
            </div>
          </el-card>
          <el-card class="panel-wrap real_scene-wrap" shadow="never">
            <template slot="header">
              <img class="icon_title" src="../assets/bigScreen/icon_data@2x.png" alt />
              项目实景--{{videoReality.video_name}}
            </template>
            <div class="video_wrap">
              <video
                autoplay
                muted
                ref="video02"
                :loop="videoReality.videoList.length === 1"
                :src="videoReality.video"
                @ended="videoend(videoReality)"
                @error="videoerr(videoReality)"
              ></video>
            </div>
          </el-card>
        </el-col>
        <!-- 右 -->
        <el-col :span="6" class="flexfill">
          <el-card class="panel-wrap city_environment-wrap" shadow="never">
            <template slot="header">
              <div>
                <img class="icon_title" src="../assets/bigScreen/icon_data@2x.png" alt />
                城市环境
              </div>
              <div class="date-wrap">
                <span>{{weekTxt}}</span>
                <span>{{dateTime}} {{timeInfo}}</span>
              </div>
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
                        <p>{{todayWeatherData.win}}{{todayWeatherData.win_speed}}</p>
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
                          <span>{{todayNoise}}</span>dB
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
                    <img
                      v-show="!index"
                      src="../assets/bigScreen/icon_warning@2x.png"
                      alt
                    />
                  </div>
                  <div class="security_current-bd txtcolor01">
                    <span>{{item.value}}</span>
                    {{item.company}}
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
                <div class="monitoring_video">
                  <video autoplay loop muted src="http://218.92.33.126:23080/media/jiankong/2.mp4"></video>
                </div>
                <div class="monitoring_desc">
                  监控点1
                  <span>门口</span>
                </div>
              </div>
              <div class="monitoring_item">
                <div class="monitoring_video">
                  <video autoplay loop muted src="http://218.92.33.126:23080/media/jiankong/3.mp4"></video>
                </div>
                <div class="monitoring_desc">
                  监控点2
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
        <div v-for="(item, $index) in routerList">
          <div v-if="item.outLink">
            <a
              :class="routerActiveIndex === $index ? 'navbar_item_active':'navbar_item'"
              :href="item.routerPath"
              target="_blank"
            >{{item.name}}</a>
          </div>
          <div v-else>
            <router-link
              :class="routerActiveIndex === $index ? 'navbar_item_active':'navbar_item'"
              v-if="item.routerPath"
              :to="{name: item.routerName, redirect: item.routerPath}"
            >{{item.name}}</router-link>
            <div
              v-else
              :class="routerActiveIndex === $index ? 'navbar_item_active':'navbar_item'"
              @mouseover="mouseRouter($index)"
              @mouseout="routerIndex = -1"
            >
              <div>{{item.name}}</div>
              <div class="child_navbars" v-show="routerIndex === $index">
                <div v-for="site in item.list">
                  <a
                    :title="site.name"
                    v-if="site.outLink"
                    :href="site.routerPath"
                    target="_blank"
                    class="child_navbar_item"
                  >
                    <span class="round_icon"></span>
                    {{site.name}}
                  </a>
                  <router-link
                    v-else
                    :title="site.name"
                    class="child_navbar_item"
                    :to="{name: site.routerName, redirect: site.routerPath}"
                  >
                    <span class="round_icon"></span>
                    {{site.name}}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
// @ is an alias to /src
import TextScroll from "@/components/textScroll";
import lineWeaterEchart from "@/components/lineWeaterEchart";
import barBigEchart from "@/components/barBigEchart";
import pieBigEchart from "@/components/pieBigEchart";
import echarts from "echarts";
import dayjs from "dayjs";
const options = {
  // 温度变化表数据
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
  // 扬尘折线图数据
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
  // 噪声折线图数据
  infoNoiseTrend: {
    title: "",
    isLoading: true,
    legend: ["TSP"],
    xdata: ["10:00", "10:20", "10:40", "11:00", "11:20", "11:40"],
    color: ["#fff", "#ffc528", "#276fff"],
    data: [[12, 10, 24, 30, 40, 31]]
  },
  // 现场人员表数据
  infoPieTrend: {
    title: "现场人员表",
    isLoading: true,
    color: ["#ff9566", "#276fff"],
    data: [
      { value: 235, name: "视频广告" },
      { value: 400, name: "搜索引擎" }
    ]
  },
  // 人员分布柱形图数据
  infoBarTrend: {
    title: "人员分布柱形图",
    isLoading: true,
    data: [
      // [320, 302, 341, 374, 390, 450, 420, 390, 450, 420, 420],
      // [ -120, -132, -101, -134, -190, -230, -210, -190, -230, -210, -210 ]
    ]
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
      date: 0,
      name: "吊塔"
    },
    {
      date: 0,
      name: "升降机"
    },
    {
      date: 0,
      name: "卸料台"
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
  ],
  weatherData: {},
  securityList: [
    { value: "", name: "TPS", company: "mg/m³" },
    { value: "", name: "PM2.5", company: "mg/m³" },
    { value: "", name: "PM10", company: "mg/m³" },
    { value: "", name: "噪声", company: "dB" }
  ],
  routerList: [
    { name: "项目总览" },
    { name: "系统管理", routerName: "HomeSet", routerPath: "/System/HomeSet" },
    {
      name: "安全管理",
      list: [
        {
          name: "视频监控",
          routerName: "VideoMonitoring",
          routerPath: "/Security/VideoMonitoring"
        },
        {
          name: "人员管理",
          routerName: "PersonnelManagement",
          routerPath: "/Security/PersonnelManagement"
        },
        {
          name: "扬尘管控",
          routerName: "DustControl",
          routerPath: "/Security/DustControl"
        },
        {
          name: "车辆道闸",
          routerName: "VehicleBarrier",
          routerPath: "/Security/VehicleBarrier"
        },
        { name: "安全教育", routerPath: "" },
        { name: "危大工程监测预警", routerPath: "" },
        { name: "现场安全隐患排查", routerPath: "" },
        { name: "高处作业防护预警", routerPath: "" }
      ]
    },
    {
      name: "三维物联",
      list: [
        {
          name: "三维实景物联",
          routerPath: "http://58.33.87.122:6640/njdd/api/security/login.html",
          outLink: true
        },
        {
          name: "无人机巡航",
          routerName: "UAVCruise",
          routerPath: "/IOT/UAVCruise"
        }
      ]
    },
    {
      name: "生产管理",
      list: [
        {
          name: "三维进度",
          routerName: "Document3D",
          routerPath: "/Production/Document3D"
        },
        { name: "施工验收", routerPath: "" },
        { name: "协同会审", routerPath: "" },
        { name: "云会议", routerPath: "" }
      ]
    },
    {
      name: "三维文档",
      routerName: "",
      outLink: true,
      routerPath: "http://218.94.40.2:8080/TPlant/login"
    }
  ],
  routerActiveIndex: 0,
  routerIndex: -1
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
    week: [
      "星期天",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ],
    workDay: "", // 安全开工日期
    weekTxt: "", // 星期
    dateTime: "", // 日期
    timeInfo: "", // 时间
    timer: "", // 计时器
    todayWeatherData: [], // 明日天气概要
    tomorrowWeatherData: [], // 后天天气概要
    threeWeatherData: [], // 大后天天气概要
    weather: [
      "xue",
      "lei",
      "shachen",
      "wu",
      "bingbao",
      "yun",
      "yu",
      "yin",
      "qing"
    ], // 天气类型
    todayNoise: "", // 今日噪声指数 -- 天气版块
    videoSimulation: {
      video_name: "",
      video: "",
      index: 0,
      videoList: [
        {
          video:
            "https://vdept.bdstatic.com/424276416a337a5568544439586b5349/38354a4238444150/e656758a269e62b2bc75c85dd26d0b2f22626eff5cfd6159c2bf569356739580f3982f85c63dcdec282c53c3425779fcdd520c7e817110b2a882c32f63488092.mp4?auth_key=1596104939-0-0-90b6d22663b95fa8cee8161efc3a02b5",
          video_name: "工地一"
        },
        {
          video:
            "https://vdept.bdstatic.com/73714e6e7246735851467a47504c7a4d/5033724e6c677556/e46e3a9fd633c72ad4f5269e5b935f94924863ef2b5aa88422dc24ee765a1f4829ab27301747212e244c36313e56a5133d4fd414893892ff52136559a74b37036917f492a43c8c966170863f5a310cdb.mp4?auth_key=1596104944-0-0-80d48b81066b97ecefe7326e2e38c0da",
          video_name: "工地二"
        }
      ]
    },
    videoReality: {
      video_name: "",
      video: "",
      index: 0,
      videoList: [
        {
          video:
            "https://vdeptold.bdstatic.com/3934485634567436687039314374444e/727a66426b634d41/7bb0950e51d2c393aa67b61150393f162227042debb722e2be671714caa3be023be4133715e3aa0571e1ab1cace0157d.mp4?auth_key=1596106384-0-0-a429bff581fba24459de58569aa44239",
          video_name: "场地一"
        }
      ]
    },
    company_name: []
  }),
  created() {
    this.weekTxt = this.week[dayjs().day()];
    this.dateTime = dayjs().format("YYYY年MM月DD日");
    this.timeInfo = dayjs().format("HH:mm:ss");
    this.timer = setInterval(() => {
      this.timeInfo = dayjs().format("HH:mm:ss");
    }, 1000);
    // return false;
    // 现场管理（扬尘、噪声）
    this.$http.get(`api/v1/security/dust_chart`).then(({ data: dustData }) => {
      let TSP = dustData.map(v => Number(v.tsp));
      let PM2_5 = dustData.map(v => Number(v.pm2_5));
      let PM10 = dustData.map(v => Number(v.pm10));
      let noise = dustData.map(v => Number(v.noise));
      this.infoDustTrend.xdata = dustData.map(v =>
        dayjs(v.time).format("HH:mm")
      );
      this.infoDustTrend.data = [TSP, PM2_5, PM10];
      this.infoNoiseTrend.xdata = dustData.map(v =>
        dayjs(v.time).format("HH:mm")
      );
      this.infoNoiseTrend.data = [noise];
      this.securityList = [
        { name: "TSP", company: "mg/m³", value: dustData[0].tsp },
        { name: "PM2.5", company: "mg/m³", value: dustData[0].pm2_5 },
        { name: "PM10", company: "mg/m³", value: dustData[0].pm10 },
        { name: "噪声", company: "dB", value: dustData[0].noise }
      ];
    });
    // 扬尘基准值
    this.$http.get(`api/v1/security/dust_set`).then(({ data }) => {
      // console.log(data);
    });
    // 城市环境
    this.$http.get(`api/v1/index/tianqi`).then(({ data: weatherAllData }) => {
      this.weatherCity = weatherAllData.city;
      let { data, noise } = weatherAllData;
      this.todayWeatherData = data[0];
      this.todayWeatherData.win = data[0].win[0];
      this.todayNoise = noise;
      if (this.weather.includes(this.todayWeatherData.wea_day_img)) {
        this.todayWeatherData.wea_day_img = require(`../assets/weather/${data[0].wea_day_img}.png`);
      } else {
        this.todayWeatherData.wea_day_img = require(`../assets/weather/empty.png`);
      }
      let obj = new Date();
      let hour = obj.getHours();
      if (hour < 10) hour = "0" + hour;
      for (let i = 0; i < data[0].hours.length; i++) {
        if (data[0].hours[i].hours.slice(0, 2) == hour) {
          let sliceEnd = 8;
          if (data[0].hours.length - i < 8) {
            sliceEnd = data[0].hours.length;
          }
          this.infoSourceTrend.xdata = data[0].hours
            .slice(i, i + sliceEnd)
            .map(v => v.hours);
          this.infoSourceTrend.data = [
            data[0].hours.slice(i, i + sliceEnd).map(v => ({
              value: v.tem,
              label: {
                show: true,
                position: "top",
                color: "#fff",
                formatter: ({ value }) => `${value}℃`
              }
            }))
          ];
          break;
        }
      }
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
    // 项目概况
    this.$http.get(`api/v1/system/project`).then(({ data }) => {
      data.costTxt = this.common.format_unit(data.cost);
      data.field_area = this.common.format_unit(data.field_area);
      data.area = this.common.format_unit(data.area);
      this.survey = data;
      // 已开工天数
      this.workDay = dayjs().diff(dayjs(data.start_date), "day");
    });
    // 视频列表（仅拉取上线）
    this.$http.get(`api/v1/system/video?is_show=1`).then(({ data }) => {
      this.videoSimulation.videoList = data.filter(v => !v.area);
      this.videoReality.videoList = data.filter(v => v.area);
      // Object.assign(this.videoSimulation, this.videoSimulation.videoList[0])
      // Object.assign(this.videoReality, this.videoReality.videoList[0])
    });
    this.$http.get(`api/v1/index/person`)
    .then(({data}) => {
      let difference = data.map(v => -v.difference)
      let scene_count = data.map(v => v.scene_count)
      this.company_name = data.map(v => v.company_name)
      this.infoBarTrend.data = [scene_count, difference]
      this.infoPieTrend.data = [
          { value: difference.reduce((acc, cur) => acc + -cur, 0), name: "差额" },
          { value: scene_count.reduce((acc, cur) => acc + cur, 0), name: "现场人数" }
        ]
    })
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    // 菜单栏鼠标悬停
    mouseRouter(index) {
      this.routerIndex = index;
    },
    // 视频播放结束时
    videoend(videoData) {
      let { index, videoList } = videoData;
      let currentIdx = index < videoList.length - 1 ? ++index : 0;
      Object.assign(videoData, {
        index: currentIdx,
        ...videoData.videoList[currentIdx]
      });
    },
    // 视频播放失败时
    videoerr(videoData) {
      if (!videoData.videoList.length) return;
      Object.assign(videoData, {
        index: 0,
        ...videoData.videoList[videoData.index]
      });
    },
    // 格式化价格
    _formatPrice(val) {
      if (val) {
        if (parseInt(val) >= 0 && parseInt(val) < 10000) {
          let result = (parseInt(val * 100) / 100).toFixed(2);
          return this._cutZero(result) + "元";
        } else if (parseInt(val) >= 10000 && parseInt(val) < 100000000) {
          let result = (val / 10000).toFixed(4);
          result = result.substring(0, result.toString().length - 2);
          return this._cutZero(result) + "万";
        } else {
          let result = (val / 100000000).toFixed(8);
          result = result.substring(0, result.toString().length - 6);
          return this._cutZero(result) + "亿";
        }
      } else {
        return "0元";
      }
    },
    // 去除价格小数点后多余的0
    _cutZero(val) {
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
    }
  },
  components: {
    lineWeaterEchart,
    barBigEchart,
    pieBigEchart,
    TextScroll
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
  .main_wrap {
    display: flex;
  }
  .flexfill {
    display: flex;
    flex-direction: column;
  }
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
  .sub_title {
    position: absolute;
    left: 15px;
    bottom: 0;
    font-size: 28px;
    font-weight: 700;
    display: flex;
    align-items: center;
    // transform: translate(100%, -20%);
    img {
      width: 74px;
      margin-right: 10px;
    }
  }
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
      white-space: nowrap;
      /* left: 50%; */
      transform: translate(0%, -50%);
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
    .el-card__header {
      display: flex;
      justify-content: space-between;
    }
    .el-card__body {
      padding: 0;
    }
  }
  .date-wrap {
    font-size: 16px;
    font-weight: 400;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  ::v-deep {
    .el-card__body {
      display: flex;
      flex: 1;
    }
  }
  .monitoring_group {
    display: flex;
    justify-content: space-between;
  }
  .monitoring_item {
    width: 48%;
  }
  .monitoring_video {
    height: calc(100% - 16px);
    background-color: #e4e7ea;
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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
      flex: none;
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
      object-fit: fill;
    }
  }
  .model-wrap {
    .video_wrap {
      height: 435px;
      // background-color: #e4e7ea;
    }
  }
  .real_scene-wrap {
    display: flex;
    flex-direction: column;
    flex: 1;
    ::v-deep {
      .el-card__body {
        display: flex;
        flex: 1;
        position: relative;
        box-sizing: border-box;
        overflow: hidden;
      }
    }
    .video_wrap {
      position: absolute;
      width: calc(100% - 30px);
      height: calc(100% - 30px);
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
  .navbar_item,
  .navbar_item_active {
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
    position: relative;
    cursor: pointer;
    .child_navbars {
      // width: 124px;
      width: 168px;
      height: auto;
      background: rgba(4, 9, 16, 0.8);
      position: absolute;
      bottom: 59px;
      left: 0;
      & > div {
        font-size: 15px;
        .child_navbar_item {
          padding: 4px 12px;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .child_navbar_item:hover {
          background-color: #0455ae;
        }
        .round_icon {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          border: 1px solid #fff;
          display: inline-block;
          margin-right: 6px;
          vertical-align: middle;
          margin-top: -2px;
        }
      }
    }
  }
  .navbar_item_active {
    width: 198px;
    margin-left: 0;
    background-image: url(../assets/bigScreen/navitem_active@2x.png);
  }
  a {
    color: #fff;
    text-decoration: none;
  }
}
</style>
