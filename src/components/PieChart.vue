<template>
    <div class="echart" ref="PieChart"></div>
</template>
<script>
    export default {
        props: {
            infoData: Object
        },
        data() {
            return {
                PieChart: null
            }
        },
        watch: {
            infoData() {
                this.init()
            }
        },
        mounted() {
            let _that = this;
            window.addEventListener("resize", function() {
                _that.PieChart.resize();
            });
            this.init();
        },
        methods: {
            init() {
                if(!this.infoData || !this.infoData.length) return false
                this.PieChart = this.$echarts.init(this.$refs.PieChart);
                let option = {
                    title: {
                        text: '现场人员公司分布图',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: ['公司1', '公司2', '公司3', '公司4']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: this.infoData,
                            // data: [
                            //     {value: 335, name: '公司1'},
                            //     {value: 310, name: '公司2'},
                            //     {value: 234, name: '公司3'},
                            //     {value: 135, name: '公司4'}
                            // ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                this.PieChart.setOption(option);
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