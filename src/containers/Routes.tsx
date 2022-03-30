
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Home, Trade} from '../pages';
import {Layout} from '../containers';

export cosnt Routes = () => {
  return (
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="trade" element={<Trade />} />
            </Route>
  )

}
