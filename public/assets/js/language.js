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
    channel.bind('my_event', function (data) {
        // Add the new message to the container
        $('.messages_display').append('<p class = "message_item">' + data.message + '</p>');
        // Display the send button
        $('.input_send_holder').html('<input type = "submit" value = "Send" class = "btn btn-primary input_send" />');
        // Scroll to the bottom of the container when a new message becomes available
        $(".messages_display").scrollTop($(".messages_display")[0].scrollHeight);
    });

    // AJAX request
    function ajaxCall(ajax_url, ajax_data) {
        $.ajax({
            type: "POST",
            url: ajax_url,
            dataType: "json",
            data: ajax_data,
            success: function (response, textStatus, jqXHR) {
                console.log(jqXHR.responseText);
            },
            error: function (msg) { }
        });
    }

    // Trigger for the Enter key when clicked.
    $.fn.enterKey = function (fnc) {
        return this.each(function () {
            $(this).keypress(function (ev) {
                var keycode = (ev.keyCode ? ev.keyCode : ev.which);
                if (keycode == '13') {
                    fnc.call(this, ev);
                }
            });
        });
    }

    // Send the Message
    $('body').on('click', '.chat_box .input_send', function (e) {
        e.preventDefault();

        var message = $('.chat_box .input_message').val();
        var name = $('.chat_box .input_name').val();

        // Validate Name field
        if (name === '') {
            bootbox.alert('<br /><p class = "bg-danger">Please enter a Name.</p>');

        } else if (message !== '') {
            // Define ajax data
            var chat_message = {
                name: $('.chat_box .input_name').val(),
                message: '<strong>' + $('.chat_box .input_name').val() + '</strong>: ' + message
            }
            // Send the message to the server
            ajaxCall('/message', chat_message);

            // Clear the message input field
            $('.chat_box .input_message').val('');
            // Show a loading image while sending
            $('.input_send_holder').html('<input type = "submit" value = "Send" class = "btn btn-primary" disabled /> &nbsp;<img src = "loading.gif" />');
        }
    });

    // Send the message when enter key is clicked
    $('.chat_box .input_message').enterKey(function (e) {
        e.preventDefault();
        $('.chat_box .input_send').click();
    });
});