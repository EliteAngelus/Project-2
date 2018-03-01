$(document).ready(function() {
    var name = ""
    $('#chat-page').hide();
    $("#get-started").click(function() {
        event.preventDefault();

        $("#login-form").hide();
        $("#chat-page").show();
        name = $("#name").val().trim();
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
            //send message
       
    //not too sure what line 30 does, but if i change/remove, we are unable to see our typed message in the chat box
       $.post("http://localhost:3000/message", { message });
       //ALLOWS US TO VIEW OUR TYPED MESSAGE IN THE CHAT BOX
        $.post("http://localhost:3000/api/ChatMessages", { message });

    });


    function onMessageAdded(data) {
        let template = $("#new-message").html();
        // template = template.replace("{{body}}", data.message);

        console.log(template)
        console.log(data.message)
        $(".chat").append(data.message + "<br>");
    }
});
        