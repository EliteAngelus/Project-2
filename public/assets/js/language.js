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
            //send message


        //*NEW* line 32 allows to log users name in Users table in DB, but wont recognize language or difficulty....and wont show text in chatbox
        //in order to see what user types in chatbox, change line 32 to $.post("http://localhost:3000/message", { message});

        //ALLOWS US TO VIEW OUR TYPED MESSAGE IN THE CHAT BOX
        // $.post("http://localhost:3000/api/ChatMessages", { message });
        $.post("/message", { message });
        $(".chat").append(name + ": ")

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

// $(document).ready(function() {
//     $('#chat-page').hide();
//     $("#get-started").click(function() {
//         event.preventDefault();
//         $("#login-form").hide();
//         $("#chat-page").show();
//     });

//     var pusher = new Pusher('507bfdfaab454a693999', {
//         cluster: 'us2',
//         encrypted: false
//     });
//     let channel = pusher.subscribe('public-language-chat');
//     channel.bind('message-added', onMessageAdded);
//     $('#btn-chat').click(function() {
//         const message = $("#message").val();
//         $("#message").val("");
//         console.log(message)
//             //send message
//         $.post("http://localhost:3000/message", { message });
//     });

//     function onMessageAdded(data) {
//         let template = $("#new-message").html();
//         // template = template.replace("{{body}}", data.message);

//         console.log(template)
//         console.log(data.message)
//         $(".chat").append(data.message + "<br>");
//     }
// });