<template>
  <div class="header">
    <slot></slot>
    <div class="title" v-text="title"></div>
    <div class="right">
      <a class="setting" href="javascript:;" @click="dialogVisible=true"><i class="el-icon-setting"></i></a>
      <SearchInput @search="search" placehloder="搜索"></SearchInput>
    </div>
    <el-dialog
      title="设置PIP源"
      :visible.sync="dialogVisible"
      width="500px">
      <div>该操作不会对系统内置PIP的源进行修改</div>
      <el-select v-model="source">
        <el-option label="默认源" value="1"></el-option>
        <el-option label="阿里云" value="http://mirrors.aliyun.com/pypi/simple/"></el-option>
        <el-option label="中国科技大学" value="https://pypi.mirrors.ustc.edu.cn/simple/"></el-option>
        <el-option label="豆瓣" value="http://pypi.douban.com/simple/"></el-option>
        <el-option label="清华大学" value="https://pypi.tuna.tsinghua.edu.cn/simple/"></el-option>
        <el-option label="中国科学技术大学" value="http://pypi.mirrors.ustc.edu.cn/simple/"></el-option>
      </el-select>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>

  import SearchInput from '@/components/SearchInput'

  export default {
    name: 'Header',
    components: {SearchInput},
    props: ['title'],
    data () {
      return {
        searchInput: '',
        source: '1',
        dialogVisible: false
      }
    },
    created () {

    },
    methods: {
      test(){
        console.log(require('fs').readFileSync('/Users/panjing/Downloads/test.md').toString())
      },
      search: function (val) {
        if (val != '') {
          this.$router.push({
            name: 'search', params: {
              q: val
            }
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .header {
    height: 45px;
    background: #344a5f;
    position: relative;
    line-height: 45px;
    padding: 10px;
    -webkit-app-region: drag;
    *{
      -webkit-app-region: none;
    }
    .setting {
      color: #FFF;
      text-decoration: none;

      &:hover {
        color: rgba(#FFF, 0.8);
      }
    }

    .title {
      font-size: 28px;
      font-weight: 300;
      float: left;
    }

    .right {
      float: right;
      padding-right: 10px;
    }

    .search {
      margin-top: 5px;
    }
  }
</style>
