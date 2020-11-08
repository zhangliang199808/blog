<template>
  <div class="UserInfo">
    <el-card class="box-card">
      <user-info-card ref="userInfoCard" easy></user-info-card>
      <el-tabs class="my-el-tabs" v-model="activeName">
        <template>
          <el-tab-pane label="个人设置" name="setting">
            <el-form
              ref="settingForm"
              :model="settingForm"
              :rules="settingFormRules"
              label-width="120px"
            >
              <el-row :gutter="10">
                <el-col :md="10">
                  <el-form-item label="用户名：">
                    {{ settingForm.username || '' }}
                  </el-form-item>
                  <el-form-item label="用户头像：" prop="photo_url">
                    <el-avatar
                      :size="60"
                      :src="settingForm.photo_url || ''"
                    ></el-avatar>
                    <input
                      style="
                        opacity: 0;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                      "
                      type="file"
                      @change="fileUpload"
                    />
                  </el-form-item>
                  <el-form-item label="用户昵称：" prop="username">
                    <el-input v-model="settingForm.username"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="用户签名：">
                    <el-input :rows="4" type="textarea" v-model="settingForm.userDesc"></el-input>
                  </el-form-item> -->
                </el-col>
              </el-row>
              <el-form-item>
                <el-button class="my-button-style-skin" @click="updateUserInfo"
                  >修 改</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="我的文章" name="password">
            <article-card
              v-for="(item, index) in datas"
              :article="item"
              easy
              :key="index"
            ></article-card>
            <el-pagination
              @current-change="onCurrentChange"
              style="text-align: center"
              :current-page="page.current"
              :page-size="page.size"
              layout="prev, pager, next"
              :total="page.total"
            >
            </el-pagination>
          </el-tab-pane>
          <!-- <el-tab-pane label="邮箱安全" name="email">
            <el-form ref="emailForm" :model="emailForm" :rules="emailFormRules" label-width="120px">
              <el-row :gutter="10">
                <el-col :md="10">
                  <el-form-item label="原密码：" prop="oldUserPassword">
                    <el-input type="password" show-password v-model="emailForm.oldUserPassword"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱号：" prop="email">
                    <el-input type="email" v-model="emailForm.email"></el-input>
                  </el-form-item>
                  <template>
                    <el-form-item label="图形验证码：">
                      <el-input class="no-append-padding" type="email" v-model="code" >
                        <captch v-if="activeName === 'email'" slot="append" style="width: 70px;" v-model="token"></captch>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="邮箱验证码：" prop="emailCode">
                      <el-input type="email" v-model="emailForm.emailCode">
                        <el-button  slot="append" @click="sendEmailCode" :disabled="codeSeconds > 0">
                          {{codeSeconds > 0 ? codeSeconds : '发送'}}
                        </el-button>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button class="my-button-style-skin" @click="updateUserEmail">修  改</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="通知设置" name="notifyConfig">
            <el-form ref="notifyConfigForm" label-width="120px">
              <el-row :gutter="10">
                <el-col :md="10">
                  <el-form-item v-for="(notifyConfig,index) in notifyConfigs" :key="index" :label="notifyConfig.userNotifyConfigName + '：'">
                    <el-checkbox v-model="notifyConfig.userNotifyConfigNotify" :true-label="1" :false-label="0">站内信</el-checkbox>
                    <el-checkbox v-model="notifyConfig.userNotifyConfigEmail" :true-label="1" :false-label="0">邮件</el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button class="my-button-style-skin" @click="saveNotifyConfigs">修  改</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>  -->
        </template>
      </el-tabs>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import UserInfoCard from "./components/UserInfoCard";
