var exec = require('child_process').exec;
var URL = require('url');

export function exeCcommand(cmd) {
    return new Promise((resolve, reject) => {

        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}

export function getInstalled() {
    return new Promise((resolve, reject) => {
        exeCcommand('pip freeze').then(res => {
            //提取分析
            var data = [];
            var array = res.split('\n');
            array.forEach(item => {
                if (item.replace(/ /g, '').length == 0) {
                    return;
                }

                var temps = item.split('==');
                var name = temps[0];
                var version = temps[1];
                data.push({
                    name: name,
                    version: version,
                    avatar: `https://avatars.dicebear.com/v2/identicon/${name}.svg`,
                    latest: -1
                })
            });
            resolve(data);


        }).catch(reject);
    });
}

export function setPipSource(source) {
    return new Promise((resolve, reject) => {
        exeCcommand(`pip config set global.index-url ${source}`).then(res1 => {
            //继续信任该源的host
            let host = URL.parse(source).host
            exeCcommand(`pip config set global.trusted-host ${host}`).then(res2 => {
                resolve(res1 + '\n' + res2);
            }).catch(reject);
        }).catch(reject);
    });
}

export function checkVersion() {
    return new Promise((resolve, reject) => {
        exeCcommand(`pip list -o`).then(res => {
            let array = res.split('\n');
            var data = {}

            for (var i = 2; i < array.length; i++) {
                let item = array[i];
                item = item.replace(/\s+/g, ' ');
                if (item.length == 0) {
                    continue;
                }
                let list = item.split(' ');
                data[list[0]] = list[2];
            }
            resolve(data);

        }).catch(reject);

    });
}

export default {
    exeCcommand: exeCcommand,
    getInstalled: getInstalled,
    setPipSource: setPipSource,
    checkVersion: checkVersion
}
