import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import type { QueryClient } from "@tanstack/react-query";
import type { GetToken, UserResource } from "@clerk/types";

interface AppRouterContext {
  queryClient: QueryClient;
  auth: {
    isLoaded: boolean;
    isSignedIn: boolean;
    user: UserResource | null;
    getToken: GetToken;
  };
}

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </>
  ),
});
