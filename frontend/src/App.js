import './App.scss';
import { BrowserRouter, Route } from "react-router-dom";
import Auth from './components/Auth/Auth';
import UserContainer from './components/UserContainer/User.Container';
import ProtectedRoute from './helpers/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import AdminPanelContainer from './components/AdminPanelContainer/AdminPanelContainer';

function App() {
  const queryClient = new QueryClient()

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Route exact path="/" component={() => <ProtectedRoute Component={UserContainer} />} />
          <Route exact path="/admin_panel" component={() => <ProtectedRoute Component={AdminPanelContainer} />} />
          <Route exact path="/register" component={() => <Auth auth={'register'} />} />
          <Route exact path="/login" component={() => <Auth auth={'login'} />} />
          <Route exact path="/add_user" component={() => <Auth auth={'add'} />} />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
