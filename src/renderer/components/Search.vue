<template>
  <div style="height: 100%">
    <Header>
      <Back path="/package"/>
    </Header>
    <Panel>
      <div v-if="q!=''" v-text="q">asddsdd</div>
    </Panel>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Back from '@/components/Back'
  import Panel from '@/components/Panel'

  // var test= require('test').Command
  // console.log(test)
  export default {
    name: 'Search',
    components: {Panel, Back, Header},
    data () {
      return {
        q: ''
      }
    },
    created () {
      this.q = this.$route.params.q
    }
  }
</script>

<style scoped>

</style>
