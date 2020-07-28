<template>
  <el-card shadow="never">
      <h3>账号信息</h3>
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :model="userInfo" label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="userInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-html="userInfo.name || '空'"></el-input>
          </el-form-item>
          <el-form-item label="员工ID">
            <el-input v-html="userInfo.staff_id || '空'"></el-input>
          </el-form-item>
          <el-form-item label="公司类型">
            <el-input v-html="userInfo.company_type || '空'"></el-input>
          </el-form-item>
          <el-form-item label="公司信息">
            <el-input v-html="userInfo.company || '空'"></el-input>
          </el-form-item>
          <el-form-item label="班组信息">
            <el-input v-html="userInfo.team || '空'"></el-input>
          </el-form-item>
          <el-form-item label="工种信息">
            <el-input v-html="userInfo.work_type || '空'"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <!-- <el-button>取消</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
          <img class="user_pic" src="" alt="">
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data: () => ({
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
    userInfo: {}
  }),
  created() {
      let userInfo = JSON.parse(localStorage.getItem('user_info'));
      this.userInfo = userInfo
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped>
.user_pic {
    width: 100px;
    height: 200px;
    background-color: aqua;
}
</style>