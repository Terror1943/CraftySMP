import React, { useState } from 'react';
import { Award, Check, ShieldAlert, Sparkles, Upload, Send, ExternalLink } from 'lucide-react';
import { Rank, RankApplication } from '../../types';
import { ProductImage } from '../common/ProductImage';
import { DiscordButton } from '../common/DiscordButton';
import { SERVER_CONFIG } from '../../config/serverConfig';
import { sfx } from '../../utils/sound';

interface RanksPageProps {
  ranks: Rank[];
  onApplyRank: (application: RankApplication) => void;
  currentUserMinecraftName?: string;
  currentUserDiscordTag?: string;
  userId?: string;
}

export const RanksPage: React.FC<RanksPageProps> = ({
  ranks,
  onApplyRank,
  currentUserMinecraftName = '',
  currentUserDiscordTag = '',
  userId,
}) => {
  const [selectedRank, setSelectedRank] = useState<Rank | null>(null);
  const [minecraftUsername, setMinecraftUsername] = useState(currentUserMinecraftName);
  const [discordTag, setDiscordTag] = useState(currentUserDiscordTag);
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleOpenApply = (rank: Rank) => {
    sfx.playClick();
    setSelectedRank(rank);
    setSubmitted(false);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRank || !minecraftUsername.trim()) return;

    const newApp: RankApplication = {
      id: 'app_' + Math.random().toString(36).substring(2, 9),
      userId: userId || undefined,
      rankId: selectedRank.id,
      rankName: selectedRank.name,
      minecraftUsername: minecraftUsername.trim(),
      discordTag: discordTag.trim(),
      evidenceUrl: evidenceUrl.trim(),
      notes: notes.trim(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    sfx.playSuccess();
    onApplyRank(newApp);
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-heading font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Server Prestiges & Permissions</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
          CRAFTYSMP RANKS & REWARDS
        </h1>
        <p className="text-sm sm:text-base text-[#C6B7A5] leading-relaxed">
          Ascend the hierarchy of CraftySMP Season 2. Earn status through in-game conquest, store support, content creation, or community dedication.
        </p>
      </div>

      {/* Ranks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ranks.map((rank) => (
          <div
            key={rank.id}
            className={`relative rounded-2xl bg-gradient-to-b from-[#2A1A12] to-[#1E120D] border-2 ${
              rank.id === 'rank-luxury'
                ? 'border-orange-500/70 shadow-[0_0_30px_rgba(255,140,0,0.25)]'
                : 'border-amber-500/30 hover:border-amber-400/60'
            } p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1`}
          >
            <div>
              {/* Reward Image Slot */}
              {rank.image ? (
                <div className="relative mb-4">
                  <ProductImage
                    src={rank.image}
                    alt={`${rank.name} Rank Kit Reward`}
                    fit="contain"
                    aspectRatio="square"
                    className="w-full h-48 bg-[#180e0a] rounded-xl border border-amber-500/20"
                  />
                  <div className="text-[10px] text-amber-400/80 font-mono text-center mt-1">
                    *Kit Reward Preview
                  </div>
                </div>
              ) : (
                <div className="w-full h-36 mb-4 rounded-xl bg-gradient-to-br from-[#2A1A12] to-[#1E120D] border border-amber-500/20 flex flex-col items-center justify-center p-4 text-center">
                  <Award className="w-10 h-10 text-amber-400/60 mb-2" />
                  <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#C6B7A5]">
                    {rank.name} Badge
                  </span>
                  <span className="text-[10px] text-stone-500 mt-0.5">Staff Configured</span>
                </div>
              )}

              {/* Title & Requirement */}
              <div className="flex items-center justify-between gap-2 border-b border-amber-500/15 pb-3 mb-3">
                <h3 className="font-heading font-black text-xl text-white">
                  {rank.name}
                </h3>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 font-mono text-xs font-bold text-amber-300">
                  {rank.priceReq}
                </span>
              </div>

              {/* Requirement Condition */}
              <p className="text-xs text-[#C6B7A5] mb-4 leading-relaxed italic">
                {rank.condition}
              </p>

              {/* Reward list */}
              <div className="space-y-2 mb-6">
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-amber-400 block">
                  Perks & Kit Privileges:
                </span>
                <ul className="space-y-1.5 text-xs text-[#FFF8E7]">
                  {rank.rewards.map((reward, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{reward}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action button */}
            <div className="pt-4 border-t border-amber-500/20">
              <button
                type="button"
                onClick={() => handleOpenApply(rank)}
                className={`w-full py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                  rank.id === 'rank-member'
                    ? 'bg-[#382217] text-[#FFF8E7] hover:bg-amber-600'
                    : 'text-[#1E120D] bg-gradient-to-r from-[#FFD700] via-[#FF8C00] to-[#FF5722] hover:brightness-110 shadow-md'
                }`}
              >
                {rank.id === 'rank-member' ? 'FREE ON JOIN' : `APPLY / CLAIM ${rank.name.toUpperCase()}`}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Rank Application Modal */}
      {selectedRank && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedRank(null)}
        >
          <div
            className="relative w-full max-w-md bg-[#1E120D] border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading font-extrabold text-lg text-white">
                  Claim {selectedRank.name} Rank
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRank(null)}
                className="p-1 rounded bg-[#2A1A12] text-[#C6B7A5] hover:text-white"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-lg text-white">
                  Application Submitted!
                </h4>
                <p className="text-xs text-[#C6B7A5]">
                  Your claim for <strong className="text-amber-300">{selectedRank.name}</strong> has been forwarded to the server staff verification queue. Join our Discord for updates.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <DiscordButton variant="primary" label="OPEN DISCORD TICKETS" />
                  <button
                    type="button"
                    onClick={() => setSelectedRank(null)}
                    className="py-2 text-xs text-stone-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div className="p-3 rounded-xl bg-[#2A1A12] border border-amber-500/20 text-xs space-y-1">
                  <span className="text-stone-400 block font-heading font-semibold uppercase">Requirements:</span>
                  <p className="text-amber-200">{selectedRank.condition}</p>
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-amber-300 mb-1">
                    Minecraft Username (IGN) *
                  </label>
                  <input
                    type="text"
                    required
                    value={minecraftUsername}
                    onChange={(e) => setMinecraftUsername(e.target.value)}
                    placeholder="Exact Minecraft in-game name"
                    className="w-full px-3 py-2 rounded-xl bg-[#2A1A12] border border-amber-500/30 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#C6B7A5] mb-1">
                    Discord Username *
                  </label>
                  <input
                    type="text"
                    required
                    value={discordTag}
                    onChange={(e) => setDiscordTag(e.target.value)}
                    placeholder="e.g. crafty_player"
                    className="w-full px-3 py-2 rounded-xl bg-[#2A1A12] border border-amber-500/30 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#C6B7A5] mb-1">
                    Evidence Link (Views, Stream log, or Kill proof)
                  </label>
                  <input
                    type="url"
                    value={evidenceUrl}
                    onChange={(e) => setEvidenceUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=... or screenshot link"
                    className="w-full px-3 py-2 rounded-xl bg-[#2A1A12] border border-amber-500/30 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#C6B7A5] mb-1">
                    Additional Notes for Staff
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any qualifying purchase order numbers or details..."
                    className="w-full px-3 py-2 rounded-xl bg-[#2A1A12] border border-amber-500/30 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-[#1E120D] bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>SUBMIT APPLICATION FOR REVIEW</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
