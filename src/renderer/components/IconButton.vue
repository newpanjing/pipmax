<template>
    <a class="icon-btn" href="javascript:;" @click="click"><i :class="loading?'el-icon-loading':icon"></i></a>
</template>

<script>
    export default {
        name: "IconButton",
        props: ['icon', 'loading'],
        methods: {
            click() {
                this.$emit('event', this);
            }
        }
    }
</script>

<style scoped lang="less">
    .icon-btn {
        color: #FFF;
        text-decoration: none;
        cursor: pointer;
        display: inline-block;
        font-size: 20px;

        &:hover {
            color: rgba(#FFF, 0.8);
        }
    }
</style>
