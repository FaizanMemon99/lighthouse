import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routers from './routes';

function App() {
  return (
    <BrowserRouter basename='/lighthouse'>
      <Routers/>
   </BrowserRouter>
  );
}

export default App;
