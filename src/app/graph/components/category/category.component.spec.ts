import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SharedModule } from '../../../shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CategoryService } from '../../services/category/category.service';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CatDeleteConfirmComponent } from './cat-delete-confirm/cat-delete-confirm.component';
import { GetCategoriesResponse } from '../../model/Category';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let categoryService: CategoryService;
  let dialog: MatDialog;
  let mockCategories$: BehaviorSubject<GetCategoriesResponse>;

  beforeEach(async () => {
    // Create a mock observable for the categoriesData$
    mockCategories$ = new BehaviorSubject<GetCategoriesResponse>({
      paginateList: [{ id: 1, name: 'Category 1', totalNumber: 5 }],
      pageIndex: 0,
      totalCount: 1,
    });

    await TestBed.configureTestingModule({
      declarations: [CategoryComponent, CatDeleteConfirmComponent], // Include the dialog component
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: CategoryService,
          useValue: {
            categoriesData$: mockCategories$.asObservable(),
            notification$: of({ status: true, message: 'Test message' }),
            getCategories: jasmine
              .createSpy('getCategories')
              .and.callFake(() => {
                mockCategories$.next({
                  paginateList: [{ id: 1, name: 'Category 1', totalNumber: 5 }],
                  pageIndex: 0,
                  totalCount: 1,
                });
                return of(); // Correctly return an observable
              }),
            createCategory: jasmine
              .createSpy('createCategory')
              .and.returnValue(of({})),
            updateCategory: jasmine
              .createSpy('updateCategory')
              .and.returnValue(of({})),
            deleteCategory: jasmine
              .createSpy('deleteCategory')
              .and.returnValue(of({})),
          },
        },
        {
          provide: MatDialog,
          useValue: {
            open: jasmine.createSpy('open').and.returnValue({
              afterClosed: () => of(true), // Simulate user confirming the deletion
              componentInstance: {
                deleteUser: jasmine.createSpy('deleteUser').and.callFake(() => {
                  // Here we simulate what happens in the deleteUser method of the component.
                  categoryService.deleteCategory(1).subscribe();
                }),
              },
            }),
          },
        },
      ],
      imports: [
        SharedModule,
        MatPaginatorModule,
        MatIconModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    dialog = TestBed.inject(MatDialog);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', () => {
    expect(categoryService.getCategories).toHaveBeenCalled();
    expect(component.categoriesData.length).toBe(1);
    expect(component.categoriesData[0].name).toBe('Category 1');
  });

  it('should show add form when addCategory is called', () => {
    component.addCategory();
    fixture.detectChanges();
    expect(component.isAdding).toBeTrue();

    const addButton = fixture.debugElement.query(By.css('.add-user'));
    expect(addButton).toBeNull(); // Add button should be hidden

    const formField = fixture.debugElement.query(By.css('.form-field'));
    expect(formField).not.toBeNull(); // Add form should be visible
  });

  it('should call createCategory when saveNewCategory is called', () => {
    component.isAdding = true;
    component.nameValue = 'New Category';
    component.saveNewCategory();
    expect(categoryService.createCategory).toHaveBeenCalledWith('New Category');
    expect(component.isAdding).toBeFalse(); // Should reset after saving
  });

  it('should show edit form when editCategory is called', () => {
    component.editCategory({ id: 1, name: 'Category 1', totalNumber: 5 });
    fixture.detectChanges();
    expect(component.editingId).toBe(1);

    const editField = fixture.debugElement.query(By.css('.edit-field'));
    expect(editField).not.toBeNull(); // Edit form should be visible
  });

  it('should call updateCategory when saveEditCategory is called', () => {
    const category = { id: 1, name: 'Updated Category', totalNumber: 5 };

    component.editingId = 1; // Set editing mode
    component.saveEditCategory(category); // Call the method

    fixture.detectChanges(); // Ensure changes are picked up by Angular

    expect(categoryService.updateCategory).toHaveBeenCalledWith(
      category.id,
      category.name,
    ); // Check service method call
    expect(component.editingId).toBe(-1); // Ensure editingId is reset after saving
  });

  it('should call deleteCategory when deleteCategory is called', () => {
    const category = { id: 1, name: 'Category 1', totalNumber: 5 };

    component.deleteCategory(category); // Trigger the method
    fixture.detectChanges(); // Apply any changes after calling the method

    // Simulate the deletion confirmation in the dialog
    const dialogRef = dialog.open(CatDeleteConfirmComponent, {
      data: { category, pageSize: 10, pageIndex: 0 },
    });
    dialogRef.componentInstance.deleteUser();

    expect(dialog.open).toHaveBeenCalled(); // Ensure the dialog was opened
    expect(categoryService.deleteCategory).toHaveBeenCalledWith(1); // Ensure the service method is called with the correct id
  });

  it('should paginate categories', () => {
    const paginator = fixture.debugElement.query(By.css('mat-paginator'));
    paginator.triggerEventHandler('page', { pageIndex: 1, pageSize: 10 });
    expect(categoryService.getCategories).toHaveBeenCalledWith(10, 1);
  });
});
