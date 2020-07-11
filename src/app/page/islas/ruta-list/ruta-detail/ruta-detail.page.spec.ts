import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RutaDetailPage } from './ruta-detail.page';

describe('RutaDetailPage', () => {
  let component: RutaDetailPage;
  let fixture: ComponentFixture<RutaDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RutaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
