$(document).ready(function() {
  // Getting jQuery references to the chat body, title(language)form, and author select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var endChatForm = $("#endChat");
  var authorSelect = $("#author");
  // Adding an event listener for when the form is submitted
  $(endChatForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a chat)
  var url = window.location.search;
  var chatId;
  var authorId;
  // Sets a flag for whether or not we're updating a chat to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the chat id from the url
  // In '?chat_id=1', chatId is 1
  if (url.indexOf("?chat_id=") !== -1) {
    chatId = url.split("=")[1];
    getChatData(chatId, "chat");
  }
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  else if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
  }

  // Getting the authors, and their posts
  getAuthors();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !authorSelect.val()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newChat = {
      language: titleInput
        .val()
        .trim(),
      chat: bodyInput
        .val()
        .trim(),
      AuthorId: authorSelect.val()
    };

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newChat.id = chatId;
      updateChat(newChat);
    }
    else {
      submitChat(newChat);
    }
  }

  // Submits a new post and brings user to endChat page upon completion
  function submitChat(chat) {
    $.chat("/api/chats", chat, function() {
      window.location.href = "/endChat";
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
  function getChatData(id, type) {
    var queryUrl;
    switch (type) {
      case "chat":
        queryUrl = "/api/chats/" + id;
        break;
      case "author":
        queryUrl = "/api/authors/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.AuthorId || data.id)
        // If this chat exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        authorId = data.AuthorId || data.id;
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Authors and then render our list of Authors
  function getAuthors() {
    $.get("/api/authors", renderAuthorList);
  }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderAuthorList(data) {
    if (!data.length) {
      window.location.href = "/authors";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createAuthorRow(data[i]));
    }
    authorSelect.empty();
    console.log(rowsToAdd);
    console.log(authorSelect);
    authorSelect.append(rowsToAdd);
    authorSelect.val(authorId);
  }

  // Creates the author options in the dropdown
  function createAuthorRow(author) {
    var listOption = $("<option>");
    listOption.attr("value", author.id);
    listOption.text(author.name);
    return listOption;
  }

  // Update a given chat, bring user to the endChat page when done
  function updateChat(chat) {
    $.ajax({
      method: "PUT",
      url: "/api/chats",
      data: chat
    })
    .then(function() {
      window.location.href = "/endChat";
    });
  }
});
