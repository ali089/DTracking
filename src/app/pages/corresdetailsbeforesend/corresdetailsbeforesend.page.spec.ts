import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CorresdetailsbeforesendPage } from './corresdetailsbeforesend.page';

describe('CorresdetailsbeforesendPage', () => {
  let component: CorresdetailsbeforesendPage;
  let fixture: ComponentFixture<CorresdetailsbeforesendPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CorresdetailsbeforesendPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CorresdetailsbeforesendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
