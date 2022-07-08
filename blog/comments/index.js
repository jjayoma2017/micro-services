const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const axios = require('axios');

const commentsByPostId = {};
app.use(bodyParser.json());
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const comments = commentsByPostId[req.params.id] || [];
  const { content } = req.body;
  comments.push({ id, content });
  commentsByPostId[req.params.id] = comments;
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id,
      content,
      postId: req.params.id,
    },
  });
  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log('Comments. Listening on port 4001');
});
