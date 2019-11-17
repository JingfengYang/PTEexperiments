var data = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.64269" },
   { date: "0.25000", price: "0.67442" },
   { date: "0.50000", price: "0.69298" },
   { date: "1.00000", price: "0.71015" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.64668" },
   { date: "0.25000", price: "0.68192" },
   { date: "0.50000", price: "0.69349" },
   { date: "1.00000", price: "0.71015" },
    ]
  }
];

var width = window.innerWidth * 0.23;
var height = window.innerHeight * 0.23;
var margin = 60;
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
  .domain([0.125,1])
  .range([0, width-margin]);

var yScale = d3.scaleLinear()
  .domain([0.64, 0.72])
  .range([height-margin, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

/* Add SVG */
var svg = d3.select("#mult-line-a-mr-1").append("svg")
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

    svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("LR-MR");


/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale).tickValues([0.64, 0.72]).tickFormat(d3.format(",.2f"));

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







































































////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




































var data2 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.63498" },
   { date: "0.25000", price: "0.66626" },
   { date: "0.50000", price: "0.70302" },
   { date: "1.00000", price: "0.73304" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.63678" },
   { date: "0.25000", price: "0.66697" },
   { date: "0.50000", price: "0.70558" },
   { date: "1.00000", price: "0.73304" },
    ]
  }
];

var yScale2 = d3.scaleLinear()
  .domain([0.63, 0.74])
  .range([height-margin, 0]);

/* Format Data */
data2.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg2 = d3.select("#mult-line-a-dblp-1").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line2 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale2(d.price));

let lines2 = svg2.append('g')
  .attr('class', 'lines');

lines2.selectAll('.line-group')
  .data(data2).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg2.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg2.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line2(d.values))
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
lines2.selectAll("circle-group")
  .data(data2).enter()
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
        .attr("y", d => yScale2(d.price) - 10);
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
  .attr("cy", d => yScale2(d.price))
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

    svg2.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("LR-DBLP");


/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale2).tickValues([0.63, 0.65, 0.7, 0.74]).tickFormat(d3.format(",.2f"));

svg2.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg2.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")












////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


































var data3 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.68809" },
   { date: "0.25000", price: "0.76244" },
   { date: "0.50000", price: "0.79785" },
   { date: "1.00000", price: "0.82977" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.70279" },
   { date: "0.25000", price: "0.77019" },
   { date: "0.50000", price: "0.80154" },
   { date: "1.00000", price: "0.82977" },
    ]
  }
];

var yScale3 = d3.scaleLinear()
  .domain([0.68, 0.83])
  .range([height-margin, 0]);

/* Format Data */
data3.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg3 = d3.select("#mult-line-a-20ng-1").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line3 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale3(d.price));

let lines3 = svg3.append('g')
  .attr('class', 'lines');

lines3.selectAll('.line-group')
  .data(data3).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg3.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg3.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line3(d.values))
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
lines3.selectAll("circle-group")
  .data(data3).enter()
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
        .attr("y", d => yScale3(d.price) - 10);
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
  .attr("cy", d => yScale3(d.price))
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

    svg3.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("LR-20NG");

/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale3).tickValues([0.68, 0.75, 0.83]).tickFormat(d3.format(",.2f"));

svg3.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg3.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")




































///////////////////////////////////////////////////////////////////////////////////////////////////////



































var data4 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.64350" },
   { date: "0.25000", price: "0.67530" },
   { date: "0.50000", price: "0.69330" },
   { date: "1.00000", price: "0.71047" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.64688" },
   { date: "0.25000", price: "0.68261" },
   { date: "0.50000", price: "0.69358" },
   { date: "1.00000", price: "0.71047" },
    ]
  }
];

var yScale4 = d3.scaleLinear()
  .domain([0.64, 0.72])
  .range([height-margin, 0]);

/* Format Data */
data4.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg4 = d3.select("#mult-line-i-mr-1").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line4 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale4(d.price));

let lines4 = svg4.append('g')
  .attr('class', 'lines');

lines4.selectAll('.line-group')
  .data(data4).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg4.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg4.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line4(d.values))
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
lines4.selectAll("circle-group")
  .data(data4).enter()
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
        .attr("y", d => yScale4(d.price) - 10);
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
  .attr("cy", d => yScale4(d.price))
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

    svg4.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("LR-MR");

/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale4).tickValues([0.64, 0.68, 0.72]).tickFormat(d3.format(",.2f"));

svg4.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg4.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")






































