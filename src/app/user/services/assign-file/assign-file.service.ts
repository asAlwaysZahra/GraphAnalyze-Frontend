import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from '../../../shared/services/loading.service';
import { environment } from '../../../../../api-config/api-url';
import { Subject } from 'rxjs';
import { FileDataResponse, FileUserAccess } from '../../models/File';

@Injectable({
  providedIn: 'root',
})
export class AssignFileService {
  private readonly apiUrl = environment.apiUrl + '/api/FileAccess';
  private filesData = new Subject<FileDataResponse>();
  private notification = new Subject<{ status: boolean; message: string }>();

  filesData$ = this.filesData.asObservable();
  notification$ = this.notification.asObservable();

  constructor(
    private httpClient: HttpClient,
    private loadingService: LoadingService
  ) {}

  getFilesData(pageSize = 10, pageNumber = 0) {
    this.loadingService.setLoading(true);
    return this.httpClient
      .get<FileDataResponse>(
        this.apiUrl +
          `/GetFileForAccessingFile?page=${pageNumber}&limit=${pageSize}`,
        {
          withCredentials: true,
        }
      )
      .subscribe((files) => {
        this.filesData.next(files);
      });
  }

  getFileUserAccess(id: number) {
    this.loadingService.setLoading(true);
    return this.httpClient.get<FileUserAccess[]>(
      this.apiUrl + `/WhoAccessToThisFile?fileId=${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
