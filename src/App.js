import React, { Component } from "react";
import "./App.css";
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder' 

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <BurgerBuilder testProp={"something"} />
        </Layout>
      </div>
    );
  }
}

export default App;
