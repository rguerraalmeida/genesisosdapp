import React, { Component } from 'react';
import debounceRender from 'react-debounce-render';

class ArkUtilitiesApi extends Component {

    sleep = (milliseconds) => {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
          break;
        }
      }
    }
  
    timedOutDisplay = (inputVal) => {
      this.sleep(2000);
      return `Heavy calculation based on input => ${inputVal}`;
    }
  
    render() {
  
      return (
        <React.Fragment>
          {this.timedOutDisplay(this.props.inputVal)}
        </React.Fragment>
      );
    }
  }
  
  export default debounceRender(WithDebounceCalculator, 500);