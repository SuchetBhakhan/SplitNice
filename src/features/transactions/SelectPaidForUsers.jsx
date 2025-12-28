import React, { useEffect } from "react";
import SplitOptions from "./SplitOptions";
import PaidForUsers from "./PaidForUsers";

export default function SelectPaidForUsers() {
  return (
    <div>
      <SplitOptions />
      <PaidForUsers />
    </div>
  );
}