///////////////////////////////////////////////










var data5 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.68375" },
   { date: "0.25000", price: "0.71225" },
   { date: "0.50000", price: "0.74195" },
   { date: "1.00000", price: "0.76870" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.68650" },
   { date: "0.25000", price: "0.71375" },
   { date: "0.50000", price: "0.74505" },
   { date: "1.00000", price: "0.76870" },
    ]
  }
];

var yScale5 = d3.scaleLinear()
  .domain([0.68, 0.77])
  .range([height-margin, 0]);

/* Format Data */
data5.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg5 = d3.select("#mult-line-i-dblp-1").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line5 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale5(d.price));

let lines5 = svg5.append('g')
  .attr('class', 'lines');

lines5.selectAll('.line-group')
  .data(data5).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg5.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg5.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line5(d.values))
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
lines5.selectAll("circle-group")
  .data(data5).enter()
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
        .attr("y", d => yScale5(d.price) - 10);
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
  .attr("cy", d => yScale5(d.price))
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

    svg5.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("LR-DBLP");


/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale5).tickValues([0.68, 0.72, 0.77]).tickFormat(d3.format(",.2f"));

svg5.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg5.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")




























///////////////////////////////////////////////



















var data6 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.69689" },
   { date: "0.25000", price: "0.77124" },
   { date: "0.50000", price: "0.80629" },
   { date: "1.00000", price: "0.83749" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.71216" },
   { date: "0.25000", price: "0.77894" },
   { date: "0.50000", price: "0.81028" },
   { date: "1.00000", price: "0.83749" },
    ]
  }
];

var yScale6 = d3.scaleLinear()
  .domain([0.69, 0.84])
  .range([height-margin, 0]);

/* Format Data */
data6.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg6 = d3.select("#mult-line-i-20ng-1").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line6 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale6(d.price));

let lines6 = svg6.append('g')
  .attr('class', 'lines');

lines6.selectAll('.line-group')
  .data(data6).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg6.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg6.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line6(d.values))
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
lines6.selectAll("circle-group")
  .data(data6).enter()
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
        .attr("y", d => yScale6(d.price) - 10);
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
  .attr("cy", d => yScale6(d.price))
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

    svg6.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("LR-20NG");

/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale6).tickValues([0.69, 0.75, 0.84]).tickFormat(d3.format(",.2f"));

svg6.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg6.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")







































//////////////////////////////////////////////////////////////////////////////////////////////////////////





















var data7 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.62057" },
   { date: "0.25000", price: "0.65463" },
   { date: "0.50000", price: "0.67236" },
   { date: "1.00000", price: "0.70626" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.64005" },
   { date: "0.25000", price: "0.66703" },
   { date: "0.50000", price: "0.68147" },
   { date: "1.00000", price: "0.70626" },
    ]
  }
];

var yScale7 = d3.scaleLinear()
  .domain([0.62, 0.71])
  .range([height-margin, 0]);

/* Format Data */
data7.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg7 = d3.select("#mult-line-a-mr-2").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line7 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale7(d.price));

let lines7 = svg7.append('g')
  .attr('class', 'lines');

lines7.selectAll('.line-group')
  .data(data7).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg7.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg7.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line7(d.values))
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
lines7.selectAll("circle-group")
  .data(data7).enter()
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
        .attr("y", d => yScale7(d.price) - 10);
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
  .attr("cy", d => yScale7(d.price))
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

    svg7.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("CNN-MR");

/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale7).tickValues([0.62, 0.65, 0.71]).tickFormat(d3.format(",.2f"));

svg7.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg7.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")







































//////////////////////////////////////////////////////////////////////////////////////////////////////////





















var data8 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.63242" },
   { date: "0.25000", price: "0.67759" },
   { date: "0.50000", price: "0.71380" },
   { date: "1.00000", price: "0.73090" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.65863" },
   { date: "0.25000", price: "0.69342" },
   { date: "0.50000", price: "0.71807" },
   { date: "1.00000", price: "0.73090" },
    ]
  }
];

var yScale8 = d3.scaleLinear()
  .domain([0.6, 0.74])
  .range([height-margin, 0]);

/* Format Data */
data8.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg8 = d3.select("#mult-line-a-dblp-2").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line8 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale8(d.price));

let lines8 = svg8.append('g')
  .attr('class', 'lines');

