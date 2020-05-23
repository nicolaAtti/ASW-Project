<template lang="html">
    <div class="row">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <div class="col-3 col-s-3 menu">
            <ul>
                <li v-on:click="goToProfile()">{{ $t('adminHomePage.Profile') }} </li>
                <li v-on:click="signOut()">{{ $t('adminHomePage.Sign Out') }}</li>
            </ul>
        </div>
        <div class="col-9 col-s-4">
            <div class="w3-container">
                <h2>{{ $t('adminHomePage.General Data') }}</h2>
                <ul class="w3-ul w3-large" >
                    <li class="w3-padding-large">{{ $t('adminHomePage.Registered Users') }}<p>{{totalUsers}}</p></li>
                    <li class="w3-padding-large">{{ $t('adminHomePage.Average Users Age') }}</li>
                </ul>
            </div>
            <hr class="new5">
            <ejs-chart id="container" :title='titleUsers' :primaryXAxis='primaryXAxis_users' :primaryYAxis='primaryYAxis_users' :tooltip='tooltip' :border='border' :titleStyle='titleStyle'>
                <e-series-collection>
                    <e-series :dataSource='seriesDataUsers' type='Line' xName='month' yName='users' name='Users' :marker='marker'> </e-series>
                </e-series-collection>
            </ejs-chart>
            <hr class="new4">
            <ejs-chart id="container2" :title='titleTrainings' :primaryXAxis='primaryXAxis_trainings' :primaryYAxis='primaryYAxis_trainings' :tooltip='tooltip' :border='border' :titleStyle='titleStyle'>
                <e-series-collection>
                    <e-series :dataSource='seriesDataTrainings' type='Line' xName='month' yName='trainings' name='Trainings' :marker='marker'> </e-series>
                </e-series-collection>
            </ejs-chart>
            <hr class="new4">
            <ejs-chart id="container3" :title='titleTimeTraining' :primaryXAxis='primaryXAxis_timeTraining' :primaryYAxis='primaryYAxis_timeTraining' :tooltip='tooltip' :border='border' :titleStyle='titleStyle'>
                <e-series-collection>
                    <e-series :dataSource='seriesDataTimeTraining' type='Line' xName='month' yName='timeTraining' name='TimeTraining' :marker='marker'> </e-series>
                </e-series-collection>
            </ejs-chart>
            <hr class="new5">
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {ChartPlugin, LineSeries, Category, DataLabel, Tooltip} from '@syncfusion/ej2-vue-charts';
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
                totalUsers: '',

                border: {color: "#107228", width: 1},

                titleStyle:{
                    fontFamily: "Arial",
                    fontStyle: 'italic',
                    fontWeight: 'regular',
                    color: "#1f1913",
                    size: '30px'
                },

                seriesDataUsers: [
                    { month: 'January', users: 754 }, { month: 'February', users: 1245 },
                    { month: 'March', users: 1171 }, { month: 'April', users: 1670 },
                    { month: 'May', users: 1542 }, { month: 'June', users: 1465 },
                    { month: 'July', users: 779 }, { month: 'August', users: 1245 },
                    { month: 'September', users: 1100 }, { month: 'October', users: 1670 },
                    { month: 'November', users: 954 }, { month: 'December', users: 1465 }
                ],
                primaryXAxis_users: {
                    valueType: 'Category'
                },
                primaryYAxis_users:{
                    labelFormat: '{value}'
                },
                titleUsers: "Registered Users",

                seriesDataTrainings: [
                    { month: 'January', trainings: 8048 }, { month: 'February', trainings: 16940 },
                    { month: 'March', trainings: 13040 }, { month: 'April', trainings: 21040 },
                    { month: 'May', trainings: 6200 }, { month: 'June', trainings: 18580 },
                    { month: 'July', trainings: 10240 }, { month: 'August', trainings: 13940 },
                    { month: 'September', trainings: 14200 }, { month: 'October', trainings: 19040 },
                    { month: 'November', trainings: 8848 }, { month: 'December', trainings: 16580 }
                ],
                primaryXAxis_trainings: {
                    valueType: 'Category'
                },
                primaryYAxis_trainings:{
                    labelFormat: '{value}'
                },
                titleTrainings: "Trainings Done",

                seriesDataTimeTraining: [
                    { month: 'January', timeTraining: 62 }, { month: 'February', timeTraining: 51 },
                    { month: 'March', timeTraining: 74 }, { month: 'April', timeTraining: 63 },
                    { month: 'May', timeTraining: 86 }, { month: 'June', timeTraining: 47 },
                    { month: 'July', timeTraining: 44 }, { month: 'August', timeTraining: 39 },
                    { month: 'September', timeTraining: 56 }, { month: 'October', timeTraining: 67 },
                    { month: 'November', timeTraining: 71 }, { month: 'December', timeTraining: 77 }
                ],
                primaryXAxis_timeTraining: {
                    valueType: 'Category'
                },
                primaryYAxis_timeTraining:{
                    labelFormat: '{value} min'
                },
                titleTimeTraining: "Average Trainings Duration",

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
        },
        created() {
            this.loadTotalUsers();
        },
        methods: {
            signOut() {
                router.push('login')
            },
            goToProfile() {
                router.push('home/admin-profile')
            },
            loadTotalUsers() {
                this.totalUsers = 'Loading...';
                axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_USERS + '/users/' + this.username, {headers: { Authorization: sessionStorage.token}}).then(response => {
                    console.log('Provo a caricare il totale degli utenti registrati: ' + response.data.username);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

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
        border: 1.5px solid cornflowerblue;
        background-color: #33b5e5;
        color: #ffffff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        cursor: pointer;
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

    .w3-padding-large {
        text-align: left;
    }

    hr.new5 {
        border: 10px solid green;
        border-radius: 5px;
    }

    .container, container2, container3 {
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
