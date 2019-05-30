<template>
  <div class="order">
     <headerNav title="确认订单"/>
    <p style="line-height: 0.8rem;">test</p>
     <van-cell
      center
      :border="false"
      class="contact-card"
      is-link
    >
      <template v-if="type === 'add'" @click="addressUrl">
        <strong>选择地址</strong>
      </template>
      <template v-else @click="addressUrl">
        <strong>{{name}} {{tel}}</strong>
        <div>{{address}} </div>
      </template>
    </van-cell>
    <div style="height:15px;"></div>
    <div class="card" v-for="(product,i) in orders" :key="i">
      <product-card :product='product' />
    </div>
    <div style="height:15px;"></div>
    <van-cell-group>
      <van-field
        label="备注"
        type="textarea"
        placeholder="请输入备注"
        rows="1"
        autosize
      />
    </van-cell-group>
    <div style="height:15px;"></div>
<!--    <van-cell-group class="total">-->
<!--        <van-cell title="优惠券" is-link value="抵扣¥5.00" />-->
<!--    </van-cell-group>-->
    
    <div style="height:15px;"></div>
    <van-cell-group class="total">
        <van-cell title="商品总额" :value="totalPrice" />
        <van-cell title="运费" :value="'+ '+ freight.toFixed(2)" />
        <van-cell title="折扣" :value="'- '+ discount.toFixed(2)" />
        <van-cell title="实付金额" :value="finalPrice" style="font-weight: 700;" />
    </van-cell-group>

    <div style="height:50px;"></div>
    <van-submit-bar
      :price="finalPrice1"
      button-text="提交订单"
      label='实付金额：'
      @submit="onSubmit"
    />

  </div>
</template>

<script>
import axios from "axios"
import Cookies from "js-cookie";

export default {
  data() {
    return {
      type: "add1",
      products: [
        {
          imageURL:
            "http://source.lizengyi.com/imgs/5aab8dbbNedb77d88.jpg",
          title: "良品铺子 肉肉聚汇猪肉脯 猪蹄卤 辣味小吃520g",
          desc: "0.670kg/件，肉肉聚汇520g",
          price: "59.80",
          quantity: 2
        },
        {
          imageURL:
            "http://source.lizengyi.com/imgs/5b5e69b3Nf4f0e9e7.jpg",
          title: "元朗 鸡蛋卷 饼干糕点 中秋礼盒 广东特产680g",
          desc: "1.320kg/件",
          price: "65.80",
          quantity: 1,
          gift: [
            {
              title: "星巴克（Starbucks）星冰乐小熊吊饰星巴克（Starbucks）星冰乐小熊吊饰",
              quantity: 2
            },
            {
              title: "星巴克（Starbucks）星冰乐小熊吊饰星巴克（Starbucks）星冰乐小熊吊饰",
              quantity: 1
            }
          ]
        },
        {
          imageURL:
            "http://source.lizengyi.com/imgs/5aab8dbbNedb77d88.jpg",
          title: "良品铺子 肉肉聚汇猪肉脯 猪蹄卤 辣味小吃520g",
          desc: "0.670kg/件，肉肉聚汇520g",
          price: "59.80",
          quantity: 2
        },
      ],
      orders: [],
      freight : 3.78,
      discount: 1.39,
      name: 'li',
      tel: '',
      address: '',
    };
  },
  methods: {
    onSubmit() {
      this.$toast("点击按钮");
    },
  },
  activated(){
    //根据key名获取传递回来的参数，data就是map
    this.$on('selectAddress', function(data){
        //赋值给首页的附近医院数据模型
        console.log(data);
    }.bind(this));
},
created() {
  axios.get("http://api.lizengyi.com/index.php",{
    params: {
      s: "index/Api/sureOrder",
      userID: Cookies.get('userid') ? Cookies.get('userid') : 6,
      catsID: this.$route.params.catsID,
    }
  }).then(response => {
    this.orders = response.data.catsData
    if (typeof(Cookies.get('address_id')) !== "undefined") { //直接从cookie读地址
      this.name = Cookies.get('address_name')
      let tel = Cookies.get('address_tel')
      this.tel = tel.slice(0,3)+"****"+tel.slice(6,10)
      this.address = Cookies.get("address_addr")
    } else {
      let addressInfo = response.data.addressData
      this.name = addressInfo.name
      this.tel = addressInfo.tel.slice(0,3)+"****"+addressInfo.tel.slice(6,10)
      if (addressInfo.province == addressInfo.city) {
        this.address = addressInfo.city+addressInfo.county+addressInfo.addressDetail
      } else {
        this.address = addressInfo.province+addressInfo.city+addressInfo.county+addressInfo.addressDetail
      }
      if (response.data.addressData.length === 0) {
        this.type = "add"
      }
    }
  });
},
computed:{
  totalPrice() {
    let total =  (this.orders.reduce((total, item) => total+ item.price*100*item.num, 0))/100;
    return total.toFixed(2);
  },
  finalPrice() {
    return (parseFloat(this.totalPrice)+this.freight-this.discount).toFixed(2);
  },
  finalPrice1() {
    return this.finalPrice*100
  },
  addressUrl() {
    let userid = Cookies.get('userid') ? Cookies.get('userid') : 6;
    return "/user/address?id="+userid;
  }
}
};
</script>

<style lang="less">
.order {
  font-size: 14px;
  background: #f7f7f7;
  .contact-card::before {
    content: "";
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    position: absolute;
    background: -webkit-repeating-linear-gradient(
      135deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #3283fa 0,
      #3283fa 45%,
      transparent 0,
      transparent 50%
    );
    background: repeating-linear-gradient(
      -45deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #3283fa 0,
      #3283fa 45%,
      transparent 0,
      transparent 50%
    );
    background-size: 80px;
  }
  .total {
    .van-cell__value {
      color: red;
    }
  }
  
  .van-submit-bar__bar {
    border-top: 1px solid #f7f7f7;
  }
  .additional {
    .van-cell {
      padding: 0 15px;
      font-size: 12px;
    }
    .van-cell__title {
      flex: 11;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .van-tag {
      line-height: 12px;
      margin-right: 5px;
    }
    
    .price {
      color: #e93b3d;
      font-size: 10px;
      span {
        font-size: 16px;
      }
    }
  }
}
</style>
