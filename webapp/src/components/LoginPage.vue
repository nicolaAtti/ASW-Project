<template>
    <div class="login-page">
        <div class="form">
            <form class="login-form">
                <header>
                    <h1>{{ $t('loginPage.app_title') }}</h1>
                </header>
                <input type="text" v-model= "input.username" placeholder="Username" />
                <input type="password" v-model="input.password" placeholder="Password" />
                <button v-on:click="sendDataLogin()">{{ $t("signIn")}}</button>
                <button v-on:click="sendDataRegister()">{{ $t("signUp")}}</button>
            </form>
        </div>
    </div>
</template>

<script>
    //import axios from "axios";
    import router from "../router";

    export default {
        name: "LoginPage",
        props: {
            msg: String
        },
        data () {
            return {
                input: {
                    username: "",
                    password: ""
                },
                response: ""
            }
        },
        mounted() {

        },
        methods: {
            //Questo metodo deve inviare al servizio 'login' le credenziale e aspettare la risposta. Se corrette rimandare l'utente alla pagina 'home'
            sendDataLogin() {
            /*    axios({ method: "POST", "url": "https://httpbin.org/post", "data": this.input, "headers": { "content-type": "application/json" } }).then(result => {
                    this.response = result.data;
                }, error => {
                    console.error(error);
                });*/
                router.push('home')
            },
            // Questo metodo deve rimandare l'utente alla pagina di registrazione
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
        background: #2A88AD;
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
        width: 95%;
        padding: 8% 0 0;
        margin: auto;
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
        background: #257C9E;
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

</style>
