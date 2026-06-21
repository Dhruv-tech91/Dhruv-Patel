/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  MapPin, 
  Briefcase, 
  Home, 
  Heart, 
  Compass, 
  Award, 
  Globe, 
  Sparkles,
  Info 
} from "lucide-react";
import { DHRUV_BIODATA } from "../data";

type FamilySection = "immediate" | "paternal" | "maternal";

interface TreeNodeProps {
  label: string;
  relation: string;
  extraInfo?: string;
  icon: React.ReactNode;
  location?: string;
  onClick: () => void;
  accent: "amber" | "rose" | "emerald" | "crimson";
}

function TreeNode({ label, relation, extraInfo, icon, location, onClick, accent }: TreeNodeProps) {
  const getAccentClass = () => {
    return "border-[#E5E4DF] bg-white hover:bg-[#FAF9F6] text-[#1A1A1A]";
  };

  const getBadgeClass = () => {
    return "bg-[#F2F0EB] text-[#7C6F5D]";
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`relative w-full border text-left p-4 rounded-sm transition-all duration-150 group flex items-start gap-4 cursor-pointer ${getAccentClass()}`}
    >
      <div className="p-3.5 bg-[#FAF9F6] rounded-sm border border-[#E5E4DF] group-hover:bg-[#E5E4DF]/40 transition duration-150">
        {icon}
      </div>
      <div className="flex-1 min-w-0 pr-4">
        <span className={`inline-block px-2.5 py-1 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest mb-1 ${getBadgeClass()}`}>
          {relation}
        </span>
        <h5 className="font-serif font-black text-sm tracking-tight truncate leading-normal uppercase">
          {label}
        </h5>
        {extraInfo && (
          <p className="text-[10px] text-stone-500 font-mono mt-0.5 truncate uppercase">
            {extraInfo}
          </p>
        )}
        {location && (
          <div className="flex items-center gap-1 mt-1 text-[10px] text-stone-400 font-mono">
            <Globe size={11} className="text-stone-400" />
            <span>{location}</span>
          </div>
        )}
      </div>
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-150 p-1.5 rounded-sm bg-[#1A1A1A] text-white">
        <Info size={11} />
      </div>
    </motion.button>
  );
}

