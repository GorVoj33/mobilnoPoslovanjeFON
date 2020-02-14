import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VehicleEditPage } from './vehicle-edit.page';

describe('VehicleEditPage', () => {
  let component: VehicleEditPage;
  let fixture: ComponentFixture<VehicleEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
