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
        $.post("http://localhost:3000/api/users", { name });
        $.post("http://localhost:3000/api/users", { language });
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
        $.post("/message", { message});
        $(".chat").append(name + ": ")

    });
    $('#end-chat').click(function() {
        //download database as txt file
        $.post("/endChat", { 



        });

        //clear database
    });

    function onMessageAdded(data) {
        let template = $("#new-message").html();
        // template = template.replace("{{body}}", data.message);
        var message = data.message
        $.post("http://localhost:3000/api/ChatMessages", { message })
        console.log(template)
        console.log(data.message)
        $(".chat").append(data.message + "<br>");
    }
});
        