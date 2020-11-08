<template>
  <div class="article">
    <el-card class="box-card article-card" :class="{ 'delete-status': article.articleStatus === 0 }">
      <div slot="header" class="article-card-header">
        <!-- <user-info-show-card :userDTO="article.userDTO">
              <el-avatar :size="50" :src="article.userDTO.userFace"></el-avatar>
            </user-info-show-card> -->
        <div class="article-box">
          <div class="title">{{ articleObj.article_title }}</div>
          <div class="info">
            <span>
              {{ articleObj.article_user }}
              <span> · </span>
              <span :title="article.articleAddTime">{{
                articleObj.article_create_time
              }}</span>
            </span>
          </div>
        </div>
        <div v-if="isMy">
          <el-dropdown @command="handleCommand">
            <i class="el-icon-more"></i>
            <el-dropdown-menu slot="dropdown" style="width: 150px">
              <el-dropdown-item
                icon="el-icon-edit-outline"
                command="goEditArticle"
                >编辑</el-dropdown-item
              >
              <el-dropdown-item
                v-if="article.articleStatus === 1"
                divided
                icon="el-icon-delete"
                command="delArticle"
                >删除</el-dropdown-item
              >
              <el-dropdown-item
                v-else
                divided
                icon="el-icon-delete"
                command="restoreArticle"
                >恢复</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="content">
        <div v-html="articleObj.article_content"></div>
      </div>
      <!--<div class="handler">-->
      <!--<show-num-component num="1" type="success">-->
      <!--点赞 <i class="el-icon-thumb"></i>-->
      <!--</show-num-component>-->
      <!--<show-num-component num="1" >-->
      <!--收藏 <i class="el-icon-star-off"></i>-->
      <!--</show-num-component>-->
      <!--</div>-->
      <div class="tags">
        <tag-item
          v-for="tag in article.articleTags"
          :key="tag"
          :name="tag"
        ></tag-item>
      </div>
    </el-card>
    <el-card class="box-card">
      <comment

        :commentList="commentList"
        @doSend="sendContent"
        @doChidSend="twoSendContent"
      ></comment>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import ShowNumComponent from "../../components/home/ShowNumComponent";
