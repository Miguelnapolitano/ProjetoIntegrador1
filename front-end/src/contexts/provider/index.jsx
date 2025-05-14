import { DashProvider } from "../dashboardContext";
import { UserProvider } from "../userContext";


export const Providers = ({ children }) => {
    return (
      <UserProvider>
        <DashProvider>
         {children}
        </DashProvider>
      </UserProvider>
    );
  };