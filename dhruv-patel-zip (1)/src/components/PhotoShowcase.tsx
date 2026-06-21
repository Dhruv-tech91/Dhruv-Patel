/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  Sparkles, 
  MapPin, 
  Shirt, 
  Image as ImageIcon, 
  Upload, 
  Check, 
  Trash2, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { PhotoAsset } from "../types";
import { PHOTO_ASSORTMENT } from "../data";
import { compressAndPersistImage } from "../utils/imageHelper";

interface PhotoShowcaseProps {
  onPhotoUploaded?: (photoId: string, url: string | null) => void;
  uploadedPhotos: Record<string, string>;
}

export default function PhotoShowcase({ onPhotoUploaded, uploadedPhotos }: PhotoShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentPhoto = PHOTO_ASSORTMENT[activeIndex];
  const currentUploadedUrl = uploadedPhotos[currentPhoto.id];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PHOTO_ASSORTMENT.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PHOTO_ASSORTMENT.length) % PHOTO_ASSORTMENT.length);
  };

  // Process uploaded files
  const processFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setIsCompressing(true);
      compressAndPersistImage(file, (base64) => {
        if (onPhotoUploaded) {
          onPhotoUploaded(currentPhoto.id, base64);
        }
        setIsCompressing(false);
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPhotoUploaded) {
      onPhotoUploaded(currentPhoto.id, null);
    }
  };

  // Helper inside the code to render beautiful tailored vector representation for each style
  const renderArtisticRepresentation = (id: string) => {
    switch (id) {
      case "look_traditional":
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full object-cover bg-amber-50" id="traditional-art-svg">
            <defs>
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="100%" stopColor="#fef3c7" />
              </linearGradient>
              <linearGradient id="kurtaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fefadc" />
                <stop offset="100%" stopColor="#f0e9b9" />
              </linearGradient>
              <linearGradient id="sadriGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbf7d5" />
                <stop offset="100%" stopColor="#e3d69c" />
              </linearGradient>
            </defs>
            {/* Background Sky */}
            <rect width="400" height="500" fill="url(#skyGrad)" />
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
            <path d="M175 160 C 175 125, 225 125, 225 160 C 225 180, 175 180, 175 160" fill="#fbcfe8" opacity="0" /> {/* Skin base */}
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
            <path d="M140 230 C 150 200, 190 195, 200 195 C 210 195, 250 200, 260 230 L 265 310 C 265 315, 255 320, 255 330 L 255 450 L 145 450 L 145 330 C 145 320, 135 315, 135 310 Z" fill="url(#kurtaGrad)" />
            
            {/* Elegant sadri (Floral Printed Nehru Jacket) */}
            <path d="M142 230 C 148 200, 190 198, 200 198 C 210 198, 252 200, 258 230 L 262 380 C 255 390, 250 410, 245 425 L 155 425 C 150 410, 145 390, 138 380 Z" fill="url(#sadriGrad)" />
            
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

            {/* Traditional Golden Border Frame */}
            <rect x="10" y="10" width="380" height="480" rx="4" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
            <rect x="15" y="15" width="370" height="470" rx="4" fill="none" stroke="#b45309" strokeWidth="0.5" opacity="0.3" />
            
            {/* Title Badge overlay */}
            <rect x="100" y="455" width="200" height="30" rx="15" fill="#7f1d1d" />
            <text x="200" y="475" fill="#fef3c7" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="serif" letterSpacing="1">TRADITIONAL LOOK</text>
          </svg>
        );
      case "photo_sage_green":
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full object-cover bg-emerald-50" id="sage-art-svg">
            {/* Garden Background */}
            <rect width="400" height="500" fill="#edf7f1" />
            <circle cx="80" cy="180" r="120" fill="#d2ebd9" opacity="0.4" />
            <circle cx="330" cy="120" r="100" fill="#d2ebd9" opacity="0.5" />
            
            {/* Abstract Pathway Greenery */}
            <path d="M0 500 C 150 450, 250 450, 400 500 L 400 500 L 0 500 Z" fill="#86efac" opacity="0.3" />
            
            {/* Smart modern character silhouette */}
            <g transform="translate(0, 10)">
              {/* Hair & Profile Head */}
              <rect x="175" y="185" width="14" height="15" fill="#dfbe91" /> {/* Neck */}
              <path d="M170 170 C165 145, 175 125, 200 120 C225 125, 235 145, 230 170 C215 185, 185 185, 170 170 Z" fill="#dfbe91" /> {/* Face */}
              <path d="M168 145 C172 125, 195 110, 220 115 C232 118, 234 128, 232 135 C222 130, 210 132, 200 135 C190 138, 180 138, 168 145 Z" fill="#18181b" /> {/* Hair */}
              
              {/* Aviator Sunglasses */}
              <rect x="177" y="146" width="20" height="13" rx="4" fill="#09090b" stroke="#f59e0b" strokeWidth="0.5" />
              <rect x="203" y="146" width="20" height="13" rx="4" fill="#09090b" stroke="#f59e0b" strokeWidth="0.5" />
              <line x1="197" y1="151" x2="203" y2="151" stroke="#374151" strokeWidth="2.5" />

              {/* Confident smile */}
              <path d="M192 174 C 196 179, 204 179, 208 174" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Sage Green Shirt with Collar */}
              <path d="M135 240 C 145 210, 185 200, 200 200 C 215 200, 255 210, 265 240 L 275 380 L 125 380 Z" fill="#60a5fa" opacity="0" /> {/* helper */}
              <path d="M135 240 C 145 208, 185 198, 200 198 C 215 198, 255 208, 265 240 L 272 450 L 128 450 Z" fill="#4d7c0f" /> {/* Sage Green Shirt (darker tone) */}
              
              {/* Shirt front fold crease */}
              <line x1="200" y1="205" x2="200" y2="450" stroke="#365314" strokeWidth="1.5" />
              
              {/* Collar wings */}
              <path d="M175 198 L 200 220 L 200 198 Z" fill="#3f6212" stroke="#1a2e05" strokeWidth="0.5" />
              <path d="M225 198 L 200 220 L 200 198 Z" fill="#3f6212" stroke="#1a2e05" strokeWidth="0.5" />

              {/* Buttons */}
              <circle cx="200" cy="240" r="2.5" fill="#fefefe" />
              <circle cx="200" cy="280" r="2.5" fill="#fefefe" />
              <circle cx="200" cy="320" r="2.5" fill="#fefefe" />
              <circle cx="200" cy="360" r="2.5" fill="#fefefe" />
              <circle cx="200" cy="400" r="2.5" fill="#fefefe" />

              {/* Elegant Gold Watch on Left Wrist (adjusting sleeve) */}
              <path d="M128 350 C125 345, 115 365, 120 380 L 128 410" stroke="#16a34a" strokeWidth="15" strokeLinecap="round" fill="none" /> {/* Arm left */}
              {/* Watch detail */}
              <circle cx="120" cy="375" r="5" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
              <rect x="117" y="372" width="6" height="6" fill="#111827" />

              {/* Right Arm adjusting collar/sleeve */}
              <path d="M272 350 C275 355, 280 375, 270 410" stroke="#16a34a" strokeWidth="14" strokeLinecap="round" fill="none" />
            </g>

            {/* Smart modern border frame */}
            <rect x="10" y="10" width="380" height="480" rx="4" fill="none" stroke="#16a34a" strokeWidth="1.5" opacity="0.2" />
            
            <rect x="100" y="455" width="200" height="30" rx="15" fill="#14532d" />
            <text x="200" y="475" fill="#f0fdf4" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="1">CASUAL REFINEMENT</text>
          </svg>
        );
      case "photo_bougainvillea":
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full object-cover bg-rose-50" id="rose-art-svg">
            <defs>
              <linearGradient id="roseSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fff1f2" />
                <stop offset="100%" stopColor="#ffe4e6" />
              </linearGradient>
            </defs>
            <rect width="400" height="500" fill="url(#roseSky)" />

            {/* Huge Bougainvillea Flower bush background on RHS */}
            <g opacity="0.8">
              {/* Big fluffy pink magenta shapes */}
              <circle cx="340" cy="180" r="90" fill="#db2777" opacity="0.65" />
              <circle cx="320" cy="240" r="100" fill="#be185d" opacity="0.7" />
              <circle cx="380" cy="220" r="80" fill="#9d174d" opacity="0.75" />
              <circle cx="300" cy="140" r="60" fill="#f43f5e" opacity="0.5" />
              
              {/* Petal detail indicators */}
              <circle cx="310" cy="190" r="6" fill="#fdf2f8" opacity="0.8" />
              <circle cx="325" cy="160" r="5" fill="#fdf2f8" opacity="0.8" />
              <circle cx="350" cy="220" r="7" fill="#fdf2f8" opacity="0.8" />
              <circle cx="280" cy="230" r="5" fill="#fdf2f8" opacity="0.8" />
              <circle cx="260" cy="150" r="6" fill="#be185d" />
              <circle cx="250" cy="180" r="8" fill="#bc1c6c" />
              <circle cx="270" cy="100" r="7" fill="#db2777" />
            </g>

            {/* Side-profile of Dhruv (facing bougainvillea on RHS) */}
            <g transform="translate(20, 20)">
              {/* Neck */}
              <rect x="150" y="185" width="25" height="25" fill="#dfbe91" transform="rotate(-5, 150, 185)" />
              {/* Face leaning right */}
              <path d="M125 130 C125 110, 145 95, 170 100 C185 102, 195 112, 195 125 C195 140, 190 150, 192 155 C193 158, 196 160, 192 165 C185 170, 182 178, 172 178 C150 178, 125 160, 125 130 Z" fill="#dfbe91" />
              
              {/* Side Haircut */}
              <path d="M125 130 C125 110, 140 100, 160 98 C158 110, 150 115, 140 120 C130 125, 128 128, 125 130 Z" fill="#18181b" />
              <path d="M135 98 C145 88, 165 92, 178 96 C174 105, 162 108, 150 108 C138 108, 135 102, 135 98 Z" fill="#18181b" />

              {/* Sunglasses arm on ear */}
              <rect x="142" y="125" width="30" height="5" rx="2" fill="#09090b" transform="rotate(7, 142, 125)" />
              <path d="M172 120 C175 120, 180 122, 182 127 L 180 135 Z" fill="#09090b" />

              {/* White Textured Polo Shirt Profile */}
              <path d="M85 240 C95 210, 130 200, 150 200 C170 200, 195 215, 205 240 L 210 380 L 75 380 Z" fill="#fb7185" opacity="0" /> {/* helper */}
              <path d="M90 235 C100 205, 140 195, 160 195 C175 195, 210 210, 220 235 L 225 430 L 80 430 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
              
              {/* Collar detail */}
              <path d="M140 195 L 160 215 L 175 195 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
              {/* Shoulder textured lines */}
              <line x1="120" y1="220" x2="105" y2="280" stroke="#e2e8f0" strokeWidth="2.5" />
              <line x1="130" y1="220" x2="115" y2="280" stroke="#e2e8f0" strokeWidth="2.5" />
            </g>

            {/* Falling Pink Bougainvillea Petals floating */}
            <g opacity="0.6">
              <path d="M40 80 Q 50 100, 45 110" stroke="#db2777" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M90 50 Q 80 70, 95 85" stroke="#be185d" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M200 40 Q 210 60, 205 70" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M280 60 Q 300 70, 290 85" stroke="#db2777" strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>

            {/* Frame */}
            <rect x="10" y="10" width="380" height="480" rx="4" fill="none" stroke="#db2777" strokeWidth="1.5" opacity="0.2" />

            <rect x="100" y="455" width="200" height="30" rx="15" fill="#9d174d" />
            <text x="200" y="475" fill="#fff1f2" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="1">BOUGAINVILLEA TOUCH</text>
          </svg>
        );
      case "photo_classic_white":
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full object-cover bg-stone-50" id="white-art-svg">
            <rect width="400" height="500" fill="#f5f5f4" />
            {/* Green Symmetrical Hedges trail */}
            <path d="M 0 500 L 150 250 L 250 250 L 400 500 Z" fill="#e7e5e4" /> {/* Path */}
            <path d="M 0 500 L 120 250 L 0 250 Z" fill="#15803d" opacity="0.3" /> {/* Left Hedge */}
            <path d="M 400 500 L 280 250 L 400 250 Z" fill="#15803d" opacity="0.3" /> {/* Right Hedge */}

            {/* Silhouette walking on path */}
            <g transform="translate(0, 30)">
              {/* Head with smart look, looking slightly down */}
              <rect x="194" y="155" width="12" height="15" fill="#dfbe91" />
              <path d="M175 140 C170 115, 180 95, 205 95 C230 95, 240 115, 235 140 C220 155, 190 155, 175 140 Z" fill="#dfbe91" transform="rotate(5, 205, 120)" />
              <path d="M173 115 C177 95, 200 80, 225 85 C237 88, 239 98, 237 105 C227 100, 215 102, 205 105 C195 108, 185 108, 173 115 Z" fill="#18181b" transform="rotate(5, 205, 120)" />

              {/* Pristine White Long Sleeve Shirt */}
              <path d="M140 195 C 150 168, 190 158, 200 158 C 210 158, 250 168, 260 195 L 268 330 L 132 330 Z" fill="#ffffff" stroke="#d6d3d1" strokeWidth="1" />
              {/* Buttons and shirt crease line */}
              <line x1="200" y1="165" x2="200" y2="330" stroke="#e7e5e4" strokeWidth="1.5" />
              
              {/* Sleeve folders cuffs adjusted */}
              <path d="M132 230 C 120 240, 115 280, 122 300" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" fill="none" /> {/* Sleeve left */}
              <path d="M268 230 C 280 240, 285 280, 278 300" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" fill="none" /> {/* Sleeve right */}

              {/* Earthy Camel Chino Trousers */}
              <rect x="145" y="330" width="48" height="130" fill="#a16207" stroke="#854d0e" strokeWidth="1" />
              <rect x="207" y="330" width="48" height="130" fill="#a16207" stroke="#854d0e" strokeWidth="1" />
            </g>

            {/* Frame */}
            <rect x="10" y="10" width="380" height="480" rx="4" fill="none" stroke="#a16207" strokeWidth="1.5" opacity="0.2" />

            <rect x="100" y="455" width="200" height="30" rx="15" fill="#78350f" />
            <text x="200" y="475" fill="#fef3c7" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="1">PATHWAY ELEGANCE</text>
          </svg>
        );
      case "photo_park_grey":
        return (
          <svg viewBox="0 0 400 500" className="w-full h-full object-cover bg-slate-50" id="grey-art-svg">
            <rect width="400" height="500" fill="#f1f5f9" />
            {/* Symmetrical Tall Trees walkway backdrop */}
            <g opacity="0.25">
              <rect x="50" y="50" width="4" height="400" fill="#334155" />
              <path d="M 50 150 C 100 150, 120 180, 140 220" stroke="#334155" strokeWidth="3" fill="none" />
              <rect x="350" y="50" width="4" height="400" fill="#334155" />
              <path d="M 350 150 C 300 150, 280 180, 260 220" stroke="#334155" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>

            {/* Silhouette standing casual */}
            <g transform="translate(0, 20)">
              {/* Head with sunglasses */}
              <rect x="194" y="170" width="12" height="15" fill="#e0bf90" />
              <path d="M175 145 C170 120, 180 100, 205 100 C230 100, 240 120, 235 145 C220 160, 190 160, 175 145 Z" fill="#e0bf90" />
              <path d="M173 120 C177 100, 200 85, 225 90 C237 93, 239 103, 237 110 C227 105, 215 107, 205 110 C195 113, 185 113, 173 120 Z" fill="#0f172a" />
              
              {/* Cool sunglasses */}
              <rect x="180" y="128" width="18" height="12" rx="3" fill="#1e293b" />
              <rect x="206" y="128" width="18" height="12" rx="3" fill="#1e293b" />
              <line x1="198" y1="133" x2="206" y2="133" stroke="#334155" strokeWidth="2.5" />

              {/* Steel Grey textured shirt */}
              <path d="M140 215 C 150 185, 190 178, 200 178 C 210 178, 250 185, 260 215 L 268 350 L 132 350 Z" fill="#64748b" stroke="#475569" strokeWidth="1" />
              <line x1="200" y1="185" x2="200" y2="350" stroke="#475569" strokeWidth="1" />
              {/* Buttons */}
              <circle cx="200" cy="210" r="2.5" fill="#cbd5e1" />
              <circle cx="200" cy="240" r="2.5" fill="#cbd5e1" />
              <circle cx="200" cy="270" r="2.5" fill="#cbd5e1" />
              <circle cx="200" cy="300" r="2.5" fill="#cbd5e1" />
              <circle cx="200" cy="330" r="2.5" fill="#cbd5e1" />

              {/* Dark slate trousers */}
              <rect x="145" y="350" width="50" height="110" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
              <rect x="205" y="350" width="50" height="110" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
            </g>

            {/* Frame */}
            <rect x="10" y="10" width="380" height="480" rx="4" fill="none" stroke="#64748b" strokeWidth="1.5" opacity="0.2" />

            <rect x="100" y="455" width="200" height="30" rx="15" fill="#334155" />
            <text x="200" y="475" fill="#f1f5f9" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="1">PARK CASUAL</text>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-sm border border-[#E5E4DF] p-6 sm:p-8 shadow-sm relative overflow-hidden max-w-2xl mx-auto" id="photo-showcase-container">
      
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2F0EB] rounded-sm text-[#7C6F5D] text-[10px] font-bold uppercase tracking-widest mb-2">
          <Camera size={12} className="text-[#7C6F5D]" /> Wardrobe Showcase
        </span>
        <h3 className="font-serif text-3xl text-[#1A1A1A] font-black uppercase leading-tight border-b-2 border-[#1A1A1A] pb-1 mx-auto w-fit">
          Dhruv's Looks
        </h3>
        <p className="text-stone-500 text-xs mt-1.5 font-serif italic">
          "Interactive reference styles representing Dhruv's wardrobe layout."
        </p>
      </div>

      <div className="space-y-6">
        {/* Animated Interactive Frame containing SVG art or Real uploaded Image */}
        <div 
          className={`relative rounded-sm aspect-[3/4] max-w-md mx-auto overflow-hidden border transition-all duration-150 group cursor-pointer ${
            isDragging ? "border-[#7C6F5D] bg-[#FAF9F6]" : "border-[#E5E4DF] hover:border-[#1A1A1A] bg-[#FAF9F6]"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerUpload}
          id="photos-interactive-card"
        >
          {isCompressing && (
            <div className="absolute inset-0 bg-white/95 z-30 flex flex-col items-center justify-center text-center p-6">
              <div className="w-8 h-8 border-4 border-[#7C6F5D] border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="font-serif text-[#1A1A1A] font-bold text-sm uppercase tracking-wider">Saving Photo...</p>
              <p className="text-stone-500 font-mono text-[9px] mt-1">Compressing image for permanent local storage</p>
            </div>
          )}
          {/* If user HAS NOT uploaded their actual photo file, show the customized premium SVG representation */}
          <AnimatePresence mode="wait">
            {!currentUploadedUrl ? (
              <motion.div
                key={`art-${currentPhoto.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full h-full relative"
              >
                {renderArtisticRepresentation(currentPhoto.id)}
                
                {/* Floating drag instructions overlay on hovering card */}
                <div className="absolute inset-0 bg-[#1A1A1A]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex flex-col items-center justify-center text-center p-6 text-white text-xs">
                  <div className="w-11 h-11 rounded-sm bg-[#7C6F5D] text-white flex items-center justify-center mb-3 border border-white/20">
                    <Upload size={18} className="animate-bounce" />
                  </div>
                  <p className="font-serif text-white font-bold uppercase tracking-wider">
                    Drag & Drop Photo Here
                  </p>
                  <p className="text-stone-300 text-[11px] mt-1 px-2 font-mono">
                    Replaces this illustration placeholder with your real image file
                  </p>
                  <button className="mt-4 px-4 py-2 bg-white text-[#1A1A1A] font-mono font-bold text-[10px] uppercase tracking-widest rounded-sm hover:bg-[#FAF9F6] transition duration-150">
                    Select Image File
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Renders the REAL dynamic image file uploaded by the user */
              <motion.div
                key={`user-${currentPhoto.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full h-full relative group"
              >
                <img 
                  src={currentUploadedUrl} 
                  alt={currentPhoto.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Floating badge validating custom image is active */}
                <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-[#1A1A1A] text-white text-[9px] font-mono font-bold rounded-sm shadow z-15 uppercase tracking-widest">
                  <Check size={11} strokeWidth={3} /> Real Photo Active
                </div>

                {/* Buttons when real image is active (Hover reveal) */}
                <div className="absolute inset-0 bg-[#1A1A1A]/50 opacity-0 group-hover:opacity-100 transition-all duration-150 flex items-center justify-center z-10 gap-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); triggerUpload(); }}
                    className="p-3 bg-white hover:bg-[#FAF9F6] text-[#1A1A1A] rounded-sm transition shadow border border-[#E5E4DF]"
                    title="Update photo"
                  >
                    <Upload size={16} />
                  </button>
                  <button 
                    onClick={removePhoto}
                    className="p-3 bg-red-700 text-white rounded-sm transition shadow"
                    title="Reset to illustration"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hidden Input File selector */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />

          {/* Active Slideshow Navigation Dots Overlay */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#1A1A1A]/80 p-1 rounded-sm px-2.5">
            {PHOTO_ASSORTMENT.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={(e) => { e.stopPropagation(); setActiveIndex(idx); }}
                className={`w-1.5 h-1.5 rounded-sm transition-all duration-150 ${
                  idx === activeIndex 
                    ? "bg-[#7C6F5D] w-3" 
                    : "bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
          
          {/* Direct Left & Right Arrow buttons floating over image */}
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white hover:bg-[#FAF9F6] text-[#1A1A1A] rounded-sm opacity-0 group-hover:opacity-100 transition duration-150 shadow border border-[#E5E4DF] z-20 cursor-pointer"
          >
            <ChevronLeft size={14} />
          </button>
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white hover:bg-[#FAF9F6] text-[#1A1A1A] rounded-sm opacity-0 group-hover:opacity-100 transition duration-150 shadow border border-[#E5E4DF] z-20 cursor-pointer"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Noticeable Photo Upload Tray instruction */}
        <div className="p-4 bg-[#F2F0EB] rounded-sm border border-[#E5E4DF] flex items-center gap-4 max-w-md mx-auto">
          <div className="p-2.5 bg-white text-[#7C6F5D] rounded-sm border border-[#E5E4DF] shrink-0">
            <ImageIcon size={18} />
          </div>
          <div className="flex-1">
            <p className="text-[#1A1A1A] font-bold text-xs font-serif uppercase tracking-tight">PHOTOS ATTACHED</p>
          </div>
        </div>

        {/* Staggered Index Row Selector */}
        <div className="border-t border-[#E5E4DF] pt-5 max-w-md mx-auto">
          <h5 className="text-[#1A1A1A] text-[10px] font-mono font-bold uppercase tracking-widest mb-3 text-center block">
            Outfit Selection:
          </h5>
          <div className="grid grid-cols-5 gap-2.5">
            {PHOTO_ASSORTMENT.map((photo, index) => {
              const isActive = index === activeIndex;
              const hasUploaded = !!uploadedPhotos[photo.id];
              return (
                <button
                  key={`btn-${photo.id}`}
                  onClick={() => setActiveIndex(index)}
                  className={`flex flex-col items-center p-2 rounded-sm border text-center transition-all duration-150 cursor-pointer ${
                    isActive 
                      ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-sm font-bold" 
                      : "bg-white text-[#8C8984] border-[#E5E4DF] hover:bg-[#FAF9F6] hover:text-[#1A1A1A]"
                  }`}
                >
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase block">
                    LOOK {index + 1}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-sm mt-1.5 transition-all duration-150 ${
                    isActive 
                      ? "bg-[#7C6F5D]" 
                      : hasUploaded 
                        ? "bg-emerald-500" 
                        : "bg-[#E5E4DF]"
                  }`} />
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
