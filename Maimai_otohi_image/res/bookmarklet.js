var BookScore = [];
var DifficultyNumber = 0;
var UserInfo = { card_name: null, class_rank: null, course_rank: null, rating: null, title: null, trophy: null };
var UserImage = { icon: null };
UserInfo.card_name = $(".name_block")[0].innerHTML;
UserInfo.class_rank = $(".basic_block")[0].getElementsByTagName("img")[4].src.split("class_rank_s_")[1].slice(0, -12);
UserInfo.course_rank = $(".basic_block")[0].getElementsByTagName("img")[3].src.split("course_rank_")[1].slice(0, -12);
UserInfo.rating = $(".rating_block")[0].innerHTML;
UserInfo.title = $(".trophy_inner_block")[0].innerHTML.replace("\n\t\t\t\t\t<span>", "").replace("</span>\n\t\t\t\t", "");
UserInfo.trophy = $(".trophy_block")[0].className.split(" ")[1].replace("trophy_", "").toLowerCase();
UserImage.icon = $(".basic_block")[0].getElementsByTagName("img")[0].src;
LoadPage(0);

function GetScore(diff) {
    var Score = [],
        SongName = [],
        Deluxe = [],
        ReturnData = [];
    var ScoreBlock, DiffName;
    var i = 0,
        j = 0;
    switch (diff) {
        case 0:
            DiffName = "basic";
            break;
        case 1:
            DiffName = "advanced";
            break;
        case 2:
            DiffName = "expert";
            break;
        case 3:
            DiffName = "master";
            break;
        case 4:
            DiffName = "remaster";
            break;
    }
    ScoreBlock = $(".music_" + DiffName + "_score_back").parent("div");
    while (j < ScoreBlock.length) {
        if (ScoreBlock[j].getElementsByClassName('music_score_block')[0] != null) {
            //console.log(ScoreBlock[j].getElementsByClassName('music_score_block')[0].innerHTML);
            Score[i] = ScoreBlock[j].getElementsByClassName('music_score_block')[0].innerHTML;
            SongName[i] = ScoreBlock[j].getElementsByClassName('music_name_block')[0].innerHTML.replace('amp;', "").replace("\\", "");
            Deluxe[i] = (ScoreBlock[j].getElementsByTagName('img')[ScoreBlock[j].getElementsByTagName('img').length - 1].src.indexOf("music_standard") == -1);
            i = i + 1;
        }
        j = j + 1;
    }

    j = 0;

    function ReturnDataBase() {
        this.Title = null;
        this.score = null;
        this.deluxe = null;
        this.difficulty = null;
        this.combo_flag = null;
        this.sync_flag = null;
    }
    while (j < i) {
        ReturnData[j] = new ReturnDataBase;
        ReturnData[j]["Title"] = SongName[j];
        ReturnData[j]["score"] = parseFloat(Score[j].replace('%', ""));
        ReturnData[j]["deluxe"] = Deluxe[j];
        ReturnData[j]["difficulty"] = diff;
        ReturnData[j]["combo_flag"] = "";
        ReturnData[j]["sync_flag"] = "";
        j = j + 1;
    }
    return ReturnData;


}

function LoadPage(diff) {
    $("body").load("https://maimaidx-eng.com/maimai-mobile/record/musicGenre/search/?genre=99&diff=" + diff, function(response, status, xhr) {
        if (status == "success") {
            BookScore.push.apply(BookScore, GetScore(diff));
            DifficultyNumber = DifficultyNumber + 1;
            if (DifficultyNumber <= 4) {
                LoadPage(DifficultyNumber);
            } else {
                jumpPage();
            }
        }
    });
}

function jumpPage() {
    $("body").html('<iframe src="https://feizhaixiage.github.io/Maimai_otohi_image/" id="feizhaixiage" frameborder="0" width="100%" height=""></iframe>');
    var feizhaixiagePage = document.getElementById("feizhaixiage");
    feizhaixiagePage.height = window.innerHeight + "px";
    window.onresize = function() { feizhaixiagePage.height = window.innerHeight + "px"; };
    if (feizhaixiagePage.attachEvent) {
        //todo something
        feizhaixiagePage.contentWindow.postMessage({ BookScore: BookScore, UserInfo: UserInfo, UserImage: UserImage }, "*");
    } else {
        feizhaixiagePage.onload = function() {
            //todo something
            feizhaixiagePage.contentWindow.postMessage({ BookScore: BookScore, UserInfo: UserInfo, UserImage: UserImage }, "*");
        }
    }

}