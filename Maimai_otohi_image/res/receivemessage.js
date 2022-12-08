var BookScore;
var UserImage = null;
var UserInfo;
window.addEventListener('message', function(message) { // 监听 message 事件
    console.log(message.data);
    BookScore = message.data.BookScore;
    UserInfo = message.data.UserInfo;
    UserImage = message.data.UserImage;
    var NameBoxHtml = '<div class="mdui-textfield">\n' +
        '  <textarea class="mdui-textfield-input" rows="4" placeholder="Message" id="BookScoreBox"></textarea>\n' +
        '</div>';
    $("#NameBox").html(NameBoxHtml);
    $("#Title").html("MaimaiDX Rating Image BookMarklet");
    $("#OutputCanvas").attr("style", "display:none;");
    $("#NameBox").after('<button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent" onclick="OutputCanvasBook()">生成高质量图片</button>');
    $.ajax({
        type: "POST",
        url: "https://api.otohi.me/graphql",
        dataType: 'json',
        data: JSON.stringify(PostData),
        success: function(data) {
            var i = 0;
            var SongDetailSHA256;
            while (i < BookScore.length) {
                SongDetailSHA256 = (data.data.dx_intl_songs).find(array => array.title === BookScore[i].Title);
                BookScore[i].song_id = SongDetailSHA256.id;
                i = i + 1;
            }
            $("#BookScoreBox").html(JSON.stringify(BookScore));
        }
    });

});