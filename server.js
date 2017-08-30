const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 8006;
const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.use(express.static('public'));
app.set("view engine", "mustache");

app.use(bodyParser.urlencoded({ extended: false }));

const todoList = [];

app.get("/", (req, res) => {
    // create two empty arrays and sort the todos into those array. 
    const completeTodos = [];
    const incompleteTodos = [];

    todoList.forEach(function (todo) {
        if (todo.completed) {
            completeTodos.push(todo);
        } else {
            incompleteTodos.push(todo);
        }
    });
    console.log('completeTodos: ', completeTodos);
    console.log('incompleteTodos: ', incompleteTodos);

    res.render("index", { complete: completeTodos, incomplete: incompleteTodos })
});


app.post("/", function (req, res) {
    let newTodo = req.body;
    newTodo.completed = false;
    newTodo.id = Math.random();
    todoList.push(newTodo);
    console.log('todoList: ', todoList);
    return res.redirect('/');
})

app.post("/todos/:id", function (req, res) {
    let id = req.params.id;  // get the todo id from the url
    let todo = todoList.find(todo => todo.id === parseFloat(id)); // find the todo that matches the id
    todo.completed = !todo.completed; // toggles the todo.completed true->false or false->true
    return res.redirect('/');
})


app.listen(port, () => {
    console.log("server up on port", port);
});

