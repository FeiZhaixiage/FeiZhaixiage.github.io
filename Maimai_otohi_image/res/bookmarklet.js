var BookScore = [];
var DifficultyNumber = 0;

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
    $("body").load("https://feizhaixiage.github.io/Maimai_otohi_image/indexbook.html", function(response, status, xhr) {
        if (status == "success") {

        }
    });
}