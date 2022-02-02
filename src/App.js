import React from "react";
import { Route, Switch } from "react-router-dom";

import Movies from "./components/movies.component";
import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import CreateMovies from "./components/create-movies.component";
import SignUp from "./components/sign-up.component";
import Login from "./components/login.component";

const App = (props) => {
    return (
        <>
            <Navbar />
            <br/>
            <Switch>
                <Route
                    path="/movies"
                    render={(props) => <Movies {...props} />}
                />
                <Route
                    path="/create-movies"
                    render={(props) => <CreateMovies {...props} />}
                />
                <Route
                    path="/sign-up"
                    render={(props) => <SignUp {...props} />}
                />
                <Route
                    path="/login"
                    render={(props) => <Login {...props} />}
                />
                <Route exact path="/" render={(props) => <Home {...props} />} />
            </Switch>
        </>
    );
};

export default App;
