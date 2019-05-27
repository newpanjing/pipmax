<template>
  <div class="panel">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Panel'
  }
</script>

<style scoped>
  .panel {
    height: calc(100% - 85px);
    padding: 10px;
    background-color: #2c3e4f;
    overflow: auto;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  * ::-webkit-scrollbar-thumb {
    background-color: #3a5169;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #3e5167;
    border: 3px solid transparent;
    background-clip: padding-box;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-track-piece {
    background: 0 0;
  }
</style>
