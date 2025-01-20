import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface BarChartProps {
  URL: string;
  initWidth: number;
  initHeight: number;
  Key: string;
  Value: string;
}

const Barchart = ({ 
  URL, 
  initWidth, 
  initHeight, 
  Key, 
  Value 
}: BarChartProps) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const width = initWidth - margin.left - margin.right;
    const height = initHeight - margin.top - margin.bottom;

    // Clear existing content
    d3.select(ref.current).selectAll("*").remove();

    // Create SVG container
    const svg = d3
      .select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Load and process data
    d3.csv(URL).then((data) => {
      // Convert values to numbers and sort
      const parsedData = data
        .map(d => ({
          ...d,
          [Value]: Number(d[Value])
        }))
        .sort((a: any, b:any) => b[Value] - a[Value]);

      // Create scales
      const x = d3.scaleBand()
        .range([0, width])
        .domain(parsedData.map(d => String(d[Key])))
        .padding(0.3);

      const y = d3.scaleLinear()
        .domain([0, d3.max(parsedData, d => Number(d[Value])) || 0])
        .range([height, 0]);

      // Add X axis
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

      // Add Y axis
      svg.append("g")
        .call(d3.axisLeft(y));

      // Add X axis label
      svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 5)
        .attr("fill", "url(#bar-gradient)")
        .text(Key);

      // Add Y axis label
      svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -height / 2)
        .attr("fill", "url(#bar-gradient)")
        .text(Value);

      // Create gradient
      const gradient = svg
        .append("defs")
        .append("linearGradient")
        .attr("id", "bar-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#ffdd54");

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#8b5cf6");

      // Create and animate the bars
      const bars = svg.selectAll(".bar")
        .data(parsedData)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => x(String(d[Key])) || 0)
        .attr("width", x.bandwidth())
        .attr("fill", "url(#bar-gradient)")
        .attr("y", height)
        .attr("height", 0);

      // Add value labels
      const labels = svg.selectAll(".label")
        .data(parsedData)
        .join("text")
        .attr("class", "label")
        .attr("x", d => (x(String(d[Key])) || 0) + x.bandwidth() / 2)
        .attr("y", height)
        .attr("fill", "url(#bar-gradient)")
        .attr("text-anchor", "middle")
        .style("opacity", 0)
        .text(d => d[Value]);

      // Animate bars and labels
      bars.transition()
        .duration(800)
        .delay((_, i) => i * 100)
        .ease(d3.easeElastic)
        .attr("y", d => y(Number(d[Value])))
        .attr("height", d => height - y(Number(d[Value])));

      labels.transition()
        .duration(800)
        .delay((_, i) => i * 100)
        .style("opacity", 1)
        .attr("y", d => y(Number(d[Value])) - 5);

      // Add hover effects
      bars.on("mouseover", function(_event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("fill", "#8b5cf6")
          .attr("width", x.bandwidth() * 1.1)
          .attr("x", (x(String(d[Key])) || 0) - (x.bandwidth() * 0.05));
        svg.append("text")
          .attr("class", "tooltip") 
          .attr("x", (x(String(d[Key])) || 0) + x.bandwidth() / 2)
          .attr("y", y(Number(d[Value])) - 15)
          .attr("text-anchor", "middle")
          .style("font-size", "12px")
          .style("font-weight", "bold")
          .text(`${d[Key]}: ${d[Value]}`);
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("fill", "url(#bar-gradient)")
          .attr("width", x.bandwidth());

        d3.selectAll(".tooltip").remove();
      });

    });

  }, [URL, initWidth, initHeight, Key, Value]);

  return <svg ref={ref} />;
};

export default Barchart;