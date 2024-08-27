import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../api-config/api-url';
import { AllNodes } from '../../model/graph';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadGraphService {
  private readonly apiUrl = environment.apiUrl + '/api/GraphEav';

  private nodesData = new Subject<AllNodes>();

  nodesData$ = this.nodesData.asObservable();

  constructor(private http: HttpClient) {}

  getAllNodes(pageIndex = 0, category = '') {
    const pageSize = 10;

    this.http
      .get<AllNodes>(
        `${this.apiUrl}/GetNodesPaginationEav?pageIndex=${pageIndex}&pageSize=${pageSize}&category=${category}`,
        {
          withCredentials: true,
        }
      )
      .subscribe((nodes) => {
        this.nodesData.next(nodes);
      });
  }

  getNodeInfo(id: string) {
    return this.http.get<unknown>(
      this.apiUrl + '/GetNodeInformation?headerUniqueId=' + id,
      {
        withCredentials: true,
      }
    );
  }

  getEdges(id: string) {
    return this.http.get<unknown>(
      this.apiUrl + '/GetNodeInformation?headerUniqueId=' + id,
      {
        withCredentials: true,
      }
    );
  }
}
