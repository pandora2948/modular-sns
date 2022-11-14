import { commentsHandlers } from 'api/mocks/handlers/comments';
import { postHandlers } from 'api/mocks/handlers/post';
import { postsHandlers } from 'api/mocks/handlers/posts';
import { tokenHandlers } from 'api/mocks/handlers/token';
import { userHandlers } from 'api/mocks/handlers/user';
import { setupWorker } from 'msw';

const handlers = [...tokenHandlers, ...userHandlers, ...postHandlers, ...postsHandlers, ...commentsHandlers];

export const worker = setupWorker(...handlers);
