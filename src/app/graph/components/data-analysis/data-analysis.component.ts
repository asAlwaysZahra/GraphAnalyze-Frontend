import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Data, DataSet, Edge, Network, Node, Options } from 'vis';
import { LoadGraphService } from '../../services/load-graph/load-graph.service';
import { PageEvent } from '@angular/material/paginator';
import { MatMenuTrigger } from '@angular/material/menu';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrl: './data-analysis.component.scss',
})
export class DataAnalysisComponent implements AfterViewInit {
  @ViewChild('network') el!: ElementRef;
  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger!: MatMenuTrigger;
  @ViewChild('menuTrigger', { read: ElementRef }) menuTrigger!: ElementRef;

  private networkInstance!: Network;

  nodes = new DataSet<Node>([
    { id: 0, label: '16546220216446' },
    { id: 1, label: '16546220216446' },
    { id: 2, label: '16546220216446' },
    { id: 50, label: '16546220216446' },
  ] as unknown as Node[]);
  edges = new DataSet<Edge>([
    { id: 1, from: 1, to: 0, label: '100,000 تومان' },
    { id: 2, from: 1, to: 2, label: '150,000 تومان' },
    { id: 3, from: 2, to: 0, label: '250,000 تومان' },
    { id: 4, from: 50, to: 0, label: '3,000,000 تومان' },
  ] as Edge[]);
  data: Data = { nodes: this.nodes, edges: this.edges };

  length!: number;
  pageIndex = 0;
  search = '';
  accounts: string[] = [];

  constructor(
    private themeService: ThemeService,
    private loadGraphService: LoadGraphService
  ) {}

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.length = e.length;
    this.loadGraphService.getAllNodes(e.pageIndex);
  }

  nodes = new DataSet<Node>([
    { id: 0, label: '16546220216446' },
    { id: 1, label: '16546220216446' },
    { id: 2, label: '16546220216446' },
    { id: 50, label: '16546220216446' },
  ] as unknown as Node[]);
  edges = new DataSet<Edge>([
    { id: 1, from: 1, to: 0, label: '100,000 تومان' },
    { id: 2, from: 1, to: 2, label: '150,000 تومان' },
    { id: 3, from: 2, to: 0, label: '250,000 تومان' },
    { id: 4, from: 50, to: 0, label: '3,000,000 تومان' },
  ] as Edge[]);
  data: Data = { nodes: this.nodes, edges: this.edges };

  length!: number;
  pageIndex = 0;

  constructor(
    private themeService: ThemeService,
    private loadGraphService: LoadGraphService
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
    const dataSetValue = document.body.getAttribute('data-theme');
    const labelColor: string =
      dataSetValue == 'dark' ? '#b5c4ff' : 'rgb(27, 89, 248)';
    const labelBorder: string =
      dataSetValue == 'dark'
        ? 'rgba(27, 89, 248, 0.8)'
        : 'rgba(27, 89, 248, 0.8)';
    const labelHighlight: string =
      dataSetValue == 'dark' ? '#d1defe' : '#d1defe';
    const textColor: string =
      dataSetValue == 'dark' ? 'rgba(255,255,255,0.9)' : '#222';

    const svgDataUrl =
      'data:image/svg+xml;charset=UTF-8,' +
      encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
         fill="${labelColor}"/>
      </svg>
    `);

    const options: Options = {
      physics: false,
      edges: {
        width: 1,
        smooth: { enabled: false, type: 'vertical', roundness: 0 },
        arrows: 'to',
        arrowStrikethrough: false,
        font: {
          align: 'middle',
          color: textColor,
          strokeWidth: 0,
          face: 'MyCustomFont',
          size: 6,
        },
      },
      nodes: {
        shape: 'image',
        image: svgDataUrl,
        size: 8,
        color: {
          background: labelColor,
          border: labelBorder,
          highlight: {
            background: labelHighlight,
            border: labelBorder,
          },
        },
        font: {
          align: 'center',
          color: textColor,
          face: 'MyCustomFont',
          size: 6,
        },
      },
    };

    this.networkInstance = new Network(
      this.el.nativeElement,
      this.data,
      options
    );

    // Listen for the context menu event (right-click)
    this.networkInstance.on('oncontext', (params) => {
      params.event.preventDefault();

      const nodeId = this.networkInstance.getNodeAt(params.pointer.DOM);
      const edgeId = this.networkInstance.getEdgeAt(params.pointer.DOM);

      if (nodeId !== undefined) {
        console.log('Right-clicked node:', nodeId);

        this.menuTrigger.nativeElement.style.left = params.event.clientX + 'px';
        this.menuTrigger.nativeElement.style.top = params.event.clientY + 'px';
        this.menuTrigger.nativeElement.style.position = 'fixed';
        this.matMenuTrigger.openMenu();

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
    this.networkInstance = new Network(
      this.el.nativeElement,
      this.data,
      options
    );
  }
}
