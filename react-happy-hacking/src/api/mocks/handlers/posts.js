import { mock } from 'api/mocks/handlers/_mockData';
import { rest } from 'msw';

export const postsHandlers = [
  rest.post('/api/posts', (__, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([mock.feedData, mock.feedData, mock.feedData])
    )
  ),
  rest.post('/api/posts/search', (__, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([mock.feedData, mock.feedData, mock.feedData])
    )
  ),
];
