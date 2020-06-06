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
                    <li class="w3-padding-large">{{ $t('adminHomePage.Average Users Age') }}<p>{{averageAge}}</p></li>
                </ul>
            </div>
            <hr class="new5">
            <h3>{{ $t('homePage.Registered Users') }}</h3>
            <ejs-chart id="container" :primaryXAxis='primaryXAxis_users' :primaryYAxis='primaryYAxis_users' :tooltip='tooltip' :border='border' :legendSettings='legendSettings' :zoomSettings='zoom'>
                <e-series-collection>
                    <e-series :dataSource='seriesDataUsers' type='Line' xName='month' yName='users' name='Users' :marker='marker'> </e-series>
                </e-series-collection>
            </ejs-chart>
            <hr class="new4">
            <h3>{{ $t('homePage.Trainings Done') }}</h3>
            <ejs-chart id="container2" :primaryXAxis='primaryXAxis_trainings' :primaryYAxis='primaryYAxis_trainings' :tooltip='tooltip' :border='border' :legendSettings='legendSettings' :zoomSettings='zoom'>
                <e-series-collection>
                    <e-series :dataSource='seriesDataTrainings' type='Column' xName='month' yName='under30' name='Under 30' :marker='marker'> </e-series>
                    <e-series :dataSource='seriesDataTrainings' type='Column' xName='month' yName='under60' name='Under 60' :marker='marker'> </e-series>
                    <e-series :dataSource='seriesDataTrainings' type='Column' xName='month' yName='over60' name='Over 60' :marker='marker'> </e-series>
                </e-series-collection>
            </ejs-chart>
            <hr class="new4">
            <h3>{{ $t('homePage.Average Trainings Duration') }}</h3>
            <ejs-chart id="container3" :primaryXAxis='primaryXAxis_timeTraining' :primaryYAxis='primaryYAxis_timeTraining' :tooltip='tooltip' :border='border' :legendSettings='legendSettings' :zoomSettings='zoom'>
                <e-series-collection>
                    <e-series :dataSource='seriesDataTimeTraining' type='Column' xName='month' yName='under30' name='Under 30' :marker='marker'> </e-series>
                    <e-series :dataSource='seriesDataTimeTraining' type='Column' xName='month' yName='under60' name='Under 60' :marker='marker'> </e-series>
                    <e-series :dataSource='seriesDataTimeTraining' type='Column' xName='month' yName='over60' name='Over 60' :marker='marker'> </e-series>
                </e-series-collection>
            </ejs-chart>
            <hr class="new5">
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {ChartPlugin, ColumnSeries, LineSeries, Category, DataLabel, Tooltip, Legend, Zoom} from '@syncfusion/ej2-vue-charts';
    import router from "../router";
    import axios from "axios";
    import VueI18n from "../i18n";
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
                averageAge: '',

                border: {color: "#107228", width: 1},

                titleStyle:{
                    fontFamily: "Arial",
                    fontStyle: 'italic',
                    fontWeight: 'regular',
                    color: "#1f1913",
                    size: '30px'
                },

                seriesDataUsers: '',
                primaryXAxis_users: {
                    valueType: 'Category',
                    labelIntersectAction: 'Rotate45',
                    labelStyle: {
                        size: '12px',
                        fontFamily : 'Segoe UI', fontWeight : 'bold'
                    }
                },
                primaryYAxis_users:{
                    labelFormat: '{value}',
                    labelStyle: {
                        size: '12px',
                        fontFamily : 'Segoe UI', fontWeight : 'bold'
                    }
                },

                seriesDataTrainings: '',
                primaryXAxis_trainings: {
                    valueType: 'Category',
                    labelIntersectAction: 'Rotate45',
                    labelStyle: {
                        size: '12px',
                        fontFamily : 'Segoe UI', fontWeight : 'bold'
                    }
                },
                primaryYAxis_trainings:{
                    labelFormat: '{value}',
                    labelStyle: {
                        size: '12px',
                        fontFamily : 'Segoe UI', fontWeight : 'bold'
                    }
                },

                seriesDataTimeTraining: '',
                primaryXAxis_timeTraining: {
                    valueType: 'Category',
                    labelIntersectAction: 'Rotate45',
                    labelStyle: {
                        size: '12px',
                        fontFamily : 'Segoe UI', fontWeight : 'bold'
                    }
                },
                primaryYAxis_timeTraining:{
                    labelFormat: '{value} min',
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
                zoom: {
                    enableMouseWheelZooming: true,
                    enablePinchZooming: true
                }
            };
        },
        provide: {
            chart: [LineSeries, ColumnSeries, Category, DataLabel, Tooltip, Legend, Zoom]
        },
        created() {
            this.loadTotalUsers();
            this.loadAverageAge();
            this.loadUsersDataChart();
            this.loadTrainingsDataChart();
            this.loadTrainingsDurationChart();
        },
        beforeUpdate() {
            const monthNamesEnglish = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'];
            const monthNamesItalian = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto',
                'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
            if(VueI18n.locale === 'en') {
                for(let i = 0; i < this.seriesDataUsers.length; i++) {
                    this.seriesDataUsers[i].month = monthNamesEnglish[i];
                }
                for(let i = 0; i < this.seriesDataTrainings.length; i++) {
                    this.seriesDataTrainings[i].month = monthNamesEnglish[i];
                }
                for(let i = 0; i < this.seriesDataTimeTraining.length; i++) {
                    this.seriesDataTimeTraining[i].month = monthNamesEnglish[i];
                }
            } else if(VueI18n.locale === 'it') {
                for(let j = 0; j < this.seriesDataUsers.length; j++) {
                    this.seriesDataUsers[j].month = monthNamesItalian[j];
                }
                for(let j = 0; j < this.seriesDataTrainings.length; j++) {
                    this.seriesDataTrainings[j].month = monthNamesItalian[j];
                }
                for(let j = 0; j < this.seriesDataTimeTraining.length; j++) {
                    this.seriesDataTimeTraining[j].month = monthNamesItalian[j];
                }
            }
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
                axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_USERS + '/total-users', {headers: { Authorization: sessionStorage.token}}).then(response => {
                    this.totalUsers = response.data.totalUsers;
                })
            },
            loadAverageAge() {
                this.averageAge = 'Loading...';
                axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_USERS + '/average-age', {headers: { Authorization: sessionStorage.token}}).then(response => {
                    this.averageAge = response.data.averageAge;
                })
            },
            loadUsersDataChart() {
                axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_USERS + '/history-users', {headers: { Authorization: sessionStorage.token}}).then(response => {
                    this.seriesDataUsers = response.data;
                })
            },
            loadTrainingsDataChart() {
                axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_TRAININGS + '/history-trainings', {headers: { Authorization: sessionStorage.token}}).then(response => {
                    this.seriesDataTrainings = response.data;
                })
            },
            loadTrainingsDurationChart() {
                axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_TRAININGS + '/history-trainings-duration', {headers: { Authorization: sessionStorage.token}}).then(response => {
                    this.seriesDataTimeTraining = response.data;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

    .col-3.col-s-3 {
        background-image: url("../assets/profile-background-motive.jpg");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
    }

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
        border: 0.5px ridge #2c3e50;
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
