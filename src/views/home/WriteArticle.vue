<template>
  <div>
    <div class="article_card">
      <div class="flex-start flex-align-center padding-lr-20">
        <div class="article_title">文章标题:</div>
        <el-input class="flex-1" v-model="title" placeholder="请输入内容"></el-input>
      </div>
      <div class="flex-start flex-align-center padding-lr-20 margin-top-20">
        <div class="article_title">文章简介:</div>
        <el-input class="flex-1" type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      </div>
      <div class="flex-start flex-align-center padding-lr-20 margin-top-20">
        <div class="article_title">文章类别:</div>
        <div>
          <el-radio v-for="(item,index) in articleTypeList" :key="index" v-model="radioIndex" :label="index">{{item.category_name}}</el-radio>
        </div>
      </div>

    </div>
    <mavon-editor class="editor margin-top-20" ref="md" @imgAdd="radioImgAdd"></mavon-editor>
    <div class="flex-center flex-align-center margin-top-20">
      <el-button type="primary" @click="release">发布</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {apiCreatArticle,apiArticleType,apiUploadImgOrFile} from "@/api/article.js"
  export default {
    name: "WriteArticle",
    data() {
      return {
        articleId: null,
        title: '',
        textarea: '', // 简介
        articleTypeList: [],
        radioIndex: 0, // 分类选中索引
        vm: null , // 文本编译器对象
      }
    },
    mounted(){
      this.getArticleTypeList()
      this.vm = this.$refs.md
    },
    methods: {
      release() {
        let id = this.articleTypeList[this.radioIndex].category_id
        let content = this.vm.d_render
        let data = new FormData()
        data.append('article_title',this.title)
        data.append('article_excerpt',this.textarea)
        data.append('article_category',id)
        data.append('article_body',content)
        apiCreatArticle(data)
          .then(res => {
            if (res.code == 200) {
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
      },
      // 绑定@imgAdd event
      radioImgAdd(pos, $file){
        console.log(pos,$file,'kankan')
          // 第一步.将图片上传到服务器.
         let formdata = new FormData();
         formdata.append('upload_file', $file);
         apiUploadImgOrFile(formdata)
          .then(res =>{
            if (res.code == 200) {
              let url = 'http://' + res.image_url
              this.vm.$img2Url(pos, url);
            } else {
              this.$message.error(res.message)
            }
          })
      },
      getArticleTypeList() {
        apiArticleType()
          .then(res => {
            if (res.code == 200) {
              this.articleTypeList = res.data
              this.$router.replace({path: '/'})
            } else {
              this.$message.error(res.message)
            }
          })
      }
      
    },
  }
</script>

<style scoped>
.article_card {
  padding: 20px 10px;
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
