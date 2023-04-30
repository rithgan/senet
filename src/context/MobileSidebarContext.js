import { useState, createContext } from "react";

export const MobileSidebarContext = createContext();

export const MobileSidebarProvider = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <MobileSidebarContext.Provider value={[mobileOpen, setMobileOpen]}>
      {children}
    </MobileSidebarContext.Provider>
  );
};