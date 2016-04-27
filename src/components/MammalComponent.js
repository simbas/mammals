'use strict';

import React from 'react';

require('styles//Mammal.scss');

class MammalComponent extends React.Component {
  render() {
    let {mammal}= this.props;
    console.log(mammal)
    return (
      <div className="mammal-component">

      </div>
    );
  }
}

MammalComponent.displayName = 'MammalComponent';

// Uncomment properties you need
// MammalComponent.propTypes = {};
// MammalComponent.defaultProps = {};

export default MammalComponent;
