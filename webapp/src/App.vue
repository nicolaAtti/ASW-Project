<template>
    <div id="app">
        <v-app id="inspire">
            <v-app-bar dense color="#01579b">
                <v-btn v-if="($route.path!=='/login' && $route.path!=='/home')" icon color="#fff" v-on:click="goBack()">
                    <v-icon>mdi-backspace</v-icon>
                </v-btn>

                <v-spacer/>
                <v-text-field v-if="($route.path.includes('/home'))" height="20px" hide-details solo rounded single-line dense v-model="otherUser" :placeholder="this.$t('homePage.searchText')" append-icon="mdi-account-search-outline" @click:append="searchUser()"/>

                <v-btn rounded color= dark v-on:click="changeLang()">{{language}}</v-btn>
            </v-app-bar>
            <router-view class="pages"/>
            <div id="snackbar">{{ $t("registerPage.success")}}</div>
        </v-app>
    </div>
</template>

<script>
    import router from "./router";
    import VueI18n from "./i18n";
    import axios from "axios";

    export default {
        name: 'App',
        beforeCreate() {
            router.push('login');
        },
        data: () => ({
            language: 'English',
            otherUser: ''
        }),

        methods: {
            changeLang() {
                if(this.language === 'English'){
                    VueI18n.locale = 'it';
                    this.language = this.$t('it_lang');
                }else{
                    VueI18n.locale= 'en';
                    this.language = this.$t('en_lang');
                }
            },
            goBack() {
                router.back();
            },
            searchUser(){
                axios.get( process.env.VUE_APP_USERS_SERVICE + '/users/find/' + this.otherUser).then(response => {
                    console.log(response.data);
                    router.push({name: 'OtherUserProfilePage', params: {
                            username: response.data.username,
                            gender: this.$t('profilePage.'+response.data.gender),
                            userData: {
                                name: response.data.name,
                                surname: response.data.surname,
                                birthday: this.formatDate(response.data.birthday),
                                age: response.data.age,
                                registerDate: this.formatDate(response.data.registrationDate)
                            },
                            achievements: response.data.achievements,
                        }
                    });
                    this.otherUser = ''
                }).catch( () => {
                        this.otherUser = '';
                        const snack = document.getElementById("snackbar");
                        snack.className = "show";
                        snack.innerHTML = this.$t('userNotFound');
                        setTimeout(() => {
                            snack.className = snack.className.replace("show","");
                        }, 6000);
                })
            },
            formatDate(date){
                let d = new Date(date);
                let day = d.getDate();
                let month = d.getMonth()+1;
                let year = d.getFullYear();
                return day + '/' + month + '/' + year;
            },
        }
    }
</script>

<style>
    #app {
        font-family: "Lucida Sans", sans-serif;;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        overflow: hidden;
    }


    .pages{
        height: 100%;
    }

    #snackbar {
        visibility: hidden;
        min-width: 250px;
        margin-left: -125px;
        background-color: #2A88AD;
        color: #fff;
        text-align: center;
        border-radius: 2px;
        padding: 16px;
        position: fixed;
        z-index: 1;
        left: 50%;
        bottom: 30px;
    }

    #snackbar.show {
        visibility: visible;
        -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
        animation: fadein 0.5s, fadeout 0.5s 2.5s;
    }


    @-webkit-keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 30px; opacity: 1;}
    }

    @keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 30px; opacity: 1;}
    }

    @-webkit-keyframes fadeout {
        from {bottom: 30px; opacity: 1;}
        to {bottom: 0; opacity: 0;}
    }

    @keyframes fadeout {
        from {bottom: 30px; opacity: 1;}
        to {bottom: 0; opacity: 0;}
    }
</style>
