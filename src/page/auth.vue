<template>
    <div>
    </div>
</template>

<script>
    import Cookies from "js-cookie";

    export default {
        created(){
            alert(Cookies.get('openid'))
            if (typeof(Cookies.get('openid')) == 'undefined' || typeof(Cookies.get('userid')) == 'undefined') {
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf1e615ca4cb5c701&redirect_uri='+encodeURIComponent('http://api.lizengyi.com/index.php?s=index/Api/saveUserInfo&uri=auth')+'&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect'
            }
            this.$router.push('home')
        }
    }
</script>
<style>

</style>