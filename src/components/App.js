import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

import "./App.css";
import Home from "./Home";
import LogIn from "./Login";
import SignUp from "./Signup";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
