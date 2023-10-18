import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Todos from "./components/Todos";
import ImagesCrop from "./components/ImagesCrop";
import Auth from "./components/Auth";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <a href="/">Главная</a>
                        </li>
                        <li>
                            <a href="/todos">To-Do</a>
                        </li>
                        <li>
                            <a href="/image">Изображение</a>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/todos" element={<Todos />} />
                    <Route path="/image" element={<ImagesCrop />} />
                    <Route path="/" element={<Auth />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
