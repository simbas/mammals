'use strict';

import React from 'react';

require('styles//Mammals.scss');

class MammalsItemComponent extends React.Component {
  handleCLick(e) {
    let {actions, mammal} = this.props;
    actions.select(mammal);
  }
  render() {
    let {mammal} = this.props;
    let markup = (<div onClick={e => this.handleCLick(e)}><img src={mammal.image} />{mammal.name}</div>);
    if(mammal.selected && mammal.winning) {
      markup = (<div onClick={e => this.handleCLick(e)} class="winner"><img src={mammal.image} />{mammal.name}</div>);
    } else if (mammal.selected && !mammal.winning) {
      markup = (<div onClick={e => this.handleCLick(e)} class="looser"><img src={mammal.image} />{mammal.name}</div>);
    }
    return markup;
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
    let {quizz, actions} = this.props;
    let markup;
    let quizzingMammals = quizz.question;

    if (quizz.status === 'loading') {
      markup = (
        <div className="mammals-component">
          <span>Loading mammals</span>
        </div>
      );
    } else if (quizz.status === 'ready') {
      markup = (
        <div className="mammals-component">
            <button type="button" onClick={(e) => this.handleCLick(e)}>start quizz</button>
        </div>
      );
    } else if (quizz.status === 'quizzing') {
      markup = (
        <div className="mammals-component">
          <div>score: {quizz.score}</div>
          <MammalsItemComponent actions={actions} mammal={quizzingMammals[0]} />
          Or
          <MammalsItemComponent actions={actions} mammal={quizzingMammals[1]} />
        </div>
      );
    } else if (quizz.status === 'done') {
      markup = (
        <div className="mammals-component">
          <div>Final score: {quizz.score} !</div>
        </div>
      );
    } else {
      markup = (
        <div className="mammals-component">
          <div>score: {quizz.score}</div>
          <MammalsItemComponent actions={actions} mammal={quizzingMammals[0]} />
          Or
          <MammalsItemComponent actions={actions} mammal={quizzingMammals[1]} />
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
