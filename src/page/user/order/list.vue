<template>
<div>
     <headerNav title="我的订单"/>
    <van-tabs v-model="active">
        <van-tab title="全部">

            <div v-for="(item,index) in allList" :key="index">
                <van-cell-group class="order-item" >
                    <van-panel :title="'订单：'+item.ordercode" :status="item.state"  >
                    <div slot="header">
                        <van-cell class="title" :title="'订单：'+item.ordercode" :value="item.statusName" :to="'/user/order/info/'+item.id"/>
                    </div>
                        <div>
                            <router-link :to="'/user/order/info/'+item.id">
                            <div v-if="item.products.length==1" v-for="(product,i) in item.products" :key="i">
                                <product-card :product='product' />
                            </div>
                            <div  v-if="item.products.length>1" class="more" >
                                <div class="item" v-for="(product,i) in item.products" :key="i">
                                    <div >
                                        <img :src="product.imgURL"/>
                                    </div>
                                </div>
                            </div>
                            </router-link>
                        </div>
                        <div slot="footer" style="height: 20px;">
                            <span class="total">总价：￥{{item.z_price}}</span>
<!--                            <van-button size="small">确认收货</van-button>-->
<!--                            <van-button size="small" type="danger">支付</van-button>-->
                        </div>
                    </van-panel>
                </van-cell-group>
            </div>

        </van-tab>
        <van-tab title="待发货">

            <div v-for="(item,index) in unrecieve" :key="index">
                <van-cell-group class="order-item" >
                    <van-panel :title="'订单：'+item.ordercode" :status="item.state"  >
                        <div slot="header">
                            <van-cell class="title" :title="'订单：'+item.ordercode" :value="item.statusName" :to="'/user/order/info/'+item.id"/>
                        </div>
                        <div>
                            <router-link :to="'/user/order/info/'+item.id">
                                <div v-if="item.products.length==1" v-for="(product,i) in item.products" :key="i">
                                    <product-card :product='product' />
                                </div>
                                <div  v-if="item.products.length>1" class="more" >
                                    <div class="item" v-for="(product,i) in item.products" :key="i">
                                        <div >
                                            <img :src="product.imgURL"/>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div slot="footer" style="height: 20px;">
                            <span class="total">总价：￥{{item.z_price}}</span>
<!--                            <van-button size="small">确认收货</van-button>-->
<!--                            <van-button size="small" type="danger">支付</van-button>-->
                        </div>
                    </van-panel>
                </van-cell-group>
            </div>

        </van-tab>
        <van-tab title="配送中">

            <div v-for="(item,index) in onroad" :key="index">
                <van-cell-group class="order-item" >
                    <van-panel :title="'订单：'+item.ordercode" :status="item.state"  >
                        <div slot="header">
                            <van-cell class="title" :title="'订单：'+item.ordercode" :value="item.statusName" :to="'/user/order/info/'+item.id"/>
                        </div>
                        <div>
                            <router-link :to="'/user/order/info/'+item.id">
                                <div v-if="item.products.length==1" v-for="(product,i) in item.products" :key="i">
                                    <product-card :product='product' />
                                </div>
                                <div  v-if="item.products.length>1" class="more" >
                                    <div class="item" v-for="(product,i) in item.products" :key="i">
                                        <div >
                                            <img :src="product.imgURL"/>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div slot="footer" style="height: 20px;">
                            <span class="total">总价：￥{{item.z_price}}</span>
<!--                            <van-button size="small">确认收货</van-button>-->
<!--                            <van-button size="small" type="danger">支付</van-button>-->
                        </div>
                    </van-panel>
                </van-cell-group>
            </div>

        </van-tab>
        <van-tab title="已完成">

            <div v-for="(item,index) in aftersale" :key="index">
                <van-cell-group class="order-item" >
                    <van-panel :title="'订单：'+item.ordercode" :status="item.state"  >
                        <div slot="header">
                            <van-cell class="title" :title="'订单：'+item.ordercode" :value="item.statusName" :to="'/user/order/info/'+item.id"/>
                        </div>
                        <div>
                            <router-link :to="'/user/order/info/'+item.id">
                                <div v-if="item.products.length==1" v-for="(product,i) in item.products" :key="i">
                                    <product-card :product='product' />
                                </div>
                                <div  v-if="item.products.length>1" class="more" >
                                    <div class="item" v-for="(product,i) in item.products" :key="i">
                                        <div >
                                            <img :src="product.imgURL"/>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div slot="footer" style="height: 20px;">
                            <span class="total">总价：￥{{item.z_price}}</span>
<!--                            <van-button size="small">确认收货</van-button>-->
<!--                            <van-button size="small" type="danger">支付</van-button>-->
                        </div>
                    </van-panel>
                </van-cell-group>
            </div>

        </van-tab>
    </van-tabs>
    <navigate />

</div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
    components:{
    },
    data(){
        return{
            active:1,

            allList: [],    //全部
            unrecieve: [],  //待发货
            onroad: [], //配送中
            aftersale: [], //已完成
            
            list:[
                {
                    orderid:1,
                    ordercode:'4511248234235',
                    state:'待付款',
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
                            quantity:1
                        },
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
                        {
                            imageURL:'http://source.lizengyi.com/imgs/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
                            title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
                            price:'499',
                            quantity:2
                        },
                    ]
                },
                {
                    orderid:2,
                    ordercode:'4511248234235',
                    state:'待收货',
                    products:[
                        {
                            imageURL:'http://source.lizengyi.com/imgs/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
                            title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
                            price:'499',
                            quantity:2
                        }
                    ]
                },
                {
                    orderid:3,
                    ordercode:'4511248234235',
                    state:'已完成',
                    products:[
                        {
                            imageURL:'http://source.lizengyi.com/imgs/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
                            title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
                            price:'499',
                            quantity:2
                        }
                    ]
                },
                {
                    orderid:4,
                    ordercode:'4511248234235',
                    state:'已取消',
                    products:[
                        {
                            imageURL:'http://source.lizengyi.com/imgs/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
                            title:'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
                            price:'499',
                            quantity:2
                        }
                    ]
                },
            ]
        }
    },
    created() {
        this.active = this.$route.params.id;
        axios.get('http://api.lizengyi.com', {
            params: {
                s: "index/Api/getOrderList",
                userID: Cookies.get('userid') ? Cookies.get('userid') : 6,
            }
        }).then(response => {
            this.allList = response.data.all   //所有
            this.unrecieve = response.data.UnRecieveTotal   //代发货
            this.onroad = response.data.OnRoad    //在路上
            this.aftersale = response.data.AfterSaleTotal   //已完成
        });
    }
}
</script>

<style lang="less">

.order-item{
    margin-bottom: 10px;
    font-size: 12px;
    .title{
        border-bottom: 1px solid #e5e5e5;

        .van-cell__title{
            flex: 2;
        }
        .van-cell__value{
            color: red;
        }
    }

    
    .van-panel__footer {
        text-align: right;
        border-bottom: 1px solid #e5e5e5;
    }
    .van-button {
        margin-left: 5px;
    }
    .total{
    position: absolute;
    top: 10px;
    left: 15px;
    font-size: 13px;
    }
    .more{
        overflow-x: scroll;white-space: nowrap;    -webkit-overflow-scrolling: touch;    margin: 5px 0 5px 15px;
        .item{
            width: 90px; height:90px; margin-right: 10px;display: inline-block;
            img{
                width: 100%;
            }
        }
    }
}
</style>
