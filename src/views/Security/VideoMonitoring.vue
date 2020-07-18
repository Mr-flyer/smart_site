<template>
    <div class="home-set main-content">
        <el-tabs v-model="activeName">
            <el-tab-pane label="视频监控"" name="first">
                <v-videoPreView></v-videoPreView>
            </el-tab-pane>
            <el-tab-pane label="回放记录" name="second">
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
        }
    }
</script>

<style lang="scss" scoped>
    .home-set {
        
    }
</style>