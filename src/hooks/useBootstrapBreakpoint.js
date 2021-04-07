import React from "react";
import useWindowSize from "./useWindowSize";
import { useCallback, useEffect, useState } from "react";

const BootstrapBreakpointContext = React.createContext();

const smBreakpoint = "576";
const mdBreakpoint = "768";
const lgBreakpoint = "992";
const xlBreakpoint = "1200";

const getBreakpoint = (width) => {
  if (width === 0) return null;
  if (width < smBreakpoint) return "xs";
  if (width < mdBreakpoint) return "sm";
  if (width < lgBreakpoint) return "md";
  if (width < xlBreakpoint) return "lg";
  if (width >= xlBreakpoint) return "xl";
  return null;
};

const checkMaxBreakpoint = (currentBreakpoint, breakpointAndDown) => {
  // If we have no current breakpoint, return false
  if (!currentBreakpoint) return false;
  // We always display xl
  if (breakpointAndDown === "xl") return true;
  // If lg and down, then check if current breakpoint is less than xl
  if (breakpointAndDown === "lg") {
    return currentBreakpoint !== "xl";
  }
  // If md and down, then check if current breakpoint is less than lg
  if (breakpointAndDown === "md") {
    return !(currentBreakpoint === "lg" || currentBreakpoint === "xl");
  }
  // If sm and down, then check if current breakpoint is less than md
  if (breakpointAndDown === "sm") {
    return !(
      currentBreakpoint === "md" ||
      currentBreakpoint === "lg" ||
      currentBreakpoint === "xl"
    );
  }
  // If xs and down, then check if current breakpoint is less than sm
  if (breakpointAndDown === "xs") {
    return !(
      currentBreakpoint === "sm" ||
      currentBreakpoint === "md" ||
      currentBreakpoint === "lg" ||
      currentBreakpoint === "xl"
    );
  }
  // Else it's an unknown breakpoint and down, so return false
  return false;
};

const checkMinBreakpoint = (currentBreakpoint, breakpointAndUp) => {
  // If we have no current breakpoint, return false
  if (!currentBreakpoint) return false;
  // We always display xs
  if (breakpointAndUp === "xs") return true;
  // If sm and up, then check if current breakpoint is less than sm
  if (breakpointAndUp === "sm") {
    return currentBreakpoint !== "xs";
  }
  // If md and up, then check if current breakpoint is less than md
  if (breakpointAndUp === "md") {
    return !(currentBreakpoint === "xs" || currentBreakpoint === "sm");
  }
  // If lg and up, then check if current breakpoint is less than lg
  if (breakpointAndUp === "lg") {
    return !(
      currentBreakpoint === "xs" ||
      currentBreakpoint === "sm" ||
      currentBreakpoint === "md"
    );
  }
  // If xl and up, then check if current breakpoint is less than xl
  if (breakpointAndUp === "xl") {
    return !(
      currentBreakpoint === "xs" ||
      currentBreakpoint === "sm" ||
      currentBreakpoint === "md" ||
      currentBreakpoint === "lg"
    );
  }
  // Else it's an unknown breakpoint and up, so return false
  return false;
};

const BootstrapBreakpointProvider = ({ children }) => {
  const [width] = useWindowSize();
  const [currentBreakpoint, setCurrentBreakpoint] = useState(
    getBreakpoint(width)
  );
  useEffect(() => {
    setCurrentBreakpoint(getBreakpoint(width));
  }, [width]);
  const maxBreakpoint = useCallback(
    (breakpointAndDown) =>
      checkMaxBreakpoint(currentBreakpoint, breakpointAndDown),
    [currentBreakpoint]
  );
  const minBreakpoint = useCallback(
    (breakpointAndUp) => checkMinBreakpoint(currentBreakpoint, breakpointAndUp),
    [currentBreakpoint]
  );
  return (
    <BootstrapBreakpointContext.Provider
      value={{
        currentBreakpoint,
        maxBreakpoint,
        minBreakpoint,
        width,
      }}
    >
      {children}
    </BootstrapBreakpointContext.Provider>
  );
};

const useBootstrapBreakpoint = () => {
  const context = React.useContext(BootstrapBreakpointContext);
  if (context === undefined) {
    throw new Error(
      "useBootstrapBreakpoint must be used within a BootstrapBreakpointContext"
    );
  }
  return context;
};

export { BootstrapBreakpointProvider, useBootstrapBreakpoint };
