import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReviewCreatePage } from './review-create.page';

describe('ReviewCreatePage', () => {
  let component: ReviewCreatePage;
  let fixture: ComponentFixture<ReviewCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
