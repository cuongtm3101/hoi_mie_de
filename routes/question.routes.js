const express = require("express");
const router = express.Router();

const fs = require("fs");

router.get("/", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./dev-data/questions.json"));
    res.json(data);
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.get("/:id", (req, res) => {
  let { id } = req.params;
  try {
    let data = JSON.parse(fs.readFileSync("./dev-data/questions.json"));

    let find = data.find((e, i) => e.id === +id);

    if (find) {
      res.json(find);
    } else {
      res.json({
        message: "Question not found",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.post("/", (req, res) => {
  let { content } = req.body;

  try {
    let question = {
      id: Math.floor(Math.random() * 100000000000),
      like: 0,
      dislike: 0,
      content,
    };

    let data = JSON.parse(fs.readFileSync("./dev-data/questions.json"));

    data.push(question);

    fs.writeFileSync("./dev-data/questions.json", JSON.stringify(data));

    res.json({
      message: "Question created successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { like, dislike } = req.body;
  try {
    let data = JSON.parse(fs.readFileSync("./dev-data/questions.json"));

    let findIndex = data.findIndex((e, i) => e.id === +id);

    if (findIndex === -1) {
      res.json({
        message: "Question not found",
      });
    } else {
      data[findIndex] = {
        ...data[findIndex],
        like,
        dislike,
      };
      fs.writeFileSync("./dev-data/questions.json", JSON.stringify(data));
      res.json({
        message: "Question updated successfully",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  try {
    let data = JSON.parse(fs.readFileSync("./dev-data/questions.json"));

    let findIndex = data.findIndex((e, i) => e.id === +id);

    if (findIndex === -1) {
      res.json({
        message: "Question not found",
      });
    } else {
      data.splice(findIndex, 1);
      fs.writeFileSync("./dev-data/questions.json", JSON.stringify(data));
      res.json({
        message: "Question deleted successfully",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

module.exports = router;
