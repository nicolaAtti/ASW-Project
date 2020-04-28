<template>
    <div class="register-form">
        <form>
            <fieldset>
                <legend>Personal data:</legend>
                <label for="name">Name:</label><br>
                <input type="text" id="name"><br>
                <label for="surname">Surname:</label><br>
                <input type="text" id="surname"><br>
                <label for="birthday">Birthday date:</label><br>
                <input type="date" id="birthday"><br>
                <input type="radio" id="male" name="gender" value="male">
                <label for="male">Male</label><br>
                <input type="radio" id="female" name="gender" value="female">
                <label for="female">Female</label><br>
                <label for="email">Email address:</label><br>
                <input type="email" id="email"><br>
                <label for="height">Height:</label><br>
                <input type="number" id="height"><br>
                <label for="weight">Weight:</label><br>
                <input type="number" id="weight"><br>
                <label for="uname">Username:</label><br>
            </fieldset>
            <fieldset>
                <legend>Account data:</legend>
                <input type="text" id="uname"><br>
                <label for="pass">Password:</label><br>
                <input type="password" id="pass"><br>
                <label for="confirm-pass">Confirm password:</label><br>
                <input type="password" id="confirm-pass"><br>
                <input type="radio" id="pub-achi" name="pub-achievements" value="">
                <label for="pub-achi">Display achievement publicly</label>
            </fieldset>
            <input type="submit" value="Register">
        </form>
    </div>
</template>

<script>
    export default {
        name: "Register"
    }
</script>

<style scoped>

</style>
