<template>
    <div class="apexcharts-area">
        <GChart type="ColumnChart" :data="chartData" :options="chartOptions" :resizeDebounce="400" style="width: 700px; height: 500px;"/>
    </div>
</template>

<script>
    import { GChart } from 'vue-google-charts'

    export default {
        name: "HomeContent",
        components: {
            GChart
        },
        data: () => {
            return {
                chartData: [
                    ['Year', 'Sales', 'Expenses', 'Profit'],
                    ['2014', 1000, 400, 200],
                    ['2015', 1170, 460, 250],
                    ['2016', 660, 1120, 300],
                    ['2017', 1030, 540, 350]
                ],
                chartOptions: {
                    chart: {
                        title: 'Company Performance',
                        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped >

    .apexcharts-area {
        float: none;
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
        margin-left: 5%;
        padding: 0 10px 0 0;


        h2 {
            float: none;
            width: 100%;
            border: 0;
            margin: 0 0 15px;
            box-sizing: border-box;
        }

    }

</style>
