import React, { PureComponent } from 'react';
import {
    Cell, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip
} from 'recharts';

export class Chart extends PureComponent {
  render() {
    return (
      <ScatterChart
        width={600}
        height={600}
        margin={{ top: 20, right: 20, bottom: 20, left: 200 }}
      >
        <XAxis type="number"
          allowDataOverflow={true}
          domain={[0, 2000000000]}
          dataKey="x"
          name="market capitalization"
        />
        <YAxis
          type="number"
          allowDataOverflow={true}
          domain={[0, 200000000]}
          dataKey="y"
          name="volume" />
        <ZAxis
          type="number"
          allowDataOverflow={true}
          domain={[0, 200000000]}
          dataKey="z"
          name="priceChange" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter
          name="market capitalization v.s. volume"
          data={this.props.data}
          fill="#8884d8"
        />
      </ScatterChart>
    );
    }
}
