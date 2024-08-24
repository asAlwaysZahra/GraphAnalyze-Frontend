import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserManageNotificationComponent } from '../../user/components/dashboard/manage-users/user-manage-notification/user-manage-notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Event } from '@angular/router';

@Component({
  selector: 'app-add-graph',
  templateUrl: './add-graph.component.html',
  styleUrl: './add-graph.component.scss',
})
export class AddGraphComponent {
  isHighlighted = false;
  selectedFile!: File;
  csvData: unknown[] = [];
  headers: string[] = [];
  isLoading = false;
  isLoaded = false;
  wrongFormat = false;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<unknown>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  csvType = 'node';
  selectedId!: string;
  selectedSource!: string;
  selectedDestination!: string;

  constructor(
    private papaParseService: Papa,
    private changeDetector: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
  ) {}

  highlight() {
    this.isHighlighted = true;
  }

  unhighlight() {
    this.isHighlighted = false;
  }

  readFile(event: Event) {
    this.wrongFormat = false;
    this.isHighlighted = false;
    this.isLoading = true;
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
    const fileName = this.selectedFile.name;
    const fileExtension = fileName.split('.').pop()?.toLowerCase();

    if (fileExtension !== 'csv') {
      this.isLoading = false;
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
    reader.onload = (event: any) => {
      const csvData = this.papaParseService.parse(event.target.result, {
        header: true,
      });
      this.csvData = csvData.data;
      this.headers = Object.keys(csvData.data[0]);
      this.isLoading = false;
      this.isLoaded = true;
      this.displayedColumns = this.headers;
      this.changeDetector.detectChanges();
      this.dataSource.data = this.csvData;
      this.dataSource.paginator = this.paginator;
    };
  }
}
