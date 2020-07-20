<template>
    <div class="home-set main-content">
        <el-tabs v-model="activeName" @tab-click="handleTab">
            <el-tab-pane label="视频监控"" name="first" lazy>
                <v-videoPreView :name="activeName"></v-videoPreView>
            </el-tab-pane>
            <el-tab-pane label="回放记录" name="second" lazy>
                <v-playBack></v-playBack>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import videoPreView from './VideoPreView';
    import playBack from './PlayBack';
    export default {
        components: {
            'v-videoPreView': videoPreView,
            'v-playBack': playBack
        },
        data() {
            return {
                activeName: 'first'
            }
        },
        methods: {
            handleTab() {
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home-set {
        width: 100%;
        height: 100%;
        overflow: hidden;
        ::v-deep .el-tabs {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        ::v-deep .el-tabs__content {
            width: 100%;
            height: calc(100% - 54px);
            overflow: hidden;
        }
        ::v-deep .el-tab-pane {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }
</style>