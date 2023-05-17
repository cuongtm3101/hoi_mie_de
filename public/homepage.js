const questionContent = document.querySelector(".question-content");
const dislikeBtn = document.querySelector("#dislike");
const likeBtn = document.querySelector("#like");
let activeQuestion = undefined;

fetch("http://localhost:3000/api/v1/questions")
  .then((res) => res.json())
  .then((data) => {
    let index = Math.floor(Math.random() * data.length);
    activeQuestion = data[index];
    questionContent.innerHTML = activeQuestion.content;
  })
  .catch((err) => console.log(err));

dislikeBtn.onclick = async () => {
  activeQuestion.dislike = activeQuestion.dislike + 1;
  try {
    let res = await fetch(
      `http://localhost:3000/api/v1/questions/${activeQuestion.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dislike: activeQuestion.dislike,
          like: activeQuestion.like,
        }),
      }
    );
    let data = await res.json();
    window.location.href = `/question-detail/${activeQuestion.id}`;
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

likeBtn.addEventListener("click", async () => {
  activeQuestion.like = activeQuestion.like + 1;
  try {
    let res = await fetch(
      `http://localhost:3000/api/v1/questions/${activeQuestion.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dislike: activeQuestion.dislike,
          like: activeQuestion.like,
        }),
      }
    );
    let data = await res.json();
    window.location.href = `/question-detail/${activeQuestion.id}`;
  } catch (error) {
    alert(error);
    console.log(error);
  }
});
