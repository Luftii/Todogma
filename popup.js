function setTaskText() {
  // This is the task list
  // document.body.div[1].div.div[2].div[2].main.div.div[2].div.div.ul



}

function decryptTaskComments() {
  // console.log("Test");
  // document.getElementById("comment-3045180690").innerHTML = "Yeaaa boiiiii";
  // $("#comment-3045180690").closest("div.markdown_content").find("p").innerHTML = "Yeaaaaa boiiiii";
  // findCommentIDs();
}

function addEventListeners() {
  document.getElementById("decryptProjectCommentsButton").addEventListener("click", decryptTaskComments);
}

addEventListeners();
