import './App.scss';
import { BrowserRouter, Route } from "react-router-dom";
import Auth from './components/Auth/Auth';
import User from './components/User/User';
import ProtectedRoute from './helpers/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={() => <ProtectedRoute Component={User} />} />
        <Route exact path="/register" component={() => <Auth auth={'register'} />} />
        <Route exact path="/login" component={() => <Auth auth={'login'} />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
