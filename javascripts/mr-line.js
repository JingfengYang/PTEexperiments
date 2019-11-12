var margin = {top: 100, right: 100, bottom: 100, left: 100}
  , width = 770- margin.left - margin.right
  , height = 640 - margin.top - margin.bottom;

data = d3.dsv(",", "output/logisticreg-mr.csv", function(d) {
            return {
                x: +d["x"],
                y: +d["y"]
            };
        }).then(function(data) {

  var svg1 = d3.select("#mr-line").append("svg")
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
      .text("Num of Earthquakes");

  svg1.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .text("Year");

  svg1.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Worldwide Earthquake stats 2000-2015");

  var timeScale = d3.scaleTime()
      .domain([data[0].year, data[data.length - 1].year]) // input
      .range([0, width]); // output

  var yScale = d3.scaleLinear()
      .domain([0, 2300]) // input
      .range([height, 0]); // output

  var line_five = d3.line()
      .x(function(d, i) {return timeScale(d.year); }) // set the x values for the line generator
      .y(function(d) {return yScale(d.five); }) // set the y values for the line generator
      .curve(d3.curveMonotoneX) // apply smoothing to the line

  svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(timeScale).tickFormat(d3.timeFormat("%Y"))); // Create an axis component with d3.axisBottom

  svg1.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

  svg1.append("path")
      .datum(data) // 10. Binds data to the line
      .attr("class", "line") // Assign a class for styling
      .attr("fill", "none")
      .attr("stroke", function(d) {return d3.rgb("#FFC300");})
      .attr("stroke-width", 2)
      .attr("d", line_five) // 11. Calls the line generator

  svg1.append("rect").attr("x", width + 20).attr("y", 0).attr("height", 12).attr("width", 24).style("fill", "#FFC300")
  svg1.append("text").attr("x", width + 50).attr("y", 0).text("5_5.9").attr("y", 10).style("font-size", 12).style("font-weight", "bold")
});