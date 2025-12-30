import { createFileRoute } from "@tanstack/react-router";
import {
  AuthenticateWithRedirectCallback,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/clerk-react";

export const Route = createFileRoute("/signin/sso-callback/")({
  component: SSOCallback,
});

function SSOCallback() {
  return (
    <>
      <ClerkLoading>Signing you in…</ClerkLoading>
      <ClerkLoaded>
        <AuthenticateWithRedirectCallback />
      </ClerkLoaded>
    </>
  );
}
