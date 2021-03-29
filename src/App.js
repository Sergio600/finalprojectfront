import './App.css';

function App() {
    return (
        <div className="App">
           test

            <Header/>
        </div>
    );
}

export default App;

// создали компонент который можем использовать в текущем файле
function Header() {
    return (
        <div className="Header">
            test Header
        </div>
    );
}


// <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo"/>
//     <p>
//         Hello! lets test!! Edit <code>src/App.js</code> and save to reload.
//
//     </p>
//     <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//     >
//         Learn React
//     </a>
// </header>