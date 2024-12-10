import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App';
import EventoCreate from './routes/EventoCreate';
import PageNotFound from './components/PageNotFound';
import DashBoard from './routes/DashBoard';
import EventoView from './routes/EventoView';
import EventoEdit from './routes/EventoEdit';
import EventoPatchEdit from './routes/EventoPatchEdit';





const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <DashBoard  /> },
      { path: "/criar-evento", element: <EventoCreate /> },
      { path: "/consultar-evento", element: <EventoView /> },
      { path: "/editar-evento", element: <EventoEdit /> },    
      { path: "/patch-evento", element: <EventoPatchEdit /> },     


      { path: "*", element: <PageNotFound /> },


    ],
  },
]);
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

