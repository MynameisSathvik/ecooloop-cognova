import React, { useState } from 'react';

interface HeaderProps {
  onReset: () => void;
  onOpenDrawerItem: (item: 'research' | 'sources' | 'transparency' | 'settings') => void;
  activeCluster: string;
}

export const Header: React.FC<HeaderProps> = ({ onReset, onOpenDrawerItem, activeCluster }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const logoUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1WvTPYfZtFz9eG9PDDanJCV17vyPb2TbLqfJ2onYyZT8NxahLliDUG2n85acEbMcnt-cv9yOsr6s-edzCX7A94Ygx_dy0vnNb-VtCcvIHW2cczMsqoCItVn2WB_fG25CMK8-tV5GMFU3YsiIILwWTW5_YBuKstY4TN49V3SECAypN4ruTrd1L7HGQ9xtlDXMaD61iKVI8DshkDtD_y9mcz4IlkFdKPWTh-Cb6p2c0wN_MYEpqedkPxMdhk';

  return (
    <>
      {/* Drawer Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-surface-container-lowest z-50 transform transition-transform duration-300 ease-out flex flex-col justify-between pt-safe pb-safe shadow-[0_10px_25px_rgba(19,27,46,0.12)] ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Drawer Header */}
          <div className="p-space-lg flex items-center justify-between border-b border-surface-container">
            <div className="flex items-center gap-space-xs">
              <img
                src={logoUrl}
                alt="EcoLoop Campus Logo"
                className="h-8 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface leading-tight font-bold">
                  EcoLoop SVIT
                </span>
                <span className="font-label-sm text-label-sm text-outline">Campus Operations</span>
              </div>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="w-11 h-11 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low cursor-pointer transition-colors"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Telemetry Status */}
          <div className="px-space-md py-space-xs">
            <div className="bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="font-label-sm text-label-sm text-on-surface font-medium">Telemetry Live</span>
              </div>
              <span className="font-code-num text-code-num text-outline font-semibold">99.8% Sync</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-space-sm py-space-md flex flex-col gap-space-2xs">
            <button
              onClick={() => {
                setDrawerOpen(false);
                onOpenDrawerItem('research');
              }}
              className="w-full flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface hover:bg-surface-container-low transition-colors text-left"
            >
              <span className="material-symbols-outlined text-outline">analytics</span>
              <span className="font-label-md text-label-md font-medium">Research &amp; Data</span>
            </button>
            <button
              onClick={() => {
                setDrawerOpen(false);
                onOpenDrawerItem('sources');
              }}
              className="w-full flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface hover:bg-surface-container-low transition-colors text-left"
            >
              <span className="material-symbols-outlined text-outline">hub</span>
              <span className="font-label-md text-label-md font-medium">Sources &amp; Registry</span>
            </button>
            <button
              onClick={() => {
                setDrawerOpen(false);
                onOpenDrawerItem('transparency');
              }}
              className="w-full flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface hover:bg-surface-container-low transition-colors text-left"
            >
              <span className="material-symbols-outlined text-outline">policy</span>
              <span className="font-label-md text-label-md font-medium">Data Transparency</span>
            </button>
            <button
              onClick={() => {
                setDrawerOpen(false);
                onOpenDrawerItem('settings');
              }}
              className="w-full flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface hover:bg-surface-container-low transition-colors text-left"
            >
              <span className="material-symbols-outlined text-outline">tune</span>
              <span className="font-label-md text-label-md font-medium">System Settings</span>
            </button>
          </nav>
        </div>

        {/* Drawer Footer */}
        <div className="p-space-lg bg-surface-container-low flex flex-col gap-space-sm border-t border-surface-container">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-outline">Compliance Tier</span>
            <span className="font-code-num text-code-num text-primary font-bold">ISO 14001:2015</span>
          </div>
          <button
            className="w-full flex items-center justify-center gap-space-xs py-space-xs px-space-sm rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container text-label-sm font-label-sm font-semibold transition-colors shadow-sm"
            onClick={() => {
              setDrawerOpen(false);
              onReset();
            }}
          >
            <span className="material-symbols-outlined text-[16px] text-outline">restart_alt</span>
            <span>Reset Session Cache</span>
          </button>
        </div>
      </aside>

      {/* Fixed Sticky Header */}
      <header className="fixed top-0 w-full z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
        <div className="h-16 px-margin-mobile flex items-center justify-between max-w-4xl mx-auto">
          {/* Left: Hamburger & Brand */}
          <div className="flex items-center gap-space-xs">
            <button
              onClick={() => setDrawerOpen(true)}
              className="w-11 h-11 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
              aria-label="Open navigation drawer"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <img
              alt="EcoLoop Campus Logo"
              className="h-8 w-auto object-contain"
              src={logoUrl}
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none font-bold">
                EcoLoop
              </span>
              <span className="font-label-sm text-label-sm text-outline leading-tight">
                Campus Dashboard
              </span>
            </div>
          </div>

          {/* Right: Status Pill, Reset, Profile */}
          <div className="flex items-center gap-space-xs">
            <div className="hidden sm:flex items-center gap-space-2xs bg-primary-fixed/20 text-on-primary-fixed-variant px-space-xs py-1 rounded-full border border-primary-fixed/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-label-sm text-label-sm font-semibold">{activeCluster}</span>
            </div>

            <button
              onClick={onReset}
              className="w-11 h-11 flex items-center justify-center rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors active:scale-95"
              title="Reset Demo Environment"
              aria-label="Reset Demo Environment"
            >
              <span className="material-symbols-outlined text-[22px]">refresh</span>
            </button>

            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm hover:ring-2 hover:ring-primary/40 transition-all cursor-pointer relative"
              aria-label="User Profile"
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
            </button>
          </div>
        </div>

        {/* Profile Dropdown Dialog */}
        {profileOpen && (
          <div className="fixed top-16 right-4 z-50 w-72 bg-surface-container-lowest rounded-xl shadow-xl p-space-md border border-surface-container flex flex-col gap-space-sm animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center gap-space-xs pb-space-xs border-b border-surface-container">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-lg">
                SC
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-sm font-bold text-on-surface truncate">
                  Sathvik C.
                </span>
                <span className="font-body-sm text-[11px] text-outline truncate">
                  5008258.sathvik@gmail.com
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-xs text-on-surface-variant">
              <div className="flex justify-between py-1">
                <span className="text-outline">Role:</span>
                <span className="font-semibold text-primary">Campus Operations Officer</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-outline">Division:</span>
                <span className="font-semibold">SVIT Green Innovation Cell</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-outline">Badge ID:</span>
                <span className="font-mono text-outline">SVIT-OPS-09</span>
              </div>
            </div>
            <div className="pt-space-xs border-t border-surface-container flex justify-end">
              <button
                onClick={() => setProfileOpen(false)}
                className="px-3 py-1 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
