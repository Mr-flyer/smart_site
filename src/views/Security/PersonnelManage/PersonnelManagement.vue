<template>
    <div class="home-set main-content">
        <el-tabs v-model="activeName">
            <el-tab-pane label="实名管理" name="first">
                <v-realName></v-realName>
            </el-tab-pane>
            <el-tab-pane label="门禁管理" name="second">
                <v-accessControl></v-accessControl>
            </el-tab-pane>
            <el-tab-pane label="在岗信息" name="three">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import realName from './RealName';
    import accessControl from './AccessControl';
    export default {
        components: {
            'v-realName': realName,
            'v-accessControl': accessControl
        },
        data() {
            return {
                activeName: 'second'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home-set {
        
    }
</style>