import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NeworganizationusersmodalPage } from './neworganizationusersmodal.page';

describe('NeworganizationusersmodalPage', () => {
  let component: NeworganizationusersmodalPage;
  let fixture: ComponentFixture<NeworganizationusersmodalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NeworganizationusersmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NeworganizationusersmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
