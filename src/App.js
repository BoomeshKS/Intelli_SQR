import AllRoutes from './AllRoutes';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';



function App() {
  return (
    <div>
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
