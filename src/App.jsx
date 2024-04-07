import "./App.css";
import Home from './Components/Home/Home';
import Sidebar from "./Components/Sidebar/Sidebar";
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Note from './Components/Note/Note';
import Layout from './Components/Layout/Layout';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import InverseProtectedRoute from "./Components/InverseProtectedRoute/InverseProtectedRoute";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {

  let routers = createBrowserRouter([
    {path: '' , element: <Layout/> , children: [
      {index: true , element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path: 'register' , element: <InverseProtectedRoute><Register/></InverseProtectedRoute> },
      {path: 'login' , element: <InverseProtectedRoute><Login/></InverseProtectedRoute>}
    ]}
  ])

 
  return <>
  <RecoilRoot>
    <RouterProvider router={routers}></RouterProvider>
  </RecoilRoot>
  </>;
}

export default App;
