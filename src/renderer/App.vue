<template>
  <div id="app">

    <el-container style="height: 100%">
      <el-aside class="menu" style="width: 200px">
        <div class="wrap">

          <el-popover
            placement="bottom"
            width="100"
            trigger="click">
            <div class="popup-menu">
              <div class="item">
                <!--                <i class="el-icon-star-on"></i>-->
                <i :class="project.star?'el-icon-star-on':'el-icon-star-off'"></i>
                <span>收藏项目</span>
                <el-switch
                  v-model="project.star"
                  active-color="#13ce66"
                  inactive-color="#4f6f7f">
                </el-switch>
              </div>
              <div class="separator"></div>
              <div class="title">收藏的项目</div>
              <div class="item">
                11111
              </div>
              <div class="separator"></div>
              <div class="title">最近使用</div>
              <div class="item"></div>
              <div class="separator"></div>
              <div class="item">
                <i class="el-icon-s-home"></i>
                项目管理器
              </div>
            </div>
            <el-button slot="reference" class="popup-menu-btn">pipmax<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
          </el-popover>

        </div>
        <div class="nav-menu">
          <div :class="{item:true,active: item.active}" v-for="item in navMenus" :key="item.name"
               @click="navHandler(item)"><i :class="'icon '+item.icon"></i>{{item.name}}
          </div>
        </div>

        <div class="nav-menu footer-menu">
          <el-popover
            placement="right"
            width="100"
            trigger="click">
            <div class="popup-menu">
              <div class="item">
                <i class="el-icon-s-home"></i>
                项目管理器
              </div>
              <div class="item">
                <i class="el-icon-info"></i>
                关于
              </div>
            </div>
            <div slot="reference" class="item"><i class="icon el-icon-more-outline"></i>更多
            </div>
          </el-popover>
        </div>
      </el-aside>
      <el-container class="content">
        <router-view/>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data: function () {
      return {
        project: {
          star: false
        },
        navMenus: [{
          name: '依赖包',
          icon: 'el-icon-suitcase-1',
          active: true,
          link: 'package'
        }, {
          name: '配置',
          icon: 'el-icon-setting',
          active: false,
          link: 'config'
        }, {
          name: '搜索',
          icon: 'el-icon-search',
          active: false,
          link: 'search'
        }, {
          name: '任务',
          icon: 'el-icon-s-order',
          active: false,
          link: 'task'
        }]
        // menuWidth: 100
      }
    },
    created () {
      var path = this.$route.path
      this.navMenus.forEach(item => {
        item.active = '/' + item.link == path

      })
    },
    watch: {
      $route (to, from) {

        this.navMenus.forEach(item => {
          item.active = '/' + item.link == to.path

        })
      }
    },
    methods: {
      navHandler (item) {
        this.navMenus.forEach(item => item.active = false)
        item.active = true
        if (item.link) {
          this.$router.push({path: item.link, query: {}})
        }
      }
    }
  }
</script>

<style lang="less">
  @menuColor: #2c3e50;

  #app {
    height: 100%;
    padding: 0px;

    .menu {
      position: relative;
      box-shadow: 2px 0 10px rgba(0, 0, 0, .1);
      padding-top: 25px;
      background: #1d2935;
      -webkit-app-region: drag;
      text-align: center;

      .popup-menu-btn {
        color: #fff;
        background: #2c3e50;
        border: none;
        width: 100%;

        &:hover {
          background: #4e6e8e;
        }

        &:active {
          background: #28394a;
        }
      }

      .footer-menu {
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
      }

      .nav-menu {
        -webkit-app-region: none;

        .active {
          background-color: rgba(66, 185, 131, 0.05) !important;
          color: #42b983 !important;
        }

        .item {
          transition: all 0.2s;
          color: #fff;
          font-size: 16px;
          font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
          height: 44px;
          line-height: 44px;
          padding: 0px 5px;
          text-align: left;
          cursor: pointer;
          user-select: none;

          &:hover {
            background: #4e6e8e;
          }

          .icon {
            margin: 0px 10px;
          }
        }
      }

      .wrap {
        padding: 10px;
      }

    }

    .content {
      background-color: #344a5f;
      color: white;
      display: block;
    }
  }

  @popoverColor: #222f3d;
  .el-popover {
    border: none;
    background: @popoverColor;
    color: #fff;
    box-shadow: 0 2px 20px rgba(0, 0, 0, .3);
    padding: 12px 0px;

    .popper__arrow {
      background: @popoverColor;

      &:after {
        border-bottom-color: @popoverColor !important;
      }
    }
  }

  .popup-menu {
    .item, .title {
      height: 32px;
      line-height: 32px;
      padding: 0px 12px;
    }

    .item {
      &:hover {
        background-color: #2c3e50 !important
      }
    }

    .separator {
      background: rgba(79, 111, 127, .2);
      height: 1px;
      margin: 5px 0px;
    }
  }
</style>
