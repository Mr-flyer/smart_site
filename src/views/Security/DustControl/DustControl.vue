<template>
  <div class="container" v-loading="loading">
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
            <el-card class="mb-20" shadow="never">
                <div slot="header">参数排序</div>
                <el-table :data="options" style="width: 100%" border>
                  <el-table-column prop="name" label="设备名称"></el-table-column>
                  <el-table-column prop="date" :label="'pm2.5|(mg/m³)'" sortable :render-header="renderheader"></el-table-column>
                  <el-table-column prop="date" :label="'pm10|(mg/m³)'" sortable :render-header="renderheader"></el-table-column>
                  <el-table-column prop="date" :label="'TSP|(mg/m³)'" sortable :render-header="renderheader"></el-table-column>
                  <el-table-column prop="date" :label="'噪音|(dB)'" sortable :render-header="renderheader"></el-table-column>
                </el-table>
            </el-card>
            <el-card class="mb-20 map-wrap" shadow="never" v-loading="imgLoading">
                <div slot="header" class="map-hd">
                    <span>地图</span>
                    <el-upload
                        class="avatar-uploader"
                        action="#"
                        :show-file-list="false"
                        :on-change="changeFile"
                        :before-upload="beforeAvatarUpload"
                        accept="image/png,image/gif,image/jpg,image/jpeg">
                        <el-button style="float: right; padding: 3px 0" type="text">上传地图</el-button>
                    </el-upload>
                </div>
                <div class="map-bd">
                    <img
                    v-if="mapPic"
                    class="access-control-pic"
                    :src="mapPic"/>
                    <img
                    v-else
                    class="access-control-pic"
                    src="../../../assets/security_map.jpg"/>
                </div>
            </el-card>
        </el-col>
        <el-col :span="16">
          <el-card class="mb-20" shadow="never">
            <div slot="header">
              设备选择
              <el-select :value="formEquipment.id" @change="changeDevice" placeholder="请选择" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <div class="formEquipment-table" v-if="JSON.stringify(formEquipment) != '{}' && formEquipment!=''">
                <div><span class="device-label">设备名称：</span>{{formEquipment.name}}<el-button
                    class="equipment-name-btn"
                    size="small"
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="editEquipmentName">
                </el-button></div>
                <div><span class="device-label">设备ID：</span>{{formEquipment.mn}}</div>
                <div><span class="device-label">更新时间：</span>{{formEquipment.time}}</div>
            </div>
            <div class="formEquipment-table" v-show="JSON.stringify(formEquipment) == '{}'">
                <v-empty :value="formEquipment"></v-empty>
            </div>
          </el-card>
          <el-card class="mb-20" shadow="never" v-loading="sdLoading">
            <div slot="header" class="test_header">
              <div>实时监测
                <el-tooltip class="item" effect="dark" placement="right-end">
                  <div slot="content">
                    N：仪表正常 F：停用 M：处于维护期产生的数据 <br />
                    S: 手动输入的设定值 D：故障 B：异常 <br />
                    T：超过上限，爆表 C:处于校准状态 <br />
                  </div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
              <el-tooltip class="item" effect="dark" content="标准值设置" placement="top">
                <!-- <el-button type="info" icon="el-icon-s-tools" size="small" circle @click="showEquipmentVisible = true"></el-button> -->
                <i class="el-icon-setting icon-size" @click="showEquipmentVisible = true"></i>
              </el-tooltip>
            </div>
            <div class="weather_wrap" v-if="JSON.stringify(securityDetection) != '{}' && securityDetection!=''">
              <div class="weather_item color_warning" v-for="(item, key) of securityDetection" :key="key">
                <img class="security_icon" :src="item.icon"/>
                <div class="weather_cont">
                  <div class="title">
                    {{item.name}}
                    <b>{{item.flag}}</b>
                  </div>
                  <div class="count">
                    <b>{{item.value}}</b>{{item.unit}}
                  </div>
                  <div class="desc" v-if="item.standardValue">标准值：{{item.standardValue}}{{item.unit}}</div>
                </div>
              </div>
            </div>
            <div class="weather_wrap" v-show="JSON.stringify(securityDetection) == '{}'">
                <v-empty :value="securityDetection"></v-empty>
            </div>
          </el-card>
          <el-card shadow="never">
            <div slot="header">查看数据方式
                <el-select v-model="checkTypeValue">
                    <el-option
                    v-for="item in checkType"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    ></el-option>
                </el-select>
            </div>
            <div class="grid-main" v-if="dust_chart.length > 0">
              <div class="grid-item" v-for="item in dust_chart">
                <lineEchart :infoObj="infoSourceTrend" />
              </div>
            </div>
            <div class="grid-main" v-else>
                <v-empty :value="dust_chart"></v-empty>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 设备标准值设置 -->
    <el-dialog title="标准值设置" :visible.sync="showEquipmentVisible">
      <el-form :model="form" label-width="80px" v-loading="equipmentLoading">
        <el-form-item label="pm2.5">
          <el-input v-model="form.pm2_5" autocomplete="off">
            <template slot="append">mg/m³</template>
          </el-input>
        </el-form-item>
        <el-form-item label="pm10">
          <el-input v-model="form.pm10" autocomplete="off">
            <template slot="append">mg/m³</template>
          </el-input>
        </el-form-item>
        <el-form-item label="TSP">
          <el-input v-model="form.tsp" autocomplete="off">
            <template slot="append">mg/m³</template>
          </el-input>
        </el-form-item>
        <el-form-item label="噪音">
          <el-input v-model="form.noise" autocomplete="off">
            <template slot="append">dB</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEquipmentVisible = false">取 消</el-button>
        <el-button type="primary" @click="equipmentSub">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import lineEchart from "@/components/lineEchart";
