import { Request, Response } from 'express';
import sinon from 'sinon';

interface MockResponse extends Response {
  render: sinon.SinonSpy;
}

export default () => {
  const req = {
    params: {},
    query: {},
  };
  const res = {
    render: sinon.spy(),
  };

  return {
    req: req as Request,
    res: res as MockResponse,
    next: sinon.spy(),
  };
};
