<template>
    <div id="profile_page">
        <div class="profile_top_card">
            <v-avatar size="70">
                <img
                        src="avatar.png"
                >
            </v-avatar>
            <h2 class="username_title">{{ this.username }}</h2>
        </div>
        <button class="tablink" v-on:click="openPage('profile_tab')">{{ $t("profilePage.profileTab")}}</button>
        <button class="tablink" v-on:click="openPage('achievements_tab')" id="defaultOpen">{{ $t("profilePage.achievementsTab")}}</button>

        <div id="profile_tab" class="tabcontent">
            <v-row dense class="contet-row">
                <label class="profile-label"> {{ $t("profilePage.name")}} </label>
                <v-spacer/>
                <label class="profile-label"> {{this.name}} </label>
            </v-row>
            <v-spacer />
            <v-row dense class="contet-row">
                <label class="profile-label"> {{ $t("profilePage.surname")}} </label>
                <v-spacer/>
                <label class="profile-label"> {{this.surname}} </label>
            </v-row>
            <v-row dense class="contet-row">
                <label class="profile-label"> {{ $t("profilePage.birthday")}} </label>
                <v-spacer/>
                <label class="profile-label"> {{this.birthday}} </label>
            </v-row>
            <v-row dense class="contet-row">
                <label class="profile-label"> {{ $t("profilePage.gender")}} </label>
                <v-spacer/>
                <label class="profile-label"> {{this.gender}} </label>
            </v-row>
            <v-row dense class="contet-row">
                <label class="profile-label"> {{ $t("profilePage.email")}} </label>
                <v-spacer/>
                <label class="profile-label"> {{this.email}} </label>
            </v-row>
            <v-row dense class="contet-row">
                <label class="profile-label"> {{ $t("profilePage.height")}} </label>
                <v-spacer/>
                <label class="profile-label"> {{this.height}} </label>
            </v-row>
            <v-row dense class="contet-row">
                <label class="profile-label"> {{ $t("profilePage.registrationDate")}} </label>
                <v-spacer/>
                <label class="profile-label"> {{this.registerDate}} </label>
            </v-row>
            <v-row dense class="contet-row">
                <label class="profile-label"> {{ $t("profilePage.achi_pub")}} </label>
                <v-spacer/>
                <label class="profile-label"> {{this.achi_pub}} </label>
            </v-row>
            <div class="dialog-panel">
                <ProfileDialog v-bind:currentUsername="this.username"/>
            </div>
        </div>

        <div id="achievements_tab" class="tabcontent">
            <p>This tab will contain achievements</p>
        </div>
    </div>
</template>

<script>
    import ProfileDialog from "./ProfileDialog";
    import axios from "axios";

    export default {
        name: "ProfilePage",

        components: {
            ProfileDialog
        },

        data: () => {
            return {
                username: sessionStorage.username,
                name: "",
                surname: "",
                birthday: "",
                email: "",
                gender: "",
                height: "",
                achi_pub: "",
                registerDate: "",
                achievements: [],
                dialog: false
            };
        },

        mounted() {
            axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT + '/users/' + sessionStorage.username,{headers: { Authorization: sessionStorage.token}}).then(response => {
                var birthdayDate = this.formatDate(response.data.birthday);
                var registerDate = this.formatDate(response.data.registrationDate);
                this.name = response.data.name;
                this.surname = response.data.surname;
                this.email = response.data.email;
                this.birthday = birthdayDate;
                this.gender = this.$t('profilePage.'+response.data.gender);
                this.height = response.data.height;
                this.achi_pub = response.data.publicAchievements ? "Public" : "Private";
                this.registerDate = registerDate;
                this.achievements = response.data.achievements;
            }).catch(error => {
                console.log(error.status)
            })
        },

        methods: {
            openPage(pageName) {
                // Hide all elements with class="tabcontent" by default */
                var i, tabcontent, tablinks;
                tabcontent = document.getElementsByClassName("tabcontent");
                for (i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                }

                // Remove the background color of all tablinks/buttons
                tablinks = document.getElementsByClassName("tablink");
                for (i = 0; i < tablinks.length; i++) {
                    tablinks[i].style.backgroundColor = "";
                }

                // Show the specific tab content
                document.getElementById(pageName).style.display = "block";
            },
            formatDate(date){
                let d = new Date(date);
                let day = d.getDate();
                let month = d.getMonth()+1;
                let year = d.getFullYear();
                return day + '/' + month + '/' + year;
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
        font-size: 100%;
        width: 50%;
    }

    .tablink:hover {
        background-color: #004c8c;
    }

    .tabcontent {
        display: none;
        margin: 20% 5% 0 5%;

    }

    .contet-row {
        background: #fff;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        padding: 2%;
        margin-bottom: 5%;
        border-radius: 1%;
        -webkit-border-radius:6px;
        -moz-border-radius:6px;
        border: 2px solid #01579b;
        box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
        -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.33);
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.33);
    }

    label {
        font-family: "Lucida Sans", sans-serif;
        font-size: 125%;
        color: #000000;
        margin: 2% 1% 2% 1%;
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

    .username_title {
        margin-bottom: 1%;
    }

</style>
