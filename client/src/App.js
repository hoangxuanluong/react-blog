import Topbar from '../src/components/topbar/Topbar'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Settings from './pages/settings/Settings'
import Single from './pages/single/Single'
import Write from './pages/write/Write'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from './context/Context'

function App() {
  const { user } = useContext(Context)
  return (
    <div className='App'>
      <Router>
        <Topbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/post/:id'>
            <Single />
          </Route>
          <Route path='/newPost'>{user ? <Write /> : <Login />}</Route>
          <Route path='/settings'>{user ? <Settings /> : <Login />}</Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
