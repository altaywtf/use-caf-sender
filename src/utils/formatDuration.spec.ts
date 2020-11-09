import formatDuration from './formatDuration';

describe('utils/formatDuration', () => {
  it('works', () => {
    const cases = [
      {
        input: 0,
        output: '00:00',
      },
      {
        input: 599,
        output: '09:59',
      },
      {
        input: 702,
        output: '11:42',
      },
      {
        input: 3600,
        output: '1:00:00',
      },
      {
        input: 14532,
        output: '4:02:12',
      },
    ];

    cases.forEach(c => expect(formatDuration(c.input)).toEqual(c.output));
  });

  it('handles weird inputs', () => {
    expect(formatDuration(104.188)).toEqual('01:44');
  });
});
