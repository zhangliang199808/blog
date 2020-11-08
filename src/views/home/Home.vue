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
            <el-carousel-item v-for="(item,index) in imglist" :key="index">
              <!-- <h3 class="small">{{ item }}</h3> -->
              <img :src="item.banner_image_url" alt="" style="width:100%;height:100%"/>
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
import { apiTest, getArticList, getArticClass } from "@/api/login.js";
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
    "$route.query"() {
      this.loadList();
    },
  },
  mounted() {
    // this.loadList();
    this.getlist();
    this.getArticClass();
  },
  methods: {
    //轮播图  公告
    getlist() {
      apiTest().then((res) => {
        console.log(123);
        console.log(res.data);
        // this.tabs = res.data[0].index_category_data; //分类数据
        this.list1 = res.data[1].index_notice_data; //公告
        this.imglist = res.data[2].index_banner_data;
        // this.datas = res.data[3].index_article_data;
      });
    },
    // 获取文章分类
    getArticClass() {
      getArticClass().then((res) => {
        console.log(res.data);
        this.tabs = res.data;
        this.getArtic();
      });
    },
    // 获取文章列表
    getArtic() {
      console.log(this.activeTab);
      var formdata = new FormData();

      formdata.append("category_id", this.activeTab);
      formdata.append("page_num", 1);
      let data = {
        category_id: this.activeTab,
        page_num: this.page.current,
      };
      console.log(formdata.get("category_id"));
      getArticList(data).then((res) => {
        console.log(res);
        this.datas = res.data;
        this.page.total = res.total_number;
        this.page.current = res.now_page;
        // this.page.total =
      });
    },
    // 切换分类
    onChangList(item) {
      console.log(item);
      this.page.current = 1;
      this.activeTab = item.category_id;
      this.getArtic();
      // this.loadList();
    },

    onCurrentChange(current) {
      console.log(current);
      this.page.current = current;
      // this.$emit('change');
      this.getArtic();
    },

    onSizeChange(size) {
      // this.page.size = size;
      // this.$emit('change');
    },
    loadList(num) {
      console.log(num);
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
