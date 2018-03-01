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
       

    //*NEW* line 32 allows to log users name in Users table in DB, but wont recognize language or difficulty....and wont show text in chatbox
    //in order to see what user types in chatbox, change line 32 to $.post("http://localhost:3000/messages", { message});
       $.post("http://localhost:3000/api/users", { name });
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
        