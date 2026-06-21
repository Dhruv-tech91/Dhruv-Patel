/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  MapPin, 
  Award, 
  Printer, 
  Share2, 
  Copy, 
  Check, 
  VolumeX, 
  Volume2, 
  Sparkles, 
  User, 
  BookOpen, 
  Flame, 
  Compass, 
  UtensilsCrossed, 
  Activity, 
  PhoneCall, 
  Smartphone, 
  PartyPopper 
} from "lucide-react";
import { DHRUV_BIODATA } from "./data";
import PhotoShowcase from "./components/PhotoShowcase";
import FamilyTree from "./components/FamilyTree";
import PrintPDF from "./components/PrintPDF";
import { compressAndPersistImage } from "./utils/imageHelper";

export default function App() {
  const db = DHRUV_BIODATA;

  // Centralized state holding uploaded photo URLs relative to candidate looks initialized from localStorage
  const [uploadedPhotos, setUploadedPhotos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("dhruv_persistent_photos");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"vital" | "wardrobe" | "family" | "print">("vital");
  const [isUploadingBio, setIsUploadingBio] = useState(false);

  // Sync state with localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem("dhruv_persistent_photos", JSON.stringify(uploadedPhotos));
    } catch (e) {
      console.error("Local storage sync error:", e);
    }
  }, [uploadedPhotos]);

  // Handle centralized photo upload
  const handlePhotoUploaded = (photoId: string, url: string | null) => {
    setUploadedPhotos((prev) => {
      const next = { ...prev };
      if (url === null) {
        delete next[photoId];
      } else {
        next[photoId] = url;
      }
      return next;
    });
  };

  // Compile full text for easy WhatsApp sharing
  const handleCopyText = () => {
    const rawDetails = `
🌺 *BIODATA: PATEL DHRUV RAKESHBHAI* 🌺

📍 *PERSONAL DETAILS:*
• Name: ${db.personal.name}
• Date of Birth: ${db.personal.dob}
• Height: 176 cm (5'9")
• Age: ${db.personal.age} Years
• Weight: ${db.personal.weightCc} kg
• Birth Place: ${db.personal.birthPlace}
• Education: ${db.personal.education}
• Hobbies: ${db.personal.hobbies.join(", ")}

📍 *IMMEDIATE FAMILY:*
• Father's Name: ${db.immediateFamily.fatherName}
• Father's Occupation: ${db.immediateFamily.fatherOccupation}
• Father's Contact: +91 ${db.immediateFamily.fatherPhone}
• Mother's Name: ${db.immediateFamily.motherName}
• Mother's Occupation: ${db.immediateFamily.motherOccupation}
• Mother's Contact: +91 ${db.immediateFamily.motherPhone}
• Sister's Name: ${db.immediateFamily.sisterName} (Australia)
• Sister's Contact: ${db.immediateFamily.sisterPhone}

📍 *PATERNAL FAMILY TREE:*
• Native Origin: ${db.paternalFamily.nativePlace} (48 Gam Kadva Patidar Samaj)
• Dada: ${db.paternalFamily.grandfatherName}
• Dadi / Dai: ${db.paternalFamily.grandmotherName}
• Uncle (Kaku): ${db.paternalFamily.uncleName} (${db.paternalFamily.uncleLocation})
• Aunty (Kaki): ${db.paternalFamily.auntName} (${db.paternalFamily.auntLocation})

📍 *MATERNAL FAMILY TREE:*
• Native Origin: ${db.maternalFamily.nativePlace} (48 Gam Kadva Patidar Samaj)
${db.maternalFamily.mamas.map((mama, idx) => `• Mama ${idx+1}: ${mama.mamaName} ${mama.location ? `(${mama.location})` : ''}\n• Mami ${idx+1}: ${mama.mamiName} ${mama.location ? `(${mama.location})` : ''}`).join('\n')}

📞 *CONTACT INQUIRIES:*
• Phone: +91 ${db.contact.phone}
• Email: ${db.contact.email}
    `.trim();

    navigator.clipboard.writeText(rawDetails).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] relative text-[#1A1A1A] font-sans selection:bg-[#7C6F5D] selection:text-white" id="main-application-node">
      
      {/* Top accent border bar in bold trend accent color */}
      <div className="absolute top-0 inset-x-0 h-3 bg-[#7C6F5D] z-40 shadow-sm no-print" />

      {/* --- FLOATING CONTROLS RAIL (SHARE / ACTION) --- */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-30 no-print">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyText}
          className="p-3.5 bg-[#1A1A1A] hover:bg-[#7C6F5D] active:scale-95 text-white rounded-sm shadow-xl transition-all duration-300 relative group cursor-pointer border border-[#E5E4DF]"
          title="Share Biodata Details"
        >
          {copySuccess ? <Check size={20} strokeWidth={2.5} /> : <Share2 size={20} />}
          
          {/* Custom micro tooltip */}
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-[#1A1A1A] text-white text-[10px] font-bold px-3 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none uppercase tracking-wider whitespace-nowrap shadow-md border border-[#E5E4DF]">
            {copySuccess ? "Copied text to clipboard!" : "Copy Full Text for WhatsApp"}
          </span>
        </motion.button>
      </div>

      {/* --- HERO BANNER & HEADER JUMBOTRON --- */}
      <header className="relative pt-16 pb-12 bg-white text-[#1A1A1A] text-left border-b border-[#E5E4DF] no-print" id="applet-cover-header">
        
        <div className="max-w-4xl mx-auto px-6 relative flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            {/* Traditional Auspicious Ganesha vector badge in clean high contrast */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 p-2 px-3 bg-[#F2F0EB] border border-[#E5E4DF] rounded-sm"
            >
              <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#1A1A1A] fill-none stroke-current" strokeWidth="3">
                <path d="M50,15 C42,15 36,25 36,35 C36,45 42,48 50,48 C58,48 64,45 64,35 C64,25 58,15 50,15 Z" />
                <path d="M50,48 C50,48 50,65 42,75 Q38,80 44,82 Q50,84 50,75" />
                <line x1="46" y1="30" x2="40" y2="32" />
                <line x1="54" y1="30" x2="60" y2="32" />
                <circle cx="50" cy="38" r="3" className="fill-[#1A1A1A]" />
              </svg>
            </motion.div>

            {/* Bridegroom Candidate Title - BOLD TYPOGRAPHY STYLE */}
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.4em] font-semibold text-[#8C8984] mb-2">Personal Biodata</p>
              <motion.h1 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-serif text-5xl sm:text-6xl font-black text-[#1A1A1A] tracking-tighter leading-none uppercase"
              >
                PATEL <span className="text-[#7C6F5D]">DHRUV</span>
              </motion.h1>
            </div>
          </div>

          {/* Academic Tag */}
          <div className="text-left md:text-right space-y-1">
            <p className="text-xl sm:text-2xl font-serif italic text-[#7C6F5D] leading-none">{db.personal.education}</p>
            <p className="text-[11px] uppercase tracking-widest font-bold mt-1 text-[#1A1A1A]">Ahmedabad, Gujarat</p>
          </div>
        </div>
      </header>

      {/* Quick Stats horizontal bar below header */}
      <div className="bg-[#FAF9F6] border-b border-[#E5E4DF] py-4 no-print">
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto px-6 flex flex-wrap gap-2.5 sm:gap-3.5"
        >
          <span className="px-3.5 py-1.5 bg-[#F2F0EB] text-xs font-bold text-[#1A1A1A] border border-[#E5E4DF] rounded-sm uppercase tracking-wider">
            📅 DOB: {db.personal.dob}
          </span>
          <span className="px-3.5 py-1.5 bg-[#F2F0EB] text-xs font-bold text-[#1A1A1A] border border-[#E5E4DF] rounded-sm uppercase tracking-wider">
            📏 Height: {db.personal.heightCm} cm
          </span>
          <span className="px-3.5 py-1.5 bg-[#F2F0EB] text-xs font-bold text-[#1A1A1A] border border-[#E5E4DF] rounded-sm uppercase tracking-wider">
            ⚖️ Weight: {db.personal.weightCc} kg
          </span>
          <span className="px-3.5 py-1.5 bg-[#F2F0EB] text-xs font-bold text-[#1A1A1A] border border-[#E5E4DF] rounded-sm uppercase tracking-wider">
            📍 Age: {db.personal.age} Years
          </span>
        </motion.div>
      </div>

      {/* --- CENTRAL LAYOUT BODY --- */}
      <main className="max-w-4xl mx-auto px-6 pb-20 pt-8 relative z-20 no-print">

        {/* Dynamic Nav Anchor Header bar */}
        <div className="bg-white rounded-sm border border-[#E5E4DF] p-2 flex flex-wrap justify-between items-center mb-8 gap-2 no-print" id="dashboard-navbar-rail">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveTab("vital")}
              className={`px-4 py-2.5 rounded-sm font-bold uppercase tracking-wider text-[11px] transition-all duration-150 cursor-pointer ${
                activeTab === "vital" 
                  ? "bg-[#1A1A1A] text-white" 
                  : "text-[#8C8984] hover:text-[#1A1A1A] hover:bg-[#F2F0EB]"
              }`}
            >
              🙋‍♂️ Bio Essentials
            </button>
            <button
              onClick={() => setActiveTab("wardrobe")}
              className={`px-4 py-2.5 rounded-sm font-bold uppercase tracking-wider text-[11px] transition-all duration-150 cursor-pointer ${
                activeTab === "wardrobe" 
                  ? "bg-[#1A1A1A] text-white" 
                  : "text-[#8C8984] hover:text-[#1A1A1A] hover:bg-[#F2F0EB]"
              }`}
            >
              👔 Lookbook Showcase
            </button>
            <button
              onClick={() => setActiveTab("family")}
              className={`px-4 py-2.5 rounded-sm font-bold uppercase tracking-wider text-[11px] transition-all duration-150 cursor-pointer ${
                activeTab === "family" 
                  ? "bg-[#1A1A1A] text-white" 
                  : "text-[#8C8984] hover:text-[#1A1A1A] hover:bg-[#F2F0EB]"
              }`}
            >
              🌳 Pedigree Family tree
            </button>
            <button
              onClick={() => setActiveTab("print")}
              className={`px-4 py-2.5 rounded-sm font-bold uppercase tracking-wider text-[11px] transition-all duration-150 cursor-pointer ${
                activeTab === "print" 
                  ? "bg-[#1A1A1A] text-white" 
                  : "text-[#8C8984] hover:text-[#1A1A1A] hover:bg-[#F2F0EB]"
              }`}
            >
              📄 PDF Generation
            </button>
          </div>

          {/* Quick contact trigger block */}
          <div className="hidden sm:flex items-center gap-3.5 pr-2.5 text-xs border-l border-[#E5E4DF] pl-4">
            <div className="text-right">
              <span className="text-[10px] text-[#8C8984] font-mono block uppercase">Direct Enquiries</span>
              <a href={`tel:${db.contact.phone}`} className="font-bold text-[#7C6F5D] hover:underline hover:text-[#1A1A1A]">+91 {db.contact.phone}</a>
            </div>
          </div>
        </div>

        {/* --- DYNAMIC TRANSITIONAL SECTIONS HOUSING --- */}
        <AnimatePresence mode="wait">
          {activeTab === "vital" && (
            <motion.div
              key="vital-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              id="bio-vital-segment"
            >
              {/* Left Column: Personal Attributes like theme Portrait and Vital Stats */}
              <div className="space-y-6 md:col-span-1">
                {/* Visual Avatar Placeholder representing the trend */}
                <div 
                  onClick={() => document.getElementById("portrait-upload-input")?.click()}
                  className="w-full aspect-[4/5] bg-[#E5E4DF] hover:bg-[#FAF9F6] transition-all duration-150 rounded-sm flex flex-col items-center justify-center relative p-6 border border-[#E5E4DF] shadow-sm cursor-pointer overflow-hidden group"
                  title="Click to upload profile photo"
                >
                  {isUploadingBio && (
                    <div className="absolute inset-0 bg-white/95 z-30 flex flex-col items-center justify-center text-center p-4">
                      <div className="w-8 h-8 border-4 border-[#7C6F5D] border-t-transparent rounded-full animate-spin mb-3"></div>
                      <p className="font-serif text-[#1A1A1A] font-bold text-xs uppercase tracking-wider">Saving Photo...</p>
                      <p className="text-stone-500 font-mono text-[8px] mt-1">Compressing image for permanent local storage</p>
                    </div>
                  )}
                  {uploadedPhotos["photo_traditional"] ? (
                    <img 
                      src={uploadedPhotos["photo_traditional"]} 
                      alt="Dhruv Patel Profile" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full">
                      <svg viewBox="0 0 400 500" className="w-full h-full object-cover bg-amber-50" id="bio-traditional-portrait-svg">
                        <defs>
                          <linearGradient id="skyGradBio" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#fffbeb" />
                            <stop offset="100%" stopColor="#fef3c7" />
                          </linearGradient>
                          <linearGradient id="kurtaGradBio" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#fefadc" />
                            <stop offset="100%" stopColor="#f0e9b9" />
                          </linearGradient>
                          <linearGradient id="sadriGradBio" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fbf7d5" />
                            <stop offset="100%" stopColor="#e3d69c" />
                          </linearGradient>
                        </defs>
                        {/* Background Sky */}
                        <rect width="400" height="500" fill="url(#skyGradBio)" />
                        {/* Sun */}
                        <circle cx="300" cy="120" r="45" fill="#fef08a" opacity="0.6" filter="blur(1px)" />

                        {/* Stylized Palm Trees (from Dhruv's original photo) */}
                        <g opacity="0.15">
                          <path d="M-20 500 C 50 300, 80 150, 10 0" stroke="#78350f" strokeWidth="8" fill="none" />
                          <path d="M10 0 C 40 40, 120 60, 200 40" stroke="#166534" strokeWidth="6" strokeLinecap="round" fill="none" />
                          <path d="M10 0 C -30 20, -100 50, -140 30" stroke="#15803d" strokeWidth="5" strokeLinecap="round" fill="none" />
                          <path d="M10 0 C 30 80, 80 150, 140 180" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" fill="none" />
                          <path d="M10 0 C -10 80, -40 160, -70 210" stroke="#15803d" strokeWidth="5" strokeLinecap="round" fill="none" />
                        </g>
                        <g opacity="0.2" transform="translate(350, 0) scale(-1, 1)">
                          <path d="M-20 500 C 60 320, 90 180, 20 0" stroke="#78350f" strokeWidth="9" fill="none" />
                          <path d="M20 0 C 50 40, 140 70, 220 50" stroke="#166534" strokeWidth="7" fill="none" />
                          <path d="M20 0 C 40 90, 100 160, 160 190" stroke="#16a34a" strokeWidth="6" fill="none" />
                          <path d="M20 0 C -20 70, -60 140, -100 190" stroke="#14532d" strokeWidth="5" fill="none" />
                        </g>

                        {/* Lush Bush in background (Dark Green and Red Flowers) */}
                        <rect y="350" width="400" height="150" fill="#14532d" opacity="0.3" rx="10" />
                        <circle cx="50" cy="380" r="25" fill="#166534" opacity="0.4" />
                        <circle cx="120" cy="370" r="30" fill="#15803d" opacity="0.3" />
                        <circle cx="280" cy="360" r="35" fill="#14532d" opacity="0.4" />
                        <circle cx="340" cy="380" r="25" fill="#166534" opacity="0.4" />
                        {/* Little Red Botanical flower accents */}
                        <circle cx="45" cy="375" r="3" fill="#dc2626" />
                        <circle cx="55" cy="385" r="4" fill="#dc2626" />
                        <circle cx="125" cy="365" r="3" fill="#dc2626" />
                        <circle cx="290" cy="355" r="4" fill="#dc2626" />

                        {/* Dhruv's Silhouette standing tall */}
                        {/* Head and Hair */}
                        <path d="M170 170 C165 145, 175 125, 200 120 C225 125, 235 145, 230 170 C215 185, 185 185, 170 170 Z" fill="#e0bf90" /> {/* Indian skin tone */}
                        <path d="M168 145 C172 125, 195 110, 220 115 C232 118, 234 128, 232 135 C222 130, 210 132, 200 135 C190 138, 180 138, 168 145 Z" fill="#1e1b4b" /> {/* Groomed hair */}
                        <path d="M168 145 C 166 148, 164 155, 166 158 C 170 156, 171 150, 168 145" fill="#1e1b4b" /> {/* Sideburns */}
                        <path d="M232 145 C 234 148, 236 155, 234 158 C 230 156, 229 150, 232 145" fill="#1e1b4b" /> {/* Sideburns */}

                        {/* Sunglasses (from photo 0) */}
                        <rect x="178" y="148" width="18" height="12" rx="3" fill="#111827" />
                        <rect x="204" y="148" width="18" height="12" rx="3" fill="#111827" />
                        <line x1="196" y1="152" x2="204" y2="152" stroke="#111827" strokeWidth="3" />
                        <path d="M174 150 C 176 150, 178 148, 178 148" stroke="#111827" strokeWidth="2" />
                        <path d="M226 150 C 224 150, 222 148, 222 148" stroke="#111827" strokeWidth="2" />

                        {/* Smart Smile */}
                        <path d="M190 175 C 195 182, 205 182, 210 175" stroke="#991b1b" strokeWidth="2.5" strokeLinecap="round" fill="white" />

                        {/* Neck and collar */}
                        <rect x="193" y="185" width="14" height="15" fill="#e0bf90" />

                        {/* Traditional Kurta (Base shirt) */}
                        <path d="M140 230 C 150 200, 190 195, 200 195 C 210 195, 250 200, 260 230 L 265 310 C 265 315, 255 320, 255 330 L 255 450 L 145 450 L 145 330 C 145 320, 135 315, 135 310 Z" fill="url(#kurtaGradBio)" />
                        
                        {/* Elegant sadri (Floral Printed Nehru Jacket) */}
                        <path d="M142 230 C 148 200, 190 198, 200 198 C 210 198, 252 200, 258 230 L 262 380 C 255 390, 250 410, 245 425 L 155 425 C 150 410, 145 390, 138 380 Z" fill="url(#sadriGradBio)" />
                        
                        {/* Sadri collar */}
                        <path d="M180 198 C 182 188, 218 188, 220 198 Z" fill="#c4b16a" stroke="#a5914e" strokeWidth="1" />

                        {/* Floral / Botanical embroidery print details on Sadri */}
                        <g opacity="0.35">
                          {/* Pink floral prints with green leaves randomly arranged */}
                          <circle cx="160" cy="240" r="5" fill="#f43f5e" /><path d="M160 240 L165 245" stroke="#15803d" strokeWidth="1" />
                          <circle cx="240" cy="245" r="5" fill="#f43f5e" /><path d="M240 245 L235 250" stroke="#15803d" strokeWidth="1" />
                          <circle cx="180" cy="280" r="6" fill="#ec4899" /><path d="M180 280 L185 275" stroke="#15803d" strokeWidth="1" />
                          <circle cx="220" cy="285" r="5" fill="#f43f5e" /><path d="M220 285 L215 290" stroke="#15803d" strokeWidth="1" />
                          <circle cx="165" cy="330" r="6" fill="#f43f5e" /><path d="M165 330 L170 335" stroke="#15803d" strokeWidth="1" />
                          <circle cx="235" cy="335" r="5" fill="#ec4899" /><path d="M235 335 L230 340" stroke="#15803d" strokeWidth="1" />
                          <circle cx="200" cy="310" r="5" fill="#f43f5e" /><path d="M200 310 L205 315" stroke="#15803d" strokeWidth="1" />
                          <circle cx="190" cy="360" r="6" fill="#ec4899" /><path d="M190 360 L185 365" stroke="#15803d" strokeWidth="1" />
                          <circle cx="215" cy="370" r="5" fill="#f43f5e" /><path d="M215 370 L220 375" stroke="#15803d" strokeWidth="1" />
                          <circle cx="160" cy="390" r="5" fill="#f43f5e" /><path d="M160 390 L165 395" stroke="#15803d" strokeWidth="1" />
                          <circle cx="240" cy="395" r="5" fill="#ec4899" /><path d="M240 395 L235 400" stroke="#15803d" strokeWidth="1" />
                        </g>

                        {/* Buttons on Jacket */}
                        <circle cx="200" cy="225" r="3" fill="#78350f" />
                        <circle cx="200" cy="250" r="3" fill="#78350f" />
                        <circle cx="200" cy="275" r="3" fill="#78350f" />
                        <circle cx="200" cy="300" r="3" fill="#78350f" />
                        <circle cx="200" cy="325" r="3" fill="#78350f" />
                        <circle cx="200" cy="350" r="3" fill="#78350f" />
                        <circle cx="200" cy="375" r="3" fill="#78350f" />
                        <circle cx="200" cy="400" r="3" fill="#78350f" />

                        {/* White Pyjama (Pants) */}
                        <rect x="155" y="450" width="38" height="50" fill="#fefefe" stroke="#e4e4e7" strokeWidth="1" />
                        <rect x="207" y="450" width="38" height="50" fill="#fefefe" stroke="#e4e4e7" strokeWidth="1" />
                      </svg>
                    </div>
                  )}
                  {/* Hover Overlay with camera icon */}
                  <div className="absolute inset-0 bg-[#1A1A1A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs z-10 font-mono tracking-wider font-bold">
                    <svg className="w-6 h-6 mb-1 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{uploadedPhotos["photo_traditional"] ? "CHANGE PHOTO" : "UPLOAD PHOTO"}</span>
                  </div>
                  
                  <input 
                    type="file"
                    id="portrait-upload-input"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setIsUploadingBio(true);
                        compressAndPersistImage(file, (base64) => {
                          handlePhotoUploaded("photo_traditional", base64);
                          setIsUploadingBio(false);
                        });
                      }
                    }}
                  />
                </div>

                <div className="bg-white rounded-sm border border-[#E5E4DF] p-6 space-y-4 shadow-sm">
                  <div className="pb-2 border-b border-[#E5E4DF]">
                    <h4 className="font-serif font-bold text-[#1A1A1A] text-lg">Vital Stats</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] uppercase text-[#8C8984] font-bold tracking-tighter">Date of Birth</p>
                      <p className="text-base font-serif font-black text-[#1A1A1A]">{db.personal.dob}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-[#8C8984] font-bold tracking-tighter">Age</p>
                      <p className="text-base font-serif font-black text-[#1A1A1A]">{db.personal.age} Years</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-[#8C8984] font-bold tracking-tighter">Height</p>
                      <p className="text-base font-serif font-black text-[#1A1A1A]">176 cm</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-[#8C8984] font-bold tracking-tighter">Weight</p>
                      <p className="text-base font-serif font-black text-[#1A1A1A]">72 kg</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information block styled with deep left border */}
                <div className="bg-[#F2F0EB] p-4 border-l-4 border-[#7C6F5D] rounded-sm">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#8C8984] mb-1">Contact Information</p>
                  <p className="text-sm font-bold text-[#1A1A1A] font-serif">+91 7096921934</p>
                  <p className="text-xs text-[#7C6F5D] lowercase underline truncate block">drpatel10102005@gmail.com</p>
                </div>
              </div>

              {/* Right Column: Family Details & Personal Attributes */}
              <div className="md:col-span-2 space-y-8 bg-white border border-[#E5E4DF] p-8 rounded-sm shadow-sm">
                
                {/* Immediate Family */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black border-b-2 border-[#1A1A1A] pb-2 mb-4 uppercase tracking-tight">Family</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[#8C8984] tracking-wider">Father</p>
                      <p className="font-bold font-serif text-base text-[#1A1A1A]">{db.immediateFamily.fatherName}</p>
                      <p className="text-xs italic text-[#7C6F5D] font-serif">{db.immediateFamily.fatherOccupation}</p>
                      {db.immediateFamily.fatherPhone && (
                        <p className="text-[11px] font-mono font-bold text-[#7C6F5D] mt-1 bg-[#F2F0EB] px-2.5 py-0.5 rounded-sm w-fit border border-[#E5E4DF]">
                          📞 +91 {db.immediateFamily.fatherPhone}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[#8C8984] tracking-wider">Mother</p>
                      <p className="font-bold font-serif text-base text-[#1A1A1A]">{db.immediateFamily.motherName}</p>
                      <p className="text-xs italic text-[#7C6F5D] font-serif">{db.immediateFamily.motherOccupation}</p>
                      {db.immediateFamily.motherPhone && (
                        <p className="text-[11px] font-mono font-bold text-[#7C6F5D] mt-1 bg-[#F2F0EB] px-2.5 py-0.5 rounded-sm w-fit border border-[#E5E4DF]">
                          📞 +91 {db.immediateFamily.motherPhone}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[#8C8984] tracking-wider">Sister</p>
                      <p className="font-bold font-serif text-base text-[#1A1A1A]">{db.immediateFamily.sisterName}</p>
                      <p className="text-xs italic text-[#7C6F5D] font-serif">Residing in {db.immediateFamily.sisterLocation}</p>
                      {db.immediateFamily.sisterPhone && (
                        <p className="text-[11px] font-mono font-bold text-[#7C6F5D] mt-1 bg-[#F2F0EB] px-2.5 py-0.5 rounded-sm w-fit border border-[#E5E4DF]">
                          📞 {db.immediateFamily.sisterPhone}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[#8C8984] tracking-wider">Native Residence</p>
                      <p className="font-bold font-serif text-base text-[#7C6F5D]">{db.paternalFamily.nativePlace} (48 Gam)</p>
                    </div>
                  </div>
                </div>

                {/* Regional Birth coordinates */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black border-b-2 border-[#1A1A1A] pb-2 mb-4 uppercase tracking-tight">Residence & Birth Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[#8C8984]">Current Location & Residence</p>
                      <p className="font-serif text-[#1A1A1A] font-semibold">{db.personal.residence || "Raysan, Gandhinagar, Gujarat"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[#8C8984]">Born At</p>
                      <p className="font-serif text-[#7C6F5D] font-bold">{db.personal.birthPlace}</p>
                    </div>
                  </div>
                </div>

                {/* Hobbies & Leisure */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black border-b-2 border-[#1A1A1A] pb-2 mb-4 uppercase tracking-tight">Hobbies & Leisure</h2>
                  <p className="text-md font-serif italic text-stone-700 leading-relaxed">
                    Fitness training (active gym workouts), traditional Gujarati cooking, outdoor sports and cricket tournaments.
                  </p>
                </div>

                {/* Lineage Previews */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E5E4DF]">
                  <div className="bg-[#FAF9F6] p-4 rounded-sm border border-[#E5E4DF]">
                    <h3 className="text-sm font-serif font-bold text-[#1A1A1A] mb-2 uppercase tracking-wide border-b border-[#E5E4DF] pb-1">
                      Paternal (48 Gam)
                    </h3>
                    <p className="text-xs text-[#7C6F5D] font-mono">Dada: {db.paternalFamily.grandfatherName}</p>
                    <p className="text-xs text-stone-500 font-mono">Dadi / Dai: {db.paternalFamily.grandmotherName}</p>
                    <p className="text-xs text-stone-500 font-mono">Kaku: {db.paternalFamily.uncleName} ({db.paternalFamily.uncleLocation})</p>
                    <p className="text-xs text-stone-500 font-mono">Kaki: {db.paternalFamily.auntName} ({db.paternalFamily.auntLocation})</p>
                  </div>
                  <div className="bg-[#FAF9F6] p-4 rounded-sm border border-[#E5E4DF]">
                    <h3 className="text-sm font-serif font-bold text-[#1A1A1A] mb-2 uppercase tracking-wide border-b border-[#E5E4DF] pb-1">
                      Maternal (48 Gam)
                    </h3>
                    {db.maternalFamily.mamas.map((mamaPair, idx) => (
                      <div key={idx} className="mb-2 last:mb-0 border-b border-dashed border-[#E5E4DF] last:border-0 pb-1.5 last:pb-0">
                        <p className="text-xs text-[#7C6F5D] font-mono leading-tight">Mama: {mamaPair.mamaName} {mamaPair.location && `(${mamaPair.location})`}</p>
                        <p className="text-[11px] text-stone-500 font-mono leading-tight">Mami: {mamaPair.mamiName} {mamaPair.location && `(${mamaPair.location})`}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === "wardrobe" && (
            <motion.div
              key="wardrobe-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              id="bio-wardrobe-segment"
            >
              <PhotoShowcase 
                onPhotoUploaded={handlePhotoUploaded} 
                uploadedPhotos={uploadedPhotos} 
              />
            </motion.div>
          )}

          {activeTab === "family" && (
            <motion.div
              key="family-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              id="bio-family-segment"
            >
              <FamilyTree />
            </motion.div>
          )}

          {activeTab === "print" && (
            <motion.div
              key="print-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              id="bio-print-segment"
            >
              <PrintPDF uploadedPhotos={uploadedPhotos} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* --- AESTHETIC VINTAGE FOOTER --- */}
      <footer className="bg-[#1A1A1A] border-t-2 border-[#7C6F5D] py-10 text-white text-center text-xs mt-auto no-print">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <p className="font-serif text-white text-sm tracking-widest uppercase">
            &copy; ✧ Patel Family Biodata Portfolio ✧
          </p>
          <div className="w-12 h-[1px] bg-[#7C6F5D] mx-auto" />
          <p className="text-[#8C8984] text-[11px] font-mono leading-relaxed">
            All database info retrieved strictly from candidate Patel Dhruv Rakeshbhai, Lodra, Gujarat.<br />
            Designed in luxury bold structural motifs. Powered securely by active user files.
          </p>
          <p className="text-[10px] text-[#8C8984]/60 font-mono">
            © 2026 Patel Dhruv Rakeshbhai. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* --- PRINT ONLY INSTRUCTION SHEET OVERLAY --- */}
      {/* (Only renders when actual browser print is triggered) */}
      <div className="hidden print-only">
        <PrintPDF uploadedPhotos={uploadedPhotos} />
      </div>

    </div>
  );
}
