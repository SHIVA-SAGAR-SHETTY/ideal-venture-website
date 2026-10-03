import {
  Bird,
  Building2,
  Cog,
  Hammer,
  House,
  Snowflake,
  Warehouse,
  Wrench,
  Zap,
  BedDouble,
  Building,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon as Key } from "@/content/services";

const icons: Record<Key, LucideIcon> = {
  warehouse: Warehouse,
  snowflake: Snowflake,
  office: Building2,
  villa: House,
  residential: Building,
  camp: BedDouble,
  refurb: Hammer,
  infra: Zap,
  poultry: Bird,
  mep: Cog,
  fm: Wrench,
};

export function ServiceIcon({ name, className = "" }: { name: Key; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} strokeWidth={1.5} aria-hidden="true" />;
}
