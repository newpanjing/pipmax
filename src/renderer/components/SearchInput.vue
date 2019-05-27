<template>
  <div :class="{search:true,focus:focus}">
    <i class="el-icon-search"></i>
    <input @keyup.enter="search()" v-model="input" @focusin="focus=true" @focusout="focus=false" type="text"
           :placeholder="placehloder"/>
  </div>
</template>

<script>
  export default {
    name: 'SearchInput',
    props: ['placehloder'],
    data () {
      return {
        focus: false,
        input: ''
      }
    },
    methods: {
      search () {
        this.$emit('search', this.input)
      }
    }
  }
</script>

<style lang="less" scoped>
  .search {
    display: inline-block;
    background: #1d2935;
    color: #7b97b3;
    width: 200px;
    height: 32px;
    line-height: 32px;
    padding: 0px 10px;
    border-radius: 15px;

    input {
      background: transparent;
      border: none;
      outline: none;
      color: inherit;
      width: calc(100% - 30px);
    }

    input::-webkit-input-placeholder { /* WebKit browsers */
      color: #7b97b3;
    }

    input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #7b97b3;
    }

    input::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #7b97b3;
    }

    input:-ms-input-placeholder { /* Internet Explorer 10+ */
      color: #7b97b3;
    }
  }

  .focus {
    background-color: #2f3e4e;

    i, input {
      color: #50916c;
    }
  }
</style>
