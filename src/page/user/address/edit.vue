<template>
    <div>
     <headerNav :title="title"/>
      <van-field v-model="value" placeholder="请输入用户名" />
      <van-address-edit
      :area-list="areaList"
      :show-delete="showDelete"
      show-set-default
      show-search-result
      @save="onSave"
      @delete="onDelete"
      :addressInfo="info"
      />
    </div>
</template>

<script>
import areaList from '../../../data/area';
import { GetAddressById,SaveAddress,DelAddress } from "../../../api/user.js";

import { AddressEdit } from 'vant';
import axios from 'axios';
import Cookies from 'js-cookie'
export default {
    components:{
        [AddressEdit.name]:AddressEdit,
    },
    data() {
        return {
              areaList,
              showDelete:true,
              info:{
                  name:'',

              },
                showSet:true,
                value:'',
                showDelete:false,
            title: typeof(this.$route.query.id) == 'undefined' ? '新增地址' : '修改地址'
        }
  },

  methods: {
    onSave(data) {
      // SaveAddress(data).then(response=>{
      //   this.$toast('保存成功');
      //   this.$router.go(-1);
      // })
        axios.get("http://api.lizengyi.com/index.php",{
            params: {
                s: "index/Api/addAddress",
                userID: Cookies.get('userid') ? Cookies.get('userid') : 6,
                type: typeof(this.$route.query.id) !== "undefined" ? this.$route.query.id : 0,
                name: data.name,
                tel: data.tel,
                province: data.province,
                city: data.city,
                county: data.county,
                addressDetail: data.addressDetail,
                isDefault: data.isDefault ? 1 : 0,
                areaCode: data.areaCode,
            }
        }).then(response => {
            this.$toast('保存成功');
            this.$router.go(-1);
        })
    },
    onDelete(data) {
      // DelAddress(data).then(response=>{
      //   this.$toast('删除成功');
      //   this.$router.go(-1);
      // })
        axios.get("http://api.lizengyi.com/index.php",{
            params: {
                s: "index/Api/delAddress",
                id: this.$route.query.id
            }
        }).then(response => {
            Cookies.remove('address_id')
            Cookies.remove('address_name')
            Cookies.remove('address_tel')
            Cookies.remove('address_addr')
            this.$toast('删除成功');
            this.$router.go(-1);
        })
    },
  },
  created:function(){
    var id=this.$route.query.id;
    if(id>0){
      this.showDelete=true;
      // GetAddressById(id).then(response=>{
      //   console.log(response);
      //   this.info=response;
      // })
        axios.get("http://api.lizengyi.com/index.php",{
            params: {
                s: "index/Api/selectAddress",
                userID: Cookies.get('userid') ? Cookies.get('userid') : 6,
                id: id,
            }
        }).then(response => {
            this.info = response.data
        });
    }
  }

}
</script>

<style>
.van-picker__toolbar{
  font-size: 16px;
}
</style>
