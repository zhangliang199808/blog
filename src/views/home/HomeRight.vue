<template>
  <div class="home-right">
    <el-button
      class="my-button-style-skin"
      icon="el-icon-plus"
      style="width: 100%"
      @click="goWrite"
      >发新帖</el-button
    >
    <el-card v-if="recommendArticleList.length" style="margin-top: 20px" class="box-card topic-rank-card">
      <div slot="header">
        <span>推荐文章</span>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in recommendArticleList" :key="index"  @click="goArticleDetail(item)">
          <span class="index" :class="'index-' + (index + 1)">{{index + 1}}</span>
          <topic-item type="none" :name="item.article_title"></topic-item>
        </div>
      </div>
    </el-card>
    <el-card v-if="hotArticleList.length" style="margin-top: 20px" class="box-card topic-rank-card">
      <div slot="header">
        <span>最热文章</span>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in hotArticleList" :key="index"  @click="goArticleDetail(item)">
          <span class="index" :class="'index-' + (index + 1)">{{index + 1}}</span>
          <topic-item type="none" :name="item.article_title"></topic-item>
        </div>
      </div>
    </el-card>
    <el-card v-if="newArticleList.length" style="margin-top: 20px" class="box-card topic-rank-card">
      <div slot="header">
        <span>最新文章</span>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in newArticleList" :key="index" @click="goArticleDetail(item)">
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
  import {apiHotArticleList,apiNewArticleList,apiRecommendArticleList} from "@/api/index.js"
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
        hotArticleList:[], // 最热文章列表
        recommendArticleList: [] ,// 推荐文章列表
      }
    },
    mounted(){
      this.getlist();
    },
    methods: {
      getlist() {
        apiRecommendArticleList()
          .then(res => {
              if (res.code == 200) {
                this.recommendArticleList = res.data || []
              }
            })
        apiNewArticleList()
          .then(res => {
              if (res.code == 200) {
                this.newArticleList = res.data || []
              }
            })
        apiHotArticleList()
          .then(res => {
            if (res.code == 200) {
              this.hotArticleList = res.data || []
            }
          })
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
      },
      goArticleDetail(item) {
        this.$router.push({
          path: "/article/" + item.article_id
        })
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
