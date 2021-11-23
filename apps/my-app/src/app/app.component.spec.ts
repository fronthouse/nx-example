import { AppComponent } from './app.component';
import {
  detectChanges,
  qn,
  ComponentFixture,
  elmText,
  configureTestingModule
} from '@fronthouse/testhelp';
import { AppModule } from './app.module';
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  configureTestingModule(AppComponent, AppModule).subscribe(
    (f) => (fixture = f as ComponentFixture<AppComponent>)
  );

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'my-app'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('my-app');
  });

  it('should render title', () => {
    detectChanges();
    expect(elmText(qn('h1'))).toContain('Welcome to My App!');
  });
});
