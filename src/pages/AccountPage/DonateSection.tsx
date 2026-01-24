import { useNavigate } from "react-router-dom";
import { useAccount } from "../../hooks/useAccount";
import { DonationCalculator } from "../../components/DonationCalculator";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {HeaderAccounts} from "./HeaderAccounts";

export function DonateSection() {
  const navigate = useNavigate();
  const { token, data, loading, error, refresh, stats } = useAccount();

  return (

    <div className="min-h-screen bg-[#0b0f17] text-white">

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 py-10">

        <DonationCalculator />
      </div>
    </div>
  );
}