lines8.selectAll('.line-group')
  .data(data8).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg8.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg8.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line8(d.values))
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
lines8.selectAll("circle-group")
  .data(data8).enter()
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
        .attr("y", d => yScale8(d.price) - 10);
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
  .attr("cy", d => yScale8(d.price))
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

    svg8.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("CNN-DBLP");

/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale8).tickValues([0.6, 0.7, 0.74]).tickFormat(d3.format(",.2f"));

svg8.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg8.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")







































//////////////////////////////////////////////////////////////////////////////////////////////////////////





















var data9 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.64247" },
   { date: "0.25000", price: "0.73920" },
   { date: "0.50000", price: "0.78153" },
   { date: "1.00000", price: "0.82220" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.67585" },
   { date: "0.25000", price: "0.74057" },
   { date: "0.50000", price: "0.79352" },
   { date: "1.00000", price: "0.82220" },
    ]
  }
];

var yScale9 = d3.scaleLinear()
  .domain([0.6, 0.83])
  .range([height-margin, 0]);

/* Format Data */
data9.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg9 = d3.select("#mult-line-a-20ng-2").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line9 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale9(d.price));

let lines9 = svg9.append('g')
  .attr('class', 'lines');

lines9.selectAll('.line-group')
  .data(data9).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg9.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg9.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line9(d.values))
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
lines9.selectAll("circle-group")
  .data(data9).enter()
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
        .attr("y", d => yScale9(d.price) - 10);
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
  .attr("cy", d => yScale9(d.price))
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

    svg9.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("CNN-20NG");

/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale9).tickValues([0.6, 0.7, 0.83]).tickFormat(d3.format(",.2f"));

svg9.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg9.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")







































//////////////////////////////////////////////////////////////////////////////////////////////////////////





















var data10 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.62493" },
   { date: "0.25000", price: "0.65476" },
   { date: "0.50000", price: "0.67304" },
   { date: "1.00000", price: "0.70653" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.64041" },
   { date: "0.25000", price: "0.66798" },
   { date: "0.50000", price: "0.68149" },
   { date: "1.00000", price: "0.70653" },
    ]
  }
];

var yScale10 = d3.scaleLinear()
  .domain([0.6, 0.71])
  .range([height-margin, 0]);

/* Format Data */
data10.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg10 = d3.select("#mult-line-i-mr-2").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line10 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale10(d.price));

let lines10 = svg10.append('g')
  .attr('class', 'lines');

lines10.selectAll('.line-group')
  .data(data10).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg10.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg10.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line10(d.values))
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
lines10.selectAll("circle-group")
  .data(data10).enter()
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
        .attr("y", d => yScale10(d.price) - 10);
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
  .attr("cy", d => yScale10(d.price))
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

    svg10.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("CNN-MR");

/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale10).tickValues([0.6, 0.65, 0.71]).tickFormat(d3.format(",.2f"));

svg10.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg10.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")







































//////////////////////////////////////////////////////////////////////////////////////////////////////////





















var data11 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.68245" },
   { date: "0.25000", price: "0.71905" },
   { date: "0.50000", price: "0.75015" },
   { date: "1.00000", price: "0.76790" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.70420" },
   { date: "0.25000", price: "0.73370" },
   { date: "0.50000", price: "0.75465" },
   { date: "1.00000", price: "0.76790" },
    ]
  }
];

var yScale11 = d3.scaleLinear()
  .domain([0.68, 0.77])
  .range([height-margin, 0]);

/* Format Data */
data11.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg11 = d3.select("#mult-line-i-dblp-2").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line11 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale11(d.price));

let lines11 = svg11.append('g')
  .attr('class', 'lines');

lines11.selectAll('.line-group')
  .data(data11).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg11.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg11.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line11(d.values))
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
lines11.selectAll("circle-group")
  .data(data11).enter()
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
        .attr("y", d => yScale11(d.price) - 10);
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
  .attr("cy", d => yScale11(d.price))
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

    svg11.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("CNN-DBLP");

/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale11).tickValues([0.68, 0.73, 0.77]).tickFormat(d3.format(",.2f"));

svg11.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg11.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")







































//////////////////////////////////////////////////////////////////////////////////////////////////////////





















var data12 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.64790" },
   { date: "0.25000", price: "0.74522" },
   { date: "0.50000", price: "0.78744" },
   { date: "1.00000", price: "0.82714" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.68070" },
   { date: "0.25000", price: "0.74562" },
   { date: "0.50000", price: "0.79753" },
   { date: "1.00000", price: "0.82714" },
    ]
  }
];

var yScale12 = d3.scaleLinear()
  .domain([0.64, 0.83])
  .range([height-margin, 0]);

