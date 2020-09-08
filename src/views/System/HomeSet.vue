<template>
    <div class="home-set main-content">
        <el-tabs v-model="activeName">
            <el-tab-pane label="项目信息" name="first" lazy>
                <v-projectinfo></v-projectinfo>
            </el-tab-pane>
            <el-tab-pane label="视频管理" name="second" lazy>
                <v-videoManage></v-videoManage>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import projectInfo from './ProjectInfo';
    import videoManage from './VideoManage';
    export default {
        components: {
            'v-projectinfo': projectInfo,
            'v-videoManage': videoManage
        },
        data() {
            return {
                activeName: 'first'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home-set {
        
    }
</style>