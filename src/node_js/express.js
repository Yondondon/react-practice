const express = require("express");
const app = express();
const url = require('url');
const MongoClient = require("mongodb").MongoClient;


app.get("/get_todos", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

  let get_parametrs = url.parse(req.url, true).query;
  const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
  mongoClient.connect(function(err, client) {
    if(err) {
      console.log(err);
      res.end(JSON.stringify(err));
    }

    const db = client.db("yon_db");
    const collection = db.collection("todos");

    collection.find().toArray((err, results) => {
      for(let i = 0; i < results.length; i++) {
        if(get_parametrs.username == results[i].user) {
          let response = {
            status: "success",
            payload: results[i].todo
          }
          res.end(JSON.stringify(response));
          return;
        }
      }
      let response = {
        status: "fail"
      }
      res.end(JSON.stringify(response));
    })
  });
});

app.post('/save_todos', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  let body = "";
  let get_parametrs = url.parse(req.url, true).query;

  //get data from POST
  req.on('data', data => {
    body += data;
  })
  req.on('end', () => {
    const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
    mongoClient.connect(function(err, client) {
      if(err) {
        console.log(err);
        res.end(JSON.stringify(err));
      }

      const db = client.db("yon_db");
      const collection = db.collection("todos");

      let temp = JSON.parse(body)
      collection.findOneAndUpdate(
        { "user": get_parametrs.username },
        { $set: { "todo" : temp } }
      );

      res.end(JSON.stringify("Yay"));
    });
  });
});

app.get('/create_todo_user', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

  let get_parametrs = url.parse(req.url, true).query;


  const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
  mongoClient.connect(function(err, client) {
    if(err) {
      console.log(err);
      res.end(JSON.stringify(err));
    }

    const db = client.db("yon_db");
    const collection = db.collection("todos");

    let data = {
      user: get_parametrs.username,
      todo: {
        todos: [],
        completed_todos: []
      }
    }

    if(get_parametrs.username != undefined && get_parametrs.username != "") {
      collection.insertOne(data, (err, res) => {
        if (err) {
          console.log("create_todo_user");
          throw err;
        } 
      });
      res.end(JSON.stringify("Created!"));
    } else {
      res.end(JSON.stringify("User isn't created!"));
    }
    

  });
})

app.get('/login', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

  let get_parametrs = url.parse(req.url, true).query;
  const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
  mongoClient.connect(function(err, client) {
    if(err) {
      console.log(err);
      res.end(JSON.stringify(err));
    }

    const db = client.db("yon_db");
    const collection = db.collection("users");

    collection.find().toArray((err, results) => {
      for(let i = 0; i < results.length; i++) {
        if(results[i].username == get_parametrs.username && results[i].pass == get_parametrs.pass) {
          let response = {
            status: "success",
            payload: results[i]
          }
          res.end(JSON.stringify(response));
          return;
        }
      }
      let response = {
        status: "fail"
      }
      res.end(JSON.stringify(response));
    })
  });
});

let server = app.listen(1535, () => {});