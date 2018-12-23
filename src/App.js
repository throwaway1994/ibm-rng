import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleGeneration = this.handleGeneration.bind(this);
    // Initialize default array of lists
    this.lists = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [11, 22, 33, 44],
      [55, 66, 77, 88]
    ];
    // Initialize default weight lists
    this.weights = [
      [0.50, 0.25, 0.25, 0.50],
      [0.10, 0.30, 0.50, 0.90],
      [0.20, 0.00, 0.80, 0.60],
      [0.15, 0.50, 0.40, 0.75]
    ];
    this.weightedArrays = [];
    // Create weighted arrays
    for (let i = 0; i < this.lists.length; i++) {
      this.weightedArrays.push(genWeightedArray(this.lists[i], this.weights[i]));
    }
    // Set initial project states
    this.state = {
      number: -1,
      listIndex: 0
    };
  }

  // Generate the select dropdown mapping each list to its index
  createSelect() {
    return (
      <select id="select-list" className="form-control col-md-4 mr-3" onChange={this.onListChange.bind(this)}>
      {
        toIndexArray(this.lists).map(listIdx => (
          <option key={`option-${listIdx}`} value={listIdx}>List #{listIdx + 1}</option>
        ))
      }
      </select>
    );
  }

  // Generate a listing of the lists mapped to their probability for each element being chosen
  showLists() {
    return toIndexArray(this.lists)
      .map(listIdx => (
        <p key={`p-${listIdx}`}>List #{listIdx + 1}:
          {
            ' ' + toIndexArray(this.lists[listIdx])
              .map(itemIdx => `(${this.lists[listIdx][itemIdx]}, ${this.weights[listIdx][itemIdx]})`)
              .join(', ')
          }
        </p>
      ));
  }

  /**
   * When the select dropdown value changes, update the actively selected list index
   * 
   * @param {*} event the event object containing the new select value
   */
  onListChange(event) {
    this.setState({ listIndex : event.target.value });
  }

  // Show the appropriate help/result text underneath the generate button
  showResultText() {
    if (this.state.number === -1) {
      return <h2 className="mt-4 text-center">Select a list above and click the generate button to retrieve your random number!</h2>;
    }
    return <h2 className="mt-4 text-center">Your randomly generated number is {this.state.number}.</h2>;
  }

  // Render the component
  render() {
    return(
      <div className="App container background">
        <main className="main" role="main">
          <div className="offset-md-2 col-md-8 offset-lg-3 col-lg-6">
            <h1 className="text-center mt-4 mb-4">IBM Application - RNG</h1>
            <div className="offset-md-2 offset-lg-3">
              <h2>Available lists:</h2>
              {this.showLists()}
              <div className="row">
                {this.createSelect()}
                <button id="generate-btn" className="btn btn-primary col-md-4" onClick={this.handleGeneration}>Generate</button>
              </div>
            </div>
            {this.showResultText()}
          </div>
        </main>
      </div>
    );
  }

  // Chooses a random element from the selected list and updates the number state on the front end
  handleGeneration() {
    const index = randomInt(0, this.weightedArrays[this.state.listIndex].length);
    const value = this.weightedArrays[this.state.listIndex][index];
    this.setState({ number: value });
  }
}

/**
 * Generates an indexed array from the specified array.
 * Ex. Given [10, 20, 30, 40, 50], the function will return [0, 1, 2, 3, 4]
 * 
 * @param {array} array the array
 */
export function toIndexArray(array) {
  return [...Array(array.length).keys()];
}

/**
 * Generates a random number between the specified min and max values.
 * 
 * @param {number} min the minimum value
 * @param {number} max the maximum value
 */
export function randomInt(min, max) {
  if (min > max) {
    throw new Error('min must be less than max');
  }
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Generates the weighted array containing the number of each element based on their probability multiplied by 100.
 * Ex. If the list had value [1, 2, 3] and the weights array had value [0.25, 0.25, 0.5], there should be 25 1s, 25 2s,
 * and 50 3s in the generated weighted list this function returns.
 * 
 * @param {array} list an array of elements
 * @param {array} weights an array of values representing the probability of the associated element being chosen
 */
export function genWeightedArray(list, weights) {
  if (list.length !== weights.length) {
    throw new Error('lengths of list and weight arrays must be the same');
  }
  var weighted = [];
  for (let i = 0; i < weights.length; i++) {
    let count = weights[i] * 100;
    for (let j = 0; j < count; j++) {
      weighted.push(list[i]);
    }
  }
  return weighted;
}

// Create hot reloader to detect changes and reload automatically
export default hot(module)(App);
