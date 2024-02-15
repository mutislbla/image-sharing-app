const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const cloudinary = require("./lib/cloudinary");

function authenticateTokenMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = user.userId;
  next();
}

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    optionsSuccessStatus: 200,
  })
);

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
});

// register
app.post("/register", async (req, res) => {
  const { full_name, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const { password: passwordDB, ...user } = await prisma.user.create({
      data: {
        full_name,
        username,
        email,
        avatar:
          "https://res.cloudinary.com/dtwpfnenl/image/upload/v1707741239/2b8fc431267c674892e92ed596d17161_hxt3qk.jpg",
        bio: "",
        password: hashedPassword,
      },
    });
    res.json({ user });
  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid credentials" });
  }
});

//edit profile
app.put(
  "/user",
  authenticateTokenMiddleware,
  upload.single("avatar"),
  async (req, res) => {
    const { bio } = req.body;
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error uploading avatar" });
      }
      try {
        const user = await prisma.user.update({
          where: { id: req.userId },
          data: {
            avatar: result.secure_url,
            bio,
          },
        });
        res.json({ user });
      } catch (err) {
        console.log("Error updating user", err);
        res.status(400).json({ message: " update user failed" });
      }
    });
  }
);

// get user by token
app.get("/profil/user", authenticateTokenMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        username: true,
        full_name: true,
        avatar: true,
        bio: true,
      },
    });
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
});

//get post by token
app.get("/profil/post", authenticateTokenMiddleware, async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { user_id: req.userId },
    orderBy: {
      id: "desc",
    },
  });
  res.json({ posts });
});

// get user by id
app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        username: true,
        full_name: true,
        avatar: true,
        bio: true,
      },
    });
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// get recent post by user id
app.get("/post/:userId", async (req, res) => {
  const { userId } = req.params;
  const posts = await prisma.post.findMany({
    where: { user_id: Number(userId) },
    orderBy: {
      id: "desc",
    },
  });
  res.json({ posts });
});

// get all post
app.get("/post", async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
  });
  res.json({ posts });
});

// create post
app.post(
  "/post",
  authenticateTokenMiddleware,
  upload.single("image"),
  async (req, res) => {
    const { caption } = req.body;
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error uploading image" });
      }
      try {
        const post = await prisma.post.create({
          data: {
            user_id: req.userId,
            image: result.secure_url,
            caption,
          },
        });
        res.json({ post });
      } catch (err) {
        console.log("Error creating post", err);
        res.status(400).json({ message: "Post creation failed" });
      }
    });
  }
);

// edit a post
app.put("/post/:id", authenticateTokenMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { caption } = req.body;
    const posts = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        caption,
      },
    });
    res.json({ posts });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// delete a book
app.delete("/post/:id", authenticateTokenMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "deleted", posts });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// get post by search
app.get("/post/search/:word", async (req, res) => {
  const { word } = req.params;
  const posts = await prisma.post.findMany({
    where: {
      caption: {
        contains: word,
        mode: "insensitive",
      },
    },
  });
  res.json({ posts });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
