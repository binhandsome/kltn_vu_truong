// src/App.jsx
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './route';

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;