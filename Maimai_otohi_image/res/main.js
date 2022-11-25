var MusicData, UserData, MusicDB;

var PostData = {};
PostData["query"] = "query dxIntlSongs {\n  dx_intl_songs(order_by: [{category: asc}, {order: asc}]) {\n    ...dxIntlSongsFields\n    __typename\n  }\n}\n\nfragment dxIntlSongsFields on dx_intl_songs {\n  id\n  category\n  title\n  order\n  dx_intl_variants(order_by: {deluxe: asc}) {\n    deluxe\n    version\n    active\n    dx_intl_notes(order_by: {difficulty: asc}) {\n      internal_lv\n      difficulty\n      level\n      __typename\n    }\n    __typename\n  }\n}";
PostData["operationName"] = "dxIntlSongs";
PostData["variables"] = {};


function b50() {
    var ScoreMix = UserData.data.dx_intl_players[0].dx_intl_scores;
    var RatingMix, Output;
    var OldRating = [],
        NewRating = [];
    var Oldb35 = [],
        Newb15 = [];
    var i = 0,
        j = 0,
        k = 0;
    RatingMix = RatingGeneratet();
    //添加封面信息
    RatingMix = AddCover(RatingMix);

    while (i < ScoreMix.length) {
        if (RatingMix[i].Version == 18) {
            NewRating[j] = RatingMix[i];
            j = j + 1;
        } else {
            OldRating[k] = RatingMix[i];
            k = k + 1;
        }
        i = i + 1;
    }

    OldRating.sort(function(a, b) {
        return b.Rating - a.Rating
    })
    NewRating.sort(function(a, b) {
        return b.Rating - a.Rating
    })

    Oldb35 = OldRating.slice(0, 35);
    Newb15 = NewRating.slice(0, 15);
    console.log(Oldb35);
    console.log(Newb15);
    Output = { Oldb35: Oldb35, Newb15: Oldb35 };
    i = 0;
    while (i < 35) {
        $("#test").before('<img src="https://dp4p6x0xfi5o9.cloudfront.net/maimai/img/cover/' + Oldb35[i].imageName + '"/>');
        $("#test").before('<p>' + Oldb35[i].Title + ' ' + Oldb35[i].Rating + ' ' + Oldb35[i].score + '</p>');
        i = i + 1;
    }
    i = 0;
    while (i < 15) {
        $("#test").before('<img src="https://dp4p6x0xfi5o9.cloudfront.net/maimai/img/cover/' + Newb15[i].imageName + '"/>');
        $("#test").before('<p>' + Newb15[i].Title + ' ' + Newb15[i].Rating + ' ' + Newb15[i].score + '</p>');
        i = i + 1;
    }


    return Output;
}

//解析每一首歌的Rating
function RatingGeneratet() {
    var i = 0;
    var ScoreMix = UserData.data.dx_intl_players[0].dx_intl_scores;
    var SongMd5, Difficulty, Score, Detail, Achv, InternalLv, RatingMix;

    //生成Rating并放在一起
    while (i < ScoreMix.length) {
        Score = ScoreMix[i];
        //歌曲MD5
        SongMd5 = Score.song_id;
        //查询歌曲详细信息
        Detail = (MusicData.data.dx_intl_songs).find(array => array.id === SongMd5);
        Achv = Score.score;
        Difficulty = (Detail.dx_intl_variants).find(array => array.deluxe === Score.deluxe);
        if (Difficulty.dx_intl_notes[Score.difficulty].internal_lv != null) {
            InternalLv = Difficulty.dx_intl_notes[Score.difficulty].internal_lv;
        } else {
            InternalLv = parseInt(Difficulty.dx_intl_notes[Score.difficulty].level);
        }
        RatingMix = Rating(Achv, InternalLv)

        ScoreMix[i]["Rating"] = RatingMix.Rating;
        ScoreMix[i]["ScoreName"] = RatingMix.Title;
        ScoreMix[i]["Title"] = Detail.title;
        ScoreMix[i]["Version"] = Difficulty.version;
        ScoreMix[i]["InternalLv"] = InternalLv;
        i = i + 1;
    }

    console.log(ScoreMix);
    return ScoreMix;
}

//为每一首歌匹配封面
function AddCover(SongData) {
    var i = 0;
    var SongDetail;
    while (i < SongData.length) {
        SongDetail = (MusicDB.songs).find(array => array.title === SongData[i].Title);
        SongData[i].imageName = SongDetail.imageName;
        i = i + 1;
    }
    return SongData;
}


//Rating生成参考链接 https://github.com/myjian/mai-tools/
function Rating(Achv, InternalLv) {
    var Rating;
    var Title;
    if (Achv >= 100.5) {
        Rating = Math.trunc(InternalLv * 22.4 * 100.5 * 0.01);
        Title = "SSS+";
    } else if (Achv >= 100) {
        Rating = Math.trunc(InternalLv * 21.6 * Achv * 0.01);
        Title = "SSS";
    } else if (Achv >= 99.5) {
        Rating = Math.trunc(InternalLv * 21.1 * Achv * 0.01);
        Title = "SS+";
    } else if (Achv >= 99) {
        Rating = Math.trunc(InternalLv * 20.8 * Achv * 0.01);
        Title = "SS";
    } else if (Achv >= 98) {
        Rating = Math.trunc(InternalLv * 20.3 * Achv * 0.01);
        Title = "S+";
    } else if (Achv >= 97) {
        Rating = Math.trunc(InternalLv * 20 * Achv * 0.01);
        Title = "S";
    } else if (Achv >= 94) {
        Rating = Math.trunc(InternalLv * 16.8 * Achv * 0.01);
        Title = "AAA";
    } else if (Achv >= 90) {
        Rating = Math.trunc(InternalLv * 15.2 * Achv * 0.01);
        Title = "AA";
    } else if (Achv >= 80) {
        Rating = Math.trunc(InternalLv * 13.6 * Achv * 0.01);
        Title = "A";
    } else if (Achv >= 75) {
        Rating = Math.trunc(InternalLv * 12 * Achv * 0.01);
        Title = "BBB";
    } else if (Achv >= 70) {
        Rating = Math.trunc(InternalLv * 11.2 * Achv * 0.01);
        Title = "BB";
    } else if (Achv >= 60) {
        Rating = Math.trunc(InternalLv * 9.6 * Achv * 0.01);
        Title = "B";
    } else if (Achv >= 50) {
        Rating = Math.trunc(InternalLv * 8 * Achv * 0.01);
        Title = "C";
    } else {
        Rating = 0;
        Title = "D";
    }
    return { Rating: Rating, Title: Title };
}


//Post到Otohi
$.ajax({
    type: "POST",
    url: "https://api.otohi.me/graphql",
    dataType: 'json',
    data: JSON.stringify(PostData),
    success: function(data) {
        MusicData = data;
    }
});

//获取音乐DB
//https://github.com/zetaraku/arcade-songs
$.get("https://dp4p6x0xfi5o9.cloudfront.net/maimai/data.json", function(data, status) {
    MusicDB = data;
});


$(document).ready(function() {
    $("#UpLoadBt").click(function() {
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
                    b50();
                } else {
                    console.log("e");
                }
            }
        });

    });
});