"use client";

import { useState } from "react";
import { Workflow, Braces, Tag } from "lucide-react";
import { N8nWorkflowViewer } from "./N8nWorkflowViewer";
import { JsonCodeBlock } from "./JsonCodeBlock";
import type { N8nWorkflow } from "@/lib/n8n-workflows";

export function N8nShowcase({ workflows }: { workflows: N8nWorkflow[] }) {
  const [activeId, setActiveId] = useState(workflows[0]?.id);
  const [tab, setTab] = useState<"visual" | "json">("visual");

  const active = workflows.find((w) => w.id === activeId) ?? workflows[0];
  if (!active) return null;

  const chip = (isActive: boolean) =>
    `px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all border ${
      isActive
        ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
        : "bg-card-custom text-muted-custom border-custom hover:border-primary/50 hover:text-primary"
    }`;

  const tabBtn = (isActive: boolean) =>
    `inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
      isActive
        ? "bg-primary/15 text-primary border border-primary/40"
        : "text-muted-custom hover:text-heading border border-transparent"
    }`;

  return (
    <div className="space-y-4">
      {/* انتخاب ورک‌فلو */}
      <div className="flex flex-wrap gap-2">
        {workflows.map((w) => (
          <button key={w.id} onClick={() => setActiveId(w.id)} className={chip(w.id === active.id)}>
            {w.title}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-custom leading-relaxed">{active.description}</p>

      {/* تگ‌های تکنولوژی */}
      {active.tags && active.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <Tag size={14} className="text-muted-custom" />
          {active.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium border border-secondary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* تب‌ها */}
      <div className="flex gap-2 border-b border-custom pb-2">
        <button onClick={() => setTab("visual")} className={tabBtn(tab === "visual")}>
          <Workflow size={16} />
          نمای گردش کار
        </button>
        <button onClick={() => setTab("json")} className={tabBtn(tab === "json")}>
          <Braces size={16} />
          کد JSON
        </button>
      </div>

      {tab === "visual" ? (
        <N8nWorkflowViewer workflow={active} />
      ) : (
        <JsonCodeBlock code={active.json} />
      )}
    </div>
  );
}