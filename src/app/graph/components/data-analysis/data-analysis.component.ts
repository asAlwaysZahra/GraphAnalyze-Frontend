import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Data, DataSet, Edge, Network, Node } from 'vis';
import { LoadGraphService } from '../../services/load-graph/load-graph.service';
import { PageEvent } from '@angular/material/paginator';
import { MatMenuTrigger } from '@angular/material/menu';
import { ThemeService } from '../../../shared/services/theme.service';
import { getOptions } from './graph-options';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrl: './data-analysis.component.scss',
  animations: [
    trigger('sidebar-fly', [
      state('startRound', style({ transform: 'translateX(0)' })),
      state('endRound', style({ transform: 'translateX(120%)' })),
      transition('* <=> *', [animate('500ms ease-in-out')]),
    ]),
    trigger('main-expand', [
      state('startRound', style({ width: 'calc(100% - 26rem)' })),
      state('endRound', style({ width: '100%' })),
      transition('* <=> *', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class DataAnalysisComponent implements AfterViewInit {
  public state: string = 'startRound';

  changeState() {
    this.state = this.state == 'startRound' ? 'endRound' : 'startRound';
  }

  onClick() {
    this.changeState();
  }

  ////////////

  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger!: MatMenuTrigger;
  @ViewChild('menuTrigger', { read: ElementRef }) menuTrigger!: ElementRef;
  @ViewChild('network') el!: ElementRef;

  private networkInstance!: Network;

  search = '';
  accounts: string[] = [];
  length!: number;
  pageIndex = 0;

  nodes = new DataSet<Node>([] as unknown as Node[]);
  edges = new DataSet<Edge>([] as Edge[]);
  data: Data = { nodes: this.nodes, edges: this.edges };

  constructor(
    private themeService: ThemeService,
    private loadGraphService: LoadGraphService,
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef
  ) {}

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.length = e.length;
    this.loadGraphService.getAllNodes(e.pageIndex);
  }

  ngAfterViewInit() {
    this.createGraph();

    this.loadGraphService.nodesData$.subscribe((data) => {
      this.accounts = data.paginateList;
      this.length = data.totalCount;
      this.pageIndex = data.pageIndex;
    });
    this.loadGraphService.getAllNodes();
  }

  private createGraph() {
    this.networkInstance = new Network(
      this.el.nativeElement,
      this.data,
      getOptions()
    );

    // Listen for the context menu event (right-click)
    this.networkInstance.on('oncontext', (params) => {
      params.event.preventDefault();

      const nodeId = this.networkInstance.getNodeAt(params.pointer.DOM);
      const edgeId = this.networkInstance.getEdgeAt(params.pointer.DOM);

      if (nodeId !== undefined) {
        this.menuTrigger.nativeElement.style.left = params.event.clientX + 'px';
        this.menuTrigger.nativeElement.style.top = params.event.clientY + 'px';
        this.menuTrigger.nativeElement.style.position = 'fixed';
        this.matMenuTrigger.openMenu();

        this.changeDetector.detectChanges();
        const rightClickNodeInfoElem = document.getElementById(
          'right-click-node-info'
        ) as HTMLElement;
        rightClickNodeInfoElem.dataset['nodeid'] = nodeId.toString();

        // Custom logic for node right-click
      } else if (edgeId !== undefined) {
        console.log('Right-clicked edge:', edgeId);
        // Custom logic for edge right-click
      } else {
        console.log('Right-clicked on empty space');
        // Custom logic for right-click on empty space
      }
    });

    this.networkInstance.on('click', function (params) {
      if (params.edges.length == 1) {
        const nodeId = params.edges[0];
        console.log(nodeId);
      }
    });
  }

  getInfo(account?: string) {
    if (!account) {
      account = (
        document.getElementById('right-click-node-info') as HTMLElement
      ).dataset['nodeid'];
    }
    this.loadGraphService.getNodeInfo(account!).subscribe((data) => {
      this.dialog.open(InfoDialogComponent, {
        width: '105rem',
        data,
      });
    });
  }

  showAsGraph(account: string) {
    this.nodes.add({ id: account, label: account });
  }

  getGraph() {
    const nodeId = (
      document.getElementById('right-click-node-info') as HTMLElement
    ).dataset['nodeid'];
    console.log(nodeId);

    this.loadGraphService.getGraph('5').subscribe((data) => {
      this.nodes.add(data.nodes as Node);
      this.edges.add(data.edges as Edge);
    });
  }
}
