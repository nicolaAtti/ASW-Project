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
            <v-text-field label="Solo" solo> {{ name }}</v-text-field>
        </div>

        <div id="Achievements" class="tabcontent">
            <p>This tab will contain achievements</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProfilePage",

        data: () => {
            return {
                username: "Username",
                name: "Placeholder Name"
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
    body, html {
        height: 100%;
        margin: 0;
        font-family: Arial, serif;
    }

    /* Style tab links */
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

    /* Style the tab content (and add height:100% for full page content) */
    .tabcontent {
        color: #000000;
        display: none;
        padding: 100px 20px;
        height: 100%;
    }

    .profile_top_card{
        padding: 1%;
        background: #4d4d4d;
    }

    #Profile{
        display: block;
    }

    .username_title {
        margin-bottom: 1%;
    }
</style>
