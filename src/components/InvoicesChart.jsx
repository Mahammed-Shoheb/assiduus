import { useEffect, useRef, useState } from 'react';
import { useGloableContext } from '../GloableContext';

import DashboardContainer from './DashboardContainer';
import * as d3 from 'd3';

const InvoicetHeaderDiv = () => {
  const { setIsModalOpen } = useGloableContext();
  return (
    <button
      className='text-green-400 capitalize border py-1 px-2 rounded-md font-semibold bg-slate-100'
      onClick={() => setIsModalOpen(true)}
    >
      new sales invoice
    </button>
  );
};

const InvoicesChart = () => {
  const [dimensions, setDimensions] = useState({ w: 300, h: 300 });
  const handleResize = () => {
    setDimensions({
      w: window.document.getElementById('invoice').getBoundingClientRect()
        .width,
      h: window.document.getElementById('invoice').getBoundingClientRect()
        .height,
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
  const { invoiceData } = useGloableContext();
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('width', dimensions.w)
      .attr('height', dimensions.h);

    const xScale = d3
      .scaleBand()
      .domain(invoiceData.map((d) => d.week))
      .range([10, dimensions.w - 15])
      .paddingInner(0.8);
    const yScale = d3.scaleLinear().domain([0, 20]).range([dimensions.h, 0]);
    const xAxis = d3.axisBottom(xScale).tickSize(0);

    svg
      .select('.x-axis')
      .style('transform', `translate(0,${dimensions.h - 20}px)`)
      .style('font-size', '0.75rem')
      .style('color', 'gray')
      .call(xAxis)
      .call((g) => g.select('.domain').remove());
    svg.selectAll('rect').remove();
    svg
      .selectAll('.bars')
      .data(invoiceData)
      .join('rect')
      // .attr('fill', 'rgb(74 222 128 / var(--tw-bg-opacity))')
      .attr('class', 'fill-green-600')
      .style('transform', `translateY(-40px)`)
      .style('ry', `5px`)
      .attr('x', (d) => xScale(d.week))
      .attr('width', xScale.bandwidth())
      .attr('y', (d) => yScale(d.value))
      .attr('height', (d) => dimensions.h - yScale(d.value));
  }, [invoiceData, dimensions]);
  return (
    <DashboardContainer
      title={'Invoices owed to you'}
      headerDiv={InvoicetHeaderDiv}
    >
      <div className='w-full  ' id='invoice'>
        <svg ref={svgRef} className='  tracking-wider capitalize'>
          <g className='x-axis' />
        </svg>
      </div>
    </DashboardContainer>
  );
};
export default InvoicesChart;
