import React, { Component } from "react";
import "./App.css";
import Layout from './components/Layout/Layout';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder' 

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <BurguerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
