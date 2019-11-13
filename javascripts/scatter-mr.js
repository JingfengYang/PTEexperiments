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

});
