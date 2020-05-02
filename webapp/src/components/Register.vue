<template>
    <div class="register-form" @submit="processForm">
        <link href='http://fonts.googleapis.com/css?family=Bitter' rel='stylesheet' type='text/css'>
        <h1>Sign up now!</h1>
        <p v-if="errors.length" class="error-list">
            <b>Please correct the following errors:</b>
        <ul>
            <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
        </ul>
        </p>
        <form id="registration">
            <div class="section"><span>1</span>Personal data:</div>
            <div class="inner-wrap">
                <label>Your full name <input type="text" v-model="fullname" name="fullname" required/></label>
                <label>Your birthday date <input type="date" v-model="birthday" name="birthday" required></label>
                <label>Your gender </label>
                <div class="gender">
                    <label><input type="radio" name="gender" v-model="gender" value="Male" required>Male</label>
                    <label><input type="radio" name="gender" v-model="gender" value="Female" required>Female</label>
                </div>
                <label>Your height <input type="number" v-model="weight" name="weight" /></label>
                <label>Your weight <input type="number" v-model="height" name="height" /></label>
            </div>

            <div class="section"><span>2</span>Account data:</div>
            <div class="inner-wrap">
                <label>Email address<input type="email" v-model="email" name="email" required></label>
                <label>Username <input type="text" v-model="username" name="username" required></label>
                <label>Password <input type="password" v-model="password" name="password" required/></label>
                <label>Confirm Password <input type="password" v-model="confirm_pass" name="confirm_pass" required/></label>
            </div>
            <div class="button-section">
                <input type="submit" name="Sign Up" value="Sign Up"/>
                <span class="achi-pub">
     <label><input type="checkbox"  v-model="achi_pub" name="pub_achi">Display your achievements publicly.</label>
     </span>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: "Register",
        data() {
            return {
                errors: [],
                fullname: "",
                birthday: "",
                gender: "",
                height: "",
                weight: "",
                email: "",
                username: "",
                password: "",
                confirm_pass: "",
                achi_pub: ""
            };
        },

        methods: {
            async processForm(e){
                this.errors = [];
                if(!(this.password === this.confirm_pass)){
                    //Inserted passwords do not match
                    console.log("Throw an error telling that the passwords don't match")
                    this.errors.push("Inserted passwords do not match.")
                }else{
                    //Begin the server side validation
                    console.log("Send the data to the registration server to begin validation")
                    //TODO await axios.post(Create the url)
                }
                e.preventDefault()
            }
        }
    }
</script>

<style scoped>
    .register-form{
    width:450px;
    padding:30px;
    margin:40px auto;
    background: #FFF;
    border-radius: 10px;
    -webkit-border-radius:10px;
    -moz-border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
    -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
    -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
    }

    .error-list b{
        font: normal 20px 'Bitter', serif;
        color: #2A88AD;
        margin-bottom: 5px;
    }

    .error-list ul{
        list-style: inside;
        margin-left: -60px;
    }

    .error-list li{
        font: normal 14px 'Bitter', serif;
        color: #ad1e1b;
        margin-bottom: 5px;
    }

    .register-form .inner-wrap{
        padding: 30px;
        background: #F8F8F8;
        border-radius: 6px;
        margin-bottom: 15px;
    }
    .register-form h1{
        background: #2A88AD;
        padding: 20px 30px 15px 30px;
        margin: -30px -30px 30px -30px;
        border-radius: 10px 10px 0 0;
        -webkit-border-radius: 10px 10px 0 0;
        -moz-border-radius: 10px 10px 0 0;
        color: #fff;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
        font: normal 30px 'Bitter', serif;
        -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
        -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
        box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
        border: 1px solid #257C9E;
    }
    .register-form h1 > span{
        display: block;
        margin-top: 2px;
        font: 13px Bitter, serif;
    }
    .register-form label{
        display: block;
        font: 13px  Bitter, serif;
        color: #888;
        margin-bottom: 15px;
    }
    .register-form input[type="text"],
    .register-form input[type="date"],
    .register-form input[type="datetime"],
    .register-form input[type="email"],
    .register-form input[type="number"],
    .register-form input[type="search"],
    .register-form input[type="time"],
    .register-form input[type="url"],
    .register-form input[type="password"],
    .register-form textarea,
    .register-form select {
        display: block;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        width: 100%;
        padding: 8px;
        border-radius: 6px;
        -webkit-border-radius:6px;
        -moz-border-radius:6px;
        border: 2px solid #fff;
        box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
        -moz-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
        -webkit-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
    }

    .gender label{
        display: inline-block;
        padding: 20px 30px 20px 30px;
        margin: -10px -15px 10px -15px;
    }

    .register-form .section{
        font: normal 20px 'Bitter', serif;
        color: #2A88AD;
        margin-bottom: 5px;
    }
    .register-form .section span {
        background: #2A88AD;
        padding: 5px 10px 5px 10px;
        position: absolute;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border: 4px solid #fff;
        font-size: 14px;
        margin-left: -45px;
        color: #fff;
        margin-top: -3px;
    }

    .register-form input[type="button"],
    .register-form input[type="submit"]{
        background: #2A88AD;
        padding: 8px 20px 8px 20px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        color: #fff;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
        font: normal 30px 'Bitter', serif;
        -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
        -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
        box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
        border: 1px solid #257C9E;
        font-size: 15px;
    }
    .register-form input[type="button"]:hover,
    .register-form input[type="submit"]:hover{
        background: #2A6881;
        -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
        -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
        box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
    }
    .register-form .achi-pub{
        float: left;
        width: 250px;
        font: 12px Bitter, serif;
        color: #4D4D4D;
        margin-right: 100px;
        margin-top: 10px;
        text-align: right;
    }


</style>
