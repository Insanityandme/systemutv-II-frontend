// App.js
import {Routes, Route} from 'react-router-dom';
import Settings from './Pages/Settings/Settings';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import Dashboard from "./Pages/Dashboard/Dashboard";
import Search from "./Pages/Search/Search";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/settings" element={<Settings/>}/>
            </Routes>
        </>
    );
};

export default App;