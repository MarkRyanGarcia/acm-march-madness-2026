import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import type { GetToken, UserResource } from "@clerk/types";
import { Navbar } from "@/components/Navbar";

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
    </>
  ),
});
