// @flow
import React, { Component } from 'react';
import Commits from '../components/Commits/';

type Props = {};

export default class CommitsPage extends Component<Props> {
  props: Props;

  render() {
    return <Commits />;
  }
}