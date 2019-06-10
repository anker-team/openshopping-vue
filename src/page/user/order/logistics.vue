<template>
    <div  style="background: #f7f7f7;">
        <headerNav title="订单追踪"/>
        
        <van-cell-group>
            <van-cell title="订单编号" value="18081609422771742" />
        </van-cell-group>
    <van-tabs >
        <van-tab title="物流信息">
            
<!--        <van-cell-group>-->
<!--            <van-cell title="快递方式" value="顺丰快递" />-->
<!--            <van-cell title="快递单号" value="51234548875645645" />-->
<!--        </van-cell-group>-->
        <van-steps direction="vertical" :active="data.length-2" active-color="#f60" style="margin-top: 15px;">
            <van-step v-for="(item,index) in data" :key="index">
                <h3>{{item.info}}</h3>
                <p>{{item.time}}</p>
            </van-step>
<!--            <van-step>-->
<!--                <h3>【城市】物流状态2</h3>-->
<!--                <p>2016-07-11 10:00</p>-->
<!--            </van-step>-->
<!--            <van-step>-->
<!--                <h3>快件已发货</h3>-->
<!--                <p>2016-07-10 09:30</p>-->
<!--            </van-step>-->
        </van-steps>
        </van-tab>
<!--        <van-tab title="包裹2">内容 3</van-tab>-->
    </van-tabs>
        
    </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
    name: 'logistics',
    data() {
        return {
            data: []
        }
    },
    created() {
        axios.get("http://api.lizengyi.com/index.php",{
            params: {
                s: "index/Api/getWulius",
                userID: Cookies.get('userid') ? Cookies.get('userid') : 6,
                orderID: this.$route.params.id
            }
        }).then(response => {
            this.data = response.data
        });
    }
}
</script>

<style>

</style>
