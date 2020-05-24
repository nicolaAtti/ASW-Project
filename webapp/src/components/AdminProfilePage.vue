<template>
    <div id="profile_page">
        <div class="profile_top_card">
            <h2 class="username_title">{{ this.username }}</h2>
        </div>

        <div id="profile_tab" class="tabcontent">
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                    <tr v-for="key in Object.keys(userData)" v-bind:key="key">
                        <td> {{ $t('profilePage.'+key) }} </td>
                        <td> {{ userData[key] }} </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <div class="dialog-panel">
                <AdminProfileDialog v-bind:currentUsername="this.userData.username" v-on:profileUpdate="fetchUserData"/>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import AdminProfileDialog from "./AdminProfileDialog";

    export default {
        name: "AdminProfilePage",

        components: {
            AdminProfileDialog
        },

        data: () => {
            return {
                username: "",
                gender: "",
                userData: {
                    name: "",
                    surname: "",
                    email: "",
                    registerDate: ""
                },
                dialog: false,
            };
        },

        mounted() {
            this.fetchUserData()
        },

        methods: {
            formatDate(date){
                let d = new Date(date);
                let day = d.getDate();
                let month = d.getMonth()+1;
                let year = d.getFullYear();
                return day + '/' + month + '/' + year;
            },

            fetchUserData() {
                this.username = sessionStorage.username;
                axios.get('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_USERS + '/users/' + this.username,{headers: { Authorization: sessionStorage.token}}).then(response => {
                    var registerDate = this.formatDate(response.data.registrationDate);
                    this.userData.name = response.data.name;
                    this.userData.surname = response.data.surname;
                    this.userData.email = response.data.email;
                    this.userData.registerDate = registerDate;
                }).catch(error => {
                    console.log(error.response.status)
                })
            }
        }
    }
</script>

<style scoped>
    .tabcontent {
        margin: 5% 5% 0 5%;
        display: block;
    }

    .profile_top_card{
        padding: 1%;
        background-size: cover;
        background-image: url("../assets/profile-background-motive.jpg");
    }

    #profile_page{
        height: 100%;
    }

    .username_title {
        margin-top: 2%;
        margin-bottom: 2%;
        font: 175% "Lucida Sans", sans-serif;
    }

    .dialog-panel{
        margin-top: 5%;
        margin-bottom: 5%;
    }

    tr td {
        font: 110% "Lucida Sans", sans-serif;
    }

</style>
