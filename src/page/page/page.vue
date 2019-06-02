<template>
<div :style="'background-color:'+((page.BackgroundColor==undefined||page.BackgroundColor=='')?'#fff':page.BackgroundColor)">
    <div :style="'height:'+topheight+'px'" ></div>
    <div v-for="(item,index) in page.Sections" :key="index">
        <imageAd v-if="item.Code=='ImageAd'" :data="item.ParameterDictionary"></imageAd>
        
        <imageText v-if="item.Code=='ImageText'" :data="item.ParameterDictionary"></imageText>

        <pageLine v-if="item.Code=='Line'"  :data="item.ParameterDictionary" ></pageLine>

        <whitespace v-if="item.Code=='Line'" :data="item.ParameterDictionary"  />

        <pageText v-if="item.Code=='Text'" :data="item.ParameterDictionary" ></pageText>

        <notice v-if="item.Code=='Notice'" :data="item.ParameterDictionary" ></notice>

        <search v-if="item.Code=='Search'" :data="item.ParameterDictionary" v-on:settopheight="settopheight($event)" ></search>

        <pageTitle v-if="item.Code=='Title'" :data="item.ParameterDictionary" ></pageTitle>

        <cube v-if="item.Code=='Cube'" :data="item.ParameterDictionary" ></cube>

        <product v-if="item.Code=='Product'" :data="item" ></product>
        <product1 v-if="item.Code=='Product1'" :data="item"></product1>
    </div>

</div>
</template>
<script>
import "../../assets/style/index.css";
import whitespace from "../../components/page/whitespace.vue";
import pageLine from "../../components/page/line.vue";
import pageText from "../../components/page/text.vue";
import notice from "../../components/page/notice.vue";
import search from "../../components/page/search.vue";
import pageTitle from "../../components/page/title.vue";
import cube from "../../components/page/cube.vue";
import imageAd from "../../components/page/imageAd.vue";
import imageText from "../../components/page/imageText.vue";
import product from "../../components/page/product.vue";
import product1 from "../../components/page/product1.vue";
import { GetPage } from "../../api/page.js";

import axios from "axios"

export default {
    name:"page",
    components:{
        whitespace,
        pageLine,
        pageText,
        notice,
        search,
        pageTitle,
        cube,
        [imageAd.name]:imageAd,
        imageText,
        product,
        product1
    },
    data:function(){
        return{
            topheight:0,
            page:{},
            bannerData: {},
            isLoad: false
        }
    },
    created:function(){
        axios.get("http://api.lizengyi.com/index.php",{
            params: {
                s: "index/Api/getBannerList",
            }
        }).then(response => {
            this.page.Sections = []

            this.page.Sections[5] = {
                "PageSectionId": 2522,
                "Code": "Product1",
                "ParameterDictionary": {
                    "type": "2",
                    "source": "1",
                    "showsort": "0",
                    "shownumber": "6",
                    "tag": "0",
                    "showtype": "simple",
                    "buttonvalue": "购买",
                    "productids": "4,1,3",
                    "productcategoryid": "",
                    "producttagid": ""
                }
            }

            let obj = new Object()
            obj.PageSectionId = 2515;
            obj.Code = "ImageText";
            obj.ParameterDictionary = new Object();
            obj.ParameterDictionary.type = "1";
            obj.ParameterDictionary.showtype = "1";
            obj.ParameterDictionary.color = "";
            obj.ParameterDictionary.backgroundcolor = "";
            obj.ParameterDictionary.shownumber = response.data.symbol[1].length
            obj.ParameterDictionary.imagelist = response.data.symbol[1]
            this.page.Sections[4] = obj

            let obj1 = new Object()
            obj1.PageSectionId = 2514;
            obj1.Code = "ImageText";
            obj1.ParameterDictionary = new Object();
            obj1.ParameterDictionary.type = "1";
            obj1.ParameterDictionary.showtype = "1";
            obj1.ParameterDictionary.color = "";
            obj1.ParameterDictionary.backgroundcolor = "";
            obj1.ParameterDictionary.shownumber = response.data.symbol[0].length
            obj1.ParameterDictionary.imagelist = response.data.symbol[0]
            this.page.Sections[3] = obj1

            let obj2 = new Object()
            obj2.PageSectionId = 2513;
            obj2.Code = "ImageAd";
            obj2.ParameterDictionary = new Object();
            obj2.ParameterDictionary.type = "2";
            obj2.ParameterDictionary.imagegap = "0"
            obj2.ParameterDictionary.shownumber = response.data.single.length
            obj2.ParameterDictionary.imagelist = response.data.single
            this.page.Sections[2] = obj2

            let obj3 = new Object()
            obj3.PageSectionId = 2512;
            obj3.Code = "ImageAd";
            obj3.ParameterDictionary = new Object();
            obj3.ParameterDictionary.type = "1";
            obj3.ParameterDictionary.imagegap = "0"
            obj3.ParameterDictionary.shownumber = response.data.banner.length
            obj3.ParameterDictionary.imagelist = response.data.banner
            this.page.Sections[1] = obj3

            this.page.Sections[0] = {
                "PageSectionId": 2511,
                "Code": "Search",
                "ParameterDictionary": {
                    "keyword": "搜索商品",
                    "position": "fixed",
                    "backgroundcolor": "#f9f9f9",
                    "color": "#999999",
                    "textalign": "center",
                    "boxcolor": "#ffffff",
                    "boxtype": "2"
                }
            }

        });

        GetPage().then(response=>{
            this.page=response;
        });
    },
    methods:{
        settopheight:function(value){
            this.topheight=value;
        }
    }
}
</script>
