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
            Cookies.set('userid', this.$route.params.userid)
            var uri = this.$route.params.uri
            setTimeout(function(){
                window.location.href = 'http://book.lizengyi.com/#/'+ uri
            }, 300)

        }
    }
</script>
<style>

</style>
