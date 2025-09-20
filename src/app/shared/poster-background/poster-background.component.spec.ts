import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterBackgroundComponent } from './poster-background.component';

describe('PosterBackgroundComponent', () => {
  let component: PosterBackgroundComponent;
  let fixture: ComponentFixture<PosterBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosterBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosterBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
