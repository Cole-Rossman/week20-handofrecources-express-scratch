const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('fish routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/fish should return a list of fish', async () => {
    const resp = await request(app).get('/fish');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Salmon',
        origin: 'Pacific Northwest',
        lifespan: '2-7 years',
      },
      {
        id: '2',
        name: 'Rainbow Trout',
        origin: 'North America',
        lifespan: '7 years',
      },
      {
        id: '3',
        name: 'Sturgeon',
        origin: 'North America',
        lifespan: '100 years',
      },
      {
        id: '4',
        name: 'Greenland Shark',
        origin: 'Canadian Arctic',
        lifespan: '250-500 years',
      },
    ]);
  });
  it('/fish/:id should return a fish detail', async () => {
    const resp = await request(app).get('/fish/2');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'Rainbow Trout',
      origin: 'North America',
      lifespan: '7 years',
    });
  });
  it('POST /fish should create a new fish', async () => {
    const resp = await request(app).post('/fish').send({
      name: 'Gator Gar',
      origin: 'American South',
      lifespan: '6-26 years',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Gator Gar');
    expect(resp.body.origin).toEqual('American South');
    expect(resp.body.lifespan).toEqual('6-26 years');
    expect(resp.body.id).not.toBeUndefined();
  });
  it('PUT /fish/:id should update fish', async () => {
    const resp = await request(app).put('/fish/2').send({ name: 'Bass' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Bass');
  });
  it('DELETE /fish/:id should delete a fish', async () => {
    const resp = await request(app).delete('/fish/1');
    expect(resp.status).toBe(200);
    const { body } = await request(app).get('/fish/1');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
