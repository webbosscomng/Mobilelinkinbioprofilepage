import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ForgotPassword } from "./pages/ForgotPassword";
import { LinkInBioPage } from "./pages/LinkInBioPage";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Overview } from "./pages/Overview";
import { LinksManager } from "./pages/LinksManager";
import { Appearance } from "./pages/Appearance";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";
import { Integrations } from "./pages/Integrations";
import { StoreManager } from "./pages/StoreManager";
import { Performance } from "./pages/Performance";
import { Templates } from "./pages/Templates";
import { PremiumTemplates } from "./pages/PremiumTemplates";
import { ComponentShowcase } from "./pages/ComponentShowcase";
import { EditingDemo } from "./pages/EditingDemo";
import { NotFound } from "./pages/NotFound";
import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { Careers } from "./pages/Careers";
import { HelpCenter } from "./pages/HelpCenter";
import { Contact } from "./pages/Contact";
import { Status } from "./pages/Status";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { Security } from "./pages/Security";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/demo",
    element: <EditingDemo />,
  },
  {
    path: "/components",
    element: <ComponentShowcase />,
  },
  {
    path: "/profile/:username",
    element: <LinkInBioPage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/careers",
    element: <Careers />,
  },
  {
    path: "/help",
    element: <HelpCenter />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/status",
    element: <Status />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/security",
    element: <Security />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Overview /> },
      { path: "my-page", element: <Overview /> },
      { path: "links", element: <LinksManager /> },
      { path: "store", element: <StoreManager /> },
      { path: "appearance", element: <Appearance /> },
      { path: "templates", element: <Templates /> },
      { path: "premium-templates", element: <PremiumTemplates /> },
      { path: "analytics", element: <Analytics /> },
      { path: "performance", element: <Performance /> },
      { path: "integrations", element: <Integrations /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);