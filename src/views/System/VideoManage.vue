<template>
    <div class="video-manage" v-loading="isLoading">
        <div class="add-video-btn">
            <el-button icon="el-icon-plus" type="primary" @click="dialogFormVisible = true">新增视频</el-button>
        </div>
        <el-table
        :data="tableData"
        border
        style="width: 100%">
            <el-table-column
                prop="areaName"
                label="视频区域名称">
            </el-table-column>
            <el-table-column
                prop="name"
                label="视频">
            </el-table-column>
            <el-table-column
                prop="sort"
                label="排序"
                width="120">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width="120">
            </el-table-column>
            <el-table-column
                prop="startTime"
                label="开始时间"
                width="150">
            </el-table-column>
            <el-table-column
                prop="endTime"
                label="结束时间"
                width="150">
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right"
                width="180">
                <template slot-scope="scope">
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small">预览</el-button>
                    <el-button @click="offlineBtn" type="text" size="small">下线</el-button>
                    <el-button @click="delBtn" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="video-page"
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="20"
            layout="prev, pager, next, jumper"
            :total="count">
        </el-pagination>
        <el-dialog title="新增视频" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="from" label-width="140px">
                <el-form-item 
                    prop="areaName"
                    label="视频区域名称"
                    :rules="{ required: true, message: '视频区域名称不能为空', trigger: 'blur' }">
                    <el-select v-model="form.areaName" placeholder="请选择视频区域名称">
                        <el-option label="项目模型" :value="0"></el-option>
                        <el-option label="项目实景" :value="1"></el-option>
                        <el-option label="视频监控" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="video"
                    label="视频"
                    :rules="{ required: true, message: '视频不能为空', trigger: 'blur' }">
                    <el-upload
                        class="upload-demo"
                        action="#"
                        accept="video/*"
                        :show-file-list="false"
                        :on-change="changeFile"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="form-tips">只能上传MP4格式文件</div>
                    </el-upload>
                </el-form-item>
                <el-form-item
                    prop="sort"
                    label="排序"
                    :rules="{ required: true, message: '视频不能为空', trigger: 'blur' }">
                    <el-select v-model="form.sort" placeholder="请选择视频排序">
                    <el-option v-for="item in 5" :key="item" :label="item" value="shanghai"></el-option>
                    </el-select>
                    <div class="form-tips">注：排序值越小，排序越靠前，如1、2、3，1排序最前面，如排序值相同，则先添加的靠前）</div>
                </el-form-item>
                <el-form-item 
                    prop="status"
                    label="状态"
                    :rules="{ required: true, message: '请选择视频状态', trigger: 'blur' }">
                    <el-select v-model="form.status" placeholder="请选择视频状态">
                    <el-option label="正常" :value="true"></el-option>
                    <el-option label="下线" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item 
                    prop="startTime"
                    label="开始时间"
                    :rules="{ required: true, message: '请选择开始时间', trigger: 'blur' }">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime"></el-date-picker>
                    <div class="form-tips">若视频当前的状态为下线，等到开始时间则自动变为上线</div>
                </el-form-item>
                <el-form-item 
                    prop="endTime"
                    label="结束时间"
                    :rules="{ required: true, message: '请选择结束时间', trigger: 'blur' }">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit('from')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isLoading: false,
                tableData: [],
                count: 0,
                currentPage: 1,
                dialogFormVisible: false,
                form: {
                    areaName: '',
                    video: '',
                    sort: '',
                    status: true,
                    startTime: '',
                    endTime: ''
                },
                fileList: []
            }
        },
        created() {
            this.isLoading = true;
            this.$http.get('api/v1/system/video/')
            .then((res)=>{
                this.isLoading = false;
                this.count = res.count;
                this.tableData = res.data;
            })
            .catch(()=>{})
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            changeFile(file, fileList) {
                console.log(file)
                // let _that = this;
                // var reader = new FileReader();    
                // reader.readAsDataURL(file.raw);
                // reader.onloadend = function(e) {
                //     _that.form.video = e.target.result;
                // }
            },
            // 下线视频
            offlineBtn() {
                this.$confirm('确定要下线此视频吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '下线成功!'
                    });
                }).catch(() => {});
            },
            // 删除视频
            delBtn() {
                this.$confirm('确定要删除此视频吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {});
            },
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {}
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .video-manage {
        .add-video-btn {
            text-align: right;
            margin-bottom: 24px;
        }
        .video-page {
            text-align: right;
            margin-top: 24px;
        }
        .form-tips {
            font-size: 12px;
            color: #88B;
            margin-top: 10px;
        }
        ::v-deep .el-form-item__content {
            line-height: 16px;
        }
    }
</style>