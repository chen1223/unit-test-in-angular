import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { componentFactoryName } from '@angular/compiler';
import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick, flush } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable } from 'rxjs';
import { Post, PostService } from '../services/post.service';

import { NewPostComponent } from './new-post.component';

class MockPostService {
  getAuthor(): string {
    return 'Tom';
  }
  getSinglePost(): Observable<Post> {
    return of({
      id: 1,
      title: '123',
      body: '123',
      userId: 1
    });
  }
  createPost(): Observable<Post> {
    return of({
      id: 1,
      title: '123',
      body: '123',
      userId: 1
    });
  }
  updatePost(): Observable<Post> {
    return of({
      id: 1,
      title: '123',
      body: '123',
      userId: 1
    });
  }
}

describe('NewPostComponent', () => {
  let component: NewPostComponent;
  let fixture: ComponentFixture<NewPostComponent>;
  let activatedRoute: ActivatedRoute;
  let postService: PostService;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPostComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: PostService, useClass: MockPostService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    postService = TestBed.inject(PostService);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // #region HTML related tests
  it('should display New Post on the h1 page-title element if current mode is create', () => {
    // Arrange
    component.mode = 'create';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('h1.page-title'));

    // Assert
    expect(el).toBeTruthy();
    expect(el.nativeElement.innerText).toEqual('New Post');
  });
  it('should display Update Post on the h1 page-title element if current mode is update', () => {
    // Arrange
    component.mode = 'update';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('h1.page-title'));

    // Assert
    expect(el).toBeTruthy();
    expect(el.nativeElement.innerText).toEqual('Update Post');
  });

  // Form section
  it('should have a section element with class new-post', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('section.new-post'));

    // Assert
    expect(el).toBeTruthy();
  });
  it('should have a form element inside the new-post section', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.new-post form'));

    // Assert
    expect(el).toBeTruthy();
  });
  // Title
  it('should have a div element for the title field', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('div.ctrl-row.--title'));

    // Assert
    expect(el).toBeTruthy();
  });
  it('should have a label element for the title field', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.--title label.ctrl-title'));

    // Assert
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('for')).toEqual('title');
    expect(el.nativeElement.innerText).toEqual('Title');
  });
  it('should have a input element for the title field', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.--title input.ctrl'));

    // Assert
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('id')).toEqual('title');
    expect(el.nativeElement.getAttribute('type')).toEqual('text');
    expect(el.nativeElement.getAttribute('name')).toEqual('title');
    expect(el.nativeElement.getAttribute('autocomplete')).toEqual('off');
  });
  it('should bind the title input to its FormControl', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.--title .ctrl'));

    // Act
    const dummyVal = 'hello';
    component.postForm.get('title').setValue(dummyVal);
    fixture.detectChanges();

    // Assert
    expect(el.nativeElement.value).toEqual(dummyVal);
  });
  // Post
  it('should have a div element for the post field', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.new-post div.ctrl-row.--post'));

    // Assert
    expect(el).toBeTruthy();
  });
  it('should have a label element with class ctrl-title for the post field', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.new-post .--post label.ctrl-title'));

    // Assert
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('for')).toEqual('post');
    expect(el.nativeElement.innerText).toEqual('Post');
  });
  it('should have a textarea element with class ctrl for the post field', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.new-post .--post textarea.ctrl'));

    // Assert
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('id')).toEqual('post');
    expect(el.nativeElement.getAttribute('name')).toEqual('post');
    expect(el.nativeElement.getAttribute('cols')).toEqual('30');
    expect(el.nativeElement.getAttribute('rows')).toEqual('12');
    expect(el.nativeElement.getAttribute('autocomplete')).toEqual('off');
  });
  it('should bind the post field to its FormControl', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.--post .ctrl'));

    // Act
    const dummyVal = '123';
    component.postForm.get('body').setValue(dummyVal);
    fixture.detectChanges();

    // Assert
    expect(el.nativeElement.value).toEqual(dummyVal);
  });
  // Action row
  it('should have a div element with class action-row', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('div.action-row'));

    // Assert
    expect(el).toBeTruthy();
  });
  it('should have a save button with class action-btn and --save in the action-row', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.action-row button.action-btn.--save'));

    // Assert
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('type')).toEqual('submit');
    expect(el.nativeElement.getAttribute('role')).toEqual('submit');
    expect(el.nativeElement.innerText).toEqual('Save');
  });
  it('should have a cancel button with class action-btn and --cancel in the action-row', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.action-row button.action-btn.--cancel'));

    // Assert
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('type')).toEqual('button');
    expect(el.nativeElement.getAttribute('role')).toEqual('button');
    expect(el.nativeElement.innerText).toEqual('Cancel');
  });
  it('should call the cancel function when the cancel button is clicked', () => {
    // Arrange
    const fnc = spyOn(component, 'cancel').and.callFake(() => {});
    const el = fixture.debugElement.query(By.css('.action-btn.--cancel'));

    // Act
    el.triggerEventHandler('click', null);

    // Assert
    expect(fnc).toHaveBeenCalled();
  });
  it('should call the submitForm method when the form is sumitted', () => {
    // Arrange
    const fnc = spyOn(component, 'submitForm').and.callFake(() => {});
    const el = fixture.debugElement.query(By.css('.action-btn.--save'));

    // Act
    (el.nativeElement as HTMLButtonElement).click();

    expect(fnc).toHaveBeenCalled();
  });
  // #endregion

  // #region Form related tests
  // ID
  it('should have a FormControl for the id field', () => {
    // Arrange & Assert
    expect(component.postForm.get('id')).toBeTruthy();
  });
  // Title
  it('should have a FormControl for the title field', () => {
    // Arrange & Assert
    expect(component.postForm.get('title')).toBeTruthy();
  });
  it('should set the title field as invalid if it is empty', () => {
    // Arrange
    const ctrl = component.postForm.get('title');

    // Act
    ctrl.setValue(null);
    fixture.detectChanges();

    // Assert
    expect(ctrl.invalid).toBeTruthy();
  });
  it('should set the title field as valid if it has value', () => {
    // Arrange
    const ctrl = component.postForm.get('title');

    // Act
    ctrl.setValue('123');
    fixture.detectChanges();

    // Assert
    expect(ctrl.valid).toBeTruthy();
  });
  // Body
  it('should have a FormControl for the body field', () => {
    // Arrange & Assert
    expect(component.postForm.get('body')).toBeTruthy();
  });
  it('should set the body field as invalid if it is empty', () => {
    // Arrange
    const ctrl = component.postForm.get('body');

    // Act
    ctrl.setValue(null);

    // Assert
    expect(ctrl.invalid).toBeTruthy();
  });
  it('should set the body field as valid if it has value', () => {
    // Arrange
    const ctrl = component.postForm.get('body');

    // Act
    ctrl.setValue('123');

    // Assert
    expect(ctrl.valid).toBeTruthy();
  });
  // #endregion

  // #region ngOnInit related tests
  it('should call getPostID in ngOnInit', () => {
    // Arrange
    const fnc = spyOn(component, 'getPostID').and.callFake(() => {});

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
  it('should call getPostDetail and set mode to update when getPostID is called and if there is postId', () => {
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
    expect(component.mode).toEqual('update');
    expect(fnc).toHaveBeenCalled();
  });
  it('should set mode to create when getPostID is called and there is no postID', () => {
    // Arrange
    spyOnProperty(activatedRoute, 'paramMap').and.returnValue(of({
      get: () => null
    }));
    component.mode = 'update';
    fixture.detectChanges();

    // Act
    component.getPostID();
    fixture.detectChanges();

    // Assert
    expect(component.mode).toEqual('create');
  });
  // #endregion

  // #region getPostDetail realted tests
  it('should call getSinglePost from PostService when getPostDetail is called', () => {
    // Arrange
    const fnc = spyOn(postService, 'getSinglePost').and.callThrough();

    // Act
    component.getPostDetail();

    // Assert
    expect(fnc).toHaveBeenCalled();
  });
  it('should set userName for the post data and update form with data returned by getSinglePost', () => {
    // Arrange
    const dummyAuthor = 'Tim';
    const dummyData = {
      id: 1,
      title: '123',
      body: '123',
      userId: 1
    };
    spyOn(postService, 'getAuthor').and.returnValue(dummyAuthor);
    spyOn(postService, 'getSinglePost').and.returnValue(of(dummyData));
    const fnc = spyOn(component.postForm, 'patchValue').and.callFake(() => {});

    // Act
    component.getPostDetail();

    // Assert
    dummyData['userName'] = dummyAuthor;
    expect(fnc).toHaveBeenCalledWith(dummyData);
  });
  it('should log error when getPostDetail is called but API returns error', fakeAsync(() => {
    // Arrange
    const dummyUrl = '123';
    spyOn(postService, 'getSinglePost').and.callFake(() => http.get<Post>(dummyUrl));
    const fnc = spyOn(console, 'error').and.callThrough();

    // Act
    component.getPostDetail();
    const req = httpMock.expectOne(dummyUrl);
    req.flush(null, { status: 400, statusText: 'Error' });

    // Assert
    expect(fnc).toHaveBeenCalled();
  }));
  // #endregion

  // #region submitForm related tests
  it('should not show confirm message when submitForm is called and if form is invalid', () => {
    // Arrange
    const fnc = spyOn(window, 'confirm').and.callThrough();
    component.postForm.get('title').setValue(null);
    fixture.detectChanges();

    // Act
    component.submitForm();

    // Assert
    expect(fnc).not.toHaveBeenCalled();
  });
  it('should show a confirm message when submitForm is called and if postForm is valid', () => {
    // Arrange
    const fnc = spyOn(window, 'confirm');
    component.postForm.patchValue({
      title: '123',
      id: 1,
      body: '123',
      userId: 1
    });
    fixture.detectChanges();

    // Act
    component.submitForm();

    // Assert
    expect(fnc).toHaveBeenCalledWith('Are you sure you want to save the post?');
  });
  it('should call createPost when submitForm is called and if mode is create', () => {
    // Arrange
    const createFnc = spyOn(postService, 'createPost').and.callThrough();
    const updateFnc = spyOn(postService, 'updatePost').and.callThrough();
    component.mode = 'create';
    spyOn(window, 'confirm').and.returnValue(true);
    const dummyTitle = '123';
    const dummyPost = 'hello world';
    component.postForm.patchValue({
      id: 1,
      userId: 1,
      title: dummyTitle,
      body: dummyPost
    });
    fixture.detectChanges();

    // Act
    component.submitForm();

    // Assert
    expect(createFnc).toHaveBeenCalledWith(dummyTitle, dummyPost);
    expect(updateFnc).not.toHaveBeenCalled();
  });
  it('should call updatePost when submitForm is called and if mode is update', () => {
    // Arrange
    const createFnc = spyOn(postService, 'createPost').and.callThrough();
    const updateFnc = spyOn(postService, 'updatePost').and.callThrough();
    component.mode = 'update';
    spyOn(window, 'confirm').and.returnValue(true);
    const dummyTitle = '123';
    const dummyPost = 'hello world';
    const dummyId = '123';
    component.postId = dummyId;
    component.postForm.patchValue({
      id: 1,
      userId: 1,
      title: dummyTitle,
      body: dummyPost
    });
    fixture.detectChanges();

    // Act
    component.submitForm();

    // Assert
    expect(updateFnc).toHaveBeenCalledWith(dummyId, dummyTitle, dummyPost);
    expect(createFnc).not.toHaveBeenCalled();
  });
  it('should show successful message when submitForm is called and createPost API returns', fakeAsync(() => {
    // Arrange
    const fnc = spyOn(window, 'alert');
    spyOn(window, 'confirm').and.returnValue(true);
    component.mode = 'create';
    component.postForm.patchValue({
      title: '123',
      id: 1,
      body: '123',
      userId: 1
    });
    fixture.detectChanges();

    // Act
    component.submitForm();
    tick();
    flush();

    // Assert
    expect(fnc).toHaveBeenCalledWith('Post created successfully!');
  }));
  it('should show successful message when submitForm is called and updatePost API returns', fakeAsync(() => {
    // Arrange
    const fnc = spyOn(window, 'alert');
    spyOn(window, 'confirm').and.returnValue(true);
    component.postId = '1';
    component.mode = 'update';
    component.postForm.patchValue({
      title: '123',
      id: 1,
      body: '123',
      userId: 1
    });
    fixture.detectChanges();

    // Act
    component.submitForm();
    tick();
    flush();

    // Assert
    expect(fnc).toHaveBeenCalledWith('Post updated successfully!');
  }));
  it('should navigate back to home page when submitForm is called and createPost returns', fakeAsync(() => {
    // Arrange
    const fnc = spyOn(router, 'navigateByUrl');
    spyOn(window, 'confirm').and.returnValue(true);
    component.mode = 'create';
    component.postForm.patchValue({
      title: '123',
      id: 1,
      body: '123',
      userId: 1
    });
    fixture.detectChanges();

    // Act
    component.submitForm();
    tick();
    flush();

    // Assert
    expect(fnc).toHaveBeenCalledWith('');
  }));
  it('should navigate back to home page when submitForm is called and updatePost returns', fakeAsync(() => {
    // Arrange
    const fnc = spyOn(router, 'navigateByUrl');
    spyOn(window, 'confirm').and.returnValue(true);
    component.mode = 'update';
    component.postId = 1;
    component.postForm.patchValue({
      title: '123',
      id: 1,
      body: '123',
      userId: 1
    });
    fixture.detectChanges();

    // Act
    component.submitForm();
    tick();
    flush();

    // Assert
    expect(fnc).toHaveBeenCalledWith('');
  }));
  it('should log error when submitForm is called and createPost API returns error', fakeAsync(() => {
    // Arrange
    const fnc = spyOn(console, 'error');
    const dummyUrl = '123';
    spyOn(postService, 'createPost').and.callFake(() => http.post<Post>(dummyUrl, {}));
    spyOn(window, 'confirm').and.returnValue(true);
    component.mode = 'create';
    component.postForm.patchValue({
      title: '123',
      id: 1,
      body: '123',
      userId: 1
    });
    fixture.detectChanges();

    // Act
    component.submitForm();
    const req = httpMock.expectOne(dummyUrl);
    req.flush(null, { status: 400, statusText: 'Error' });

    // Assert
    expect(fnc).toHaveBeenCalled();
  }));
  it('should log error when submitForm is called and updatePost API returns error', fakeAsync(() => {
    // Arrange
    const fnc = spyOn(console, 'error');
    const dummyUrl = '123';
    spyOn(postService, 'updatePost').and.callFake(() => http.patch<Post>(dummyUrl, {}));
    spyOn(window, 'confirm').and.returnValue(true);
    component.mode = 'update';
    component.postId = 1;
    component.postForm.patchValue({
      title: '123',
      id: 1,
      body: '123',
      userId: 1
    });
    fixture.detectChanges();

    // Act
    component.submitForm();
    const req = httpMock.expectOne(dummyUrl);
    req.flush(null, { status: 400, statusText: 'Error' });

    // Assert
    expect(fnc).toHaveBeenCalled();
  }));
  // #endregion

  // #region cancel related tests
  it('should return to home page when cancel is called and current mode is create', () => {
    // Arrange
    component.mode = 'create';
    const fnc = spyOn(router, 'navigateByUrl');
    fixture.detectChanges();

    // Act
    component.cancel();

    // Assert
    expect(fnc).toHaveBeenCalledWith('');
  });
  it('should return to single post page when cancel is called and current mode is update', () => {
    // Arrange
    const dummyId = 1;
    component.mode = 'update';
    component.postId = dummyId;
    const fnc = spyOn(router, 'navigateByUrl');
    fixture.detectChanges();

    // Act
    component.cancel();

    // Assert
    expect(fnc).toHaveBeenCalledWith(`/post/${dummyId}`);
  });
  // #endregion

});
