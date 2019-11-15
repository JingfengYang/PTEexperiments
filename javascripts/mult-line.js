var data = [
  {
    name: "USA",
    values: [
      {date: "0.125", price: "100"},
      {date: "0.25", price: "110"},
      {date: "0.5", price: "145"},
      {date: "1.0", price: "241"},
    ]
  },
  {
    name: "Canada",
    values: [
      {date: "0.125", price: "200"},
      {date: "0.25", price: "120"},
      {date: "0.5", price: "33"},
      {date: "1.0", price: "21"},
    ]
  },
  {
    name: "Maxico",
    values: [
      {date: "0.125", price: "50"},
      {date: "0.25", price: "10"},
      {date: "0.5", price: "5"},
      {date: "1.0", price: "71"},
    ]
  }
];

var width = 500;
var height = 300;
var margin = 50;
var duration = 250;

var lineOpacity = "0.25";
var lineOpacityHover = "0.85";
var otherLinesOpacityHover = "0.1";
var lineStroke = "1.5px";
var lineStrokeHover = "2.5px";

var circleOpacity = '0.85';
var circleOpacityOnLineHover = "0.25"
var circleRadius = 3;
var circleRadiusHover = 6;


/* Format Data */
data.forEach(function(d) { 
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});


/* Scale */
var xScale = d3.scaleLinear()
  .domain(d3.extent(data[0].values, d => d.date))
  .range([0, width-margin]);

var yScale = d3.scaleLinear()
  .domain([0, d3.max(data[0].values, d => d.price)])
  .range([height-margin, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

/* Add SVG */
var svg = d3.select("#mult-line").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale(d.price));

let lines = svg.append('g')
  .attr('class', 'lines');

lines.selectAll('.line-group')
  .data(data).enter()
  .append('g')
  .attr('class', 'line-group')  
  .on("mouseover", function(d, i) {
      svg.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))        
        .text(d.name)
        .attr("text-anchor", "middle")
        .attr("x", (width)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line(d.values))
  .style('stroke', (d, i) => color(i))
  .style('opacity', lineOpacity)
  .on("mouseover", function(d) {
      d3.selectAll('.line')
          .style('opacity', otherLinesOpacityHover);
      d3.selectAll('.circle')
          .style('opacity', circleOpacityOnLineHover);
      d3.select(this)
        .style('opacity', lineOpacityHover)
        .style("stroke-width", lineStrokeHover)
        .style("cursor", "pointer");
    })
  .on("mouseout", function(d) {
      d3.selectAll(".line")
          .style('opacity', lineOpacity);
      d3.selectAll('.circle')
          .style('opacity', circleOpacity);
      d3.select(this)
        .style("stroke-width", lineStroke)
        .style("cursor", "none");
    });


/* Add circles in the line */
lines.selectAll("circle-group")
  .data(data).enter()
  .append("g")
  .style("fill", (d, i) => color(i))
  .selectAll("circle")
  .data(d => d.values).enter()
  .append("g")
  .attr("class", "circle")  
  .on("mouseover", function(d) {
      d3.select(this)     
        .style("cursor", "pointer")
        .append("text")
        .attr("class", "text")
        .text(`${d.price}`)
        .attr("x", d => xScale(d.date) + 5)
        .attr("y", d => yScale(d.price) - 10);
    })
  .on("mouseout", function(d) {
      d3.select(this)
        .style("cursor", "none")  
        .transition()
        .duration(duration)
        .selectAll(".text").remove();
    })
  .append("circle")
  .attr("cx", d => xScale(d.date))
  .attr("cy", d => yScale(d.price))
  .attr("r", circleRadius)
  .style('opacity', circleOpacity)
  .on("mouseover", function(d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadiusHover);
      })
    .on("mouseout", function(d) {
        d3.select(this) 
          .transition()
          .duration(duration)
          .attr("r", circleRadius);  
      });


/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).ticks(4);
var yAxis = d3.axisLeft(yScale).ticks(5);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")
  .text("Total values");