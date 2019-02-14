/**
 * we import "SecondsToTimePipe", which we are going to test
 */
import { SecondsToTimePipe } from "./seconds-to-time.pipe";
/**
 * we start using Jasmine syntax
 * First, we wrap the test in a "describe" function that identifies the test.
 * The first parameter of this function is a user-friendly description of the test; in this case, it is SecondsToTimePipe.
 * For the second parameter, we pass a lambda (fat arrow) function that will contain our test.
 *
 *
 */
describe("SecondsToTimePipe", () => {
  it("should convert integer to time format", () => {
    // setting up a local variable to hold the pipe
    const pipe = new SecondsToTimePipe();
    /*
      beforeEach(function() {
        expect(pipe.transform(5)).toEqual("00:00:05");
        expect(pipe.transform(65)).toEqual("00:01:05");
        expect(pipe.transform(3610)).toEqual("01:00:10");
      });
    */
    expect(pipe.transform(5)).toEqual("00:00:05");
    expect(pipe.transform(65)).toEqual("00:01:05");
    expect(pipe.transform(3610)).toEqual("01:00:10");
  });
});
