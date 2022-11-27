var progress = 0;

$(document).ready(function() {
    $("#OutputCanvas").click(function() {
        var b50Data;
        PostData["operationName"] = "dxIntlRecordWithScores";
        PostData["query"] = "query dxIntlRecordWithScores($nickname: String!) {\n  dx_intl_players(where: {nickname: {_eq: $nickname}}) {\n    updated_at\n    private\n    dx_intl_record {\n      card_name\n      title\n      trophy\n      rating\n      max_rating\n      rating_legacy\n      grade\n      course_rank\n      class_rank\n      __typename\n    }\n    dx_intl_scores {\n      song_id\n      deluxe\n      difficulty\n      score\n      combo_flag\n      sync_flag\n      start\n      __typename\n    }\n    __typename\n  }\n}";
        PostData["variables"] = { nickname: $("#UserName").val() };
        $.ajax({
            type: "POST",
            url: "https://api.otohi.me/graphql",
            dataType: 'json',
            data: JSON.stringify(PostData),
            success: function(data) {
                UserData = data;
                if (UserData.data.dx_intl_players[0] != null) {
                    $("#GameDataCanvasBox").html('<canvas id="GameDataCanvas" width="1920" height="1700"></canvas>');
                    b50Data = b50();
                    draw(b50Data);
                } else {
                    console.log("e");
                }
            }
        });


    })

});



