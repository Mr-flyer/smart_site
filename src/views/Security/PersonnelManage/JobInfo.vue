<template>
  <div class="job-info">
    <div class="job-info-head">
      <span class="job-info-title">
        <span>今日实时数据</span>更新时间：2020-07-09 17:21:20
      </span>
      <i class="el-icon-refresh"></i>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>
              统计选择：
              <el-select v-model="countSelect" @change="changeCount">
                <el-option label="人员总况" :value="0"></el-option>
                <el-option label="施工单位总况" :value="1"></el-option>
                <el-option label="管理人员总况" :value="2"></el-option>
              </el-select>
            </span>
          </div>
          <div class="text item count-ul" v-show="countSelect === 0">
            <span class="count-item" v-for="(site, key) in countList" :key="key">
              <span>
                <div class="count-item-head">{{key}}</div>
                <div class="count-item-main">
                  <span
                    class="sum-person"
                    :style="{color: site.color}"
                  >{{ key === '出勤率' && site.manage && site.shigong ? (site.manage + site.shigong) / 2 : site.manage + site.shigong }}{{key!=='出勤率'?'人': '%'}}</span>
                  <span class="person-explan">
                    <div>
                      管理单位
                      <span :style="{color: site.color}">{{site.manage}}{{key!=='出勤率'?'人': '%'}}</span>
                    </div>
                    <div>
                      施工单位
                      <span
                        :style="{color: site.color}"
                      >{{site.shigong}}{{key!=='出勤率'?'人': '%'}}</span>
                    </div>
                  </span>
                </div>
              </span>
            </span>
          </div>
          <!-- 公司列表 -->
          <div class="text item count-ul" v-show="countSelect === 1 || countSelect === 2">
            <el-table :data="tableData" border style="width: 100%" height="250">
              <el-table-column fixed prop="name" label="公司名称"></el-table-column>
              <el-table-column prop="scene_count" label="现场人数" width="100"></el-table-column>
              <el-table-column prop="total_count" label="应到人数" width="100"></el-table-column>
              <el-table-column prop="difference" label="差额" width="100"></el-table-column>
              <el-table-column label="出勤率" width="80" #default="scope">
                <div
                  :class="scope.row.percentage*100>=100? 'green':'red'"
                >{{Math.round(scope.row.percentage*100)}}%</div>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>
              统计图选择：
              <el-select v-model="countPicSelect" v-show="countSelect===0">
                <el-option label="人员总况分析图" :value="0"></el-option>
              </el-select>
              <el-select v-model="countPicSelect" v-show="countSelect===1">
                <el-option label="现场人员公司分布图" :value="0"></el-option>
                <el-option label="施工单位人员总况图" :value="1"></el-option>
                <el-option label="施工单位管理人员总况图" :value="2"></el-option>
              </el-select>
              <el-select v-model="countPicSelect" v-show="countSelect===2">
                <el-option label="现场人员公司分布图" :value="0"></el-option>
                <el-option label="管理单位人员总况图" :value="1"></el-option>
              </el-select>
            </span>
          </div>
          <div class="text item">
            <v-barChart v-if="countSelect === 0 && countPicSelect === 0" class="echart" :infoData="personnelData"></v-barChart>
            <v-pieChart v-if="countSelect === 1 && countPicSelect === 0" class="echart" :infoData="companyData"></v-pieChart>
            <v-barChart v-if="countSelect === 1 && countPicSelect === 1" class="echart" :infoData="[]"></v-barChart>
            <v-barChart v-if="countSelect === 1 && countPicSelect === 2" class="echart" :infoData="[]"></v-barChart>
            <v-pieChart v-if="countSelect === 2 && countPicSelect === 0" class="echart" :infoData="[]"></v-pieChart>
            <v-barChart v-if="countSelect === 2 && countPicSelect === 1" class="echart" :infoData="[]"></v-barChart>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="job-table">
      <div class="job-info-head">
        <span class="job-info-title">
          <span>历史数据</span>
        </span>
      </div>
      <div class="real-name">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
          <el-form-item label>
            <el-input v-model="formInline.user" placeholder="请输入员工姓名、员工ID"></el-input>
          </el-form-item>
          <el-form-item label="施工单位">
            <el-select v-model="formInline.constructionUnit" placeholder="请选择施工单位">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="管理单位" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="formInline.department" placeholder="请输入部门"></el-input>
          </el-form-item>
          <el-form-item label="工种">
            <el-select v-model="formInline.jobType" placeholder="请选择工种">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="管理单位" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否在岗">
            <el-select v-model="formInline.isOnJob" placeholder="请选择是否在岗">
              <el-option label="全部" value></el-option>
              <el-option label="是" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="select-btns">
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </div>
      </div>
    </div>
    <div class="add-admin-btn">
      <el-button icon="el-icon-top-right" type="primary">导出</el-button>
    </div>
    <el-table :data="historyList" border style="width: 100%">
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <!-- <el-table-column prop="id" label="员工ID" width="150"></el-table-column> -->
      <el-table-column prop="sex" label="性别" width="60"></el-table-column>
      <el-table-column prop="company_type_name" label="单位类型" width="180"></el-table-column>
      <el-table-column prop="company_name" label="单位名称"></el-table-column>
      <el-table-column prop="role" label="角色" width="150"></el-table-column>
      <el-table-column prop="team_name" label="班组" width="150"></el-table-column>
      <el-table-column prop="work_type_name" label="工种" width="180"></el-table-column>
      <el-table-column prop="in_scene" label="是否在岗" width="100"></el-table-column>
      <el-table-column prop="into_time" label="进场时间"></el-table-column>
      <el-table-column prop="leave_time" label="出场时间"></el-table-column>
    </el-table>
    <el-pagination
      class="admin-page"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 30, 40, 50]"
      :page-size="20"
      layout="sizes, prev, pager, next, jumper"
      :total="100"
    ></el-pagination>
  </div>
