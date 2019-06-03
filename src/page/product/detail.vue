<template>
  <div class="goods" v-show="this.canShow">
     <headerNav title="商品详情"/>
    <van-swipe class="goods-swipe" :autoplay="3000" :show-indicators="false">
      <van-swipe-item v-for="(thumb, index) in imgs" :key="index">
<!--        <div style="width: 7.5rem; height: 6rem;">-->
        <div style="height: 4rem;margin-top: 46px;position: relative;">
<!--            <img :src="thumb" style="width: 5rem; height: 6rem;margin:0 auto;">-->
<!--            <img :src="thumb" style="width: 100%; height: 100%;margin:0 auto;background-color: #fff">-->
            <img :src="thumb" style="width: auto;height:80%;position:absolute;left: 33%;top: 10%;">

        </div>
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title" style="font-size:18px;line-height: 24px;font-weight: normal;border-top: 0;padding: 10px 0">{{ detail.title }}</div>
        <span class="goods-price" style="font-size:24px">{{ formatPrice(detail.price) }}</span>
        <span class="goods-price" style="font-size:12px;border:1px solid #06bf04;border-radius:12%;margin-left:10px;padding: 2px 5px;color:#06bf04;">{{discountNew}}折</span>
<!--        <span class="goods-market-price">{{ formatPrice(detail.price_y) }}</span>-->
<!--        <div class="goods-subtit" v-html="detail.j_summary"></div>-->
      </van-cell>
        <van-cell>
            <div class="goods-title"><span style="color: #ccc;">原价:</span> {{ formatPrice(detail.price_y) }}</div>
            <div class="goods-title"><span style="color: #ccc;">作者:</span> {{ detail.author }}</div>
            <div class="goods-title"><span style="color: #ccc;">出版社:</span> {{ detail.publisher }}</div>
            <div class="goods-title"><span style="color: #ccc;">出版时间:</span> {{ detail.publishtime }}</div>
            <div class="goods-title"><span style="color: #ccc;">ISBN:</span> {{ detail.isbn }}</div>
        </van-cell>
      
      <van-cell   @click="onClickShowTag" class="goods-tag" >
        <template slot="title" style="font-size:10px;">
            <van-icon name="passed" color="red" />
            <span >工坊自营</span>
            <van-icon name="passed" color="red" />
            <span >货到付款</span>
            <van-icon name="passed" color="red" />
            <span >消毒塑封</span>
            <van-icon name="passed" color="red" />
            <span >保证最低价</span>
            <van-icon name="passed" color="red" />
            <span >100%正品</span>
        </template>
      </van-cell>   
    </van-cell-group>

