import './App.css';
import Header from "./components/Header";
import ThemeProvider  from "./providers/ThemeProvider";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
        <ThemeProvider>
            <Header />
            <BrowserRouter>
                <Routes >
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </div>
  );
}

export default App;
