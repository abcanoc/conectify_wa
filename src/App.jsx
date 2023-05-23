import generateStore from './Redux/Store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Provider} from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Navigate, useNavigate } from "react-router-dom";
import Login from './Components/Login';
import Chat from './Components/Chat';

const store = generateStore()

const theme = createTheme({
  palette: {
    primary: {
      main: '#001E62',
    },
    secondary: {
      main: '#195AB4',
      light: '#B8CCEA',
    },
    text: {
      primary: '#404040',
      secondary: '#7F7F7F',
    },
  },
  typography: {
    fontFamily: 'Arial',
  },
  list: {
    maxHeight: "calc(100vh - 112px)",
    overflowY: "auto",
  },
});

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router >
          <Routes>
              <Route exact path="/" element={<Login />}></Route>
              <Route exact path="/Logged" element={<Chat/>}></Route>
          </Routes>
        </Router> 
      </Provider>
    </ThemeProvider>
    // <div className='App' >
    //   <div className='App-body'>
    //     <Channels/>
    //   </div>
    // </div>
  );
}

export default App;
