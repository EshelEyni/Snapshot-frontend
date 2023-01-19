import { faX, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Story } from 'src/app/models/story.model';

@Component({
  selector: 'hightlights-story-picker',
  templateUrl: './hightlights-story-picker.component.html',
  styleUrls: ['./hightlights-story-picker.component.scss'],
  outputs: ['close', 'goBack', 'storySelected']
})
export class HightlightsStoryPickerComponent implements OnInit {

  constructor() { }

  storySelected = new EventEmitter<Story>();
  close = new EventEmitter();
  goBack = new EventEmitter();
  story!: Story | null;
  faX = faX;
  faChevronLeft = faChevronLeft;
  ngOnInit(): void {
  }

  onStorySelected() {
    if(!this.story) return;
    this.storySelected.emit(this.story);
  }

  onStoryChecked(story: Story | null) {
    this.story = story;
  }

  onCloseModal() {
    this.close.emit();
  }

  onGoBack() {
    this.goBack.emit();
  }

}
