<template>
    <div>
        <div class="profile_top_card">
            <v-avatar size="70">
                <img
                        src="avatar.png"
                >
            </v-avatar>
            <h2 class="username_title">{{ username }}</h2>
        </div>
        <button class="tablink" v-on:click="openPage('Profile')">Profile</button>
        <button class="tablink" v-on:click="openPage('Achievements')" id="defaultOpen">Achievements</button>

        <div id="Profile" class="tabcontent">
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
            <ProfileDialog />
        </div>

        <div id="Achievements" class="tabcontent">
            <p>This tab will contain achievements</p>
        </div>
    </div>
</template>

<script>
    import ProfileDialog from "./ProfileDialog";

    export default {
        name: "ProfilePage",

        components: {
            ProfileDialog
        },

        data: () => {
            return {
                username: "Username",
                name: "Placeholder Name",
                dialog: false
            };
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
        background-color: #257C9E;
        color: white;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 14px 16px;
        font-size: 17px;
        width: 50%;
    }

    .tablink:hover {
        background-color: #2A6881;
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
        margin-bottom: 7%;
        border-radius: 1%;
        -webkit-border-radius:6px;
        -moz-border-radius:6px;
        border: 2px solid #0099cc;
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


    #Profile{
        display: block;
    }

    .username_title {
        margin-bottom: 1%;
    }

</style>
