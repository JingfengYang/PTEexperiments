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

});