/* Format Data */
data12.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg12 = d3.select("#mult-line-i-20ng-2").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line12 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale12(d.price));

let lines12 = svg12.append('g')
  .attr('class', 'lines');

lines12.selectAll('.line-group')
  .data(data12).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg12.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg12.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line12(d.values))
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
lines12.selectAll("circle-group")
  .data(data12).enter()
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
        .attr("y", d => yScale12(d.price) - 10);
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
  .attr("cy", d => yScale12(d.price))
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

    svg12.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("CNN-20NG");

/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale12).tickValues([0.64, 0.7, 0.83]).tickFormat(d3.format(",.2f"));

svg12.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg12.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")







































//////////////////////////////////////////////////////////////////////////////////////////////////////////





















var data13 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.65664" },
   { date: "0.25000", price: "0.69514" },
   { date: "0.50000", price: "0.70500" },
   { date: "1.00000", price: "0.74444" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.66129" },
   { date: "0.25000", price: "0.70598" },
   { date: "0.50000", price: "0.71309" },
   { date: "1.00000", price: "0.74444" },
    ]
  }
];

var yScale13 = d3.scaleLinear()
  .domain([0.65, 0.75])
  .range([height-margin, 0]);

/* Format Data */
data13.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg13 = d3.select("#mult-line-a-mr-3").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line13 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale13(d.price));

let lines13 = svg13.append('g')
  .attr('class', 'lines');

lines13.selectAll('.line-group')
  .data(data13).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg13.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg13.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line13(d.values))
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
lines13.selectAll("circle-group")
  .data(data13).enter()
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
        .attr("y", d => yScale13(d.price) - 10);
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
  .attr("cy", d => yScale13(d.price))
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

    svg13.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("SVM-MR");

/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale13).tickValues([0.65, 0.7, 0.75]).tickFormat(d3.format(",.2f"));

svg13.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg13.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")







































//////////////////////////////////////////////////////////////////////////////////////////////////////////





















var data14 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.65294" },
   { date: "0.25000", price: "0.69028" },
   { date: "0.50000", price: "0.72575" },
   { date: "1.00000", price: "0.75302" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.67199" },
   { date: "0.25000", price: "0.70285" },
   { date: "0.50000", price: "0.72984" },
   { date: "1.00000", price: "0.75302" },
    ]
  }
];

var yScale14 = d3.scaleLinear()
  .domain([0.65, 0.76])
  .range([height-margin, 0]);

/* Format Data */
data14.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg14 = d3.select("#mult-line-a-dblp-3").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line14 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale14(d.price));

let lines14 = svg14.append('g')
  .attr('class', 'lines');

lines14.selectAll('.line-group')
  .data(data14).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg14.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg14.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line14(d.values))
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
lines14.selectAll("circle-group")
  .data(data14).enter()
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
        .attr("y", d => yScale14(d.price) - 10);
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
  .attr("cy", d => yScale14(d.price))
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

    svg14.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("SVM-DBLP");

/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale14).tickValues([0.65, 0.7, 0.76]).tickFormat(d3.format(",.2f"));

svg14.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg14.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")







































//////////////////////////////////////////////////////////////////////////////////////////////////////////





















var data15 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.14772" },
   { date: "0.25000", price: "0.43270" },
   { date: "0.50000", price: "0.64216" },
   { date: "1.00000", price: "0.73863" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.12605" },
   { date: "0.25000", price: "0.42339" },
   { date: "0.50000", price: "0.64242" },
   { date: "1.00000", price: "0.73863" },
    ]
  }
];

var yScale15 = d3.scaleLinear()
  .domain([0.1, 0.74])
  .range([height-margin, 0]);

/* Format Data */
data15.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg15 = d3.select("#mult-line-a-20ng-3").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line15 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale15(d.price));

let lines15 = svg15.append('g')
  .attr('class', 'lines');

lines15.selectAll('.line-group')
  .data(data15).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg15.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg15.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line15(d.values))
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
lines15.selectAll("circle-group")
  .data(data15).enter()
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
        .attr("y", d => yScale15(d.price) - 10);
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
  .attr("cy", d => yScale15(d.price))
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

    svg15.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("SVM-20NG");

/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale15).tickValues([0.1, 0.3, 0.5, 0.74]).tickFormat(d3.format(",.2f"));

svg15.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg15.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")







































//////////////////////////////////////////////////////////////////////////////////////////////////////////





















