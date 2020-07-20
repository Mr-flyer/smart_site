<template>
  <div class="admin-manage main-content">
    <div class="real-name">
      <el-form
        :inline="true"
        :model="formInline"
        :rules="rules"
        ref="formInline"
        class="demo-form-inline"
        label-width="100px"
      >
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="formInline.name" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="单位类型" prop="company_type">
          <el-select v-model="formInline.company_type" placeholder="请选择单位类型">
            <el-option label="全部" :value="0"></el-option>
            <el-option
              v-for="(v, i) of initData.companyType"
              :key="i"
              :label="v.name"
              :value="v.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司名称" prop="company">
          <el-select v-model="formInline.company" placeholder="请选择单位">
            <el-option label="全部" :value="0"></el-option>
            <el-option v-for="(v, i) of initData.company" :key="i" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班组" prop="team">
          <el-select v-model="formInline.team" placeholder="请选择班组">
            <el-option label="全部" :value="0"></el-option>
            <el-option v-for="(v, i) of initData.team" :key="i" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工种" prop="work_type">
          <el-select v-model="formInline.work_type" placeholder="请选择工种">
            <el-option label="全部" :value="0"></el-option>
            <el-option v-for="(v, i) of initData.workType" :key="i" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formInline.sex" placeholder="请选择性别">
            <el-option v-for="(v, i) of initData.sex" :key="i" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入场日期" prop="into_time">
          <el-date-picker
            v-model="initData.into_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="离场日期" prop="leave_time">
          <el-date-picker
            v-model="initData.leave_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="是否关联实名" prop="is_real_name">
          <el-select v-model="formInline.is_real_name" placeholder="请选择是否关联实名">
              <el-option v-for="(v, i) of initData.is_real_name" :key="i" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="select-btns">
          <el-button type="primary" @click="submiteSearch">查询</el-button>
          <el-button @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="add-admin-btn">
      <el-button icon="el-icon-delete">删除</el-button>
      <el-button icon="el-icon-top-right" type="primary">导出</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="staff_id" label="员工ID"></el-table-column>
      <el-table-column prop="sex" label="性别" width="60" >
          <template slot-scope="scope">
              <span>{{scope.row.sex ? '女' : '男'}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="company_type" label="单位类型" width="180">
          <template slot-scope="scope">
              <span>{{typeof scope.row.company_type == 'number' ? initData.companyType.find(v=> v.id == scope.row.company_type).name : '暂未分配'}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="company" label="单位名称">
          <template slot-scope="scope">
              <span>{{typeof scope.row.company == 'number' ? initData.company.find(v=> v.id == scope.row.company).name : '暂未分配'}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="identity" label="角色" width="150">
          <template slot-scope="scope">
              <span>{{typeof scope.row.identity == 'number' ? initData.identity.find(v=> v.id == scope.row.identity).name : '暂未分配'}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="team" label="班组" width="150">
          <template slot-scope="scope">
              <span>{{typeof scope.row.team == 'number' ? initData.team.find(v=> v.id == scope.row.team).name : '暂未分配'}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="work_type" label="工种" width="180">
          <template slot-scope="scope">
              <span>{{typeof scope.row.work_type == 'number' ? initData.workType.find(v=> v.id == scope.row.work_type).name : '暂未分配'}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="is_real_name" label="关联实名" width="100">
          <template slot-scope="scope">
              <span>{{typeof scope.row.company_type == 'number' ? '是' : '否'}}</span>
          </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="140">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogFormVisible = true">查看</el-button>
          <el-button @click="showEditStaffInfo(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click="delBtn" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
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
    <el-dialog title="员工详情" :visible.sync="dialogFormVisible" width="720px">
      <el-form class="staff-form" :model="form" label-width="150px">
        <div class="form-title">员工信息</div>
        <el-form-item class="form-head-img">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile"
            :before-upload="beforeAvatarUpload"
            accept="image/png, image/gif, image/jpg, image/jpeg"
          >
            <img v-if="form.head_img" :src="form.head_img" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="人员ID">
          <el-input v-model="form.staff_id" placeholder="请输入人员ID"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option v-for="(v, i) of initData.sex" :key="i" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="form.identity_id" placeholder="请输入身份证"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.phone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <div class="form-title">工作信息</div>
        <el-form-item label="单位名称">
          <el-select v-model="form.company" placeholder="请选择性别">
            <el-option v-for="(v, i) of initData.company" :key="i" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班组">
          <el-select v-model="form.team" placeholder="请选择班组">
            <el-option v-for="(v, i) of initData.team" :key="i" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工种">
          <el-select v-model="form.work_type" placeholder="请选择工种">
            <el-option v-for="(v, i) of initData.workType" :key="i" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.identity" placeholder="请选择角色">
            <el-option v-for="(v, i) of initData.identity" :key="i" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="进场时间">
          <el-input v-html="form.einlass"></el-input>
        </el-form-item>
        <el-form-item label="离场时间">
          <el-input v-html="form.leavingTime"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editStaffInfo">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  data() {
    return {
      tableData: [
        {
          name: "张三",
          staffId: 1,
          gender: "男",
          companyType: "管理单位",
          companyName: "中国第一建筑公司",
          role: "超级管理员",
          class: "班组1",
          jobType: "工种1",
          createTime: "2020-09-09 12：00：00",
          isRelevance: "是"
        }
      ],
      currentPage: 1,
      formInline: {
        name: "",
        company_type: 0,
        company: 0,
        team: 0,
        work_type: 0,
        sex: 0,
        // into_time: [],
        // leave_time: [],
        is_real_name: 0
      },
      dialogFormVisible: false,
      form: {
        name: "",
        staff_id: "",
        age: "",
        sex: "",
        identity_id: "",
        phone: "",
        company: "",
        team: "",
        work_type: "",
        identity: "",
        // einlass: "",
        // leavingTime: "",
        // head_img: require("../../../assets/head_img.jpg"),
      },
      rules: {},
      initData: {
        companyType: [],
        company: [],
        team: [],
        workType: [],
        sex: [
            { id: 0, name: "男" },
          { id: 1, name: "女" }
        ],
        is_real_name: [
            { id: 0, name: "否"},
          { id: 1, name: "是"}
        ],
        identity: [
            { id: 0, name: "管理人员"},
            { id: 1, name: "施工人员"},
        ],
        leave_time: [],
        into_time: []
      }
    };
  },
  created() {
    // return false;
    this.$http.get("api/v1/user/company_type/").then(({ data }) => {
      //   console.log("单位类型", data);
      this.initData.companyType = data;
    });
    this.$http.get("api/v1/user/company/").then(({ data }) => {
      //   console.log("单位名称", data);
      this.initData.company = data;
    });
    this.$http.get("api/v1/user/team/").then(({ data }) => {
      //   console.log("班组", data);
      this.initData.team = data;
    });
    this.$http.get("api/v1/user/work_type/").then(({ data }) => {
        // console.log("工种", data);
      this.initData.workType = data;
    });
    // return false;
    this.$http.get("api/v1/security/user/").then(({ data }) => {
    //   console.log(data);
        setTimeout(() => {
            this.tableData = data
        }, 1000)
    });
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    changeFile(res) {
      let _that = this;
      this.file = res.raw;
      var reader = new FileReader();
      reader.readAsDataURL(res.raw);
      reader.onloadend = function(e) {
        _that.form.head_img = e.target.result;
      };
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return false;
    },
    // 删除人员
    delBtn() {
      this.$confirm("确定要删除此人员吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    },
    // 搜索人员列表
    submiteSearch() {
      //   console.log(this.formInline);
      this.formInline.start_into_time = dayjs(this.initData.into_time[0]).format('YYYY-MM-DD')
      this.formInline.end_into_time = dayjs(this.initData.into_time[1]).format('YYYY-MM-DD')
      this.formInline.start_leave_time = dayjs(this.initData.leave_time[0]).format('YYYY-MM-DD')
      this.formInline.end_leave_time = dayjs(this.initData.leave_time[1]).format('YYYY-MM-DD')
      this.$message(`搜索字段序列==${JSON.stringify(this.formInline)}`);
      console.log(this.formInline);
      this.$http.get("api/v1/security/user/", this.formInline).then(({ data }) => {
        console.log(data);
      });
    },
    // 重置搜索
    resetForm(formName) {
      console.log("重置", this.$refs[formName].resetFields);
      this.$refs[formName].resetFields();
    },
    showEditStaffInfo(id) {
        console.log(id);
        this.$http.get(`api/v1/security/user/${id}`)
        .then(({data}) => {
            console.log(data);
            this.form = data
            this.dialogFormVisible = true
        })
    },
    // 编辑员工信息
    editStaffInfo() {
        console.log("编辑员工信息", this.form);
        // this.dialogFormVisible = false
        this.$http.patch(`api/v1/security/user/${this.form.id}`, this.form)
        .then(res => {
            // console.log(res);
            this.dialogFormVisible = false
            this.$message({
                type: 'success',
                message: '编辑成功！'
            })
        })
    }
  }
};
</script>
<style lang="scss" scoped>
.admin-manage {
  .real-name {
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 16px;
    box-sizing: border-box;
    margin-bottom: 16px;
    ::v-deep .el-input input {
      width: 180px;
    }
    .real-name-btns {
      width: 100%;
      text-align: right;
    }
  }
  .staff-form {
    max-height: 500px;
    overflow: auto;
    position: relative;
    .form-title {
      font-weight: bold;
      padding: 6px 12px;
      box-sizing: border-box;
      background-color: #eee;
      margin-bottom: 12px;
    }
    ::v-deep .el-input input {
      width: 180px;
    }
    ::v-deep .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .form-head-img {
      position: absolute;
      right: 60px;
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
}
</style>