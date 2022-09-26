import { mock } from 'api/mocks/handlers/_mockData';
import { rest } from 'msw';

export const userHandlers = [
  rest.get('/api/user', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        username: 'pandora4276',
        allPostCount: 5,
        followerCount: 6,
        followingCount: 12,
        allLikeCount: 368,
      })
    )
  ),
  rest.patch('/api/user', (__, res, ctx) => res(ctx.status(201))),
  rest.patch('/api/user/register', (__, res, ctx) =>
    res(
      ctx.status(201),
      ctx.json({
        message: '회원가입에 성공하였습니다.',
        data: {
          user: 'galaxy4276@gmail.com',
          refresh: mock.token,
          access: mock.token,
        },
      })
    )
  ),
  rest.post('/api/user/login', (__, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: '',
        data: {
          user: {
            username: 'pandora',
            email: 'pandora@pan.dora',
          },
          refresh: mock.token,
          access: mock.token,
        },
      })
    )
  ),
  rest.get('/api/user/logout', (__, res, ctx) => res(ctx.status(200))),
  rest.get('/api/user/following', (__, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        Array(10)
          .fill(0)
          .map(() => mock.followUserInfo),
      ])
    )
  ),
  rest.get('/api/user/follower', (__, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        Array(10)
          .fill(0)
          .map(() => mock.followUserInfo),
      ])
    )
  ),
  rest.get('/api/user/follow', (req, res, ctx) => res(ctx.status(201))),
];
