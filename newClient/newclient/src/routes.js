import { Route, Switch, Redirect } from 'react-router-dom';
import NewPage from './components/accountBox/auth';
export const routes = (
  <Suspense fallback={<p>Loading...</p>}>
    <Switch>
      <Route path='/' exact component={MainPage} />
      <Route path='/auth' exact render={props => <Auth {...props} />}></Route>
    </Switch>
  </Suspense>
);
