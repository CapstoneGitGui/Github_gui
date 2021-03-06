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

  //this is a change

  render() {
    const pathName = this.props.location.pathname.split('/');
    pathName.shift();
    const pathLength = pathName.length;
    const { branch, repo } = this.props;

    return (
      <header>
        {Object.keys(branch).length || typeof branch === 'string' ? (
          <div>
            <NavItem path="/repos" name="Repositories > " repository={true} />
            <NavItem
              path={`/repos/${repo}`}
              name={`${repo} > `}
              isRepo={true}
              breadcrumb={true}
            />
            <i className="fas fa-code-branch" />
            <span> branches</span>
            <NavItem
              path={`/repos/${repo}/branches/${branch.name}`}
              name={` > ${this.renderBranchName(branch)}`}
              isBranch={true}
              branch={branch}
              breadcrumb={true}
            />
          </div>
        ) : repo ? (
          <div>
            <NavItem
              path="/repos"
              name="Repositories > "
              repository={true}
              breadcrumb={true}
            />
            <NavItem
              path={`/repos/${repo}`}
              name={`${repo}`}
              isRepo={true}
              breadcrumb={true}
            />
          </div>
        ) : (
          <div>
            <NavItem
              path="/repos"
              name="Repositories"
              repository={true}
              breadcrumb={true}
            />
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
