import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";
import type { GetToken, UserResource } from "@clerk/types";
import { Navbar } from "@/components/Navbar";
import NotFound from "@/components/NotFound";

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
      <Navbar />
      <Outlet />
      <TanStackDevtools
        config={{
          position: "bottom-right",
          openHotkey: ["Control", "A"],
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: "Tanstack Query",
            render: <ReactQueryDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
  notFoundComponent: NotFound,
});
