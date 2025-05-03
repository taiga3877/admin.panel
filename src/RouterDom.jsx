import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Homepage/page"; // Убедись, что путь правильный
import Login from "./pages/Login/page";
import Category from './pages/Category/page'
import Discount from './pages/Discount/page'
import Sizes from './pages/Sizes/page'
import Colors from './pages/Sizes/page'
import Faq from './pages/Faq/page'
import Contact from './pages/Contact/page'
import Team from './pages/Team/page'
import News from './pages/Team/page'

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <>Error Page not found 404</>,
    children: [
      {
        index: true, // Это для домашней страницы, чтобы она была по умолчанию
        element: <Home />,
      },
      {
        path: "/homepage", // Этот путь теперь будет работать для страницы Home
        element: <Home />,
      },
    {
      path: "/login",
      element: <Login/>
    },
      {
        path: "/category",
        element: <Category/>
      },
      {
        path:"/discount",
        element: <Discount/>
      },
      {
        path: "/sizes",
        element: <Sizes/>
      },
      {
        path:"/colors",
        element:<Colors/>
      },
      {
        path: "/faq",
        element: <Faq/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/team",
        element: <Team/>
      },
      {
        path: "/news",
        element: <News/>
      }
      

    ],
  },
]);

export default routers;
