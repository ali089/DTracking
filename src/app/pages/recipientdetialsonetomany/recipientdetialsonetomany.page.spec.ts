import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecipientdetialsonetomanyPage } from './recipientdetialsonetomany.page';

describe('RecipientdetialsonetomanyPage', () => {
  let component: RecipientdetialsonetomanyPage;
  let fixture: ComponentFixture<RecipientdetialsonetomanyPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipientdetialsonetomanyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipientdetialsonetomanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
