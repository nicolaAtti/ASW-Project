<template lang="html">
    <div class="menu-container">

        <!-- root level items -->
        <ul class="menu">

            <li class="menu__top">
                <a href="#" class="menu__title" >
                    App Title
                </a>
            </li>

            <li>
                <a href="#"  >
                    <i class="fa fa-tag menu__icon" aria-hidden="true"></i>
                    Sessions History
                </a>
            </li>

            <li>
                <a href="#" >
                    <i class="fa fa-user menu__icon" aria-hidden="true"></i>
                    Profile
                    <i class="fa fa-chevron-right menu__arrow-icon" aria-hidden="true"></i>
                </a>
            </li>

        </ul>
    </div>
</template>

<script>
  //  import router from "../router";

    export default {
        name: "HomePage",
    }

</script>

<style scoped >


</style>