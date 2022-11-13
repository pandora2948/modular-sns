import { mock } from 'api/mocks/handlers/_mockData';
import { rest } from 'msw';

export const postHandlers = [
  rest.post('/api/post', (__, res, ctx) => res(ctx.status(201))),
  rest.get('/api/post/:id', (__, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        images: [mock.imageUrl, mock.imageUrl, mock.imageUrl],
        writer: 'galaxy4276',
        content: '오늘 하루도 고생하셨습니다.',
        hashtags: mock.hashtags,
        likeCount: 44,
        comments: [
          {
            writer: 'minesp3164',
            content: '네.',
          },
          {
            writer: 'Antidote',
            content: '고생많으셨습니다.',
          },
        ],
      })
    )
  ),
  rest.patch('/api/post', (__, res, ctx) => res(ctx.status(201))),
  rest.delete('/api/post', (__, res, ctx) => res(ctx.status(201))),
];
