var data = [
  {
    name: "LR-embed-vis-mr-non-ww-Fmicro",
    values: [
      { date: "0.12500", price: "0.64350" },
   { date: "0.25000", price: "0.67530" },
   { date: "0.50000", price: "0.69330" },
   { date: "1.00000", price: "0.71047" },
    ]
  },
  {
    name: "LR-embed-vis-mr-ww-Fmicro",
    values: [
      { date: "0.12500", price: "0.64688" },
   { date: "0.25000", price: "0.68261" },
   { date: "0.50000", price: "0.69358" },
   { date: "1.00000", price: "0.71047" },
    ]
  },
  {
    name: "LR_embed-vis-20ng-non-ww-Fmacro",
    values: [
      { date: "0.12500", price: "0.68809" },
   { date: "0.25000", price: "0.76244" },
   { date: "0.50000", price: "0.79785" },
   { date: "1.00000", price: "0.82977" },
    ]
  },
  {
    name: "LR_embed-vis-20ng-non-ww-Fmicro",
    values: [
      { date: "0.12500", price: "0.69689" },
   { date: "0.25000", price: "0.77124" },
   { date: "0.50000", price: "0.80629" },
   { date: "1.00000", price: "0.83749" },
    ]
  },
  {
    name: "LR_embed-vis-20ng-ww-Fmacro",
    values: [
      { date: "0.12500", price: "0.70279" },
   { date: "0.25000", price: "0.77019" },
   { date: "0.50000", price: "0.80154" },
   { date: "1.00000", price: "0.82977" },
    ]
  },
  {
    name: "LR_embed-vis-20ng-ww-Fmicro",
    values: [
      { date: "0.12500", price: "0.71216" },
   { date: "0.25000", price: "0.77894" },
   { date: "0.50000", price: "0.81028" },
   { date: "1.00000", price: "0.83749" },
    ]
  },
  {
    name: "LR_embed-vis-dblp-non-ww-Fmacro",
    values: [
      { date: "0.12500", price: "0.63498" },
   { date: "0.25000", price: "0.66626" },
   { date: "0.50000", price: "0.70302" },
   { date: "1.00000", price: "0.73304" },
    ]
  },
  {
    name: "LR_embed-vis-dblp-non-ww-Fmicro",
    values: [
      { date: "0.12500", price: "0.68375" },
   { date: "0.25000", price: "0.71225" },
   { date: "0.50000", price: "0.74195" },
   { date: "1.00000", price: "0.76870" },
    ]
  },
  {
    name: "LR_embed-vis-dblp-ww-Fmacro",
    values: [
      { date: "0.12500", price: "0.63678" },
   { date: "0.25000", price: "0.66697" },
   { date: "0.50000", price: "0.70558" },
   { date: "1.00000", price: "0.73304" },
    ]
  },
  {
    name: "LR_embed-vis-dblp-ww-Fmicro",
    values: [
      { date: "0.12500", price: "0.68650" },
   { date: "0.25000", price: "0.66697" },
   { date: "0.50000", price: "0.70558" },
   { date: "1.00000", price: "0.73304" },
    ]
  },
  {
    name: "LR_embed-vis-mr-non-ww-Fmacro",
    values: [
      { date: "0.12500", price: "0.64269" },
   { date: "0.25000", price: "0.67442" },
   { date: "0.50000", price: "0.69298" },
   { date: "1.00000", price: "0.71015" },
    ]
  },
  {
    name: "LR_embed-vis-mr-ww-Fmacro",
    values: [
      { date: "0.12500", price: "0.64668" },
   { date: "0.25000", price: "0.68192" },
   { date: "0.50000", price: "0.69349" },
   { date: "1.00000", price: "0.71015" },
    ]
  }
];

var width = window.innerWidth * 0.6;
var height = window.innerHeight * 0.6;
var margin = 50;
var duration = 250;

var lineOpacity = "0.5";
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
  .domain([0.63, 0.85])
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
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
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
