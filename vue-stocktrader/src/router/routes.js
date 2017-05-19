import Hello from '@/components/Hello';
import Home from '@/components/Home';
import Portfolio from '@/components/portfolio/Portfolio';
import Stocks from '@/components/stocks/Stocks';

const routes = [
  {
    path: '/help',
    name: 'Hello',
    component: Hello,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio,
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: Stocks,
  },
];

export default routes;
