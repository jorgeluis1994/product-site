import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductActionMenu } from './product-action-menu';

describe('ProductActionMenu', () => {
  let component: ProductActionMenu;
  let fixture: ComponentFixture<ProductActionMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductActionMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductActionMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
