/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Printer, Heart, Sparkles, Phone, Mail, Award, Compass } from "lucide-react";
import { DHRUV_BIODATA } from "../data";

interface PrintPDFProps {
  uploadedPhotos: Record<string, string>;
}

export default function PrintPDF({ uploadedPhotos }: PrintPDFProps) {
  const db = DHRUV_BIODATA;

  // Find a photo to display
  const getSelectedPhoto = () => {
    // Try to retrieve the Bio Essentials profile photo first as priority
    if (uploadedPhotos["photo_traditional"]) {
      return uploadedPhotos["photo_traditional"];
    }
    // Fallback to first uploaded Look Book photo if available
    const firstUploadedId = Object.keys(uploadedPhotos).find(id => !!uploadedPhotos[id]);
    if (firstUploadedId) return uploadedPhotos[firstUploadedId];
    return null; // fallback to showing description or instructions
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedPhoto = getSelectedPhoto();

  return (
    <div className="bg-white rounded-sm border border-[#E5E4DF] p-6 sm:p-8 relative" id="print-pdf-generator">

      {/* Intro info box */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-[#E5E4DF] pb-5 mb-8 gap-4 no-print">
        <div className="text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2F0EB] rounded-sm text-[#7C6F5D] text-[10px] font-bold uppercase tracking-widest mb-2">
            <Printer size={12} className="text-[#7C6F5D]" /> Print-Friendly Page
          </span>
          <h3 className="font-serif text-3xl font-black text-[#1A1A1A] uppercase leading-tight border-b-2 border-[#1A1A1A] pb-1 w-fit">
            Generate Biodata PDF
          </h3>
          <p className="text-stone-550 text-stone-500 text-xs mt-1.5 font-serif italic max-w-lg">
            Saves directly to a clean single-page PDF formatted cleanly for sharing over WhatsApp or physical printing on thick archival paper.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#1A1A1A] hover:bg-[#7C6F5D] active:scale-95 text-white text-xs font-mono font-bold rounded-sm shadow-sm transition-all duration-150 uppercase tracking-widest cursor-pointer"
        >
          <Printer size={14} />
          Print / Download PDF
        </button>
      </div>

      {/* --- PREVIEW / PRINT AREA --- */}
      {/* Container is styled both for browser view and optimized strictly for Single-Page printing with custom margins */}
      <div className="bg-[#FAF9F6] p-6 sm:p-12 rounded-sm border border-[#E5E4DF] shadow-sm max-w-4xl mx-auto print:bg-white print:border-none print:shadow-none print:p-0" id="matrimonial-biodata-print-sheet">
        <div className="border-[3px] border-double border-[#1A1A1A] p-6 sm:p-10 relative bg-white">

          {/* Ganesha centered */}
          <div className="flex flex-col items-center justify-center text-center pb-4 mb-2">
            <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#1A1A1A] fill-none stroke-current animate-pulse" strokeWidth="2.5" style={{ animationDuration: "10s" }}>
              <path d="M50,15 C42,15 36,25 36,35 C36,45 42,48 50,48 C58,48 64,45 64,35 C64,25 58,15 50,15 Z" />
              <path d="M50,48 C50,48 50,65 42,75 Q38,80 44,82 Q50,84 50,75" />
              <path d="M46,30 L40,32" />
              <path d="M54,30 L60,32" />
              <path d="M50,22 L50,18" />
              <circle cx="50" cy="38" r="4" fill="#7C6F5D" strokeWidth="1" />
            </svg>
            <span className="font-mono text-[10px] font-bold text-[#7C6F5D] block mt-2.5 tracking-widest uppercase">
              || Shri Ganeshaya Namah ||
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tighter mt-3 uppercase text-center w-full">
              Matrimonial Biodata
            </h2>
            <div className="w-24 h-0.5 bg-[#1A1A1A] my-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Details Column 1: Info (8 cols) */}
            <div className="md:col-span-8 space-y-6">
              
              {/* Personal Section */}
              <div>
                <h4 className="font-mono text-xs font-bold text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-1.5 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#7C6F5D]" fill="currentColor" /> Personal Essentials
                </h4>
                <table className="w-full text-xs" style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
                  <tbody>
                    <tr>
                      <td className="font-bold text-stone-500 w-1/3 uppercase font-mono tracking-tight text-[10px]">Full Name</td>
                      <td className="text-[#1A1A1A] font-serif font-black text-sm uppercase bg-[#FAF9F6] p-2.5 rounded-sm border border-[#E5E4DF]">{db.personal.name}</td>
                    </tr>
                    <tr>
                      <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Date of Birth</td>
                      <td className="text-stone-800 font-bold font-mono text-xs uppercase">{db.personal.dob}</td>
                    </tr>
                    <tr>
                      <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Age / Height</td>
                      <td className="text-stone-800 font-bold font-mono text-xs uppercase">{db.personal.age} Years / {db.personal.heightCm} cm</td>
                    </tr>
                    <tr>
                      <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Weight</td>
                      <td className="text-stone-800 font-bold font-mono text-xs uppercase">{db.personal.weightCc} kg</td>
                    </tr>
                    <tr>
                      <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Education</td>
                      <td className="text-[#7C6F5D] font-black font-mono tracking-widest text-xs uppercase">{db.personal.education}</td>
                    </tr>
                    <tr>
                      <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Birth Place</td>
                      <td className="text-stone-800 font-bold font-mono text-xs uppercase">{db.personal.birthPlace}</td>
                    </tr>
                    <tr>
                      <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Current Residence</td>
                      <td className="text-[#7C6F5D] font-black font-mono text-xs uppercase">{db.personal.residence || "Raysan, Gandhinagar, Gujarat"}</td>
                    </tr>
                    <tr>
                      <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Hobbies</td>
                      <td className="text-stone-800 font-bold font-mono text-xs uppercase">{db.personal.hobbies.join(", ")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Immediate Family Section */}
              <div>
                <h4 className="font-mono text-xs font-bold text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-1.5 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#7C6F5D]" /> Immediate Circle
                </h4>
                <table className="w-full text-xs" style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
                  <tbody>
                    <tr>
                      <td className="font-bold text-stone-500 w-1/3 uppercase font-mono tracking-tight text-[10px]">Father's Name</td>
                      <td className="text-[#1A1A1A] font-black uppercase tracking-tight text-xs">{db.immediateFamily.fatherName}</td>
                    </tr>
                    <tr>
                      <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Occupation</td>
                      <td className="text-stone-800 font-bold font-mono text-xs uppercase">{db.immediateFamily.fatherOccupation}</td>
                    </tr>
                    {db.immediateFamily.fatherPhone && (
                      <tr>
                        <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Father's Contact</td>
                        <td className="text-stone-800 font-bold font-mono text-xs">+91 {db.immediateFamily.fatherPhone}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Mother's Name</td>
                      <td className="text-[#1A1A1A] font-black uppercase tracking-tight text-xs">{db.immediateFamily.motherName}</td>
                    </tr>
                    <tr>
                      <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Occupation</td>
                      <td className="text-stone-800 font-bold font-mono text-xs uppercase">{db.immediateFamily.motherOccupation}</td>
                    </tr>
                    {db.immediateFamily.motherPhone && (
                      <tr>
                        <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Mother's Contact</td>
                        <td className="text-stone-800 font-bold font-mono text-xs">+91 {db.immediateFamily.motherPhone}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Sister's Name</td>
                      <td className="text-stone-800 font-bold font-mono text-xs uppercase">{db.immediateFamily.sisterName} ({db.immediateFamily.sisterLocation})</td>
                    </tr>
                    {db.immediateFamily.sisterPhone && (
                      <tr>
                        <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Sister's Contact</td>
                        <td className="text-stone-800 font-bold font-mono text-xs">{db.immediateFamily.sisterPhone}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Photo Column 2: Photo Place/Frame (4 cols) */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="w-full aspect-[3/4] border-2 border-dashed border-[#E5E4DF] bg-[#FAF9F6] rounded-sm flex flex-col items-center justify-center p-3.5 text-center relative overflow-hidden">
                {selectedPhoto ? (
                  <img 
                    src={selectedPhoto} 
                    alt="Dhruv Patel" 
                    className="w-full h-full object-cover rounded-sm"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="space-y-2 p-4">
                    <div className="w-9 h-9 rounded-sm bg-[#1A1A1A] text-white flex items-center justify-center mx-auto mb-1">
                      <Heart size={14} />
                    </div>
                    <p className="font-mono text-[9px] font-bold text-stone-700 uppercase tracking-widest">Affix Photo Here</p>
                    <p className="text-[9px] text-[#7C6F5D] font-mono uppercase font-bold leading-relaxed px-1">
                      Drag-drop image on card above to embed here
                    </p>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-[#1A1A1A] py-1.5 text-center font-mono text-[9px] font-bold text-white tracking-widest uppercase">
                  PATEL DHRUV
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#E5E4DF] my-6" />

          {/* Pedigrees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Paternal Roots */}
            <div>
              <h4 className="font-mono text-xs font-bold text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-1.5 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#7C6F5D]" /> Paternal Lineage (48 Gam Kadva Patidar Samaj)
              </h4>
              <table className="w-full text-xs" style={{ borderCollapse: "separate", borderSpacing: "0 6px" }}>
                <tbody>
                  <tr>
                    <td className="font-bold text-stone-500 w-2/5 uppercase font-mono tracking-tight text-[10px]">Native Town</td>
                    <td className="text-stone-800 font-bold font-mono text-xs uppercase">{db.paternalFamily.nativePlace}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Dada</td>
                    <td className="text-[#1A1A1A] font-black uppercase text-xs tracking-tight">{db.paternalFamily.grandfatherName}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Dadi / Dai</td>
                    <td className="text-stone-800 font-bold font-mono text-xs uppercase">{db.paternalFamily.grandmotherName}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Uncle (Kaku)</td>
                    <td className="text-stone-850 text-stone-800 font-bold uppercase text-xs">{db.paternalFamily.uncleName} ({db.paternalFamily.uncleLocation})</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px]">Aunty (Kaki)</td>
                    <td className="text-stone-850 text-stone-800 font-bold uppercase text-xs">{db.paternalFamily.auntName} ({db.paternalFamily.auntLocation})</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Maternal Roots */}
            <div>
              <h4 className="font-mono text-xs font-bold text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-1.5 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#7C6F5D]" /> Maternal Lineage (48 Gam Kadva Patidar Samaj)
              </h4>
              <table className="w-full text-xs" style={{ borderCollapse: "separate", borderSpacing: "0 6px" }}>
                <tbody>
                  <tr>
                    <td className="font-bold text-stone-500 w-2/5 uppercase font-mono tracking-tight text-[10px]">Native Town</td>
                    <td className="text-stone-800 font-bold font-mono text-xs uppercase">{db.maternalFamily.nativePlace}</td>
                  </tr>
                  {db.maternalFamily.mamas.map((mamaPair, idx) => (
                    <React.Fragment key={idx}>
                      <tr>
                        <td className="font-bold text-[#7C6F5D] uppercase font-mono tracking-tight text-[10px] pt-1.5 border-t border-dashed border-[#E5E4DF] w-2/5">Mama {idx + 1} {mamaPair.location && `(${mamaPair.location})`}</td>
                        <td className="text-[#1A1A1A] font-black uppercase text-xs tracking-tight pt-1.5 border-t border-dashed border-[#E5E4DF]">{mamaPair.mamaName}</td>
                      </tr>
                      <tr>
                        <td className="font-bold text-stone-500 uppercase font-mono tracking-tight text-[10px] pb-1.5">Mami {idx + 1} {mamaPair.location && `(${mamaPair.location})`}</td>
                        <td className="text-stone-800 font-bold font-mono text-xs uppercase pb-1.5">{mamaPair.mamiName}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#E5E4DF] my-6" />

          {/* Bottom Core Contacts */}
          <div className="border border-[#E5E4DF] bg-[#FAF9F6] rounded-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-white text-[#7C6F5D] rounded-sm border border-[#E5E4DF]">
                <Phone size={16} />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#7C6F5D] font-mono font-bold block">Enquiry Lines Contact</span>
                <span className="font-mono text-sm font-black text-[#1A1A1A] tracking-wider">+91 {db.contact.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-white text-[#7C6F5D] rounded-sm border border-[#E5E4DF]">
                <Mail size={16} />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#7C6F5D] font-mono font-bold block">Family Correspondence</span>
                <span className="font-mono text-xs font-black text-[#1A1A1A] tracking-widest uppercase">{db.contact.email}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
