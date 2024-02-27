import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Search from "./Pages/Search/Search";
import Settings from "./Pages/Settings/Settings";

const Notification = (props) => {

    return (
      <h3>{props.text}</h3>
    );
};

export default Notification;