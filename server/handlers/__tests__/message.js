import request from 'supertest';
import app from '../../server';

import { MESSAGES, ERROR_MESSAGE } from '../message';

describe('message API', () => {
  it('return correct message for odd index', async () => {
    const response = await request(app).get('/message/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(MESSAGES[1].title);
  });

  it('return correct message for even index', async () => {
    const response = await request(app).get('/message/2');
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(MESSAGES[0].title);
  });

  it('return correct message for index 0', async () => {
    const response = await request(app).get('/message/0');
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(MESSAGES[0].title);
  });

  it('return error message if the param is not number', async () => {
    const response = await request(app).get('/message/k');
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(ERROR_MESSAGE);
  });
});
