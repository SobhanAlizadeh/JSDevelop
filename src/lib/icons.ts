// src/lib/icons.ts
import {
  Search,
  BarChart3,
  Share2,
  TrendingUp,
  Globe,
  Code2,
  Smartphone,
  PenTool,
  FileText,
  Palette,
  Workflow,
  Box,
  Layers,
  Megaphone,
  HeartPulse,
  Ticket,
  GraduationCap,
  Bot,
  Gamepad2,
  Blocks,
  Swords,
  Atom,
  AudioWaveform,
  type LucideIcon,
} from "lucide-react";

// نگاشت نام آیکون به کامپوننت واقعی
export const iconMap: Record<string, LucideIcon> = {
  // خدمات
  search: Search,
  "bar-chart-3": BarChart3,
  "share-2": Share2,
  "trending-up": TrendingUp,
  globe: Globe,
  "code-2": Code2,
  smartphone: Smartphone,
  "pen-tool": PenTool,
  "file-text": FileText,
  palette: Palette,
  workflow: Workflow,
  box: Box,
  // نمونه‌کارها
  layers: Layers,
  megaphone: Megaphone,
  "heart-pulse": HeartPulse,
  ticket: Ticket,
  // محصولات
  "graduation-cap": GraduationCap,
  bot: Bot,
  // بازی‌ها
  "gamepad-2": Gamepad2,
  blocks: Blocks,
  swords: Swords,
  atom: Atom,
  "audio-waveform": AudioWaveform,
};

export function getIcon(name: string): LucideIcon | null {
  return iconMap[name] ?? null;
}