"use client";

import Pending from "./Pending";
import Inprogress from "./Inprogress";
import UploadProductionProofs from "./UploadProductionProofs";
import Shipping from "./Shipping";
import { Mode } from "@/app/orders/simulation/page";

interface Props {
  mode: Mode;
}

const OrderContent = ({ mode }: Props) => {
  switch (mode) {
    case "pending":
      return <Pending />;
    case "inprogress":
      return <Inprogress />;
    case "awaiting_proofs":
      return <UploadProductionProofs />;
    case "ready_to_ship":
      return <Shipping />;
  }
};

export default OrderContent;