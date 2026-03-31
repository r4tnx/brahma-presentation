import { useState } from "react";

const slides = [
  // SLIDE 0 — Title
  {
    title: "Multi-Agent Knowledge Graph\nHypothesis Generation for SCLC",
    subtitle: "Progress Report — Iterative Development",
    content: () => (
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 32 }}>
          {[
            { label: "Nodes", val: "143,909" },
            { label: "Relationships", val: "3.27M" },
            { label: "SCLC Documents", val: "1,046" },
            { label: "Eval Queries", val: "21" },
          ].map((s, i) => (
            <div key={i} style={{ background: "var(--card-bg)", borderRadius: 12, padding: "16px 24px", minWidth: 130, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "var(--accent)" }}>{s.val}</div>
              <div style={{ fontSize: 13, color: "var(--dim)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24, flexWrap: "wrap" }}>
          {["Iteration 1: Baseline Pipeline", "Iteration 2: Calibrated System", "Iteration 3: INDRA Integration", "Iteration 4: Full INDRA Agent"].map((s, i) => (
            <div key={i} style={{ background: i === 3 ? "var(--accent)" : "var(--card-bg)", color: i === 3 ? "#fff" : "var(--dim)", borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 600, border: "1px solid var(--border)" }}>
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // SLIDE 1 — Roadmap
  {
    title: "Development Roadmap",
    subtitle: "Four iterations — each building on lessons from the last",
    content: () => {
      const stages = [
        { num: 1, name: "Baseline Pipeline", desc: "Establish the actor-critic framework with local Neo4j knowledge graph", focus: "Prove the core loop works end-to-end", color: "#ef4444" },
        { num: 2, name: "Calibrated System", desc: "Refine actor's evidence retrieval, calibrate critic against labelled data", focus: "Improve precision and scoring fidelity", color: "#f59e0b" },
        { num: 3, name: "INDRA CoGEx Integration", desc: "Add a second knowledge graph for cross-validation + plausibility scoring", focus: "Expand evidence coverage beyond local corpus", color: "#3b82f6" },
        { num: 4, name: "Comprehensive INDRA Agent", desc: "Production-ready evaluation pipeline with structured reasoning and confidence scoring", focus: "Standalone, autonomous hypothesis evaluator", color: "#10b981" },
      ];
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {stages.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "var(--card-bg)", borderRadius: 12, padding: 16, border: "1px solid var(--border)", borderLeft: `4px solid ${s.color}` }}>
              <div style={{ minWidth: 40, height: 40, borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18 }}>{s.num}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{s.name}</div>
                <div style={{ fontSize: 13, color: "var(--dim)", marginBottom: 6 }}>{s.desc}</div>
                <span style={{ fontSize: 11, background: `${s.color}18`, color: s.color, padding: "2px 10px", borderRadius: 8, fontWeight: 600 }}>Focus: {s.focus}</span>
              </div>
              {i < 3 && <div style={{ fontSize: 20, color: "var(--border)", alignSelf: "center" }}>↓</div>}
            </div>
          ))}
        </div>
      );
    },
  },

  // SLIDE 2 — Iteration 1: The Actor
  {
    title: "Iteration 1 — The Hypothesis Actor",
    subtitle: "How the actor generates hypotheses from the knowledge graph",
    content: () => (
      <div>
        <div style={{ background: "var(--card-bg)", borderRadius: 12, padding: 18, border: "1px solid var(--border)", marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: "#3b82f6" }}>Generation Pipeline</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { step: "1", title: "Concept Extraction", desc: "LLM parses the user query and identifies a single core biomedical concept to explore", color: "#3b82f6" },
              { step: "2", title: "Graph Pattern Queries", desc: "Three Neo4j query templates retrieve structural patterns from the SCLC knowledge graph", color: "#8b5cf6" },
              { step: "3", title: "LLM Synthesis", desc: "The LLM combines retrieved graph patterns into candidate hypotheses in a single batch call", color: "#10b981" },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, minWidth: 170, background: "rgba(128,128,128,0.04)", borderRadius: 10, padding: 14, borderTop: `3px solid ${s.color}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: s.color, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.step}</div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{s.title}</div>
                </div>
                <div style={{ fontSize: 12, color: "var(--dim)", lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "var(--card-bg)", borderRadius: 12, padding: 18, border: "1px solid var(--border)" }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Neo4j Query Templates</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { name: "Gap Analysis", desc: "Finds 2–3 hop indirect paths between entities that lack a direct relationship — surfaces potential missing links", icon: "🔍" },
              { name: "Co-occurrence", desc: "Identifies entities that appear in the same document chunks — captures thematic associations in the literature", icon: "📄" },
              { name: "Similarity", desc: "Locates entities that share neighbors in the graph — reveals structural analogues that may have unexplored connections", icon: "🔗" },
            ].map((q, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
                <div style={{ fontSize: 20 }}>{q.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{q.name}</div>
                  <div style={{ fontSize: 12, color: "var(--dim)" }}>{q.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  // SLIDE 3 — Iteration 1: The Critic
  {
    title: "Iteration 1 — The Novelty Critic",
    subtitle: "How the critic evaluates whether a hypothesis is genuinely novel",
    content: () => (
      <div>
        <div style={{ background: "var(--card-bg)", borderRadius: 12, padding: 18, border: "1px solid var(--border)", marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: "#f59e0b" }}>Scoring Mechanism</div>
          <div style={{ fontSize: 13, color: "var(--dim)", marginBottom: 12, lineHeight: 1.6 }}>
            The critic starts with a novelty score of <strong>1.0</strong> (fully novel) and applies successive penalty checks. Each check queries the Neo4j graph for evidence that the hypothesis is already known. The more evidence found, the lower the final score.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { check: "Direct Relationship Check", desc: "Does a direct edge already exist between the hypothesis entities in the graph?", penalty: "−0.6", severity: "High" },
              { check: "Co-occurrence Check", desc: "Do the entities frequently appear together in the same document chunks?", penalty: "−0.3×", severity: "Medium" },
              { check: "Claim Verification (LLM)", desc: "LLM reads retrieved text chunks — does the literature already state this claim?", penalty: "−0.8", severity: "High" },
              { check: "Combination Check", desc: "Do 3+ hypothesis entities appear together in any single chunk?", penalty: "−0.4", severity: "Medium" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(128,128,128,0.04)", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{c.check}</div>
                  <div style={{ fontSize: 11, color: "var(--dim)" }}>{c.desc}</div>
                </div>
                <div style={{ textAlign: "right", minWidth: 60 }}>
                  <div style={{ fontFamily: "monospace", fontWeight: 700, color: "#ef4444", fontSize: 14 }}>{c.penalty}</div>
                  <div style={{ fontSize: 10, color: "var(--dim)" }}>{c.severity}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: "8px 14px", background: "rgba(128,128,128,0.04)", borderRadius: 8, fontSize: 13 }}>
            <strong>Decision threshold:</strong> score &gt; 0.6 → <span style={{ color: "#10b981", fontWeight: 600 }}>ACCEPT</span> &nbsp;|&nbsp; score ≤ 0.6 → <span style={{ color: "#ef4444", fontWeight: 600 }}>REJECT</span>
          </div>
        </div>
      </div>
    ),
  },

  // SLIDE 4 — Iteration 1 Results + Observations
  {
    title: "Iteration 1 — Results & Observations",
    subtitle: "Establishing the baseline and identifying areas for improvement",
    content: () => (
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ background: "var(--card-bg)", borderRadius: 12, padding: 16, border: "1px solid var(--border)", marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "var(--dim)", marginBottom: 4 }}>Acceptance Rate</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#ef4444" }}>27.0%</div>
            <div style={{ fontSize: 12, color: "var(--dim)" }}>17 / 63 hypotheses accepted</div>
          </div>
          {[
            { label: "Total Hypotheses", val: "63" },
            { label: "Novelty Mean", val: "0.562" },
            { label: "Accepted Novelty", val: "1.000" },
            { label: "Rejected Novelty", val: "0.400" },
            { label: "Queries at 0% accept", val: "8 / 21" },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ color: "var(--dim)" }}>{m.label}</span>
              <span style={{ fontWeight: 600 }}>{m.val}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1.3, minWidth: 280 }}>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Novelty Score Distribution</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 150 }}>
            {[
              { range: "0.0–0.2", count: 0, max: 46 },
              { range: "0.2–0.4", count: 46, max: 46 },
              { range: "0.4–0.6", count: 0, max: 46 },
              { range: "0.6–0.8", count: 0, max: 46 },
              { range: "0.8–1.0", count: 17, max: 46 },
            ].map((b, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4, color: b.count ? "inherit" : "transparent" }}>{b.count || "."}</div>
                <div style={{ height: b.count ? (b.count / b.max) * 110 : 2, background: b.count ? "#ef4444" : "var(--border)", borderRadius: "4px 4px 0 0" }} />
                <div style={{ fontSize: 10, color: "var(--dim)", marginTop: 4 }}>{b.range}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, background: "#f59e0b12", border: "1px solid #f59e0b30", borderRadius: 10, padding: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: "#f59e0b" }}>Observations for Next Iteration</div>
            {[
              "Entity matching relied on basic substring lookup — many valid entities weren't resolving against the graph, limiting the critic's evidence coverage",
              "Single-concept extraction per query constrained the diversity of graph patterns retrieved by the actor",
              "Batch hypothesis generation produced clusters of similar outputs — limited diversity across the 3 hypotheses per query",
              "Scoring distribution was bimodal (0.4 vs 1.0) — the critic needed better calibration to produce a wider, more discriminating range of scores",
              "Conservative threshold at 0.6 was rejecting hypotheses where the critic simply lacked enough evidence to score confidently",
            ].map((o, i) => (
              <div key={i} style={{ fontSize: 12, color: "var(--dim)", padding: "4px 0", paddingLeft: 12, borderLeft: "2px solid #f59e0b40", marginBottom: 4, lineHeight: 1.5 }}>
                {o}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  // SLIDE 5 — Iteration 2: What We Improved
  {
    title: "Iteration 2 — Calibrated System",
    subtitle: "Systematic improvements to both actor and critic",
    content: () => (
      <div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
          <div style={{ flex: 1, minWidth: 260, background: "var(--card-bg)", borderRadius: 12, padding: 16, border: "1px solid var(--border)", borderTop: "3px solid #3b82f6" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: "#3b82f6" }}>Actor Improvements</div>
            {[
              { title: "Refined Entity Matching", desc: "Exact match first (case-insensitive), then filtered fuzzy fallback with regex exclusions for noise terms (statistical values, experimental variants, generic labels)" },
              { title: "Cleaner Graph Retrieval", desc: "More precise entity resolution means the actor feeds richer, more relevant graph patterns into hypothesis synthesis" },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 10, paddingLeft: 10, borderLeft: "2px solid #3b82f640" }}>
                <div style={{ fontWeight: 600, fontSize: 12 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: "var(--dim)", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, minWidth: 260, background: "var(--card-bg)", borderRadius: 12, padding: 16, border: "1px solid var(--border)", borderTop: "3px solid #f59e0b" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: "#f59e0b" }}>Critic Calibration</div>
            {[
              { title: "100-Hypothesis Calibration Set", desc: "Hand-labelled dataset: 33 NOT_NOVEL, 33 MID_NOVEL, 34 PURELY_NOVEL — used to tune penalty weights against ground truth" },
              { title: "Threshold Optimization", desc: "F1 sweep across thresholds identified 0.4 as optimal (from 0.6) — recovering recall without sacrificing precision" },
              { title: "Penalty Tuning", desc: "Each penalty check was validated against the calibration set to ensure scores align with actual novelty" },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 10, paddingLeft: 10, borderLeft: "2px solid #f59e0b40" }}>
                <div style={{ fontWeight: 600, fontSize: 12 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: "var(--dim)", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "var(--card-bg)", borderRadius: 12, padding: 16, border: "1px solid var(--border)" }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Calibration Results</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)" }}>
                {["Category", "Ground Truth", "Critic Score", "Error", "Target"].map(h => (
                  <th key={h} style={{ padding: "6px 8px", textAlign: "left", fontWeight: 600, color: "var(--dim)", fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { cat: "NOT_NOVEL (n=33)", truth: "0.000", critic: "0.230", err: "0.230", target: "✅ < 0.3" },
                { cat: "MID_NOVEL (n=33)", truth: "0.600", critic: "0.558", err: "0.405", target: "✅ 0.4–0.6" },
                { cat: "PURELY_NOVEL (n=34)", truth: "0.950", critic: "0.907", err: "0.122", target: "✅ > 0.7" },
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "6px 8px", fontWeight: 600, fontSize: 12 }}>{r.cat}</td>
                  <td style={{ padding: "6px 8px", fontSize: 12 }}>{r.truth}</td>
                  <td style={{ padding: "6px 8px", fontSize: 12 }}>{r.critic}</td>
                  <td style={{ padding: "6px 8px", fontSize: 12 }}>{r.err}</td>
                  <td style={{ padding: "6px 8px", fontSize: 12 }}>{r.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", gap: 20, marginTop: 12, flexWrap: "wrap" }}>
            {[
              { label: "Pearson r", val: "0.644", color: "#3b82f6" },
              { label: "F1 Score", val: "82.09%", color: "#10b981" },
              { label: "Optimal Threshold", val: "0.4", color: "#f59e0b" },
              { label: "Precision", val: "82.09%", color: "#8b5cf6" },
            ].map((m, i) => (
              <div key={i} style={{ fontSize: 13 }}>
                <span style={{ color: "var(--dim)" }}>{m.label}: </span>
                <span style={{ fontWeight: 700, color: m.color }}>{m.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  // SLIDE 6 — Iteration 2 Results
  {
    title: "Iteration 2 — Results",
    subtitle: "Calibrated critic now produces meaningful, discriminating scores",
    content: () => (
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ background: "var(--card-bg)", borderRadius: 12, padding: 16, border: "1px solid var(--border)", marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "var(--dim)", marginBottom: 4 }}>Acceptance Rate</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#f59e0b" }}>34.9%</div>
            <div style={{ fontSize: 12, color: "var(--dim)" }}>22 / 63 hypotheses</div>
            <div style={{ fontSize: 12, color: "#10b981", fontWeight: 600, marginTop: 4 }}>+7.9 pp from Iteration 1</div>
          </div>
          {[
            { label: "Novelty Mean", s1: "0.562", s2: "0.315", better: true },
            { label: "Accepted Novelty", s1: "1.000", s2: "0.877", better: null },
            { label: "Rejected Novelty", s1: "0.400", s2: "0.013", better: true },
            { label: "Accept/Reject Gap", s1: "0.600", s2: "0.864", better: true },
            { label: "Queries at 0%", s1: "8", s2: "6", better: true },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, padding: "5px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ color: "var(--dim)", flex: 1 }}>{m.label}</span>
              <span style={{ color: "var(--dim)", width: 45, textAlign: "right" }}>{m.s1}</span>
              <span style={{ margin: "0 6px", color: "var(--dim)" }}>→</span>
              <span style={{ fontWeight: 600, width: 45, textAlign: "right" }}>{m.s2}</span>
              {m.better !== null && <span style={{ fontSize: 10, color: m.better ? "#10b981" : "var(--dim)", marginLeft: 4 }}>{m.better ? "✓" : ""}</span>}
            </div>
          ))}
        </div>
        <div style={{ flex: 1.3, minWidth: 280 }}>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Score Distribution — Before vs After Calibration</div>
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { label: "Iteration 1", data: [0, 46, 0, 0, 17], color: "#ef4444" },
              { label: "Iteration 2", data: [41, 0, 6, 0, 16], color: "#f59e0b" },
            ].map((set, si) => (
              <div key={si} style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6, color: set.color }}>{set.label}</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 100 }}>
                  {["0–.2", ".2–.4", ".4–.6", ".6–.8", ".8–1"].map((r, i) => (
                    <div key={i} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 2, color: set.data[i] ? "inherit" : "transparent" }}>{set.data[i] || "."}</div>
                      <div style={{ height: set.data[i] ? (set.data[i] / 46) * 80 : 2, background: set.data[i] ? set.color : "var(--border)", borderRadius: "3px 3px 0 0" }} />
                      <div style={{ fontSize: 8, color: "var(--dim)", marginTop: 2 }}>{r}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, background: "#10b98112", border: "1px solid #10b98130", borderRadius: 10, padding: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#10b981", marginBottom: 6 }}>Key Improvement</div>
            <div style={{ fontSize: 12, color: "var(--dim)", lineHeight: 1.5 }}>
              Rejected hypotheses now score near <strong>0.0</strong> (down from 0.4) — the critic is finding real graph evidence and applying meaningful penalties. The bimodal pattern is now <em>correct</em>: clear separation between known and novel.
            </div>
          </div>
          <div style={{ marginTop: 10, background: "#f59e0b12", border: "1px solid #f59e0b30", borderRadius: 10, padding: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#f59e0b", marginBottom: 4 }}>Next Steps Identified</div>
            <div style={{ fontSize: 11, color: "var(--dim)", lineHeight: 1.5 }}>
              Local corpus alone has limited coverage — hypotheses involving established biology <em>outside</em> the 1,046-doc SCLC corpus could still pass as novel. Need a broader knowledge base.
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // SLIDE 7 — Iteration 3: INDRA Integration Architecture
  {
    title: "Iteration 3 — INDRA CoGEx Integration",
    subtitle: "Adding a second knowledge graph + improved hypothesis generation",
    content: () => (
      <div>
        <div style={{ fontSize: 13, color: "var(--dim)", marginBottom: 14, lineHeight: 1.6 }}>
          Two parallel upgrades: a broader biomedical knowledge graph (INDRA CoGEx) for cross-validation, and a redesigned hypothesis generator for higher-quality outputs.
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
          <div style={{ flex: 1, minWidth: 220, background: "var(--card-bg)", borderRadius: 12, padding: 14, border: "1px solid var(--border)" }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: "#ef4444" }}>Local Neo4j</div>
            {[
              { k: "Source", v: "SCLC corpus (1,046 docs)" },
              { k: "Scale", v: "2,538 nodes" },
              { k: "Relationships", v: "Generic (RELATED, IS, HAS)" },
              { k: "Strength", v: "SCLC-specific co-occurrences" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "3px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: "var(--dim)" }}>{r.k}</span><span style={{ fontWeight: 600 }}>{r.v}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, minWidth: 220, background: "var(--card-bg)", borderRadius: 12, padding: 14, border: "1px solid #3b82f640", borderLeft: "4px solid #3b82f6" }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: "#3b82f6" }}>INDRA CoGEx (New)</div>
            {[
              { k: "Source", v: "Broad biomedical literature" },
              { k: "Scale", v: "20M+ nodes" },
              { k: "Relationships", v: "Mechanistic (activation, inhibition, phosphorylation…)" },
              { k: "Strength", v: "Established causal biology" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "3px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: "var(--dim)" }}>{r.k}</span><span style={{ fontWeight: 600 }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { title: "Actor Upgrades", items: ["Multi-group concept extraction (3–4 groups × 3–4 terms)", "Iterative 1-shot generation (one hypothesis per LLM call)", "Jaccard diversity filter (>40%) — eliminates repetitive outputs", "Result: fewer but higher-quality hypotheses (~1.4/query vs 3/query)"], color: "#3b82f6" },
            { title: "INDRA Cross-Validation", items: ["MCP server at discovery.indra.bio (Streamable HTTP)", "Entity grounding against INDRA's namespace", "Causal statement lookup (depth=2)", "LLM compares hypothesis vs known causal statements"], color: "#8b5cf6" },
            { title: "Plausibility Score (New)", items: ["Independent biological plausibility assessment", "LLM-driven, evaluated separately from graph evidence", "Catches incoherent hypotheses that are novel only because they're biologically implausible", "Score ∈ [0.0, 1.0]"], color: "#10b981" },
          ].map((c, i) => (
            <div key={i} style={{ flex: 1, minWidth: 175, background: "var(--card-bg)", borderRadius: 10, padding: 12, border: "1px solid var(--border)", borderTop: `3px solid ${c.color}` }}>
              <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8, color: c.color }}>{c.title}</div>
              {c.items.map((item, j) => (
                <div key={j} style={{ fontSize: 11, color: "var(--dim)", padding: "2px 0", lineHeight: 1.4 }}>• {item}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // SLIDE 8 — Iteration 3 Results
  {
    title: "Iteration 3 — Results",
    subtitle: "Both levers pulled: better hypotheses + broader validation",
    content: () => (
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ background: "var(--card-bg)", borderRadius: 12, padding: 16, border: "1px solid var(--border)", marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "var(--dim)", marginBottom: 4 }}>Acceptance Rate</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#10b981" }}>65.5%</div>
            <div style={{ fontSize: 12, color: "var(--dim)" }}>19 / 29 hypotheses</div>
            <div style={{ fontSize: 12, color: "#10b981", fontWeight: 600, marginTop: 4 }}>+30.6 pp from Iteration 2</div>
          </div>
          <div style={{ background: "var(--card-bg)", borderRadius: 10, padding: 12, border: "1px solid var(--border)", marginBottom: 12 }}>
            <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 6 }}>Why the jump? Two factors:</div>
            <div style={{ fontSize: 11, color: "var(--dim)", lineHeight: 1.6, paddingLeft: 8, borderLeft: "2px solid #3b82f6", marginBottom: 6 }}>
              <strong style={{ color: "#3b82f6" }}>Better inputs:</strong> Improved actor generates 29 hypotheses (vs 63) — fewer, more diverse, higher quality
            </div>
            <div style={{ fontSize: 11, color: "var(--dim)", lineHeight: 1.6, paddingLeft: 8, borderLeft: "2px solid #10b981" }}>
              <strong style={{ color: "#10b981" }}>Better validation:</strong> INDRA cross-validation + plausibility scoring gives the critic broader evidence coverage
            </div>
          </div>
          {[
            { label: "Novelty Mean", val: "0.604" },
            { label: "Plausibility Mean", val: "0.572" },
            { label: "INDRA Entities / Hyp", val: "3.17 avg" },
            { label: "Queries at 100%", val: "12 / 21" },
            { label: "Queries at 0%", val: "3 / 21 (↓ from 6)" },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "5px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ color: "var(--dim)" }}>{m.label}</span>
              <span style={{ fontWeight: 600 }}>{m.val}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1.3, minWidth: 280 }}>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>INDRA Entity Grounding → Acceptance Rate</div>
          {[
            { ent: "0 entities", n: 2, rate: 0 },
            { ent: "1–2 entities", n: 8, rate: 75 },
            { ent: "3–4 entities", n: 13, rate: 69.2 },
            { ent: "5+ entities", n: 6, rate: 66.7 },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: "var(--dim)", width: 75 }}>{r.ent}</div>
              <div style={{ flex: 1, background: "var(--border)", borderRadius: 4, height: 20, overflow: "hidden" }}>
                <div style={{ width: `${r.rate}%`, height: "100%", background: r.rate === 0 ? "#ef4444" : "#10b981", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 6 }}>
                  {r.rate > 15 && <span style={{ color: "#fff", fontSize: 10, fontWeight: 600 }}>{r.rate}%</span>}
                </div>
              </div>
              {r.rate <= 15 && <span style={{ fontSize: 11, fontWeight: 600, color: "#ef4444" }}>{r.rate}%</span>}
            </div>
          ))}
          <div style={{ fontSize: 11, color: "var(--dim)", marginTop: 4, fontStyle: "italic" }}>Hypotheses with no INDRA entity matches were rejected 100% of the time</div>
          <div style={{ marginTop: 16, fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Rejection Breakdown</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            <div style={{ flex: 9, background: "#ef4444", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: 12, fontWeight: 600 }}>Not Novel — 90% (9)</div>
            <div style={{ flex: 1.2, background: "#8b5cf6", borderRadius: 8, padding: "10px 4px", color: "#fff", fontSize: 10, fontWeight: 600, textAlign: "center" }}>Implaus. 10%</div>
          </div>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Score Distribution</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 90 }}>
            {[
              { range: "0–.2", count: 9, max: 14 },
              { range: ".2–.4", count: 0, max: 14 },
              { range: ".4–.6", count: 6, max: 14 },
              { range: ".6–.8", count: 0, max: 14 },
              { range: ".8–1", count: 14, max: 14 },
            ].map((b, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 2, color: b.count ? "inherit" : "transparent" }}>{b.count || "."}</div>
                <div style={{ height: b.count ? (b.count / b.max) * 65 : 2, background: b.count ? "#10b981" : "var(--border)", borderRadius: "3px 3px 0 0" }} />
                <div style={{ fontSize: 8, color: "var(--dim)", marginTop: 2 }}>{b.range}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  // SLIDE 9 — Iteration 4: Full INDRA Agent
  {
    title: "Iteration 4 — Comprehensive INDRA Evaluation Agent",
    subtitle: "Production-ready standalone hypothesis evaluator",
    content: () => (
      <div>
        <div style={{ fontSize: 13, color: "var(--dim)", marginBottom: 14, lineHeight: 1.6 }}>
          A self-contained agent that takes any biomedical hypothesis and autonomously evaluates it against the INDRA CoGEx graph (20M+ nodes). Produces novelty, plausibility, and confidence scores with full reasoning chains.
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
          <div style={{ flex: 1, minWidth: 260, background: "var(--card-bg)", borderRadius: 12, padding: 16, border: "1px solid var(--border)", borderTop: "3px solid #3b82f6" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: "#3b82f6" }}>Stage A — Evidence Gathering</div>
            <div style={{ fontSize: 12, color: "var(--dim)", lineHeight: 1.7 }}>
              {[
                { s: "①", t: "Structured Breakdown", d: "Core claim, sub-claims, entities, evaluation questions" },
                { s: "②", t: "Evidence Plan", d: "Maps INDRA MCP tools to questions in execution order" },
                { s: "③", t: "Deterministic Grounding", d: "Programmatic entity resolution → Entity Registry (no LLM involvement)" },
                { s: "④", t: "ReAct Evidence Loop", d: "Select tool → execute → observe → tag evidence → update plan" },
                { s: "⑤", t: "Termination", d: "Iteration cap, token budget, or all questions sufficiently answered" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, color: "#3b82f6", minWidth: 18 }}>{s.s}</span>
                  <div><strong>{s.t}</strong> — {s.d}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 260, background: "var(--card-bg)", borderRadius: 12, padding: 16, border: "1px solid var(--border)", borderTop: "3px solid #10b981" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: "#10b981" }}>Stage B — Synthesis & Scoring</div>
            <div style={{ fontSize: 12, color: "var(--dim)", lineHeight: 1.7 }}>
              {[
                { s: "①", t: "Evidence Classification", d: "Tag direction (supports/contradicts) + weight (curated > extracted)" },
                { s: "②", t: "Novelty Score", d: "Direct edge existence, statement count, dedicated rubric" },
                { s: "③", t: "Plausibility Score", d: "Indirect paths, shared pathways, mechanism confirmation" },
                { s: "④", t: "Confidence Score", d: "Reflects evaluation reliability — penalizes uncertain groundings" },
                { s: "⑤", t: "Report Assembly", d: "Scores, reasoning, key paths, blind spots, interpretation" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, color: "#10b981", minWidth: 18 }}>{s.s}</span>
                  <div><strong>{s.t}</strong> — {s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { title: "Deterministic Grounding", desc: "Entity resolution is programmatic, not LLM-driven — eliminates tool parameter formatting failures entirely", icon: "🔒" },
            { title: "Independent Scores", desc: "Novelty and plausibility are intentionally separate — a hypothesis can be novel + plausible (most valuable) or novel + implausible (absent because it's wrong)", icon: "📊" },
            { title: "Confidence ≠ Truth", desc: "Confidence reflects how reliable the evaluation is, not whether the hypothesis is correct — driven by grounding quality and evidence coverage", icon: "🎯" },
          ].map((d, i) => (
            <div key={i} style={{ flex: 1, minWidth: 170, background: "var(--card-bg)", borderRadius: 10, padding: 12, border: "1px solid var(--border)", textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{d.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{d.title}</div>
              <div style={{ fontSize: 11, color: "var(--dim)", lineHeight: 1.4 }}>{d.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // SLIDE 10 — Output
  {
    title: "Iteration 4 — Agent Output",
    subtitle: "What the evaluation produces",
    content: () => (
      <div>
        <div style={{ background: "var(--card-bg)", borderRadius: 12, padding: 18, border: "1px solid var(--border)", marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Output Schema</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { field: "Novelty Score", range: "0.0 → 1.0", desc: "0.0 = well-established in INDRA · 1.0 = completely unstudied", color: "#3b82f6" },
              { field: "Plausibility Score", range: "0.0 → 1.0", desc: "0.0 = no mechanistic support · 1.0 = multiple converging pathways support it", color: "#10b981" },
              { field: "Confidence", range: "0.0 → 1.0", desc: "0.0 = unreliable evaluation (poor grounding) · 1.0 = high trust in scores", color: "#f59e0b" },
              { field: "Supporting Evidence", range: "List", desc: "Graph findings that support the hypothesis — with paths and statement counts", color: "#8b5cf6" },
              { field: "Contradicting Evidence", range: "List", desc: "Graph findings that argue against the hypothesis", color: "#ef4444" },
              { field: "Key Paths", range: "List", desc: "Multi-hop paths found between hypothesis entities in the INDRA graph", color: "#06b6d4" },
              { field: "Blind Spots", range: "List", desc: "What the evaluation could not cover — failed groundings, unexplored questions", color: "#f97316" },
              { field: "Interpretation", range: "Text", desc: "Plain-English summary: what the scores mean together and recommended next steps", color: "#64748b" },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 12px", background: "rgba(128,128,128,0.04)", borderRadius: 8, borderLeft: `3px solid ${f.color}` }}>
                <div style={{ minWidth: 140 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: f.color }}>{f.field}</div>
                  <div style={{ fontSize: 10, color: "var(--dim)", fontFamily: "monospace" }}>{f.range}</div>
                </div>
                <div style={{ fontSize: 11, color: "var(--dim)", lineHeight: 1.4 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#3b82f610", borderRadius: 10, padding: 14, border: "1px solid #3b82f630" }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#3b82f6", marginBottom: 6 }}>Score Interpretation Matrix</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { novelty: "High", plaus: "High", meaning: "Most valuable — unexplored but mechanistically supported", bg: "#10b98118" },
              { novelty: "High", plaus: "Low", meaning: "Caution — novel possibly because it's biologically implausible", bg: "#ef444418" },
              { novelty: "Low", plaus: "High", meaning: "Well-established — already known and well-supported", bg: "#f59e0b18" },
              { novelty: "Low", plaus: "Low", meaning: "Known but unsupported — established claim with weak evidence", bg: "#64748b18" },
            ].map((s, i) => (
              <div key={i} style={{ background: s.bg, borderRadius: 8, padding: 10, fontSize: 11 }}>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>Novelty {s.novelty} · Plausibility {s.plaus}</div>
                <div style={{ color: "var(--dim)" }}>{s.meaning}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  // SLIDE 11 — Comparative Summary
  {
    title: "Comparative Summary",
    subtitle: "Quantified progression across all iterations",
    content: () => {
      const bars = [
        { label: "Iter 1", pct: 27.0, color: "#ef4444", total: 63, accepted: 17 },
        { label: "Iter 2", pct: 34.9, color: "#f59e0b", total: 63, accepted: 22 },
        { label: "Iter 3", pct: 65.5, color: "#10b981", total: 29, accepted: 19 },
      ];
      return (
        <div>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Acceptance Rate Progression</div>
            {bars.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 44, fontSize: 12, fontWeight: 600 }}>{b.label}</div>
                <div style={{ flex: 1, background: "var(--border)", borderRadius: 6, height: 28, overflow: "hidden" }}>
                  <div style={{ width: `${b.pct}%`, height: "100%", background: b.color, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8 }}>
                    <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{b.pct}%</span>
                  </div>
                </div>
                <div style={{ fontSize: 10, color: "var(--dim)", minWidth: 55 }}>{b.accepted}/{b.total}</div>
                {i > 0 && <div style={{ fontSize: 11, color: "#10b981", fontWeight: 600, minWidth: 52 }}>+{(b.pct - bars[i-1].pct).toFixed(1)} pp</div>}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
            <div style={{ flex: 1, minWidth: 200, background: "var(--card-bg)", borderRadius: 12, padding: 14, border: "1px solid var(--border)" }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Scoring Fidelity</div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead><tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Metric", "I1", "I2", "I3"].map(h => <th key={h} style={{ padding: "4px 6px", textAlign: "left", color: "var(--dim)", fontWeight: 600 }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {[
                    { m: "Novelty Mean", v: ["0.562", "0.315", "0.604"] },
                    { m: "Accepted Mean", v: ["1.000", "0.877", "0.858"] },
                    { m: "Rejected Mean", v: ["0.400", "0.013", "0.123"] },
                    { m: "Accept/Reject Gap", v: ["0.600", "0.864", "0.735"] },
                    { m: "Queries at 100%", v: ["0", "0", "12"] },
                  ].map((r, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "4px 6px", fontWeight: 600 }}>{r.m}</td>
                      {r.v.map((v, j) => <td key={j} style={{ padding: "4px 6px" }}>{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ flex: 1, minWidth: 200, background: "var(--card-bg)", borderRadius: 12, padding: 14, border: "1px solid var(--border)" }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>What Drove Each Jump</div>
              {[
                { iter: "Iter 1 → 2", delta: "+7.9 pp", items: "Refined entity matching, threshold optimization (0.6→0.4), calibrated penalty weights", color: "#f59e0b" },
                { iter: "Iter 2 → 3", delta: "+30.6 pp", items: "Improved actor (multi-group, iterative, diversity filter) + INDRA cross-validation + plausibility scoring", color: "#10b981" },
                { iter: "Iter 3 → 4", delta: "New capability", items: "Full standalone agent: deterministic grounding, ReAct evidence loop, confidence scoring, structured reports", color: "#3b82f6" },
              ].map((s, i) => (
                <div key={i} style={{ marginBottom: 10, paddingLeft: 10, borderLeft: `3px solid ${s.color}` }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: s.color }}>{s.iter} <span style={{ fontSize: 11, fontWeight: 600 }}>({s.delta})</span></div>
                  <div style={{ fontSize: 11, color: "var(--dim)", lineHeight: 1.4 }}>{s.items}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    },
  },

  // SLIDE 12 — Key Takeaways
  {
    title: "Key Takeaways",
    subtitle: "Lessons from four iterations of development",
    content: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { title: "Calibrate before adding features", desc: "Building a 100-hypothesis calibration set gave us a reliable baseline. Every subsequent improvement was measurable because the scoring was trustworthy.", icon: "📐" },
          { title: "Improve both sides of the loop", desc: "The biggest jump (+30.6 pp) came from upgrading the actor and critic together — better hypotheses paired with broader validation.", icon: "🔄" },
          { title: "Two knowledge graphs beat one", desc: "Local Neo4j catches SCLC-specific patterns; INDRA catches established causal biology. Complementary coverage reduces false positives from both directions.", icon: "🔗" },
          { title: "Entity grounding is a quality gate", desc: "0 INDRA entities → 0% acceptance. Grounding against a broad biomedical graph is a strong proxy for hypothesis quality and biological coherence.", icon: "🚪" },
          { title: "Plausibility is a distinct dimension from novelty", desc: "Some hypotheses are novel only because they're biologically implausible. Independent plausibility scoring catches what graph-absence alone cannot.", icon: "🧬" },
          { title: "Fewer, better hypotheses > more hypotheses", desc: "Iterative generation with diversity filtering produces ~1.4/query at higher quality than batch generation's 3/query. Quality-first approach compounds through the pipeline.", icon: "✂️" },
        ].map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 12, background: "var(--card-bg)", borderRadius: 10, padding: 14, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 22 }}>{t.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{t.title}</div>
              <div style={{ fontSize: 12, color: "var(--dim)", marginTop: 2, lineHeight: 1.5 }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export default function App() {
  const [slide, setSlide] = useState(0);
  const s = slides[slide];

  return (
    <div style={{
      "--accent": "#3b82f6",
      "--card-bg": "rgba(128,128,128,0.06)",
      "--border": "rgba(128,128,128,0.15)",
      "--dim": "rgba(128,128,128,0.8)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      maxWidth: 720,
      margin: "0 auto",
      padding: 20,
      height: "100vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: "var(--dim)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
            Slide {slide + 1} / {slides.length}
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {slides.map((_, i) => (
              <div key={i} onClick={() => setSlide(i)} style={{
                width: i === slide ? 20 : 8, height: 8, borderRadius: 4,
                background: i === slide ? "var(--accent)" : "var(--border)",
                cursor: "pointer", transition: "all 0.2s",
              }} />
            ))}
          </div>
        </div>
        <h1 style={{ fontSize: slide === 0 ? 28 : 22, fontWeight: 800, margin: 0, lineHeight: 1.2, whiteSpace: "pre-line" }}>{s.title}</h1>
        {s.subtitle && <div style={{ fontSize: 14, color: "var(--dim)", marginTop: 6 }}>{s.subtitle}</div>}
      </div>

      <div style={{ flex: 1 , overflow: "auto" }}>{s.content()}</div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--border)", flexShrink: 0, marginBottom: 40 }}>
        <button onClick={() => setSlide(Math.max(0, slide - 1))} disabled={slide === 0} style={{
          padding: "8px 20px", borderRadius: 8, border: "1px solid var(--border)",
          background: slide === 0 ? "transparent" : "var(--card-bg)",
          color: slide === 0 ? "var(--border)" : "inherit",
          cursor: slide === 0 ? "default" : "pointer", fontWeight: 600, fontSize: 13,
        }}>← Previous</button>
        <button onClick={() => setSlide(Math.min(slides.length - 1, slide + 1))} disabled={slide === slides.length - 1} style={{
          padding: "8px 20px", borderRadius: 8, border: "none",
          background: slide === slides.length - 1 ? "var(--border)" : "var(--accent)",
          color: "#fff", cursor: slide === slides.length - 1 ? "default" : "pointer",
          fontWeight: 600, fontSize: 13,
        }}>Next →</button>
      </div>
    </div>
  );
}