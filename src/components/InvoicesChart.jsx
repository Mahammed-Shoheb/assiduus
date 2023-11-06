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
  const [dimensions, setDimensions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const handleResize = () => {
    setIsLoading(true);
    setDimensions({
      w: window.document.getElementById('invoice').getBoundingClientRect()
        .width,
      h: window.document.getElementById('invoice').getBoundingClientRect()
        .height,
    });
    setTimeout(() => setIsLoading(false), 500);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
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
      .style('transform', `translate(0,${dimensions.h - 15}px)`)
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
      .style('transform', `translateY(-20px)`)
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
      <div className='w-full  h-full relative' id='invoice'>
        {isLoading && (
          <div className='absolute inset-0 grid place-content-center bg-white text-green-500 tracking-widest'>
            Loading...
          </div>
        )}
        <svg ref={svgRef} className='  tracking-wider capitalize'>
          <g className='x-axis' />
        </svg>
      </div>
    </DashboardContainer>
  );
};
export default InvoicesChart;
