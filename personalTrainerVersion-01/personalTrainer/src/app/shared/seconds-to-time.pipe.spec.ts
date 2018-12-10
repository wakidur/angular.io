import { SecondsToTimePipe } from '../workout-runner/shared/seconds-to-time.pipe';

describe('SecondsToTimePipe', () => {
  it('create an instance', () => {
    const pipe = new SecondsToTimePipe();
    expect(pipe).toBeTruthy();
  });
});
