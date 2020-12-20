//Super test for mocking the request
const supertest = require('supertest');

const server = require('../server');
const url = 'http://localhost:8000/api';
const req = supertest(url);

const post_url = '/records';

describe('getting the api end point ', () => {
  test('get the get request message', async () => {
    const response = await req.get(post_url);
    expect(response.status).toEqual(201);
  });
});

describe('Post Endpoint Request with wrong Date Format', () => {
  it('Should response  with a status code 400 when start date is not valid ', async () => {
    const wrongYearIncludedReq = {
      startDate: '20162-01-26', //Wrong year format
      endDate: '2018-02-02',
      minCount: 20,
      maxCount: 21,
    };
    const {body, res} = await req.post(post_url).send(wrongYearIncludedReq);

    expect(res.statusCode).toEqual(400);
    expect(body.code).toEqual(1);
    expect(body.message).toEqual('Error');
    expect(body.error).toEqual('VALIDATION FAILED');
    expect(body.detail).toEqual('Date Format is wrong.Format is : YYYY-MM-DD');
  });
  it('Should response  with a status code 400 when  end date is not valid ', async () => {
    const wrongYearIncludedReq = {
      startDate: '2016-01-26', //Wrong year format
      endDate: '201822-0222-02',
      minCount: 20,
      maxCount: 21,
    };
    const {body, res} = await req.post(post_url).send(wrongYearIncludedReq);

    expect(res.statusCode).toEqual(400);
    expect(body.code).toEqual(1);
    expect(body.message).toEqual('Error');
    expect(body.error).toEqual('VALIDATION FAILED');
    expect(body.detail).toEqual('Date Format is wrong.Format is : YYYY-MM-DD');
  });

  it('Should response  with a status code 400 with wrong date format message when month is not  2 digit ', async () => {
    const wrongDateIncludedReq = {
      startDate: '2016-222-26', //Wrong Month format
      endDate: '2018-02-02',
      minCount: 20,
      maxCount: 21,
    };
    const {body, res} = await req.post(post_url).send(wrongDateIncludedReq);

    expect(res.statusCode).toEqual(400);
    expect(body.code).toEqual(1);
    expect(body.message).toEqual('Error');
    expect(body.error).toEqual('VALIDATION FAILED');
    expect(body.detail).toEqual('Date Format is wrong.Format is : YYYY-MM-DD');
  });

  it('Should response  with a status code 400 with a month that dont 31 days  ', async () => {
    const wrongDateIncludedReq = {
      startDate: '2016-12-26',
      endDate: '2020-06-31', //Wrong Month format(2020/06 is 30 days)
      minCount: 20,
      maxCount: 21,
    };
    const {body, res} = await req.post(post_url).send(wrongDateIncludedReq);

    expect(res.statusCode).toEqual(400);
    expect(body.code).toEqual(1);
    expect(body.message).toEqual('Error');
    expect(body.error).toEqual('VALIDATION FAILED');
    expect(body.detail).toEqual('Date Format is wrong.Format is : YYYY-MM-DD');
  });

  it('Should response  with a status code 400 with a day that greater than 31 ', async () => {
    const wrongDateIncludedReq = {
      startDate: '2016-12-26',
      endDate: '2020-06-32', //Wrong Month format(2020/06 is 30 days)
      minCount: 20,
      maxCount: 21,
    };
    const {body, res} = await req.post(post_url).send(wrongDateIncludedReq);

    expect(res.statusCode).toEqual(400);
    expect(body.code).toEqual(1);
    expect(body.message).toEqual('Error');
    expect(body.error).toEqual('VALIDATION FAILED');
    expect(body.detail).toEqual('Date Format is wrong.Format is : YYYY-MM-DD');
  });

  it('Should response  with a status code 400 with empty form areas ', async () => {
    const WithEmptyAreaReq = {
      startDate: '2016-12-23',
      endDate: '2018-02-02',
      //minCount is required
      maxCount: 21,
    };
    const {body, res} = await req.post(post_url).send(WithEmptyAreaReq);

    expect(res.statusCode).toEqual(400);
    expect(body.code).toEqual(1);
    expect(body.message).toEqual('Error');
    expect(body.error).toEqual('VALIDATION FAILED');
    expect(body.detail).toEqual('Please fill all the areas of form');
  });

  it('Should response  with a status code 400 when minCount is not valid', async () => {
    const BadFormatteCount = {
      startDate: '2016-12-23',
      endDate: '2018-02-02',
      minCount: '20',
      maxCount: 21,
    };
    const {body, res} = await req.post(post_url).send(BadFormatteCount);

    expect(res.statusCode).toEqual(400);
    expect(body.code).toEqual(1);
    expect(body.message).toEqual('Error');
    expect(body.error).toEqual('VALIDATION FAILED');
    expect(body.detail).toEqual('minCount must be integer');
  });

  it('Should response  with a status code 400 when maxCount is not valid', async () => {
    const BadFormatteCount = {
      startDate: '2016-12-23',
      endDate: '2018-02-02',
      minCount: 20,
      maxCount: '21',
    };
    const {body, res} = await req.post(post_url).send(BadFormatteCount);

    expect(res.statusCode).toEqual(400);
    expect(body.code).toEqual(1);
    expect(body.message).toEqual('Error');
    expect(body.error).toEqual('VALIDATION FAILED');
    expect(body.detail).toEqual('maxCount must be integer');
  });
});
