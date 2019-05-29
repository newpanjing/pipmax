<template>
    <div class="wrap">
        <Header title="依赖包管理">
            <solt name="btn">
                <IconButton @event="packageRefresh" :loading="loading" icon="el-icon-refresh-right"></IconButton>
            </solt>
        </Header>
        <Panel v-loading="loading">
            <div class="item" v-for="item in packages" :key="item.name">
                <div class="avatar">
                    <img lazyload :src="item.avatar" width="50" height="50">
                </div>
                <div class="center">
                    <div class="name" v-text="item.name"></div>
                    <div class="info">
                        <div class="block">当前版本:{{item.version}}</div>
                        <div class="block">
                            <span v-if="item.latest==-1">
                                <span class="el-icon-loading"></span>
                                <span>版本检查中</span>
                            </span>
                            <span v-else-if="item.latest==0">
                                <span class="el-icon-check"></span>
                                <span>已是最新版</span>
                            </span>
                            <a href="javascript:;" @click="upgrade(item)" v-else class="upgrade">
                                <span class="el-icon-position"></span>
                                <span>可升级至：{{item.latest}}</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="action">
                    <IconButton icon="el-icon-download"></IconButton>
                    <IconButton icon="el-icon-delete"></IconButton>
                    <IconButton icon="el-icon-upload"></IconButton>
                    <IconButton icon="el-icon-more"></IconButton>
                </div>
            </div>
        </Panel>


        <el-dialog
                title="升级依赖包"
                :visible.sync="dialog.visible"
                width="50%">
            <div v-if="dialog.visible">
                <div>
                    <img :src="dialog.data.avatar" width="50" height="50"/>
                </div>
                <div v-text="dialog.data.name"></div>
                <div>
                    当前版本：<span v-text="dialog.data.version"></span>
                </div>
                <div>
                    最新版：<span v-text="dialog.data.latest"></span>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialog.visible = false">升 级</el-button>
            <el-button @click="dialog.visible = false">取 消</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import Panel from '@/components/Panel'
    import command from '@/native/command'
    import IconButton from "./IconButton";


    export default {
        name: 'Test',
        components: {IconButton, Panel, Header},
        data() {

            return {
                packages: [],
                loading: true,
                dialog: {
                    visible: false,
                    data: null
                }
            }

        },
        created() {

            this.loadPackage(true);

            const {ipcRenderer} = require('electron');
            ipcRenderer.send('123')
            //

        },
        methods: {
            upgrade(item) {
                this.dialog.visible = true;
                console.log(item)
                this.dialog.data = item;
            },
            packageRefresh() {
                console.log('asdasd')
                this.loadPackage(false);
            },
            loadPackage(cache) {
                if (cache) {
                    if (this.$store.state.packages) {
                        this.packages = this.$store.state.packages
                        this.loading = false;
                        return;
                    }
                }
                this.loading = true;
                command.getInstalled().then(res => {
                    this.packages = res;
                    this.$nextTick(function () {
                        this.loading = false;
                        this.$store.state.packages = this.packages
                        this.$notify.success({
                            title: '成功',
                            message: '成功刷新包列表'
                        });
                        //检查包更新
                        console.log('check version....')
                        command.checkVersion().then(res => {
                            console.log('check version done.')
                            console.log(res)

                            this.packages.forEach(item => {
                                var val = res[item.name];
                                if (val && val != item.version) {
                                    item.latest = val;
                                } else {
                                    item.latest = 0;
                                }
                            });

                            //储存状态
                            this.$store.state.packages = this.packages;

                        }).catch(err => {
                            this.$notify.error({
                                title: '检查新版本包出错',
                                message: err
                            });
                            this.packages.forEach(item => {
                                item.latest = 0;
                            })
                            console.log('check version error:')
                            console.error(err);
                        });
                    });
                }).catch(err => {

                    this.$notify.error({
                        title: '错误',
                        message: err
                    });
                    this.loading = false;
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .item {
        padding: 16px;
        height: 50px;

        &:hover {
            background: rgba(66, 185, 131, .05);
        }

        .name {
            color: #fff;
        }

        .avatar, .center, .action {
            float: left;
        }

        .avatar {
            width: 50px;
            text-align: center;
            line-height: 50px;

            img {
                border-radius: 25px;
            }
        }

        .action {
            width: 200px;
            margin-top: 10px;
        }

        .center {
            width: calc(100% - 280px);
            padding: 0px 10px;

            .info {
                margin-top: 5px;

                .block {
                    display: inline-block;
                    margin-right: 10px;
                    color: #6a8bad;
                }
            }

            .upgrade {
                color: #42b983;
                text-decoration: none;

                &:hover {
                    color: rgba(#42b983, 0.7);
                }
            }
        }
    }

    .wrap {
        width: 100%;
        height: 100%;
    }
</style>
