import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { CategoryData } from '../../model/Category';

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
    },
    {
      id: 2,
      name: 'Category 2',
    },
    {
      id: 3,
      name: 'Category 3',
    },
    {
      id: 4,
      name: 'Category 4',
    },
    {
      id: 5,
      name: 'Category 5',
    },
    {
      id: 6,
      name: 'Category 6',
    },
    {
      id: 7,
      name: 'Category 7',
    },
    {
      id: 8,
      name: 'Category 8',
    },
    {
      id: 9,
      name: 'Category 9',
    },
    {
      id: 10,
      name: 'Category 10',
    },
  ];
  displayedColumns: string[] = ['name', 'edit/delete'];
  length!: number;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  nameValue = '';
  isAdding = false;

  constructor(
    private readonly dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    console.log('init');
    // this.adminService.categorysData$.subscribe((res: GetCategoryResponse) => {
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

  editCategory(categoryData: string) {
    // this.dialog.open(EditCategoryComponent, {
    //   width: '105rem',
    //   data: {
    //     category: categoryData,
    //     pagSize: this.pageSize,
    //     pageIndex: this.pageIndex,
    //   },
    // });
    console.log(categoryData);
  }

  deleteCategory(categoryData: string) {
    // this.dialog.open(CategoryDeleteConfirmationComponent, {
    //   width: '22rem',
    //   data: {
    //     category: categoryData,
    //     pagSize: this.pageSize,
    //     pageIndex: this.pageIndex,
    //   },
    // });
    console.log(categoryData);
  }

  saveCategory() {
    console.log('1');
  }

  cancelCategory() {
    this.isAdding = false;
  }
}
