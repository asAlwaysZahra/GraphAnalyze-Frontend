import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../api-config/api-url';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly apiUrl = environment.apiUrl + '/api/File';

  constructor(private httpClient: HttpClient) {}

  uploadNode(file: File, header: string, categoryFile: string) {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.apiUrl + '/upload-file-node', {
      Header: header,
      File: formData,
      categoryFile: categoryFile,
    });
  }

  uploadEdge(file: File, from: string, to: string) {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(this.apiUrl + '/upload-file-edge', {
      From: from,
      To: to,
      File: formData,
    });
  }
}
