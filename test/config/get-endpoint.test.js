import { getServerUrlByMode } from '../../src/api/helper';

describe('환경에 따른 API ENDPOINT 변경 테스트', () => {
  let REACT_APP_MODE;

  it('개발 환경이 development 일 때, localhost:8080 url domain 을 얻는다.', () => {
    REACT_APP_MODE = 'development';
    const domain = getServerUrlByMode(REACT_APP_MODE);
    expect(domain).toBe('http://localhost:8080');
  });

  it('개발 환경이 test 일 때, http://3.35.123.154:8080 url domain 을 얻는다.', () => {
    REACT_APP_MODE = 'test';
    const domain = getServerUrlByMode(REACT_APP_MODE);
    expect(domain).toBe('http://3.35.123.154:8080');
  });
});
