<template>
    <v-app id="inspire">
        <div class="register-form" @submit="processForm">
            <link href='http://fonts.googleapis.com/css?family=Bitter' rel='stylesheet' type='text/css'>
            <h1>{{ $t('registerPage.register_title')}}</h1>
            <p v-if="errors.length" class="error-list">
                <b>{{ $t("registerPage.correct_errors")}}</b>
            <ul>
                <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
            </ul>
            </p>
            <form id="registration">
                <div class="section"><span>1</span>{{ $t("registerPage.personal_data")}}</div>
                <div class="inner-wrap">
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="name" dense outlined :label="this.$t('registerPage.name')" required/>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="surname" dense outlined :label="this.$t('registerPage.surname')" required/>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-label>{{ $t('registerPage.birthday_date')}}</v-label>
                            <v-date-picker v-model="birthday" reactive width="100%" :locale="$i18n.locale"
                                           :max="new Date().toISOString().substr(0, 10)"
                                           min="1920-01-01"/>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-select
                                    outlined
                                    dense
                                    :items="[this.$t('registerPage.male'),this.$t('registerPage.female')]"
                                    :label="this.$t('registerPage.gender')"
                                    v-model="gender"
                            />
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="height" dense outlined :label="this.$t('registerPage.height')" suffix="Cm" required/>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="weight" dense outlined :label="this.$t('registerPage.weight')" suffix="Kg" required/>
                        </v-col>
                    </v-row>
                </div>

                <div class="section"><span>2</span>{{ $t("registerPage.account_data")}}</div>
                <div class="inner-wrap">
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="email" dense outlined :label="this.$t('registerPage.email')" required/>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="username" dense outlined :label="this.$t('registerPage.username')" required/>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="password" dense outlined :label="this.$t('registerPage.password')" required type="password"/>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="confirm_pass" dense outlined :label="this.$t('registerPage.confirm_password')" required type="password"/>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-checkbox
                                    v-model="achi_pub"
                                    :label="this.$t('registerPage.pub_achievements')"
                                    true-value="true"
                            />
                        </v-col>
                    </v-row>
                </div>
                <p>{{ $t("registerPage.requiredField")}}</p>
                <div class="button-section">

                    <v-btn class="ma-2" type="submit" name="Sign Up" value="Sign Up" tile color="primary" >{{ $t("signUp")}}</v-btn>
                </div>
            </form>
        </div>
    </v-app>
</template>

<script>
    import axios from "axios";
    import router from "../router";
    import VueI18n from "../i18n";

    export default {
        name: "Register",

        data() {
            return {
                errors: [],
                name: "",
                surname: "",
                birthday: "",
                gender: "",
                height: "",
                weight: "",
                email: "",
                username: "",
                password: "",
                confirm_pass: "",
                achi_pub: false
            };
        },

        methods: {
            async processForm(e) {
                this.errors = [];
                if(this.birthday === ""){
                    this.errors.push(this.$t('registerPage.no_birthday'));
                    e.preventDefault();
                    window.scrollTo(0,0);
                }else{
                    if (!(this.password === this.confirm_pass)) {
                        this.errors.push(this.$t('registerPage.password_mismatch'));
                        e.preventDefault();
                        window.scrollTo(0, 0)
                    } else {
                        try {
                            e.preventDefault();
                            console.log(sessionStorage.firebase_token);
                            var translatedGender;
                            if(VueI18n.locale !== 'en'){
                                translatedGender = (this.gender === 'Maschio') ? "Male" : "Female";
                            }else{
                                translatedGender = this.gender;
                            }
                            const response = await axios.post(process.env.VUE_APP_USERS_SERVICE + '/users/' + this.username, {
                                name: this.name,
                                surname: this.surname,
                                birthday: new Date(this.birthday),
                                gender: translatedGender ,
                                height: this.height,
                                email: this.email,
                                password: this.password,
                                publicAchievements: this.achi_pub,
                                firebaseUserToken: sessionStorage.firebase_token
                            });
                            if (response.status === 201) {
                                axios.post(process.env.VUE_APP_USERS_SERVICE + '/users/' + this.username + '/authentication',{
                                    password: this.password,
                                    firebaseUserToken: sessionStorage.firebase_token
                                }).then(response => {
                                    sessionStorage.token = "Bearer "+response.data.token;
                                    sessionStorage.username = this.username;
                                    if(this.weight !== undefined){
                                        axios.post(process.env.VUE_APP_FITNESS_SERVICE + '/users/' + this.username + '/fat', { weight: this.weight, timestamp: new Date()}, { headers: {Authorization: sessionStorage.token}}).then( () => {
                                            console.log("Username register "+sessionStorage.username);
                                            const snack = document.getElementById("snackbar");
                                            snack.className = "show";
                                            setTimeout(() => {
                                                snack.className = snack.className.replace("show", "");
                                            }, 6000);
                                            router.push('home');
                                        }).catch(error => {
                                            console.log("Error in saving fat value "+error)
                                        })
                                    }
                                }, error => {
                                    console.log(error);
                                    this.errors = [];
                                });
                            }
                        } catch (err) {
                            if (err.response.status === 409) {
                                this.errors.push((this.$t('registerPage.existing_username')))
                            } else {
                                this.errors.push(this.$t('registerPage.generic_server_error'))
                            }
                            e.preventDefault();
                            window.scrollTo(0, 0)
                        }
                    }
                }

            }
        }
    }

</script>

<style scoped>
    .register-form {
        margin: 5% 5% 10% 5%;
        width: 90%;
        padding: 5%;
        background: #FFF;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.13);
        -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.13);
        -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.13);
    }

    .error-list b{
        font: normal 80% 'Bitter', serif;
        color: #2A88AD;
        margin-left: -13%;
        margin-bottom: 5%;
    }

    .error-list ul{
        list-style: none;
        justify-content: left;
    }

    .error-list li{
        font: normal 80% 'Bitter', serif;
        color: #ad1e1b;
        margin-left: -8%;
        margin-bottom: 5%;
    }

    .register-form .inner-wrap{
        padding: 7%;
        background: #F8F8F8;
        margin-bottom: 5%;
    }
    .register-form h1{
        background: #0277bd;
        padding: 2% 12% 2% 12%;
        margin: -2% -1% 10% -1%;
        color: #fff;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
        font: normal 150% 'Bitter', serif;
        -moz-box-shadow: inset 0 2px 2px 0 rgba(255, 255, 255, 0.17);
        -webkit-box-shadow: inset 0 2px 2px 0 rgba(255, 255, 255, 0.17);
        box-shadow: inset 0 2px 2px 0 rgba(255, 255, 255, 0.17);
        border: 1px solid #257C9E;
    }

    .register-form p{
        display: block;
        font: 75%  Bitter, serif;
        color: #888;
        margin-bottom: 5%;
    }

    .register-form .section{
        font: normal 140% 'Bitter', serif;
        color: #2A88AD;
        margin-bottom: 5px;
    }

    .register-form .section span {
        background: #0277bd;
        padding: 1% 2% 1% 2%;
        position: absolute;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border: 4px solid #fff;
        font-size: 75%;
        margin-left: -10%;
        color: #fff;
        margin-top: -1%;
    }

</style>
