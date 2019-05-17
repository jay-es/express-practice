import { Request, Response } from 'express';
import sinon from 'sinon';

interface MockResponse extends Response {
  redirect: sinon.SinonSpy;
  render: sinon.SinonSpy;
}

export default () => {
  const req = {
    params: {},
    query: {},
  };
  const res = {
    redirect: sinon.spy(),
    render: sinon.spy(),
  };

  return {
    req: req as Request,
    res: res as MockResponse,
    next: sinon.spy(),
  };
};
