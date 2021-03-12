import './App.css';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Auth from './components/Auth/Auth';
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
        <Route exact path="/register" component={() => <Auth auth={'register'} />} />
        <Route exact path="/login" component={() => <Auth auth={'login'} />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
