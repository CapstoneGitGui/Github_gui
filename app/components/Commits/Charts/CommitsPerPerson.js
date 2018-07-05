import React, { Component } from 'react';
import * as d3 from 'd3';
import { withFauxDOM } from 'react-faux-dom';
import { connect } from 'react-redux';
import { fetchCommitActivity } from '../../../reducers/commitActivity';

class CommitsPerPerson extends Component {
  state = {
    week: 0,
    data: [],
  };

  // static getDerivedStateFromProps(nextProps) {
  //   return {
  //     week: nextProps.commitActivity.length - 1,
  //     data: nextProps.commitActivity,
  //   };
  // }

  componentWillMount() {
    let data = [0, 0, 0, 0];
    if (this.props.commitActivity.length) {
      data = this.props.commitActivity[
        this.choosingIndex(this.props.commitActivity)
      ];
      data = data.days;
    }

    // const data = [0, 19, 2, 4, 5, 6, 7];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    // Variables
    const w = 500;
    const h = 100;
    const axisPadding = 30;
    const padding = 1;

    const faux = this.props.connectFauxDOM('div', 'commitChart');
    d3.select(faux).append('div');

    // Creating Scales
    const xScale = d3
      .scaleLinear()
      .domain([1, 7])
      .range([padding, w - axisPadding - padding * 70]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d)])
      .range([h - padding, padding]);

    const colourScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d)])
      .range([50, 255]);

    const xAxis = d3
      .axisBottom()
      .scale(xScale)
      .tickFormat((d, i) => days[i])
      .tickValues([1, 2, 3, 4, 5, 6, 7])
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

    // const svg = d3
    //   .select('body')
    //   .append('svg')
    //   .attr('width', w)
    //   .attr('height', h)
    //   .attr('class', 'svg');

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * ((w - 30) / 7) + axisPadding)
      .attr('y', d => yScale(d))
      .attr('width', (w - 30) / 7 - padding)
      .attr('height', d => h - yScale(d))
      .attr('fill', d => `rgba(0, 0, ${Math.round(colourScale(d))}, 1)`)
      .attr('position', 'absolute');

    svg
      .selectAll('text')
      .data(data)
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
        (d, i) => i * ((w - 30) / 7) + 30 + ((w - 30) / 7 - padding) / 2
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
      .attr(
        'transform',
        `translate(${axisPadding + w / 7 / 2}, ${h - padding})`
      )
      .call(xAxis);

    this.props.animateFauxDOM(800);
  }

  // handleChange = event => {
  //   if (this.state.week !== event.target.value) {
  //     this.setState({
  //       week: event.target.value,
  //     });
  //   }
  // };

  choosingIndex = array => {
    let i = array.length - 1;
    while (i >= 0) {
      if (array[i].total > 0) {
        return i;
      }
      i -= 1;
    }
    return i;
  };

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <div>Commits per day This Week</div>
        {/* <select onChange={this.handleChange}>
          {this.props.commitActivity.map((obj, i) => {
            return (
              <option key={i} value={i}>
                {i}
              </option>
            );
          })}
        </select> */}
        <br />
        <div className="renderedD3">{this.props.commitChart}</div>
      </div>
    );
  }
}

CommitsPerPerson.defaultProps = {
  chart: 'loading',
};

const mapStateToProps = state => ({
  commitActivity: state.commitActivity,
  repo: state.selectedRepo,
  userName: state.auth.currentUser.username,
});

const mapDispatchToProps = dispatch => ({
  fetchCommitActivity: (userName, repo, token) =>
    dispatch(fetchCommitActivity(userName, repo, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFauxDOM(CommitsPerPerson));
