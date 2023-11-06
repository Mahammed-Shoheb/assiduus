import { useEffect, useRef, useState } from 'react';
import DashboardContainer from './DashboardContainer';
import * as d3 from 'd3';
import { useGloableContext } from '../GloableContext';

const TotalCashHeaderDiv = () => {
  return (
    <div className='flex justify-between  gap-2'>
      <div className='flex justify-between items-center gap-2'>
        <span className='w-4 h-4 bg-green-400 inline-block rounded'></span>
        <span>in</span>
      </div>
      <div className='flex justify-between items-center gap-2'>
        <span className='w-4 h-4 bg-green-600 inline-block rounded'></span>
        <span>out</span>
      </div>
    </div>
  );
};

const TotalCashChart = () => {
  const [dimensions, setDimensions] = useState({ w: 300, h: 300 });
  const handleResize = () => {
    setDimensions({
      w: window.document.getElementById('total').getBoundingClientRect().width,
      h: window.document.getElementById('total').getBoundingClientRect().height,
    });
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.addEventListener('load', handleResize);
    };
  });
  const { cashFlowData } = useGloableContext();
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('width', dimensions.w)
      .attr('height', dimensions.h);

    const xScale = d3
      .scaleBand()
      .domain(cashFlowData.map((d) => d.month))
      .range([10, dimensions.w - 20])
      .paddingInner(0.8);
    const yScale = d3.scaleLinear().domain([0, 20]).range([dimensions.h, 0]);

    const xAxis = d3.axisBottom(xScale).tickSize(0);
    svg.selectAll('rect').remove();
    const g = svg.selectAll('.bars').data(cashFlowData).enter().append('g');
    g.append('rect')
      .attr('class', 'bar1')
      // .attr('fill', 'rgb(74 222 128 / var(--tw-bg-opacity))')
      .attr('class', 'fill-green-400')
      .style('transform', `translateY(-40px)`)
      .style('rx', `5px`)
      .attr('x', (d) => xScale(d.month))
      .attr('width', xScale.bandwidth())
      .attr('y', (d) => yScale(d.in))
      .attr('height', (d) => dimensions.h - yScale(d.in));

    g.append('rect')
      .attr('class', 'bar2')
      // .attr('fill', 'rgb(22 101 52 / var(--tw-bg-opacity))')
      .attr('class', 'fill-green-600')
      .style('transform', `translateY(-40px)`)
      .style('rx', `5px`)
      .attr('x', (d) => xScale(d.month))
      .attr('width', xScale.bandwidth())
      .attr('y', (d) => yScale(d.out))
      .attr('height', (d) => dimensions.h - yScale(d.out));

    // .join('g')
    // .attr('class', 'layer')
    // .attr('fill', (layer) => colors[layer.key])
    // .selectAll('rect')
    // .data((layer) => layer)
    // .join('rect')
    // .attr('x', (sequance) => xScale(sequance.data.month))
    // .attr('width', xScale.bandwidth())
    // .attr('y', (sequance) => {
    //   console.log(sequance);
    //   return yScale(sequance[1]);
    // })
    // .attr('height', (sequance) => yScale(sequance[0]) - yScale(sequance[1]));
    svg
      .select('.x-axis')
      .style('transform', `translate(0,${dimensions.h - 20}px)`)
      .style('font-size', '0.75rem')
      .style('color', 'gray')
      .call(xAxis)
      .call((g) => g.select('.domain').remove());
  }, [cashFlowData, dimensions]);
  return (
    <DashboardContainer
      title={'Total cash flow'}
      headerDiv={TotalCashHeaderDiv}
    >
      <div className='w-full ' id='total'>
        <svg ref={svgRef} className=' tracking-wider'>
          <g className='x-axis' />
        </svg>
      </div>
    </DashboardContainer>
  );
};
export default TotalCashChart;
