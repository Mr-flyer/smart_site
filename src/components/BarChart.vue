<template>
    <div class="echart" ref="barChart"></div>
</template>
<script>
    export default {
        props: {
            infoData: Object
        },
        data() {
            return {
                barChart: null
            }
        },
        watch: {
            infoData() {
                this.init();
            }
        },
        mounted() {
            let _that = this;
            window.addEventListener("resize", function() {
                _that.barChart.resize();
            });
            this.init();
        },
        methods: {
            init() {
                if(!this.infoData || !this.infoData.length) return false
                this.barChart = this.$echarts.init(this.$refs.barChart);
                let option = {
                    legend: {},
                    tooltip: {},
                    dataset: {
                        source: this.infoData
                        // source: [
                        //     ['product', '应到人数', '现场人数', '差额', '出勤率'],
                        //     ['总', 41.1, 30.4, 65.1, 53.3],
                        //     ['管理单位', 86.5, 92.1, 85.7, 83.1],
                        //     ['施工单位', 24.1, 67.2, 79.5, 86.4]
                        // ]
                    },
                    xAxis: [
                        {type: 'category', gridIndex: 0}
                    ],
                    yAxis: [
                        {gridIndex: 0}
                    ],
                    grid: {bottom: 20},
                    series: [
                        {type: 'bar', seriesLayoutBy: 'row'},
                        {type: 'bar', seriesLayoutBy: 'row'},
                        {type: 'bar', seriesLayoutBy: 'row'},
                    ]
                }
                this.barChart.setOption(option);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .echart {
        width: 100%;
        height: 100%;
    }
</style>