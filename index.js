import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import Blog from "./models/blog.js";

const app = express();
const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@horecadraft.av354.mongodb.net/?retryWrites=true&w=majority&appName=${DB_NAME}`;

app.use(cors());
app.use(bodyParser.json());

async function start() {
  try {
    mongoose.connect(MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();

app.get("/", (req, res) => {
  res.send("Hello Horeca");
});

app.get("/api/posts", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

app.post("/api/posts", async (req, res) => {
  const { title, description, content, author, publishedAt, urlToImage } =
    req.body;

  if (!title || !content || !description || !author || !urlToImage) {
    return res
      .status(400)
      .json({ error: "Title, content, and image are required" });
  }
  try {
    const newBlog = new Blog({
      title,
      content,
      description,
      urlToImage,
      author,
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
});
