<template>
  <div class="container">
    <el-card class="page_header" shadow="never" :body-style="{ paddingBottom: 0 }">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">扬尘管控</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-tabs class="pdge_tabs" v-model="active" @tab-click="handleClick">
        <el-tab-pane label="扬尘噪声监测" name="0"></el-tab-pane>
        <el-tab-pane label="厂界降尘自动喷淋系统" name="1"></el-tab-pane>
        <el-tab-pane label="塔吊自动喷淋系统" name="2"></el-tab-pane>
      </el-tabs>
    </el-card>
    <div class="page_cont">
      <el-card class="mb-20" shadow="never" :body-style="bodyStyle">
        <span>实时监测</span>
        <el-button type="primary" plain size="small" @click="gotoHistory">监测历史数据</el-button>
      </el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="mb-20 map-wrap" shadow="never">
            <div slot="header" class="map-hd">
              <span>地图</span>
              <el-tooltip class="item" effect="dark" content="上传地图" placement="top">
                <i class="el-icon-upload2 icon-size"></i>
              </el-tooltip>
            </div>
            <div class="map-bd"></div>
          </el-card>
          <el-card class="mb-20" shadow="never">
            <div slot="header">参数排序</div>
            <el-table :data="tableData" style="width: 100%" border>
              <el-table-column prop="name" label="设备名称"></el-table-column>
              <el-table-column prop="date" label="pm2.5 mg/m³" sortable width="140"></el-table-column>
              <el-table-column prop="date" label="pm10 mg/m³" sortable width="140"></el-table-column>
              <el-table-column prop="date" label="TSP mg/m³" sortable width="140"></el-table-column>
              <el-table-column prop="date" label="噪音 dB" sortable width="140"></el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card class="mb-20" shadow="never">
            <div slot="header">
              设备选择
              <el-select v-model="value" placeholder="请选择" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <el-form
              :model="formEquipment"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="formEquipment-wrap"
            >
              <el-form-item class="equipment-name-wrap" label="设备名称：" prop="name">
                <el-input type="text" v-html="formEquipment.name"></el-input>
                <!-- <el-button class="equipment-name-btn" type="primary" @click="editEquipmentName" size="">修改</el-button> -->
                <el-button
                  class="equipment-name-btn"
                  size="small"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="editEquipmentName"
                ></el-button>
              </el-form-item>
              <el-form-item label="设备ID：" prop="code">
                <el-input type="text" v-html="formEquipment.code"></el-input>
              </el-form-item>
              <el-form-item label="更新时间：" prop="time">
                <el-input v-html="formEquipment.time"></el-input>
              </el-form-item>
              <!-- <el-form-item>
                <el-button type="primary" @click="submitForm('formEquipment')">提交</el-button>
                <el-button type="primary" @click="editEquipment">修改</el-button>
                <el-button @click="showEquipmentVisible = true">基准值设置</el-button>
              </el-form-item>-->
            </el-form>
          </el-card>
          <el-card class="mb-20" shadow="never">
            <div slot="header" class="test_header">
              <span>实时监测</span>
              <el-tooltip class="item" effect="dark" content="标准值设置" placement="top">
                <!-- <el-button type="info" icon="el-icon-s-tools" size="small" circle @click="showEquipmentVisible = true"></el-button> -->
                <i class="el-icon-setting icon-size" @click="showEquipmentVisible = true"></i>
              </el-tooltip>
            </div>
            <div class="weather_wrap">
              <div class="weather_item color_warning" v-for="(item, index) of 9" :key="index">
                <i class="el-icon-s-flag"></i>
                <div class="weather_cont">
                  <div class="title">
                    pm2.5
                    <b>N</b>
                  </div>
                  <div class="count">
                    <b>30</b>mg/m³
                  </div>
                  <div class="desc">标准值：75mg/m³</div>
                </div>
              </div>
            </div>
          </el-card>
          <el-card shadow="never">
            <div slot="header">查看数据方式</div>
            <div class="grid-main">
              <div class="grid-item">
                <lineEchart :infoObj="infoSourceTrend" />
              </div>
              <div class="grid-item">
                <lineEchart :infoObj="infoSourceTrend02" />
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 设备标准值设置 -->
    <el-dialog title="标准值设置" :visible.sync="showEquipmentVisible">
      <el-form :model="form">
        <el-form-item label="pm2.5" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off">
            <template slot="append">mg/m³</template>
          </el-input>
        </el-form-item>
        <el-form-item label="pm10" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off">
            <template slot="append">mg/m³</template>
          </el-input>
        </el-form-item>
        <el-form-item label="TSP" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off">
            <template slot="append">mg/m³</template>
          </el-input>
        </el-form-item>
        <el-form-item label="噪音" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off">
            <template slot="append">dB</template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEquipmentVisible = false">取 消</el-button>
        <el-button type="primary" @click="showEquipmentVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import lineEchart from "@/components/lineEchart";
