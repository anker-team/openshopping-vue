<template>
    <div>
        <p>aaa</p>
    </div>
</template>

<script>
    import navigate from '../components/footer/navigate.vue'
    import page from './page/page.vue'
    import Cookies from "js-cookie";
    import axios from "axios"

    export default {
        created(){
            if (typeof(Cookies.get()) === 'undefined') {
                this.$route.push('http://api.lizengyi.com/wechatproxy.php?appid=wxf1e615ca4cb5c701&redirect_uri=http://api.lizengyi.com/index.php?s=index/Api/saveUserInfo')
            }
        }
    }
</script>
<style>

</style>