import { ComponentFixture, TestBed } from '@angular/core/testing';
//les tests sont essentiel dans le développement en méthode agile car code voué à évoluer
import { DashboardComponent } from './dashboard.component';
// import de Dashboard car il va être testé

describe('DashboardComponent', () => { // describe pour décréer le test en cours
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