var data16 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.65664" },
   { date: "0.25000", price: "0.69514" },
   { date: "0.50000", price: "0.70500" },
   { date: "1.00000", price: "0.74444" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.66129" },
   { date: "0.25000", price: "0.70598" },
   { date: "0.50000", price: "0.71309" },
   { date: "1.00000", price: "0.74444" },
    ]
  }
];

var yScale16 = d3.scaleLinear()
  .domain([0.65, 0.75])
  .range([height-margin, 0]);

/* Format Data */
data16.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg16 = d3.select("#mult-line-i-mr-3").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line16 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale16(d.price));

let lines16 = svg16.append('g')
  .attr('class', 'lines');

lines16.selectAll('.line-group')
  .data(data16).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg16.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg16.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line16(d.values))
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
lines16.selectAll("circle-group")
  .data(data16).enter()
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
        .attr("y", d => yScale16(d.price) - 10);
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
  .attr("cy", d => yScale16(d.price))
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

    svg16.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("SVM-MR");

/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale16).tickValues([0.65, 0.7, 0.75]).tickFormat(d3.format(",.2f"));

svg16.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg16.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")







































//////////////////////////////////////////////////////////////////////////////////////////////////////////





















var data17 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.70245" },
   { date: "0.25000", price: "0.73405" },
   { date: "0.50000", price: "0.76235" },
   { date: "1.00000", price: "0.78520" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.72055" },
   { date: "0.25000", price: "0.74470" },
   { date: "0.50000", price: "0.76510" },
   { date: "1.00000", price: "0.78520" },
    ]
  }
];

var yScale17 = d3.scaleLinear()
  .domain([0.7, 0.8])
  .range([height-margin, 0]);

/* Format Data */
data17.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg17 = d3.select("#mult-line-i-dblp-3").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line17 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale17(d.price));

let lines17 = svg17.append('g')
  .attr('class', 'lines');

lines17.selectAll('.line-group')
  .data(data17).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg17.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg17.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line17(d.values))
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
lines17.selectAll("circle-group")
  .data(data17).enter()
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
        .attr("y", d => yScale17(d.price) - 10);
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
  .attr("cy", d => yScale17(d.price))
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

    svg17.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("SVM-DBLP");

/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale17).tickValues([0.7, 0.75, 0.8]).tickFormat(d3.format(",.2f"));

svg17.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg17.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")







































//////////////////////////////////////////////////////////////////////////////////////////////////////////





















var data18 = [
  {
    name: "non-ww",
    values: [
      { date: "0.12500", price: "0.19942" },
   { date: "0.25000", price: "0.48898" },
   { date: "0.50000", price: "0.66981" },
   { date: "1.00000", price: "0.75863" },
    ]
  },
  {
    name: "ww",
    values: [
      { date: "0.12500", price: "0.18070" },
   { date: "0.25000", price: "0.48340" },
   { date: "0.50000", price: "0.67087" },
   { date: "1.00000", price: "0.75863" },
    ]
  }
];

var yScale18 = d3.scaleLinear()
  .domain([0.18, 0.76])
  .range([height-margin, 0]);

/* Format Data */
data18.forEach(function(d) {
  d.values.forEach(function(d) {
    d.date = +d.date;
    d.price = +d.price;
  });
});

/* Add SVG */
var svg18 = d3.select("#mult-line-i-20ng-3").append("svg")
  .attr("width", (width+margin)+"px")
  .attr("height", (height+margin)+"px")
  .append('g')
  .attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line18 = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale18(d.price));

let lines18 = svg18.append('g')
  .attr('class', 'lines');

lines18.selectAll('.line-group')
  .data(data18).enter()
  .append('g')
  .attr('class', 'line-group')
  .on("mouseover", function(d, i) {
      svg18.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "left")
        .attr("x", (width - margin)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg18.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  .attr('d', d => line18(d.values))
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
lines18.selectAll("circle-group")
  .data(data18).enter()
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
        .attr("y", d => yScale18(d.price) - 10);
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
  .attr("cy", d => yScale18(d.price))
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

    svg18.append("text")
      .attr("x", (width / 2))
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("SVM-20NG");

/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).tickValues([0.125,0.25,0.5,1]).tickFormat(d3.format(",.3f"));
var yAxis = d3.axisLeft(yScale18).tickValues([0.18, 0.3, 0.5, 0.7, 0.76]).tickFormat(d3.format(",.2f"));

svg18.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height-margin})`)
  .call(xAxis);

svg18.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")