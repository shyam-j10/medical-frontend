import './App.css';
import Registration from './components/pages/register/register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Context from './context/context';
import Navbar from './components/navbar/navbar';
import PatientsDataGrid from './components/Receptions/receptions_patientsTable';

const router = createBrowserRouter([
  {path:"/medical/register", element:<Registration />},
  {path : "/medical/" , element:<Navbar />,children:[
    {path:"receptions" ,element:<PatientsDataGrid />}

  ]}
])
function App() {
  return (
    <div style={{width:"100%"}}>
 <Context >
    <RouterProvider router={router} />   
    </Context>
    </div>
   
  );
}

export default App;
