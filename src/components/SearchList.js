import React, { Component } from 'react';

class SearchList extends Component{

render() {

  return (
    <div className="castles-list">
      <div className="filter-castles">

        <input
          aria-label="Search input"
          role="search"
          type="text"
          placeholder="Search a castle"
          onChange={e => this.props.filterCastles(e.target.value)}
        />

        <ul aria-label="Filtered list of castles">

        {
          this.props.listOfCastles.map(castle => {
            return (
                <li key={castle.name}>
                  <button onClick={(e)=>this.props.onButtonClick(castle.name)}>
                      {castle.name}
                  </button>
                </li>);
          })
        }

        </ul>

      </div>

      <img className="pb" alt="" src={ require('../img/dracula-castles.png') } />

    </div>

    );

  }
}

export default SearchList;
