<template>
  <div class="admin-manage main-content">
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
                <el-form-item label="性别">
                    <el-select v-model="formInline.gender" placeholder="请选择性别">
                        <el-option label="全部" value="shanghai"></el-option>
                        <el-option label="管理单位" value="shanghai"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入场日期">
                    <el-date-picker
                        v-model="formInline.einlass"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="离场日期">
                    <el-date-picker
                        v-model="formInline.leavingTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="是否关联实名">
                    <el-select v-model="formInline.isRelevance" placeholder="请选择是否关联实名">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="是" value="shanghai"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="select-btns"><el-button type="primary">查询</el-button><el-button>重置</el-button></div>
        </div>
        <div class="add-admin-btn">
            <el-button icon="el-icon-delete">删除</el-button>
            <el-button icon="el-icon-top-right" type="primary">导出</el-button>
        </div>
        <el-table
        :data="tableData"
        border
        style="width: 100%">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="序号"
                width="80">
                <template slot-scope="scope">{{scope.$index+1}}</template>
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
                prop="gender"
                label="性别"
                width="60">
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
                prop="isRelevance"
                label="关联实名"
                width="100">
            </el-table-column>
            <el-table-column
                    label="操作"
                    fixed="right"
                    width="140">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="dialogFormVisible = true">查看</el-button>
                        <el-button @click="dialogFormVisible = true" type="text" size="small">编辑</el-button>
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
            :total="100">
        </el-pagination>
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
                        accept="image/png,image/gif,image/jpg,image/jpeg">
                        <img v-if="form.head_img" :src="form.head_img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="人员ID">
                    <el-input v-model="form.staffId" placeholder="请输入人员ID"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form.gender" placeholder="请输入性别"></el-input>
                </el-form-item>
                <el-form-item label="身份证">
                    <el-input v-model="form.idCard" placeholder="请输入身份证"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.phone" placeholder="请输入联系方式"></el-input>
                </el-form-item>
                <div class="form-title">工作信息</div>
                <el-form-item label="单位名称">
                    <el-input v-model="form.company" placeholder="请输入单位名称"></el-input>
                </el-form-item>
                <el-form-item label="班组">
                    <el-select v-model="form.class" placeholder="请选择班组">
                        <el-option label="班组1" value="shanghai"></el-option>
                        <el-option label="班组2" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工种">
                    <el-select v-model="form.jobType" placeholder="请选择工种">
                        <el-option label="工种1" value="shanghai"></el-option>
                        <el-option label="工种2" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="form.role" placeholder="请选择角色">
                        <el-option label="超级管理员" value="shanghai"></el-option>
                        <el-option label="施工人员" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="进场时间">
                    <el-input v-model="form.einlass"></el-input>
                </el-form-item>
                <el-form-item label="离场时间">
                    <el-input v-model="form.leavingTime"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


  </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [
                    {
                        name: '张三',
                        staffId: 1,
                        gender: '男',
                        companyType: '管理单位',
                        companyName: '中国第一建筑公司',
                        role: '超级管理员',
                        class: '班组1',
                        jobType: '工种1',
                        createTime: '2020-09-09 12：00：00',
                        isRelevance: '是'
                    }
                ],
                currentPage: 1,
                formInline: {
                    user: '',
                    type: '',
                    company: '',
                    class: '',
                    jobType: '',
                    gender: '',
                    einlass: [],
                    leavingTime: [],
                    isRelevance: ''
                },
                dialogFormVisible: false,
                form: {
                    name: '',
                    staffId: '',
                    age: '',
                    gender: '',
                    idCard: '',
                    phone: '',
                    company: '',
                    class: '',
                    jobType: '',
                    head_img: require('../../../assets/head_img.jpg'),
                    role: '',
                    einlass: '',
                    leavingTime: ''
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
            changeFile(res) {
                let _that = this;
                this.file = res.raw;
                var reader = new FileReader();    
                reader.readAsDataURL(res.raw);
                reader.onloadend = function(e) {
                    _that.form.head_img = e.target.result;
                }
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                }
                return false;
            },
            // 删除人员
            delBtn() {
                this.$confirm('确定要删除此人员吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {});
            }
        }
    }
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