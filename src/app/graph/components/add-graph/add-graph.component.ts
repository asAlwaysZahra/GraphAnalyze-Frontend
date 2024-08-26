import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserManageNotificationComponent } from '../../../user/components/dashboard/manage-users/user-manage-notification/user-manage-notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileService } from '../../services/file/file.service';

@Component({
  selector: 'app-add-graph',
  templateUrl: './add-graph.component.html',
  styleUrl: './add-graph.component.scss',
})
export class AddGraphComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isHighlighted = false;
  selectedFile!: File;
  csvData: unknown[] = [];
  headers: string[] = [];
  isLoaded = false;
  isUploading = false;
  wrongFormat = false;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<unknown>();
  csvType = 'node';
  selectedId = '';
  selectedSource = '';
  selectedDestination = '';
  categoryName = '';

  constructor(
    private papaParseService: Papa,
    private changeDetector: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private fileService: FileService
  ) {}

  highlight() {
    this.isHighlighted = true;
  }

  unhighlight() {
    this.isHighlighted = false;
  }

  readFile(event: Event) {
    this.wrongFormat = false;
    this.isLoaded = false;
    this.isHighlighted = false;
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
    const fileName = this.selectedFile.name;
    const fileExtension = fileName.split('.').pop()?.toLowerCase();

    if (fileExtension !== 'csv') {
      this.wrongFormat = true;
      this._snackBar.openFromComponent(UserManageNotificationComponent, {
        data: 'Please upload a CSV file',
        panelClass: ['notification-class-danger'],
        duration: 2000,
      });
      return;
    }

    this.csvData = [];
    this.headers = [];

    const reader = new FileReader();
    reader.readAsText(this.selectedFile);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const textContent = event.target!.result as string; // Type assertion (use with caution)
      const csvData = this.papaParseService.parse(textContent, {
        header: true,
      });
      this.csvData = csvData.data;
      this.headers = Object.keys(csvData.data[0]);
      this.isLoaded = true;
      this.displayedColumns = this.headers;
      this.changeDetector.detectChanges();
      this.dataSource.data = this.csvData;
      this.dataSource.paginator = this.paginator;
    };
  }

  uploadFile() {
    this.isUploading = true;
    if (this.csvType === 'node') {
      this.fileService
        .uploadNode(this.selectedFile, this.selectedId, this.categoryName)
        .subscribe({
          next: () => {
            this.reset();
            this._snackBar.openFromComponent(UserManageNotificationComponent, {
              data: 'Node added successfully!',
              panelClass: ['notification-class-success'],
              duration: 2000,
            });
          },
          error: (error) => {
            this.isUploading = false;
            this._snackBar.openFromComponent(UserManageNotificationComponent, {
              data: error.error.message,
              panelClass: ['notification-class-danger'],
              duration: 2000,
            });
          },
        });
    } else {
      this.fileService
        .uploadEdge(
          this.selectedFile,
          this.selectedSource,
          this.selectedDestination
        )
        .subscribe({
          next: () => {
            this.reset();
            this._snackBar.openFromComponent(UserManageNotificationComponent, {
              data: 'Edge added successfully!',
              panelClass: ['notification-class-success'],
              duration: 2000,
            });
          },
          error: (error) => {
            this.isUploading = false;
            this._snackBar.openFromComponent(UserManageNotificationComponent, {
              data: error.error.message,
              panelClass: ['notification-class-danger'],
              duration: 2000,
            });
          },
        });
    }
  }

  private reset() {
    this.isHighlighted = false;
    this.csvData = [];
    this.headers = [];
    this.isLoaded = false;
    this.isUploading = false;
    this.wrongFormat = false;
    this.displayedColumns = [];
    this.dataSource.data = [];
    this.csvType = 'node';
    this.selectedId = '';
    this.selectedSource = '';
    this.selectedDestination = '';
    this.categoryName = '';
  }
}
