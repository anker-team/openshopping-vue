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
		    window.location.href = 'http://book.lizengyi.com/#/'+ this.$route.params.uri
        }
    }
</script>
<style>

</style>
