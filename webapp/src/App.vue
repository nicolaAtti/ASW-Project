<template>
    <div id="app">
        <v-toolbar dense color="#2A88AD">
            <v-btn v-if="$route.path!=='/login'" icon color="#fff" v-on:click="goBack()">
                <v-icon>mdi-backspace</v-icon>
            </v-btn>

            <v-spacer/>
            <!--
            <v-btn icon color="#fff">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            -->
            <v-btn rounded color= dark v-on:click="changeLang()">{{language}}</v-btn>
        </v-toolbar>
        <router-view class="pages"/>
    </div>
</template>

<script>
    import router from "./router";
    import VueI18n from "./i18n"
    export default {
        name: 'App',
        beforeMount() {
            router.push('login')
        },
        data: () => ({
            language: 'English',
        }),
        methods: {
            changeLang() {
                if(this.language === 'English'){
                    this.language = 'Italian';
                    VueI18n.locale = 'it';
                }else{
                    this.language = 'English';
                    VueI18n.locale= 'en';
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
        margin-top: 2%;
    }
    .pages{
        position: relative;
        top: 0px;
    }
</style>
