const http = require('http');
const Discord = require('discord.js');
const bot = new Discord.Client();

var kzarka = {};
var kutum = {};

var gtrade = {};
var gtrade_string = "";

bot.on('message', function(message) {
    if(message.content === '!地圖') {
        // message.reply('<http://bd.youxidudu.com/map/index_tw.html>');
        message.channel.send('<http://bd.youxidudu.com/map/index_tw.html>');
    }
    if(message.content === '!克價卡') {
        message.channel.send('```下次克價卡出生時間：' + kzarka.next_day + '  ' + kzarka.n_horse_a + ' ~ ' + kzarka.n_horse_b + '```');
    }
    if(message.content === '!庫屯') {
        message.channel.send('```下次庫屯出生時間：' + kutum.next_day + '  ' + kutum.n_horse_a + ' ~ ' + kutum.n_horse_b + '```');
    }
    if(message.content === '!皇室') {
        message.channel.send('```皇室納貢/釣魚更新分流：' + gtrade_string + '```');
    }
});

bot.on('ready', function(event) {
    intervalFunc();
});

bot.login('MzI0OTMwMDcxMTYyOTEyNzY4.DCRDdQ.jANi3kC1YfuQh2ZkMmauJFBmCVU');

function setBossTime() {
    console.log('this is data');
}

function getBossTime() {
    // 克價卡
    // http://bd.youxidudu.com/mylike/app_get_boss_kejiaka.php
    var requestKzarka = http.get("http://bd.youxidudu.com/mylike/app_get_boss_kejiaka.php", function(response) {
        var body = '';

        response.on('data', function(chunk) {
            body += chunk;
        });

        response.on('end', function() {
            kzarka = JSON.parse(body); 
            console.log("kzarka : " + JSON.stringify(kzarka));
        });

    }).on('error', function(e) {
        console.log("kzarka got an error: ", e);
    });
    
    // 庫屯
    // http://bd.youxidudu.com/mylike/app_get_boss_kutun.php
    var requestKutum = http.get("http://bd.youxidudu.com/mylike/app_get_boss_kutun.php", function(response) {
        var body = '';

        response.on('data', function(chunk) {
            body += chunk;
        });

        response.on('end', function() {
            kutum = JSON.parse(body); 
            console.log("kutum : " + JSON.stringify(kutum));
        });

    }).on('error', function(e) {
        console.log("kutum got an error: ", e);
    });
    
    // 皇室納貢
    // http://bd.youxidudu.com/mylike/app_get_gtrade_timeduan.php
    // http://bd.youxidudu.com/mylike/app_get_gtrade.php
    var requestGtrade = http.get("http://bd.youxidudu.com/mylike/app_get_gtrade.php", function(response) {
        var body = '';

        response.on('data', function(chunk) {
            body += chunk;
        });

        response.on('end', function() {
            gtrade = JSON.parse(body); 
            gtrade_string = gtrade.now_xianlu.replace(new RegExp('</li>', 'g'), " ").replace(new RegExp('<li>', 'g'), "");
            
            // gtrade_string = gtrade.now_xianlu.replaceAll('</li>', ", ").replaceAll('<li>', "");
            
            console.log("gtrade : " + gtrade_string);
        });
    }).on('error', function(e) {
        console.log("gtrade got an error: ", e);
    });
}

function intervalFunc () {
    console.log('refresh boss data');
    getBossTime();
}

setInterval(intervalFunc, 60 * 1000);