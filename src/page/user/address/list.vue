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
        chosenAddressId: 1,
        isSelect:false,
        list: [],
        isIn: false,
        isChoose: false,
        ChooseId:1,
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
            if (this.isIn === true) { //不允许重复进入
                return;
            }
            this.isIn = true
            // this.$emit('selectAddress',item);
            Cookies.set('address_id', item.id)
            Cookies.set('address_name', item.name)
            Cookies.set('address_tel', item.tel)
            Cookies.set('address_addr', item.address)
            this.$router.go(-1);
        },
    },
    created:function(){
        // this.chosenAddressId=this.$route.query.id;
        // this.isSelect=this.$route.query.id>0;   //允许看到
        this.isSelect=true;   //允许看到
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
            this.list = response.data
            if(this.$route.query.id > 0) {
                this.ChooseId=this.$route.query.id;
                this.isChoose = true
            }
            for(let item of this.list) {
                if (item.isDefault === 1 && !this.isChoose) {
                    this.ChooseId = item.id
                }
                if (item.province == item.city) {
                    item.address = item.city+
                        item.county+item.addressDetail
                } else {
                    item.address = item.province+item.city+
                        item.county+item.addressDetail
                }
            }
            this.chosenAddressId=eval(this.ChooseId);
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
