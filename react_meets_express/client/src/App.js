import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';

function App() {

  const [apiResponse, setApiResponse] = useState("API not working");


  // Fetch data from express server and update the state of the placeholder constant
  React.useEffect(() => {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(err => err);
  }, []); // <-- Have to pass in [] here! (see: https://stackoverflow.com/questions/53219113/where-can-i-make-api-call-with-hooks-in-react#)


  // Return the response from the express server inside the react front-end
  return (
    <div className="App">
        <header className="App-header">
            <h1 className="App-title">Connecting React to Express</h1>
            <p> Following the tutorial at:  
            <a href="https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/">
              FreeCodecamp Tutorial</a>
            </p>
        </header>
        <h1> The content below this text is fetched from the express API</h1>
        <p className="App-intro">{apiResponse}</p>
    </div>
  );
}

export default App;



// ----- ORIGINAL CODE WITH CLASS COMPONENTS INSTEAD OF FUNCTIONAL COMPONENTS -------- //

// import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";

// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { apiResponse: "" };
//     }

//     callAPI() {
//         fetch("http://localhost:9000/testAPI")
//             .then(res => res.text())
//             .then(res => this.setState({ apiResponse: res }))
//             .catch(err => err);
//     }

//     componentDidMount() {
//         this.callAPI();
//     }

//     render() {
//         return (
//             <div className="App">
//                 <header className="App-header">
//                     <h1 className="App-title">Connecting React to Express</h1>
//                     <p> Following the tutorial at:  
//                     <a href="https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/">
//                      FreeCodecamp Tutorial</a>
//                     </p>
//                 </header>
//                 <h1> The content below this title is fetched from the express API</h1>
//                 <p className="App-intro">{this.state.apiResponse}</p>
//             </div>
//         );
//     }
// }

// export default App;



