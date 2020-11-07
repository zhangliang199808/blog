<template>
  <div>
    <div class="article_card">
      <div class="flex-start flex-align-center padding-lr-20">
        <div class="article_title">文章标题:</div>
        <el-input class="flex-1" v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="flex-start flex-align-center padding-lr-20 margin-top-20">
        <div class="article_title">文章简介:</div>
        <el-input class="flex-1" type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      </div>
      <div class="flex-start flex-align-center padding-lr-20 margin-top-10">
        <div class="article_title">文章类别:</div>
        <div>
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
        </div>
      </div>

    </div>
    
    <mavon-editor class="editor margin-top-20" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor>
  </div>
</template>

<script type="text/ecmascript-6">
  import TopicItem from "../../components/TopicItem";
  import TagItem from "../../components/TagItem";
  import {apiCreatArticle} from "@/api/article.js"
  export default {
    name: "WriteArticle",
    components: {TagItem, TopicItem},
    data() {
      return {
        articleId: null,
        title: '',
        textarea: '', // 简介
      }
    },
    mounted(){
    },
    methods: {
      // 绑定@imgAdd event
      $imgAdd(pos, $file){
          // 第一步.将图片上传到服务器.
         var formdata = new FormData();
         formdata.append('image', $file);
         axios({
             url: 'server url',
             method: 'post',
             data: formdata,
             headers: { 'Content-Type': 'multipart/form-data' },
         }).then((url) => {
             // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
             /**
             * $vm 指为mavonEditor实例，可以通过如下两种方式获取
             * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
             * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
             */
             $vm.$img2Url(pos, url);
         })
      },
      
    },
  }
</script>

<style scoped>
.article_card {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  background: #ffffff;
  border-radius: 6px;
}
.editor {
  height: 600px;
}
.article_title {
  margin-right: 20px;
}
</style>
