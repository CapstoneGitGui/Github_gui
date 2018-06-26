//Width and height
var w = 500;
var h = 200;
const axisPadding = 30;
var padding = 1;

const userCommits = {
  blake: 10,
  michael: 20,
  marino: 30,
  daniel: 1,
  roger: 70,
  jenny: 100,
  dick: 20,
  james: 10,
  steven: 200,
  chicken: 800,
};

const names = [];
const commits = [];
const tickValues = [];
for (let user in userCommits) {
  names.push(user);
  commits.push(userCommits[user]);
}
for (let i = 0; i < commits.length; i++) {
  tickValues.push(i + 0.5);
}

// Creating Scales and Axis

const xScale = d3
  .scaleLinear()
  .domain([0, commits.length])
  .range([padding, w - 30 - padding * 2]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(commits, d => d)])
  .range([h - padding, padding]);

const colourScale = d3
  .scaleLinear()
  .domain([0, d3.max(commits, d => d)])
  .range([0, 255]);

const xAxis = d3
  .axisBottom()
  .scale(xScale)
  .tickFormat((d, i) => names[i])
  .tickValues(tickValues)
  .tickSizeOuter(0);

const yAxis = d3
  .axisLeft()
  .scale(yScale)
  .ticks(5);

//Create SVG element
var svg = d3
  .select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

svg
  .selectAll('rect')
  .data(commits)
  .enter()
  .append('rect')
  .attr('x', function(d, i) {
    return i * ((w - 30) / commits.length) + axisPadding;
  })
  .attr('y', function(d) {
    return yScale(d);
  })
  .attr('width', (w - 30) / commits.length - padding)
  .attr('height', d => h - yScale(d))
  .attr('fill', function(d) {
    return `rgb(0, 0, ${colourScale(Math.round(d * 10))})`;
  });

svg
  .selectAll('text')
  .data(commits)
  .enter()
  .append('text')
  .text(function(d) {
    if (h - yScale(d) > 15) {
      return d;
    }
  })
  .attr('text-anchor', 'middle')
  .attr('x', function(d, i) {
    return (
      i * ((w - 30) / commits.length) +
      30 +
      ((w - 30) / commits.length - padding) / 2
    );
  })
  .attr('y', function(d) {
    return yScale(d) + 14;
  })
  .attr('font-family', 'sans-serif')
  .attr('font-size', '11px')
  .attr('fill', 'white');

svg
  .append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(${axisPadding}, 0)`)
  .call(yAxis);

svg
  .append('g')
  .attr('class', 'axis')
  .attr('transform', `translate(${axisPadding}, ${h - padding})`)
  .call(xAxis);

import React, { Component } from 'react';

class BarChartCommits extends Component {
  render() {
    return <svg width="500" height="200" className="barchart-commits" />;
  }
}
