<template>
  <div class="home-right">
    <el-button
      class="my-button-style-skin"
      icon="el-icon-plus"
      style="width: 100%"
      @click="goWrite"
      >发新帖</el-button
    >
    <!--<user-info-card></user-info-card>-->
    <el-card style="margin-top: 20px" class="box-card topic-rank-card">
      <div slot="header">
        <span>最新文章</span>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in newArticleList" :key="index">
          <span class="index" :class="'index-' + (index + 1)">{{index + 1}}</span>
          <topic-item type="none" :name="item.article_title"></topic-item>
        </div>
      </div>
    </el-card>
    <el-card style="margin-top: 20px" class="box-card topic-rank-card">
      <div slot="header">
        <span>最热文章</span>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in hotArticleList" :key="index">
          <span class="index" :class="'index-' + (index + 1)">{{index + 1}}</span>
          <topic-item type="none" :name="item.article_title"></topic-item>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
  import UserInfoCard from "./components/UserInfoCard";
  import TopicItem from "../../components/TopicItem";
  import List from "../../components/List";
import { apiBaseIndex } from "@/api/login.js";
  export default {
    name: "HomeRight",
    components: {List, TopicItem, UserInfoCard},
    data() {
      return {
        topics: [{
          topicName:'测试',
          topicDesc: '标题',
          articleNum: 'kanakn'
        }],
        newArticleList:[], // 最新文章列表
        hotArticleList:[] // 最热文章列表
      }
    },
    mounted(){
      this.getlist();
    },
    methods: {
      getlist() {
        apiBaseIndex().then((res) => {
          console.log(res,'aaaa')
          this.newArticleList = res.data[3].index_article_data;// 最新文章列表
          this.hotArticleList = res.data[5].index_hot_article_data;// 最热文章列表
        });
      },
      goWrite() {
        let isLogin = this.$store.state.User.isLogin || false
        if (isLogin) {
          this.$router.push({
            path: "/writeArticle"
          })
        } else {
          this.$message.info('请先登录')
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home-right {
  .topic-rank-card {
    .el-card__body {
      padding: 0;
    }

    .list {
      .item {
        display: flex;
        justify-content: flex-start;
        align-content:center;
        padding: 10px 15px;

        .index {
          font-size: 13px;
          padding: 3px 8px;
          border-radius: 50%;
          color: #fff;
          background: var(--skin-info);
        }

        .index.index-1 {
          background: var(--skin-danger);
        }

        .index.index-2 {
          background: var(--skin-success);
        }

        .index.index-3 {
          background: var(--skin-warning);
        }
      }
    }
  }
}
</style>
-
