import './App.css';
import Header from "./components/Header";
import ThemeProvider  from "./providers/ThemeProvider";

function App() {
  return (
    <div className="App">
        <ThemeProvider>
            <Header />
        </ThemeProvider>
    </div>
  );
}

export default App;
