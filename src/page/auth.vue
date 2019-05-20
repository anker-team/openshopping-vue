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
            if (typeof(Cookies.get('openid')) == 'undefined') {
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf1e615ca4cb5c701&redirect_uri='+encodeURIComponent('http://api.lizengyi.com/index.php?s=index/Api/saveUserInfo&uri=auth')+'&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect'
            }
            console.log(Cookies.get('openid'))
        }
    }
</script>
<style>

</style>