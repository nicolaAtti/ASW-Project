<template>
    <div id="app">
        <v-row justify="center">
            <v-dialog class="form-dialog" v-model="dialog" hide-overlay fullscreen transition="dialog-bottom-transition">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">{{ $t('profilePage.dialog.dialogButton')}}</v-btn>
                </template>
                <v-card>
                    <v-card-title class="dialog-title">
                        <span class="headline">{{ $t('profilePage.dialog.title')}}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field :label="this.$t('profilePage.dialog.name')" v-model="userData.name"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field :label="this.$t('profilePage.dialog.surname')" v-model="userData.surname"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" >
                                    <v-select
                                            :items="[this.$t('profilePage.Male'),this.$t('profilePage.Female')]"
                                            :label="this.$t('profilePage.dialog.gender')"
                                            v-model="userData.gender"
                                    />
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field :label="this.$t('profilePage.dialog.height')" v-model="userData.height" suffix="Cm"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field :label="this.$t('profilePage.dialog.username')" v-model="userData.username"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field :label="this.$t('profilePage.dialog.email')" v-model="userData.email"/>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field :label="this.$t('profilePage.dialog.password')" type="password" v-model="userData.password"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-date-picker reactive :locale="$i18n.locale" v-model="userData.birthday" :max="new Date().toISOString().substr(0, 10)"
                                                   min="1920-01-01"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-checkbox
                                            v-model="userData.publicAchievements"
                                            :label="this.$t('profilePage.dialog.achi_pub')"
                                            true-value="true"
                                    />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
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
    import VueI18n from "../i18n";

    export default {
        name: "ProfileDialog",

        data () {
            return {
                dialog: false,
                userData:{
                    name: "",
                    surname: "",
                    birthday: "",
                    gender: "",
                    height: "",
                    email: "",
                    username: "",
                    password: "",
                    publicAchievements: undefined,
                },
            }
        },



        methods: {
            sendNewProfileData() {
                var patchData = this.userData;
                Object.keys(patchData).forEach((key) => (patchData[key] === "" || patchData[key] === undefined) && delete patchData[key]);
                var translatedGender;
                if(VueI18n.locale !== 'en'){
                    translatedGender = (this.userData.gender === 'Maschio') ? "Male" : "Female";
                }else{
                    translatedGender = this.userData.gender;
                }
                patchData.gender = translatedGender;
                axios.patch('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_USERS + '/users/' + sessionStorage.username, patchData, {headers: { Authorization: sessionStorage.token } }).then( response => {
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
                this.userData.birthday = "";
                this.userData.gender = "";
                this.userData.height = "";
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
</style>
