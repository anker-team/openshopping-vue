<template>
  <div class="goods">
     <headerNav title="商品详情"/>
    <van-swipe class="goods-swipe" :autoplay="3000" :show-indicators="false">
      <van-swipe-item v-for="(thumb, index) in imgs" :key="index">
        <div style="width: 7.5rem; height: 6rem;">
            <img :src="thumb" style="width: 5rem; height: 6rem;margin:0 auto;">
        </div>
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <span class="goods-price">{{ formatPrice(detail.price) }}</span>
        <span class="goods-market-price">{{ formatPrice(detail.price_y) }}</span>
        <div class="goods-title">{{ detail.title }}</div>
        <div class="goods-subtit" v-html="detail.j_summary"></div>
      </van-cell>
        <van-cell>
            <div class="goods-title">作者: {{ detail.author }}</div>
            <div class="goods-title">出版社: {{ detail.publisher }}</div>
            <div class="goods-title">出版时间: {{ detail.publishtime }}</div>
            <div class="goods-title">ISBN: {{ detail.isbn }}</div>
        </van-cell>
      
      <van-cell   @click="onClickShowTag" class="goods-tag" >
        <template slot="title" style="font-size:10px;">
            <img src="http://source.lizengyi.com/imgs/ba8a4c2fdaa54f82a45261293c116af61419663676663i46n3jlh10028.png"/>
            <span >挪威品牌</span>
            <img src="http://source.lizengyi.com/imgs/13bd59e6e29a4f06b278c586629e690d.png" />
            <span >跨境商品</span>
            <van-icon name="passed" color="red" />
            <span >次日达</span>
            <van-icon name="passed" color="red" />
            <span >自提</span>
            <van-icon name="passed" color="red" />
            <span >闪电退款</span>
            <van-icon name="passed" color="red" />
            <span >前海保税仓</span>
            <van-icon name="passed" color="red" />
            <span >七天无理由退货（拆封后不支持）</span>
        </template>
      </van-cell>   
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell is-link  @click="showPromotion" >
        <template slot="title">
            <span style="margin-right: 10px;">领券</span>
            <van-tag type="danger" mark  style="margin-right: 5px;">满180减30</van-tag>
            <van-tag type="danger" mark  style="margin-right: 5px;">满300减100</van-tag>
        </template>
      </van-cell>
      
      <van-cell  is-link @click="showPromotion" >
        <template slot="title">
            <span style="margin-right: 10px;">促销</span>
            <van-tag type="danger" style="margin-right: 5px;">多买优惠</van-tag>
            <van-tag type="danger" style="margin-right: 5px;">满减</van-tag>
            <van-tag type="danger" style="margin-right: 5px;">限购</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
    
    <van-cell-group class="goods-cell-group">
      <van-cell  is-link @click="showSku" >
        <template slot="title">
            <span style="margin-right: 10px;">已选</span>
            <span >10件装</span>
        </template>
      </van-cell>
      
    </van-cell-group>
    
    <div class="goods-info">
        <p class="goods-info-title" >图书详情</p>
<!--        <div v-html="goods.info"></div>-->
        <p style="text-align: center;font-weight:lighter;font-size: 0.5rem;">---------图书简介--------</p>
        <div class="goods-subtit" v-html="detail.j_section"></div>
        <p style="text-align: center;font-weight:lighter;font-size: 0.5rem;">---------图书目录--------</p>
        <div class="goods-subtit" v-html="detail.j_catalog"></div>
        <p style="text-align: center;font-weight:lighter;font-size: 0.5rem;">---------编辑推荐语--------</p>
        <div class="goods-subtit" v-html="detail.j_commend"></div>
        <div>

        </div>
    </div>
    <van-goods-action>
        
      <van-goods-action-mini-btn icon="like-o" @click="sorry">
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
                    <span >次日达</span>
                    <div style="margin-left: 24px;font-size:10px;color:#7d7d7d;">指定时间前下单，次日送达</div>
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <van-icon name="passed" color="red" style="margin-right: 10px;" />
                    <span >自提</span>
                    <div style="margin-left: 24px;font-size:10px;color:#7d7d7d;">我们提供多种自提服务，包括自提点、自助提货柜、移动自提车等服务</div>
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <van-icon name="passed" color="red" style="margin-right: 10px;" />
                    <span >闪电退款</span>
                    <div style="margin-left: 24px;font-size:10px;color:#7d7d7d;">签收7天内退货的，提供先退款后退货服务。</div>
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <van-icon name="passed" color="red" style="margin-right: 10px;" />
                    <span >七天无理由退货（拆封后不支持）</span>
                    <div style="margin-left: 24px;font-size:10px;color:#7d7d7d;">七天无理由退货（拆封后不支持）</div>
                </template>
            </van-cell>
            <van-cell>
                <template slot="title">
                    <van-icon name="passed" color="red" style="margin-right: 10px;" />
                    <span >前海保税仓</span>
                    <div style="margin-left: 24px;font-size:10px;color:#7d7d7d;">本商品由前海保税仓发货</div>
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
          reset-stepper-on-hide
          reset-selected-sku-on-hide
          disable-stepper-input
          :close-on-click-overlay="closeOnClickOverlay"
          :message-config="messageConfig"
          :custom-sku-validator="customSkuValidator"
          @buy-clicked="onBuyClicked"
          @add-cart="onAddCartClicked"
        />
  </div>
</template>

<script>
// import skuData from '../../data/sku';
import axios from "axios"
import Cookies from "js-cookie";

export default {
  components: {
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
    };
  },
  methods: {
    formatPrice(data) {
      return '¥' + (data / 100 *100).toFixed(2);
    },
    onClickCart() {
      this.$router.push('/cart');
    },
    sorry() {
      Toast('暂无后续逻辑~');
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
                img: this.detail.imageURL,
                title: this.detail.title,
                kucun: data.selectedSkuComb.stock_num
            }
        }).then(response => {
            this.$toast.success('加入成功');
            this.showBase=false;
        });
    },

  },
    created() {
      this.$toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          mask: true,        //是否显示遮罩层
          loadingType: 'spinner',
          message: '加载中...'
      });
        axios.get("http://api.lizengyi.com/index.php",{
            params: {
                s: "index/Api/getDetailContent",
                from: 'youluwang',
                id: this.$route.params.id,
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
            this.$toast.clear();
        });
    }
};
</script>

<style lang="less">
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
        border-top: 1px solid #e5e5e5;
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
        line-height: 18px;
    padding-top: 10px;
    margin-bottom: 6px;
    font-size: 14px;
    color: #333;
    font-weight: 700;
    border-top: 1px solid #f0f0f0;
  }
  &-subtit{
      font-size: 13px;
    color: #333;
    line-height: 21px;
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
      height: 44px;line-height: 44px;text-align: center;font-size: 14px;font-weight: 700;margin: 10px;border-top: 1px solid #e5e5e5;
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