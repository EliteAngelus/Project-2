$(document).ready(function() {
    $('#chat-page').hide();
    $("#get-started").click(function() {
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
    $('#btn-chat').click(function() {
        const message = $("#message").val();
        $("#message").val("");
        console.log(message)
            //send message
        $.post("http://localhost:3000/message", { message });
    });

    function onMessageAdded(data) {
        let template = $("#new-message").html();
        // template = template.replace("{{body}}", data.message);

        console.log(template)
        console.log(data.message)
        $(".chat").append(data.message + "<br>");
    }
});