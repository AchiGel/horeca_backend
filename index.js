import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const blogs = [
  {
    id: 1,
    title: "Test 1",
    description: "Descr for Test 1",
    content: "Content for Test 1",
    author: "author",
    publishedAt: "today",
    urlToImage: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Test 2",
    description: "Descr for Test 2",
    content: "Content for Test 2",
    author: "author",
    publishedAt: "today",
    urlToImage: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Test 3",
    description: "Descr for Test 3",
    content: "Content for Test 3",
    author: "author",
    publishedAt: "today",
    urlToImage: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Test 4",
    description: "Descr for Test 4",
    content: "Content for Test 4",
    author: "author",
    publishedAt: "today",
    urlToImage: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "Test 5",
    description: "Descr for Test 5",
    content: "Content for Test 5",
    author: "author",
    publishedAt: "today",
    urlToImage: "https://via.placeholder.com/150",
  },
];

app.get("/", (req, res) => {
  res.send("Hello Horeca");
});

app.get("/api/posts", (req, res) => {
  res.json(blogs);
});

app.get("/api/posts/:id", (req, res) => {
  const postId = req.params.id * 1;

  const blog = blogs.find((b) => b.id === postId);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
});

app.post("/api/posts", (req, res) => {
  const { title, description, content, author, publishedAt, urlToImage } =
    req.body;

  if (
    !title ||
    !content ||
    !description ||
    !author ||
    !publishedAt ||
    !urlToImage
  ) {
    return res
      .status(400)
      .json({ error: "Title, content, and image are required" });
  }
  const newBlog = {
    id: blogs.length + 1,
    title,
    content,
    description,
    author,
    publishedAt,
    urlToImage,
  };
  blogs.push(newBlog);
  res.status(201).json(newBlog);
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
