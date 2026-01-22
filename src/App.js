import './App.css';
import Header from "./components/Header";
import ThemeProvider from "./providers/ThemeProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Loading from "./components/Utilis/Loading";

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

                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