export default function FamilyTree() {
  const [activeSection, setActiveSection] = useState<FamilySection>("immediate");
  const [modalDetails, setModalDetails] = useState<{
    title: string;
    relation: string;
    icon: React.ReactNode;
    bullets: { label: string; value: string }[];
    theme: "amber" | "rose" | "emerald";
  } | null>(null);

  const db = DHRUV_BIODATA;

  // Render connector line
  const TreeConnector = () => (
    <div className="hidden md:flex flex-col items-center justify-center my-1 pointer-events-none" id="tree-vertical-line">
      <div className="w-[1.5px] h-6 bg-[#E5E4DF]" />
    </div>
  );

  return (
    <div className="bg-white rounded-sm border border-[#E5E4DF] p-6 sm:p-8 relative overflow-hidden" id="family-tree-module">

      {/* Main Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E4DF] pb-5 mb-6 gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2F0EB] rounded-sm text-[#7C6F5D] text-[10px] font-bold uppercase tracking-wider mb-2">
            <Users size={12} className="text-[#7C6F5D]" /> Family Genealogy
          </span>
          <h3 className="font-serif text-3xl font-black text-[#1A1A1A] leading-tight border-b-2 border-[#1A1A1A] pb-1 w-fit uppercase">
            Lineage & Relation Tree
          </h3>
          <p className="text-stone-500 text-xs mt-1.5 max-w-xl font-serif italic">
            "Gujarat traditional roots with international outspreads. Click on any pedigree node to reveal deep family insights."
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center bg-[#F2F0EB] p-1 rounded-sm border border-[#E5E4DF]" id="tree-category-tabs">
          {(["immediate", "paternal", "maternal"] as FamilySection[]).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm transition-all duration-150 cursor-pointer ${
                activeSection === section 
                  ? "bg-[#1A1A1A] text-white shadow-sm" 
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              {section === "immediate" ? "Immediate" : section === "paternal" ? "Paternal" : "Maternal"}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Pedigree Graphics Box */}
      <div className="relative min-h-[380px] flex items-center justify-center p-3" id="tree-pedigree-box">
        <AnimatePresence mode="wait">
          {activeSection === "immediate" && (
            <motion.div
              key="immediate"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl space-y-4"
            >
              {/* Residence Highlight block */}
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-500 uppercase tracking-widest bg-[#FAF9F6] px-3.5 py-1.5 rounded-sm border border-[#E5E4DF]">
                  <MapPin size={11} className="text-[#7C6F5D]" /> RESIDENCE: RAYSAN, GANDHINAGAR, GUJARAT
                </span>
              </div>

              {/* Parents cluster */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TreeNode 
                  label={db.immediateFamily.fatherName}
                  relation="FATHER"
                  extraInfo="BUSINESS OWNER"
                  icon={<Briefcase size={18} className="text-[#7C6F5D]" />}
                  onClick={() => setModalDetails({
                    title: db.immediateFamily.fatherName,
                    relation: "Father",
                    icon: <Briefcase size={22} className="text-[#1A1A1A]" />,
                    theme: "amber",
                    bullets: [
                      { label: "Occupation", value: db.immediateFamily.fatherOccupation },
                      { label: "Legacy Business", value: "Maha Shakti Tubewell & Traders" },
                      { label: "Native Origin", value: db.paternalFamily.nativePlace },
                      { label: "Family Role", value: "Paternal Head of Household" }
                    ]
                  })}
                  accent="amber"
                />

                <TreeNode 
                  label={db.immediateFamily.motherName}
                  relation="MOTHER"
                  extraInfo="HOMEMAKER"
                  icon={<Home size={18} className="text-[#7C6F5D]" />}
                  onClick={() => setModalDetails({
                    title: db.immediateFamily.motherName,
                    relation: "Mother",
                    icon: <Home size={22} className="text-[#1A1A1A]" />,
                    theme: "rose",
                    bullets: [
                      { label: "Occupation", value: db.immediateFamily.motherOccupation },
                      { label: "Native Origin", value: db.maternalFamily.nativePlace },
                      { label: "Family Role", value: "Matriarch & Homemaker" }
                    ]
                  })}
                  accent="rose"
                />
              </div>

              <TreeConnector />

              {/* Candidate node */}
              <div className="max-w-md mx-auto">
                <div className="relative p-[1.5px] rounded-sm bg-[#7C6F5D] shadow-sm">
                  <div className="bg-[#FAF9F6] rounded-sm p-5 border border-[#E5E4DF]">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-sm bg-[#1A1A1A] text-white text-[9px] font-mono font-bold uppercase tracking-widest mb-2">
                       Candidate (Self)
                    </span>
                    <h4 className="font-serif text-2xl font-black text-[#1A1A1A] tracking-tighter uppercase">
                      {db.personal.name}
                    </h4>
                    <p className="text-xs text-stone-500 font-mono mt-1 uppercase">
                      {db.personal.education}
                    </p>
                  </div>
                </div>
              </div>

              <TreeConnector />

              {/* Sister node */}
              <div className="max-w-md mx-auto">
                <TreeNode 
                  label={db.immediateFamily.sisterName}
                  relation="SISTER"
                  extraInfo="LIVING IN AUSTRALIA"
                  icon={<Globe size={18} className="text-[#7C6F5D]" />}
                  location="Australia"
                  onClick={() => setModalDetails({
                    title: db.immediateFamily.sisterName,
                    relation: "Sister",
                    icon: <Globe size={22} className="text-[#1A1A1A]" />,
                    theme: "emerald",
                    bullets: [
                      { label: "Resident Country", value: "Australia" },
                      { label: "Status", value: "Settled Oversea" },
                      { label: "Family Relation", value: "Dearest Elder Sister" }
                    ]
                  })}
                  accent="emerald"
                />
              </div>
            </motion.div>
          )}

          {activeSection === "paternal" && (
            <motion.div
              key="paternal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl space-y-4"
            >
              {/* Native Highlight block */}
              <div className="text-center mb-4">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-widest bg-[#FAF9F6] px-3.5 py-1.5 rounded-sm border border-[#E5E4DF] text-stone-600">
                  <MapPin size={11} className="text-[#7C6F5D]" /> PATERNAL NATIVE: {db.paternalFamily.nativePlace} (48 Gam Kadva Patidar Samaj)
                </span>
              </div>

              {/* Grandparents cluster */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TreeNode 
                  label={db.paternalFamily.grandfatherName}
                  relation="DADA"
                  extraInfo="PATERNAL FOREFATHER"
                  icon={<Heart size={18} className="text-[#7C6F5D]" />}
                  onClick={() => setModalDetails({
                    title: db.paternalFamily.grandfatherName,
                    relation: "Dada (Paternal Grandfather)",
                    icon: <Heart size={22} className="text-[#1A1A1A]" />,
                    theme: "amber",
                    bullets: [
                      { label: "Lineage", value: "Patel Paternal Forefather" },
                      { label: "Native Ancestry", value: db.paternalFamily.nativePlace }
                    ]
                  })}
                  accent="amber"
                />

                <TreeNode 
                  label={db.paternalFamily.grandmotherName}
                  relation="DADI / DAI"
                  extraInfo="PATERNAL GRAND MOTHER"
                  icon={<Heart size={18} className="text-[#7C6F5D]" />}
                  onClick={() => setModalDetails({
                    title: db.paternalFamily.grandmotherName,
                    relation: "Dadi / Dai (Paternal Grandmother)",
                    icon: <Heart size={22} className="text-[#1A1A1A]" />,
                    theme: "rose",
                    bullets: [
                      { label: "Lineage", value: "Patel Paternal Matriarch" },
                      { label: "Native Ancestry", value: db.paternalFamily.nativePlace }
                    ]
                  })}
                  accent="rose"
                />
              </div>

              <TreeConnector />

              {/* Uncle and Aunt USA cluster */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TreeNode 
                  label={db.paternalFamily.uncleName}
                  relation="UNCLE (KAKU)"
                  extraInfo="SETTLED IN USA"
                  icon={<Globe size={18} className="text-[#7C6F5D]" />}
                  location="USA"
                  onClick={() => setModalDetails({
                    title: db.paternalFamily.uncleName,
                    relation: "Uncle (Kaku)",
                    icon: <Globe size={22} className="text-[#1A1A1A]" />,
                    theme: "emerald",
                    bullets: [
                      { label: "Residence", value: "USA" },
                      { label: "Paternal Status", value: "Established Abroad" }
                    ]
                  })}
                  accent="emerald"
                />

                <TreeNode 
                  label={db.paternalFamily.auntName}
                  relation="AUNTY (KAKI)"
                  extraInfo="SETTLED IN USA"
                  icon={<Globe size={18} className="text-[#7C6F5D]" />}
                  location="USA"
                  onClick={() => setModalDetails({
                    title: db.paternalFamily.auntName,
                    relation: "Aunty (Kaki)",
                    icon: <Globe size={22} className="text-[#1A1A1A]" />,
                    theme: "emerald",
                    bullets: [
                      { label: "Residence", value: "USA" },
                      { label: "Status", value: "Settled Oversea" }
                    ]
                  })}
                  accent="emerald"
                />
              </div>
            </motion.div>
          )}

          {activeSection === "maternal" && (
            <motion.div
              key="maternal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl space-y-4"
            >
              {/* Native Highlight block */}
              <div className="text-center mb-4">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono tracking-widest uppercase bg-[#FAF9F6] px-3.5 py-1.5 rounded-sm border border-[#E5E4DF] text-stone-600">
                  <MapPin size={11} className="text-[#7C6F5D]" /> MATERNAL NATIVE: {db.maternalFamily.nativePlace} (48 Gam Kadva Patidar Samaj)
                </span>
              </div>

              {db.maternalFamily.mamas.map((mamaPair, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="text-[#7C6F5D] font-mono text-[9px] font-bold uppercase tracking-widest text-center mt-2">
                    MAMA - MAMI RELATION PAIR {idx + 1} {mamaPair.location && `(${mamaPair.location})`}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TreeNode 
                      label={mamaPair.mamaName}
                      relation={`MAMA ${mamaPair.location ? `(${mamaPair.location})` : ''}`}
                      extraInfo="MATERNAL UNCLE"
                      icon={<Users size={18} className="text-[#7C6F5D]" />}
                      onClick={() => setModalDetails({
                        title: mamaPair.mamaName,
                        relation: `Maternal Uncle (Mama)`,
                        icon: <Users size={22} className="text-[#1A1A1A]" />,
                        theme: "emerald",
                        bullets: [
                          { label: "Native Origin", value: db.maternalFamily.nativePlace },
                          { label: "Identity Group", value: "48 Gam Kadva Patidar Samaj" },
                          { label: "Location / Affiliation", value: mamaPair.location || "Native" }
                        ]
                      })}
                      accent="emerald"
                    />

                    <TreeNode 
                      label={mamaPair.mamiName}
                      relation={`MAMI ${mamaPair.location ? `(${mamaPair.location})` : ''}`}
                      extraInfo="MATERNAL AUNT"
                      icon={<Heart size={18} className="text-[#7C6F5D]" />}
                      onClick={() => setModalDetails({
                        title: mamaPair.mamiName,
                        relation: `Maternal Aunt (Mami)`,
                        icon: <Heart size={22} className="text-[#1A1A1A]" />,
                        theme: "rose",
                        bullets: [
                          { label: "Native Origin", value: db.maternalFamily.nativePlace },
                          { label: "Identity Group", value: "48 Gam Kadva Patidar Samaj" },
                          { label: "Location / Affiliation", value: mamaPair.location || "Native" }
                        ]
                      })}
                      accent="rose"
                    />
                  </div>
                  {idx < db.maternalFamily.mamas.length - 1 && <TreeConnector />}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {modalDetails && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1a1a1acc]/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 cursor-pointer"
            onClick={() => setModalDetails(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white max-w-md w-full rounded-sm border border-[#E5E4DF] p-6 sm:p-8 shadow-xl relative cursor-default text-[#1A1A1A]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-5 border-b border-[#E5E4DF] pb-4">
                <div className="p-3 bg-white text-[#1A1A1A] border border-[#E5E4DF] rounded-sm">
                  {modalDetails.icon}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#7C6F5D] block mb-0.5">
                    Relation: {modalDetails.relation}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-black text-[#1A1A1A] leading-tight uppercase">
                    {modalDetails.title}
                  </h4>
                </div>
              </div>

              {/* Bullet list */}
              <div className="space-y-4">
                {modalDetails.bullets.map((bullet, idx) => (
                  <div key={idx} className="bg-[#FAF9F6] p-3 rounded-sm border border-[#E5E4DF]">
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-mono font-bold block mb-1">
                      {bullet.label}
                    </span>
                    <span className="text-[#1A1A1A] text-xs font-bold font-mono leading-relaxed">
                      {bullet.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setModalDetails(null)}
                className="mt-6 w-full py-3 bg-[#1A1A1A] hover:bg-[#7C6F5D] text-white font-mono font-bold text-xs rounded-sm transition duration-150 uppercase tracking-widest cursor-pointer"
              >
                Close Details
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
