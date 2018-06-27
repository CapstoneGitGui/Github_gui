// @flow
import React, { Component } from 'react';
import CommitTree from '../components/Repo/CommitTree';

type Props = {};

export default class CommitTreePage extends Component<Props> {
  props: Props;

  render() {
    return <CommitTree {...this.props} />;
  }
}
