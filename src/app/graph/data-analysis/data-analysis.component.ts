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
  accounts = [
    { number: '123456789' },
    { number: '123456789' },
    { number: '123456789' },
    { number: '123456789' },
    { number: '123456789' },
    { number: '123456789' },
    { number: '123456789' },
    { number: '123456789' },
    { number: '123456789' },
    { number: '123456789' },
  ];

  ngAfterViewInit() {
    const container = this.el.nativeElement;
    // create some nodes
    const nodes = new DataSet<Node>([
      { id: 0, label: 'محمد رضا یاقوتی \n\n 16546220216446' },
      { id: 1, label: 'محمد رضا یاقوتی \n\n 16546220216446' },
      { id: 2, label: 'محمد رضا یاقوتی \n\n 16546220216446' },
      { id: 50, label: 'محمد رضا یاقوتی \n\n 16546220216446' },
    ] as unknown as Node[]);

    // create some edges
    const edges = new DataSet<Edge>([
      { from: 1, to: 0, label: '100 toman' },
      { from: 1, to: 2, label: '150 toman' },
      { from: 2, to: 0, label: '200 toman' },
      { from: 50, to: 0, label: '250 toman' },
    ] as Edge[]);

    const data: Data = { nodes, edges };

    // create a network
    const options: Options = {
      physics: false,
      edges: {
        smooth: { enabled: false, type: 'vertical', roundness: 0 },
        arrows: 'to',
        arrowStrikethrough: false,
      },
      nodes: {
        shape: 'box',
        color: {
          background: '#e7eeff',
          border: 'rgba(27, 89, 248, 0.8)',
          highlight: {
            background: '#d1defe',
            border: 'rgba(27, 89, 248, 0.9)',
          },
        },
        font: {
          align: 'center',
          color: 'rgba(27, 89, 248, 1)',
          face: 'MyCustomFont',
        },
      },
    };

    this.networkInstance = new Network(container, data, options);
  }
}
