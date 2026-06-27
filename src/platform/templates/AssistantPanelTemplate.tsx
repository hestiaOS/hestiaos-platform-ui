"use client";
import React from "react";
import { Button, Input } from "../primitives";

interface AssistantMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

interface AssistantPanelTemplateProps {
  agentName: string;
  scopeName: string;
  messages: AssistantMessage[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  loading?: boolean;
  style?: React.CSSProperties;
}

export function AssistantPanelTemplate({ agentName, scopeName, messages, inputValue, onInputChange, onSend, loading, style }: AssistantPanelTemplateProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onSend();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 400, background: "var(--hestiaos-surface)", border: "1px solid var(--hestiaos-border)", borderRadius: "var(--hestiaos-card-radius, 10px)", overflow: "hidden", ...style }}>
      <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--hestiaos-border)", background: "var(--hestiaos-bar)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: "var(--hestiaos-text)" }}>{agentName}</div>
          <div style={{ fontSize: 10, color: "var(--hestiaos-text-muted)" }}>Scope: {scopeName}</div>
        </div>
        <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: "var(--hestiaos-success-bg)", color: "var(--hestiaos-success)", fontWeight: 600 }}>
          Online
        </span>
      </div>
      <div ref={scrollRef} style={{ flex: 1, padding: 14, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--hestiaos-text-muted)", fontSize: 12, padding: 40 }}>
            <span>Stellen Sie eine Frage zum aktuellen Kontext.</span>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div key={msg.id} style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "85%",
                  padding: "8px 12px",
                  borderRadius: isUser ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: isUser ? "var(--hestiaos-brand)" : "var(--hestiaos-card-bg, var(--hestiaos-surface))",
                  color: isUser ? "var(--hestiaos-button-primary-color)" : "var(--hestiaos-text)",
                  border: isUser ? "none" : "1px solid var(--hestiaos-border)",
                  fontSize: 12.5,
                  lineHeight: 1.4
                }}>
                  <div>{msg.text}</div>
                  <div style={{ fontSize: 9, opacity: 0.7, textAlign: "right", marginTop: 4 }}>{msg.timestamp}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div style={{ padding: 10, borderTop: "1px solid var(--hestiaos-border)", background: "var(--hestiaos-bar)", display: "flex", gap: 8, alignItems: "center" }}>
        <Input
          placeholder="Frage an Assistant..."
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
          style={{ flex: 1 }}
        />
        <Button variant="primary" onClick={onSend} disabled={loading || !inputValue.trim()} style={{ whiteSpace: "nowrap" }}>
          {loading ? "..." : "Senden"}
        </Button>
      </div>
    </div>
  );
}
