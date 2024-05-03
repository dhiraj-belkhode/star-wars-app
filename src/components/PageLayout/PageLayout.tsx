import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "../Header";
import ErrorHandler from "../../shared/ErrorBoundary";

/**
 * PageLayout component that serves as a layout wrapper for pages in the application.
 * It includes a Header at the top and a Container with an Outlet for rendering child routes.
 *
 * @returns A element representing the layout wrapper for the application.
 */
const PageLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Container data-testid="container">
        <ErrorHandler>
          <Outlet />
        </ErrorHandler>
      </Container>
    </>
  );
};

export default PageLayout;
