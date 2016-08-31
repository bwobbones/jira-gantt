'use strict';

/* Directives */

var minhrDirectives = angular.module('myApp.directives', []);

minhrDirectives.directive('appVersion', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
});

minhrDirectives.directive('demographics', function() {

  //constants
  var w = 200;
  var h = 200;

  return {
    restrict: 'E',
    scope: {
      items: '='
    },
    link: function(scope, element, attrs) {

      var width = 400,
          height = 400,
          radius = Math.min(width, height) / 2;

      var color = d3.scale.ordinal()
          .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

      var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(0);

      var pie = d3.layout.pie()
          .sort(null)
          .value(function(d) { return d.valueCount; });

      var svg = d3.select('div[ui-view="dataPanel"]').append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      scope.$watch('items', function(data, oldValue) {

        console.log('items updated');

        if (data[0] !== undefined && oldValue[0] !== undefined && data[0].valueCount == oldValue[0].valueCount) {
          return;
        }

        console.log(data);
        console.log(oldValue);

        data.forEach(function(d) {
          d.valueCount = +d.valueCount;
        });

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color(d.data.valueCount); });

        g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(function(d) { return d.data.label; });

       //  setInterval(function() {
       //   redraw(svg, pie, data, arc, color);
       // }, 2000);

      }, true);

    }

  }

});

// function redraw(svg, pie, data, arc, color) {
//   console.log("redrawing");
//   svg.selectAll("g")
//     .data(pie(data))
//     .attr("class", "arc");

//   svg.selectAll("path")
//         .data(pie(data))
//     .transition()
//         .duration(1000)
//         .attr("d", arc)
//         .style("fill", function(d) { return color(d.data.valueCount); });

//   svg.selectAll("text")
//         .data(pie(data))
//     .transition()
//         .duration(1000)
//         .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
//         .attr("dy", ".35em")
//         .style("text-anchor", "middle")
//         .text(function(d) { return d.data.label; });
// }


