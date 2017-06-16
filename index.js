const Discord = require('discord.js');
const Browser = require("zombie");

const bot = new Discord.Client();

var boss_next_time_a = boss_next_time_b = boss_next_time_a_2 = boss_next_time_b_2 = '00:00';
var gtrade = "";
// Load the page from localhost
browser = new Browser()

bot.on('message', (message) => {
    if(message.content === '!地圖') {
        // message.reply('<http://bd.youxidudu.com/map/index_tw.html>');
        message.channel.sendMessage('<http://bd.youxidudu.com/map/index_tw.html>');
    }
    if(message.content === '!克價卡') {
        message.channel.sendMessage('```下次克價卡出生時間：' + boss_next_time_a + ' ~ ' + boss_next_time_b + '```');
    }
    if(message.content === '!庫屯') {
        message.channel.sendMessage('```下次庫屯出生時間：' + boss_next_time_a_2 + ' ~ ' + boss_next_time_b_2 + '```');
    }
    if(message.content === '!皇室') {
        message.channel.sendMessage('```皇室納貢/釣魚更新分流：' + gtrade + '```');
    }
});

bot.on('ready', event => {
    intervalFunc();
});

bot.login('MzI0OTMwMDcxMTYyOTEyNzY4.DCRDdQ.jANi3kC1YfuQh2ZkMmauJFBmCVU');

function intervalFunc () {
    console.log('refresh boss data');

    browser.visit("http://bd.youxidudu.com/", function () {
        boss_next_time_a = browser.text("#boss_next_time_a");
        boss_next_time_b = browser.text("#boss_next_time_b");
        boss_next_time_a_2 = browser.text("#boss_next_time_a_2");
        boss_next_time_b_2 = browser.text("#boss_next_time_b_2");
        gtrade = browser.text("#xianlu_box");
    });
}

setInterval(intervalFunc, 10 * 60 * 1000);