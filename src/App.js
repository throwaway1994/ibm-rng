import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleGeneration = this.handleGeneration.bind(this);
    this.lists = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [11, 22, 33, 44],
      [55, 66, 77, 88]
    ];
    this.weights = [
      [0.50, 0.25, 0.25, 0.50],
      [0.10, 0.30, 0.50, 0.90],
      [0.20, 0.00, 0.80, 0.60],
      [0.15, 0.50, 0.40, 0.75]
    ];
    this.weightedArrays = [];
    for (let i = 0; i < this.lists.length; i++) {
      this.weightedArrays.push(genWeightedArray(this.lists[i], this.weights[i]));
    }
    this.state = {
      number: -1,
      listIndex: 0,
      percent: 0
    };
  }

  toIndexArray(array) {
    return [...Array(array.length).keys()];
  }

  createSelect() {
    return (
      <select id="select-list" className="form-control col-md-4 mr-3" onChange={this.onListChange.bind(this)}>
      {
        this.toIndexArray(this.lists).map(listIdx => (
          <option key={`option-${listIdx}`} value={listIdx}>List #{listIdx + 1}</option>
        ))
      }
      </select>
    );
  }

  showLists() {
    return this.toIndexArray(this.lists)
      .map(listIdx => (
        <p key={`p-${listIdx}`}>List #{listIdx + 1}:
          {
            ' ' + this.toIndexArray(this.lists[listIdx])
              .map(itemIdx => `(${this.lists[listIdx][itemIdx]}, ${this.weights[listIdx][itemIdx]})`)
              .join(', ')
          }
        </p>
      ));
  }

  onListChange(event) {
    this.setState({ listIndex : event.target.value });
  }

  render() {
    return(
      <div className="App container background">
        <main className="main" role="main">
          <div className="inner-panel">
            <h1 className="text-center mb-4">IBM Application - RNG</h1>
            <h2>Available lists:</h2>
            {this.showLists()}
            <div className="row">
              {this.createSelect()}
              <button id="generate-btn" className="btn btn-primary col-md-2" onClick={this.handleGeneration}>Generate</button>
            </div>
            <h2 className="mt-4 text-center">Your randomly generated number is {this.state.number}.</h2>
          </div>
        </main>
      </div>
    );
  }

  handleGeneration() {
    const index = randomInt(0, this.weightedArrays[this.state.listIndex].length);
    const value = this.weightedArrays[this.state.listIndex][index];
    this.setState({ number: value });
  }
}

export function genWeightedArray(list, weights) {
  var weighted = [];
  for (let i = 0; i < weights.length; i++) {
    let count = weights[i] * 10;
    for (let j = 0; j < count; j++) {
      weighted.push(list[i]);
    }
  }
  return weighted;
}

export function randomInt(min, max) {
  if (min > max) {
    throw new Error('min must be less than max');
  }
  return Math.floor(Math.random() * (max - min)) + min;
}

export default hot(module)(App);
