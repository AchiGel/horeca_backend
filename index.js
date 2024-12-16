import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import blog from "./models/blog.js";

const app = express();
const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@horecadraft.av354.mongodb.net/?retryWrites=true&w=majority&appName=${DB_NAME}`;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// const blogs = [
//   {
//     id: 1,
//     title: "Test 1",
//     description: "Descr for Test 1",
//     content: "Content for Test 1",
//     author: "author",
//     publishedAt: "today",
//     urlToImage: "https://via.placeholder.com/150",
//   },
//   {
//     id: 2,
//     title: "Test 2",
//     description: "Descr for Test 2",
//     content: "Content for Test 2",
//     author: "author",
//     publishedAt: "today",
//     urlToImage: "https://via.placeholder.com/150",
//   },
//   {
//     id: 3,
//     title: "Test 3",
//     description: "Descr for Test 3",
//     content: "Content for Test 3",
//     author: "author",
//     publishedAt: "today",
//     urlToImage: "https://via.placeholder.com/150",
//   },
//   {
//     id: 4,
//     title: "Test 4",
//     description: "Descr for Test 4",
//     content: "Content for Test 4",
//     author: "author",
//     publishedAt: "today",
//     urlToImage: "https://via.placeholder.com/150",
//   },
//   {
//     id: 5,
//     title: "Test 5",
//     description: "Descr for Test 5",
//     content: "Content for Test 5",
//     author: "author",
//     publishedAt: "today",
//     urlToImage: "https://via.placeholder.com/150",
//   },
// ];

app.get("/", (req, res) => {
  res.send("Hello Horeca");
});

app.get("/api/posts", async (req, res) => {
  try {
    const blogs = await blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const blog = await blog.findById(req.params.id);
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
    const newBlog = new blog({
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

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
