<template lang="html">
    <div class="row">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <div class="col-3 col-s-3 menu">
            <ul>
                <li v-on:click="goToProfile()">{{ $t('homePage.Profile') }} </li>
                <li v-on:click="goToHistory()">{{ $t('homePage.Sessions History') }}</li>
                <li v-on:click="signOut()">{{ $t('homePage.Sign Out') }}</li>
            </ul>
        </div>
        <div class="col-9 col-s-4">
            <div class="w3-container">
                <h2>{{ $t('homePage.User Data') }}</h2>
                <ul class="w3-ul w3-large" >
                    <li class="w3-padding-large">{{ $t('homePage.Age') }}<p>{{age}}</p></li>
                    <li class="w3-padding-large">{{ $t('homePage.Weight') }}<p>{{weight}} {{kgr}}</p></li>
                    <li class="w3-padding-large">{{ $t('homePage.Height') }}<p>{{height}} {{cmt}}</p></li>
                </ul>
            </div>
            <hr class="new5">
            <div class="w3-container">
                <h2>{{ $t('homePage.Last Training Summary') }}</h2>
                <ul class="w3-ul">
                    <li class="w3-padding-large">{{ $t('homePage.Start Time') }}<p>{{startTime}}</p></li>
                    <li class="w3-padding-large">{{ $t('homePage.End Time') }}<p>{{endTime}}</p></li>
                    <li class="w3-padding-large">{{ $t('homePage.Calories Burned') }}<p>{{caloriesBurned}}</p></li>
                    <li class="w3-padding-large">{{ $t('homePage.Average Heart Beat') }}<p>{{avgHeartRate}} {{bmin}}</p></li>
                    <li class="w3-padding-large">{{ $t('homePage.Kilometers Traveled') }}<p>{{kilometers}}</p></li>
                    <li class="w3-padding-large">{{ $t('homePage.Steps') }}<p>{{steps}}</p></li>
                    <li class="w3-padding-large">{{ $t('homePage.Average Altitude') }}<p>{{avgAltitude}} {{malt}}</p></li>
                    <li class="w3-padding-large">{{ $t('homePage.Average Speed') }}<p>{{avgSpeed}} {{kmh}}</p></li>
                    <li class="w3-padding-large">{{ $t('homePage.Max Speed') }}<p>{{maxSpeed}} {{kmh}}</p></li>
                </ul>
            </div>
            <hr class="new5">
            <h3>{{ $t('homePage.Steps') }}</h3>
            <ejs-chart id="container" :primaryXAxis='primaryXAxis_steps' :primaryYAxis='primaryYAxis_steps' :tooltip='tooltip' :border='border' >
                <e-series-collection>
                    <e-series :dataSource='seriesDataSteps' type='Column' xName='month' yName='steps' name='Steps' :marker='marker'> </e-series>
                </e-series-collection>
            </ejs-chart>
            <hr class="new4">
            <h3>{{ $t('homePage.Calories Burned') }}</h3>
            <ejs-chart id="container2" :primaryXAxis='primaryXAxis_calories' :primaryYAxis='primaryYAxis_calories' :tooltip='tooltip' :border='border' >
                <e-series-collection>
                    <e-series :dataSource='seriesDataCalories' type='Column' xName='month' yName='calories' name='Calories' :marker='marker'> </e-series>
                </e-series-collection>
            </ejs-chart>
            <hr class="new4">
            <h3>{{ $t('homePage.Kilometers Traveled') }}</h3>
            <ejs-chart id="container3" :primaryXAxis='primaryXAxis_km' :primaryYAxis='primaryYAxis_km' :tooltip='tooltip' :border='border' >
                <e-series-collection>
                    <e-series :dataSource='seriesDataKm' type='Column' xName='month' yName='km' name='Km' :marker='marker'> </e-series>
                </e-series-collection>
            </ejs-chart>
            <hr class="new4">
            <h3>{{ $t('homePage.Average Speed') }}</h3>
            <ejs-chart id="container4" :primaryXAxis='primaryXAxis_AvgSpeed' :primaryYAxis='primaryYAxis_AvgSpeed' :tooltip='tooltip' :border='border' >
                <e-series-collection>
                    <e-series :dataSource='seriesDataAvgSpeed' type='Column' xName='month' yName='km_h' name='AvgSpeed' :marker='marker'> </e-series>
                </e-series-collection>
            </ejs-chart>
            <hr class="new5">
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Category, ChartPlugin, ColumnSeries, DataLabel, LineSeries, Tooltip} from '@syncfusion/ej2-vue-charts';
    import router from "../router";
    import axios from "axios";

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
                username: sessionStorage.username,
                age: '',
                weight: '',
                height: '',
                startTime: '',
                endTime: '',
                caloriesBurned: '',
                avgHeartRate: '',
                kilometers: '',
                steps: '',
                avgAltitude: '',
                avgSpeed: '',
                maxSpeed: '',

                kgr: '',
                cmt: '',
                bmin: '',
                malt: '',
                kmh: '',

                border: {color: "#107228", width: 1},

                titleStyle:{
                    fontFamily: "Arial",
                    fontStyle: 'italic',
                    fontWeight: 'regular',
                    color: "#1f1913",
                    size: '30px'
                },

                seriesDataSteps: '',
                primaryXAxis_steps: {
                    valueType: 'Category',
                    labelIntersectAction: 'Rotate45',
                    labelStyle: {
                        size: '12px',
                        fontFamily : 'Segoe UI', fontWeight : 'bold'
                    }
                },
                primaryYAxis_steps:{
                    labelFormat: '{value}',
                    labelStyle: {
                        size: '12px',
                        fontFamily : 'Segoe UI', fontWeight : 'bold'
                    }
                },

                seriesDataCalories: '',
                primaryXAxis_calories: {
                    valueType: 'Category',
                    labelIntersectAction: 'Rotate45',
                    labelStyle: {
                        size: '12px',
                        fontFamily : 'Segoe UI', fontWeight : 'bold'
                    }
                },
                primaryYAxis_calories:{
                    labelFormat: '{value} Kcal',
                    labelStyle: {
                        size: '12px',
                        fontFamily : 'Segoe UI', fontWeight : 'bold'
                    }
                },

                seriesDataKm: '',
                primaryXAxis_km: {
                    valueType: 'Category',
                    labelIntersectAction: 'Rotate45',
                    labelStyle: {
                        size: '12px',
                        fontFamily : 'Segoe UI', fontWeight : 'bold'
                    }
                },
                primaryYAxis_km:{
                    labelFormat: '{value} Km',
                    labelStyle: {
                        size: '12px',
                        fontFamily : 'Segoe UI', fontWeight : 'bold'
                    }
                },

                seriesDataAvgSpeed: '',
                primaryXAxis_AvgSpeed: {
                    valueType: 'Category',
                    labelIntersectAction: 'Rotate45',
                    labelStyle: {
                        size: '12px',
                        fontFamily : 'Segoe UI', fontWeight : 'bold'
                    }
                },
                primaryYAxis_AvgSpeed:{
                    minimum: 1,
                    rangePadding: 'Round',
                    labelFormat: '{value} Km/h',
                    labelStyle: {
                        size: '12px',
                        fontFamily : 'Segoe UI', fontWeight : 'bold'
                    }
                },

                legendSettings: {
                    visible: true,
                    position: 'Top'
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
            chart: [LineSeries, ColumnSeries, Category, DataLabel, Tooltip]
        },
        created() {
            this.loadAge();
            this.loadWeight();
            this.loadHeight();
            this.loadLastTrainingSummary();
            this.loadStepsSummary();
            this.loadCaloriesSummary();
            this.loadKilometersSummary();
            this.loadAvgSpeedSummary();
        },
        methods: {
            signOut() {
                router.push('login')
            },
            goToProfile() {
                router.push('home/profile')
            },
            goToHistory() {
                router.push('home/sessions-history')
            },
            loadAge() {
                this.age = this.$t('homePage.Loading');
                axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_USERS + '/users/' + this.username, {headers: { Authorization: sessionStorage.token}}).then(response => {
                    this.age = response.data.age;
                })
            },
            loadWeight() {
                this.weight = this.$t('homePage.Loading');
                axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_FAT + '/users/' + this.username + '/fat/latest', {headers: { Authorization: sessionStorage.token}}).then(response => {
                    if(!(response.data.weight == undefined)){
                        this.weight = response.data.weight;
                        this.kgr = 'kg';
                    } else {
                        this.weight = this.$t('homePage.Weight not defined');
                    }
                })
            },
            loadHeight() {
                this.height = this.$t('homePage.Loading');
                axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_USERS + '/users/' + this.username, {headers: { Authorization: sessionStorage.token}}).then(response => {
                    if(!(response.data.height == undefined)){
                        this.height = response.data.height;
                        this.cmt = 'cm';
                    } else {
                        this.height = this.$t('homePage.Height not defined');
                    }
                })
            },
            loadLastTrainingSummary() {
                axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_TRAININGS + '/users/' + this.username + '/training_session/latest', {headers: { Authorization: sessionStorage.token}}).then(response => {
                    if(!(response.data.username == undefined)) {
                        this.caloriesBurned = response.data.caloriesBurned;
                        this.avgHeartRate = response.data.avgHeartRate;
                        this.bmin = 'b/min'
                        this.kilometers = response.data.kilometers;
                        this.steps = response.data.steps;
                        this.avgAltitude = response.data.avgAltitude;
                        this.malt = 'm'
                        this.avgSpeed = response.data.avgSpeed;
                        this.maxSpeed = response.data.maxSpeed;
                        this.kmh = 'km/h'

                        var st = new Date(response.data.startTime);
                        var sty = st.getFullYear();
                        var stm = st.getMonth()+1;
                        var std = st.getDate();
                        var sth = st.getHours();
                        var stmin = st.getMinutes();
                        this.startTime = '' + sth + ':' + stmin + ' - ' + std + '/' + stm + '/' + sty;
                        var et = new Date(response.data.endTime);
                        var ety = et.getFullYear();
                        var etm = et.getMonth()+1;
                        var etd = et.getDate();
                        var eth = et.getHours();
                        var etmin = et.getMinutes();
                        this.endTime = '' + eth + ':' + etmin + ' - ' + etd + '/' + etm + '/' + ety;
                    } else {
                        this.startTime = this.$t('homePage.Training not found');
                    }
                })
            },
            loadStepsSummary() {
                axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_TRAININGS + '/users/' + this.username + '/training_session/history-steps', {headers: {Authorization: sessionStorage.token}}).then(response => {
                    this.seriesDataSteps = response.data;
                })
            },
            loadCaloriesSummary() {
                axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_TRAININGS + '/users/' + this.username + '/training_session/history-calories', {headers: {Authorization: sessionStorage.token}}).then(response => {
                    this.seriesDataCalories = response.data;
                })
            },
            loadKilometersSummary() {
                axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_TRAININGS + '/users/' + this.username + '/training_session/history-kilometers', {headers: {Authorization: sessionStorage.token}}).then(response => {
                    this.seriesDataKm = response.data;
                })
            },
            loadAvgSpeedSummary() {
                axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_TRAININGS + '/users/' + this.username + '/training_session/history-avgspeed', {headers: {Authorization: sessionStorage.token}}).then(response => {
                    this.seriesDataAvgSpeed = response.data;
                })
            }
        }
    }
</script>

<style lang="scss" scoped >

    * {
        box-sizing: border-box;
    }

    li {
        font-weight: bold;
    }

    p {
        text-align: right;
        font-family: Georgia, serif;
        font-weight: 500;
    }

    h3 {
        fontFamily: Arial;
        fontStyle: italic;
        fontWeight: bold;
        color: #1f1913;
        font-size: 30px;
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
        border: 1.5px solid #257C9E;
        background-color:#0277bd;
        color: #ffffff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        cursor: pointer;
    }

    .menu li:hover {
        background-color: #0099cc;
    }

    .w3-ul{
        border-left: 5px solid #0277bd;
        background-color: #f1f1f1;
        list-style-type: none;
        padding: 10px 20px;
    }

    .w3-padding-large {
        text-align: left;
    }

    hr.new5 {
        border: 10px solid #0277bd;
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

