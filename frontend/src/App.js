import './App.scss';
import { BrowserRouter, Route } from "react-router-dom";
import Auth from './components/Auth/Auth';
import UserContainer from './components/UserContainer/User.Container';
import PreProtectedRoute from './helpers/ProtectedRoutes/PreProtectedRoute';
import AdminProtectedRoute from './helpers/ProtectedRoutes/AdminProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import AdminPanelContainer from './components/AdminPanelContainer/AdminPanelContainer';

function App() {
  const queryClient = new QueryClient()

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Route exact path="/" component={() => <PreProtectedRoute Component={UserContainer} />} />
          <Route exact path="/admin_panel" component={() => <AdminProtectedRoute Component={AdminPanelContainer} />} />
          <Route exact path="/register" component={() => <Auth authType={'register'} />} />
          <Route exact path="/login" component={() => <Auth authType={'login'} />} />
          <Route exact path="/add_user" component={() => <Auth authType={'create'} />} />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
