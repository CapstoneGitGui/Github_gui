// @flow
import React, { Component } from 'react';
import Patches from '../components/Patch/Patches';

type Props = {};

export default class PatchPage extends Component<Props> {
  props: Props;

  render() {
    return <Patches {...this.props} />;
  }
}
