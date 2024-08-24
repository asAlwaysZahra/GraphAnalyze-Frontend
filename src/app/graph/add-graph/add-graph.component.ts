import { Component, ElementRef, ViewChild } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-add-graph',
  templateUrl: './add-graph.component.html',
  styleUrl: './add-graph.component.scss',
})
export class AddGraphComponent {
  isHighlighted = false;
  selectedFile!: File;
  csvData: any[] = [];
  headers: string[] = [];
  isLoading: boolean = false;

  constructor(private papaParseService: Papa) {}

  highlight(event: Event) {
    this.isHighlighted = true;
  }

  unhighlight(event: Event) {
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
    };
  }
}
