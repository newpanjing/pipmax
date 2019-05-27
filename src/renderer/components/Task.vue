<template>
  <div style="height: 100%">
    <Header>
      <div class="title">任务</div>
    </Header>
    <Panel>
      任务
    </Panel>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Panel from '@/components/Panel'
  export default {
    name: 'Task',
    components: {Panel, Header}
  }
</script>

<style scoped>

</style>
