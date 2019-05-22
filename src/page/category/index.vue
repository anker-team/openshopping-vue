<template>
    <div>
        <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        >
        <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <van-badge-group :active-key="activeKey" class="tab" :style="'height:'+fullHeight+'px'">
            <van-badge title="计算机与网络" @click="onClick" />
            <van-badge title="管理" @click="onClick" />
            <van-badge title="经济金融" @click="onClick" />
            <van-badge title="科技工程" @click="onClick" />
            <van-badge title="语言学习" @click="onClick" />
            <van-badge title="少儿" @click="onClick" />
            <van-badge title="艺术" @click="onClick" />
            <van-badge title="文学小说" @click="onClick" />
            <van-badge title="文化历史" @click="onClick" />
            <van-badge title="建筑" @click="onClick" />
            <van-badge title="新闻传播" @click="onClick" />
            <van-badge title="成功励志" @click="onClick" />
            <van-badge title="家庭育儿" @click="onClick" />
            <van-badge title="生活时尚" @click="onClick" />
            <van-badge title="旅游地理" @click="onClick" />
            <van-badge title="心理" @click="onClick" />
            <van-badge title="体育保健" @click="onClick" />
            <van-badge title="收藏鉴赏" @click="onClick" />
            <van-badge title="汽车与交通运输" @click="onClick" />
            <van-badge title="法律" @click="onClick" />
            <van-badge title="医学卫生" @click="onClick" />
            <van-badge title="自然科学" @click="onClick" />
            <van-badge title="社会科学" @click="onClick" />
            <van-badge title="政治军事" @click="onClick" />
            <van-badge title="宗教哲学" @click="onClick" />
            <van-badge title="教育考试" @click="onClick" />
            <van-badge title="工具书" @click="onClick" />
            <van-badge title="活动图书" @click="onClick" />
        </van-badge-group>
        <div class="content" :style="'width:'+fullWidth+'px;height:'+(fullHeight-7)+'px'" >
            <img src="http://source.lizengyi.com/imgs/e38fc2f7c2ddfec2.jpg" />
<!--            <div class="category-div">-->
<!--                <h4>常用分类</h4>-->
<!--                <ul >-->
<!--                    <li>-->
<!--                      <router-link to="/search?keyword=xxxx">-->
<!--                        <img src="http://source.lizengyi.com/imgs/5a167b8cNdcf71ae5.jpg">-->
<!--                        <span>蓝牙耳机</span>-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a >-->
<!--                            <img src="http://source.lizengyi.com/imgs/5a1692ebN8ae73077.jpg">-->
<!--                            <span>iPhone</span>-->
<!--                        </a>-->
<!--                    </li>-->
<!--                    <div style="clear:both"></div>-->
<!--                </ul>-->
<!--            </div>-->
            <div class="category-div">
                <h4>热门分类</h4>
                <ul>
                    <li v-for="(item, index) in categorylist" :key="index">
                        <a :href="'http://'+host+'/#/search/'+item.id"><img :src="item.img"><span>{{item.typeName}}</span></a>
                    </li>
