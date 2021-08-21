import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { componentFactoryName } from '@angular/compiler';
import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Observable, of } from 'rxjs';
import { Post, PostService } from '../services/post.service';

import { SinglePostComponent } from './single-post.component';

class MockPostService {
  getAuthor(): string {
    return 'Tom';
  }
  getSinglePost(): Observable<Post> {
    return of({
      id: 1,
      userId: 1,
      title: '123',
      body: '123'
    });
  }
  deletePost(): Observable<void> {
    return of(null);
  }
}

describe('SinglePostComponent', () => {
  let component: SinglePostComponent;
  let fixture: ComponentFixture<SinglePostComponent>;
  let activatedRoute: ActivatedRoute;
  let postService: PostService;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePostComponent ],
      imports: [
        FontAwesomeModule,
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
    fixture = TestBed.createComponent(SinglePostComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    postService = TestBed.inject(PostService);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // HTML related tests
  it('should have a h1 element with class page-title on the HTML', () => {
    // Arrange
    const dummyPost = {
      id: 1,
      userId: 1,
      title: '123',
      body: '123',
      userName: 'Tom'
    };
    component.post = dummyPost;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('h1.page-title'));

    // Assert
    expect(el).toBeTruthy();
    expect(el.nativeElement.innerText).toEqual(dummyPost.title);
  });
  it('should have a div element with class meta-row below the page-title element', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.page-title + div.meta-row'));

    // Assert
    expect(el).toBeTruthy();
  });
  it('should have a span element with class author in the meta-row element', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.meta-row span.author'));

    // Assert
    expect(el).toBeTruthy();
  });
  it('should have an icon for the user avatar', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.meta-row .author fa-icon')).componentInstance as FaIconComponent;

    // Assert
    expect(el.icon).toEqual(component.userIcon);
  });
  it('should display author name on the name element', () => {
    // Arrange
    const dummyPost = {
      id: 1,
      userId: 1,
      title: '123',
      body: '123',
      userName: 'Tom'
    };
    component.post = dummyPost;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.meta-row .author span.name'));

    // Assert
    expect(el.nativeElement.innerText).toEqual(dummyPost.userName);
  });
  it('should have a div element with class action-btns below the author element', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.author + div.action-btns'));

    // Assert
    expect(el).toBeTruthy();
  });
  it('should have an edit button inside the action-btns element', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.action-btns button.action-btn.--edit'));
    const pencilIcon = el.query(By.css('fa-icon')).componentInstance as FaIconComponent;

    // Assert
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('type')).toEqual('button');
    expect(el.nativeElement.getAttribute('role')).toEqual('button');
    expect(el.nativeElement.getAttribute('aria-label')).toEqual('edit');
    expect(pencilIcon.icon).toEqual(component.pencilIcon);
  });
  it('should have a delete button inside the action-btns element', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.action-btns button.action-btn.--delete'));
    const deleteIcon = el.query(By.css('fa-icon')).componentInstance as FaIconComponent;

    // Assert
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('type')).toEqual('button');
    expect(el.nativeElement.getAttribute('role')).toEqual('button');
    expect(el.nativeElement.getAttribute('aria-label')).toEqual('delete');
    expect(deleteIcon.icon).toEqual(component.deleteIcon);
  });
  it('should have a section element with class post-detail below the meta-row element', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.meta-row + section.post-detail'));

    // Assert
    expect(el).toBeTruthy();
  });
  it('should have a paragraph element with class post to display the post body', () => {
    // Arrange
    const dummyPost = {
      id: 1,
      userId: 1,
      title: '123',
      body: '123',
      userName: 'Tom'
    };
    component.post = dummyPost;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.post-detail p.post'));

    // Assert
    expect(el.nativeElement.innerText).toEqual(dummyPost.body);
  });
  // #endregion

  // #region ngOnInit related tests
  it('should call getPostID when ngOnInit is called', () => {
    // Arrange
    const fnc = spyOn(component, 'getPostID');

    // Act
    component.ngOnInit();

    // Assert
    expect(fnc).toHaveBeenCalled();
  });
  // #endregion

  // #region getPostID related tests
  it('should get id from url and save it to postId', () => {
    // Arrange
    const dummyId = '123';
    component.postId = null;
    spyOnProperty(activatedRoute, 'paramMap').and.returnValue(of({
      get: () => dummyId
    }));
    spyOn(component, 'getPostDetail').and.callFake(() => {});
    fixture.detectChanges();

    // Act
    component.getPostID();

    // Assert
    expect(component.postId).toEqual(dummyId);
  });
  it('should call getPostDetail when getPostID is called', () => {
    // Arrange
    const dummyId = '123';
    spyOnProperty(activatedRoute, 'paramMap').and.returnValue(of({
      get: () => dummyId
    }));
    const fnc = spyOn(component, 'getPostDetail').and.callFake(() => {});

    // Act
    component.getPostID();
    fixture.detectChanges();

    // Assert
    expect(fnc).toHaveBeenCalled();
  });
  // #endregion

  // #region getPostDetail related tests
  it('should call getSinglePost from PostService when getPostDetail is called', () => {
    // Arrange
    const dummyId = '1';
    component.postId = dummyId;
    fixture.detectChanges();
    const fnc = spyOn(postService, 'getSinglePost').and.callThrough();

    // Act
    component.getPostDetail();

    // Assert
    expect(fnc).toHaveBeenCalledWith(dummyId);
  });
  it('should set userName for the post record returned by getSinglePost when getPostDetail is called', fakeAsync(() => {
    // Arrange
    const dummyId = '1';
    const dummyData = {
      id: 1,
      userId: 1,
      title: '123',
      body: 'hello world'
    };
    const dummyName = 'Tim';
    spyOn(postService, 'getSinglePost').and.returnValue(of(dummyData));
    component.postId = dummyId;
    spyOn(postService, 'getAuthor').and.returnValue(dummyName);
    fixture.detectChanges();

    // Act
    component.getPostDetail();
    tick();
    flush();
    fixture.detectChanges();

    // Assert
    dummyData['userName'] = dummyName;
    expect(component.post).toEqual(dummyData);
  }));
  it('should log error when getPostDetail is called but API returns error', fakeAsync(() => {
    // Arrange
    const dummyUrl = '123';
    spyOn(postService, 'getSinglePost').and.callFake(() => http.get<Post>(dummyUrl));
    const fnc = spyOn(console, 'error');

    // Act
    component.getPostDetail();
    const req = httpMock.expectOne(dummyUrl);
    req.flush(null, { status: 400, statusText: 'Error' });

    // Assert
    expect(fnc).toHaveBeenCalled();
  }));
  // #endregion

  // #region editPost related tests
  it('should show confirm message when editPost is called', () => {
    // Arrange
    const fnc = spyOn(window, 'confirm');

    // Act
    component.editPost();

    // Assert
    expect(fnc).toHaveBeenCalledWith('Are you sure you want to edit this post?');
  });
  it('should not navigate to update page when editPost is called but user disagrees', () => {
    // Arrange
    const fnc = spyOn(router, 'navigateByUrl');
    spyOn(window, 'confirm').and.returnValue(false);

    // Act
    component.editPost();

    // Assert
    expect(fnc).not.toHaveBeenCalled();
  });
  it('should navigate to the update page when editPost is called and user agree to edit', () => {
    // Arrange
    const fnc = spyOn(router, 'navigateByUrl');
    const dummyId = '1';
    component.postId = dummyId;
    fixture.detectChanges();
    spyOn(window, 'confirm').and.returnValue(true);

    // Act
    component.editPost();

    // Assert
    expect(fnc).toHaveBeenCalledWith(`/post/${dummyId}/update`);
  });
  // #endregion

  // #region deletePost related tests
  it('should show confirm message when deletePost is called', () => {
    // Arrange
    const fnc = spyOn(window, 'confirm');

    // Act
    component.deletePost();

    // Assert
    expect(fnc).toHaveBeenCalledWith('Are you sure you want to delete this post?');
  });
  it('should not call the deletePost method from PostService when deletePost is called but user disagrees', () => {
    // Arrange
    const fnc = spyOn(postService, 'deletePost');
    spyOn(window, 'confirm').and.returnValue(false);

    // Act
    component.deletePost();

    // Assert
    expect(fnc).not.toHaveBeenCalled();
  });
  it('should call deletePost from PostService when deletePost is called and user agree to delete', () => {
    // Arrange
    const fnc = spyOn(postService, 'deletePost').and.callThrough();
    spyOn(window, 'confirm').and.returnValue(true);
    const dummyId = '1';
    component.postId = dummyId;
    fixture.detectChanges();

    // Act
    component.deletePost();

    // Assert
    expect(fnc).toHaveBeenCalledWith(dummyId);
  });
  it('should show alert message when deletePost is called and API returns', fakeAsync(() => {
    // Arrange
    spyOn(window, 'confirm').and.returnValue(true);
    const dummyId = '1';
    component.postId = dummyId;
    fixture.detectChanges();
    const fnc = spyOn(window, 'alert');

    // Act
    component.deletePost();
    tick();
    flush();

    // Assert
    expect(fnc).toHaveBeenCalledWith('Post deleted successfully!');
  }));
  it('should navigate back to the home page when deletePost is called and API returns', fakeAsync(() => {
    // Arrange
    spyOn(window, 'confirm').and.returnValue(true);
    const dummyId = '1';
    component.postId = dummyId;
    fixture.detectChanges();
    const fnc = spyOn(router, 'navigateByUrl');

    // Act
    component.deletePost();
    expect(fnc).toHaveBeenCalled();
  }));
  it('should show error message when deletePost is called and API returns error', fakeAsync(() => {
    // Arrange
    const dummyUrl = '123';
    const dummyId = '1';
    component.postId = dummyId;
    fixture.detectChanges();
    spyOn(postService, 'deletePost').and.callFake(() => http.delete<void>(dummyUrl));
    const fnc = spyOn(console, 'error').and.callThrough();
    spyOn(window, 'confirm').and.returnValue(true);

    // Act
    component.deletePost();
    const req = httpMock.expectOne(dummyUrl);
    const status = 400;
    const statusText = 'Deletion Failed';
    const errBody = { postId: dummyId };
    req.flush(errBody, { status, statusText });

    // Assert
    expect(fnc).toHaveBeenCalledWith('Post deletion error! Status:', status, ' Status text:', statusText, 'Body:', errBody);
  }));
  // #endregion

});
