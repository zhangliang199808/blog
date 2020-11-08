<template>
  <div
    class="article-card"
    :class="{ 'delete-status': article.articleStatus === 0 }"
  >
    <user-info-show-card :userDTO="article.userDTO">
      <el-avatar
        v-if="!noFace"
        style="cursor: pointer"
        @click="goUserPage"
        :size="50"
        :src="article.article_user_head_photo"
      ></el-avatar>
    </user-info-show-card>
    <div class="article-box" style="position: relative">
      <el-link @click="goArticlePage" class="title my-el-link">{{
        article.article_title
      }}</el-link>
      <div class="content" v-show="!easy">
        {{ article.article_user }}
      </div>
      <div class="info">
        <span>
          <template v-for="(topic, index) in article.articleTopics">
            <topic-item :name="topic" :key="index"></topic-item>

            <span> · </span>
          </template>
          <el-link
            @click="goUserPage"
            class="author-name my-el-link"
            style="vertical-align: unset"
            >{{ article.article_username || article.article_user }}</el-link
          >
          <span> · </span>
          <span :title="article.article_created_time">
            {{ $utils.quickTimeago(article.article_created_time) }}
          </span>
          <span> · </span>
          <span>
            {{ article.article_excerpt }}
          </span>
        </span>
        <span
          style="position: absolute; right: 0; top: 0"
          v-show="aaa"
        >
          <!-- <el-button icon="el-icon-search" circle></el-button> -->
          <!-- <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="checkarticle"
            circle
          ></el-button> -->
          <!-- <el-button type="success" icon="el-icon-check" circle></el-button> -->
          <!-- <el-button type="info" icon="el-icon-message" circle></el-button> -->
          <!-- <el-button type="warning" icon="el-icon-star-off" circle></el-button> -->
          <!-- <el-popconfirm
  title="这是一段内容确定删除吗？"
> -->
  <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deletearticle"
            circle
          ></el-button>
<!-- </el-popconfirm> -->
          
        </span>
        <span>
          <i class="el-icon-view" title="阅读量"> {{ article.article_views }}</i
          >&nbsp;&nbsp;
          <!-- <i
            v-show="this.$store.getters['User/getUserInfo']"
            class="el-icon-star-off"
            title="修改"
            >修改</i
          >&nbsp;&nbsp;
          <i
            v-show="this.$store.getters['User/getUserInfo']"
            class="el-icon-chat-line-round"
            title="删除"
          >
            删除</i
          > -->
        </span>
      </div>
    </div>
    <div v-if="article.articleTop > 0" class="article-top">Top</div>
  </div>
</template>

<script type="text/ecmascript-6">
import TopicItem from "../../../components/TopicItem";
import {deleteArticleDetail,apiArticleDetail} from "../../../api/article.js";
import UserInfoShowCard from "./UserInfoShowCard";
export default {
  name: "ArticleCard",
  components: { UserInfoShowCard, TopicItem },
  props: {
    easy: Boolean,
    //不显示头像
    noFace: Boolean,
    article: Object,
    aaa:false,
    getactivelist:Function
  },
  methods: {
    //去指定用户的用户页面
    goUserPage() {
      // this.$message('功能暂未实现')
      return false
      this.$router.push({
        path: "/user/" + this.article.article_user_id,
      });
    },
    //去指定文章页面
    goArticlePage() {
      this.$router.push({
        path: "/article/" + this.article.articleId,
      });
    },
    // 修改文章 暂未实现
    checkarticle(){},
    // 删除文章
    deletearticle(){
      let data = new FormData()
      data.append('article_id',this.article.article_id)
     
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           deleteArticleDetail(data).then(res=>{
        if(res.code ==200){
          this.$message.success(res.message)
          this.getactivelist()
        }
        if(res.code ==400){
          this.$message(res.message)
        }
      })
        }).catch(() => {
          // this.s         
        });
     
    },
  },
  mounted() {
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.article-card {
  position: relative;
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--gray-dark);
  margin-bottom: 10px;

  .article-box {
    flex: 1;
    margin: 0 10px;

    > div {
      margin: 2px 0;
    }

    .title {
      font-size: 18px;
      margin-bottom: 5px;
    }

    .content {
      color: var(--gray);
      word-break: break-all;
    }

    .info {
      color: var(--gray);
      font-size: 13px;
      display: flex;
      justify-content: space-between;
    }
  }

  .article-top {
    position: absolute;
    right: 20px;
    font-size: 10px;
    color: var(--skin);
    font-weight: bold;
  }
}

.article-card.delete-status {
  text-decoration: line-through;
}
</style>
