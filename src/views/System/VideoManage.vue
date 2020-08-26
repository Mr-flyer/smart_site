<template>
    <div class="video-manage" v-loading="isLoading">
        <div class="add-video-btn">
            <el-button icon="el-icon-plus" type="primary" @click="addVideo">新增视频</el-button>
        </div>
        <el-table
        :data="tableData"
        border
        style="width: 100%">
            <el-table-column
                prop="area_display"
                label="视频区域名称"
                width="150px">
            </el-table-column>
            <el-table-column
                prop="video_name"
                label="视频">
            </el-table-column>
            <el-table-column
                prop="seq"
                label="排序"
                width="120">
            </el-table-column>
            <el-table-column
                label="状态"
                width="120">
                <template slot-scope="scope">
                    <div :class="scope.row.is_show?'green':'red'">{{scope.row.is_show?'上线':'下线'}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="start_time"
                label="开始时间"
                width="150">
            </el-table-column>
            <el-table-column
                prop="end_time"
                label="结束时间"
                width="150">
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right"
                width="180">
                <template slot-scope="scope">
                    <el-button @click="editVideo(scope.row, scope.$index)" type="text" size="small">编辑</el-button>
                    <el-button @click="videoPreView(scope.row)" type="text" size="small">预览</el-button>
                    <el-button @click="offlineBtn(scope.row)" type="text" size="small">{{scope.row.is_show?'下线':'上线'}}</el-button>
                    <el-button @click="delBtn(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="video-page"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="20"
            layout="sizes, prev, pager, next, jumper"
            :total="count">
        </el-pagination>
        <el-dialog :title="isEdit?'编辑视频':'新增视频'" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" label-width="140px" v-loading="videoLoading">
                <el-form-item 
                    prop="area"
                    label="视频区域名称"
                    :rules="{ required: true, message: '视频区域名称不能为空', trigger: 'blur' }">
                    <el-select v-model="form.area" placeholder="请选择视频区域名称">
                        <el-option :label="item.name" :value="item.value" :key="item.value" v-for="item in videoArea"></el-option>
                        <!-- <el-option label="项目实景" :value="1"></el-option>
                        <el-option label="视频监控" :value="2"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item
                    v-show="form.area === 1 || form.area === 0"
                    prop="video"
                    label="视频"
                    :rules="{ required: form.area===0 || form.area===1, message: '视频不能为空', trigger: 'blur' }">
                    <el-upload
                        class="upload-demo"
                        action="#"
                        accept="video/mp4"
                        :show-file-list="false"
                        :on-change="changeFile">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="form-tips">只能上传MP4格式文件</div>
                        <div slot="tip">{{fileName}}</div>
                    </el-upload>
                </el-form-item>
                <el-form-item 
                    v-show="form.area === 2"
                    prop="monitor_id"
                    label="监控展示"
                    :rules="{ required: form.area===2, message: '监控展示不能为空', trigger: 'blur' }">
                    <el-tree
                        :data="data"
                        show-checkbox
                        node-key="id"
                        ref="monitor"
                        check-strictly
                        @check="getMonitor"
                        :props="defaultProps">
                    </el-tree>
                </el-form-item>
                <el-form-item
                    prop="sort"
                    label="排序"
                    :rules="{ required: true, message: '视频排序不能为空', trigger: 'blur' }">
                    <el-select v-model="form.sort" placeholder="请选择视频排序">
                    <el-option v-for="item in 5" :key="item" :label="item" :value="item"></el-option>
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
                    :rules="{ required: form.area === 0 || form.area === 1, message: '请选择开始时间', trigger: 'blur' }">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime"></el-date-picker>
                    <div class="form-tips">若视频当前的状态为下线，等到开始时间则自动变为上线</div>
                </el-form-item>
                <el-form-item 
                    prop="endTime"
                    label="结束时间"
                    :rules="{ required: form.area === 0 || form.area === 1, message: '请选择结束时间', trigger: 'blur' }">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit('form')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="视频预览" :visible.sync="showVideo" width="940px" @close="closeVideoPreView">
            <video :src="videoSrc" autoplay width="900" height="500" controls="controls">
                您的浏览器不支持 video 标签。
            </video>
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
                pagesize: 20,
                dialogFormVisible: false,
                form: {
                    area: '',
                    video: '',
                    sort: '',
                    status: true,
                    startTime: '',
                    endTime: '',
                    monitor_id: []
                },
                fileName: '',
                videoLoading: false,
                videoArea: [
                    {name: '模拟进度', value: 0},
                    {name: '项目实景', value: 1},
                    {name: '视频监控', value: 2}
                ],
                isEdit: false,
                tableIndex: 0,
                showVideo: false,
                videoSrc: '',
                data: [{
                    id: 1,
                    label: '区域1',
                    children: [{
                        id: 1,
                        label: '停车场',
                        children: [{
                            id: 7,
                            label: '监控1'
                        }, {
                            id: 8,
                            label: '监控2'
                        }]
                    },{
                        id: 2,
                        label: '消防通道',
                        children: [{
                            id: 9,
                            label: '监控1'
                        }, {
                            id: 10,
                            label: '监控2'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        created() {
            this.pagesize = this.pageSize;
            this.requestInfo(1);
        },
        methods: {
            requestInfo(val) {
                this.currentPage = val;
                this.isLoading = true;
                this.$http.get(`api/v1/system/video/?page=${this.currentPage}&page_size=${this.pagesize}`)
                .then((res)=>{
                    this.isLoading = false;
                    this.count = res.count;
                    this.tableData = res.data;
                })
                .catch(()=>{})
            },
            handleCurrentChange(val) {
                this.$store.commit('timeStamp', Date.parse(new Date()));
                this.requestInfo(val);
            },
            handleSizeChange(val) {
                this.pagesize = val;
                this.$store.commit('timeStamp', Date.parse(new Date()));
                this.requestInfo(1);
            },
            getMonitor(val) {
                let res = this.$refs.monitor.getCheckedKeys();
                this.form.monitor_id = res;
            },
            // 新增视频
            addVideo() {
                this.dialogFormVisible = true;
                this.isLoading = false;
                this.fileName = '';
                this.isEdit = false;
                this.$nextTick(() => {
                    this.form = {
                        area: '',
                        video: '',
                        sort: '',
                        status: true,
                        startTime: '',
                        endTime: '',
                        monitor_id: []
                    }
                    this.$refs.form.resetFields();
                    this.$refs.monitor.setCheckedKeys([]);
                })
            },
            changeFile(file) {
                this.fileName = file.raw.name;
                this.form.video = file.raw;
            },
            // 编辑
            editVideo(item, index) {
                this.isEdit = true;
                this.dialogFormVisible = true;
                this.tableIndex = index;
                this.form = {
                    id: item.id,
                    area: item.area,
                    video: item.video,
                    status: item.is_show,
                    sort: item.seq,
                    startTime: item.start_time,
                    endTime: item.end_time,
                    monitor_id: item.monitor_id
                }
                this.fileName = item.video_name;
                this.$nextTick(()=>{
                    this.$refs.form.clearValidate();
                })
            },
            // 视频预览
            videoPreView(item) {
                this.videoSrc = item.video;
                this.showVideo = true;
            },
            // 关闭视频预览
            closeVideoPreView() {
                this.videoSrc = '';
            },
            // 下线视频
            offlineBtn(item) {
                if(item.is_show) {   //上线
                    this.$confirm('确定要下线此视频吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.isLoading = true;
                        this.$http.patch(`api/v1/system/video/${item.id}`, {
                            is_show: false
                        })
                        .then((res)=>{
                            this.isLoading = false;
                            item.is_show = false;
                            this.$message.success("下线成功");
                        })
                        .catch(()=>{
                            this.isLoading = false;
                        })
                    }).catch(() => {});
                }else {
                    this.$confirm('确定要上线此视频吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.isLoading = true;
                        this.$http.patch(`api/v1/system/video/${item.id}`, {
                            is_show: true
                        })
                        .then((res)=>{
                            this.isLoading = false;
                            item.is_show = true;
                            this.$message.success("下线成功");
                        })
                        .catch(()=>{
                            this.isLoading = false;
                        })
                    }).catch(() => {});
                }
            },
            // 删除视频
            delBtn(item) {
                this.$confirm('确定要删除此视频吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.isLoading = true;
                    this.$http.delete(`api/v1/system/video/${item.id}`)
                    .then((res)=>{
                        this.isLoading = false;
                        this.$message.success("删除成功");
                        this.requestInfo(1);
                    })
                    .catch(()=>{
                        this.isLoading = false;
                    })
                }).catch(() => {});
            },
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.form.area === 2) {
                            if(this.form.monitor_id.length > 2) {
                                this.$message.warning('视频监控展示最多只能选择2个');
                                return false;
                            }
                        }
                        this.videoLoading = true;
                        let param = new FormData();
                        param.append('area', this.form.area);
                        if(typeof this.form.video === "object") {
                            param.append('video', this.form.video);
                        }
                        param.append('start_time', this.form.startTime ? this.common.YMD(Date.parse(this.form.startTime)/1000) : '');
                        param.append('end_time', this.form.endTime ? this.common.YMD(Date.parse(this.form.endTime)/1000) : '');
                        param.append('seq', this.form.sort);
                        param.append('is_show', this.form.status);
                        if(this.form.monitor_id && this.form.monitor_id.length > 0) {
                            param.append('monitor_id', this.form.monitor_id);
                        }
                        if(this.isEdit) {
                            this.$http.put(`api/v1/system/video/${this.form.id}`, param)
                            .then((res)=>{
                                this.videoLoading = false;
                                this.dialogFormVisible = false;
                                this.$message.success('视频修改成功');
                                this.tableData[this.tableIndex] = res.data;
                            })
                            .catch(()=>{
                                this.videoLoading = false;
                            })
                        }else {
                            this.$http.post('api/v1/system/video/', param)
                            .then((res)=>{
                                this.videoLoading = false;
                                this.dialogFormVisible = false;
                                this.$message.success('视频添加成功');
                                this.tableData.unshift(res.data);
                            })
                            .catch(()=>{
                                this.videoLoading = false;
                            })
                        }
                    }
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
        ::v-deep .el-tree-node {
            .is-leaf + .el-checkbox .el-checkbox__inner {
                display: inline-block;
            }
            .el-checkbox .el-checkbox__inner {
                display: none;
            }
        }
        ::v-deep .el-tree {
            margin-top: 6px;
        }
    }
</style>