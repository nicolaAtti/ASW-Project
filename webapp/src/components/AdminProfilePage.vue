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
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "AdminProfilePage",

        data: () => {
            return {
                username: "",
                gender: "",
                userData: {
                    name: "",
                    surname: "",
                    birthday: "",
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
                    var birthdayDate = this.formatDate(response.data.birthday);
                    var registerDate = this.formatDate(response.data.registrationDate);
                    this.userData.name = response.data.name;
                    this.userData.surname = response.data.surname;
                    this.userData.email = response.data.email;
                    this.userData.birthday = birthdayDate;
                    this.userData.registerDate = registerDate;
                }).catch(error => {
                    console.log(error.response.status)
                })
            }
        }
    }
</script>

<style scoped>
    .profile_top_card{
        padding: 1%;
        background-size: cover;
        background-image: url("../assets/profile-background-motive.jpg");
    }

    #profile_page{
        height: 100%;
    }

    #profile_tab{
        display: block;
    }

    .username_title {
        margin-bottom: 1%;
    }

    tr {
        font: 100% Bitter, serif;
    }

</style>
