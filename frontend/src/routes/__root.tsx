import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NavBar } from "@app/components/navbar/NavBar.tsx";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools"

export const Route = createRootRoute({
    component: () => (
        <>
            <NavBar />
            <Outlet />
            {/*<TanStackRouterDevtools />*/}
        </>
    ),
})