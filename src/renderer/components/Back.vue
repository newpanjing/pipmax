<template>
  <a :href="'#'+path">
    <i class="el-icon-back"></i>
    <span>返回</span>
  </a>
</template>

<script>
  export default {
    name: 'Back',
    props: ['path'],
    data () {
      return {}
    }
  }
</script>

<style lang="less" scoped>
  a {
    color: #FFF;
    display: inline-block;
    width: auto;
    height: 20px;
    text-align: center;
    line-height: 20px;
    text-decoration: none;
    &:hover {
      color: rgba(#FFF,0.8);
    }
  }
</style>
