<template>
<div>
    <headerNav title="我的收藏"/>
    <van-list style="margin-top:46px"
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        >
        <div v-for="(item,index) in list" :key="index">
            <router-link :to="{ name: 'product', params: {id: item.goodsID}, query: {from: item.from}}">
                <van-swipe-cell :right-width="65" :on-close="onClose(item)">
                    <product-card :product='item' />
                        <span slot="right" >删除</span>
                </van-swipe-cell>
            </router-link>
        </div>
    </van-list>
</div>
</template>

<script>
import { GetFavorite ,DelFavorite} from "../../../api/user.js";
import axios from "axios"
import Cookies from "js-cookie"

export default {
    data(){
        return{
            loading:false,
            finished:false,
            list:[],
            page:0,
        }
    },
    methods:{
        onClose(item){
            return function(clickPosition, instance) {
                switch (clickPosition) {
                    case 'left':
                    case 'cell':
                    case 'outside':
                    instance.close();
                    break;
                    case 'right':
                        this.$dialog.confirm({
                            message: '确定删除吗？'
                        }).then(() => {
                            DelFavorite(item.id).then(response=>{
                                this.$toast('删除成功');
                                this.$router.go(0);  
                            })
                            instance.close();
                        }).catch(() => {
                        // on cancel
                        });
                    break;
                }
            }
        },
        onLoad() {
            // this.page++;
            // GetFavorite().then(response=>{
            //     response.list.forEach(item => {
            //         this.list.push(item);
            //     });
            //     this.loading = false;
            //     if(response.TotalPage<=this.page){
            //         this.finished = true;
            //     }
            //
            // })
            axios.get("http://api.lizengyi.com/index.php",{
                params: {
                    s: "index/Api/getGoodsColl",
                    userID: Cookies.get('userid') ? Cookies.get('userid') : 6,
                }
            }).then(response => {
                this.list = response.data
                // this.list.imageURL = response.data.imgURL
                this.loading = false
                this.finished = true
            });
        }
    },
}
</script>

<style lang="less">
.van-swipe-cell{
    &__left,
    &__right {
      color: #FFFFFF;
      font-size: 15px;
      width: 65px;
      height: 100px;
      display: inline-block;
      text-align: center;
      line-height: 100px;
      background-color: #F44;
    }
}
</style>
