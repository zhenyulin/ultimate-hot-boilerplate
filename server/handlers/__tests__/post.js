import request from 'supertest';
import { Types } from 'mongoose';

import app from 'server/server';
import Post from 'server/models/post';

const POSTS = [
  {
    _id: Types.ObjectId('4edd40c86762e0fb12000003'),
    title: 'Post 1',
    body:
      'Magna nulla dolore ut esse laborum dolor aute deserunt commodo non minim ad anim in occaecat nostrud anim consectetur cillum qui in labore labore dolor dolor mollit cillum minim reprehenderit quis labore sed anim.',
    comments: [],
  },
  {
    _id: Types.ObjectId('4edd40c86762e0fb12000004'),
    title: 'Post 2',
    body:
      'Id ut qui elit commodo aute occaecat irure ut officia nulla magna officia consectetur exercitation aliqua qui mollit do fugiat duis duis labore amet duis incididunt adipisicing esse esse ea aliquip commodo minim nisi consequat minim veniam in veniam ut quis deserunt do do sunt in aliquip irure qui reprehenderit aliquip aliquip occaecat magna voluptate consequat aute velit ex ex mollit consequat laboris enim velit nostrud incididunt elit veniam incididunt non commodo nulla sed incididunt exercitation laboris aute est nulla nisi commodo cupidatat deserunt occaecat id sunt consequat reprehenderit dolor ut aute mollit non tempor in do ut excepteur ea sit consequat occaecat consectetur deserunt eiusmod cupidatat nulla pariatur id mollit aute deserunt in et amet laboris laborum do laborum laboris sed sed proident qui dolore in do mollit aliqua exercitation sint reprehenderit exercitation excepteur in ex culpa nostrud sint quis do duis aliquip officia officia excepteur veniam fugiat enim nulla in exercitation deserunt ad aliquip in id commodo fugiat elit sed veniam magna in irure laborum laboris mollit nulla eiusmod duis do proident cupidatat consequat proident aute elit quis qui ullamco in ut qui ea amet ex amet laboris consequat sint amet exercitation dolor elit cillum irure dolor consequat cupidatat nostrud adipisicing sint ea nostrud qui tempor ex incididunt amet sint proident in labore commodo laboris occaecat non pariatur elit laborum dolor quis consequat qui quis dolor voluptate aliquip nulla quis ad culpa id sunt ullamco ea amet ullamco eu nisi cupidatat dolore qui consectetur nulla amet pariatur.',
  },
];

