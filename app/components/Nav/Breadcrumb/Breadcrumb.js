import React from 'react';
import { connect } from 'react-redux';
import NavItem from '../Aside/NavItem';

class Breadcrumb extends React.Component {
  renderBranchName(branch) {
    return branch.name
      ? branch.name
      : typeof branch === 'string'
        ? branch
        : !branch.head
          ? ''
          : branch.head.ref;
  }

  render() {
    const pathName = this.props.location.pathname.split('/');
    pathName.shift();
    const pathLength = pathName.length;
    const { branch, repo } = this.props;

    return (
      <header>
        {Object.keys(branch).length || typeof branch === 'string' ? (
          <div>
            <NavItem path="/repos" name="Repositories > " />
            <NavItem
              path={`/repos/${repo}`}
              name={`${repo} > `}
              isRepo={true}
            />
            <span>branches</span>
            <NavItem
              path={`/repos/${repo}/branches/${branch.name}`}
              name={` > ${this.renderBranchName(branch)}`}
              isBranch
              branch={branch}
            />
          </div>
        ) : repo ? (
          <div>
            <NavItem path="/repos" name="Repositories > " />
            <NavItem path={`/repos/${repo}`} name={`${repo}`} isRepo={true} />
          </div>
        ) : (
          <div>
            <NavItem path="/repos" name="Repositories" />
          </div>
        )}
      </header>
    );
  }
}

function mapStateToProps(state) {
  const { location } = state.router;

  return {
    location,
    branch: state.selectedBranch,
    repo: state.selectedRepo,
  };
}

export default connect(mapStateToProps)(Breadcrumb);
