import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import About from './pages/About';
import Charter from './pages/Charter';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "tours", element: <Tours /> },
      { path: "tours/:id", element: <TourDetail /> },
      { path: "about", element: <About /> },
      { path: "charter", element: <Charter /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms", element: <TermsConditions /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
