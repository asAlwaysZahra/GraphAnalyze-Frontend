import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-graph',
  templateUrl: './add-graph.component.html',
  styleUrl: './add-graph.component.scss',
})
export class AddGraphComponent {
  @ViewChild('file') el!: ElementRef;
  isHighlighted = false;

  highlight(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.isHighlighted = true;
  }

  unhighlight(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.isHighlighted = false;
  }

  dropped(event: Event) {
    console.log(event);
  }
}
