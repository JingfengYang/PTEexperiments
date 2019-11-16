var margin = {top: 100, right: 100, bottom: 100, left: 100}
  , width = window.innerWidth * 7 / 10 - margin.left - margin.right
  , height = window.innerHeight * 3 / 4 - margin.top - margin.bottom;

data = d3.dsv(",", "output/embed-vis-mr-train.csv", function(d) {
            return {
                x: +d["x"],
                y: +d["y"],
                label: +d["label"]
            };
        }).then(function(data) {

  var min_x = 0, max_x = 0, min_y = 0, max_y = 0;

  data.forEach(function(point) {
    if (min_x === 0) {
      min_x = point.x;
      min_y = point.y;
      max_x = point.x;
      max_y = point.y;
    } else {
      if (point.x > max_x) {
        max_x = point.x;
      }
      if (point.x < min_x) {
        min_x = point.x;
      }
      if (point.y > max_y) {
        max_y = point.y;
      }
      if (point.y < min_y) {
        min_y = point.y;
      }
    }
  });


  var xScale = d3.scaleLinear()
      .domain([min_x, max_x])
      .range([0, width]);

  var yScale = d3.scaleLinear()
      .domain([min_y, max_y])
      .range([height, 0]);

  var svg1 = d3.select("#scatter-mr").append("svg")
      .attr("id", "mr-line-dblp")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg1.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("x", - height / 2)
      .attr("y", - 60)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Component 2");

  svg1.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .text("Component 1");

  svg1.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("mr dataset");

  var line_five = d3.line()
      .x(function(d, i) {return xScale(d.x); }) // set the x values for the line generator
      .y(function(d) {return yScale(d.y); }); // set the y values for the line generator

  svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

  svg1.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft


  svg1.selectAll().data(data).enter().append("circle").attr("id", function(d, i) { return d.x + '-' + d.y}).attr("class", "dot").attr("cx", function(d, i) { return xScale(d.x); }).attr("cy", function(d, i) { return yScale(d.y) }).attr("stroke", function(d, i) { if (d.label === 0) { return "steelblue" } else { return "#FFC300" }}).style("fill", "white").attr("r", 1.5);

  svg1.append("rect").attr("x", width + 20).attr("y", 0).attr("height", 12).attr("width", 24).style("fill", "steelblue")
  svg1.append("text").attr("x", width + 50).attr("y", 10).text("label 0").style("font-size", 12).style("font-weight", "bold")
  svg1.append("rect").attr("x", width + 20).attr("y", 20).attr("height", 12).attr("width", 24).style("fill", "#FFC300")
  svg1.append("text").attr("x", width + 50).attr("y", 30).text("label 1").style("font-size", 12).style("font-weight", "bold")

});