import TagItem from "../../components/TagItem";
import Editor from "../../components/Editor";
import HomeLayout from "./components/HomeLayout";
import UserInfoCard from "./components/UserInfoCard";
import UserInfoShowCard from "./components/UserInfoShowCard";
import ArticleComment from "./components/ArticleComment";
import ArticleCommentAdd from "./components/ArticleCommentAdd";
import { apiArticleDetail, apiDetail, apiComment, abc } from "@/api/article.js";
import comment from "hbl-comment";
export default {
  name: "Article",
  components: {
    ArticleCommentAdd,
    ArticleComment,
    comment,
    UserInfoShowCard,
    UserInfoCard,
    HomeLayout,
    Editor,
    TagItem,
    ShowNumComponent,
  },
  data() {
    return {
      articleId: null,
      articleObj: {},
      article: {
        articleId: null,
        articleTitle: null,
        articleContent: "",
        articleAddTime: null,
        articleUpdateTime: "",
        articleStatus: null,
        articleCommentCount: 0,
        userDTO: { userNick: "", userFace: "", userId: null },
        articleTags: [],
        articleTopics: [],
      },
      menus: [],
      menuProps: {
        children: "children",
        label: "name",
      },
      commentList: [],
      textarea: "", //评论内容
      textarea1: "", //评论内容
      textarea2: "", //评论内容
      showreplytext: false,
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters["User/getUserInfo"];
    },
    isMy() {
      return (
        this.userInfo && this.userInfo.userId === this.article.userDTO.userId
      );
    },
  },
  mounted() {
    this.getArticleDetail();
    this.getComment();
  },
  methods: {
    sendContent(text) {
      let obj = {};
      obj.id = this.commentList.length + 200;
      obj.commentUser = this.$store.state.user.username;
      obj.content = text;
      obj.createDate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      this.commentList.unshift(obj);
      this.sendComment(text);
    },
    twoSendContent(text, commentId, fatherId) {
      console.log(text, commentId, fatherId, "评论ID");
      this.sendComment(text,fatherId)
      // commentId // 被评论的id； fatherId： 父级评论的ID
      
    },
    // 获取评论列表
    getComment() {
      let data = {};
      data.article_id = this.$route.params.articleId;
      apiComment(data).then((res) => {
        if (res.code == 200) {
          let list = res.data;
          list = list.map((item) => {
            let childList = item.first_comment.second_comment;
            childList = childList.map((e) => {
              return {
                id: e.second_comment_id, // 评论id
                commentUser: { 
                  nickName: e.second_comment_username,
                  avatar: e.second_comment_head_photo,
                }, // 评论用户
                targetUser: { nickName: e.second_comment_username }, // 被评论用户
                content: e.second_comment_content, // 评论内容
                createDate: "2020-11-11", // 评论时间
              };
            });
            return {
              id: item.first_comment.comment_id, // 评论id
              commentUser: { 
                nickName: item.first_comment.comment_username,
                avatar: item.first_comment.comment_head_photo
               }, // 评论用户
              targetUser: "admin", // 被评论用户
              content: item.first_comment.comment_content, // 评论内容
              createDate: "2020-11-02", // 评论时间
              childrenList: childList, // 子评论列表
            };
          });
          this.commentList = list;
        }
      });
    },
    // 发送评论
    sendComment(content, twoId) {
      let data = new FormData();
      if (twoId) {
        data.append("up_comment", twoId);
      }
      data.append("article_id", this.$route.params.articleId);
      data.append("comment", content);
      abc(data)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.message)
            if (twoId) {
              this.getComment()
            }
          } else {
            this.$message.error(res.message)
          }
        })
        .catch((err) => {
          this.$message.error(err)
        });
    },
    // 回复评论
    replyClick(a) {
      this.showreplytext = a;
    },
    getArticleDetail() {
      let params = {};
      params.article_id = this.$route.params.articleId;
      apiArticleDetail(params).then((res) => {
        if (res.code == 200) {
          this.articleObj = res;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    handleCommand(command) {
      if (command === "goEditArticle") {
        this.goEditArticle();
      }
      if (command === "delArticle") {
        this.saveArticleStatus(0);
      }
      if (command === "restoreArticle") {
        this.saveArticleStatus(1);
      }
    },
    addArticleView() {
      return this.$store
        .dispatch("Article/addArticleView", this.articleId)
        .then((res) => {});
    },
    getArticle() {
      return this.$store.dispatch("Article/getArticle", this.articleId).then(
        (res) => {
          this.article = res.data;
          this.$nextTick(() => {
            this.menus = this.$refs.editor.getMdMenu();
            this.goArticleComment();
          });
        },
        (err) => {
          this.$router.push({
            path: "/",
          });
        }
      );
    },
    goEditArticle() {
      this.$router.push({
        path: "/writeArticle/" + this.article.articleId,
      });
    },
    //去指定用户的用户页面
    goUserPage() {
      this.$router.push({
        path: "/user/" + this.article.userDTO.userId,
      });
    },
    //去指定文章评论
    goArticleComment() {
      if (this.$route.query.commentId) {
        let id = "comment-" + this.$route.query.commentId;

        this.$utils.scrollTo(id);
        console.log(id);
      }
    },
    saveArticleStatus(status) {
      this.$store
        .dispatch("Article/saveArticleStatus", {
          articleId: this.articleId,
          articleStatus: status,
        })
        .then((res) => {
          this.$message.success("修改成功");
          this.getArticle();
        });
    },

    menuTreeClick(data, node) {
      this.$utils.scrollTo(data.id);
    },

    /**
     * 回复评论
     * @param content
     * @param commentId
     */
    onCommentReply({ content, commentId }) {
      let params = {
        articleId: this.article.articleId,
        parentArticleCommentId: commentId,
        articleComment: content,
      };
      this.$store.dispatch("Comment/addArticleComment", params).then((res) => {
        this.$refs.articleCommentAdd.clearContent();
        this.$message.success("回复成功");
        this.getArticle();
      });
    },

    /**
     * 编辑评论
     * @param comment
     */
    onCommentEdit(comment) {
      let params = {
        articleCommentId: comment.articleCommentId,
        articleComment: comment.articleComment,
      };
      this.$store.dispatch("Comment/editArticleComment", params).then((res) => {
        this.$message.success("编辑成功");
        this.getArticle();
      });
    },

    /**
     * 删除评论
     * @param comment
     */
    onCommentDel(comment) {
      this.$confirm("此操作将永久删除该条评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store
          .dispatch("Comment/delArticleComment", comment.articleCommentId)
          .then((res) => {
            this.$message.success("删除成功");
            this.getArticle();
          });
      });
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.article {
  .article-card {
    margin-bottom: 20px;
    flex-direction: column;
    position: relative;

    .article-card-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .article-box {
        flex: 1;
        margin: 0 10px;

        > div {
          margin: 2px 0;
        }

        .title {
          font-size: 20px;
        }

        .info {
          color: var(--gray);
          font-size: 13px;
          display: flex;
          justify-content: space-between;
        }
      }
    }

    .content {
      word-break: break-all;
    }

    .handler {
      text-align: center;

      .show-num-component + .show-num-component {
        margin: 20px 40px;
      }
    }
  }

  .article-card.delete-status {
    .article-card-header .article-box .title {
      text-decoration: line-through;
    }
  }
}
</style>
