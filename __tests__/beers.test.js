const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('beers routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/beers should return a list of beers', async () => {
    const resp = await request(app).get('/beers');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        type: 'Stout',
        color: 'Dark Brown',
        abv: '4%-13% alcohol',
      },
      {
        id: '2',
        type: 'Lager',
        color: 'Gold',
        abv: '5% alcohol',
      },
      {
        id: '3',
        type: 'Porter',
        color: 'Dark Brown',
        abv: '5%-13% alcohol',
      },
      {
        id: '4',
        type: 'IPA',
        color: 'Amber and cloudy',
        abv: '4.5%-7% alcohol',
      },
    ]);
  });
  it('/beers/:id should return a beer detail', async () => {
    const resp = await request(app).get('/beers/2');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '2',
      type: 'Lager',
      color: 'Gold',
      abv: '5% alcohol',
    });
  });
  it('POST /beers should create a new beer', async () => {
    const resp = await request(app).post('/beers').send({
      type: 'Wheat beer',
      color: 'Yellow and gold',
      abv: '5% alcohol',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.type).toEqual('Wheat beer');
    expect(resp.body.color).toEqual('Yellow and gold');
    expect(resp.body.abv).toEqual('5% alcohol');
    expect(resp.body.id).not.toBeUndefined();
  });
  it('PUT /beers/:id should update beers', async () => {
    const resp = await request(app).put('/beers/2').send({ type: 'Pilsner' });
    expect(resp.status).toEqual(200);
    expect(resp.body.type).toEqual('Pilsner');
  });
  it('DELETE /beers/:id should delete a beer', async () => {
    const resp = await request(app).delete('/beers/1');
    expect(resp.status).toBe(200);
    const { body } = await request(app).get('/beers/1');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
