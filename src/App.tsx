import './App.css';
import Header from "./components/Header/Header";
import ThemeProvider from "./providers/ThemeProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ResetPassword from "./components/auth/ResetPassword";
import Page404 from "./components/404/Page404";
import AuthProvider from "./providers/AuthProvider";
import FloatingThemeSwitch from "./components/Theme/FloatingThemeSwitch";
import GuestGuard from "./components/guards/GuestGuard";
import ProtectedRoutes from "./components/guards/ProtectedRoutes";
import {Dashboard} from "./components/dashboard/Dashboard";
import AuthSpinner from "./components/auth/components/AuthSpinner";
import AppToaster from "./components/ui/AppToaster";

function App() {
    return (
        <div className="App">
            <ThemeProvider>
                <AuthProvider>
                    <BrowserRouter>
                        <Header/>
                        <Routes>
                            <Route  element={<GuestGuard/>}>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/reset-password" element={<ResetPassword/>}/>
                            </Route>
                            <Route  element={<ProtectedRoutes/>}>
                                <Route path="/dashboard" element={<Dashboard/>}/>
                            </Route>
                            <Route   path={"/spin"} element={<AuthSpinner loading={true}/>}>
                            </Route>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
                <FloatingThemeSwitch/>
                <AppToaster/>
            </ThemeProvider>
        </div>
    );
}

export default App;
