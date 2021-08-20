import { Component } from '@angular/core';
import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-header',
  template: ''
})
class MockHeaderComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockHeaderComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  })

  // #region HTML related tests
  it('should have app-header on the HTML', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('app-header'));

    // Assert
    expect(el).toBeTruthy();
  });
  it('should have a div element with class page-layout', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('div.page-layout'));

    // Assert
    expect(el).toBeTruthy();
  });
  it('should place the router outlet element inside the page-layout', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('.page-layout router-outlet'));

    // Assert
    expect(el).toBeTruthy();
  });
  // #endregion
});
