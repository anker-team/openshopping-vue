<template>
    <van-cell-group class="additional">
        <van-card
        :title="product.title"
        :desc="product.desc"
        :num="(iscard?null:product.quantity)"
        style="background:#fff"
        >
            <template slot="thumb">
                <img :src="product.imgURL" />
                <p v-if="product.imageTag!=null&&product.imageTag!=''" class="image_tag">{{product.imageTag}}</p>
            </template>
            <template slot="tags">
                <div class="author" v-if="product.author!=null&&product.author!=''" >
                    <span>{{product.author}}</span>
                </div>
                <p class="price" v-if="product.price!=null&&product.price!=''" >
                    ￥<span>{{product.price}}</span>
                    <span v-if="product.price_y!=null&&product.price_y!=''">
                        <em class="price_y">￥{{product.price_y}}</em>
                    </span>

                    <van-tag v-if="product.tags!=null" v-for="tag in product.tags" :key="tag" plain type="danger">{{tag}}</van-tag>
                </p>
                <van-button plain type="primary" size="small">删除</van-button>
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
    .van-card__title{
        font-size: 14px;
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
        height: 24px;
      span {
        font-size: 16px;
            margin-right: 5px;
      }
      .van-tag{
        font-size: 12px;
      }
    }
    .price_y {
        color:#b6bcb8;
        text-decoration:line-through;
    }
    .author{
        color:#666666;
        font-size:12px;
        line-height: 14px;
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
