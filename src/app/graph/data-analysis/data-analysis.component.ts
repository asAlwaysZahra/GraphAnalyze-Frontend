import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Network, DataSet, Node, Edge, Options, Data } from 'vis';

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrl: './data-analysis.component.scss',
})
export class DataAnalysisComponent implements AfterViewInit {
  @ViewChild('network') el!: ElementRef;
  private networkInstance!: Network;
  search = '';

  ngAfterViewInit() {
    const container = this.el.nativeElement;
    // create some nodes
    const nodes = new DataSet<Node>([
      { id: 0, label: 'Mamad' },
      { id: 1, label: 'Ali' },
      { id: 2, label: 'Hasan' },
    ] as unknown as Node[]);

    // create some edges
    const edges = new DataSet<Edge>([
      { from: 1, to: 0, label: '100 toman' },
      { from: 1, to: 2, label: '100 toman' },
      { from: 2, to: 0, label: '100 toman' },
    ] as Edge[]);

    const data: Data = { nodes, edges };

    // create a network
    const options: Options = {
      physics: false,
      edges: { arrows: 'to' },
      nodes: {
        shape: 'dot',
      },
    };

    this.networkInstance = new Network(container, data, options);
  }
}
