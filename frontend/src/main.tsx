import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useAuth, useUser } from "@clerk/clerk-react";
import * as TanStackQueryProvider from "./integrations/tanstack-query/root-provider.tsx";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";
import AppClerkProvider from "./integrations/clerk/provider.tsx";

// Create a new router instance

const TanStackQueryProviderContext = TanStackQueryProvider.getContext();
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
    auth: {
      isLoaded: false,
      isSignedIn: false,
      user: null,
      getToken: async () => Promise.resolve(null),
    },
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function RouterProviderWithAuth() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();

  if (!isLoaded) return null;

  return (
    <RouterProvider
      router={router}
      context={{
        ...router.options.context,
        auth: {
          isLoaded,
          isSignedIn,
          user,
          getToken,
        },
      }}
    />
  );
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AppClerkProvider>
        <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
          <RouterProviderWithAuth />
        </TanStackQueryProvider.Provider>
      </AppClerkProvider>
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
