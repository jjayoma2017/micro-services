const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const posts = {};
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors());

const handleEvents = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
};
app.get('/posts', (req, res) => {
  try {
    res.send(posts);
  } catch (error) {
    console.log(error.message);
  }
});

app.post('/events', (req, res) => {
  try {
    const { type, data } = req.body;

    handleEvents(type, data);
    console.log(posts);
    res.send({});
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(4002, async () => {
  console.log('Query. Listening on port 4002.');
  try {
    const res = await axios.get('http://event-bus-srv:4005/events');

    for (let event of res.data) {
      console.log('Processing event:', event.type);
      handleEvents(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
