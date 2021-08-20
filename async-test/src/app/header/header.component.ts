import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  homeIcon = faHome;

  constructor(private router: Router) { }

  newPost(): void {
    this.router.navigateByUrl('new-post');
  }

  onNewPostPage(): boolean {
    return this.router.url.indexOf('new-post') > -1;
  }
}
