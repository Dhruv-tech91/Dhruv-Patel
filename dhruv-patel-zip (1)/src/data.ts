/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DhruvBiodata, PhotoAsset } from "./types";

export const DHRUV_BIODATA: DhruvBiodata = {
  personal: {
    name: "PATEL DHRUV RAKESHBHAI",
    dob: "10 October 2005",
    age: 21, // Custom specified age
    heightCm: 176,
    weightCc: 70,
    birthPlace: "Lodra, Gandhinagar, Gujarat",
    education: "B.Tech in Computer Science & Engineering",
    hobbies: ["Fitness & Gym", "Traditional & Global Cooking", "Active Sports & Cricket"],
    residence: "Raysan, Gandhinagar, Gujarat"
  },
  immediateFamily: {
    fatherName: "PATEL RAKESHBHAI PRAHLADBHAI",
    fatherOccupation: "Tubewell Contractor",
    fatherPhone: "9825243714",
    motherName: "PATEL GOMTIBEN RAKESHBHAI",
    motherOccupation: "Homemaker",
    motherPhone: "8140416741",
    sisterName: "PATEL NIDHI RAKESHBHAI",
    sisterLocation: "Australia",
    sisterPhone: "+61 412001826"
  },
  paternalFamily: {
    nativePlace: "(SHETHIYA), Lodra, Gandhinagar, Gujarat",
    grandfatherName: "PATEL PRAHLADBHAI AMBALAL",
    grandmotherName: "PATEL KAMDABEN PRAHLADBHAI",
    uncleName: "PATEL GIRISHBHAI PRAHLADBHAI",
    uncleLocation: "USA",
    auntName: "PATEL RINABEN GIRISHBHAI",
    auntLocation: "USA"
  },
  maternalFamily: {
    nativePlace: "Ajol, Gandhinagar, Gujarat",
    mamas: [
      {
        mamaName: "PATEL PRAHLADBHAI SHAMALBHAI",
        mamiName: "PATEL SAROJBEN PRAHLADBHAI",
        location: "Doji"
      },
      {
        mamaName: "PATEL SATISHBHAI PRAHLADBHAI PATEL",
        mamiName: "PATEL NILAMBEN SATISHBHAI",
        location: "Germany"
      }
    ]
  },
  contact: {
    phone: "7096921934",
    email: "drpatel10102005@gmail.com"
  }
};

export const PHOTO_ASSORTMENT: PhotoAsset[] = [
  {
    id: "look_traditional",
    title: "Ethnic Sophistication",
    description: "Dhruv standing elegantly outdoors amidst palm leaves, wearing a stunning traditional lime-cream sadri (printed jacket) over a matching premium kurta.",
    outfitDetails: "Cream Kurta-Pyjama set paired with a beautiful botanical-patterned embroidered pastel sadri (Nehru jacket)",
    locationDetails: "Lush botanical gardens, under natural sunlight",
    bgGradient: "from-amber-50 to-gold-100",
    textColor: "text-amber-950",
    accentColor: "border-amber-400"
  },
  {
    id: "photo_sage_green",
    title: "Casual Refinement",
    description: "Smart designer corporate look in a lush garden pathway. Wearing a fitted sage green button-down shirt and black formal trousers, accessorized with sunglasses.",
    outfitDetails: "Sage-green slim-fit button-down shirt, classic black trousers, dark designer sunglasses",
    locationDetails: "Modern designer estate gardens during golden hour",
    bgGradient: "from-emerald-50 to-teal-50",
    textColor: "text-emerald-950",
    accentColor: "border-teal-400"
  },
  {
    id: "photo_bougainvillea",
    title: "Natural Contrast",
    description: "Candid side portrait looking towards blooming botanical screens. Captured in front of a majestic bush of bright pink bougainvillea flowers.",
    outfitDetails: "Crisp white textured polo shirt and clean-cut charcoal relaxed trousers",
    locationDetails: "Blooming pink floral hedges, parklands",
    bgGradient: "from-rose-50 to-pink-50",
    textColor: "text-rose-950",
    accentColor: "border-pink-400"
  },
  {
    id: "photo_classic_white",
    title: "Pathway Elegance",
    description: "A smart path walk candid. Wearing a pristine white long-sleeve dress shirt paired with earthy camel-brown chinos on a hedge-bordered trail.",
    outfitDetails: "White pristine long-sleeve folded double cuffs shirt, tailored brown flat-front chinos",
    locationDetails: "Symmetrical hedge trail at a reserve park",
    bgGradient: "from-stone-100 to-amber-50",
    textColor: "text-stone-900",
    accentColor: "border-stone-400"
  },
  {
    id: "photo_park_grey",
    title: "Modern Minimalist",
    description: "Dhruv looking handsome against a dense green park background. Draped in a lightweight light-grey buttoned casual shirt and dark trousers.",
    outfitDetails: "Light steel-grey textured shirt, charcoal semi-formal trousers, designer sunglasses",
    locationDetails: "Majestic tall trees walkway",
    bgGradient: "from-slate-50 to-zinc-100",
    textColor: "text-slate-900",
    accentColor: "border-slate-400"
  }
];
