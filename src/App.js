import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import {Navigation, Navigator} from './routes/Navigator';
import Footer from "./components/layout/Footer";

function App() {
    return (
        <BrowserRouter>
            <Navigator/>
            <div className="App">
                <div className="App-body">
                    <Navigation/>
                    <Footer />
                </div>
            </div>
        </BrowserRouter>

    );
}

export default App;
