import React, { useState } from 'react';
import { Sword, Shield, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { SERVER_CONFIG } from '../../config/serverConfig';
import { CopyIpButton } from './CopyIpButton';
import { DiscordButton } from './DiscordButton';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const openPolicyModal = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
  };

  return (
    <>
      <footer className="w-full bg-[#150c08] border-t border-amber-500/25 text-[#C6B7A5] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Col 1: Brand & Slogan */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 p-0.5 flex items-center justify-center text-black">
                  <div className="w-full h-full bg-[#1E120D] rounded-[10px] flex items-center justify-center">
                    <Sword className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
                <span className="font-heading font-black text-lg text-white">
                  CraftySMP <span className="text-amber-400 text-sm">Season 2</span>
                </span>
              </div>

              <p className="text-xs text-[#C6B7A5] leading-relaxed max-w-sm">
                {SERVER_CONFIG.brandSlogan}
                <br />
                {SERVER_CONFIG.secondarySlogan}
              </p>

              <div className="flex flex-col gap-2 pt-1 max-w-xs">
                <CopyIpButton variant="button" />
                <DiscordButton variant="secondary" label="JOIN OFFICIAL DISCORD" />
              </div>
            </div>

            {/* Col 2: Store Navigation */}
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-amber-300">
                Store Departments
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('weapons')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Custom Weapons
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('weapons')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Legendary Gear
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('kits')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Combat & Survival Kits
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('ranks')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Ranks & Prestiges
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('coins')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    SMP Coins Bundles
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Portal Links */}
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-amber-300">
                Server & Account
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('status')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Live Server Status
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('account')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    My Account & Delivery Orders
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('admin')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Staff Admin Dashboard
                  </button>
                </li>
                <li>
                  <a
                    href={SERVER_CONFIG.discordInviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition-colors inline-flex items-center gap-1"
                  >
                    <span>Discord Community</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Server Rules & Policies */}
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-amber-300">
                Server Policies
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      openPolicyModal(
                        'CraftySMP Server Rules',
                        '1. No hacked clients, X-ray, or unfair modification exploits.\n2. Respect other players and staff in chat.\n3. Griefing outside designated war zones or unmanaged claims is prohibited.\n4. Do not perform duplicate delivery scams.\n5. Staff decisions in ticket channels are final.'
                      )
                    }
                    className="hover:text-amber-400 transition-colors"
                  >
                    Server Rules
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      openPolicyModal(
                        'Terms of Service',
                        'All virtual items, kits, custom weapons, and ranks are digital gameplay enhancements for CraftySMP Season 2. Purchases are tied to your declared Minecraft Username. Chargebacks without prior ticket contact will result in automated account blacklist.'
                      )
                    }
                    className="hover:text-amber-400 transition-colors"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      openPolicyModal(
                        'Refund Policy',
                        'Due to the instant nature of digital goods delivery in Minecraft, store sales are generally non-refundable once dispatched to your player inventory. If an item fails to deliver due to technical issues, our server queue logs will automatically retry or staff will manually credit the item in our Discord ticket system.'
                      )
                    }
                    className="hover:text-amber-400 transition-colors"
                  >
                    Refund Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      openPolicyModal(
                        'Privacy Policy',
                        'We collect your Minecraft Username and optional Discord tag strictly for delivery execution, rank synchronization, and dispute resolution. No private financial account credentials are saved.'
                      )
                    }
                    className="hover:text-amber-400 transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-amber-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#C6B7A5]/80">
            <div>
              © 2026 CraftySMP Season 2. Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
            </div>
            <div className="flex items-center gap-4 font-mono text-amber-500/70">
              <span>IP: {SERVER_CONFIG.serverAddress}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Policy Modal */}
      {modalTitle && modalContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => {
            setModalTitle(null);
            setModalContent(null);
          }}
        >
          <div
            className="max-w-md w-full bg-[#1E120D] border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-4">
              <h3 className="font-heading font-bold text-lg text-white">{modalTitle}</h3>
              <button
                type="button"
                onClick={() => {
                  setModalTitle(null);
                  setModalContent(null);
                }}
                className="p-1 rounded bg-[#2A1A12] text-[#C6B7A5] hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-[#FFF8E7] leading-relaxed whitespace-pre-line bg-[#2A1A12] p-4 rounded-xl border border-amber-500/20 max-h-72 overflow-y-auto">
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
