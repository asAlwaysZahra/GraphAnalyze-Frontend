import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-graph',
  templateUrl: './add-graph.component.html',
  styleUrl: './add-graph.component.scss',
})
export class AddGraphComponent implements AfterViewInit {
  isHighlighted = false;
  selectedFile!: File;
  csvData: unknown[] = [];
  headers: string[] = [];
  isLoading = false;
  isLoaded = false;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<unknown>(this.csvData);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private papaParseService: Papa) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  highlight() {
    this.isHighlighted = true;
  }

  unhighlight() {
    this.isHighlighted = false;
  }

  readFile(event: any) {
    this.isHighlighted = false;
    this.isLoading = true;
    this.selectedFile = event.target.files[0];
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
      this.dataSource.data = this.csvData;
      this.dataSource.paginator = this.paginator;
      console.log(this.csvData);
    };
  }
}
