<template>
<div>

    <headerNav title="我的地址"/>
    <p style="line-height: 0.8rem;">test</p>
    <van-address-list
  v-model="chosenAddressId"
  :class="isSelect?'':'hideselect'"
  :list="list"
  @add="onAdd"
  @edit="onEdit"
  @select="onSelect"
/>
</div>
</template>

<script>

// import { GetAddressList } from "../../../api/user.js";
import { AddressList } from 'vant';
import axios from "axios"
import Cookies from "js-cookie";

export default {
    components:{
        [AddressList.name]:AddressList,
    },
    data() {
        return {
        chosenAddressId: '1',
        isSelect:false,
        list: [],
        }
    },

    methods: {
        onAdd() {
            this.$router.push('/user/address/edit')
        },

        onEdit(item, index) {
            this.$router.push('/user/address/edit?id='+item.id);
        },
        onSelect(item,index){
            if(!this.isSelect){
                return;
            }
            // this.$emit('selectAddress',item);
            // Cookies.set('address_id', item.id)
            // Cookies.set('address_name', item.name)
            // Cookies.set('address_tel', item.tel)
            // Cookies.set('address_addr', item.address)
            alert('aa')
            this.$router.go(-1);
        },
    },
    created:function(){
        // this.chosenAddressId=this.$route.query.id;
        this.isSelect=this.$route.query.id>0;   //允许看到
        //获取地址(origin)
        // GetAddressList().then(response=>{
        //     this.list=response;
        // });
        axios.get("http://api.lizengyi.com/index.php",{
            params: {
                s: "index/Api/selectAddress",
                userID: Cookies.get('userid') ? Cookies.get('userid') : 6,
            }
        }).then(response => {
            // console.log(response.data)
            this.list = response.data
            for(let item of this.list) {
                if (this.$route.query.id > 0) {
                    this.chosenAddressId=this.$route.query.id;
                } else {
                    if (item.isDefault === 1) {
                        this.chosenAddressId = item.id
                    }
                }
                if (item.province == item.city) {
                    item.address = item.city+
                        item.county+item.addressDetail
                } else {
                    item.address = item.province+item.city+
                        item.county+item.addressDetail
                }
            }
        });
    }

}
</script>

<style lang="less">
.hideselect{
    .van-radio__input{
        display: none;
    }
}
</style>
