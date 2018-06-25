// @flow
import React, { Component } from 'react';
import LocalGit from '../components/Local/LocalGit';

type Props = {};

export default class LocalGitView extends Component<Props> {
  props: Props;

  render() {
    return <LocalGit />;
  }
}
