export const mock = {
  imageUrl: 'https://picsum.photos/seed/picsum/200/300',
  token: 'ey%419929aksjdmnxcvlaeoqwiehwqprqsdlasmdlqwskdfjsadklfnwnfawfn',
  hashtags: ['#출근', '#힘내자', '#화이팅'],

  get followUserInfo() {
    return {
      profileUrl: this.imageUrl,
      username: 'galaxy4276',
    };
  },

  get feedData() {
    return {
      images: [this.imageUrl, this.imageUrl, this.imageUrl],
      writer: 'galaxy4276',
      content: '오늘 하루도 고생하셨습니다.',
      hashtags: this.hashtags,
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
  },
};
