'use strict';

import React from 'react';

require('styles//Mammals.scss');

class MammalsItemComponent extends React.Component {
  render() {
    let {mammal} = this.props;
    return (
      <div>{mammal.name}</div>
    )
  }
}

class MammalsComponent extends React.Component {
  componentDidMount () {
    let {actions} = this.props;
    actions.load();
  }
  handleCLick () {
    let {actions} = this.props;
    actions.generate();
  }
  render() {
    let {quizz} = this.props;
    let markup;
    let quizzingMammals = quizz.mammals.filter(mammal => mammal.quizzing);

    if (quizz.status === 'loading') {
      markup = (
        <div className="mammals-component">
          <span>Loading mammals</span>
        </div>
      );
    }else if (quizz.status === 'ready') {
      markup = (
        <div className="mammals-component">
            <button type="button" onClick={(e) => this.handleCLick(e)}>start quizz</button>
        </div>
      );
    } else {
      markup = (
        <div className="mammals-component">
          {quizzingMammals.map(function (mammal) {
            return <MammalsItemComponent mammal={mammal} key={mammal.name} />;
          })}
          <button type="button" onClick={(e) => this.handleCLick(e)}>next quizz</button>
        </div>
      );
    }
    return markup;
  }
}

MammalsComponent.displayName = 'MammalsComponent';

// Uncomment properties you need
// MammalsComponent.propTypes = {};
// MammalsComponent.defaultProps = {};

export default MammalsComponent;
