"use client";
import React from "react";
import { Badge } from "../primitives";

export type HestiaOSModuleStatusType = "functional" | "blocked" | "experimental" | "legacy" | "disabled";

interface ModuleStatusBadgeProps {
  status: HestiaOSModuleStatusType;
  style?: React.CSSProperties;
}

export function ModuleStatusBadge({ status, style }: ModuleStatusBadgeProps) {
  let tone: "success" | "warning" | "danger" | "info" | "neutral" = "neutral";
  let label = status.toUpperCase();

  switch (status) {
    case "functional":
      tone = "success";
      label = "AKTIV";
      break;
    case "blocked":
      tone = "danger";
      label = "GESPERRT";
      break;
    case "experimental":
      tone = "warning";
      label = "EXP / LAB";
      break;
    case "legacy":
      tone = "neutral";
      label = "LEGACY";
      break;
    case "disabled":
      tone = "neutral";
      label = "DEAKTIVIERT";
      break;
  }

  return (
    <Badge tone={tone} style={style}>
      {label}
    </Badge>
  );
}
