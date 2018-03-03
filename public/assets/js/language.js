$(document).ready(function() {
    var name = ""
    var language = ""

    $('#chat-page').hide();
    $("#get-started").click(function() {
        event.preventDefault();

        $("#login-form").hide();
        $("#chat-page").show();
        name = $("#name").val().trim();
        language = $("#language-select").find('option:selected').text();
        console.log(language);
        $.post("/api/users", { name });
        $.post("/api/users", { language });
    });



    function upsertUsers(usersData) {
        $.post("/api/users", userData)
            .then(getUsers);
    }

    var pusher = new Pusher('507bfdfaab454a693999', {
        cluster: 'us2',
        encrypted: false
    });
    let channel = pusher.subscribe('public-language-chat');
    channel.bind('message-added', onMessageAdded);
    $('#btn-chat').click(function() {
        const message = $("#message").val();
        $("#message").val("");
        console.log(message)

        //ALLOWS US TO VIEW OUR TYPED MESSAGE IN THE CHAT BOX
        $.post("/message", { message });
        $(".chat").append(name + ": ")

    });
    // $('#end-chat').click(function() {
    //     //download database as txt file
    //     $.post("/endChat", {

    //     });

    //     //clear database
    // });
    function onMessageAdded(data) {
        let template = $("#new-message").html();
        // template = template.replace("{{body}}", data.message);
        var message = data.message
        $.post("/api/ChatMessages", { message })
        console.log(template)
        console.log(data.message)
        $(".chat").append(data.message + "<br>");
    }

    // Code to work dictionary
    $("#translateBtn").click(function() {
        event.preventDefault();
        var userInput = $("#preTranslate").val().trim();
        console.log(userInput)
        $.ajax({
            method: "POST",
            url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?lang=es&text=' + userInput + '&key=trnsl.1.1.20180228T235240Z.c50a73fab700d266.d87e32c47eece8504a90611e96df3157747050fe'
        }).done(function(trans) {
            console.log(trans.text)
            $("#translateWord").append(userInput +": " + trans.text + "<br>")
        })

    });



});