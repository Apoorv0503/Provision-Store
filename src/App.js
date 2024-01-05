import logo from './logo.svg';
import './App.css';
import MyProducts from "./components/Products/MyProducts"
import MyLogin from './components/Login/MyLogin';
import { Switch, Route } from 'react-router-dom';
import About from './components/About/About'


function App() {
  return (
    <div>
    <Switch>
    <Route exact path="/">
      <MyLogin />
    </Route>
    <Route path="/product">
      <MyProducts />
    </Route>
    <Route path="/about">
      <About />
    </Route>
    </Switch>
    </div>
  );
}

export default App;
