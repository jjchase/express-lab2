// require the Express module
const express = require("express");

//creates a new router object
const routes = express.Router();
const pool = require("./connection");

// const items = [];
routes.get("/todo", (req, res) => {
  // .json sends response as JSON
  // res.status(200).json(items); //note: defaults to 200 if request has succeeded.
  pool.query("SELECT * FROM todo").then(result => {
    console.log(result);
    console.log(result.rows);
    res.json(result.rows);
  })
});

// route
routes.get("/todo/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // Find by ID
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    res.status(200).json(todo)
  } else {
    // Set response code to 404
    res.status(404);
    res.send(`ID ${id} Not Found`);
  }
});

// route
routes.post("/todos", (req, res) => {
  pool.query("INSERT INTO todo (task, completed) VALUES ($1::text, $2::boolean)",
    [req.body.task, req.body.completed]).then(() => {
      res.json(req.body)
    });
});

// route
routes.put("/todos/:id", (req, res) => {
  pool.query("UPDATE todo SET task=$1::text WHERE id=$2::int", [req.body.task, req.params.id]).then(() => {
    res.json(req.body)
  })
});

// route
routes.delete("/todos/:id", (req, res) => {
  pool.query("DELETE FROM todo WHERE id=$1::int", [req.params.id]).then(() => {
    res.sendStatus(204).json(`${req.params.id}`)
  })
});

module.exports = { routes };
