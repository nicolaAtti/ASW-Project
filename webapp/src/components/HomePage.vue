<template lang="html">
    <div class="row">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <div class="col-3 col-s-3 menu">
            <ul>
                <li>Profile</li>
                <li>Sessions History</li>
                <li>Sign Out</li>
            </ul>
        </div>
        <div class="col-9 col-s-4">
            <div class="w3-container">
                <h2>User Data</h2>
                <ul class="w3-ul w3-large" >
                    <li class="w3-padding-large">Age</li>
                    <li class="w3-padding-large">Weight</li>
                    <li class="w3-padding-large">Height</li>
                </ul>
            </div>
            <hr class="new5">
            <div class="w3-container">
                <h2>Last Training Summary</h2>
                <ul class="w3-ul w3-large" >
                    <li class="w3-padding-large">Session ID</li>
                    <li class="w3-padding-large">Start Time</li>
                    <li class="w3-padding-large">End Time</li>
                    <li class="w3-padding-large">Calories Burned</li>
                    <li class="w3-padding-large">Average Heart Beat</li>
                    <li class="w3-padding-large">Kilometers Traveled</li>
                    <li class="w3-padding-large">Steps</li>
                    <li class="w3-padding-large">Average Altitude</li>
                    <li class="w3-padding-large">Average Speed</li>
                    <li class="w3-padding-large">Max Speed</li>
                </ul>
            </div>
            <hr class="new5">
            <ejs-chart id="container" :title='titleSteps' :primaryXAxis='primaryXAxis_steps' :primaryYAxis='primaryYAxis_steps' :tooltip='tooltip'>
                <e-series-collection>
                    <e-series :dataSource='seriesDataSteps' type='Line' xName='day' yName='steps' name='Steps' :marker='marker'> </e-series>
                </e-series-collection>
            </ejs-chart>
            <hr class="new4">
            <ejs-chart id="container2" :title='titleCalories' :primaryXAxis='primaryXAxis_calories' :primaryYAxis='primaryYAxis_calories' :tooltip='tooltip'>
                <e-series-collection>
                    <e-series :dataSource='seriesDataCalories' type='Line' xName='day' yName='calories' name='Calories' :marker='marker'> </e-series>
                </e-series-collection>
            </ejs-chart>
            <hr class="new4">
            <ejs-chart id="container3" :title='titleKm' :primaryXAxis='primaryXAxis_km' :primaryYAxis='primaryYAxis_km' :tooltip='tooltip'>
                <e-series-collection>
                    <e-series :dataSource='seriesDataKm' type='Line' xName='day' yName='km' name='Chilometers' :marker='marker'> </e-series>
                </e-series-collection>
            </ejs-chart>
            <hr class="new4">
            <ejs-chart id="container4" :title='titleAvgSpeed' :primaryXAxis='primaryXAxis_AvgSpeed' :primaryYAxis='primaryYAxis_AvgSpeed' :tooltip='tooltip'>
                <e-series-collection>
                    <e-series :dataSource='seriesDataAvgSpeed' type='Line' xName='day' yName='km_h' name='AvgSpeed' :marker='marker'> </e-series>
                </e-series-collection>
            </ejs-chart>
            <hr class="new5">
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { ChartPlugin, LineSeries, Category, DataLabel, Tooltip} from '@syncfusion/ej2-vue-charts';
    Vue.use(ChartPlugin);

    export default {
        metaInfo: {
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ]
        },
        data() {
            return {
                seriesDataSteps: [
                    { day: 'Monday', steps: 1530 }, { day: 'Tuesday', steps: 1245 },
                    { day: 'Wednesday', steps: 2340 }, { day: 'Thursday', steps: 1670 },
                    { day: 'Friday', steps: 1200 }, { day: 'Saturday', steps: 1465 },
                    { day: 'Sunday', steps: 900 }
                ],
                primaryXAxis_steps: {
                    valueType: 'Category'
                },
                primaryYAxis_steps:{
                    labelFormat: '{value}'
                },
                titleSteps: "Steps",

                seriesDataCalories: [
                    { day: 'Monday', calories: 260 }, { day: 'Tuesday', calories: 248 },
                    { day: 'Wednesday', calories: 120 }, { day: 'Thursday', calories: 89 },
                    { day: 'Friday', calories: 60 }, { day: 'Saturday', calories: 73 },
                    { day: 'Sunday', calories: 180 }
                ],
                primaryXAxis_calories: {
                    valueType: 'Category'
                },
                primaryYAxis_calories:{
                    labelFormat: '{value} Kcal'
                },
                titleCalories: "Calories",

                seriesDataKm: [
                    { day: 'Monday', km: 1.3 }, { day: 'Tuesday', km: 2.4 },
                    { day: 'Wednesday', km: 0.6 }, { day: 'Thursday', km: 1.8 },
                    { day: 'Friday', km: 1.2 }, { day: 'Saturday', km: 3.4 },
                    { day: 'Sunday', km: 0.9 }
                ],
                primaryXAxis_km: {
                    valueType: 'Category'
                },
                primaryYAxis_km:{
                    labelFormat: '{value} Km'
                },
                titleKm: "Chilometers",

                seriesDataAvgSpeed: [
                    { day: 'Monday', km_h: 10.5 }, { day: 'Tuesday', km_h: 9.4 },
                    { day: 'Wednesday', km_h: 11.4 }, { day: 'Thursday', km_h: 7.4 },
                    { day: 'Friday', km_h: 10.8 }, { day: 'Saturday', km_h: 7.9},
                    { day: 'Sunday', km_h: 9.9 }
                ],
                primaryXAxis_AvgSpeed: {
                    valueType: 'Category'
                },
                primaryYAxis_AvgSpeed:{
                    labelFormat: '{value} Km/h'
                },
                titleAvgSpeed: "Average Speed",

                legendSettings: {
                    visible: true
                },
                marker: {
                    dataLabel:{
                        visible: true
                    }
                },
                tooltip:{ enable: true },
            };
        },
        provide: {
            chart: [LineSeries, Category, DataLabel, Tooltip]
        }
    }

