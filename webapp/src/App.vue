<template>
    <div id="app">
        <v-toolbar dense color="#0277bd">
            <v-btn v-if="($route.path!=='/login' && $route.path!=='/home')" icon color="#fff" v-on:click="goBack()">
                <v-icon>mdi-backspace</v-icon>
            </v-btn>

            <v-spacer/>
            <v-btn rounded color= dark v-on:click="changeLang()">{{language}}</v-btn>
        </v-toolbar>
        <router-view class="pages"/>
        <div id="snackbar">{{ $t("registerPage.success")}}</div>
    </div>
</template>

<script>
    import router from "./router";
    import VueI18n from "./i18n";

    export default {
        name: 'App',
        beforeCreate() {
            router.push('login');
        },
        data: () => ({
            language: 'English',
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
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    .pages{
        position: relative;
        top: 0px;
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
