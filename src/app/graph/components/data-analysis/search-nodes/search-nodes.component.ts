import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LoadGraphService } from '../../../services/load-graph/load-graph.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from '../../../../shared/services/loading.service';
import { DangerSuccessNotificationComponent } from '../../../../shared/components/danger-success-notification/danger-success-notification.component';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-search-nodes',
  templateUrl: './search-nodes.component.html',
  styleUrl: './search-nodes.component.scss',
})
export class SearchNodesComponent implements AfterViewInit {
  searchInput = '';
  accounts: { id: number; entityName: string }[] = [];
  length!: number;
  pageIndex = 0;

  constructor(
    private _snackBar: MatSnackBar,
    private loadGraphService: LoadGraphService,
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef,
    private loadingService: LoadingService
  ) {}

  ngAfterViewInit(): void {
    this.loadGraphService.nodesData$.subscribe({
      next: (data) => {
        this.accounts = data.items;
        this.length = data.totalItems;
        this.pageIndex = data.pageIndex;
        this.loadingService.setLoading(false);
      },
      error: (error) => {
        this._snackBar.openFromComponent(DangerSuccessNotificationComponent, {
          data: error.error.message,
          panelClass: ['notification-class-danger'],
          duration: 2000,
        });
        this.loadingService.setLoading(false);
      },
    });
    this.loadGraphService.getAllNodes();
  }

  searchNodes(arg: string) {
    console.log(arg);
  }

  showAsGraph(account: { id: number; entityName: string }) {
    console.log(account);
  }

  getInfo(account?: number) {
    if (!account) {
      account = (
        document.getElementById('right-click-node-info') as HTMLElement
      ).dataset['nodeid'] as unknown as number;
    }

    this.loadGraphService.getNodeInfo(account).subscribe({
      next: (data) => {
        this.dialog.open(InfoDialogComponent, {
          width: '105rem',
          data,
        });
        this.loadingService.setLoading(false);
      },
      error: (error) => {
        this._snackBar.openFromComponent(DangerSuccessNotificationComponent, {
          data: error.error.message,
          panelClass: ['notification-class-danger'],
          duration: 2000,
        });
        this.loadingService.setLoading(false);
      },
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.length = e.length;
    this.loadGraphService.getAllNodes(e.pageIndex);
  }
}
