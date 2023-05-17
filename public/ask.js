let form = document.querySelector(".main-form");
let textArea = form.content;
let letter = document.querySelector(".letter");

form.onsubmit = (e) => {
  e.preventDefault();
  fetch("http://localhost:3000/api/v1/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: form.content.value }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((err) => {
      alert(err);
    });
};

textArea.oninput = (e) => {
  letter.innerHTML = 200 - e.target.value.length;
};
