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
    <!-- 富文本 -->
    <div class="article_card margin-top-20">
      <div id="container"></div>
    </div>
    <div class="article_card flex-between margin-top-20">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-exceed="handleExceed"
        :http-request="uploadFile"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传文件</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
      <div class="flex-center flex-align-center margin-top-20">
        <el-button type="primary" @click="release">发布</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import E from "wangeditor";
  import {apiCreatArticle,apiArticleType,apiUploadImgOrFile,apiUploadArticleFile} from "@/api/article.js"
  export default {
    name: "WriteArticle",
    data() {
      return {
        articleId: null,
        editor:null,// 富文本实例
        title: '',
        textarea: '', // 简介
        articleTypeList: [],
        radioIndex: 0, // 分类选中索引
        fileList: [], // 文件列表
        fileLinkList: [],// 文件链接
        delectFileIndex: 0 // 要删除的文件索引
      }
    },
    mounted(){
      // 富文本部分start
      const editor = new E('#container') // 传入两个元素
      editor.config.height = 500
      editor.config.zIndex = 1499
      editor.create();
      editor.config.customUploadImg = (resultFiles, insertImgFn) => {
          // resultFiles 是 input 中选中的文件列表
          // insertImgFn 是获取图片 url 后，插入到编辑器的方法
          let formdata = new FormData();
          formdata.append('upload_image', resultFiles[0]);
          apiUploadImgOrFile(formdata)
            .then(res =>{
              if (res.code == 200) {
                let url = res.image_url
                // 上传图片，返回结果，将图片插入到编辑器中
                insertImgFn(url)
              } else {
                this.$message.error(res.message)
              }
            })
      }
      this.editor = editor
      // 富文本部分end
      this.getArticleTypeList()
    },
    methods: {
      release() {
        if (this.fileLinkList.length > 0) {
          let str = '<p>文件链接：</p>'
          this.fileList.forEach((item,index) => {
            str += `<p><a href="${item}">${this.fileList.name}</a></p>`
          })
          this.editor.txt.append(str)
        }

        let id = this.articleTypeList[this.radioIndex].category_id
        let content = this.editor.txt.html();
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
      getArticleTypeList() {
        apiArticleType()
          .then(res => {
            if (res.code == 200) {
              this.articleTypeList = res.data
            } else {
              this.$message.error(res.message)
            }
          })
      },
      // 上传文件
      handleRemove(file, fileList) {
        this.fileLinkList.splice(this.delectFileIndex)
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        let list = this.fileList
        list.forEach((item,index) => {
          if (item.uid == file.uid) {
            this.delectFileIndex = index
          }
        })
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      uploadFile(e) {
        let file = e.file
        let formdata = new FormData();
        formdata.append('upload_file', file);
        apiUploadArticleFile(formdata)
          .then(res =>{
            if (res.code == 200) {
              let url = 'http://' + res.file_url
              this.fileList.push(e.file)
              this.fileLinkList.push(url)
              this.$message.success(res.message)
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