function draw(b50Data) {
    var canvas = document.getElementById('GameDataCanvas');
    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");

    var img = LoadData(b50Data);
    console.log(img);

    img.logo.onload = function() {

        //b50
        var i = 0,
            j = 0,
            k = 0,
            x = 40,
            y = 255;
        //b35
        while (j < 7) {
            while (i < 5) {
                //难度框
                ctx.drawImage(img.CoverColor[b50Data.Oldb35[k].difficulty], x + (370 * i), y + (140 * j), 350, 130);
                //乐曲封面
                ctx.drawImage(img.b35[k], x + (370 * i) + 10, y + (140 * j) + 10, 106, 105);
                //成绩标识图
                ctx.drawImage(img.rate[b50Data.Oldb35[k].ScoreName], x + (370 * i) + 260, y + (140 * j) + 55, 85, 29);
                //新旧曲
                if (b50Data.Oldb35[k].deluxe) {
                    ctx.drawImage(img.deluxe[1], x + (370 * i) + 10, y + (140 * j) + 103, 33, 37);
                } else {
                    ctx.drawImage(img.deluxe[0], x + (370 * i) + 10, y + (140 * j) + 103, 33, 37);
                }
                //连击徽章
                ctx.drawImage(img.flags['music_icon_' + b50Data.Oldb35[k].combo_flag], x + (370 * i) + 255, y + (140 * j) + 87, 42, 47);
                //友人徽章
                ctx.drawImage(img.flags['music_icon_' + b50Data.Oldb35[k].sync_flag], x + (370 * i) + 300, y + (140 * j) + 87, 42, 47);
                //可否再此基础上加Rating
                if (b50Data.Oldb35[k].score >= 100.5) {
                    ctx.drawImage(img.flags['music_icon_max'], x + (370 * i) + 90, y + (140 * j) + 115, 25, 15);
                }
                //乐曲名
                ctx.font = '20px Roboto';
                ctx.fillStyle = "white";
                ctx.textBaseline = "top";
                if (b50Data.Oldb35[k].Title.length > 9) {
                    b50Data.Oldb35[k].Title = b50Data.Oldb35[k].Title.substring(0, 10) + '...';
                }
                ctx.fillText(b50Data.Oldb35[k].Title, x + (370 * i) + 140, y + (140 * j) + 15, 150);
                //乐曲种类
                ctx.font = '10px Roboto';
                ctx.fillText(b50Data.Oldb35[k].category, x + (370 * i) + 140, y + (140 * j) + 37, 150);
                //乐曲得分
                ctx.font = 'normal bold 30px Roboto';
                ctx.fillStyle = "#fadf62";
                ctx.fillText(String(b50Data.Oldb35[k].score).split(".")[0] + '.', x + (370 * i) + 135, y + (140 * j) + 60, 150);
                ctx.font = 'normal bold 17px Roboto';
                if (String(b50Data.Oldb35[k].score).split(".")[0].length == 3) {
                    ctx.fillText(String(b50Data.Oldb35[k].score).split(".")[1], x + (370 * i) + 197, y + (140 * j) + 70, 150);
                } else {
                    ctx.fillText(String(b50Data.Oldb35[k].score).split(".")[1], x + (370 * i) + 180, y + (140 * j) + 70, 150);
                }
                ctx.font = 'normal bold 20px Roboto';
                ctx.fillStyle = "black";
                ctx.fillText(b50Data.Oldb35[k].InternalLv + ' -> ' + Math.trunc(b50Data.Oldb35[k].Rating), x + (370 * i) + 135, y + (140 * j) + 103, 150);

                k = k + 1;
                i = i + 1;
            }
            j = j + 1;
            i = 0;
        }
        j = 0;
        i = 0;
        k = 0;
        y = 1270;
        //b15
        while (j < 3) {
            while (i < 5) {
                ctx.drawImage(img.CoverColor[b50Data.Newb15[k].difficulty], x + (370 * i), y + (140 * j), 350, 130);
                ctx.drawImage(img.b15[k], x + (370 * i) + 10, y + (140 * j) + 10, 106, 105);
                ctx.drawImage(img.rate[b50Data.Newb15[k].ScoreName], x + (370 * i) + 260, y + (140 * j) + 55, 85, 29);
                if (b50Data.Newb15[k].deluxe) {
                    ctx.drawImage(img.deluxe[1], x + (370 * i) + 10, y + (140 * j) + 103, 33, 37);
                } else {
                    ctx.drawImage(img.deluxe[0], x + (370 * i) + 10, y + (140 * j) + 103, 33, 37);
                }
                ctx.drawImage(img.flags['music_icon_' + b50Data.Newb15[k].combo_flag], x + (370 * i) + 255, y + (140 * j) + 87, 42, 47);
                ctx.drawImage(img.flags['music_icon_' + b50Data.Newb15[k].sync_flag], x + (370 * i) + 300, y + (140 * j) + 87, 42, 47);
                //可否再此基础上加Rating
                if (b50Data.Newb15[k].score >= 100.5) {
                    ctx.drawImage(img.flags['music_icon_max'], x + (370 * i) + 90, y + (140 * j) + 115, 25, 15);
                }
                ctx.font = '20px Roboto';
                ctx.fillStyle = "white";
                ctx.textBaseline = "top";
                if (b50Data.Newb15[k].Title.length > 9) {
                    b50Data.Newb15[k].Title = b50Data.Newb15[k].Title.substring(0, 10) + '...';
                }
                ctx.fillText(b50Data.Newb15[k].Title, x + (370 * i) + 140, y + (140 * j) + 15, 150);
                ctx.font = '10px Roboto';
                ctx.fillText(b50Data.Newb15[k].category, x + (370 * i) + 140, y + (140 * j) + 37, 150);
                //乐曲得分
                ctx.font = 'normal bold 30px Roboto';
                ctx.fillStyle = "#fadf62";
                ctx.fillText(String(b50Data.Newb15[k].score).split(".")[0] + '.', x + (370 * i) + 135, y + (140 * j) + 60, 150);
                ctx.font = 'normal bold 17px Roboto';
                if (String(b50Data.Newb15[k].score).split(".")[0].length == 3) {
                    ctx.fillText(String(b50Data.Newb15[k].score).split(".")[1], x + (370 * i) + 197, y + (140 * j) + 70, 150);
                } else {
                    ctx.fillText(String(b50Data.Newb15[k].score).split(".")[1], x + (370 * i) + 180, y + (140 * j) + 70, 150);
                }
                ctx.font = 'normal bold 20px Roboto';
                ctx.fillStyle = "black";
                ctx.fillText(b50Data.Newb15[k].InternalLv + ' -> ' + Math.trunc(b50Data.Newb15[k].Rating), x + (370 * i) + 135, y + (140 * j) + 103, 150);
                i = i + 1;
                k = k + 1;
            }
            j = j + 1;
            i = 0;
        }
    }

}

