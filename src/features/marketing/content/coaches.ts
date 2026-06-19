export type CoachProfile = {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  certifications: string[];
  location: string;
};

export const coaches: CoachProfile[] = [
  {
    id: "maya-chen",
    name: "Maya Chen",
    specialty: "Hybrid strength & endurance",
    bio: "Former collegiate rower helping desk-bound athletes rebuild aerobic base without losing strength.",
    certifications: ["CSCS", "USAW L1"],
    location: "Remote · PST",
  },
  {
    id: "sam-ortiz",
    name: "Sam Ortiz",
    specialty: "Busy-professional fat loss",
    bio: "Designs 30–45 minute sessions with clear progression markers and minimal decision fatigue.",
    certifications: ["NASM-CPT", "PN L1"],
    location: "Austin, TX · CST",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    specialty: "Mobility-first strength",
    bio: "Integrates joint-friendly loading patterns for travelers and new parents returning to training.",
    certifications: ["FRCms", "CSCS"],
    location: "Remote · GMT",
  },
];
