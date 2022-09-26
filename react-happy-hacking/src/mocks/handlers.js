import { rest } from 'msw';

const mockImageUrl = 'https://picsum.photos/seed/picsum/200/300';
const mockToken = 'ey%419929aksjdmnxcvlaeoqwiehwqprqsdlasmdlqwskdfjsadklfnwnfawfn';
const mockFollowUserInfo = {
  profileUrl: mockImageUrl,
  username: 'galaxy4276',
};

const mockFeedData = {
  images: [mockImageUrl, mockImageUrl, mockImageUrl],
  writer: 'galaxy4276',
  content: '오늘 하루도 고생하셨습니다.',
  hashtags: ['#응기', '#응기잇', '#흥기엣'],
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
};

export const handlers = [
  rest.get('/api/user', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        username: 'pandora4276',
        allPostCount: 5,
        followerCount: 6,
        followingCount: 12,
        allLikeCount: 368,
      }),
    ),
  ),
  rest.patch('/api/user', (__, res, ctx) =>
    res(ctx.status(201)),
  ),
  rest.patch('/api/user/register', (__, res, ctx) =>
    res(
        ctx.status(201),
        ctx.json({
          message: '회원가입에 성공하였습니다.',
          data: {
            user: 'galaxy4276@gmail.com',
            refresh: mockToken,
            access: mockToken,
          },
        }),
      ),
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
          refresh: mockToken,
          access: mockToken,
        },
      }),
    ),
  ),
  rest.get('/api/user/logout', (__, res, ctx) =>
    res(ctx.status(200)),
  ),
  rest.get('/api/user/following', (__, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([Array(10).fill(0).map(() => mockFollowUserInfo)]),
    ),
  ),
  rest.get('/api/user/follower', (__, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([Array(10).fill(0).map(() => mockFollowUserInfo)]),
    ),
  ),
  rest.get('/api/user/follow', (req, res, ctx) =>
    res(ctx.status(201)),
  ),
  rest.post('/api/posts', (__, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([mockFeedData, mockFeedData, mockFeedData])
    ),
  ),
  rest.post('/api/post', (__, res, ctx) => res(ctx.status(201))),
  rest.get('/api/post/:id', (__, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        images: [mockImageUrl, mockImageUrl, mockImageUrl],
        writer: 'galaxy4276',
        content: '오늘 하루도 고생하셨습니다.',
        hashtags: ['#응기', '#응기잇', '#흥기엣'],
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
      }),
    ),
  ),
  rest.patch('/api/post', (__, res, ctx) => res(ctx.status(201))),
  rest.delete('/api/post', (__, res, ctx) => res(ctx.status(201))),
  rest.get('/api/comments/:id', (__, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        writer: 'galaxy4276',
        content: '요청하신 api 말아드립니다.',
      }),
    ),
  ),
  rest.post('/api/comments/:id', (__, res, ctx) => res(ctx.status(201))),
  rest.patch('/api/comments/:id', (__, res, ctx) => res(ctx.status(201))),
  rest.delete('/api/comments/:id', (__, res, ctx) => res(ctx.status(201))),
  rest.post('/api/posts/search', (__, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([mockFeedData, mockFeedData, mockFeedData]),
    ),
  ),
];
