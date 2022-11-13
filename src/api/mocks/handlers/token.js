import { mock } from 'api/mocks/handlers/_mockData';
import { rest } from 'msw';

export const tokenHandlers = [
  rest.post('/api/token/refresh', (__, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        access: mock.token,
      })
    )
  ),
];
