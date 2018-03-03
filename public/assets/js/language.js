$(document).ready(function () {
    $('#chat-page').hide();
    $("#get-started").click(function () {
        event.preventDefault();
        $("#login-form").hide();
        $("#chat-page").show();
    });
    var pusher = new Pusher('507bfdfaab454a693999', {
        cluster: 'us2',
        encrypted: false
    });
    let channel = pusher.subscribe('public-language-chat');
    channel.bind('message-added', onMessageAdded);
    $('#btn-chat').click(function () {
        const message = $("#message").val();
        $("#message").val("");
        console.log(message)
        //send message
        $.post("http://localhost:3000/message", { message });
    });
    function onMessageAdded(data) {
        // let template = $("#new-message").html();
        // template = template.replace(".chat-body", data.message);
        // console.log(template)
        console.log(data.message)
        $(".chat").append(template + "<br>");
    }

    
// connect translate button to input box to translate word
    $("#transButton").click(function (){
        var preTranslate = $("#preTranslate").val().trim();
        console.log (preTranslate)
    
//api request and console translated word
        $.ajax({
            method: "POST",
            url: 'https://translate.yandex.net/api/v1.5/tr/detect?hint=en,de&?text=' + preTranslate + '&userInput&key=trnsl.1.1.20180228T235240Z.c50a73fab700d266.d87e32c47eece8504a90611e96df3157747050fe'
        }).done(function(trans) { 
            console.log(`
               Translated Word:
               ==================
              
           `)
           console.log(trans)
        })
    
    }
)
});