import React, { Component } from 'react';
import * as d3 from 'd3';
import { withFauxDOM } from 'react-faux-dom';
import { connect } from 'react-redux';

class BarChart extends Component {
  componentDidMount() {
    // DUMMY DATA
    // const userCommits = {
    //   blake: 10,
    //   michael: 20,
    //   marino: 30,
    //   daniel: 500,
    //   dick: 20,
    //   james: 10,
    //   vicky: 100,
    // };
    let userCommits = {};
    let data = {};
    if (this.props.branchCommits && this.props.branchCommits.length) {
      userCommits = this.findCommitsPerUser(this.props.branchCommits);
      data = this.formatData(userCommits);
      // Variables
      const w = 500;
      const h = 100;
      const axisPadding = 30;
      const padding = 1;

      const faux = this.props.connectFauxDOM('div', 'chart');
      d3.select(faux).append('div');

      // Creating Scales
      const xScale = d3
        .scaleLinear()
        .domain([0, data.commits.length])
        .range([padding, w - 30 - padding * 2]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data.commits, d => d)])
        .range([h - padding, padding]);

      const colourScale = d3
        .scaleLinear()
        .domain([0, d3.max(data.commits, d => d)])
        .range([50, 255]);

      const xAxis = d3
        .axisBottom()
        .scale(xScale)
        .tickFormat((d, i) => data.names[i])
        .tickValues(data.tickValues)
        .tickSizeOuter(0);

      const yAxis = d3
        .axisLeft()
        .scale(yScale)
        .ticks(5);
      // Creating svg
      const svg = d3
        .select(faux)
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('class', 'svg');

      svg
        .selectAll('rect')
        .data(data.commits)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * ((w - 30) / data.commits.length) + axisPadding)
        .attr('y', d => yScale(d))
        .attr('width', (w - 30) / data.commits.length - padding)
        .attr('height', d => h - yScale(d))
        .attr('fill', d =>
          `rgb(0, 0, ${Math.round(colourScale(d))})`;
        )
        .attr('position', 'absolute');

      console.log('HEY HEY COLOUR SCALE', colourScale(1));

      svg
        .selectAll('text')
        .data(data.commits)
        .enter()
        .append('text')
        .text(d => {
          if (h - yScale(d) > 15) {
            return d;
          }
        })
        .attr('text-anchor', 'middle')
        .attr(
          'x',
          (d, i) =>
            i * ((w - 30) / data.commits.length) +
            30 +
            ((w - 30) / data.commits.length - padding) / 2
        )
        .attr('y', d => yScale(d) + 14)
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

      this.props.animateFauxDOM(800);
    }
  }

  formatData = userCommits => {
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
    return { names, commits, tickValues };
  };

  findUser = commits => {
    const users = {};
    commits.forEach(commit => {
      users[commit.commit.author.name] = 0;
    });
    return users;
  };

  findCommitsPerUser = commits => {
    const users = this.findUser(commits);
    for (let user in users) {
      commits.forEach(commit => {
        if (user === commit.commit.author.name) {
          users[user] += 1;
        }
      });
    }
    return users;
  };
  render() {
    return (
      <div>
        <div style={{ color: 'black' }}>Commits / Person</div>
        <br />
        <div className="renderedD3">{this.props.chart}</div>
      </div>
    );
  }
}

BarChart.defaultProps = {
  chart: 'loading',
};

const mapStateToProps = state => ({
  branchCommits: state.branchCommits,
});

export default connect(
  mapStateToProps,
  null
)(withFauxDOM(BarChart));
