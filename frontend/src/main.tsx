import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { createTheme, MantineProvider } from "@mantine/core";
import { AppLoader } from "@app/components/app/AppLoader.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from '@mantine/notifications';
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module "@tanstack/react-router"
{
    interface Register { router: typeof router }
}

const theme = createTheme({});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <MantineProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
              <AppLoader>
                  <RouterProvider router={router} />
              </AppLoader>
          </QueryClientProvider>

          <Notifications />
      </MantineProvider>
  </React.StrictMode>
);