import empty from "@/components/empty";
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
    loading: false,
    imgLoading: false,      //地图loading
    options: [],
    tableData: [],
    formEquipment: '',
    rules: {
      name: [{ validator: noEmpty, trigger: "blur" }],
      code: [{ validator: noEmpty, trigger: "blur" }],
      time: [{ validator: noEmpty, trigger: "blur" }]
    },
    showEquipmentVisible: false,
    form: {
        pm2_5: null,
        pm10: null,
        tsp: null,
        noise: null
    },
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
    },
    mapPic: '',
    securityDetection: '',
    sdLoading: false,
    dust_chart: '',
    checkTypeValue: '',
    checkType: [
        {name: '实时', value: ''},
        {name: '按小时', value: 0},
        {name: '按天', value: 1},
        {name: '按月', value: 2},
        {name: '按年', value: 3},
    ],
    equipmentLoading: false
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
    // 设备列表
    this.loading = true;
    this.$http.get('api/v1/security/equipment/')
    .then((res)=>{
        this.loading = false;
        this.options = res.data;
        if(this.options.length > 0) {
            this.formEquipment = this.options[0];
            // 实时监测
            this.imgLoading = true;
            this.sdLoading = true;
            this.$http.get(`api/v1/security/dust?mn=${this.formEquipment.id}`)
            .then((res)=>{
                this.handelSecurity(res);
            })
            .catch(()=>{})
            // 折线图
            this.$http.get('api/v1/security/dust_chart')
            .then((res) => {
                this.dust_chart = res.data;
            })
            .catch(()=>{})
        }else {
            this.formEquipment = {};
            this.securityDetection = {};
            this.dust_chart = [];
        }
    })
  },
  methods: {
    renderheader(h, { column, $index }) {
      return h('span', {
          class: ['head-unit']
      }, [
        h('span', {}, column.label.split('|')[0]),
        h('br'),
        h('span', {}, column.label.split('|')[1])
      ]);
    },
    handleClick(val) {
      console.log(`tabs切换: `, val);
    },
    handelSecurity(res) {
        this.sdLoading = false;
        this.imgLoading = false;
        if(JSON.stringify(res.data) !== '{}') {
            this.mapPic = res.data.img;
            this.securityDetection = {
                'pm2_5': {
                    name: 'pm2.5',
                    standardValue: 0,
                    value: res.data.pm2_5,
                    flag: 'N',
                    unit: 'mg/m³',
                    icon: require('../../../assets/security/pm_icon.png')
                },
                'pm10': {
                    name: 'pm10',
                    standardValue: 0,
                    value: res.data.pm10,
                    flag: 'F',
                    unit: 'mg/m³',
                    icon: require('../../../assets/security/pm_ten_icon.png')
                },
                'tsp': {
                    name: 'TSP',
                    standardValue: 0,
                    value: res.data.tsp,
                    flag: 'M',
                    unit: 'mg/m³',
                    icon: require('../../../assets/security/tsp_icon.png')
                },
                'noise': {
                    name: '噪音',
                    standardValue: 0,
                    value: res.data.noise,
                    flag: 'S',
                    unit: 'dB',
                    icon: require('../../../assets/security/zaoyin_icon.png')
                },
                'centigrade': {
                    name: '温度',
                    standardValue: '',
                    value: res.data.centigrade,
                    flag: 'D',
                    unit: '℃',
                    icon: require('../../../assets/security/wendu_icon.png')
                },
                'wind_direction': {
                    name: '风向',
                    standardValue: '',
                    value: res.data.wind_direction,
                    flag: 'B',
                    unit: '',
                    icon: require('../../../assets/security/fengxiang_icon.png')
                },
                'humidity': {
                    name: '湿度',
                    standardValue: '',
                    value: res.data.humidity,
                    flag: 'N',
                    unit: '%',
                    icon: require('../../../assets/security/shidu_icon.png')
                },
                'pressure': {
                    name: '气压',
                    standardValue: '',
                    value: res.data.pressure,
                    flag: 'C',
                    unit: '千帕',
                    icon: require('../../../assets/security/qiya_icon.png')
                },
                'wind_speed': {
                    name: '风速',
                    standardValue: '',
                    value: res.data.wind_speed,
                    flag: 'T',
                    unit: 'm/s',
                    icon: require('../../../assets/security/fengsu_icon.png')
                }
            }
        }else {
            this.securityDetection = {};
        }
    },
    // 修改设备名称
    editEquipmentName() {
      this.$prompt("设备名称", "编辑", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: this.formEquipment.name
      }).then(({ value }) => {
          if(!value) {
              this.$message.warning('请填写设备名称');
          }else {
              this.$http.put(`api/v1/security/equipment/${this.formEquipment.id}`, {
                  name: this.formEquipment.name
              })
              .then((res) => {
                  this.$message.success('设备名称修改成功');
                  for(let i=0;i<this.options.length;i++) {
                      if(this.options[i].id === res.data.id) {
                          this.options[i] = res.data;
                          this.formEquipment = res.data;
                          break;
                      }
                  }
              })
              .catch(()=>{})
          }
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
    // 改变设备
    changeDevice(e) {
        for(let i=0;i<this.options.length;i++) {
            if(this.options[i].id == e) {
                this.formEquipment = this.options[i];
                // 实时监测
                this.imgLoading = true;
                this.sdLoading = true;
                this.$http.get(`api/v1/security/dust?mn=${this.formEquipment.id}`)
                .then((res)=>{
                    this.handelSecurity(res);
                })
                .catch(()=>{})
                // 折线图
                this.$http.get('api/v1/security/dust_chart')
                .then((res) => {
                    this.dust_chart = res.data;
                })
                .catch(()=>{})
                break;
            }
        }
    },
    // 上传地图
    changeFile(res) {
        let _that = this;
        var reader = new FileReader();    
        reader.readAsDataURL(res.raw);
        reader.onloadend = function(e) {
            _that.imgLoading = true;
            let params = new FormData();
            params.append('img', res.raw);
            _that.$http.put('api/v1/security/dust_set/', params)
            .then((res) => {
                _that.imgLoading = false;
                _that.$message.success('地图上传成功');
                _that.mapPic = e.target.result;
            })
            .catch((err) => {
                _that.imgLoading = false;
            })
        }
    },
    beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return false;
    },
    equipmentSub() {
        this.equipmentLoading = true;
        this.$http.put('api/v1/security/dust_set/', this.form)
        .then((res) => {
            this.equipmentLoading = false;
            this.$message.success('标准值设置成功');
            this.showEquipmentVisible = false;
            this.handelSecurity(res);
        })
        .catch((err) => {
            this.equipmentLoading = false;
        })
    },
    gotoHistory() {
      this.$router.push("/Security/DustControlHistoryList");
    }
  },
  components: {
    lineEchart,
    'v-empty': empty
  }
};
</script>

<style lang="scss" scoped>
$colorSuccess: #67c23a;
$colorWarning: #e6a23c;
$colorDanger: #f56c6c;
$colorInfo: #909399;
::v-deep .el-table th>.cell {
    display: flex;
}
::v-deep .head-unit {
    &>span:nth-child(3) {
        font-size: 12px;
        color: #bbb;
    }
}
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
    min-height: 250px;
    .access-control-pic {
        width: 100%;

    }
  }
}
.formEquipment-table {
    min-height: 150px;
    &>div {
        margin-top: 20px;
        .device-label {
            width: 100px;
            display: inline-block;
            text-align: right;
        }
        .equipment-name-btn {
            margin-left: 20px;
        }
    }
    &>div:first-child {
        margin-top: 0;
    }
}
.weather_wrap {
  display: flex;
  flex-wrap: wrap;
  min-height: 250px;
}
.weather_item {
  display: flex;
  /* align-items: center; */
  min-width: 200px;
  margin-bottom: 20px;
  // max-width: 20%;
  .el-icon-s-flag {
    flex: none;
  }
  .security_icon {
      width: 50px;
      height: 50px;
      margin-right: 16px;
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
    min-height: 250px;
  .grid-item {
    height: 330px;
    position: relative;
  }
}
</style>