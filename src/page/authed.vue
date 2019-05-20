<template>
    <div>
        <p>aaa</p>
    </div>
</template>

<script>
    import page from './page/page.vue'
    import Cookies from "js-cookie";

    export default {
        created(){
            console.log(this.$route.params.uri);
        }
    }
</script>
<style>

</style>