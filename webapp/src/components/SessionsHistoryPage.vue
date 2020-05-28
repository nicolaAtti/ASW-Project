<template lang="html">
    <div class="row">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <div class="col-3">
        </div>
        <div class="col-9 col-s-4">
            <div class="w3-container">
                <h2>{{ $t('homePage.Trainings Summary') }}</h2>
                <ul class="w3-ul" >
                    <li class="w3-padding-large">{{ $t('homePage.Session ID') }}<p>prova</p></li>
                    <li class="w3-padding-large">{{ $t('homePage.Start Time') }}</li>
                    <li class="w3-padding-large">{{ $t('homePage.End Time') }}</li>
                    <li class="w3-padding-large">{{ $t('homePage.Calories Burned') }}</li>
                    <li class="w3-padding-large">{{ $t('homePage.Average Heart Beat') }}</li>
                    <li class="w3-padding-large">{{ $t('homePage.Kilometers Traveled') }}</li>
                    <li class="w3-padding-large">{{ $t('homePage.Steps') }}</li>
                    <li class="w3-padding-large">{{ $t('homePage.Average Altitude') }}</li>
                    <li class="w3-padding-large">{{ $t('homePage.Average Speed') }}</li>
                    <li class="w3-padding-large">{{ $t('homePage.Max Speed') }}</li>
                </ul>
            </div>
            <hr class="new5">
        </div>
    </div>
</template>

<script>
    export default {
        metaInfo: {
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ]
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
        font-size: 20px;
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

    [class*="col-"] {
        width: 100%;
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