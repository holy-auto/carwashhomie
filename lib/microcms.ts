export type Voice = {
  initial: string;
  name: string;
  car: string;
  treatment: string;
  rating: number;
  title: string;
  body: string;
};

export type Case = {
  title: string;
  model: string;
  service: string;
  beforeColor: string;
  afterColor: string;
  beforeNote: string;
  afterNote: string;
};

export type BodyTier = {
  code: string;
  classLabel: string;
  rank: number;
  name: string;
  price: string;
  duration: string;
  features: string[];
  tone: "premium" | "standard" | "basic";
  tag?: string;
};

export type WashService = {
  code: string;
  name: string;
  subtitle: string;
  description: string;
  price: string;
  note?: string;
  icon: string;
  tag?: string;
};

async function cms<T>(
  endpoint: string,
  kind: "list" | "object" = "list",
): Promise<T | null> {
  const domain = process.env.MICROCMS_SERVICE_DOMAIN;
  const key = process.env.MICROCMS_API_KEY;
  if (!domain || !key) return null;

  const qs = kind === "list" ? "?limit=100" : "";
  try {
    const res = await fetch(
      `https://${domain}.microcms.io/api/v1/${endpoint}${qs}`,
      {
        headers: { "X-MICROCMS-API-KEY": key },
        next: { revalidate: 60 },
      },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return kind === "list" ? json.contents : json;
  } catch {
    return null;
  }
}

export async function getVoices() {
  return cms<Voice[]>("testimonials");
}

export async function getCases() {
  return cms<Case[]>("cases");
}

export async function getBodyCoatings(): Promise<BodyTier[] | null> {
  type Raw = Omit<BodyTier, "features"> & { features: string };
  const rows = await cms<Raw[]>("body-coatings");
  if (!rows) return null;
  return rows.map((r) => ({
    ...r,
    features: r.features.split("\n").filter(Boolean),
  }));
}

export async function getWashServices() {
  return cms<WashService[]>("wash-services");
}
