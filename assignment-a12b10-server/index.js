const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s8hxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // User Collection
    const usersCollection = client.db("engageBoardDB").collection("users");
    const postsCollection = client.db("engageBoardDB").collection("posts");
    const tagsCollection = client.db("engageBoardDB").collection("tags");
    const commentsCollection = client
      .db("engageBoardDB")
      .collection("comments");
    const announcementCollection = client
      .db("engageBoardDB")
      .collection("announcements");

    // jwt related api
    //ToDo: will unComment this section
    // app.post("/jwt", async (req, res) => {
    //   const user = req.body;
    //   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    //     expiresIn: "1h",
    //   });
    //   res.send({ token });
    // });

    // middlewares
    //ToDo: will unComment this section
    // const verifyToken = (req, res, next) => {
    //   console.log("inside verify token", req.headers.authorization);
    //   if (!req.headers.authorization) {
    //     return res.status(401).send({ message: "unauthorized access" });
    //   }
    //   const token = req.headers.authorization.split(" ")[1];
    //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //     if (err) {
    //       return res.status(401).send({ message: "unauthorized access" });
    //     }
    //     req.decoded = decoded;
    //     next();
    //   });
    // };

    //ToDo: will unComment this section
    // use verify admin after verifyToken
    // const verifyAdmin = async (req, res, next) => {
    //   const email = req.decoded.email;
    //   const query = { email: email };
    //   const user = await usersCollection.findOne(query);
    //   const isAdmin = user?.role === "admin";
    //   if (!isAdmin) {
    //     return res.status(403).send({ message: "forbidden access" });
    //   }
    //   next();
    // };

    // users related api Start from here

    // Register a user to EngageBoardDB ToDo: uncomment
    app.patch(
      "/users/admin/:id",

      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            role: "admin",
          },
        };
        const result = await usersCollection.updateOne(filter, updatedDoc);
        res.send(result);
      }
    );

    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({ admin });
    });

    // upvote
    app.patch("/upvote/:id", async (req, res) => {
      const body = req.body;
      const id = req.params.id;
      const quiry = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: body,
      };
      const result = await postsCollection.updateOne(quiry, updatedDoc);
      res.send(result);
    });

    // downvote
    app.patch("/downvote/:id", async (req, res) => {
      const body = req.body;
      const id = req.params.id;
      console.log(body, id);
      const quiry = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: body,
      };
      const result = await postsCollection.updateOne(quiry, updatedDoc);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.get('/userscount', async(req,res)=>{
      const count = await usersCollection.countDocuments()
      res.send({count})
    })

    // users related api End from here

    // post tags api
    app.get("/tags", async (req, res) => {
      const result = await tagsCollection.find().toArray();
      res.send(result);
    });

    // add post related start from here
    app.get("/posts", async (req, res) => {
      const result = await postsCollection.find().toArray();
      res.send(result);
    });

    app.get(`/post/id`, async (req, res) => {
      const id = req.params.id;
      // console.log(id, "req from clint");
      const query = { _id: new ObjectId(id) };
      const result = await postsCollection.findOne(query);
      // console.log(result);
      res.send(result);
    });
    app.get(`/post/:id`, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await postsCollection.findOne(query);
      res.send(result);
    });

    app.post("/addpost", async (req, res) => {
      const newPost = req.body;
      const result = await postsCollection.insertOne(newPost);
      res.send(result);
    });

    // User Post collection

    app.get("/myposts", async (req, res) => {
      const email = req.query.email;
      const query = { authorEmail: email };
      const result = await postsCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/myposts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await postsCollection.deleteOne(query);
      res.send(result);
    });

    // add announcement related end from here
    app.post("/announcement", async (req, res) => {
      const newAnnouncement = req.body;
      const result = await announcementCollection.insertOne(newAnnouncement);
      res.send(result);
    });

    app.get("/announcement", async (req, res) => {
      const result = await announcementCollection.find().toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("boss is sitting");
});

app.listen(port, () => {
  console.log(`Assignment 12 server is running on port ${port}`);
});