const tableData = [
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄"
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄"
  }
];
// 设备选择
const options = [
  {
    value: "选项1",
    label: "黄金糕"
  },
  {
    value: "选项2",
    label: "双皮奶"
  },
  {
    value: "选项3",
    label: "蚵仔煎"
  },
  {
    value: "选项4",
    label: "龙须面"
  },
  {
    value: "选项5",
    label: "北京烤鸭"
  }
];
// 校验input 为空
const noEmpty = (rule, value, callback) => {
  if (value === "") callback(new Error("必填项不能为空"));
  callback();
};
export default {
  data: () => ({
    bodyStyle: {
      display: "flex",
      "align-items": "center",
      "justify-content": "space-between"
    },
    active: "0",
    options,
    value: "",
    tableData,
    formEquipment: {
      name: "设备名称",
      code: "设备ID",
      time: "时间"
    },
    rules: {
      name: [{ validator: noEmpty, trigger: "blur" }],
      code: [{ validator: noEmpty, trigger: "blur" }],
      time: [{ validator: noEmpty, trigger: "blur" }]
    },
    showEquipmentVisible: false,
    form: {
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: ""
    },
    formLabelWidth: "80px",
    infoSourceTrend: {
      title: "扬尘监测TSP+PM2.5+PM10",
      isLoading: true,
      legend: ["腾讯新闻", "微信公众号"],
      xdata: [],
      color: ["#9357F1", "#5599FE"],
      data: []
    },
    infoSourceTrend: {
      title: "噪声监测",
      isLoading: true,
      legend: ["腾讯新闻", "微信公众号"],
      xdata: [],
      color: ["#9357F1", "#5599FE"],
      data: []
    }
  }),
  created() {
    // 扬尘监测
    this.infoSourceTrend = {
      title: "扬尘监测TSP+PM2.5+PM10",
      isLoading: true,
      legend: ["TSP", "PM2.5", "PM10"],
      xdata: ["10:00", "10:20", "10:40", "11:00", "11:20", "11:40", "12:00"],
      color: ["#9357F1", "#5599FE", "red"],
      data: [
        [120, 132, 101, 134, 90, 230, 210],
        [220, 182, 191, 234, 290, 330, 310],
        [150, 232, 201, 154, 190, 330, 410]
      ]
    };
    // 噪声监测
    this.infoSourceTrend02 = {
      title: "噪声监测",
      isLoading: true,
      legend: ["噪声"],
      xdata: ["10:00", "10:20", "10:40", "11:00", "11:20", "11:40", "12:00"],
      color: ["#9357F1"],
      data: [[120, 132, 101, 134, 90, 230, 210]]
    };
  },
  methods: {
    handleClick(val) {
      console.log(`tabs切换: `, val);
    },
    // 修改设备名称
    editEquipmentName() {
      this.$prompt("设备名称", "编辑", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: this.formEquipment.name
      }).then(({ value }) => {
        this.$message({
          type: "success",
          message: "你的设备名称是: " + value
        });
      });
    },
    // 修改设备名称
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    gotoHistory() {
      this.$router.push("/Security/DustControlHistoryList");
    }
  },
  components: {
    lineEchart
  }
};
</script>

<style lang="scss" scoped>
$colorSuccess: #67c23a;
$colorWarning: #e6a23c;
$colorDanger: #f56c6c;
$colorInfo: #909399;
.page_cont {
  .icon-size {
    font-size: 20px;
  }
  .test_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
// 地图
.map-wrap {
  .map-hd {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .map-bd {
    height: 500px;
  }
}
.formEquipment-wrap {
  .equipment-name-wrap {
    display: flex;
  }
  .equipment-name-btn {
    margin-left: 20px;
  }
  .el-form-item__content {
    display: flex;
    align-items: center;
    margin-left: 0 !important;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
.weather_wrap {
  display: flex;
  flex-wrap: wrap;
}
.weather_item {
  display: flex;
  align-items: center;
  min-width: 200px;
  margin-bottom: 20px;
  // max-width: 20%;
  .el-icon-s-flag {
    flex: none;
  }
  .weather_cont {
    flex: 1;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    // align-items: center;
  }
  .title {
    b {
      font-size: 20px;
    }
  }
  .count {
    b {
      font-size: 25px;
    }
  }
  .desc {
    color: rgba(0, 0, 0, 0.25);
    font-size: 14px;
  }
  &.color_success {
    b {
      color: $colorSuccess;
    }
  }
  &.color_warning {
    b {
      color: $colorWarning;
    }
  }
  &.color_danger {
    b {
      color: $colorDanger;
    }
  }
  &.color_info {
    b {
      color: $colorInfo;
    }
  }
}
.grid-main {
  .grid-item {
    height: 330px;
    position: relative;
  }
}
</style>