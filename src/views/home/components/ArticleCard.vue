<template>
  <div class="article-card" :class="{'delete-status': article.articleStatus === 0 }">
      <el-avatar v-if="!noFace" style="cursor: pointer;" @click="goUserPage" :size="50" :src="article.article_user_head_photo"></el-avatar>
    <!-- <user-info-show-card :userDTO="article.userDTO">
    </user-info-show-card> -->
    <div class="article-box">
      <el-link @click="goArticlePage" class="title my-el-link">{{article.article_title}}</el-link>
      <div class="content" v-show="!easy">
        {{article.article_user}}
      </div>
      <div class="info">
        <span>
          <template v-for="(topic,index) in article.articleTopics" >
            <topic-item :name="topic" :key="index"></topic-item>
            <span> · </span>
          </template>
          <el-link @click="goUserPage" class="author-name my-el-link" style="vertical-align: unset;">{{article.article_username||article.article_user}}</el-link>
          <span> · </span>
          <span :title="article.article_created_time">
            {{$utils.quickTimeago(article.article_created_time)}}
          </span>
          <span> · </span>
          <span >
            {{article.article_excerpt}}
          </span>
        </span>
        <span>
          <i class="el-icon-view" title="阅读量"> {{article.article_views}}</i>&nbsp;&nbsp;
          <!--<i class="el-icon-star-off" title="收藏量">2222</i>&nbsp;&nbsp;-->
          <!-- <i class="el-icon-chat-line-round" title="评论"> {{article.article_user}}</i> -->
        </span>
      </div>
    </div>
    <div v-if="article.articleTop > 0" class="article-top">
      Top
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TopicItem from "../../../components/TopicItem";
  import UserInfoShowCard from "./UserInfoShowCard";
  export default {
    name: "ArticleCard",
    components: {UserInfoShowCard, TopicItem},
    props:{
      easy: Boolean,
      //不显示头像
      noFace: Boolean,
      article: Object
    },
    methods: {
      //去指定用户的用户页面
      goUserPage() {
        this.$router.push({
          path: "/user/" + this.article.article_user_id
        })
      },
      //去指定文章页面
      goArticlePage(){
        this.$router.push({
          path: "/article/" + this.article.article_id
        })
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.article-card {
  position: relative;

  display: flex;

  padding-bottom: 10px;
  border-bottom: 1px solid var(--gray-dark);
  margin-bottom: 10px;
  .article-box{
    flex: 1;
    margin: 0 10px;

    > div{
      margin: 2px 0;
    }
    .title{
      font-size: 18px;
      margin-bottom: 5px;
    }
    .content{
      color: var(--gray);
      word-break: break-all;
    }
    .info{
      color: var(--gray);
      font-size: 13px;
      display: flex;
      justify-content: space-between;
    }
  }

  .article-top{
    position: absolute;
    right: 20px;
    font-size: 10px;
    color: var(--skin);
    font-weight: bold;
  }
}
.article-card.delete-status{
  text-decoration: line-through;
}
</style>
