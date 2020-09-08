<template>
    <div v-loading="isLoading">
        <el-row :gutter="20">
            <el-col :span="16">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix access-control-head">
                        <span>门禁状态</span>
                        <div class="access-control-op">
                            <div class="access-control-icons">
                                <div><img src="../../../assets/open_door.png"/>开门</div>
                                <div><img src="../../../assets/close_door.png"/>关门</div>
                                <div><img src="../../../assets/c_open_door.png"/>常开</div>
                                <div><img src="../../../assets/c_close_door.png"/>常关</div>
                            </div>
                            <i class="el-icon-refresh"></i>
                        </div>
                    </div>
                    <div class="text item access-controls">
                        <div class="access-control-item" v-for="(item, $index) in AccessControlList">
                            <img @click="accessControlItem($index)" :class="activeIndex === $index?'img-active':''" v-if="item.status==0" src="../../../assets/c_close_door.png"/>
                            <img @click="accessControlItem($index)" :class="activeIndex === $index?'img-active':''" v-else-if="item.status==1" src="../../../assets/close_door.png"/>
                            <img @click="accessControlItem($index)" :class="activeIndex === $index?'img-active':''" v-else-if="item.status==2" src="../../../assets/c_open_door.png"/>
                            <img @click="accessControlItem($index)" :class="activeIndex === $index?'img-active':''" v-else src="../../../assets/open_door.png"/>
                            <div>{{item.name}}号门</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix access-control-head">
                        <span>门禁地图</span>
                        <el-upload
                            class="avatar-uploader"
                            action="#"
                            :show-file-list="false"
                            :on-change="changeFile"
                            :before-upload="beforeAvatarUpload"
                            accept="image/png,image/gif,image/jpg,image/jpeg">
                            <el-button style="float: right; padding: 3px 0" type="text">上传地图</el-button>
                            <!-- <img v-if="form.projectImg" :src="form.projectImg" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                        </el-upload>
                    </div>
                    <div class="text item access-control-pics">
                        <el-image
                        class="access-control-pic"
                        :src="mapPic"
                        fit="cover"></el-image>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="main-row" :gutter="20">
            <el-col :span="16">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix access-control-head">
                        <span>门禁事件</span>
                        <el-button @click="historyListBtn" style="float: right; padding: 3px 0" type="text">查看历史记录</el-button>
                    </div>
                    <div class="text item access-controls">
                        <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                                label="序号"
                                width="100">
                                <template slot-scope="scope">{{scope.$index+1}}</template>
                            </el-table-column>
                            <el-table-column
                                label="事件类型"
                                width="180">
                                <template slot-scope="scope">{{scope.row.event_type == 0 ?'遥控':'人脸识别'}}</template>
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="time"
                                label="发生时间"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                label="门禁点">
                                <template slot-scope="scope">
                                    <div>{{scope.row.door_no}}号门</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="出入类型"
                                width="100">
                                <template slot-scope="scope">
                                    <div>{{scope.row.in_or_out===0?'出':scope.row.in_or_out===1?'入':'未知'}}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>当前识别信息</span>
                    </div>
                    <div class="text item">
                        <el-row :gutter="20">
                            <el-col :span="16" class="current-info">
                                <div class="info-weight"><span class="info-name">门禁点：</span><span>{{currentInfo.door_no}}号门</span></div>
                                <div><span class="info-name">人员姓名：</span>{{currentInfo.name}}</div>
                                <div class="info-weight">
                                    <span class="info-name">身份：</span
                                    ><span>
                                        <span v-if="currentInfo.identity == item.id" v-for="item in identityList" :key="item.id">{{item.name}}</span>
                                    </span>
                                </div>
                                <div>
                                    <span class="info-name">单位类型：</span
                                    ><span v-if="currentInfo.company_type == item.id" v-for="item in companyTypeList" :key="item.id">{{item.name}}</span>
                                </div>
                                <div>
                                    <span class="info-name">单位名称：</span
                                    ><span v-if="currentInfo.company == item.id" v-for="item in companyList" :key="item.id">{{item.name}}</span>
                                </div>
                                <div>
                                    <span class="info-name">班组：</span
                                    ><span v-if="currentInfo.team == item.id" v-for="item in teamList" :key="item.id">{{item.name}}</span>
                                </div>
                                <div>
                                    <span class="info-name">工种：</span
                                    ><span v-if="currentInfo.work_type == item.id" v-for="item in workTypeList" :key="item.id">{{item.name}}</span>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <el-image
                                v-if="currentInfo.image"
                                class="current-info-pic"
                                :src="currentInfo.image"
                                fit="cover"></el-image>
                                <el-image
                                v-else
                                class="current-info-pic"
                                :src="accessControlPic"
                                fit="cover"></el-image>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isLoading: false,
                AccessControlList: [
                    { name: '1', status: 0 },
                    { name: '2', status: 1 },
                    { name: '3', status: 2 },
                    { name: '4', status: 3 }
                ],
                tableData: [],
                activeIndex: 0,
                currentInfo: '',
                accessControlPic: require('../../../assets/head_img.png'),
                mapPic: require('../../../assets/access_control_map.jpg'),
                identityList: [
                    {id: 0, name: '管理人员'},
                    {id: 1, name: '施工人员'}
                ],
                companyTypeList: [],
                companyList: [],
                teamList: [],
                workTypeList: []
            }
        },
        created() {
            // 单位类型
            let company_type = this.$http.get('api/v1/user/company_type/').then((res)=>{
                this.companyTypeList = res.data;
            }).catch(()=>{})
            // 单位名称
            let company = this.$http.get('api/v1/user/company/').then((res)=>{
                this.companyList = res.data;
            }).catch(()=>{})
            // 班组
            let team = this.$http.get('api/v1/user/team/').then((res)=>{
                this.teamList = res.data;
            }).catch(()=>{})
            // 工种
            let work_type = this.$http.get('api/v1/user/work_type/').then((res)=>{
                this.workTypeList = res.data;
            }).catch(()=>{})
            let firstRequest = this.$http.get(`api/v1/security/user_door?page=1&page_size=10`).then((res)=>{
                this.tableData = res.data;
                if(res.data.length>0) {
                    this.currentInfo = res.data[0];
                }
            }).catch(()=>{})
            this.isLoading = true;
            this.$http.requestAll([company_type, company, team, work_type])
            .then(()=>{
                this.isLoading = false;
            }).catch(()=>{})
        },
        methods: {
            // 门禁状态
            accessControlItem(index) {
                this.activeIndex = index;
            },
            // 查看历史记录
            historyListBtn() {
                this.$router.push({path: '/Security/HistoryList'})
            },
            changeFile(res) {
                let _that = this;
                var reader = new FileReader();    
                reader.readAsDataURL(res.raw);
                reader.onloadend = function(e) {
                    _that.mapPic = e.target.result;
                }
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                }
                return false;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .main-row {
        margin-top: 24px;
    }
    .access-control-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .access-control-op {
            display: inline-flex;
            align-items: center;
            .access-control-icons {
                display: inline-flex;
                align-items: center;
                &>div {
                    display: inline-flex;
                    align-items: center;
                    margin-right: 20px;
                    &>img {
                        width: 20px;
                        margin-right: 4px;
                    }
                }
            }
            &>i {
                font-size: 22px;
                cursor: pointer;
            }
        }
    }
    .access-controls {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 24px;
        padding-top: 0;
        box-sizing: border-box;
        .access-control-item {
            display: inline-flex;
            align-items: center;
            flex-direction: column;
            font-weight: bold;
            font-size: 16px;
            margin-top: 24px;
            &>img {
                width: 100px;
                margin-bottom: 12px;
                border: 2px solid #fff;
                padding: 24px 16px;
                border-radius: 6px;
                box-shadow: 0 2px 12px 0 rgba(0,0,0,0);
                cursor: pointer;
            }
            &>img:hover {
                opacity: .8;
            }
            .img-active {
                border: 2px solid #409EFF;
                border-radius: 6px;
                box-shadow: 0 2px 20px 0 rgba(0,0,0,.1);
            }
        }
    }
    .access-control-pics {
        display: flex;
        justify-content: center;
    }
    .access-control-pic {
        /* width: 100%;
        height: auto; */
    }
    .current-info {
        &>div {
            margin-bottom: 16px;
            .info-name {
                display: inline-block;
                width: 80px;
                text-align: right;
                margin-right: 4px;
            }
        }
        .info-weight {
            font-weight: bold;
            font-size: 18px;
        }
        &>div:last-child {
            margin: 0;
        }
    }
    .current-info-pic {
        width: 100%;
    }
</style>