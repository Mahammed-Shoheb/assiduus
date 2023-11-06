import { useEffect, useRef, useState } from 'react';
import DashboardContainer from './DashboardContainer';
import * as d3 from 'd3';
import { useGloableContext } from '../GloableContext';

const CheckAccountHeaderDiv = () => {
  const { month, setMonth, changeChartsData } = useGloableContext();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <div className='flex gap-3 justify-between text-sm'>
      <select
        name='data'
        className='border  md:py-1 md:px-2 rounded-md cursor-pointer'
        onChange={() => changeChartsData()}
      >
        <option value='Manage'>Manage</option>
        <option value='Opt1'>Opt1</option>
      </select>
      <select
        name='month'
        className='border md:py-1 md:px-2  rounded-md cursor-pointer'
        value={month}
        onChange={(e) => {
          setMonth(e.target.value);
          changeChartsData();
        }}
      >
        {months.map((month) => {
          return (
            <option value={month} key={month}>
              {month}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const CheckingAccountChart = () => {
  const { accountData } = useGloableContext();
  const [dimensions, setDimensions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const handleResize = () => {
    setIsLoading(true);
    setDimensions({
      w: window.document.getElementById('account').getBoundingClientRect()
        .width,
      h: window.document.getElementById('account').getBoundingClientRect()
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
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('width', dimensions.w)
      .attr('height', dimensions.h);

    const xScale = d3
      .scaleLinear()
      .domain([accountData[0][0], accountData[accountData.length - 1][0]])
      .range([10, dimensions.w - 10]);
    const yScale = d3.scaleLinear().domain([0, 20]).range([dimensions.h, 0]);

    const xAxis = d3.axisBottom(xScale).tickSize(0);
    svg
      .select('.x-axis')
      .style('transform', `translate(0,${dimensions.h - 20}px)`)
      .style('font-size', '0.75rem')
      .style('color', 'gray')
      .call(xAxis)
      .call((g) => g.select('.domain').remove());

    const myLine = d3
      .line()
      .x((d, i) => xScale(d[0]))
      .y((d) => yScale(d[1]))
      .curve(d3.curveCardinal);

    svg.selectAll('path').remove();

    svg
      .selectAll('.line')
      .data([accountData])
      .join('path')
      .attr('d', myLine)
      .attr('fill', 'none')
      .attr('class', 'stroke-green-400')
      // .attr('stroke', 'green')
      .attr('stroke-width', '2px');
  }, [accountData, dimensions]);
  return (
    <DashboardContainer
      title={'Checking account'}
      headerDiv={CheckAccountHeaderDiv}
    >
      <div className='w-full h-full relative' id='account'>
        {isLoading && (
          <div className='absolute inset-0 grid place-content-center bg-white text-green-500 tracking-widest'>
            Loading...
          </div>
        )}
        <svg ref={svgRef} className=' tracking-wider '>
          <g className='x-axis' />
        </svg>
      </div>
    </DashboardContainer>
  );
};

export default CheckingAccountChart;
