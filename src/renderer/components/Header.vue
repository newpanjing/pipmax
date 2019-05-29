<template>
    <div class="header">
        <slot></slot>
        <div class="title" v-text="title"></div>
        <slot name="btn"></slot>
        <div class="right">
            <a class="setting" href="javascript:;" @click="dialogVisible=true"><i class="el-icon-setting"></i></a>
            <SearchInput @search="search" placehloder="搜索"></SearchInput>
        </div>
        <el-dialog
                title="设置PIP源"
                :visible.sync="dialogVisible"
                width="500px">
            <div>该操作将会改变系统的源</div>
            <div>当前源：<span v-text="source"></span></div>
            <el-select v-model="source">
                <el-option v-for="(v,k) in sourceList" :key="k" :label="k" :value="v"></el-option>
            </el-select>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="setSource()" :icon="loading?'el-icon-loading':''">确 定</el-button>
        </el-dialog>
    </div>
</template>

<script>

    import SearchInput from '@/components/SearchInput'
    import command from '@/native/command'


    export default {
        name: 'Header',
        components: {SearchInput},
        props: ['title'],
        data() {
            return {
                searchInput: '',
                source: '',
                dialogVisible: false,
                loading: false,
                sourceList: {
                    '默认源': 'https://pypi.org/simple/',
                    '阿里云': 'http://mirrors.aliyun.com/pypi/simple/',
                    '豆瓣': 'http://pypi.douban.com/simple/',
                    '清华大学': 'https://pypi.tuna.tsinghua.edu.cn/simple/',
                    '中国科技大学': 'https://pypi.mirrors.ustc.edu.cn/simple/',
                    '中国科学技术大学': 'http://pypi.mirrors.ustc.edu.cn/simple/'
                }
            }
        },
        created() {
            //读取默认源
            this.$nextTick(function () {
                if (this.source == '') {
                    command.exeCcommand('pip config get global.index-url')
                        .then(res => {
                            res = res.replace(/ |\n|\r|\t/g, '')
                            this.source = res;
                        }).catch(err => {
                        this.$notify.error({
                            title: '读取默认源错误',
                            message: err
                        });
                    });
                }
            });
        },
        methods: {
            setSource: function () {
                this.loading = true
                command.setPipSource(this.source).then(res => {
                    this.$notify.success({
                        title: '成功',
                        message: res
                    });
                    this.dialogVisible = false
                }).catch(err => {
                    this.$notify.success({
                        title: '错误',
                        message: err
                    });
                }).finally(() => {
                    this.loading = false;
                });
            },
            test() {
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

        * {
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
