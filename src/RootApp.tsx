import React from "react";
import { TimeTrackersProvider } from "gnhub-time-trackers";

function RootApp ({ children }: { children: React.ReactNode }) {
  return (
    <TimeTrackersProvider>
      {children}
    </TimeTrackersProvider>
  );
}

export default RootApp;