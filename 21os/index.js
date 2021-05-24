const os = require('os');

const net_info = os.networkInterfaces();

console.log(net_info);

const platform = os.platform();

console.log(platform);

console.log(os.release());

console.log(os.tmpdir());

console.log(os.arch());

console.log(os.hostname());

console.log(os.loadavg());

console.log(os.userInfo());

console.log(new Date(os.uptime() * 1000).toISOString().substr(11, 8));