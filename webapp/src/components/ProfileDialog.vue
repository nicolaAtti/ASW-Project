<template>
    <div id="app">
        <v-app id="inspire">
            <v-row justify="center">
                <v-dialog v-model="dialog" hide-overlay max-width="600px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Change profile information</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field label="Name" v-model="name"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field label="Surname" v-model="surname"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6" >
                                        <v-select
                                                :items="['Male','Female']"
                                                label="Gender"
                                                v-model="gender"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field label="Height" v-model="height"/>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Username" v-model="username"/>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Email" v-model="email"/>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field label="New Password*" type="password" v-model="password"/>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-date-picker  v-model="birthday"/>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn color="blue darken-1" text @click="clearForm">Close</v-btn>
                            <v-btn color="blue darken-1" text @click="sendNewProfileData">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-app>
    </div>
</template>

<script>
    export default {
        name: "ProfileDialog",

        data () {
            return {
                dialog: false,
                name: "",
                surname: "",
                birthday: "",
                gender: "",
                height: "",
                email: "",
                username: "",
                password: "",
            }
        },

        methods: {
            sendNewProfileData() {
                //Send to backend then clear
                this.clearForm()
            },
            clearForm() {
                this.dialog = false;
                this.name = "";
                this.surname = "";
                this.birthday = "";
                this.gender = "";
                this.height = "";
                this.email = "";
                this.username = "";
                this.password = "";
            }
        }
    }
</script>

<style scoped>

</style>
