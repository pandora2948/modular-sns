export const mock = {
  imageUrl: 'https://picsum.photos/seed/picsum/200/300',
  token: 'ey%419929aksjdmnxcvlaeoqwiehwqprqsdlasmdlqwskdfjsadklfnwnfawfn',

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
  },
};