</template>
<script>
import barChart from "@/components/BarChart";
import pieChart from "@/components/PieChart";
import dayjs from 'dayjs';
export default {
  components: {
    "v-barChart": barChart,
    "v-pieChart": pieChart
  },
  data() {
    return {
      countSelect: 0,
      countSelectItems: ["total", "shigong", "manage"],
      countPicSelect: 0,
      countList: {
        现场人数: {
          manage: 10,
          shigong: 490,
          color: "#70B603"
        },
        应到人数: {
          manage: 10,
          shigong: 490,
          color: "#F59A23"
        },
        差额: {
          manage: 10,
          shigong: 490,
          color: "#D9001B"
        },
        出勤率: {
          manage: 10.2,
          shigong: 50.1,
          color: "#02A7F0"
        }
      },
      tableData: [
        {
          company: "中国第一建筑有限公司",
          sitePerson: 100,
          arrivePerson: 101,
          difference: 10,
          attendance: "90%"
        }
      ],
      formInline: {
        user: "",
        constructionUnit: "",
        department: "",
        jobType: "",
        isOnJob: ""
      },
      historyList: [
        {
          name: "张三",
          staffId: 1,
          gender: "男",
          companyType: "管理单位",
          companyName: "中国第一建筑公司",
          role: "超级管理员",
          class: "班组1",
          jobType: "工种1",
          isOnJob: "是",
          einlass: "2020-03-04 09:00:00",
          leavingTime: "2020-03-04 09:00:00"
        }
      ],
      currentPage: 1,
      personnelData: [],
      companyData: []
    };
  },
  created() {
    this.initCountSelect(this.countSelectItems[this.countSelect]);
    this.initHistory()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    changeCount(val) {
      this.initCountSelect(this.countSelectItems[val]);
      this.countPicSelect = 0;
    },
    // 统计选择
    initCountSelect(type) {
      this.$http.get(`api/v1/security/scene?type=${type}`).then(({ data }) => {
        switch (type) {
          case "total":
            let manageObj = data.data.find(v => v.name === "施工单位");
            let shigongObj = data.data.find(v => v.name !== "施工单位") || {};
            this.countList = {
              现场人数: {
                manage: manageObj.scene_count,
                shigong: shigongObj.scene_count || 0,
                color: "#70B603"
              },
              应到人数: {
                manage: manageObj.total_count,
                shigong: shigongObj.total_count || 0,
                color: "#F59A23"
              },
              差额: {
                manage: manageObj.difference,
                shigong: shigongObj.difference || 0,
                color: "#D9001B"
              },
              出勤率: {
                manage: manageObj.percentage * 100,
                shigong: shigongObj.percentage * 100 || 0,
                color: "#02A7F0"
              }
            };
            this.setEchartPersonnel(this.countList)
            break;
          case "shigong":
            this.tableData = data.data;
            this.companyData = data.data.map(v => ({
                name: v.name,
                value: v.scene_count,
            }))
            break;
          case "manage":
            this.tableData = data.data;
            break;
        }
      });
    },
    // 设置人员总况图
    setEchartPersonnel(data) {
        let manageArr = [], shigongArr = [], totalArr=[]
        for (const item of Object.values(data)) {
            manageArr.push(item.manage)
            shigongArr.push(item.shigong)
            totalArr.push(item.manage + item.shigong)
        }
      let tagetData = [
        ["product", "应到人数", "现场人数", "差额", "出勤率"],
        ["总", ...totalArr],
        ["管理单位", ...manageArr],
        ["施工单位", ...shigongArr]
      ];
      this.personnelData = tagetData
    },
    // 在岗信息历史数据
    initHistory() {
        this.$http.get(`api/v1/security/history`)
        .then(({data, count}) => {
          data.forEach(el => {
            el.into_time = dayjs(el.into_time).isValid() ? dayjs(el.into_time).format('YY-MM-DD hh:mm:ss') : '--'
            el.leave_time = dayjs(el.leave_time).isValid() ? dayjs(el.leave_time).format('YY-MM-DD hh:mm:ss') : '--'
          });
            this.historyList = data
        })
    }
  }
};
</script>
<style lang="scss" scoped>
.job-info {
  .job-table {
    margin: 20px 0;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 20px;
  }
  .job-info-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .job-info-title {
      & > span {
        font-size: 16px;
        font-weight: bold;
        margin-right: 24px;
      }
    }
    & > i {
      font-size: 22px;
      cursor: pointer;
    }
  }
  .count-select {
    display: flex;
    align-items: center;
  }
  .count-ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .green {
      color: #70b603;
    }
    .red {
      color: #d9001b;
    }
    & > span:nth-child(2n-1) {
      padding-right: 10px;
      box-sizing: border-box;
    }
    & > span:nth-child(2n) {
      padding-left: 10px;
      box-sizing: border-box;
    }
    & > span:nth-child(1),
    & > span:nth-child(2) {
      margin: 0;
    }
    .count-item {
      width: 50%;
      margin-top: 20px;
      & > span {
        width: 100%;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        display: inline-block;
        .count-item-head {
          border-bottom: 1px solid #e5e5e5;
          padding: 8px 12px;
          box-sizing: border-box;
        }
        .count-item-main {
          display: flex;
          align-items: center;
          flex-direction: row;
          .sum-person {
            font-size: 20px;
            font-weight: bold;
            padding: 0 12px;
            box-sizing: border-box;
          }
          .person-explan {
            border-left: 1px solid #e5e5e5;
            box-sizing: border-box;
            flex: 1;
            & > div {
              padding: 12px;
              box-sizing: border-box;
              border-bottom: 1px solid #e5e5e5;
              width: 100%;
              font-size: 16px;
              & > span {
                font-weight: bold;
                margin-left: 12px;
              }
            }
            & > div:last-child {
              border: 0;
            }
          }
        }
      }
    }
  }
  .echart {
    width: 100%;
    height: 250px;
  }
}
</style>