<template>
    <div>
        <button class="tablink" onclick="openPage('Profile', this, 'red')">Profile</button>
        <button class="tablink" onclick="openPage('Achievements', this, 'green')" id="defaultOpen">Achievements</button>

        <div id="Profile" class="tabcontent">
            <h3>Profile</h3>
            <p>Home is where the heart is..</p>
        </div>

        <div id="Achievements" class="tabcontent">
            <h3>Achievements</h3>
            <p>Some news this fine day!</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProfilePage",

        methods: {
            openPage(pageName, elmnt, color) {
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

                // Add the specific color to the button used to open the tab content
                elmnt.style.backgroundColor = color;
            }
        }
    }
</script>

<style scoped>
    body, html {
        height: 100%;
        margin: 0;
        font-family: Arial;
    }

    /* Style tab links */
    .tablink {
        background-color: #555;
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
        background-color: #777;
    }

    /* Style the tab content (and add height:100% for full page content) */
    .tabcontent {
        color: white;
        display: none;
        padding: 100px 20px;
        height: 100%;
    }

    #Profile {background-color: red;}
    #Achievements {background-color: green;}
</style>
