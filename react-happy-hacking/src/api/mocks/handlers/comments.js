import { rest } from 'msw';

export const commentsHandlers = [
  rest.get('/api/comments/:id', (__, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        writer: 'galaxy4276',
        content: '요청하신 api 말아드립니다.',
      })
    )
  ),
  rest.post('/api/comments/:id', (__, res, ctx) => res(ctx.status(201))),
  rest.patch('/api/comments/:id', (__, res, ctx) => res(ctx.status(201))),
  rest.delete('/api/comments/:id', (__, res, ctx) => res(ctx.status(201))),
];
