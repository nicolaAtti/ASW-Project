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
        <button class="tablink" v-on:click="openPage('profile_tab')">Profile</button>
        <button class="tablink" v-on:click="openPage('achievements_tab')" id="defaultOpen">Achievements</button>

        <div id="profile_tab" class="tabcontent">
            <v-row dense class="contet-row">
                <label class="profile-label"> Name: </label>
                <v-spacer/>
                <label class="profile-label"> TestName </label>
            </v-row>
            <v-spacer />
            <v-row dense class="contet-row">
                <label class="profile-label"> Surname: </label>
                <v-spacer/>
                <label class="profile-label"> TestSurname </label>
            </v-row>
            <v-row dense class="contet-row">
                <label class="profile-label"> Birthday: </label>
                <v-spacer/>
                <label class="profile-label"> 05/07/2892 </label>
            </v-row>
            <v-row dense class="contet-row">
                <label class="profile-label"> Email: </label>
                <v-spacer/>
                <label class="profile-label"> prova@prova.boh </label>
            </v-row>
            <v-row dense class="contet-row">
                <label class="profile-label"> Height: </label>
                <v-spacer/>
                <label class="profile-label"> 2.72 </label>
            </v-row>
            <v-row dense class="contet-row">
                <label class="profile-label"> Achievements: </label>
                <v-spacer/>
                <label class="profile-label"> Public </label>
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
                name: "Placeholder Name",
                dialog: false
            };
        },

        beforeCreate() {
            axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT + '/users/' + this.username,{headers: { Authorization: sessionStorage.token}}).then(response => {
                console.log(response.data);
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

    .avatar_input {
        float: right;
    }

</style>
