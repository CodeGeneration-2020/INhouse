import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Login}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
