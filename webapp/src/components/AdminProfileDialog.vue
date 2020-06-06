<template>
    <div id="app">
        <v-row justify="center">
            <v-dialog class="form-dialog" v-model="dialog" hide-overlay fullscreen transition="dialog-bottom-transition">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">{{ $t('profilePage.adminDialog.dialogButton')}}</v-btn>
                </template>
                <v-card>
                    <v-card-title class="dialog-title">
                        <span class="headline">{{ $t('profilePage.adminDialog.title')}}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field :label="this.$t('profilePage.adminDialog.name')" v-model="userData.name"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field :label="this.$t('profilePage.adminDialog.surname')" v-model="userData.surname"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field :label="this.$t('profilePage.adminDialog.username')" v-model="userData.username"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field :label="this.$t('profilePage.adminDialog.email')" v-model="userData.email"/>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field :label="this.$t('profilePage.adminDialog.password')" type="password" v-model="userData.password"/>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions class="card-actions">
                        <v-spacer/>
                        <v-btn color="blue darken-1" text @click="clearForm">{{$t('profilePage.dialog.close')}}</v-btn>
                        <v-btn color="blue darken-1" text @click="sendNewProfileData">{{$t('profilePage.dialog.save')}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "AdminProfileDialog",

        data () {
            return {
                dialog: false,
                userData:{
                    name: "",
                    surname: "",
                    email: "",
                    username: "",
                    password: "",
                },
            }
        },



        methods: {
            sendNewProfileData() {
                var patchData = this.userData;
                Object.keys(patchData).forEach((key) => (patchData[key] === "" || patchData[key] === undefined) && delete patchData[key]);
                axios.patch(process.env.VUE_APP_USERS_SERVICE + '/users/' + sessionStorage.username, patchData, {headers: { Authorization: sessionStorage.token } }).then( response => {
                    if(response.data.newToken !== undefined){
                        sessionStorage.username = this.userData.username;
                        sessionStorage.token = "Bearer "+response.data.newToken;
                    }
                    const snack = document.getElementById("snackbar");
                    snack.className = "show";
                    snack.innerHTML = this.$t('profilePage.dialog.success_change');
                    setTimeout(() => {
                        snack.className = snack.className.replace("show","");
                    }, 3000);
                    this.$emit('profileUpdate');
                    this.clearForm();
                }, error => {
                    console.log(error.message)
                });
            },
            clearForm() {
                this.userData.name = "";
                this.userData.surname = "";
                this.userData.email = "";
                this.userData.username = "";
                this.userData.password = "";
                document.getElementsByClassName('v-dialog--active')[0].scrollTop = 0;
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

    .card-actions{
        margin-right: 4%;
    }
</style>
