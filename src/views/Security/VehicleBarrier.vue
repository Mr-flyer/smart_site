<template>
  <!-- 车辆道闸 -->
  <div class="container">
    <el-card class="page_header" shadow="never" :body-style="{ paddingBottom: 0 }">
      <el-tabs class="pdge_tabs" v-model="active" @tab-click="handleClick">
        <el-tab-pane label="实时监测" name="0"></el-tab-pane>
        <el-tab-pane label="历史数据" name="1"></el-tab-pane>
        <el-tab-pane label="用户记录" name="2"></el-tab-pane>
      </el-tabs>
    </el-card>
    <div class="page_cont">
      <!-- 实时监测 -->
      <div v-show="active == 0">
        <!-- 今日统计 -->
        <el-card class="today-wrap" shadow="never">
          <div slot="header">今日统计</div>
          <el-row>
            <el-col class="todayItem" :span="6">
              <!-- <i class="el-icon-share"></i> -->
              <img src="@/assets/vehicle/navVehicle_total.png" alt="">
              <div class="todayItem_cont">
                <div>道闸事件总数（车次）</div>
                <span>50</span>
              </div>
            </el-col>
            <el-col class="todayItem" :span="6">
              <!-- <i class="el-icon-share"></i> -->
              <img src="@/assets/vehicle/navVehicle_enter.png" alt="">
              <div class="todayItem_cont">
                <div>进入（车次）</div>
                <span>50</span>
              </div>
            </el-col>
            <el-col class="todayItem" :span="6">
              <!-- <i class="el-icon-share"></i> -->
              <img src="@/assets/vehicle/navVehicle_out.png" alt="">
              <div class="todayItem_cont">
                <div>驶出（车次）</div>
                <span>50</span>
              </div>
            </el-col>
            <el-col class="todayItem" :span="6">
              <!-- <i class="el-icon-share"></i> -->
              <img src="@/assets/vehicle/navVehicle_unknown.png" alt="">
              <div class="todayItem_cont">
                <div>陌生访客 （车次）</div>
                <span>50</span>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <el-row :gutter="20">
          <el-col :span="16">
            <!-- 道闸事件 -->
            <el-card shadow="never">
              <div slot="header">
                <!-- 道闸事件 -->
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item label="道闸选择">
                    <el-select v-model="select" placeholder="活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" label="序号" width="80"></el-table-column>
                <el-table-column prop="name" label="车辆类型" width="180"></el-table-column>
                <el-table-column prop="carcode" label="车牌" width="180"></el-table-column>
                <el-table-column prop="date" label="发生时间" width="180"></el-table-column>
                <el-table-column prop="address" label="门禁点"></el-table-column>
                <el-table-column prop="status" label="出入"></el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="8">
            <!-- 车辆信息 -->
            <el-card shadow="never">
              <div slot="header">车辆信息</div>
              <el-row>
                <el-col :span="16">
                  <div class="carInfoItem">
                    <span>道闸点：</span>信息
                  </div>
                  <div class="carInfoItem">
                    <span>人员姓名：</span>信息
                  </div>
                  <div class="carInfoItem">
                    <span>人员ID：</span>信息
                  </div>
                  <div class="carInfoItem">
                    <span>车牌号：</span>信息
                  </div>
                  <div class="carInfoItem">
                    <span>人员身份：</span>信息
                  </div>
                  <div class="carInfoItem">
                    <span>单位类型：</span>信息
                  </div>
                  <div class="carInfoItem">
                    <span>单位名称：</span>信息
                  </div>
                  <div class="carInfoItem">
                    <span>有效期：</span>信息
                  </div>
                </el-col>
                <el-col :span="8">
                  <img src="@/assets/vehicle/vehicleInfo_no.png" class="car_pic" />
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <!-- 历史数据 -->
      <el-card shadow="never" v-show="active == 1">
        <el-form slot="header" :inline="true" :model="formInline">
          <el-form-item label="车牌搜索">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="道闸点">
            <el-select v-model="formInline.region" placeholder="请选择">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="formInline.type" placeholder="请选择">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="出" value="shanghai"></el-option>
              <el-option label="入" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="info" @click="onSubmit">重置</el-button>
            <el-button type="primary" @click="onSubmit">导出</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="name" label="员工ID"></el-table-column>
          <el-table-column prop="name" label="车牌号码" width="180"></el-table-column>
          <el-table-column prop="name" label="单位类型" width="180"></el-table-column>
          <el-table-column prop="name" label="公司名称"></el-table-column>
          <el-table-column prop="name" label="身份" width="180"></el-table-column>
          <el-table-column prop="date" label="时间" width="180"></el-table-column>
          <el-table-column prop="address" label="道闸点" width="180"></el-table-column>
        </el-table>
      </el-card>
      <!-- 用户记录 -->
      <el-card shadow="never" v-show="active == 2">
        <el-form slot="header" :inline="true" :model="formInline">
          <el-form-item label="车牌搜索">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="有效期">
            <el-date-picker
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="formInline.type" placeholder="请选择">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="出" value="shanghai"></el-option>
              <el-option label="入" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="info" @click="onSubmit">重置</el-button>
            <el-button type="primary" @click="onSubmit">导出</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="name" label="车牌号码" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="name" label="员工ID"></el-table-column>
          <el-table-column prop="name" label="身份" width="180"></el-table-column>
          <el-table-column prop="name" label="单位类型" width="180"></el-table-column>
          <el-table-column prop="name" label="公司名称"></el-table-column>
          <el-table-column prop="date" label="时间" width="180"></el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
const pickerOptions = {
  shortcuts: [
    {
      text: "最近一周",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "最近一个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "最近三个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit("pick", [start, end]);
      }
    }
  ]
};
const tableData = [
  {
    date: "2016-05-02 06:00",
    name: "备案车辆",
    carcode: "苏A10000",
    address: "门禁点1",
    status: "出"
  },
  {
    date: "2016-05-04 06:00",
    name: "备案车辆",
    carcode: "苏A10000",
    address: "门禁点1",
    status: "出"
  },
  {
    date: "2016-05-01 06:00",
    name: "备案车辆",
    carcode: "苏A10000",
    address: "门禁点1",
    status: "出"
  },
  {
    date: "2016-05-03 06:00",
    name: "备案车辆",
    carcode: "苏A10000",
    address: "门禁点1",
    status: "出"
  }
];
export default {
  data: () => ({
    active: 0,
    formInline: {
      user: "",
      date: "",
      region: 0,
      type: 0
    },
    pickerOptions,
    tableData,
    select: "shanghai"
  }),
  methods: {
    onSubmit() {
      console.log(`表单提交:${this.formInline}`);
    },
    handleClick({ name }) {
      console.log("tabs切换至：", name);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {

  .el-tabs__header {
    margin-bottom: 0 !important;
  }
  .car_pic {
    width: 100px;
    height: 100px;
    // background-color: aqua;
  }
  .today-wrap {
    margin-bottom: 20px;
  }
}
// 实时监测
.todayItem {
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    font-size: 20px;
  }
  .todayItem_cont {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      line-height: 22px;
    }
    span {
      font-size: 30px;
      line-height: 38px;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
  }
}
// 车辆信息
.carInfoItem {
  padding-bottom: 8px;
  color: rgba(0, 0, 0, 0.65);
  span {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5715;
    text-align: start;
  }
}
</style>