import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PostService, AUTHOR_LIST } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  beforeEach(() => {
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // #region getAuthor related tests
  it('should return author name from the AUTHOR_LIST when getAuthor is called', () => {
    // Arrange
    const dummyId = 1;
    const expectedAuthor = AUTHOR_LIST.find(author => author.id === dummyId);

    // Act
    const result = service.getAuthor(dummyId);

    // Arrange
    expect(result).toEqual(expectedAuthor.name);
  });
  // #endregion

  // #region getAllPosts related tests
  it('should make a get request to /posts when getAllPosts is called', () => {
    // Act
    service.getAllPosts().subscribe(() => {});

    // Assert
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toEqual('GET');
  });
  // #endregion

  // #region getSinglePost related tests
  it('should make a get request to /posts/:id when getAllPosts is called', () => {
    // Arrange
    const dummyId = '1';

    // Act
    service.getSinglePost(dummyId).subscribe(() => {});

    // Assert
    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts/${dummyId}`);
    expect(req.request.method).toEqual('GET');
  });
  // #endregion

  // #region createPost related tests
  it('should make a post request to /posts when createPost is called', () => {
    // Arrange
    const dummyTitle = '123';
    const dummyBody = 'hello world';

    // Act
    service.createPost(dummyTitle, dummyBody).subscribe(() => {});

    // Assert
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ title: dummyTitle, body: dummyBody });
  });
  // #endregion

  // #region updatePost related tests
  it('should make a patch request to /posts/:id when updatePost is called', () => {
    // Arrange
    const dummyId = '1';
    const dummyTitle = '123';
    const dummyBody = 'hello world';

    // Act
    service.updatePost(dummyId, dummyTitle, dummyBody).subscribe(() => {});

    // Assert
    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts/${dummyId}`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual({ title: dummyTitle, body: dummyBody });
  });
  // #endregion

  // #region deltePost related tests
  it('should make a delete request to /posts/:id when deletePost is called', () => {
    // Arrange
    const dummyId = '1';

    // Act
    service.deletePost(dummyId).subscribe(() => {});

    // Assert
    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts/${dummyId}`);
    expect(req.request.method).toEqual('DELETE');
  });
  // #endregion
});
