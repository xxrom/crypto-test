import {Helmet} from 'react-helmet';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

import {Home, Trade} from './pages';
import {Layout} from './containers';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Crypto-test</title>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Helmet>

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="trade" element={<Trade />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};