<!--                    <li><a ><img src="http://source.lizengyi.com/imgs/5b054fedN2ba90518.jpg"><span>手机</span></a></li>-->
<!--                    <li><a ><img src="http://source.lizengyi.com/imgs/5b05522dNa2aae1bb.png"><span>耳机</span></a></li>-->
<!--                    <li><a ><img src="http://source.lizengyi.com/imgs/5b48802aN13fe73de.png"><span>剃须刀</span></a></li>-->
<!--                    <li><a ><img src="http://source.lizengyi.com/imgs/5b0565a7N8dbc0017.png"><span>路由器</span></a></li>-->
<!--                    <li><a ><img src="http://source.lizengyi.com/imgs/13b099f187576d8c.png"><span>月饼</span></a></li>-->
<!--                    <li><a ><img src="http://source.lizengyi.com/imgs/1e7de6987578dcdd.jpg" ><span>牛奶</span></a></li>-->
<!--                    <li><a ><img src="http://source.lizengyi.com/imgs/6c7c2f9857736c65.jpg"><span>男士内裤</span></a></li>-->
<!--                    <li><a ><img src="http://source.lizengyi.com/imgs/86c6bca8f4fe1efa.png"><span>小米8</span></a></li>-->
<!--                    <li><a ><img src="http://source.lizengyi.com/imgs/9e118f12705f52bb.png"><span>大闸蟹</span></a></li>-->
<!--                    <li><a ><img src="http://source.lizengyi.com/imgs/5b7693eeNf6883734.png"><span>三只松鼠</span></a></li>-->
<!--                    <li><a ><img src="http://source.lizengyi.com/imgs/5b76990bNde226fbc.png"><span>充电宝</span></a></li>-->
<!--                    <li><a ><img src="http://source.lizengyi.com/imgs/5b055000N410a7553.png"><span>空调</span></a></li>-->
<!--                    <li><a ><img src="http://source.lizengyi.com/imgs/5b055555N9245f8aa.jpg"><span>电饭煲</span></a></li>-->
<!--                    <li><a ><img src="http://source.lizengyi.com/imgs/99f72d51b8f195ed.jpg"><span>电话手表</span></a></li>-->
<!--                    <li><a ><img src="http://source.lizengyi.com/imgs/b1a627b92323b5ed.png"><span>华为</span></a></li>-->
                    <div style="clear:both">
                    </div>
                </ul>   
            </div>
        </div>
        <navigate />
    </div>
</template>

<script>
import { Search } from "vant";
import Cookies from "js-cookie";
import axios from "axios"

export default {
  name: "userindex",
  components: {
    [Search.name]: Search
  },
  data() {
    return {
        value: "",
        activeKey: 0,
        fullHeight: document.documentElement.clientHeight - 93,
        fullWidth: document.documentElement.clientWidth - 99,
        ids: [ //以及分类id数组
          1, 33, 66, 86, 120, 160, 171, 194, 222, 236, 250, 263, 283, 299, 317, 337, 354, 370,
          381, 397, 419, 452, 468, 481, 501, 523, 555, 568
        ],
        categorylist: [],
        host: window.location.host
    };
  },
  methods: {
    onSearch() {
      console.log(this.value);
    },
    onClick(key) {
      this.activeKey = key;
      axios.get("http://api.lizengyi.com/index.php",{
          params: {
              s: "index/Api/typeList",
              level: 2,
              typeID: this.ids[this.activeKey]
          }
      }).then(response => {
          this.categorylist = response.data
      });
    }
  },
    created(){
      if(typeof(Cookies.get('name')) === 'undefined') {
          this.$router.push('home');
      }
        axios.get("http://api.lizengyi.com/index.php",{
            params: {
                s: "index/Api/typeList",
                level: 2,
                typeID: 1
            }
        }).then(response => {
            this.categorylist = response.data
        });
    }
};
</script>

<style lang="less">
.tab {
  float: left;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  min-height: 100%;
  .van-badge {
    padding: 15px 12px 15px 9px;
  }
  .van-badge:not(:last-child)::after {
    height: 199%;
  }
}
.content {
  float: left;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  min-height: 100%;
  margin: 7px 7px 0;
  font-size: 12px;
  img {
    width: 100%;
  }
  .category-div {
    margin: 19px 0px 0;
    h4 {
      font-size: 14px;
      color: #333;
    }
    ul{
        margin-top: 10px;
    }
    li {
      width: 32.8%;
      float: left;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      span{
          font-size: 12px;
    height: 36px;
    color: #686868;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-box;
    display: -o-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -moz-line-clamp: 2;
    -ms-line-clamp: 2;
    -o-line-clamp: 2;
    box-orient: vertical;
    -webkit-box-orient: vertical;
    -ms-box-orient: vertical;
    -o-box-orient: vertical;
    word-break: break-all;
    box-align: center;
    -webkit-box-align: center;
    -moz-box-align: center;
    -ms-box-align: center;
    -o-box-align: center;
    box-pack: center;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    -ms-box-pack: center;
    -o-box-pack: center;
    z-index: 2;
    position: relative;
      }
    }
  }
}
</style>
