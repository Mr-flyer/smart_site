<template>
    <div class="video-manage">
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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 30, 40, 50]"
            :page-size="20"
            layout="sizes, prev, pager, next, jumper"
            :total="100">
        </el-pagination>
        <el-dialog title="新增视频" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="140px">
                <el-form-item label="视频区域名称">
                    <el-select v-model="form.areaName" placeholder="请选择视频区域名称">
                    <el-option label="项目模型" value="shanghai"></el-option>
                    <el-option label="项目实景" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="视频">
                    <el-upload
                        class="upload-demo"
                        action="#"
                        accept="video/*"
                        :on-change="handleChange"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="form-tips">只能上传MP4格式文件</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="排序">
                    <el-select v-model="form.sort" placeholder="请选择视频排序">
                    <el-option v-for="item in 5" :key="item" :label="item" value="shanghai"></el-option>
                    </el-select>
                    <div class="form-tips">注：排序值越小，排序越靠前，如1、2、3，1排序最前面，如排序值相同，则先添加的靠前）</div>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.status" placeholder="请选择视频状态">
                    <el-option label="正常" value="shanghai"></el-option>
                    <el-option label="下线" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime"></el-date-picker>
                    <div class="form-tips">若视频当前的状态为下线，等到开始时间则自动变为上线</div>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime"></el-date-picker>
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
                        areaName: '项目模型',
                        name: '项目模型1.mp4',
                        sort: '1',
                        status: '正常',
                        startTime: '2016-05-02',
                        endTime: '2016-06-02'
                    },
                    {
                        areaName: '项目模型',
                        name: '项目模型1.mp4',
                        sort: '1',
                        status: '正常',
                        startTime: '2016-05-02',
                        endTime: '2016-06-02'
                    }
                ],
                currentPage: 1,
                dialogFormVisible: false,
                form: {
                    areaName: '',
                    video: '',
                    sort: '',
                    status: '',
                    startTime: '',
                    endTime: ''
                },
                fileList: []
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-3);
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