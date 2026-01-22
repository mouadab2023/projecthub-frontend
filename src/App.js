import './App.css';
import Header from "./components/Header";
import ThemeProvider from "./providers/ThemeProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Loading from "./components/utilis/Loading";
import ResetPassword from "./components/auth/ResetPassword";
import Page404 from "./components/Page404";

function App() {
    return (
        <div className="App">
            <ThemeProvider>
                <Header/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/loading" element={<Loading/>}/>
                        <Route path="/reset-password" element={<ResetPassword/>}/>
                        <Route path="*" element={<Page404/>}/>


                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
