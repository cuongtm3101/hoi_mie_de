const questionContent = document.querySelector(".question-content");
const voteNumber = document.querySelector(".vote-number");
const likeBar = document.querySelector(".like");
const dislikeBar = document.querySelector(".dislike");

let hrefArray = window.location.href.split("/");
let id = hrefArray[hrefArray.length - 1];

fetch(`http://localhost:3000/api/v1/questions/${id}`)
  .then((res) => res.json())
  .then((data) => {
    questionContent.innerHTML = data.content;
    voteNumber.innerHTML = data.like + data.dislike;

    likePercent = Math.floor((data.like / (data.like + data.dislike)) * 100);
    dislikePercent = 100 - likePercent;

    likeBar.style.width = `${likePercent}%`;
    likeBar.innerHTML = `${likePercent}%`;

    dislikeBar.style.width = `${dislikePercent}%`;
    dislikeBar.innerHTML = `${dislikePercent}%`;
  })
  .catch((err) => {
    alert(err);
    console.log(err);
  });
