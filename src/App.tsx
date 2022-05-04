import { memo } from "react";
import { Helmet } from "react-helmet";
import { QueryClient, QueryClientProvider } from "react-query";
import { MyRoutes } from "./containers";

const queryClient = new QueryClient();

// TODO: update tailwindcss and remove script, which solved css issue
export const App = memo(() => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Crypto-test</title>

        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Helmet>

      <QueryClientProvider client={queryClient}>
        <MyRoutes />
      </QueryClientProvider>
    </div>
  );
});
