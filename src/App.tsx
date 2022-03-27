import {Helmet} from 'react-helmet';
import {QueryClient, QueryClientProvider} from 'react-query';
import {MyRoutes} from './containers';

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
        <MyRoutes />
      </QueryClientProvider>
    </div>
  );
};
