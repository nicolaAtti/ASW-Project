<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" max-width="95%">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">{{$t('unregisterDialog.button')}}</v-btn>
            </template>
            <v-card>
                <v-card-title class="headline">{{$t('unregisterDialog.title')}}</v-card-title>
                <v-card-text>{{$t('unregisterDialog.content')}}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialog = false">{{$t('unregisterDialog.reject')}}</v-btn>
                    <v-btn color="red" text @click="deleteUser">{{$t('unregisterDialog.accept')}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import axios from 'axios'
    import router from "../router";

    export default {
        name: "ProfileDialog",

        data () {
            return {
                dialog: false,
            }
        },

        methods: {
            deleteUser(){
                axios.delete(process.env.VUE_APP_USERS_SERVICE + '/users/' + sessionStorage.username, {headers: { Authorization: sessionStorage.token } }).then(response => {
                    console.log("User removed "+response);
                    this.dialog = false;
                    router.push("/login");
                }).catch(error => {
                    console.log("Error in deleting user "+error)
                });
            }
        }
    }
</script>

<style>


</style>
