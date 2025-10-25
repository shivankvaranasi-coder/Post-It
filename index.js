const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");


// Middleware setup
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Sample data
let posts = [
  { id: uuidv4(), username: "Shivank", content: "I love coding" },
  { id: uuidv4(), username: "Shikhar", content: "I love physics" },
  { id: uuidv4(), username: "Bhaskar", content: "I love engineering" },
];

// Redirect root → /posts
app.get("/", (req, res) => {
  res.redirect("/posts");
});

// Show all posts
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// Form to create new post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// Handle new post submission
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// Show individual post
app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  const newContent = req.body.content;

  const post = posts.find((p) => p.id === id);
  if (!post) return res.status(404).send("Post not found");

  post.content = newContent;
  res.redirect("/posts");
});


// Form to edit post
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  
  res.render("edit.ejs", { post });
});
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
   posts= posts.filter((p) => p.id!==id);
 
 res.redirect("/posts");
});
// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

