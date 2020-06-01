<template lang="html">
    <div class="session">
        <ul class="w3-ul">
            <li class="w3-padding-large">{{ $t('homePage.Start Time') }}<p>{{block.startTime}}</p></li>
            <li class="w3-padding-large">{{ $t('homePage.End Time') }}<p>{{block.endTime}}</p></li>
            <li class="w3-padding-large">{{ $t('homePage.Calories Burned') }}<p>{{block.caloriesBurned}}</p></li>
            <li class="w3-padding-large">{{ $t('homePage.Average Heart Beat') }}<p>{{block.avgHeartRate}}</p></li>
            <li class="w3-padding-large">{{ $t('homePage.Kilometers Traveled') }}<p>{{block.kilometers}}</p></li>
            <li class="w3-padding-large">{{ $t('homePage.Steps') }}<p>{{block.steps}}</p></li>
            <li class="w3-padding-large">{{ $t('homePage.Average Altitude') }}<p>{{block.avgAltitude}}</p></li>
            <li class="w3-padding-large">{{ $t('homePage.Average Speed') }}<p>{{block.avgSpeed}}</p></li>
            <li class="w3-padding-large">{{ $t('homePage.Max Speed') }}<p>{{block.maxSpeed}}</p></li>
        </ul>
        <hr class="new5">
    </div>
</template>

<script>
    export default {
        props: {
            block: Object
        },
        name: "TrainingComponent"
    }
</script>

<style scoped>
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

</style>