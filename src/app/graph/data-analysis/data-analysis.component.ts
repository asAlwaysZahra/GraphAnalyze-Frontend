import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Data, DataSet, Edge, Network, Node, Options } from 'vis';
import { ThemeService } from '../../shared/services/theme.service';

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
    { number: '621654684' },
    { number: '853537643' },
    { number: '127457278' },
    { number: '346289457' },
    { number: '968956363' },
    { number: '346485668' },
    { number: '969784332' },
    { number: '679780894' },
    { number: '234645863' },
  ];

  constructor(private themeService: ThemeService) {}

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
      { from: 1, to: 0, label: '100,000 تومان' },
      { from: 1, to: 2, label: '150,000 تومان' },
      { from: 2, to: 0, label: '250,000 تومان' },
      { from: 50, to: 0, label: '3,000,000 تومان' },
    ] as Edge[]);

    const data: Data = { nodes, edges };

    const dataSetValue = document.body.getAttribute('data-set');
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

    // create a network
    const options: Options = {
      physics: false,
      edges: {
        width: 2,
        smooth: { enabled: false, type: 'vertical', roundness: 0 },
        arrows: 'to',
        arrowStrikethrough: false,
        font: {
          align: 'middle',
          color: textColor,
          strokeWidth: 0,
          face: 'MyCustomFont',
        },
      },
      nodes: {
        shape: 'image',
        image: svgDataUrl,
        size: 15,
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
        },
      },
    };

    this.networkInstance = new Network(container, data, options);
  }
}
