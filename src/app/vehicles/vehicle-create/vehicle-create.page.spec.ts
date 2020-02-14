import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VehicleCreatePage } from './vehicle-create.page';

describe('VehicleCreatePage', () => {
  let component: VehicleCreatePage;
  let fixture: ComponentFixture<VehicleCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
