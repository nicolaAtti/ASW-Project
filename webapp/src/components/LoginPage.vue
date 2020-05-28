<template>
    <div class="login-page">
        <div class="form">
            <form class="login-form" @submit="sendDataLogin">
                <header>
                    <h1>{{ $t('loginPage.app_title') }}</h1>
                </header>
                <p v-if="errors.length" class="error-list">
                    <b>{{ $t("registerPage.correct_errors")}}</b>
                <ul>
                    <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
                </ul>
                </p>
                <input type="text" v-model= "input.username" placeholder="Username" required />
                <input type="password" v-model="input.password" placeholder="Password" required/>
                <button type="submit" name="Sign In" value="Sign In">{{ $t("signIn")}}</button>
                <button v-on:click="sendDataRegister()">{{ $t("signUp")}}</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import router from "../router";

    export default {
        name: "LoginPage",
        data () {
            return {
                errors: [],
                input: {
                    username: "",
                    password: ""
                },
                response: "",

                mockAccount: {
                    username: "Admin",
                    password: "123"
                }

            }
        },

        methods: {
            sendDataLogin(e) {
                this.errors = [];
                e.preventDefault();
                axios.post('http://' + process.env.VUE_APP_API_SERVER_URI + ':' + process.env.VUE_APP_API_SERVER_PORT_USERS + '/users/' + this.input.username + '/authentication',{
                    password: this.input.password
                }).then(response => {
                    console.log(response);
                    sessionStorage.token = "Bearer "+response.data.token;
                    sessionStorage.username = this.input.username;
                    if(this.input.username == this.mockAccount.username && this.input.password == this.mockAccount.password) {
                        router.push('admin-home')
                    }else {
                        router.push('home')
                    }
                }, error => {
                    this.errors = [];
                    if(error.response.status===404){
                        console.log("404");
                        this.errors.push(this.$t('loginPage.wrong_username'))
                    }else if(error.response.status===401){
                        console.log("401");
                        this.errors.push(this.$t('loginPage.wrong_password'))
                    }
                });
            },
            sendDataRegister() {
                router.push('register')
            }
        }
    }
</script>

<style scoped>

    .login-form > header {
        position: relative;
        width: 100%;
        padding: 10px;
        margin: -10px -10px 25px 0px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        background: #0277bd;
        font-family: 'Roboto', sans-serif;
        font-style: oblique;
        font-size: 1.3rem;
        color: #FAFAFA;
        animation: scale_header 0.6s cubic-bezier(.55, 0, .1, 1), text_opacity 1s cubic-bezier(.55, 0, .1, 1);
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 1px 5px 0px rgba(0, 0, 0, 0.12),
        0px 3px 1px -2px rgba(0, 0, 0, 0.2);
    }

    .login-form > header:before {
        content: '';
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 5px;
        padding: 8px;
        margin: -10px 0 0 -10px;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.156);
        font-family: 'Roboto', sans-serif;
        font-size: 0.9rem;
        color: transparent;
        z-index: 5;
    }

    h1 {
        color: #ffffff;
    }
    .login-page {
        margin: 5% 5% 5% 5%;
        width: 90%;
        height: 100%;
        padding: 5%;
        background: #FFF;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.13);
        -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.13);
        -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.13);
    }
    .form {
        position: relative;
        z-index: 1;
        background: #FFFFFF;
        max-width: 360px;
        margin: 0 auto 100px;
        padding: 45px;
        text-align: center;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }
    .form input {
        font-family: "Roboto", sans-serif;
        outline: 0;
        background: #f2f2f2;
        width: 100%;
        border: 0;
        margin: 0 0 15px;
        padding: 15px;
        box-sizing: border-box;
        font-size: 14px;
    }
    .form button {
        font-family: "Roboto", sans-serif;
        outline: 0;
        background: #0277bd;
        width: 100%;
        border: 0;
        padding: 15px;
        color: #FFFFFF;
        font-size: 14px;
        margin: 4px 2px;
        cursor: pointer;
    }

    .form button:hover.form button:active,.form button:focus {
        background: #257C9E;
    }

    .form .message a {
        color: #4CAF50;
        text-decoration: none;
    }

    .container .info h1 {
        margin: 0 0 15px;
        padding: 0;
        font-size: 36px;
        font-weight: 300;
        color: #1a1a1a;
    }
    .container .info span {
        color: #4d4d4d;
        font-size: 12px;
    }
    .container .info span a {
        color: #000000;
        text-decoration: none;
    }

    body {
        background: #76b852; /* fallback for old browsers */
        background: -webkit-linear-gradient(right, #76b852, #8DC26F);
        background: -moz-linear-gradient(right, #76b852, #8DC26F);
        background: -o-linear-gradient(right, #76b852, #8DC26F);
        background: linear-gradient(to left, #76b852, #8DC26F);
        font-family: "Roboto", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .error-list b{
        font: normal 80% 'Bitter', serif;
        color: #2A88AD;
        margin-left: -13%;
        margin-bottom: 5%;
    }

    .error-list ul{
        list-style: inside;
        justify-content: center;
    }

    .error-list li{
        font: normal 80% 'Bitter', serif;
        color: #ad1e1b;
        margin-left: -8%;
        margin-bottom: 5%;
    }

</style>
