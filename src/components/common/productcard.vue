<template>
    <van-cell-group class="additional">
        <van-card
        :title="product.title"
        :num="(iscard?null:null)"
        style="background:#fff;"
        >
            <template slot="thumb">
                <img :src="imgUrlCompute"/>
                <p v-if="product.imageTag!=null&&product.imageTag!=''" class="image_tag">{{product.imageTag}}</p>
            </template>
            <template slot="tags">
                <div class="author">
                    <span>
                        作者: <span v-if="product.author!=null&&product.author!=''">{{product.author}}</span>
                             <span v-else>未知</span>
                    </span>
                </div>
                <div class="author" >
                    <span>
                        出版社: <span v-if="product.publisher!=null&&product.publisher!=''">{{product.publisher}}</span>
                               <span v-else>未知</span>
                    </span>
                </div>
                <p class="price" v-if="product.price!=null&&product.price!=''" style="font-size: 18px;">
                    ￥<span style="font-size: 18px;">{{product.price}}</span>
                    <span class="account" style="font-size: 12px;">
                        {{account}}折
                    </span>
                    <van-tag v-if="product.tags!=null" v-for="tag in product.tags" :key="tag" plain type="danger">{{tag}}</van-tag>
                    <span v-if="$route.path.indexOf('order') !== -1" style="float:right;color: #000;font-weight: 100;font-size:14px;color:#b19f9f">x{{product.num}}</span>
                </p>
<!--                <div>-->
<!--                    <van-button plain type="primary" size="mini">删除</van-button><span></span>-->
<!--                    <i class="fa fa-bitbucket" style="color: gray"></i>-->
<!--                </div>-->
                <van-stepper v-if="iscard" v-model="product.num" :max="product.kucun"  :min="product.min" @change="onChange(product.id,product.num)"/>
            </template>
        </van-card>
        <van-cell  v-for="(gift,j) in product.gift" :key="j"  :value="'x'+gift.quantity" >
            <template slot="title">
                <van-tag type="danger" v-if="j==0" >赠品</van-tag>
                <span class="van-cell-text" :style="(j>0?'margin-left: 35px;':'')" >{{gift.title}}</span>
            </template>
        </van-cell>
        <slot />
    </van-cell-group>
</template>

<script>
    import axios from "axios"
export default {
    name:'product-card',
    props:{
        product:Object,
        iscard: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        onChange:function(id, value){
            axios.get("http://api.lizengyi.com/index.php",{
                params: {
                    s: "index/Api/changeGoodsCat",
                    catID: id,
                    newValue: value
                }
            }).then(response => {

            });
        }
    },
    computed: {
        account: function () {
            let a = (this.product.price*100)/(this.product.price_y*100)*10
            return a.toFixed(1)
        },
        imgUrlCompute: function () {
            let img = new Image();
            img.src = this.product.imgURL

            img.onload =  () => {
                if (img.width == 293 && img.height == 286) {
                    this.product.imgURL = "http://api.lizengyi.com/static/img/noPhoto.jpg"
                }
            }
            return this.product.imgURL
        }
    }
}
</script>

<style lang="less">
.additional {
    .van-cell {
        padding: 0 15px;
        font-size: 12px;
    }
    .van-cell:not(:last-child)::after{
        border:0;
    }
    /*.van-card {*/
    /*    padding: 10px 14px;*/
    /*}*/
    .van-card__content {
        height: 100px;
    }
    .van-card__title{
        font-size: 16px;
        line-height: 24px;
        max-height: 24px;
    }
    .van-cell__title {
        flex: 10;
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
        overflow: hidden;
        height: 40px;
        line-height: 40px;
      span {
        font-size: 18px;
            margin-right: 5px;
      }
      .van-tag{
        font-size: 12px;
      }
        .account {
            border: 1px solid #07c160;
            border-radius: 12%;
            color: #07c160;
            font-size: 12px;
            padding: 2px 4px;
        }
    }
    .price_y {
        color:#b6bcb8;
        text-decoration:line-through;
    }
    .author{
        color:#9e9e9e;
        font-size:12px;
        line-height: 18px;
    }
    .van-stepper{
        position: absolute;
        bottom: 5px;
        right: 5px;
        &__plus{
            width: 30px;
        }
        &__minus{
            width: 30px;
        }
    }
    .image_tag{
        position: absolute;
        bottom: 0;
        width: 90px;
        height: 20px;
        line-height: 20px;
        font-size: 10px;
        color: #fff;
        text-align: center;
        background-color: rgba(0,0,0,.7);
    }
}
.additional::after{
    border-color: #f7f7f7;

}
</style>
