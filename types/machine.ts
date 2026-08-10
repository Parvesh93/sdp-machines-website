export type MachineFamily = "multi-cutter" | "line-polishing" | "thin-wire" | "handling";

export type Machine = {
  slug: string;
  name: string;
  family: MachineFamily;
  eyebrow: string;
  summary: string;
  image: string;
  modelNames: string[];
  proof: string;
  chapters: Array<{
    id: string;
    title: string;
    body: string;
    stat?: string;
  }>;
};
