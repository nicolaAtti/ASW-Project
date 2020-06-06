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
                    <v-btn color="red" text @click="dialog = false">{{$t('unregisterDialog.accept')}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "ProfileDialog",

        data () {
            return {
                dialog: false,
            }
        },

        methods: {
            deleteUser(){

            }
        }
    }
</script>

<style>


</style>
