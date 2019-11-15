d3.text("dblp_workspace/ww.net", function(text) {
  var data = d3.csvParseRows(text).map(function(row) {
    return row.map(function(value, index) {
      if (index == 2) { return +value; }
      else { return value;}
    });
  });
}).then(function(text) {
    var data = d3.tsvParseRows(text, function(d, i) {
      return {
        source: d[0], // convert first colum column to Date
        target: d[1],
        weight: +d[2]
      };
    });

    console.log(typeof data)

    var nodes = {};

    var maxWeight = 0;

    data.forEach(function(d) {
        d.source = nodes[d.source] || (nodes[d.source] = {name: d.source});
        d.target = nodes[d.target] || (nodes[d.target] = {name: d.target});
        if (d.weight > maxWeight) {
            maxWeight = d.weight;
        }
    });

    var widthScale = d3.scaleLinear().domain(1, maxWeight).range([1, 5]);
    var width = window.innerWidth * 3 / 5,
        height = window.innerHeight * 3 / 4;

    var force = d3.forceSimulation()
                  .nodes(d3.values(nodes))
                  .force("link", d3.forceLink(data).distance(100))
                  .force('center', d3.forceCenter(width / 2, height / 2))
                  .force("x", d3.forceX())
                  .force("y", d3.forceY())
                  .force("charge", d3.forceManyBody().strength(-250))
                  .alphaTarget(1)
                  .on("tick", tick);

    var svg = d3.select("#word-label").append("svg")
                .attr("width", width)
                .attr("height", height);

    var path = svg.append("g")
                 .selectAll("path")
                 .data(data)
                 .enter()
                 .append("path")
                 .attr("stroke", "black")
                 .attr("stroke-width", function(d) { return widthScale(d.weight)})
                 .attr("fill", "none");

    var node = svg.selectAll(".node")
     .data(force.nodes())
     .enter().append("g")
     .attr("class", "node")
     .call(d3.drag()
     .on("start", dragstarted)
     .on("drag", dragged)
     .on("end", dragended)
    );

    node.append("circle")
     .attr("r", 13)
     .attr("fill", "white");

    node.append("text")
     .style("text-anchor", "middle")
     .text(function(item, index, array) {return item.name})
     .attr("fill", "black")  //TODO: Change the label color
     .attr("font-size", 10)
     .attr("font-family", "sans-serif");

    function tick() {
     path.attr("d", function(d) {
         var dx = d.target.x - d.source.x,
             dy = d.target.y - d.source.y;
         return "M" + d.source.x + " " + d.source.y + " " + "L" + d.target.x + " " + d.target.y;
     });

     node.attr("transform", function(d) {
     return "translate(" + d.x + "," + d.y + ")"; })
    };

    function dragstarted(d) {
     if (!d3.event.active) force.alphaTarget(0.3).restart();
     d.fx = d.x;
     d.fy = d.y;
    };

    function dragged(d) {
     d.fx = d3.event.x;
     d.fy = d3.event.y;
    };

    function dragended(d) {
     if (!d3.event.active) force.alphaTarget(0);
     if (d.fixed == true) { d.fx = d.x; d.fy = d.y; }
     else { d.fx = null; d.fy = null; }
    };
});
