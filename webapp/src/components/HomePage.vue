<template lang="html">
    <div>
        <Sidebar></Sidebar>
        <HomeContent></HomeContent>
    </div>
</template>

<script>
    import Sidebar from "./HomePage/Sidebar";
    import HomeContent from "./HomePage/HomeContent";

    export default {
        metaInfo: {
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ]
        },
        components: {
            Sidebar,
            HomeContent
        },
    }

</script>

<style lang="scss" scoped >


</style>