</script>

<style lang="scss" scoped >

    * {
        box-sizing: border-box;
    }

    .row::after {
        content: "";
        clear: both;
        display: table;
    }

    [class*="col-"] {
        float: left;
        padding: 15px;
    }

    html {
        font-family: "Lucida Sans", sans-serif;
    }

    .menu ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .menu li {
        font-size: 18px;
        padding: 8px;
        margin-bottom: 7px;
        background-color: #33b5e5;
        color: #ffffff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    .menu li:hover {
        background-color: #0099cc;
    }

    .w3-ul{
        border-left: 5px solid green;
        background-color: #f1f1f1;
        list-style-type: none;
        padding: 10px 20px;
    }

    hr.new5 {
        border: 10px solid green;
        border-radius: 5px;
    }

    .container, container2, container3, container4 {
        height: 350px;
    }

    [class*="col-"] {
        width: 100%;
    }

    @media only screen and (min-width: 600px) {
        /* For tablets: */
        .col-s-1 {width: 8.33%;}
        .col-s-2 {width: 16.66%;}
        .col-s-3 {width: 25%;}
        .col-s-4 {width: 33.33%;}
        .col-s-5 {width: 41.66%;}
        .col-s-6 {width: 50%;}
        .col-s-7 {width: 58.33%;}
        .col-s-8 {width: 66.66%;}
        .col-s-9 {width: 75%;}
        .col-s-10 {width: 83.33%;}
        .col-s-11 {width: 91.66%;}
        .col-s-12 {width: 100%;}
    }

    @media only screen and (min-width: 768px) {
        /* For desktop: */
        .col-1 {width: 8.33%;}
        .col-2 {width: 16.66%;}
        .col-3 {width: 25%;}
        .col-4 {width: 33.33%;}
        .col-5 {width: 41.66%;}
        .col-6 {width: 50%;}
        .col-7 {width: 58.33%;}
        .col-8 {width: 66.66%;}
        .col-9 {width: 75%;}
        .col-10 {width: 83.33%;}
        .col-11 {width: 91.66%;}
        .col-12 {width: 100%;}
        .col-3 {flex: 0 0 10%}
    }



</style>

