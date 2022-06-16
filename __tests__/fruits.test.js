const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('fruit routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/fruits should return a list of fruits', async () => {
    const resp = await request(app).get('/fruits');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Mango',
        origin: 'India',
        benefits: 'Consumption of Mangos can lead to lower blood pressure, a regular pulse and a stable digestive system',
      },
      {
        id: '2',
        name: 'Banana',
        origin: 'Oceania',
        benefits: 'Consumption of bananas can lead to weight loss, digestive health support, improve blood sugar levels and improve heart health',
      },
      {
        id: '3',
        name: 'Watermelon',
        origin: 'Northeastern Africa',
        benefits: 'Consumption of watermelon can lead to hydration, improved heart health, reduced inflammation and reduced oxidative stress',
      },
      {
        id: '4',
        name: 'Apple',
        origin: 'Kazakhstan',
        benefits: 'Consumption of apples can lead to a lower risk of chronic conditions, such as, diabetes, heart disease and cancer',
      },  
    ]);
  });
  it.skip('/fruits/:id should return a fruit detail', async () => {
    const resp = await request(app).get('/fruits/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Mango',
      origin: 'India',
      benefits: 'Consumption of Mangos can lead to lower blood pressure, a regular pulse and a stable digestive system',
    });
  });
  

  afterAll(() => {
    pool.end();
  });
});
