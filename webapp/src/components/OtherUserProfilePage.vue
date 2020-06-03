<template>
    <div id="profile_page">
        <div class="profile_top_card">
            <h2 class="username_title">{{ this.username }}</h2>
        </div>
        <button class="tablink" v-on:click="openPage('profile_tab')">{{ $t("profilePage.profileTab")}}</button>
        <button class="tablink" v-on:click="openPage('achievements_tab')" id="defaultOpen">{{ $t("profilePage.achievementsTab")}}</button>


        <div id="profile_tab" class="tabcontent">
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                    <tr v-for="key in Object.keys(userData)" v-bind:key="key">
                        <td>{{ $t('profilePage.'+key) }}</td>
                        <td>{{ userData[key] }}</td>
                    </tr>
                    <tr>
                        <td> {{ $t('profilePage.gender') }}</td>
                        <td> {{ $t('profilePage.'+gender) }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>

        <div id="achievements_tab" class="tabcontent">
            <v-expansion-panels>
                <v-expansion-panel
                        v-for="(achievement,index) in achievements"
                        :key="index"
                >
                    <v-expansion-panel-header disable-icon-rotate>
                        <div class="achievement-title">
                            <v-img contain :src='achievement+".PNG"' height="75%" width="75%"/>
                        </div><span class="achievement-name">     </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content >
                        <h3>{{ $t('achievements.title.'+achievement)}}</h3>
                        <p>{{ $t('achievements.desc.'+achievement)}}</p>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OtherUserProfilePage",

        props: {
            username: String,
            gender: String,
            userData: {
                name: String,
                surname: String,
                birthday: String,
                age: String,
                registerData: String
            },
            achievements: Array
        },

        data: () => {
            return {
                username: this.username, //The first element always generates a warning....for some reason....
                gender: this.gender,
                userData: {
                    name: this.userData.name,
                    surname: this.userData.surname,
                    birthday: this.userData.birthday,
                    age: this.userData.age,
                    registerDate: this.userData.registerDate
                },
                achievements: this.achievements,
            };
        },

        methods: {
            openPage(pageName) {
                var i, tabcontent, tablinks;
                tabcontent = document.getElementsByClassName("tabcontent");
                for (i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                }
                tablinks = document.getElementsByClassName("tablink");
                for (i = 0; i < tablinks.length; i++) {
                    tablinks[i].style.backgroundColor = "";
                }
                document.getElementById(pageName).style.display = "block";
            }
        }
    }
</script>

<style scoped>
    .tablink {
        background-color: #01579b;
        color: white;
        float: left;
        cursor: pointer;
        padding: 3% 5%;
        font: 125% "Lucida Sans", sans-serif;
        width: 50%;
    }

    .tabcontent {
        display: none;
        margin-top: 15%;
    }

    .profile_top_card{
        padding: 1%;
        background-size: cover;
        background-image: url("../assets/profile-background-motive.jpg");
    }

    #profile_tab{
        display: block;
    }

    #profile_page{
        height: 100%;
    }

    #achievements_tab{
        margin: 20% 5% 0 5%;
    }

    .username_title {
        margin-bottom: 2%;
        font: 175% "Lucida Sans", sans-serif;
    }

    .achievement-title{
        display: inline-block;
        width: 20%;
    }

    .achievement-name{
        font: 100% "Lucida Sans", sans-serif;
    }

    tr td {
        font: 110% "Lucida Sans", sans-serif;
    }

</style>
