/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PersonalInfo {
  name: string;
  dob: string;
  age: number;
  heightCm: number;
  weightCc: number;
  birthPlace: string;
  education: string;
  hobbies: string[];
  residence?: string;
}

export interface ImmediateFamily {
  fatherName: string;
  fatherOccupation: string;
  fatherPhone?: string;
  motherName: string;
  motherOccupation: string;
  motherPhone?: string;
  sisterName: string;
  sisterLocation: string;
  sisterPhone?: string;
}

export interface PaternalFamily {
  nativePlace: string;
  grandfatherName: string;
  grandmotherName: string;
  uncleName: string;
  uncleLocation: string;
  auntName: string;
  auntLocation: string;
}

export interface MamaMamiPair {
  mamaName: string;
  mamiName: string;
  location?: string;
}

export interface MaternalFamily {
  nativePlace: string;
  mamas: MamaMamiPair[];
}

export interface ContactDetails {
  phone: string;
  email: string;
  website?: string;
}

export interface DhruvBiodata {
  personal: PersonalInfo;
  immediateFamily: ImmediateFamily;
  paternalFamily: PaternalFamily;
  maternalFamily: MaternalFamily;
  contact: ContactDetails;
}

export interface PhotoAsset {
  id: string;
  title: string;
  description: string;
  outfitDetails: string;
  locationDetails: string;
  bgGradient: string;
  textColor: string;
  accentColor: string;
  mockUrl?: string; // Standard path for overriding with real files if available
}
