import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { CategoryData } from '../../model/Category';
import { CatDeleteConfirmComponent } from './cat-delete-confirm/cat-delete-confirm.component';
import { CategoryService } from '../../services/category/category.service';
import { UserManageNotificationComponent } from '../../../user/components/dashboard/manage-users/user-manage-notification/user-manage-notification.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  categoriesData: CategoryData[] = [
    {
      id: 1,
      name: 'Category 1',
      count: 1,
    },
    {
      id: 2,
      name: 'Category 2',
      count: 2,
    },
    {
      id: 3,
      name: 'Category 3',
      count: 1,
    },
    {
      id: 4,
      name: 'Category 4',
      count: 1,
    },
    {
      id: 5,
      name: 'Category 5',
      count: 1,
    },
    {
      id: 6,
      name: 'Category 6',
      count: 1,
    },
    {
      id: 7,
      name: 'Category 7',
      count: 1,
    },
    {
      id: 8,
      name: 'Category 8',
      count: 1,
    },
    {
      id: 9,
      name: 'Category 9',
      count: 1,
    },
    {
      id: 10,
      name: 'Category 10',
      count: 14,
    },
  ];
  displayedColumns: string[] = ['id', 'name', 'count', 'edit/delete'];

  length!: number;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;

  nameValue = '';
  isAdding = false;
  editingId = -1;

  constructor(
    private readonly dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.categoryService.notification$.subscribe(
      (data: { status: boolean; message: string }) => {
        this._snackBar.openFromComponent(CatDeleteConfirmComponent, {
          data: data.message,
          panelClass: data.status
            ? ['notification-class-success']
            : ['notification-class-danger'],
          duration: 2000,
        });

        if (data.status) {
          this.dialog.closeAll();
        }
      },
    ); // this.adminService.categorysData$.subscribe((res: GetCategoryResponse) => {
    //   this.categorysData = res.categorys;
    //   this.length = res.count;
    //   this.pageIndex = res.thisPage;
    // });
    //
    // this.adminService.notification$.subscribe((data) => {
    //   this._snackBar.openFromComponent(CategoryManageNotificationComponent, {
    //     data: data.message,
    //     panelClass: data.status
    //       ? ['notification-class-success']
    //       : ['notification-class-danger'],
    //     duration: 2000,
    //   });
    //
    //   if (data.status) {
    //     this.dialog.closeAll();
    //   }
    // });
    //
    // this.adminService.getCategorys(this.pageSize, this.pageIndex);
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.length = e.length;
    // this.adminService.getCategorys(e.pageSize, e.pageIndex);
  }

  addCategory() {
    this.isAdding = true;
    // this.dialog.open(AddCategoryComponent, {
    //   width: '105rem',
    //   data: {
    //     pagSize: this.pageSize,
    //     pageIndex: this.pageIndex,
    //   },
    // });
  }

  editCategory(categoryData: CategoryData) {
    this.editingId = categoryData.id;
  }

  deleteCategory(categoryData: CategoryData) {
    this.dialog.open(CatDeleteConfirmComponent, {
      width: '22rem',
      data: categoryData,
    });
  }

  saveNewCategory() {
    this.categoryService.createCategory({ name: this.nameValue }).subscribe({
      next: () => {
        this.isAdding = false;
        this.nameValue = '';
        this._snackBar.openFromComponent(UserManageNotificationComponent, {
          data: 'Category created successfully.',
          panelClass: ['notification-class-success'],
          duration: 2000,
        });
      },
      error: (error) => {
        this._snackBar.openFromComponent(UserManageNotificationComponent, {
          data: error.error.message,
          panelClass: ['notification-class-danger'],
          duration: 2000,
        });
      },
    });
  }

  cancelNewCategory() {
    this.isAdding = false;
    this.nameValue = '';
  }

  cancelEditCategory() {
    this.editingId = -1;
  }

  saveEditCategory(categoryData: CategoryData) {
    console.log(categoryData);
  }
}
