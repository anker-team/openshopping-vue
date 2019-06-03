<template>
    <van-nav-bar
    :fixed = true
    :title="title"
    left-text=""
    left-arrow
    @click-left="onBack"
    >
        <van-icon name="wap-home" slot="right" @click="onClickHome"/>
    </van-nav-bar>
</template>

<script>
import { NavBar  } from 'vant';
export default {
    name:'headerNav',
    components:{
         [NavBar.name]: NavBar,
    },
    props:{
        title:String,
    },
    methods: {
        onBack() {
        history.back();
        },
        onClickHome() {
            this.$router.push('/home');
        }
    }
}
</script>

<style>

</style>
