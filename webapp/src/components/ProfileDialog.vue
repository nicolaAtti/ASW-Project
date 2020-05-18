<template>
    <div id="app">
        <v-row justify="center">
            <v-dialog class="form-dialog" v-model="dialog" hide-overlay fullscreen transition="dialog-bottom-transition">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">Change Account Information</v-btn>
                </template>
                <v-card>
                    <v-card-title class="dialog-title">
                        <span class="headline">Change profile information</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Name" v-model="name"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Surname" v-model="surname"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" >
                                    <v-select
                                            :items="['Male','Female']"
                                            label="Gender"
                                            v-model="gender"
                                    />
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Height" v-model="height"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Username" v-model="username"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Email" v-model="email"/>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="New Password" type="password" v-model="password"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-date-picker  v-model="birthday"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-file-input
                                            label="Change Avatar"
                                            dense
                                            accept="image/png, image/jpeg, image/bmp"
                                            :rules="rules"
                                            filled
                                            prepend-icon="mdi-camera"
                                    />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn color="blue darken-1" text @click="clearForm">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="sendNewProfileData">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "ProfileDialog",

        props: {
            currentUsername: String
        },

        data () {
            return {
                dialog: false,
                name: "",
                surname: "",
                birthday: "",
                gender: "",
                height: "",
                email: "",
                username: "",
                password: "",
                rules: [
                    value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
                ]
            }
        },



        methods: {
            sendNewProfileData() {
                console.log('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT + '/users/' + this.currentUsername);
                console.log(sessionStorage.token);
                //Send to backend then clear
                    axios.patch('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT + '/users/' + this.currentUsername, {
                        name: this.name,
                        surname: this.surname,
                        birthday: this.birthday,
                        gender: this.gender,
                        height: this.height,
                        email: this.email,
                        _id: this.username,
                        password: this.password
                    }, {headers: { Authorization: sessionStorage.token } }).then( () => {
                        //se success allora esci e fai toast di successo
                        console.log("Successo")
                    }, error => {
                        if(error.status===404){
                            console.log("Fallito 404")
                        }else {
                            //not authorized
                            console.log("Fallito 401")
                        }
                    });
                this.clearForm()
            },
            clearForm() {
                this.name = "";
                this.surname = "";
                this.birthday = "";
                this.gender = "";
                this.height = "";
                this.email = "";
                this.username = "";
                this.password = "";
                document.getElementsByClassName('v-dialog--active')[0].scrollTop = 0
                this.dialog = false;
            }
        }
    }
</script>

<style scoped>
    .dialog-title{
        background: dodgerblue;
        color: #FFFFFF;
    }
</style>
