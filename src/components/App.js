import { Route, Switch } from "react-router";
import Home from "./home/Home";
import Profile from "./profile/Profile";

function App() {
    return (
        <main>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/profile/:artistType/:city/:pageUrl" render={(props) => { <Profile {...props} vendorid={1} /> }} component={Profile} />
            </Switch>
        </main>
    );
}

export default App;