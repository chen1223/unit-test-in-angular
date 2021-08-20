import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FontawesomeObject } from '@fortawesome/fontawesome-svg-core';

import { HeaderComponent } from './header.component';

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [
        FontAwesomeModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  // #region HTML related tests
  it('should have a div element with class header-wrapper', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('div.header-wrapper'));

    // Assert
    expect(el).toBeTruthy();
  });
  it('should have a home-link that routes to the home page', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.header-wrapper > a.home-link'));

    // Assert
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('href')).toEqual('/');
  });
  it('should have a home icon in the home link', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.header-wrapper .home-link fa-icon'));
    const faIcon = el.componentInstance as FaIconComponent;

    // Assert
    expect(el).toBeTruthy();
    expect(faIcon.icon).toEqual(component.homeIcon);
  });
  it('should display home on the home-link', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.header-wrapper .home-link'));

    // Assert
    expect(el.nativeElement.innerHTML).toContain('Home');
  });
  it('should have a new post button if onNewPostPage return false', () => {
    // Arrange
    spyOn(component, 'onNewPostPage').and.returnValue(false);
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.header-wrapper button.new-post'));

    // Assert
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('type')).toEqual('button');
    expect(el.nativeElement.getAttribute('role')).toEqual('button');
    expect(el.nativeElement.innerText).toEqual('New Post');
  });
  it('should not have a new post button if onNewPostPage return true', () => {
    // Arrange
    spyOn(component, 'onNewPostPage').and.returnValue(true);
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.header-wrapper button.new-post'));

    // Assert
    expect(el).toBeFalsy();
  });
  it('should call the newPost function when the new post button is clicked', () => {
    // Arrange
    const fnc = spyOn(component, 'newPost').and.callFake(() => {});
    spyOn(component, 'onNewPostPage').and.returnValue(false);
    const el = fixture.debugElement.query(By.css('.new-post'));

    // Act
    el.triggerEventHandler('click', null);

    // Assert
    expect(fnc).toHaveBeenCalled();
  });
  // #endregion

  // #region newPost related tests
  it('should navigate to the new-post page when newPost is called', () => {
    // const fnc = spyOn()
  });
  // #endregion
});
