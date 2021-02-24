<template>
  <div class="vip">
    <NavHeader :leftText="'用户'"></NavHeader>
    <div class="wrapper wrap" id="staticLoginDv">
      <!-- 可由后台配置更换图片，尺寸为 750*160 -->
      <a href="javascript:">
        <img
          class="top-img"
          src="https://sta.gtimg.com/mobile/static/images/top_red_13.png"
        />
      </a>
      <!-- 登录主体容器-->
      <div class="login-wrap">
        <div class="logo">
          <img
            class="logo-img"
            src="https://sta.gtimg.com/mobile/static/images/qd_icon.png"
          />
        </div>
        <!-- start 手机登录 -->
        <div
          class="phone-login-wrap hidden"
          id="j-phoneLoginWrap"
          style="display:none"
        >
          <div class="login-form">
            <ul class="form-list">
              <li class="phone">
                <em class="icon-phone"></em>
                <a id="phonearea" class="area" href="javascript:">+86</a>
                <input
                  type="text"
                  id="phonemobile"
                  placeholder="请输入手机号"
                  maxlength="11"
                />
              </li>
              <li id="img-code-input" class="code hidden">
                <input
                  id="txtCode"
                  type="text"
                  placeholder="请输入右侧验证码"
                /><img id="imgCode" class="code-img" src="" />
              </li>

              <li id="img-code-input" class="code" style="display:none">
                <svg class="icon icon-user">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#icon-code"
                  ></use>
                </svg>
                <input type="text" placeholder="请输入右侧验证码" /><a
                  href="javascript:"
                  ><img id="captcha" src="" alt="验证码"/><svg
                    class="icon icon-reload stat"
                    data-stat="03|手机_验证码换一张|mqd_L03|2"
                  >
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#icon-reload"
                    ></use></svg
                ></a>
              </li>

              <li class="code cf">
                <a
                  class="btn-primary fr disabled"
                  id="sendPhoneMsg"
                  href="javascript:"
                  >点击获取验证码</a
                ><input
                  type="text"
                  id="phonecode"
                  placeholder="请输入短信验证码"
                  maxlength="6"
                />
              </li>
            </ul>
            <p class="tip"></p>
          </div>
          <div class="btn-wrap">
            <a
              class="btn-primary large phoneBtnLogin disabled"
              href="javascript:"
              >登录</a
            >
          </div>
        </div>
        <!-- end 手机登录 -->
        <!-- start 账号登录 -->
        <div class="account-login-wrap " id="j-accountLoginWrap">
          <div class="login-form">
            <ul class="form-list">
              <li>
                <em class="icon-user"></em>
                <input
                  type="text"
                  id="username"
                  placeholder="请输入邮箱/个性账号"
                />
              </li>
              <li>
                <div class="eye-icon fr" id="j-isLook">
                  <i class="unlook"></i>
                </div>
                <em class="icon-lock"></em>
                <input id="password" type="password" placeholder="请输入密码" />
              </li>
            </ul>
          </div>
          <div class="reg-wrap cf">
            <a class="link" href="https://aq.yuewen.com/welcome/validateuser"
              >忘记密码</a
            >
            <a
              class="link fr"
              href="/mobile/reg.html?appid=13&amp;areaid=31&amp;target=top&amp;ticket=1&amp;popup=0&amp;auto=1&amp;autotime=30&amp;ajaxdm=yuewen&amp;header=1&amp;returnUrl=https%3A%2F%2Fm.qidian.com%2Fuser"
              >用户注册</a
            >
          </div>
          <div class="btn-wrap">
            <a
              class="btn-primary large login-button disabled"
              href="javascript:"
              >登录</a
            >
          </div>
        </div>
        <!-- end 账号登录 -->

        <!-- start 账号登录更多登录 -->
        <div class="login-btn-wrap">
          <ul>
            <li>
              <a
                href="https://ptlogin.yuewen.com/login/qqconnectlogin?appid=13&amp;areaid=31&amp;target=top&amp;ticket=1&amp;auto=1&amp;autotime=30&amp;ajaxdm=yuewen&amp;header=1&amp;returnUrl=https%3A%2F%2Fm.qidian.com%2Fuser&amp;jumpdm=yuewen"
              >
                <p class="login-icon qq-icon"></p>
                <span>QQ</span>
              </a>
            </li>
            <li id="j-passportLogin" class="hidden">
              <a href="javascript:">
                <p class="login-icon passport-icon"></p>
                <span>阅文通行证</span>
              </a>
            </li>
            <li id="j-smsLogin">
              <a href="javascript:">
                <p class="login-icon sms-icon"></p>
                <span>短信登录</span>
              </a>
            </li>
            <li id="j-moreLogin">
              <a href="javascript:">
                <p class="login-icon more-icon" id="otherLogin"></p>
                <span>更多</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- end 账号登录的按钮和更多登录 -->
      </div>
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";

export default {
  components: {
    NavHeader,
  },
};
</script>

<style lang="scss">
.vip {
  margin-top: 48px;
  margin: 0;
  color: #61708f;
  font-size: 0.24rem;
  height: 100%;
  background: #fff;
  overflow-x: hidden;
  .wrapper {
    margin: 0 auto;
    text-align: center;
    margin-top: 48px;
    .login-wrap {
      position: relative;
      z-index: 2;
      width: 100%;
      margin: -0.1rem auto 0;
      height: 100%;
      background: #fff;
      border-radius: 8px 8px 0 0;
      .logo {
        padding: 0.48rem 0;
        text-align: center;
        .logo-img {
          width: 60px;
        }
      }
      .login-btn-wrap {
        padding: 0.8rem 0.64rem;
        text-align: center;
      }
    }
  }
}
</style>
