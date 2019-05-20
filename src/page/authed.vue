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
            Cookies.set('openid', this.$route.params.openid)
            setTimeout(function(){
                window.location.href += '/#/'+this.$route.params.uri
            },5000)

        }
    }
</script>
<style>

</style>