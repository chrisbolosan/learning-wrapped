'use client';

import CanvasJSReact from '@canvasjs/react-charts';

export default function Home() {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    title: {
      text: 'Lorem Ipsum Chart',
    },
    data: [
      {
        type: 'column',
        dataPoints: [
          { label: 'Gaston', y: 10 },
          { label: 'Chris', y: 20 },
          { label: 'Ashley', y: 30 },
        ],
      },
    ],
  };

  return (
    <div>
      <h1>Learning Wrapped</h1>
      <CanvasJSChart options={options} />
    </div>
  );
}
