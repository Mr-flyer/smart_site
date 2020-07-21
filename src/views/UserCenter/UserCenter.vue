<template>
  <el-card shadow="never">
      <h3>账号信息</h3>
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="员工ID">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="公司类型">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="公司信息">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="班组信息">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="工种信息">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>-->
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
    }
  }),
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