<!--    <van-cell-group class="goods-cell-group">-->
<!--      <van-cell is-link  @click="showPromotion" >-->
<!--        <template slot="title">-->
<!--            <span style="margin-right: 10px;">领券</span>-->
<!--            <van-tag type="danger" mark  style="margin-right: 5px;">满180减30</van-tag>-->
<!--            <van-tag type="danger" mark  style="margin-right: 5px;">满300减100</van-tag>-->
<!--        </template>-->
<!--      </van-cell>-->
<!--      -->
<!--      <van-cell  is-link @click="showPromotion" >-->
<!--        <template slot="title">-->
<!--            <span style="margin-right: 10px;">促销</span>-->
<!--            <van-tag type="danger" style="margin-right: 5px;">多买优惠</van-tag>-->
<!--            <van-tag type="danger" style="margin-right: 5px;">满减</van-tag>-->
<!--            <van-tag type="danger" style="margin-right: 5px;">限购</van-tag>-->
<!--        </template>-->
<!--      </van-cell>-->
<!--    </van-cell-group>-->
    
    <van-cell-group class="goods-cell-group">
      <van-cell  is-link @click="showSku" >
        <template slot="title">
            <span style="margin-right: 10px;">已选</span>
            <span >{{bookNum}}本</span>
        </template>
      </van-cell>
      
    </van-cell-group>
    
    <div class="goods-info">
        <p class="goods-info-title" >图书详情</p>
        <div class="goods-subtit" v-html="detail.j_summary"></div>
        <div>

        </div>
    </div>
    <van-goods-action>
        
      <van-goods-action-mini-btn icon="like-o" @click="sorry" :icon-class="collColor">
        收藏
      </van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="cart" @click="onClickCart">
        购物车
      </van-goods-action-mini-btn>
      <van-goods-action-big-btn @click="showSku">
        加入购物车
      </van-goods-action-big-btn>
      <van-goods-action-big-btn primary @click="showSku">
        立即购买
      </van-goods-action-big-btn>
    </van-goods-action>
    <van-actionsheet v-model="show" title="促销" style="font-size:14px;">
        
            <van-cell  is-link @click="sorry" >
                <template slot="title">
                    <van-tag type="danger">多买优惠</van-tag>
                    <span> 满2件，总价打9折</span>
                </template>
            </van-cell>
            <van-cell  is-link @click="sorry" >
                <template slot="title">
                    <van-tag type="danger">满减</van-tag>
                    <span> 满100元减50元</span>
                </template>
            </van-cell>
            <van-cell  is-link @click="sorry" >
                <template slot="title">
                    <van-tag type="danger">限购</van-tag>
                    <span> 购买不超过5件时享受单件价￥8.00，超出数量以结算价为准</span>
                </template>
            </van-cell>
    </van-actionsheet>
    
    <van-actionsheet v-model="showTag" title="服务说明" style="font-size:14px;">
        
            <van-cell>
                <template slot="title">
                    <van-icon name="passed" color="red" style="margin-right: 10px;" />
                    <span >工坊自营</span>
                    <div style="margin-left: 24px;font-size:10px;color:#7d7d7d;">工坊自营，全国调配货源。</div>
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <van-icon name="passed" color="red" style="margin-right: 10px;" />
                    <span >货到付款</span>
                    <div style="margin-left: 24px;font-size:10px;color:#7d7d7d;">货到付款,安心放心!</div>
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <van-icon name="passed" color="red" style="margin-right: 10px;" />
                    <span >消毒塑封</span>
                    <div style="margin-left: 24px;font-size:10px;color:#7d7d7d;">我们会对图书进行专业的消毒和包装。</div>
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <van-icon name="passed" color="red" style="margin-right: 10px;" />
                    <span >保证最低价</span>
                    <div style="margin-left: 24px;font-size:10px;color:#7d7d7d;">全网最低价,价值与价格兼具!</div>
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <van-icon name="passed" color="red" style="margin-right: 10px;" />
                    <span >100%正品</span>
                    <div style="margin-left: 24px;font-size:10px;color:#7d7d7d;">全部书籍均为正品，享受书籍带来的纯真乐趣。</div>
                </template>
            </van-cell>
    </van-actionsheet>
    <van-sku
          v-model="showBase"
          :sku="skuData.sku"
          :goods="skuData.goods_info"
          :goods-id="detail.id"
          :hide-stock="skuData.sku.hide_stock"
          :quota="skuData.quota"
          :quota-used="skuData.quota_used"
          reset-selected-sku-on-hide
          disable-stepper-input
          :close-on-click-overlay="closeOnClickOverlay"
          :message-config="messageConfig"
          @buy-clicked="onBuyClicked"
          @add-cart="onAddCartClicked"
          @stepper-change="onStepChange"
        />
<!--      <navigate/>-->
  </div>
</template>

<script>
// import skuData from '../../data/sku';
import axios from "axios"
import Cookies from "js-cookie";
import Navigate from "../../components/footer/navigate";

