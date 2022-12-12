import { Story } from './../../models/story.model';
import { StoryService } from './../../services/story.service';
import { UserService } from 'src/app/services/user.service';
import { MiniUser } from './../../models/user.model';
import { Component, OnInit, inject } from '@angular/core';
import { Location } from 'src/app/models/post.model';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.scss'],
  inputs: ['user', 'location', 'type', 'isLinkToStoryEdit']
})
export class UserPreviewComponent implements OnInit {

  constructor() { }
  userService = inject(UserService);
  storyService = inject(StoryService);
  user!: MiniUser;
  location!: Location;
  story!: Story;
  isWatched: boolean = false;
  type!: string;
  urlForImg: string = '';
  urlForTitle: string = '';
  urlForLocation: string = '';
  title = '';
  isLinkToStoryEdit!: boolean;

  async ngOnInit() {
    if (this.type !== 'story-edit') {
      const user = await lastValueFrom(this.userService.getById(this.user.id));
      if (user.currStoryId) {
        const story = await lastValueFrom(this.storyService.getById(user.currStoryId));
        this.isWatched = story.watchedBy.some(watchedUser => watchedUser.id === this.user.id);
        this.story = story;
      }
    }
    this.title = this.setTitle();
    this.setUrls();
  }

  setTitle() {
    const loggedinUser = this.userService.getLoggedinUser();
    if (loggedinUser && loggedinUser.id === this.user.id && this.type === 'home-page-list'
      || this.type === 'story-edit-page'  || this.type === 'link-to-story-edit') return 'Your story';
    else return this.user.username;
  }

  setUrls() {
    switch (this.type) {
      case 'home-page-list':
        this.urlForImg = `/story/${this.story.id}`;
        this.urlForTitle = `/story/${this.story.id}`;
        break;
      case 'post-preview':
        this.urlForImg = this.story ? `/story/${this.story.id}` : `/profile/${this.user.id}`;
        this.urlForTitle = `/profile/${this.user.id}`;
        this.urlForLocation = `/profile/${this.user.id}`;
        break;
      case 'curr-story':
        this.urlForImg = `/profile/${this.user.id}`;
        this.urlForTitle = `/profile/${this.user.id}`;
        break;
      case 'link-to-story-edit':
        this.urlForImg = `/story-edit/`;
        this.urlForTitle = `/story-edit/`;
        this.isLinkToStoryEdit = true;
        break;
      case 'story-edit-page':
        this.isLinkToStoryEdit = true;
        break;
      default:
        this.urlForImg = `/`;
        this.urlForTitle = `/`;
        this.urlForLocation = `/`;
        break;
    }
  }

  setWatchedStory() {
    if (this.isWatched || !this.story) return;
    this.story.watchedBy.push(this.user);
    this.storyService.save(this.story);
    this.isWatched = true;
  }
}
