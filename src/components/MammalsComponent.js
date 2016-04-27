'use strict';

import React from 'react';
import { Link } from 'react-router'

require('styles//Mammals.scss');

class MammalsItemComponent extends React.Component {
  render() {
    let {mammal} = this.props;
    return (
      <div><Link to={`/mammal/${mammal.name}`}>{mammal.name}</Link></div>
    )
  }
}

class MammalsComponent extends React.Component {
  componentDidMount () {
    let {actions} = this.props;
    actions.load();
  }
  render() {
    let {mammals} = this.props;
    return (
      <div className="mammals-component">
        {mammals.map(function (mammal) {
          return <MammalsItemComponent mammal={mammal} key={mammal.name} />;
        })}
      </div>
    );
  }
}

MammalsComponent.displayName = 'MammalsComponent';

// Uncomment properties you need
// MammalsComponent.propTypes = {};
// MammalsComponent.defaultProps = {};

export default MammalsComponent;
