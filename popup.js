function setTaskText() {
  // This is the task list
  // document.body.div[1].div.div[2].div[2].main.div.div[2].div.div.ul
  document.getElementById("task-5731683021-content").innerHTML = "Yeaaa boiiiii";


}

function decryptTaskComments() {

}

function findCommentsDiv() {
  var find_comments = document.getElementsByClassName("comments_list_container");

  console.log(find_comments);
}

function addEventListeners() {
  document.getElementById("decryptTaskCommentsButton").addEventListener("click", decryptTaskComments);
}

addEventListeners();
