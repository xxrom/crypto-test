import { memo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MyRoutes } from "./containers";

const queryClient = new QueryClient();

// TODO: update tailwindcss and remove script, which solved css issue
export const App = memo(() => {
  return (
    <QueryClientProvider client={queryClient}>
      <MyRoutes />
    </QueryClientProvider>
  );
});
