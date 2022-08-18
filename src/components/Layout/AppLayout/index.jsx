import React from "react";
import { getUserName } from "../../../services/auth"

function AppLayout() {
  const userName = getUserName()
  return (
    <>
      <div>Hello {userName}!</div>
    </>
  );
}

export default AppLayout;
