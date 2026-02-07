import { useNavigate } from "react-router-dom";
import { tokenStorage } from "../../auth/tokenStorage";
import { useAccount } from "../../hooks/useAccount";
import { HeaderAccounts } from "./HeaderAccounts";
import { useState } from "react";
import { OverviewSection } from "./OverviewSection";

// ✅ importa tus secciones
import {DonateSection} from "./DonateSection";
import { RecruitSection } from "./RecruitSection";
import { TabKey } from "../../types";
import { HopzoneRewardsSection } from "./HopzoneRewardsPage";

export default function AccountPage() {
  const navigate = useNavigate();
  const { token, data, loading, error, refresh, stats } = useAccount();
  const [tab, setTab] = useState<TabKey>("overview");

  const login = data?.account?.login ?? "";

  function logout() {
    tokenStorage.clear();
    navigate("/");
  }

  if (!token) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white">
      {/* Fondo */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 py-10">

        <HeaderAccounts
          login={login}
          activeTab={tab}
          onTabChange={setTab}
          onRefresh={refresh}
          onLogout={logout}
        />

        {tab === "overview" && (
          <OverviewSection
            stats={stats}
            loading={loading}
            error={error}
            characters={data?.characters ?? []}
          />
        )}

        {tab === "donate" && (
          <DonateSection />
        )}

        {tab === "recruit" && (
          <RecruitSection characters={data?.characters ?? []} />
        )}

      {tab === "rewards" && (
          <HopzoneRewardsSection characters={data?.characters ?? []} />
        )}


        <div className="mt-8 text-center text-xs text-white/35">
          © {new Date().getFullYear()} Path of Glory — Interlude l2 private server
        </div>
      </div>
    </div>
  );
}
