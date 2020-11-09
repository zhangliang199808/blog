<template>
  <div class="home">
    <!--<hitokoto></hitokoto>-->
    <home-layout>
      <template slot="left">
        <div
          style="
            display: flex;
            height: 40px;
            border-radius: 5px;
            margin-bottom: 20px;
            background: #fff;
            line-height: 40px;
          "
        >
          <i
            class="el-icon-message-solid"
            style="line-height: 40px; margin: 0 10px; color: #9a5c1a"
          ></i>
          <Scroller :lists="list1" class="scrollContainer" />
        </div>

          <el-carousel >
            <el-carousel-item v-for="(item,index) in imglist" :key="index" indicator-position="none">
              <div style="width: 100%; height: 100%;position: relative;">
                <img @click="goUrl(item)" :src="item.banner_image_url" :alt="item.banner_title" style="width:100%;height:100%"/>
                <div class="flex-start flex-align-center banner_title">{{item.banner_title}}</div>
              </div>
            </el-carousel-item>
          </el-carousel>
        <el-card class="box-card article-list-card">
          <tab-component
            slot="header"
            @change="onChangList"
            :list="tabs"
            v-model="activeTab"
            style="padding: 10px"
          ></tab-component>
          <article-card
            v-for="(item, index) in datas"
            :article="item"
              :aaa="aaa"
            easy
            :key="index"
          ></article-card>
          <!-- @size-change="onSizeChange" -->
          <el-pagination
            @current-change="onCurrentChange"
            style="text-align: center"
            :current-page="page.current"
            :page-size="page.size"
            layout="prev, pager, next"
            :total="page.total"
          >
          </el-pagination>
        </el-card>
      </template>
    </home-layout>
  </div>
</template>

<script type="text/ecmascript-6">
import UserInfoCard from "./components/UserInfoCard";
import ArticleCard from "./components/ArticleCard";
import TabComponent from "../../components/home/TabComponent";
import HomeRight from "./HomeRight";
import HomeLayout from "./components/HomeLayout";
import Page from "../../components/Page";
import Hitokoto from "../../components/Hitokoto";
import Scroller from "../../components/scroller";
// import 'swiper/dist/css/swiper.css'
// import {swiper,swiperSlide} from "vue-awesome-swiper"
import { apiBaseIndex, getArticList, getArticClass } from "@/api/login.js";
import { apiNoticeList,apiIndexBanner } from "@/api/index.js";
export default {
  name: "Home",
  components: {
    Hitokoto,
    Page,
    HomeLayout,
    HomeRight,
    TabComponent,
    ArticleCard,
    UserInfoCard,
    Scroller,
    // swiper,swiperSlide
  },
  data() {
    return {
      aaa:false,
      images: [
        {
          title: "xxxxx系统1111",
          image:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579600299787&di=faa9b4e409538e1d96c36994b839c934&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F20%2F62%2F01000000000000119086280352820.jpg",
        },
        {
          title: "xxxxx系统2222",
          image:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579600299787&di=faa9b4e409538e1d96c36994b839c934&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F20%2F62%2F01000000000000119086280352820.jpg",
        },
        {
          title: "xxxxx系统3333",
          image:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579600299787&di=faa9b4e409538e1d96c36994b839c934&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F20%2F62%2F01000000000000119086280352820.jpg",
        },
        {
          title: "xxxxx系统4444",
          image:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579600299787&di=faa9b4e409538e1d96c36994b839c934&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F20%2F62%2F01000000000000119086280352820.jpg",
        },
      ],
      activeTab: 1,
      tabs: [
        // { label: "最新", value: "new" },
        // { label: "最热", value: "hot" },
      ],
      list1: [
        "欢迎大家来一起学习欢迎大家来一起学习欢迎大家来一起学习欢迎大家来一起学习欢迎大家来一起学习欢迎大家来一起学习欢迎大家来一起学习欢迎大家来一起学习欢迎大家来一起学习欢迎大家来一起学习",
        "在一起学习",
        "一起学习",
        "学无止境",
      ],
      datas: [],
      page: {
        current: 1,
        total: 10,
        size: 10,
      },
      imglist:[]
    };
  },
  watch: {
    // "$route.query"() {
    //   this.loadList();
    // },
  },
  mounted() {
    // this.loadList();
    this.getlist();
    this.getArticClass();
  },
  methods: {
    goUrl(item) {
      console.log(item)
      location.href = item.banner_image_url
    },
    //轮播图  公告
    getlist() {
      apiIndexBanner()
        .then(res => {
          if (res.code == 200) {
            this.imglist = res.data
          }
        })
      apiNoticeList()
        .then(res => {
          if (res.code == 200) {
            this.list1 = res.data
          } else {
            this.$message.error(res.message);
          }
        })
    },
    // 获取文章分类
    getArticClass() {
      getArticClass().then((res) => {
        this.tabs = res.data;
        this.getArtic();
      });
    },
    // 获取文章列表
    getArtic() {
      var formdata = new FormData();
      formdata.append("category_id", this.activeTab);
      formdata.append("page_num", 1);
      let data = {
        category_id: this.activeTab,
        page_num: this.page.current,
      };
      getArticList(data).then((res) => {
        this.datas = res.data;
        this.page.total = res.total_number;
        this.page.current = res.now_page;
        // this.page.total =
      });
    },
    // 切换分类
    onChangList(item) {
      this.page.current = 1;
      this.activeTab = item.category_id;
      this.getArtic();
      // this.loadList();
    },

    onCurrentChange(current) {
      this.page.current = current;
      // this.$emit('change');
      this.getArtic();
    },

    onSizeChange(size) {
      // this.page.size = size;
      // this.$emit('change');
    },
    loadList(num) {
      // this.getArtic(num)
    },
    list() {
      let params = this.$refs.page.getPage();
      this.$store.dispatch("Article/getArticles", params).then((res) => {
        this.datas = res.data.records;
        this.$refs.page.setPage(res.data);
      });
    },
    hotList() {
      let params = this.$refs.page.getPage();
      this.$store.dispatch("Article/getHotArticles", params).then((res) => {
        this.datas = res.data.records;
        this.$refs.page.setPage(res.data);
      });
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.banner_title {
  position: absolute; 
  bottom: 0;
  left: 0;
  width: 100%; 
  height: 40px;
  padding-left: 10px;
  background: rgba(0,0,0,0.3);
  color: #FFF;
}
.home {
  box-size:border-box
  .article-list-card {
    .el-card__header {
      padding: 0;
    }

    .el-card__body {
      padding: 0;
    }

    .article-card {
      padding: 10px;
    }
  }
}

.scrollContainer {
  /* color: red; */
  font-size: 16px;
  margin-left: 10px;
  height: 100%;
  width: 100%;
  // border: 1px solid #000;
  // line-height: 30px;
  overflow: hidden;
}

/*
.layout.route-home {
  margin-top: 50px;
}
*/
</style>
