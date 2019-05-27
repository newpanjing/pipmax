<template>
  <div class="wrap">
    <Header title="依赖包管理"></Header>
    <Panel>
      <div style="height: 1000px">231</div>
    </Panel>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Panel from '@/components/Panel'

  export default {
    name: 'Test',
    components: {Panel, Header}
  }
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 100%;
  }
</style>
