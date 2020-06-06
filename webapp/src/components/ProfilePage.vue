<template>
    <div id="profile_page">
        <div class="profile_top_card">
            <h2 class="username_title">{{ this.username }}</h2>
        </div>
        <button class="tablink" v-on:click="openPage('profile_tab')">{{ $t("profilePage.profileTab")}}</button>
        <button class="tablink" v-on:click="openPage('achievements_tab')" id="defaultOpen">{{ $t("profilePage.achievementsTab")}}</button>


        <div id="profile_tab" class="tabcontent">
            <div class="dialog-panel">
                <ProfileDialog v-on:profileUpdate="fetchUserData"/>
            </div>
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
                    <tr>
                        <td> {{ $t('profilePage.achi_pub') }}</td>
                        <td> {{ $t('profilePage.'+achi_pub) }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <div>
                <UnregisterDialog class="dialog-panel"/>
            </div>
        </div>

        <div id="achievements_tab" class="tabcontent">
            <v-expansion-panels>
                <v-expansion-panel
                        v-for="(achievement,index) in achievements"
                        :key="index"
                >
                    <v-expansion-panel-header disable-icon-rotate>
                        <div class="achievement-title">
                            <v-img contain :src='achievement+".PNG"' height="50%" width="50%"/>
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
    import ProfileDialog from "./ProfileDialog";
    import UnregisterDialog from "./UnregisterDialog";
    import axios from "axios";

    export default {
        name: "ProfilePage",

        components: {
            ProfileDialog,
            UnregisterDialog
        },

        data: () => {
            return {
                username: "",
                gender: "",
                achi_pub: "",
                userData: {
                    name: "",
                    surname: "",
                    birthday: "",
                    age: "",
                    email: "",
                    registerDate: ""
                },
                achievements: [],
                dialog: false,
            };
        },

        mounted() {
            this.fetchUserData()
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
            },

            formatDate(date){
                let d = new Date(date);
                let day = d.getDate();
                let month = d.getMonth()+1;
                let year = d.getFullYear();
                return day + '/' + month + '/' + year;
            },

            fetchUserData() {
                this.username = sessionStorage.username;
                console.log(sessionStorage.token);
                axios.get(process.env.VUE_APP_USERS_SERVICE + '/users/' + this.username,{headers: { Authorization: sessionStorage.token}}).then(response => {
                    var birthdayDate = this.formatDate(response.data.birthday);
                    var registerDate = this.formatDate(response.data.registrationDate);
                    this.userData.name = response.data.name;
                    this.userData.surname = response.data.surname;
                    this.userData.email = response.data.email;
                    this.userData.birthday = birthdayDate;
                    this.userData.age = response.data.age;
                    this.gender = this.$t('profilePage.'+response.data.gender);
                    this.achi_pub = response.data.publicAchievements ? "Public" : "Private";
                    this.userData.registerDate = registerDate;
                    this.achievements = response.data.achievements;
                }).catch(error => {
                    console.log(error.response.status)
                })
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
        margin-bottom: 1%;
        font: 175% "Lucida Sans", sans-serif;
    }

    .dialog-panel{
        margin-top: 5%;
        margin-bottom: 5%;
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
