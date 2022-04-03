function decryptTaskComments() {
  if (window.location.href.includes("todoist.com")) {
    console.log(window.location.href);
    findTaskComments();
  }
}

function findTaskComments() {
  var find_comments = document.getElementsByClassName("comments_list_container");

  console.log(find_comments);
}

var timer = setInterval(decryptTaskComments(), 5000);
