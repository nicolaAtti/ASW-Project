<template lang="html">
    <div class="row">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <div class="col-3">
        </div>
        <div class="col-9 col-s-4">
            <div class="w3-container">
                <h1>{{ $t('homePage.Trainings Summary') }}</h1>
                <h2>{{trainingNotFound}}</h2>
                <template v-for="block in myData">
                    <TrainingComponent :block="block" :key="block.sessionId"></TrainingComponent>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import TrainingComponent from "./TrainingComponent";

    export default {
        components: {
            TrainingComponent
        },
        metaInfo: {
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ]
        },
        data() {
            return {
                username: sessionStorage.username,
                myData: '',
                trainingNotFound: ''
            }
        },
        created() {
            this.loadTrainingsData();
        },
        methods: {
            loadTrainingsData(){
                axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_TRAININGS + '/users/' + this.username + '/training_session', {headers: { Authorization: sessionStorage.token}}).then(response => {
                    if(!(response.data[0] == undefined)) {
                        var i = 0;
                        for(i=0; i < response.data.length; i++) {
                            response.data[i].avgHeartRate = response.data[i].avgHeartRate + ' b/min';
                            response.data[i].avgAltitude = response.data[i].avgAltitude + ' m';
                            response.data[i].avgSpeed = response.data[i].avgSpeed + ' km/h';
                            response.data[i].maxSpeed = response.data[i].maxSpeed + ' km/h';

                            var st = new Date(response.data[i].startTime);
                            var sty = st.getFullYear();
                            var stm = st.getMonth();
                            var std = st.getDate();
                            var sth = st.getHours();
                            var stmin = st.getMinutes();
                            response.data[i].startTime = '' + sth + ':' + stmin + ' - ' + std + '/' + stm + '/' + sty;

                            var et = new Date(response.data[i].endTime);
                            var ety = et.getFullYear();
                            var etm = et.getMonth();
                            var etd = et.getDate();
                            var eth = et.getHours();
                            var etmin = et.getMinutes();
                            response.data[i].endTime = '' + eth + ':' + etmin + ' - ' + etd + '/' + etm + '/' + ety;
                        }
                        this.myData = response.data;
                    } else {
                        this.trainingNotFound = 'No Trainings Found';
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

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

    [class*="col-"] {
        width: 100%;
    }

    h2 {
        font-style: italic;
    }

    @media only screen and (min-width: 480px) {
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
        .col-3 {flex: 0 0 2%}
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