<template>
  <div class="admin-manage main-content">
        <el-page-header class="list-head" @back="goBack" content="历史记录">
        </el-page-header>
        <div class="real-name">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
                <el-form-item label="员工姓名">
                    <el-input v-model="formInline.user" placeholder="请输入员工姓名"></el-input>
                </el-form-item>
                <el-form-item label="单位类型">
                    <el-select v-model="formInline.type" placeholder="请选择单位类型">
                        <el-option label="全部" value="shanghai"></el-option>
                        <el-option label="管理单位" value="shanghai"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公司名称">
                    <el-input v-model="formInline.company" placeholder="请输入公司名称"></el-input>
                </el-form-item>
                <el-form-item label="班组">
                    <el-select v-model="formInline.class" placeholder="请选择班组">
                        <el-option label="全部" value="shanghai"></el-option>
                        <el-option label="管理单位" value="shanghai"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工种">
                    <el-select v-model="formInline.jobType" placeholder="请选择工种">
                        <el-option label="全部" value="shanghai"></el-option>
                        <el-option label="管理单位" value="shanghai"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出入类型">
                    <el-select v-model="formInline.type" placeholder="请选择出入类型">
                        <el-option label="全部" value="shanghai"></el-option>
                        <el-option label="管理单位" value="shanghai"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发生时间">
                    <el-date-picker
                        v-model="formInline.time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="门禁点">
                    <el-select v-model="formInline.address" placeholder="请选择门禁点">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="1号门" value="shanghai"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="real-name-btns"><el-button type="primary">查询</el-button><el-button>重置</el-button></div>
        </div>
        <div class="add-admin-btn">
            <el-button icon="el-icon-top-right" type="primary">导出</el-button>
        </div>
        <el-table
        :data="tableData"
        border
        style="width: 100%">
            <el-table-column
                label="序号"
                width="80">
                <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column
                prop="eventType"
                label="事件类型"
                width="100">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="100">
            </el-table-column>
            <el-table-column
                prop="staffId"
                label="员工ID">
            </el-table-column>
            <el-table-column
                prop="companyType"
                label="单位类型"
                width="180">
            </el-table-column>
            <el-table-column
                prop="companyName"
                label="单位名称">
            </el-table-column>
            <el-table-column
                prop="role"
                label="角色"
                width="150">
            </el-table-column>
            <el-table-column
                prop="class"
                label="班组"
                width="150">
            </el-table-column>
            <el-table-column
                prop="jobType"
                label="工种"
                width="180">
            </el-table-column>
            <el-table-column
                prop="time"
                label="发生时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="门禁点">
            </el-table-column>
            <el-table-column
                prop="type"
                label="出入类型"
                width="100px">
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
            :total="100">
        </el-pagination>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [
                    {
                        eventType: '人脸识别',
                        name: '张三',
                        staffId: 1,
                        gender: '男',
                        companyType: '管理单位',
                        companyName: '中国第一建筑公司',
                        role: '超级管理员',
                        class: '班组1',
                        jobType: '工种1',
                        time: '2020-09-09 12：00：00',
                        address: '1号门',
                        type: '出'
                    }
                ],
                currentPage: 1,
                formInline: {
                    user: '',
                    type: '',
                    company: '',
                    class: '',
                    jobType: '',
                    type: '',
                    time: [],
                    address: ''
                }
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            // 返回上一页
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .admin-manage {
        .list-head {
            margin-bottom: 24px;
        }
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
        .add-admin-btn {
            margin-bottom: 24px;
            display: flex;
            justify-content: flex-end;
            .admin-search {
                display: inline-flex;
            }
        }
        .admin-page {
            text-align: right;
            margin-top: 24px;
        }
        .staff-form {
            max-height: 500px;
            overflow: auto;
            position: relative;
            .form-title {
                font-weight: bold;
                padding:  6px 12px;
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