import React, { useEffect } from 'react';
import './App.css';
import * as d3 from 'd3';

function doDrawChart(svgElement: SVGSVGElement) {
  const svg = d3.select(svgElement);

  const x = d3.scaleLinear().domain([0, 1000]).range([40, 780]);
  svg.append("g")
    .attr("transform", "translate(0,700)")
    .call(d3.axisBottom(x).ticks(10));
  const y = d3.scaleLinear().domain([0, 1000]).range([700, 40]);
  svg.append("g")
    .attr("transform", "translate(40,0)")
    .call(d3.axisLeft(y).ticks(10));

  svg.append("g")
    .attr("stroke", "black")
    .attr("stroke-opacity", 0.1)
    .call(svg => svg.append("g")
      .selectAll("line")
      .data(x.ticks())
      .join("line")
      .attr("x1", d => 0.5 + x(d))
      .attr("x2", d => 0.5 + x(d))
      .attr("y1", 40)
      .attr("y2", "700"))
    .call(svg => svg.append("g")
      .selectAll("line")
      .data(y.ticks())
      .join("line")
      .attr("y1", d => 0.5 + y(d))
      .attr("y2", d => 0.5 + y(d))
      .attr("x1", 40)
      .attr("x2", 780));
}

// fettblog.eu/typescript-react/hooks TypeScript and React: Hooks
function App() {
  const svgRef = React.useRef<SVGSVGElement>(null);

  fetch("opendata-2020-09-12-062733+0000.json")
    .then(resp => resp.text())
    .then(data => {
      const dataPointText = data.split("\n");
      const dataPoints = dataPointText.filter(line => line.length >= 1).map(line => JSON.parse(line));
      console.log(dataPoints);
    });

  useEffect(() => {
    if (svgRef.current)
      doDrawChart(svgRef.current);
  });

  return (
    <div>
      <svg width={1024} height={720} ref={svgRef} />
    </div>
  );
}

export default App;
