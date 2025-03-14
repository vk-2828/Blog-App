import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
// import App from './App.jsx'
import {createBrowserRouter,Navigate,RouterProvider} from 'react-router-dom'
import RootLayout from './components/RootLayout.jsx'
import Home from './components/common/Home.jsx'
import Signin from './components/common/Signin.jsx'
import Signup from './components/common/Signup.jsx'
import UserProfile from './components/user/UserProfile.jsx'
import AuthorProfile from './components/author/AuthorProfile.jsx'
import PostArticle from './components/author/PostArticle.jsx'
import Article from './components/common/Articles.jsx'
import ArticlesById from './components/common/ArticlesById.jsx'
import  UserAuthorContext  from './contexts/UserAuthorContext.jsx';
import AdminProfile from './components/admin/AdminProfile.jsx';
import UsersList from './components/admin/UsersList.jsx';
const browserRouterObj=createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"signin",
        element:<Signin/>
      },
      {
        path:"signup",
        element:<Signup/>
      },
      {
        path:"user-profile/:email",
        element:<UserProfile/>,
        children:[
          {
            path:":articleId",
            element:<ArticlesById/>
          },
          {
            path:"articles",
            element:<Article/>
          },
          {
            path:"",
            element:<Navigate to="articles"/>
          }
        ]
      },
      {
        path:"author-profile/:email",
        element:<AuthorProfile/>,
        children:[
          {
            path:":articleId",
            element:<ArticlesById/>
          },
          {
            path:"articles",
            element:<Article/>
          },
          {
            path:"",
            element:<Navigate to="articles"/>
          },
          {
            path:"article",
            element:<PostArticle/>
          }
        ]
      },
      {
        path:"admin-profile/:email",
        element:<AdminProfile/>,
        children:[
          {
            path:'allusers',
            element:<UsersList/>
          },
          {
            path:"",
            element:<UsersList/>
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthorContext>
        <RouterProvider router={browserRouterObj}/>
    </UserAuthorContext>
  </StrictMode>
)
