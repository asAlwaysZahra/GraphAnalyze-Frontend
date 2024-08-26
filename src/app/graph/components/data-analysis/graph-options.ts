import { Options } from 'vis';

const dataSetValue = document.body.getAttribute('data-theme');
const labelColor: string =
  dataSetValue == 'dark' ? '#b5c4ff' : 'rgb(27, 89, 248)';
const labelBorder: string =
  dataSetValue == 'dark' ? 'rgba(27, 89, 248, 0.8)' : 'rgba(27, 89, 248, 0.8)';
const labelHighlight: string = dataSetValue == 'dark' ? '#d1defe' : '#d1defe';
const textColor: string =
  dataSetValue == 'dark' ? 'rgba(255,255,255,0.9)' : '#222';

console.log(dataSetValue);

const svgDataUrl =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
     fill="${labelColor}"/>
  </svg>
`);

export const options: Options = {
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
