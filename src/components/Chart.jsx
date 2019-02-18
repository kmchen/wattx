import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
    ResponsiveContainer, Cell, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip
} from 'recharts';

const TooltipInfo = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="intro">{`Name : ${payload[0].payload.name}`}</p>
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
        <p className="label">{`${payload[1].name} : ${payload[1].value}`}</p>
        <p className="label">{`${payload[2].name} : ${payload[2].value}`}</p>
      </div>
    );
  }
  return null;
};

export class Chart extends PureComponent {
  render() {
    return (
      <ChartContainer>
        <ChartArea>
          <ResponsiveContainer width='60%' height='60%' >
            <ScatterChart
              width={300}
              height={300}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis type="number"
                dataKey="x"
                unit="$"
                name="Market Capitalization"
              />
              <YAxis
                type="number"
                dataKey="y"
                unit="$"
                name="Volume" />
              <ZAxis
                type="number"
                dataKey="z"
                unit="%"
                name="Price Change" />
              <Tooltip content={<TooltipInfo />} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter
                name="market capitalization v.s. volume"
                data={this.props.data}
                fill="#8884d8"
              />
            </ScatterChart>
          </ResponsiveContainer>
      </ChartArea>
    </ChartContainer>
    );
    }
}

const ChartContainer = styled.div`
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
`;

const ChartArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
