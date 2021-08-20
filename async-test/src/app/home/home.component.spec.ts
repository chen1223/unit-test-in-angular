import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Post, PostService } from '../services/post.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { HttpClient } from '@angular/common/http';
import { componentFactoryName } from '@angular/compiler';

class MockPostService {
  getAuthor(): string {
    return 'Tom';
  }
  getAllPosts(): Observable<Array<Post>> {
    return of([]);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let postService: PostService;
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: PostService, useClass: MockPostService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  // #region HTML related tests
  it('should have a h1 element as page-title and displays Latest Posts', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('h1.page-title'));

    // Assert
    expect(el).toBeTruthy();
    expect(el.nativeElement.innerText).toEqual('Latest Posts');
  });
  it('should have a section element with class post-section below the page-title element', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.page-title + section.post-section'));

    // Assert
    expect(el).toBeTruthy();
  });
  it('should have a ul element with class post-list', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.post-section ul.post-list'));

    // Assert
    expect(el).toBeTruthy();
  });
  it('should have correct number of li element with class post on the HTML', () => {
    // Arrange
    const dummyList = [];
    for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
      dummyList.push({
        id: i,
        title: Math.floor(Math.random() * 3).toString(),
        body: Math.floor(Math.random() * 3).toString(),
        userName: Math.floor(Math.random() * 3).toString()
      });
    }
    component.posts = dummyList;
    fixture.detectChanges();
    const els = fixture.debugElement.queryAll(By.css('.post-list li.post'));

    // Assert
    expect(els.length).toEqual(dummyList.length);
    dummyList.forEach((post, index) => {
      const el = els[index];
      // Title
      const titleEl = el.query(By.css('h3.post__title'));
      expect(titleEl.nativeElement.innerText).toEqual(post.title);

      // Post body
      const bodyEl = el.query(By.css('div.post__body div.post__detail p.post__preview'));
      expect(bodyEl.nativeElement.innerText).toEqual(post.body);

      // Read more link
      const moreEl = el.query(By.css('div.post__body div.post__detail a.more-link'));
      expect(moreEl.nativeElement.innerText).toEqual('read more');
      expect(moreEl.nativeElement.getAttribute('href')).toEqual(`/post/${post.id}`);

      // Author
      const authorEl = el.query(By.css('div.post__body span.author'));
      expect(authorEl.nativeElement.innerText).toEqual(`- ${post.userName}`);
    });
  });
  // #endregion

  // #region neOnInit related tests
  it('should call getAllPosts in ngOnInit', () => {
    // Arrange
    const fnc = spyOn(component, 'getAllPosts').and.callFake(() => {});

    // Act
    component.ngOnInit();

    // Assert
    expect(fnc).toHaveBeenCalled();
  });
  // #end region

  // #region getAllPosts related tests
  it('should call getAllPosts of PostService when getAllPosts is called', () => {
    // Arrange
    const fnc = spyOn(postService, 'getAllPosts').and.callThrough();

    // Act
    component.getAllPosts();

    // Assert
    expect(fnc).toHaveBeenCalled();
  });
  it('should call getAuthor for each return posts when getAllPosts is called', fakeAsync(() => {
    // Arrange
    const fnc = spyOn(postService, 'getAuthor').and.callThrough();
    const dummyRecord = [
      {
        id: 1,
        title: 'Hello World',
        body: 'Hello World Agagin',
        userId: 1
      },
      {
        id: 2,
        title: 'Hello World',
        body: 'Hello World Agagin',
        userId: 2
      },
      {
        id: 3,
        title: 'Hello World',
        body: 'Hello World Agagin',
        userId: 3
      }
    ];
    spyOn(postService, 'getAllPosts').and.callFake(() => of(dummyRecord));

    // Act
    component.getAllPosts();

    // Assert
    expect(fnc).toHaveBeenCalledTimes(dummyRecord.length);
  }));
  it('should set userName in each post when getAllPosts is called', fakeAsync(() => {
    // Arrange
    const dummyAuthor = 'Tom';
    spyOn(postService, 'getAuthor').and.returnValue(dummyAuthor);
    const dummyRecord = [
      {
        id: 1,
        title: 'Hello World',
        body: 'Hello World Agagin',
        userId: 1
      },
      {
        id: 2,
        title: 'Hello World',
        body: 'Hello World Agagin',
        userId: 2
      },
      {
        id: 3,
        title: 'Hello World',
        body: 'Hello World Agagin',
        userId: 3
      }
    ];
    spyOn(postService, 'getAllPosts').and.callFake(() => of(dummyRecord));

    // Act
    component.getAllPosts();
    fixture.detectChanges();

    // Assert
    component.posts.forEach(post => {
      expect(post.userName).toEqual(dummyAuthor);
    });
  }));
  it('should save api data to posts when getAllPosts is called and API returns', fakeAsync(() => {
    // Arrange
    spyOn(postService, 'getAuthor').and.returnValue('Tom');
    const dummyRecord = [
      {
        id: 1,
        title: 'Hello World',
        body: 'Hello World Agagin',
        userId: 1
      },
      {
        id: 2,
        title: 'Hello World',
        body: 'Hello World Agagin',
        userId: 2
      }
    ];
    spyOn(postService, 'getAllPosts').and.callFake(() => of(dummyRecord));
    component.posts = [];
    fixture.detectChanges();

    // Act
    component.getAllPosts();
    fixture.detectChanges();

    // Assert
    const expectedRecord = dummyRecord.map(post => {
      post['userName'] = 'Tom';
      return post;
    });
    expect(component.posts).toEqual(expectedRecord);
  }));
  it('should log error when getAllPosts is called and API returns error', fakeAsync(() => {
    // Arrange
    spyOn(postService, 'getAuthor').and.returnValue('Tom');
    const dummyUrl = '123';
    spyOn(postService, 'getAllPosts').and.callFake(() => http.get<Array<Post>>(dummyUrl));
    const fnc = spyOn(console, 'error').and.callThrough();

    // Act
    component.getAllPosts();
    const req = httpMock.expectOne(dummyUrl);
    req.flush([], { status: 400, statusText: 'Error'} );

    // Assert
    expect(fnc).toHaveBeenCalled();
  }));
  // #endregion
});
