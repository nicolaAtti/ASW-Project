<template lang="html">
    <div class="parentx-static">
        <vs-sidebar static-position default-index="1" color="primary" class="sidebarx" spacer v-model="active">
            <vs-sidebar-item index="4" icon="account_box">
                Profile
            </vs-sidebar-item>
            <vs-sidebar-item index="2" icon="gavel">
                History
            </vs-sidebar-item>
            <div class="footer-sidebar" slot="footer">
                <vs-button icon="reply" color="danger" type="flat">log out</vs-button>
                <vs-button icon="settings" color="primary" type="border"></vs-button>
            </div>
        </vs-sidebar>
    </div>
</template>

<script>
  //  import router from "../router";

    export default {
        name: "HomePage",
        data:()=>({
            active:false,
        })
    }

</script>

<style scoped lang="stylus">

    .parentx-static {
        overflow: hidden;
        height: 500px;
        position: relative;
    }

    .header-sidebar {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
    }

    .footer-sidebar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    .footer-sidebar > button {
        border: 0px solid rgba(0,0,0,0) !important;
        border-left: 1px solid rgba(0,0,0,.07) !important;
        border-radius: 0px !important;
    }

</style>