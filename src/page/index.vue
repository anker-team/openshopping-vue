<template>
    <div>
        <page/>
        <navigate />
    </div>
</template>

<script>
import navigate from '../components/footer/navigate.vue'
import page from './page/page.vue'
import Cookies from "js-cookie";

export default {
    components:{
        page,
        navigate
    },
    created(){
        Cookies.set('name', 'lizengcai')
    }
}
</script>
<style>

</style>