import Article from "./Article";
import ArticleCard from "./components/ArticleCard";
import Page from "../../components/Page";
import Captch from "../../components/Captch";
import { apiUploadHardImg, getuserArticList } from "@/api/login.js";
export default {
  name: "UserInfo",
  components: { Captch, Page, ArticleCard, Article, UserInfoCard },
  data() {
    return {
      activeName: "setting",
      datas: [],
      userId: null,
      settingForm: {},
      settingFormRules: {
        userNick: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" },
        ],
        userFace: [
          { required: true, message: "用户头像不能为空", trigger: "blur" },
        ],
      },
      page: {
        current: 1,
        total: 10,
        size: 10,
      },
      passwordForm: {
        oldUserPassword: null,
        newUserPassword: null,
        confirmNewUserPassword: null,
      },
      passwordFormRules: {
        oldUserPassword: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
        ],
        newUserPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
        ],
        confirmNewUserPassword: [
          { required: true, message: "确认新密码不能为空", trigger: "blur" },
        ],
      },

      emailForm: {
        oldUserPassword: null,
        email: null,
        emailCode: null,
      },
      emailFormRules: {
        oldUserPassword: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
        emailCode: [
          { required: true, message: "邮箱验证码不能为空", trigger: "blur" },
        ],
      },
      code: null,
      token: null,
      codeSeconds: 0,

      notifyConfigs: [],
    };
  },
  computed: {
    isMy() {
      return true
    },
  },
  mounted() {
    this.settingForm = this.$store.getters["User/getUserInfo"];
    this.getactivelist();
  },
  methods: {
    list() {
      let params = this.$refs.page.getPage();
      // params.searchWord = this.searchWord;
      params.userId = this.userId;
      this.$store.dispatch("Article/getArticles", params).then((res) => {
        this.datas = res.data.records;
        this.$refs.page.setPage(res.data);
      });
    },
    updateUserInfo() {
      this.$refs.settingForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("User/updateUserInfo", this.settingForm)
            .then((res) => {
              //更新用户资料
              this.$store.commit("User/UPDATE_USERINFO", this.settingForm);
              this.$refs.userInfoCard.getUserInfoById(this.userInfo.userId);
            });
        }
      });
    },
    updateUserPassword() {
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("User/updateUserPassword", this.passwordForm)
            .then((res) => {
              this.$store.commit("User/LOGOUT");
              this.$router.push({
                path: "/",
                query: { needlogin: true },
              });
            });
        }
      });
    },
    updateUserEmail() {
      this.$refs.emailForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("User/updateUserEmail", this.emailForm)
            .then((res) => {
              //更新用户资料
              this.$store.commit("User/UPDATE_USERINFO", this.settingForm);
              this.$refs.userInfoCard.getUserInfoById();
            });
        }
      });
    },
    sendEmailCode() {
      if (!this.emailForm.email) {
        this.$message.error("请先填写邮箱地址");
        return;
      }
      if (!this.code) {
        this.$message.error("请先填写图形验证码");
        return;
      }
      let params = {
        email: this.emailForm.email,
        code: this.code,
        token: this.token,
        templateName: "mail_template_edit",
      };
      this.$store.dispatch("sendEmailCode", params).then((res) => {
        this.$message.success("发送邮件验证码成功");
        //邮箱验证码发送倒计时
        this.codeSeconds = 60;
        let timer = setInterval(() => {
          this.codeSeconds--;
          if (this.codeSeconds === 0) {
            clearInterval(timer);
          }
        }, 1000);
      });
    },
    /**
     * 获取我的文章列表
     */
    getactivelist() {
      getuserArticList().then((res) => {
        console.log(res);
        this.datas = res.data;
        this.page.total = res.total_number;
        this.page.current = res.now_page;
      });
    },
    // 分页
    onCurrentChange(current) {
      console.log(current);
      this.page.current = current;
      // this.$emit('change');
      this.getactivelist();
    },

    /**
     * 获取通知配置列表
     */
    getNotifyConfigs() {
      this.$store.dispatch("NotifyConfig/getNotifyConfigs").then((res) => {
        this.notifyConfigs = res.data;
      });
    },
    /**
     * 保存通知配置列表
     */
    saveNotifyConfigs() {
      this.$store
        .dispatch("NotifyConfig/saveNotifyConfigs", this.notifyConfigs)
        .then((res) => {
          this.$message.success("修改成功");
        });
    },
    //文件上传
    fileUpload(e) {
      console.log(e, "文件上传");
      let files = e.target.files;
      if (files.length === 0) {
        this.$message.info("请选择图片");
        return;
      }
      let file = files[0];
      let data = new FormData();
      console.log(e, "kankan");
      data.append("head_photo", file);
      apiUploadHardImg(data).then((res) => {
        console.log(res, "头像返回数据");
        if (res.code == 200) {
          this.$message.success("修改成功");
          let userInfoObj = this.settingForm;
          userInfoObj.photo_url = res.data.head_photo;
          this.settingForm = userInfoObj;
          this.$store.commit("User/UPDATE_USERINFO", userInfoObj);
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.UserInfo {
}
</style>
