import {
  Home,
  Sparkles,
  Building2,
  Component,
  ShieldCheck,
  FileCheck2,
  Layers,
  Flame,
  Maximize,
  UtensilsCrossed,
  Tv,
  Trees,
  Users2,
  Clock,
  BadgeDollarSign,
  Heart,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Check,
  Star,
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  Percent,
  CheckCircle2,
  PhoneCall
} from "lucide-react";

const iconsMap = {
  Home,
  Sparkles,
  Building2,
  Component,
  ShieldCheck,
  FileCheck2,
  Layers,
  Flame,
  Maximize,
  UtensilsCrossed,
  Tv,
  Trees,
  Users2,
  Clock,
  BadgeDollarSign,
  Heart,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Check,
  Star,
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  Percent,
  CheckCircle2,
  PhoneCall
};

export type IconName = keyof typeof iconsMap;

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

export default function Icon({ name, className = "", size }: IconProps) {
  const IconComponent = iconsMap[name];
  if (!IconComponent) {
    return <Sparkles className={className} size={size} />;
  }
  return <IconComponent className={className} size={size} />;
}