describe('message API', () => {
  beforeEach(async () => {
    await Post.remove();
    await Post.create(POSTS);
  });

  it('return correct posts when query all', async () => {
    const query = `{
      posts { title, body }
    }`;
    const response = await request(app)
      .post('/post')
      .send({ query });
    expect(response.statusCode).toBe(200);
    expect(POSTS).toMatchObject(response.body.data.posts);
  });

  it('return correct posts when query with _id', async () => {
    const query = `{
      posts(_id: "4edd40c86762e0fb12000003") { title, body }
    }`;
    const response = await request(app)
      .post('/post')
      .send({ query });
    expect(response.statusCode).toBe(200);
    expect(POSTS[0]).toMatchObject(response.body.data.posts[0]);
    expect(response.body.data.posts).toHaveLength(1);
  });

  it('return correct posts after create a new post', async () => {
    const query = `mutation {
      createPost(title: "Post 3", body: "Content of Post 3") { _id, title, body }
    }`;
    const response = await request(app)
      .post('/post')
      .send({ query });
    expect(response.statusCode).toBe(200);
    expect(response.body.data.createPost).toMatchObject({
      title: 'Post 3',
      body: 'Content of Post 3',
    });
    const newQuery = `{ posts { title, body } }`;
    const newResponse = await request(app)
      .post('/post')
      .send({ query: newQuery });
    expect(newResponse.body.data.posts).toHaveLength(3);
  });

  it('return correct post after update an existing post', async () => {
    const query = `mutation {
      updatePost(_id: "4edd40c86762e0fb12000003", input: {title: "Lord of Rings", body: "The storm shall begin."}) { _id, title, body }
    }`;
    const response = await request(app)
      .post('/post')
      .send({ query });
    expect(response.statusCode).toBe(200);
    expect(response.body.data.updatePost).toMatchObject({
      _id: '4edd40c86762e0fb12000003',
      title: 'Lord of Rings',
      body: 'The storm shall begin.',
    });
  });

  it('return error message if the _id of post to be updated not found', async () => {
    const query = `mutation {
      updatePost(_id: "4edd40c86762e0fb1200000k", input: {title: "Lord of Rings", body: "The storm shall begin."}) { _id, title, body }
    }`;
    const response = await request(app)
      .post('/post')
      .send({ query });
    expect(response.statusCode).toBe(200);
    expect(response.body.errors).toBeDefined();
  });

  it('remove post by deletePost query', async () => {
    const query = `mutation {
      deletePost(_id: "4edd40c86762e0fb12000003") { _id, title, body }
    }`;
    const response = await request(app)
      .post('/post')
      .send({ query });
    expect(response.statusCode).toBe(200);
    expect(response.body.data.deletePost).toMatchObject({
      _id: '4edd40c86762e0fb12000003',
      title: POSTS[0].title,
      body: POSTS[0].body,
    });
    const newQuery = `{ posts { title, body } }`;
    const newResponse = await request(app)
      .post('/post')
      .send({ query: newQuery });
    expect(newResponse.body.data.posts).toHaveLength(1);
  });

  it('return error message if the _id of post to be deleted not found', async () => {
    const query = `mutation {
      deletePost(_id: "4edd40c86762e0fb1200000k") { _id, title, body }
    }`;
    const response = await request(app)
      .post('/post')
      .send({ query });
    expect(response.statusCode).toBe(200);
    expect(response.body.errors).toBeDefined();
  });

  it('add comment to post by addComment mutation', async () => {
    const query = `mutation {
      addComment(
        _id: "4edd40c86762e0fb12000003",
        input: {
          content: "Delightful",
          author: {
            name: "Lewis Kahn",
            email: "lewis@kahn.com"
          }
        }
      ) {
        _id,
        title,
        body,
        comments {
          content,
          author {
            _id,
            name,
            email,
          }
        }
      }
    }`;
    const response = await request(app)
      .post('/post')
      .send({ query });
    expect(response.statusCode).toBe(200);
    expect(response.body.data.addComment).toMatchObject({
      _id: '4edd40c86762e0fb12000003',
      title: POSTS[0].title,
      body: POSTS[0].body,
      comments: [
        {
          content: 'Delightful',
          author: {
            name: 'Lewis Kahn',
            email: 'lewis@kahn.com',
          },
        },
      ],
    });
  });

  it('return error message if the _id of post to add comment to not found', async () => {
    const query = `mutation {
      addComment(
        _id: "4edd40c86762e0fb1200000k",
        input: {
          content: "Delightful",
          author: {
            name: "Lewis Kahn",
            email: "lewis@kahn.com"
          }
        }
      ) {
        _id,
        title,
        body,
        comments {
          content,
          author {
            _id,
            name,
            email,
          }
        }
      }
    }`;
    const response = await request(app)
      .post('/post')
      .send({ query });
    expect(response.statusCode).toBe(200);
    expect(response.body.errors).toBeDefined();
  });

  it('searches for existing author by email when adding new comment', async () => {
    const query = `mutation {
      addComment(
        _id: "4edd40c86762e0fb12000003",
        input: {
          content: "Fantastic",
          author: {
            name: "Lewis Armstrong",
            email: "lewis@armstrong.com"
          }
        }
      ) {
        _id,
        title,
        body,
        comments {
          content,
          author {
            _id,
            name,
            email,
          }
        }
      }
    }`;
    const response = await request(app)
      .post('/post')
      .send({ query });
    expect(response.statusCode).toBe(200);
    expect(response.body.data.addComment).toMatchObject({
      _id: '4edd40c86762e0fb12000003',
      title: POSTS[0].title,
      body: POSTS[0].body,
      comments: [
        {
          content: 'Fantastic',
          author: {
            name: 'Lewis Armstrong',
            email: 'lewis@armstrong.com',
          },
        },
      ],
    });
    const secondQuery = `mutation {
      addComment(
        _id: "4edd40c86762e0fb12000003",
        input: {
          content: "Amazing",
          author: {
            name: "Lewis Armstrong",
            email: "lewis@armstrong.com"
          }
        }
      ) {
        _id,
        title,
        body,
        comments {
          content,
          author {
            _id,
            name,
            email,
          }
        }
      }
    }`;
    const secondResponse = await request(app)
      .post('/post')
      .send({ query: secondQuery });
    expect(secondResponse.statusCode).toBe(200);
    expect(secondResponse.body.data.addComment).toMatchObject({
      _id: '4edd40c86762e0fb12000003',
      title: POSTS[0].title,
      body: POSTS[0].body,
      comments: [
        {
          content: 'Fantastic',
          author: {
            name: 'Lewis Armstrong',
            email: 'lewis@armstrong.com',
          },
        },
        {
          content: 'Amazing',
          author: {
            name: 'Lewis Armstrong',
            email: 'lewis@armstrong.com',
          },
        },
      ],
    });
    const { comments } = secondResponse.body.data.addComment;
    expect(comments[0].author._id).toEqual(comments[1].author._id);
  });
});
