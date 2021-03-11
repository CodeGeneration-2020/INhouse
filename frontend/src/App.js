import './App.css';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserInfo from './components/UserInfo/UserInfo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" render={() => (
          localStorage.getItem('token') ?
            (<Redirect to="/info" />) 
            :
            (<Redirect to="/login" />)
        )} />
        <Route exact path="/info" component={UserInfo} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </BrowserRouter>
    </div>
  );
}

export default App;