function LoadData(b50Data) {
    var img = { CoverColor: [], rate: [], deluxe: [], b35: [], b15: [], logo: null, flags: {} };
    var i = 0;

    //封面b35
    i = 0;
    while (i < 35) {
        img.b35[i] = new Image();
        img.b35[i].crossOrigin = 'Anonymous';
        img.b35[i].src = 'https://dp4p6x0xfi5o9.cloudfront.net/maimai/img/cover-m/' + b50Data.Oldb35[i].imageName + '?123456';
        img.b35[i].onload = function() { progress = progress + 1; };
        i = i + 1;
    }
    //封面b15
    i = 0;
    while (i < 15) {
        img.b15[i] = new Image();
        img.b15[i].crossOrigin = 'Anonymous';
        img.b15[i].src = 'https://dp4p6x0xfi5o9.cloudfront.net/maimai/img/cover-m/' + b50Data.Newb15[i].imageName + '?123456';
        img.b15[i].onload = function() { progress = progress + 1; };
        i = i + 1;
    }

    i = 0;
    //绿到白
    while (i < 5) {
        img.CoverColor[i] = new Image();
        img.CoverColor[i].src = './res/image/cover_color/' + i + '.png';
        img.CoverColor[i].onload = function() { progress = progress + 1; };
        i = i + 1;
    }
    i = 0;
    //D到SSS+
    while (i < 14) {
        img.rate[i] = new Image();
        img.rate[i].src = './res/image/rate_full/' + i + '.png';
        img.rate[i].onload = function() { progress = progress + 1; };
        i = i + 1;
    }

    //DX标识
    img.deluxe[0] = new Image();
    img.deluxe[0].src = './res/image/variants/false.png';
    img.deluxe[0].onload = function() { progress = progress + 1; };
    img.deluxe[1] = new Image();
    img.deluxe[1].src = './res/image/variants/true.png';
    img.deluxe[1].onload = function() { progress = progress + 1; };

    //Flags
    img.flags["music_icon_"] = new Image();
    img.flags["music_icon_"].src = './res/image/flags/music_icon_.png';
    img.flags["music_icon_"].onload = function() { progress = progress + 1; };
    img.flags["music_icon_ap"] = new Image();
    img.flags["music_icon_ap"].src = './res/image/flags/music_icon_ap.png';
    img.flags["music_icon_ap"].onload = function() { progress = progress + 1; };
    img.flags["music_icon_ap+"] = new Image();
    img.flags["music_icon_ap+"].src = './res/image/flags/music_icon_ap+.png';
    img.flags["music_icon_ap+"].onload = function() { progress = progress + 1; };
    img.flags["music_icon_fc"] = new Image();
    img.flags["music_icon_fc"].src = './res/image/flags/music_icon_fc.png';
    img.flags["music_icon_fc"].onload = function() { progress = progress + 1; };
    img.flags["music_icon_fc+"] = new Image();
    img.flags["music_icon_fc+"].src = './res/image/flags/music_icon_fc+.png';
    img.flags["music_icon_fc+"].onload = function() { progress = progress + 1; };
    img.flags["music_icon_fs"] = new Image();
    img.flags["music_icon_fs"].src = './res/image/flags/music_icon_fs.png';
    img.flags["music_icon_fs"].onload = function() { progress = progress + 1; };
    img.flags["music_icon_fs+"] = new Image();
    img.flags["music_icon_fs+"].src = './res/image/flags/music_icon_fs+.png';
    img.flags["music_icon_fs+"].onload = function() { progress = progress + 1; };
    img.flags["music_icon_fsd"] = new Image();
    img.flags["music_icon_fsd"].src = './res/image/flags/music_icon_fsd.png';
    img.flags["music_icon_fsd"].onload = function() { progress = progress + 1; };
    img.flags["music_icon_fsd+"] = new Image();
    img.flags["music_icon_fsd+"].src = './res/image/flags/music_icon_fsd+.png';
    img.flags["music_icon_fsd+"].onload = function() { progress = progress + 1; };
    img.flags["music_icon_max"] = new Image();
    img.flags["music_icon_max"].src = './res/image/flags/music_icon_max.png';
    img.flags["music_icon_max"].onload = function() { progress = progress + 1; };



    img.logo = new Image();
    img.logo.src = './res/image/logo/logo.png';
    img.logo.onload = function() { progress = progress + 1; };

    return img;


}

function convertImgToBase64(url, callback, outputFormat) {
    var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL);
        canvas = null;
    };
    img.src = url;
}