export default {
  components: {
      Navigate
  },
  data() {
    // this.skuData = skuData;
    return {
      show:false,
      showTag:false,
      showBase: false,
      showCustom: false,
      showStepper: false,
      closeOnClickOverlay: true,
      // customSkuValidator: (component) => {
      //   return '请选择xxx';
      // },
      customStepperConfig: {
        quotaText: '单次限购100件',
        stockFormatter: (stock) => `剩余${stock}间`,
        handleOverLimit: (data) => {
          const { action, limitType, quota } = data;
          if (action === 'minus') {
            this.$toast('至少选择一件商品');
          } else if (action === 'plus') {
            if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
              this.$toast(`限购${quota}件`);
            } else {
              this.$toast('库存不够了~~');
            }
          }
        }
      },
      messageConfig: {
        uploadImg: (file, img) => {
          return new Promise(resolve => {
            setTimeout(() => resolve(img), 1000);
          });
        },
        uploadMaxSize: 3
      },
        detail: [],
        skuData: {
            sku: {
                tree: [],
                list: [],
                price: '2.00',    //价格
                market_price:'10.00',
                stock_num: 227,   //库存
                collection_id: 2261,
                collection_price: 0,
                none_sku: true,
                sold_num: 0,
                min_price: '1.00',
                max_price: '1.00',
                messages: [
                ],
                hide_stock: false
            },
            quote: 0,  //限购,0表示不限购
            goods_info: {},
        },
        imgs: [],
        collection : false,   //是否收藏
        collColor: "",
        bookNum: 1,   //选择书籍数量
        canShow: false,  //是否直接显示模板
    };
  },
  methods: {
    formatPrice(data) {
      return '¥ ' + (data / 100 *100).toFixed(2);
    },
    onClickCart() {
      this.$router.push('/cart');
    },
    sorry() {
        axios.get("http://api.lizengyi.com/index.php",{
            params: {
                s: "index/Api/addGoodsColl",
                userID: Cookies.get('userid') ? Cookies.get('userid') : 6,
                from: this.detail.from,
                goodsID: this.$route.params.id,
                fangshi: this.collection === "yes" ? "no" : "yes",
                price: this.detail.price,
                price_y: this.detail.price_y,
                imgURL: this.detail.imageURL,
                title: this.detail.title,
                kucun: this.detail.kucun,
                author: this.detail.author,
                publisher: this.detail.publisher,
            }
        }).then(response => {
            this.collection = this.collection === "yes" ? "no" : "yes"
            if (this.collection === "yes") {
                this.collColor = "coll-color"
                this.$toast.success("收藏成功")
            } else {
                this.collColor = ""
            }
        });
    },
    showPromotion() {
        this.show=true;
    },
    showSku(){
        this.showBase=true;
    },
    onClickShowTag(){
        this.showTag=true;
    },
    onBuyClicked(data) {
      this.$toast(JSON.stringify(data));
    },
    onAddCartClicked(data) {
        axios.get("http://api.lizengyi.com/index.php",{
            params: {
                s: "index/Api/addGoodsCat",
                userID: Cookies.get('userid') ? Cookies.get('userid') : 6,
                from: this.detail.from,
                goodsID: data.goodsId,
                num: data.selectedNum,
                price: data.selectedSkuComb.price/100,
                price_y: this.detail.price_y,
                imgURL: this.detail.imageURL,
                title: this.detail.title,
                kucun: data.selectedSkuComb.stock_num,
                author: this.detail.author,
                publisher: this.detail.publisher,
            }
        }).then(response => {
            this.$toast.success('加入成功');
            this.showBase=false;
        });
    },
      onStepChange(value) {
            this.bookNum = value
      }

  },
    created() {
      this.$toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          mask: true,        //是否显示遮罩层
          loadingType: 'spinner',
          message: '加载中...'
      });
      //商品详情页
        axios.get("http://api.lizengyi.com/index.php",{
            params: {
                s: "index/Api/getDetailContent",
                from: this.$route.query.from,
                id: this.$route.params.id,
                userID: Cookies.get('userid') ? Cookies.get('userid') : 6,
            }
        }).then(response => {
            this.detail = response.data;
            this.skuData.goods_info.title = this.detail.title;
            this.skuData.goods_info.picture = this.detail.imageURL;
            this.imgs = [
                this.detail.imageURL,
                this.detail.imageURL
            ]
            this.skuData.sku.price = this.detail.price
            this.skuData.sku.stock_num = this.detail.kucun
            //收藏
            this.collection = this.detail.isColl
            if (this.collection === "yes") {
                    this.collColor = "coll-color"
            }
            this.$toast.clear();
            this.canShow = true;
        });
    },
    computed:{
        discountNew: function(){
            let a = (this.detail.price*100)/(this.detail.price_y*100)*10
            return a.toFixed(1)
        }
    }
};
</script>

<style lang="less">
.coll-color {
    color: red;
}
.goods {
  padding-bottom: 50px;
  &-swipe {
    img {
      width: 7.5rem;
      height: 7.5rem;
      display: block;
    }
  }
  &-tag{
      font-size: 12px;
        /*border-top: 1px solid #e5e5e5;*/
        span{
      margin-right: 10px;
        }
        i{
            color: red;
            margin-right: 3px;
        }
        img{
          width: 12px;
          margin-right: 3px;
          margin-top: 6px;
      }
  }
  &-title {
        line-height: 12px;
    padding-top: 10px;
    margin-bottom: 6px;
    font-size: 14px;
    color: #333;
    /*font-weight: 700;*/
      font-weight: normal;
    /*border-top: 1px solid #f0f0f0;*/
  }
  &-subtit{
      background-repeat: round;
      background-image: url(http://api.lizengyi.com/static/img/detail_bg.jpg);
      font-size: 13px;
    color: #333;
    line-height: 21px;
      padding: 10px 14px;
  }
  &-price {
    color: #f44;font-size: 20px;
  }
  &-market-price {    
    text-decoration: line-through;
    margin-left: 8px;
    font-size: 13px;
    color: #999;
  }
  &-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }
  &-info-title{
      height: 44px;line-height: 44px;text-align: center;font-size: 14px;font-weight: 700;margin: 10px;
  }
  &-info p{
          margin: 0;
    padding: 0;
    margin-block-end: 0;
    margin-block-start: 0;
    display: grid;
  }
  &-info img{
      width: 100%;
  }
}
</style>