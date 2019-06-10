<template>
    <div style="background: #f7f7f7; margin-top: 46px">
        <headerNav title="订单详情"/>
        <van-steps :active="active">
            <van-step>提交订单</van-step>
            <van-step>配送中</van-step>
            <van-step>交易完成</van-step>
        </van-steps>
        
<!--        <van-cell class="logistics" to="/user/order/logistics/1" title="您的订单已由本人签收（已在配送员处采用无纸化方式签收本订单）。感谢您在京东购物，欢迎再次光临。参加评价还能赢取京豆哟。" label="2018-08-31 21:04:03" icon="logistics" is-link />-->
        <van-cell class="logistics" to="/user/order/logistics/1" :title="logistics.info" :label="logistics.time" icon="logistics" is-link />
        <div style="height:15px;"></div>
        <van-cell-group>
            <van-cell
            center
            :border="false"
            >
      <template>
        <div>{{address.name}} {{address.tel}}</div>
        <div>{{address.area}} </div>
      </template>
    </van-cell>
        </van-cell-group>
        
        <div style="height:15px;"></div>
        <div v-for="(product,i) in products_new.goodsList" :key="i">
          <product-card :product='product' />
        </div>
        <div style="height:15px;"></div>
        <van-cell-group>
            <van-cell title="订单编号" :value="products_new.ordercode" />
            <van-cell title="下单时间" :value="products_new.addTime" />
            <van-cell title="订单状态" :value="products_new.statusName" />
        </van-cell-group>
        <div style="height:15px;"></div>
        <van-cell-group class="total">
            <van-cell title="商品总额" :value="(products_new.z_price - products_new.yunfei).toFixed(2)" />
            <van-cell title="运费" :value="'+ '+products_new.yunfei.toFixed(2)" />
            <van-cell title="实付金额" :value="products_new.z_price.toFixed(2)" style="font-weight: 700;" />
        </van-cell-group>
        <div class="footer">
            <div class="munu">
                <van-button size="small">确认收货</van-button>
                <van-button size="small" type="danger">支付</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

    export default {
    data(){
        return{
            active:0,
            products:[
                {
                    imageURL:'http://source.lizengyi.com/imgs/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
                    title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
                    price:'499',
                    quantity:2
                },
                {
                    imageURL:'http://source.lizengyi.com/imgs/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
                    title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
                    price:'499',
                    quantity:2
                },
            ],
            products_new: {},
            address: {},
            logistics: {},  //物流
        }
    },
    created() {
        axios.get('http://api.lizengyi.com', {
            params: {
                s: 'index/Api/getOrderDetail',
                userID: Cookies.get('userid') ? Cookies.get('userid') : 6,
                orderID: this.$route.params.id,
            }
        }).then(response => {
            this.products_new = response.data.products   //产品
            this.active = response.data.products.status  //运送状态
            this.address = response.data.addressData     //地址
            this.logistics = response.data.wulius       //物流

        });
    }
}
</script>

<style lang="less">
.logistics{
        margin-top: 15px;
    i{
        line-height: 60px;    font-size: 20px;
    }
    .van-cell__title span{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .van-cell__label{
        color: #999;
    }
}
.total{
    .van-cell__value{color: red;}
}
.footer{
    height:50px;
    .munu{
        position: fixed;
        height: 49px;
        border-top: 1px solid #e5e5e5;
        bottom: 0;
        background: #fff;
        width: 100%;
        line-height: 24px;
    text-align: right;
        .van-button{
            margin-right: 10px;
        }
    }
}
</style>
