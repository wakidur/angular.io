import { ElementRef } from "@angular/core";

import { WorkoutAudioDirective } from './workout-audio.directive';

describe('WorkoutAudioDirective', () => {
  const elementRef = new ElementRef(null);
  it('should create an instance', () => {
    const directive = new WorkoutAudioDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
