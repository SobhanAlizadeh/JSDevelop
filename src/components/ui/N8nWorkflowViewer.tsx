"use client";

import { useMemo } from "react";
import {
  Zap, Globe, Code2, GitBranch, Mail, MessageSquare, Clock, Table, Send, Box,
  type LucideIcon,
} from "lucide-react";
import type { N8nWorkflow } from "@/lib/n8n-workflows";

const NODE_W = 104;
const NODE_H = 72;

const NODE_META: Record<string, { icon: LucideIcon; color: string }> = {
  webhook: { icon: Zap, color: "#a855f7" },
  httprequest: { icon: Globe, color: "#38bdf8" },
  code: { icon: Code2, color: "#f59e0b" },
  if: { icon: GitBranch, color: "#34d399" },
  gmail: { icon: Mail, color: "#f87171" },
  slack: { icon: MessageSquare, color: "#e879f9" },
  scheduletrigger: { icon: Clock, color: "#60a5fa" },
  googlesheets: { icon: Table, color: "#4ade80" },
  telegram: { icon: Send, color: "#22d3ee" },
};

function metaFor(type: string) {
  const t = type.toLowerCase();
  const key = Object.keys(NODE_META).find((k) => t.includes(k));
  return key ? NODE_META[key] : { icon: Box, color: "#94a3b8" };
}

export function N8nWorkflowViewer({ workflow }: { workflow: N8nWorkflow }) {
  const { width, height, edges } = useMemo(() => {
    const posMap = new Map(workflow.nodes.map((n) => [n.name, n.position]));
    const maxX = Math.max(...workflow.nodes.map((n) => n.position[0]));
    const maxY = Math.max(...workflow.nodes.map((n) => n.position[1]));

    const edges = workflow.connections.map((c) => {
      const a = posMap.get(c.from);
      const b = posMap.get(c.to);
      if (!a || !b) return null;
      const x1 = a[0] + NODE_W;
      const y1 = a[1] + NODE_H / 2;
      const x2 = b[0];
      const y2 = b[1] + NODE_H / 2;
      const dx = Math.max(50, (x2 - x1) / 2);
      return {
        key: `${c.from}->${c.to}`,
        d: `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`,
      };
    }).filter(Boolean) as { key: string; d: string }[];

    return { width: maxX + NODE_W + 60, height: maxY + NODE_H + 80, edges };
  }, [workflow]);

  return (
    <div
      dir="ltr"
      className="n8n-canvas relative rounded-xl border border-custom bg-card-custom/40 overflow-auto"
    >
      <div className="relative" style={{ width, height, minWidth: "100%" }}>
        {/* خطوط اتصال */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={width}
          height={height}
          aria-hidden="true"
        >
          {edges.map((e) => (
            <g key={e.key}>
              <path d={e.d} fill="none" stroke="#3b82f6" strokeOpacity={0.25} strokeWidth={2} />
              <path d={e.d} fill="none" stroke="#60a5fa" strokeWidth={2} className="n8n-edge" />
            </g>
          ))}
        </svg>

        {/* نودها */}
        {workflow.nodes.map((node) => {
          const { icon: Icon, color } = metaFor(node.type);
          return (
            <div
              key={node.name}
              className="absolute flex flex-col items-center"
              style={{ left: node.position[0], top: node.position[1], width: NODE_W }}
              title={node.params ?? node.type}
            >
              <div
                className="glass-panel w-full rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-default"
                style={{ height: NODE_H, borderColor: `${color}55` }}
              >
                <span
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${color}22`, color }}
                >
                  <Icon size={20} />
                </span>
              </div>
              <span className="mt-1.5 text-[11px] font-medium text-muted-custom text-center leading-tight px-1">
                {node.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}