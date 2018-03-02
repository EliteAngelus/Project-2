$(document).ready(function() {
  /* global moment */

  // chatContainer holds all of the chats
  var chatboxContainer = $(".chat-container");
  var chatCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleChatDelete);
  $(document).on("click", "button.edit", handleChatEdit);
  // Variable to hold our posts
  var chats;

  // The code below handles the case where we want to get blog posts for a specific author
  // Looks for a query param in the url for author_id
  var url = window.location.search;
  var authorId;
  if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
    getChats(authorId);
  }
  // If there's no authorId we just get all posts as usual
  else {
    getChats();
  }


  // This function grabs posts from the database and updates the view
  function getPosts(author) {
    authorId = author || "";
    if (authorId) {
      authorId = "/?author_id=" + authorId;
    }
    $.get("/api/chats" + authorId, function(data) {
      console.log("Chats", data);
      chats = data;
      if (!chats || !chats.length) {
        displayEmpty(author);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/chats/" + id
    })
    .then(function() {
      getChats(chatCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    chatboxContainer.empty();
    var chatsToAdd = [];
    for (var i = 0; i < chats.length; i++) {
      chatsToAdd.push(createNewRow(chats[i]));
    }
    chatboxContainer.append(chatsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(chat) {
    var formattedDate = new Date(chat.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newChatPanel = $("<div>");
    newChatPanel.addClass("panel panel-default");
    var newChatPanelHeading = $("<div>");
    newChattPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newChatTitle = $("<h2>");
    var newChatDate = $("<small>");
    var newChatAuthor = $("<h5>");
    newChattAuthor.text("Written by: Author name display is in next activity when we learn joins!");
    newChatAuthor.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
  //   var newPostPanelBody = $("<div>");
  //   newPostPanelBody.addClass("panel-body");
  //   var newPostBody = $("<p>");
  //   newPostTitle.text(post.title + " ");
  //   newPostBody.text(post.body);
  //   newPostDate.text(formattedDate);
  //   newPostTitle.append(newPostDate);
  //   newPostPanelHeading.append(deleteBtn);
  //   newPostPanelHeading.append(editBtn);
  //   newPostPanelHeading.append(newPostTitle);
  //   newPostPanelHeading.append(newPostAuthor);
  //   newPostPanelBody.append(newPostBody);
  //   newPostPanel.append(newPostPanelHeading);
  //   newPostPanel.append(newPostPanelBody);
  //   newPostPanel.data("post", post);
  //   return newPostPanel;
  // }

  // This function figures out which post we want to delete and then calls deletePost
  function handleChatDelete() {
    var currentChat = $(this)
      .parent()
      .parent()
      .data("chat");
    deleteChat(currentChat.id);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentChatt = $(this)
      .parent()
      .parent()
      .data("chat");
    window.location.href = "/endChat?chatt_id=" + currentChat.id;
  }

  // This function displays a messgae when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Author #" + id;
    }
    blogContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    chatboxContainer.append(messageh2);
  }

});
