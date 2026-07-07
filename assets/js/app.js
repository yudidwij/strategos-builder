(() => {
  const STORAGE_KEY = "sotdrive-analysis-draft-v1";
  const EFE_STORAGE_KEY = "sotdrive-efe-items-v1";
  const EFE_SETTINGS_KEY = "sotdrive-efe-settings-v1";
  const IFE_STORAGE_KEY = "sotdrive-ife-items-v1";
  const IFE_SETTINGS_KEY = "sotdrive-ife-settings-v1";
  const CPM_STORAGE_KEY = "sotdrive-cpm-items-v1";
  const CPM_SETTINGS_KEY = "sotdrive-cpm-settings-v1";
  const TOWS_STORAGE_KEY = "sotdrive-tows-items-v1";
  const SPACE_STORAGE_KEY = "sotdrive-space-matrix-v1";
  const BCG_STORAGE_KEY = "sotdrive-bcg-matrix-v1";
  const INTERSECTION_STORAGE_KEY = "sotdrive-intersection-state-v1";
  const TOWS_STRATEGY_OPTIONS = [
    { type: "Market Penetration", category: "Intensive" },
    { type: "Market Development", category: "Intensive" },
    { type: "Product Development", category: "Intensive" },
    { type: "Related Diversification", category: "Diversification" },
    { type: "Unrelated Diversification", category: "Diversification" },
    { type: "Backward Integration", category: "Integration" },
    { type: "Forward Integration", category: "Integration" },
    { type: "Horizontal Integration", category: "Integration" },
  ];
  const INTERSECTION_STRATEGY_LIBRARY = [
    ...TOWS_STRATEGY_OPTIONS,
    { type: "Retrenchment", category: "Defensive" },
    { type: "Divestiture", category: "Defensive" },
    { type: "Liquidation", category: "Defensive" },
  ];
  const EFE_SOURCE_OPTIONS = [
    {
      label: "PESTEL",
      values: ["Political", "Economic", "Social", "Technology", "Environmental", "Legal"],
    },
    {
      label: "Porter Five Forces",
      values: [
        "Rivalry among existing competitors",
        "Threat of new entrants",
        "Bargaining power of buyers",
        "Bargaining power of suppliers",
        "Threat of substitute products or services",
      ],
    },
  ];
  const IFE_SOURCE_OPTIONS = [
    {
      label: "McKinsey 7S",
      values: ["Strategy", "Structure", "Systems", "Shared Values", "Style", "Staff", "Skills"],
    },
  ];
  const CPM_CSF_OPTIONS = [
    "Pemasaran",
    "Ekspansi Jaringan",
    "Kondisi Keuangan",
    "Manajemen",
    "Kualitas Produk",
    "Loyalitas Pelanggan",
    "Harga Bersaing",
    "Pangsa Pasar",
    "Unik Capabilities",
  ];
  const SPACE_DIMENSIONS = {
    fp: {
      label: "Financial Position (FP)",
      min: 1,
      max: 7,
      factors: [
        "Return on Investment (ROI)",
        "Leverage",
        "Liquidity",
        "Working Capital",
        "Cash Flow",
        "Inventory Turnover",
        "Earning per Share (EPS)",
        "Price Earning Ratio (PER)",
      ],
    },
    cp: {
      label: "Competitive Position (CP)",
      min: -7,
      max: -1,
      factors: [
        "Market Share",
        "Product Quality",
        "Product Life Cycle",
        "Customer Loyalty",
        "Capacity Utilization",
        "Technological Know-How",
        "Control Over Supplier & Distributor",
      ],
    },
    sp: {
      label: "Stability Position (SP)",
      min: -7,
      max: -1,
      factors: [
        "Technological Changes",
        "Rate of Inflation",
        "Demand Variability",
        "Price Range of Competing Product",
        "Barriers to Entry into Market",
        "Ease of Exit from Market",
        "Risk Involved in Business",
      ],
    },
    ip: {
      label: "Industry Position (IP)",
      min: 1,
      max: 7,
      factors: [
        "Growth Potential",
        "Profit Potential",
        "Financial Stability",
        "Extent Leveraged",
        "Resource Utilization",
        "Ease of Entry into Market",
        "Productivity, Capacity Util.",
      ],
    },
  };
  const PHASE_WORKSPACE_MAP = [
    { key: "p0", section: "phase-0", label: "P0 Intake & Diagnosis", description: "Company baseline, objective, scope, and data assumptions." },
    { key: "p1", section: "phase-1", label: "P1 EFE Matrix", description: "External factor identification and EFE workspace.", href: "phase-1-efe.html" },
    { key: "p2", section: "phase-2", label: "P2 IFE Matrix", description: "Internal factor evaluation and validation workspace.", href: "phase-2-ife.html" },
    { key: "p3", section: "phase-3", label: "P3 CPM Matrix", description: "Competitive profile input and comparison workspace.", href: "phase-3-cpm.html" },
    { key: "p4", section: "phase-4", label: "P4 SWOT & TOWS", description: "TOWS strategy drafting based on approved external and internal factors.", href: "phase-4-swot-tows.html" },
    { key: "p5", section: "phase-5", label: "P5 SPACE Matrix", description: "Dedicated SPACE Matrix workspace with four-dimension scoring and visual quadrant output.", href: "phase-5-space.html" },
    { key: "p6", section: "phase-6", label: "P6 BCG Matrix", description: "Dedicated BCG Matrix workspace with RMSP, IGR, quadrant, and market-growth visualization.", href: "phase-6-bcg.html" },
    { key: "p7", section: "phase-7", label: "P7 IE Matrix", description: "Dedicated IE Matrix workspace based on approved total EFE and IFE scores.", href: "phase-7-ie.html" },
    { key: "p8", section: "phase-8", label: "P8 Intersection Rule", description: "Dedicated synthesis workspace for cross-tool strategy intersection and umbrella strategy preparation.", href: "phase-8-intersection.html" },
    { key: "p9", section: "phase-9", label: "P9 QSPM Matrix", description: "Prioritization and strategic theme ranking workspace." },
    { key: "p10", section: "phase-10", label: "P10 BSC Financial", description: "Balanced Scorecard sub-page for financial perspective and downstream execution views." },
    { key: "p11", section: "phase-10", label: "P11 BSC Customer", description: "Balanced Scorecard sub-page for customer perspective within the shared BSC workspace." },
    { key: "p12", section: "phase-10", label: "P12 BSC Internal Process", description: "Balanced Scorecard sub-page for internal process perspective within the shared BSC workspace." },
    { key: "p13", section: "phase-10", label: "P13 BSC Learning & Growth", description: "Balanced Scorecard sub-page for learning and growth perspective within the shared BSC workspace." },
    { key: "p14", section: "phase-14", label: "P14 Strategy Map & Executive Summary", description: "Final strategy map and executive summary input workspace." },
  ];

  function safeReadDraft() {
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (error) {
      return {};
    }
  }

  function safeWriteDraft(draft) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      return true;
    } catch (error) {
      return false;
    }
  }

  function safeReadJson(key, fallback) {
    try {
      return JSON.parse(window.localStorage.getItem(key) || JSON.stringify(fallback));
    } catch (error) {
      return fallback;
    }
  }

  function safeWriteJson(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function createToastHost() {
    let host = document.querySelector("[data-toast-host]");
    if (host) return host;

    host = document.createElement("div");
    host.setAttribute("data-toast-host", "true");
    host.className = "fixed bottom-4 right-4 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3";
    document.body.appendChild(host);
    return host;
  }

  function showToast(message, tone = "info") {
    const host = createToastHost();
    const toast = document.createElement("div");
    const toneClasses = {
      info: "border-info/40 bg-info/15 text-sky-50",
      success: "border-success/40 bg-success/15 text-emerald-50",
      warning: "border-warning/40 bg-warning/15 text-amber-50",
    };

    toast.className = `rounded-2xl border px-4 py-3 text-sm shadow-panel backdrop-blur-xl ${toneClasses[tone] || toneClasses.info}`;
    toast.textContent = message;
    host.appendChild(toast);

    window.setTimeout(() => {
      toast.remove();
    }, 2600);
  }

  function slugify(value) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function deriveFieldKey(field, index) {
    const container = field.closest("details");
    const phase = container?.id || "global";
    const label = field.closest("label")?.childNodes?.[0]?.textContent?.trim();
    const fallback = field.getAttribute("placeholder") || field.getAttribute("type") || `field-${index}`;
    return `${phase}::${slugify(label || fallback || `field-${index}`)}`;
  }

  function setFieldValue(field, value) {
    if (field.type === "checkbox" || field.type === "radio") {
      field.checked = value === true || value === "true";
      return;
    }
    field.value = value;
  }

  function getFieldValue(field) {
    if (field.type === "checkbox" || field.type === "radio") {
      return field.checked;
    }
    return field.value;
  }

  function collectFieldRows() {
    return Array.from(document.querySelectorAll("input, textarea, select"))
      .filter((field) => field.type !== "button" && field.type !== "submit" && field.type !== "hidden")
      .map((field, index) => {
        if (!field.dataset.fieldKey) {
          field.dataset.fieldKey = deriveFieldKey(field, index);
        }

        const section = field.closest("details")?.querySelector("summary h3")?.textContent?.trim() || "General";
        const label = field.closest("label")?.childNodes?.[0]?.textContent?.trim() || field.dataset.fieldKey;
        const value = getFieldValue(field);

        return {
          key: field.dataset.fieldKey,
          section,
          label,
          value,
        };
      });
  }

  function hydrateFieldsFromDraft() {
    const draft = safeReadDraft();
    collectFieldRows().forEach(({ key }) => {
      const field = document.querySelector(`[data-field-key="${CSS.escape(key)}"]`);
      if (!field) return;
      if (draft[key] === undefined) return;
      setFieldValue(field, draft[key]);
    });
  }

  function saveAllFields() {
    const draft = {};
    collectFieldRows().forEach(({ key, value }) => {
      draft[key] = value;
    });
    return safeWriteDraft(draft);
  }

  function updateDraftIndicators() {
    const indicators = document.querySelectorAll("[data-draft-indicator]");
    const total = Object.keys(safeReadDraft()).length;
    indicators.forEach((indicator) => {
      indicator.textContent = total > 0 ? `Draft autosave active: ${total} fields tersimpan` : "Draft autosave belum berisi data";
    });
  }

  function getPhase0CompanyName() {
    const draft = safeReadDraft();
    const fromDraft = draft["phase-0::company-name"];
    if (typeof fromDraft === "string" && fromDraft.trim()) {
      return fromDraft.trim();
    }

    const phase0Field = document.querySelector('[data-field-key="phase-0::company-name"]');
    if (phase0Field && typeof phase0Field.value === "string" && phase0Field.value.trim()) {
      return phase0Field.value.trim();
    }

    return "";
  }

  function getEfeItems() {
    return safeReadJson(EFE_STORAGE_KEY, []);
  }

  function setEfeItems(items) {
    return safeWriteJson(EFE_STORAGE_KEY, items);
  }

  function getEfeSettings() {
    return safeReadJson(EFE_SETTINGS_KEY, { weightingMode: "manual" });
  }

  function setEfeSettings(settings) {
    return safeWriteJson(EFE_SETTINGS_KEY, settings);
  }

  function getIfeItems() {
    return safeReadJson(IFE_STORAGE_KEY, []);
  }

  function setIfeItems(items) {
    return safeWriteJson(IFE_STORAGE_KEY, items);
  }

  function getIfeSettings() {
    return safeReadJson(IFE_SETTINGS_KEY, { weightingMode: "manual" });
  }

  function setIfeSettings(settings) {
    return safeWriteJson(IFE_SETTINGS_KEY, settings);
  }

  function getCpmItems() {
    return safeReadJson(CPM_STORAGE_KEY, []);
  }

  function setCpmItems(items) {
    return safeWriteJson(CPM_STORAGE_KEY, items);
  }

  function getCpmSettings() {
    return safeReadJson(CPM_SETTINGS_KEY, {
      weightingMode: "manual",
      companyName: "Perusahaan User",
      competitor1Name: "Competitor 1",
      competitor2Name: "Competitor 2",
      competitor3Name: "Competitor 3",
    });
  }

  function setCpmSettings(settings) {
    return safeWriteJson(CPM_SETTINGS_KEY, {
      ...getCpmSettings(),
      ...settings,
    });
  }

  function getTowsItems() {
    return safeReadJson(TOWS_STORAGE_KEY, []);
  }

  function setTowsItems(items) {
    return safeWriteJson(TOWS_STORAGE_KEY, items);
  }

  function buildInitialSpaceState() {
    return Object.entries(SPACE_DIMENSIONS).reduce((acc, [key, config]) => {
      acc[key] = config.factors.map((factor) => ({
        factor,
        value: "",
        reason: "",
      }));
      return acc;
    }, {});
  }

  function getSpaceState() {
    const fallback = buildInitialSpaceState();
    const saved = safeReadJson(SPACE_STORAGE_KEY, fallback);
    return Object.entries(SPACE_DIMENSIONS).reduce((acc, [key, config]) => {
      const savedRows = Array.isArray(saved[key]) ? saved[key] : [];
      acc[key] = config.factors.map((factor, index) => {
        const savedRow = savedRows[index] || {};
        return {
          factor,
          value: savedRow.factor === factor ? savedRow.value || "" : "",
          reason: savedRow.factor === factor ? savedRow.reason || "" : "",
        };
      });
      return acc;
    }, {});
  }

  function setSpaceState(state) {
    return safeWriteJson(SPACE_STORAGE_KEY, state);
  }

  function buildSourceOptions(selectedValue) {
    return EFE_SOURCE_OPTIONS.map((group) => {
      const options = group.values
        .map((value) => `<option value="${value}"${value === selectedValue ? " selected" : ""}>${value}</option>`)
        .join("");
      return `<optgroup label="${group.label}">${options}</optgroup>`;
    }).join("");
  }

  function buildIfeSourceOptions(selectedValue) {
    return IFE_SOURCE_OPTIONS.map((group) => {
      const options = group.values
        .map((value) => `<option value="${value}"${value === selectedValue ? " selected" : ""}>${value}</option>`)
        .join("");
      return `<optgroup label="${group.label}">${options}</optgroup>`;
    }).join("");
  }

  function buildCpmCsfOptions(selectedValue, disabledValues = []) {
    return CPM_CSF_OPTIONS.map((value) => {
      const isSelected = value === selectedValue;
      const isDisabled = disabledValues.includes(value) && !isSelected;
      return `<option value="${value}"${isSelected ? " selected" : ""}${isDisabled ? " disabled" : ""}>${value}</option>`;
    }).join("");
  }

  function getEfeInputRows() {
    return Array.from(document.querySelectorAll("[data-efe-input-body] tr[data-efe-row-id]"));
  }

  function getEfeRowMeta(row) {
    const bank = row.dataset.efeBank || "opportunity";
    const slot = Number(row.dataset.efeSlot || 0);
    return {
      bank,
      type: bank === "threat" ? "Threat" : "Opportunity",
      slot,
      id: `${bank}-${slot}`,
    };
  }

  function getEfeRowFields(row) {
    return {
      factorInput: row.querySelector("[data-efe-field='factor']"),
      sourceSelect: row.querySelector("[data-efe-field='source']"),
      actionable: row.querySelector("[data-efe-field='aqcd-a']"),
      quantitative: row.querySelector("[data-efe-field='aqcd-q']"),
      comparable: row.querySelector("[data-efe-field='aqcd-c']"),
      divisional: row.querySelector("[data-efe-field='aqcd-d']"),
      status: row.querySelector("[data-efe-row-status]"),
    };
  }

  function createEfeInputRows() {
    document.querySelectorAll("[data-efe-input-body]").forEach((tbody) => {
      if (tbody.children.length) return;

      const bank = tbody.dataset.efeInputBody;
      const toneClass = bank === "threat" ? "divide-warning/20" : "divide-border-blue/60";
      tbody.classList.add(...toneClass.split(" "));

      for (let slot = 1; slot <= 20; slot += 1) {
        const row = document.createElement("tr");
        const id = `${bank}-${slot}`;
        row.dataset.efeRowId = id;
        row.dataset.efeBank = bank;
        row.dataset.efeSlot = String(slot);
        row.className = slot % 2 === 0 ? "bg-navy-surface/40" : "bg-white/5";
        row.innerHTML = `
          <td class="px-3 py-3 font-mono text-soft-white">${slot}</td>
          <td class="px-3 py-3">
            <input
              type="text"
              data-efe-field="factor"
              placeholder="Input ${bank} factor ${slot}"
              class="w-full rounded-2xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white placeholder:text-cool-gray"
            />
          </td>
          <td class="px-3 py-3">
            <select
              data-efe-field="source"
              class="w-full rounded-2xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white"
            >
              ${buildSourceOptions("Political")}
            </select>
          </td>
          <td class="px-3 py-3 text-center"><input data-efe-field="aqcd-a" type="checkbox" class="h-4 w-4 rounded border-border-blue bg-navy-deep text-info focus:ring-info" /></td>
          <td class="px-3 py-3 text-center"><input data-efe-field="aqcd-q" type="checkbox" class="h-4 w-4 rounded border-border-blue bg-navy-deep text-info focus:ring-info" /></td>
          <td class="px-3 py-3 text-center"><input data-efe-field="aqcd-c" type="checkbox" class="h-4 w-4 rounded border-border-blue bg-navy-deep text-info focus:ring-info" /></td>
          <td class="px-3 py-3 text-center"><input data-efe-field="aqcd-d" type="checkbox" class="h-4 w-4 rounded border-border-blue bg-navy-deep text-info focus:ring-info" /></td>
          <td class="px-3 py-3">
            <div class="flex min-w-[12rem] flex-col gap-2">
              <div class="flex gap-2">
                <button
                  type="button"
                  data-managed-action="true"
                  data-efe-action="save-row"
                  data-efe-id="${id}"
                  class="inline-flex flex-1 items-center justify-center rounded-xl border border-info/30 bg-info/10 px-3 py-2 text-xs font-medium text-soft-white transition hover:bg-info/20"
                >
                  Save
                </button>
                <button
                  type="button"
                  data-managed-action="true"
                  data-efe-action="clear-row"
                  data-efe-id="${id}"
                  class="inline-flex flex-1 items-center justify-center rounded-xl border border-border-blue bg-white/5 px-3 py-2 text-xs font-medium text-cool-gray transition hover:text-soft-white"
                >
                  Clear
                </button>
              </div>
              <p data-efe-row-status class="text-xs text-cool-gray">Belum terdaftar.</p>
            </div>
          </td>
        `;
        tbody.appendChild(row);
      }
    });
  }

  function buildInitialEfeItems() {
    return [];
  }

  function isLegacySeedItem(item) {
    return (
      (item.id === "opportunity-1" &&
        item.type === "Opportunity" &&
        item.source === "Political" &&
        item.factor === "Growing demand for health-positioned convenience products") ||
      (item.id === "threat-1" &&
        item.type === "Threat" &&
        item.source === "Economic" &&
        item.factor === "Retailer margin pressure from modern trade expansion")
    );
  }

  function ensureInitialEfeStore() {
    const existing = getEfeItems();
    if (existing.length) {
      const cleaned = existing.filter((item) => !isLegacySeedItem(item));
      if (cleaned.length !== existing.length) {
        setEfeItems(cleaned);
        return cleaned;
      }
      return existing;
    }
    const initial = buildInitialEfeItems();
    setEfeItems(initial);
    return initial;
  }

  function getAqcdScore(aqcd) {
    return [aqcd.actionable, aqcd.quantitative, aqcd.comparable, aqcd.divisional].filter(Boolean).length;
  }

  function getAqcdQuality(score) {
    if (score >= 4) return "High";
    if (score >= 2) return "Medium";
    return "Low";
  }

  function getQualifiedEfeItems() {
    return getEfeItems()
      .map((item) => ({
        ...item,
        aqcdScore: getAqcdScore(item.aqcd || {}),
      }))
      .filter((item) => item.aqcdScore >= 2);
  }

  function getRankedEfeItems() {
    return ["opportunity", "threat"].flatMap((bank) =>
      getQualifiedEfeItems()
        .filter((item) => item.type.toLowerCase() === bank)
        .sort((a, b) => b.aqcdScore - a.aqcdScore || a.slot - b.slot)
        .slice(0, 10)
    );
  }

  function updateEfePageSummary(items = getRankedEfeItems()) {
    const opportunityItems = items.filter((item) => item.type === "Opportunity");
    const threatItems = items.filter((item) => item.type === "Threat");
    const summary = {
      opportunity: opportunityItems.length,
      threat: threatItems.length,
      totalWeight: items.reduce((total, item) => total + Number(item.weight || 0), 0),
      weightedScore: items.reduce((total, item) => total + Number(item.weightedScore || 0), 0),
      opportunityWeight: opportunityItems.reduce((total, item) => total + Number(item.weight || 0), 0),
      opportunityScore: opportunityItems.reduce((total, item) => total + Number(item.weightedScore || 0), 0),
      threatWeight: threatItems.reduce((total, item) => total + Number(item.weight || 0), 0),
      threatScore: threatItems.reduce((total, item) => total + Number(item.weightedScore || 0), 0),
    };
    const settings = getEfeSettings();
    const totalWeightNode = document.querySelector("[data-efe-summary='weight-total']");
    const totalWeightInlineNode = document.querySelector("[data-efe-summary='weight-total-inline']");
    const totalScoreNode = document.querySelector("[data-efe-summary='weighted-score-total']");
    const totalScoreInlineNode = document.querySelector("[data-efe-summary='weighted-score-total-inline']");
    const opportunityNode = document.querySelector("[data-efe-summary='opportunity-count']");
    const threatNode = document.querySelector("[data-efe-summary='threat-count']");
    const modeNode = document.querySelector("[data-efe-summary='mode']");
    const statusNode = document.querySelector("[data-efe-summary='weight-status']");
    const statusInlineNode = document.querySelector("[data-efe-summary='weight-status-inline']");
    const analysisNode = document.querySelector("[data-efe-summary='analysis']");
    const opportunityWeightNode = document.querySelector("[data-efe-summary='opportunity-weight-total']");
    const opportunityScoreNode = document.querySelector("[data-efe-summary='opportunity-score-total']");
    const threatWeightNode = document.querySelector("[data-efe-summary='threat-weight-total']");
    const threatScoreNode = document.querySelector("[data-efe-summary='threat-score-total']");
    const grandWeightNode = document.querySelector("[data-efe-summary='grand-weight-total']");
    const grandScoreNode = document.querySelector("[data-efe-summary='grand-score-total']");
    const grandStatusNode = document.querySelector("[data-efe-summary='grand-status']");
    const balanced = Math.abs(summary.totalWeight - 1) < 0.001 || items.length === 0;

    if (totalWeightNode) totalWeightNode.textContent = summary.totalWeight.toFixed(2);
    if (totalWeightInlineNode) totalWeightInlineNode.textContent = summary.totalWeight.toFixed(2);
    if (totalScoreNode) totalScoreNode.textContent = summary.weightedScore.toFixed(2);
    if (totalScoreInlineNode) totalScoreInlineNode.textContent = summary.weightedScore.toFixed(2);
    if (opportunityNode) opportunityNode.textContent = `${summary.opportunity}/10`;
    if (threatNode) threatNode.textContent = `${summary.threat}/10`;
    if (opportunityWeightNode) opportunityWeightNode.textContent = summary.opportunityWeight.toFixed(2);
    if (opportunityScoreNode) opportunityScoreNode.textContent = summary.opportunityScore.toFixed(2);
    if (threatWeightNode) threatWeightNode.textContent = summary.threatWeight.toFixed(2);
    if (threatScoreNode) threatScoreNode.textContent = summary.threatScore.toFixed(2);
    if (grandWeightNode) grandWeightNode.textContent = summary.totalWeight.toFixed(2);
    if (grandScoreNode) grandScoreNode.textContent = summary.weightedScore.toFixed(2);
    if (modeNode) modeNode.textContent = settings.weightingMode === "auto" ? "Auto Pairwise" : "Manual";
    if (statusNode) {
      statusNode.textContent = balanced
        ? "Total bobot sudah seimbang pada 1.00."
        : "Total bobot seluruh Opportunity + Threat harus tepat 1.00.";
      statusNode.className = balanced ? "text-sm text-emerald-200" : "text-sm text-amber-200";
    }
    if (statusInlineNode) {
      statusInlineNode.textContent = balanced
        ? "Total bobot sudah seimbang pada 1.00."
        : "Total bobot seluruh Opportunity + Threat harus tepat 1.00.";
      statusInlineNode.className = balanced ? "mt-3 text-sm text-emerald-200" : "mt-3 text-sm text-amber-200";
    }
    if (grandStatusNode) {
      grandStatusNode.textContent = balanced ? "Balanced at 1.00" : "Weight total must equal 1.00";
      grandStatusNode.className = balanced ? "px-3 py-4 text-xs text-emerald-200" : "px-3 py-4 text-xs text-amber-200";
    }
    if (analysisNode) {
      if (!items.length) {
        analysisNode.textContent =
          "Belum ada faktor yang masuk ke Tabel Key External Factor. Simpan faktor brainstorming yang lolos AQCD terlebih dahulu.";
      } else if (!balanced) {
        analysisNode.textContent =
          "Analisis belum final karena total bobot belum sama dengan 1.00. Samakan dulu total bobot Opportunity dan Threat, lalu baca total weighted score.";
      } else if (summary.weightedScore > 2.5) {
        analysisNode.textContent =
          `Total weighted score ${summary.weightedScore.toFixed(2)} menunjukkan respons perusahaan terhadap faktor eksternal berada di atas rata-rata industri. Opportunity relatif lebih siap dimanfaatkan dan threat lebih siap direspons.`;
      } else if (summary.weightedScore < 2.5) {
        analysisNode.textContent =
          `Total weighted score ${summary.weightedScore.toFixed(2)} menunjukkan respons perusahaan terhadap faktor eksternal masih di bawah rata-rata industri. Perlu perbaikan strategi agar opportunity lebih tertangkap dan threat lebih terkendali.`;
      } else {
        analysisNode.textContent =
          `Total weighted score ${summary.weightedScore.toFixed(2)} menunjukkan posisi perusahaan berada tepat di rata-rata industri. Ada respons dasar, tetapi belum cukup kuat untuk menciptakan keunggulan eksternal yang jelas.`;
      }
    }
  }

  function setEfeSlotStatus(row, message, tone = "default") {
    const status = row.querySelector("[data-efe-row-status]");
    if (!status) return;
    const tones = {
      default: "text-cool-gray",
      success: "text-emerald-200",
      warning: "text-amber-200",
    };
    status.className = `text-xs ${tones[tone] || tones.default}`;
    status.textContent = message;
  }

  function hydrateEfeRowsFromStore() {
    const items = ensureInitialEfeStore();
    const rankedIds = new Set(getRankedEfeItems().map((item) => item.id));
    getEfeInputRows().forEach((row) => {
      const meta = getEfeRowMeta(row);
      const item = items.find((entry) => entry.id === meta.id);
      const fields = getEfeRowFields(row);

      if (item) {
        if (fields.sourceSelect) fields.sourceSelect.value = item.source;
        if (fields.factorInput) fields.factorInput.value = item.factor;
        if (fields.actionable) fields.actionable.checked = !!item.aqcd?.actionable;
        if (fields.quantitative) fields.quantitative.checked = !!item.aqcd?.quantitative;
        if (fields.comparable) fields.comparable.checked = !!item.aqcd?.comparable;
        if (fields.divisional) fields.divisional.checked = !!item.aqcd?.divisional;
        if (rankedIds.has(item.id)) {
          setEfeSlotStatus(row, "Lolos AQCD dan masuk tabel EFE.", "success");
        } else if (getAqcdScore(item.aqcd || {}) >= 2) {
          setEfeSlotStatus(row, "Lolos AQCD, tetapi belum masuk top 10.", "warning");
        } else {
          setEfeSlotStatus(row, "Belum terdaftar.", "default");
        }
      } else {
        setEfeSlotStatus(row, "Belum terdaftar.", "default");
      }
    });
  }

  function normalizeWeightValue(value) {
    const numeric = Number.parseFloat(value);
    if (Number.isNaN(numeric) || numeric < 0) return "";
    return numeric.toFixed(2);
  }

  function calculateWeightedScore(weight, rating) {
    const weightNumber = Number.parseFloat(weight);
    const ratingNumber = Number.parseFloat(rating);
    if (Number.isNaN(weightNumber) || Number.isNaN(ratingNumber)) return "";
    return (weightNumber * ratingNumber).toFixed(2);
  }

  function applyAutoWeights() {
    const settings = { weightingMode: "auto" };
    setEfeSettings(settings);

    const items = getEfeItems().map((item) => ({ ...item }));
    const rankedItems = getRankedEfeItems();

    if (!rankedItems.length) {
      updateEfePageSummary([]);
      showToast("Belum ada faktor EFE yang lolos AQCD untuk dihitung bobotnya.", "warning");
      return;
    }

    if (rankedItems.length === 1) {
      const onlyId = rankedItems[0].id;
      const nextItems = items.map((item) =>
        item.id === onlyId
          ? {
              ...item,
              weight: "1.00",
              weightedScore: calculateWeightedScore("1.00", item.rating),
            }
          : item
      );
      setEfeItems(nextItems);
      renderRegisteredEfeTables();
      showToast("Auto pairwise diterapkan untuk 1 faktor aktif.", "success");
      return;
    }

    const weightsById = {};
    let totalPairwise = 0;

    rankedItems.forEach((leftItem, leftIndex) => {
      let wins = 0;

      rankedItems.forEach((rightItem, rightIndex) => {
        if (leftIndex === rightIndex) return;
        if (leftIndex > rightIndex) return;

        const leftScore = leftItem.aqcdScore;
        const rightScore = rightItem.aqcdScore;

        if (leftScore > rightScore) {
          wins += 1;
        } else if (leftScore < rightScore) {
          weightsById[rightItem.id] = (weightsById[rightItem.id] || 0) + 1;
        } else {
          wins += 0.5;
          weightsById[rightItem.id] = (weightsById[rightItem.id] || 0) + 0.5;
        }

        totalPairwise += 1;
      });

      weightsById[leftItem.id] = (weightsById[leftItem.id] || 0) + wins;
    });

    const rankedIds = new Set(rankedItems.map((item) => item.id));
    const formattedWeightsById = {};
    let assignedWeight = 0;

    rankedItems.forEach((item, index) => {
      if (totalPairwise <= 0) {
        formattedWeightsById[item.id] = "0.00";
        return;
      }

      if (index === rankedItems.length - 1) {
        formattedWeightsById[item.id] = Math.max(0, 1 - assignedWeight).toFixed(2);
        return;
      }

      const weight = ((weightsById[item.id] || 0) / totalPairwise).toFixed(2);
      formattedWeightsById[item.id] = weight;
      assignedWeight += Number.parseFloat(weight);
    });

    const nextItems = items.map((item) => {
      if (!rankedIds.has(item.id)) {
        return item;
      }

      const weight = formattedWeightsById[item.id] || "0.00";

      return {
        ...item,
        weight,
        weightedScore: calculateWeightedScore(weight, item.rating),
      };
    });

    setEfeItems(nextItems);
    renderRegisteredEfeTables();
    showToast("Auto Weight Pairwise berhasil diterapkan.", "success");
  }

  function setManualWeightingMode() {
    setEfeSettings({ weightingMode: "manual" });
    renderRegisteredEfeTables();
    showToast("Mode bobot manual aktif. Pastikan total bobot = 1.00.", "info");
  }

  function renderRegisteredEfeTables() {
    const items = getRankedEfeItems();
    const settings = getEfeSettings();
    const isManual = settings.weightingMode !== "auto";

    ["opportunity", "threat"].forEach((bank) => {
      const tbody = document.querySelector(`[data-efe-registered-body="${bank}"]`);
      if (!tbody) return;
      const filtered = items.filter((item) => item.type.toLowerCase() === bank).sort((a, b) => b.aqcdScore - a.aqcdScore || a.slot - b.slot);

      if (!filtered.length) {
        tbody.innerHTML = `
          <tr class="bg-white/5">
            <td colspan="8" class="px-3 py-4 text-sm text-cool-gray">Belum ada ${bank} yang lolos AQCD dan terdaftar.</td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = filtered
        .map((item, index) => {
          const score = item.aqcdScore;
          const quality = getAqcdQuality(score);
          const rowTone = index % 2 === 0 ? "bg-white/5" : "bg-navy-surface/40";
          const qualityTone =
            quality === "High"
              ? "border-success/30 bg-success/10 text-success"
              : "border-warning/30 bg-warning/10 text-warning";
          const weightValue = item.weight || "";
          const weightedScore = calculateWeightedScore(weightValue, item.rating);

          return `
            <tr class="${rowTone}">
              <td class="px-3 py-3 text-soft-white">${item.factor}</td>
              <td class="px-3 py-3 text-cool-gray">${item.source}</td>
              <td class="px-3 py-3 font-mono text-soft-white">${score}/4</td>
              <td class="px-3 py-3"><span class="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.16em] ${qualityTone}">${quality}</span></td>
              <td class="px-3 py-3">
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  ${isManual ? "" : "disabled"}
                  value="${weightValue}"
                  data-managed-action="true"
                  data-efe-table-field="weight"
                  data-efe-id="${item.id}"
                  class="w-24 rounded-xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white disabled:cursor-not-allowed disabled:opacity-60"
                />
              </td>
              <td class="px-3 py-3">
                <select
                  data-managed-action="true"
                  data-efe-table-field="rating"
                  data-efe-id="${item.id}"
                  class="w-24 rounded-xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white"
                >
                  <option value=""${item.rating ? "" : " selected"}>Select</option>
                  <option value="1"${item.rating === "1" ? " selected" : ""}>1</option>
                  <option value="2"${item.rating === "2" ? " selected" : ""}>2</option>
                  <option value="3"${item.rating === "3" ? " selected" : ""}>3</option>
                  <option value="4"${item.rating === "4" ? " selected" : ""}>4</option>
                </select>
              </td>
              <td class="px-3 py-3 font-mono text-soft-white">${weightedScore || "-"}</td>
              <td class="px-3 py-3">
                <div class="flex flex-wrap gap-2">
                  <button
                    type="button"
                    data-managed-action="true"
                    data-efe-table-action="edit"
                    data-efe-id="${item.id}"
                    class="inline-flex items-center justify-center rounded-xl border border-info/30 bg-info/10 px-3 py-2 text-xs font-medium text-soft-white transition hover:bg-info/20"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    data-managed-action="true"
                    data-efe-table-action="delete"
                    data-efe-id="${item.id}"
                    class="inline-flex items-center justify-center rounded-xl border border-warning/30 bg-warning/10 px-3 py-2 text-xs font-medium text-soft-white transition hover:bg-warning/20"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          `;
        })
        .join("");
    });

    updateEfePageSummary(items);
    hydrateEfeRowsFromStore();
  }

  function updateEfeEvaluationField(id, field, value) {
    const items = getEfeItems();
    const nextItems = items.map((item) => {
      if (item.id !== id) return item;
      const nextValue = field === "weight" ? normalizeWeightValue(value) : value;
      const nextItem = { ...item, [field]: nextValue };
      nextItem.weightedScore = calculateWeightedScore(nextItem.weight, nextItem.rating);
      return nextItem;
    });

    setEfeItems(nextItems);
    renderRegisteredEfeTables();
  }

  function saveEfeRow(id, options = {}) {
    const { silent = false } = options;
    const row = getEfeInputRows().find((entry) => getEfeRowMeta(entry).id === id);
    if (!row) return;
    const { type, slot } = getEfeRowMeta(row);
    const fields = getEfeRowFields(row);
    const factor = fields.factorInput?.value?.trim() || "";

    if (!factor) {
      setEfeSlotStatus(row, "Factor wajib diisi sebelum disimpan.", "warning");
      if (!silent) showToast("Factor EFE belum diisi.", "warning");
      return;
    }

    const aqcd = {
      actionable: !!fields.actionable?.checked,
      quantitative: !!fields.quantitative?.checked,
      comparable: !!fields.comparable?.checked,
      divisional: !!fields.divisional?.checked,
    };
    const aqcdScore = getAqcdScore(aqcd);

    if (aqcdScore < 2) {
      setEfeSlotStatus(row, "AQCD masih rendah. Minimal 2 checklist untuk register.", "warning");
      if (!silent) showToast("AQCD terlalu rendah. Faktor belum bisa diregister.", "warning");
      return;
    }

    const source = fields.sourceSelect?.value || "Political";
    const items = getEfeItems().filter((item) => item.id !== id);
    const existing = getEfeItems().find((item) => item.id === id);
    items.push({
      id,
      type,
      slot,
      source,
      factor,
      aqcd,
      weight: existing?.weight || "",
      rating: existing?.rating || "",
      weightedScore: existing?.weightedScore || "",
    });
    setEfeItems(items);
    saveAllFields();
    updateDraftIndicators();
    renderRegisteredEfeTables();
    const rankedIds = new Set(getRankedEfeItems().map((item) => item.id));
    setEfeSlotStatus(
      row,
      rankedIds.has(id) ? "Lolos AQCD dan masuk tabel EFE." : "Lolos AQCD, tetapi belum masuk top 10.",
      rankedIds.has(id) ? "success" : "warning"
    );
    if (!silent) showToast(`${type} ${slot} berhasil disimpan dengan AQCD ${aqcdScore}/4.`, "success");
  }

  function saveEfeBank(bank) {
    const rows = getEfeInputRows().filter((row) => getEfeRowMeta(row).bank === bank);
    let savedCount = 0;
    let skippedEmpty = 0;
    let skippedLowAqcd = 0;

    rows.forEach((row) => {
      const meta = getEfeRowMeta(row);
      const fields = getEfeRowFields(row);
      const factor = fields.factorInput?.value?.trim() || "";

      if (!factor) {
        skippedEmpty += 1;
        return;
      }

      const aqcd = {
        actionable: !!fields.actionable?.checked,
        quantitative: !!fields.quantitative?.checked,
        comparable: !!fields.comparable?.checked,
        divisional: !!fields.divisional?.checked,
      };

      if (getAqcdScore(aqcd) < 2) {
        setEfeSlotStatus(row, "AQCD masih rendah. Minimal 2 checklist untuk register.", "warning");
        skippedLowAqcd += 1;
        return;
      }

      saveEfeRow(meta.id, { silent: true });
      savedCount += 1;
    });

    const bankLabel = bank === "threat" ? "Threat" : "Opportunity";
    showToast(
      `${bankLabel}: ${savedCount} tersimpan, ${skippedLowAqcd} AQCD rendah, ${skippedEmpty} kosong.`,
      savedCount > 0 ? "success" : "warning"
    );
  }

  function clearEfeRow(id, removeSaved = false) {
    const row = getEfeInputRows().find((entry) => getEfeRowMeta(entry).id === id);
    if (!row) return;
    const fields = getEfeRowFields(row);
    if (fields.sourceSelect) fields.sourceSelect.value = EFE_SOURCE_OPTIONS[0].values[0];
    if (fields.factorInput) fields.factorInput.value = "";
    if (fields.actionable) fields.actionable.checked = false;
    if (fields.quantitative) fields.quantitative.checked = false;
    if (fields.comparable) fields.comparable.checked = false;
    if (fields.divisional) fields.divisional.checked = false;

    if (removeSaved) {
      const items = getEfeItems().filter((item) => item.id !== id);
      setEfeItems(items);
      renderRegisteredEfeTables();
      setEfeSlotStatus(row, "Item dihapus dari tabel evaluasi.", "warning");
      showToast("Item EFE berhasil dihapus.", "success");
    } else {
      setEfeSlotStatus(row, "Baris dibersihkan. Simpan lagi jika perlu.", "default");
    }

    saveAllFields();
    updateDraftIndicators();
  }

  function editEfeRow(id) {
    const items = getEfeItems();
    const item = items.find((entry) => entry.id === id);
    const row = getEfeInputRows().find((entry) => getEfeRowMeta(entry).id === id);
    if (!item || !row) return;
    const fields = getEfeRowFields(row);
    if (fields.sourceSelect) fields.sourceSelect.value = item.source;
    if (fields.factorInput) fields.factorInput.value = item.factor;
    if (fields.actionable) fields.actionable.checked = !!item.aqcd?.actionable;
    if (fields.quantitative) fields.quantitative.checked = !!item.aqcd?.quantitative;
    if (fields.comparable) fields.comparable.checked = !!item.aqcd?.comparable;
    if (fields.divisional) fields.divisional.checked = !!item.aqcd?.divisional;
    saveAllFields();
    updateDraftIndicators();
    setEfeSlotStatus(row, "Mode edit aktif. Ubah nilai lalu klik Save.", "success");
    row.scrollIntoView({ behavior: "smooth", block: "center" });
    showToast(`Mode edit dibuka untuk ${item.type.toLowerCase()} ${item.slot}.`, "info");
  }

  function attachEfeInteractions() {
    if (!document.querySelector("[data-efe-input-body]")) return;

    createEfeInputRows();
    hydrateEfeRowsFromStore();
    renderRegisteredEfeTables();

    document.addEventListener("click", (event) => {
      const saveButton = event.target.closest("[data-efe-action='save-row']");
      if (saveButton) {
        saveEfeRow(saveButton.dataset.efeId);
        return;
      }

      const clearButton = event.target.closest("[data-efe-action='clear-row']");
      if (clearButton) {
        clearEfeRow(clearButton.dataset.efeId, false);
        return;
      }

      const saveBankButton = event.target.closest("[data-efe-action='save-bank']");
      if (saveBankButton) {
        saveEfeBank(saveBankButton.dataset.efeBank);
        return;
      }

      const autoWeightButton = event.target.closest("[data-efe-weight-mode='auto']");
      if (autoWeightButton) {
        applyAutoWeights();
        return;
      }

      const manualWeightButton = event.target.closest("[data-efe-weight-mode='manual']");
      if (manualWeightButton) {
        setManualWeightingMode();
        return;
      }

      const editButton = event.target.closest("[data-efe-table-action='edit']");
      if (editButton) {
        editEfeRow(editButton.dataset.efeId);
        return;
      }

      const deleteButton = event.target.closest("[data-efe-table-action='delete']");
      if (deleteButton) {
        clearEfeRow(deleteButton.dataset.efeId, true);
      }
    });

    document.addEventListener("change", (event) => {
      const field = event.target.closest("[data-efe-table-field]");
      if (!field) return;
      updateEfeEvaluationField(field.dataset.efeId, field.dataset.efeTableField, field.value);
    });
  }

  function getIfeInputRows() {
    return Array.from(document.querySelectorAll("[data-ife-input-body] tr[data-ife-row-id]"));
  }

  function getIfeRowMeta(row) {
    const bank = row.dataset.ifeBank || "strength";
    const slot = Number(row.dataset.ifeSlot || 0);
    return {
      bank,
      type: bank === "weakness" ? "Weakness" : "Strength",
      slot,
      id: `${bank}-${slot}`,
    };
  }

  function getIfeRowFields(row) {
    return {
      factorInput: row.querySelector("[data-ife-field='factor']"),
      sourceSelect: row.querySelector("[data-ife-field='source']"),
      actionable: row.querySelector("[data-ife-field='aqcd-a']"),
      quantitative: row.querySelector("[data-ife-field='aqcd-q']"),
      comparable: row.querySelector("[data-ife-field='aqcd-c']"),
      divisional: row.querySelector("[data-ife-field='aqcd-d']"),
      status: row.querySelector("[data-ife-row-status]"),
    };
  }

  function createIfeInputRows() {
    document.querySelectorAll("[data-ife-input-body]").forEach((tbody) => {
      if (tbody.children.length) return;

      const bank = tbody.dataset.ifeInputBody;
      const toneClass = bank === "weakness" ? "divide-warning/20" : "divide-success/20";
      tbody.classList.add(...toneClass.split(" "));

      for (let slot = 1; slot <= 20; slot += 1) {
        const row = document.createElement("tr");
        const id = `${bank}-${slot}`;
        row.dataset.ifeRowId = id;
        row.dataset.ifeBank = bank;
        row.dataset.ifeSlot = String(slot);
        row.className = slot % 2 === 0 ? "bg-navy-surface/40" : "bg-white/5";
        row.innerHTML = `
          <td class="px-3 py-3 font-mono text-soft-white">${slot}</td>
          <td class="px-3 py-3">
            <input
              type="text"
              data-ife-field="factor"
              placeholder="Input ${bank} factor ${slot}"
              class="w-full rounded-2xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white placeholder:text-cool-gray"
            />
          </td>
          <td class="px-3 py-3">
            <select
              data-ife-field="source"
              class="w-full rounded-2xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white"
            >
              ${buildIfeSourceOptions("Strategy")}
            </select>
          </td>
          <td class="px-3 py-3 text-center"><input data-ife-field="aqcd-a" type="checkbox" class="h-4 w-4 rounded border-border-blue bg-navy-deep text-info focus:ring-info" /></td>
          <td class="px-3 py-3 text-center"><input data-ife-field="aqcd-q" type="checkbox" class="h-4 w-4 rounded border-border-blue bg-navy-deep text-info focus:ring-info" /></td>
          <td class="px-3 py-3 text-center"><input data-ife-field="aqcd-c" type="checkbox" class="h-4 w-4 rounded border-border-blue bg-navy-deep text-info focus:ring-info" /></td>
          <td class="px-3 py-3 text-center"><input data-ife-field="aqcd-d" type="checkbox" class="h-4 w-4 rounded border-border-blue bg-navy-deep text-info focus:ring-info" /></td>
          <td class="px-3 py-3">
            <div class="flex min-w-[12rem] flex-col gap-2">
              <div class="flex gap-2">
                <button
                  type="button"
                  data-managed-action="true"
                  data-ife-action="save-row"
                  data-ife-id="${id}"
                  class="inline-flex flex-1 items-center justify-center rounded-xl border border-info/30 bg-info/10 px-3 py-2 text-xs font-medium text-soft-white transition hover:bg-info/20"
                >
                  Save
                </button>
                <button
                  type="button"
                  data-managed-action="true"
                  data-ife-action="clear-row"
                  data-ife-id="${id}"
                  class="inline-flex flex-1 items-center justify-center rounded-xl border border-border-blue bg-white/5 px-3 py-2 text-xs font-medium text-cool-gray transition hover:text-soft-white"
                >
                  Clear
                </button>
              </div>
              <p data-ife-row-status class="text-xs text-cool-gray">Belum terdaftar.</p>
            </div>
          </td>
        `;
        tbody.appendChild(row);
      }
    });
  }

  function getQualifiedIfeItems() {
    return getIfeItems()
      .map((item) => ({
        ...item,
        aqcdScore: getAqcdScore(item.aqcd || {}),
      }))
      .filter((item) => item.aqcdScore >= 2);
  }

  function getRankedIfeItems() {
    return ["strength", "weakness"].flatMap((bank) =>
      getQualifiedIfeItems()
        .filter((item) => item.type.toLowerCase() === bank)
        .sort((a, b) => b.aqcdScore - a.aqcdScore || a.slot - b.slot)
        .slice(0, 10)
    );
  }

  function updateIfePageSummary(items = getRankedIfeItems()) {
    const strengthItems = items.filter((item) => item.type === "Strength");
    const weaknessItems = items.filter((item) => item.type === "Weakness");
    const summary = {
      strength: strengthItems.length,
      weakness: weaknessItems.length,
      totalWeight: items.reduce((total, item) => total + Number(item.weight || 0), 0),
      weightedScore: items.reduce((total, item) => total + Number(item.weightedScore || 0), 0),
      strengthWeight: strengthItems.reduce((total, item) => total + Number(item.weight || 0), 0),
      strengthScore: strengthItems.reduce((total, item) => total + Number(item.weightedScore || 0), 0),
      weaknessWeight: weaknessItems.reduce((total, item) => total + Number(item.weight || 0), 0),
      weaknessScore: weaknessItems.reduce((total, item) => total + Number(item.weightedScore || 0), 0),
    };
    const settings = getIfeSettings();
    const balanced = Math.abs(summary.totalWeight - 1) < 0.001 || items.length === 0;

    const mappings = {
      "mode": settings.weightingMode === "auto" ? "Auto Pairwise" : "Manual",
      "strength-count": `${summary.strength}/10`,
      "weakness-count": `${summary.weakness}/10`,
      "weight-total": summary.totalWeight.toFixed(2),
      "weight-total-inline": summary.totalWeight.toFixed(2),
      "weighted-score-total": summary.weightedScore.toFixed(2),
      "weighted-score-total-inline": summary.weightedScore.toFixed(2),
      "strength-weight-total": summary.strengthWeight.toFixed(2),
      "strength-score-total": summary.strengthScore.toFixed(2),
      "weakness-weight-total": summary.weaknessWeight.toFixed(2),
      "weakness-score-total": summary.weaknessScore.toFixed(2),
      "grand-weight-total": summary.totalWeight.toFixed(2),
      "grand-score-total": summary.weightedScore.toFixed(2),
    };

    Object.entries(mappings).forEach(([key, value]) => {
      const node = document.querySelector(`[data-ife-summary='${key}']`);
      if (node) node.textContent = value;
    });

    const weightStatus = balanced
      ? "Total bobot sudah seimbang pada 1.00."
      : "Total bobot seluruh Strength + Weakness harus tepat 1.00.";
    const statusNode = document.querySelector("[data-ife-summary='weight-status']");
    const statusInlineNode = document.querySelector("[data-ife-summary='weight-status-inline']");
    const grandStatusNode = document.querySelector("[data-ife-summary='grand-status']");
    if (statusNode) {
      statusNode.textContent = weightStatus;
      statusNode.className = balanced ? "text-sm text-emerald-200" : "text-sm text-amber-200";
    }
    if (statusInlineNode) {
      statusInlineNode.textContent = weightStatus;
      statusInlineNode.className = balanced ? "mt-3 text-sm text-emerald-200" : "mt-3 text-sm text-amber-200";
    }
    if (grandStatusNode) {
      grandStatusNode.textContent = balanced ? "Balanced at 1.00" : "Weight total must equal 1.00";
      grandStatusNode.className = balanced ? "px-3 py-4 text-xs text-emerald-200" : "px-3 py-4 text-xs text-amber-200";
    }

    const analysisNode = document.querySelector("[data-ife-summary='analysis']");
    if (analysisNode) {
      if (!items.length) {
        analysisNode.textContent =
          "Belum ada faktor yang masuk ke Tabel Key Internal Factor. Simpan faktor brainstorming yang lolos AQCD terlebih dahulu.";
      } else if (!balanced) {
        analysisNode.textContent =
          "Analisis belum final karena total bobot belum sama dengan 1.00. Samakan dulu total bobot Strength dan Weakness, lalu baca total weighted score.";
      } else if (summary.weightedScore > 2.5) {
        analysisNode.textContent =
          `Total IFE ${summary.weightedScore.toFixed(2)} menunjukkan posisi internal perusahaan kuat. Kekuatan utama relatif lebih dominan dibanding kelemahan yang ada.`;
      } else if (summary.weightedScore < 2.5) {
        analysisNode.textContent =
          `Total IFE ${summary.weightedScore.toFixed(2)} menunjukkan posisi internal perusahaan lemah. Kelemahan masih cukup dominan dan perlu diperbaiki sebelum strategi agresif dijalankan.`;
      } else {
        analysisNode.textContent =
          `Total IFE ${summary.weightedScore.toFixed(2)} menunjukkan posisi internal perusahaan berada di titik rata-rata. Ada modal kekuatan, tetapi belum cukup konsisten untuk menjadi keunggulan internal yang kokoh.`;
      }
    }
  }

  function setIfeSlotStatus(row, message, tone = "default") {
    const status = row.querySelector("[data-ife-row-status]");
    if (!status) return;
    const tones = {
      default: "text-cool-gray",
      success: "text-emerald-200",
      warning: "text-amber-200",
    };
    status.className = `text-xs ${tones[tone] || tones.default}`;
    status.textContent = message;
  }

  function hydrateIfeRowsFromStore() {
    const items = getIfeItems();
    const rankedIds = new Set(getRankedIfeItems().map((item) => item.id));
    getIfeInputRows().forEach((row) => {
      const meta = getIfeRowMeta(row);
      const item = items.find((entry) => entry.id === meta.id);
      const fields = getIfeRowFields(row);

      if (item) {
        if (fields.sourceSelect) fields.sourceSelect.value = item.source;
        if (fields.factorInput) fields.factorInput.value = item.factor;
        if (fields.actionable) fields.actionable.checked = !!item.aqcd?.actionable;
        if (fields.quantitative) fields.quantitative.checked = !!item.aqcd?.quantitative;
        if (fields.comparable) fields.comparable.checked = !!item.aqcd?.comparable;
        if (fields.divisional) fields.divisional.checked = !!item.aqcd?.divisional;
        if (rankedIds.has(item.id)) {
          setIfeSlotStatus(row, "Lolos AQCD dan masuk tabel IFE.", "success");
        } else if (getAqcdScore(item.aqcd || {}) >= 2) {
          setIfeSlotStatus(row, "Lolos AQCD, tetapi belum masuk top 10.", "warning");
        } else {
          setIfeSlotStatus(row, "Belum terdaftar.", "default");
        }
      } else {
        setIfeSlotStatus(row, "Belum terdaftar.", "default");
      }
    });
  }

  function getAllowedIfeRatings(type) {
    return type === "Weakness" ? ["1", "2"] : ["3", "4"];
  }

  function buildIfeRatingOptions(type, selected) {
    const allowed = getAllowedIfeRatings(type);
    const options = allowed
      .map((value) => `<option value="${value}"${selected === value ? " selected" : ""}>${value}</option>`)
      .join("");
    return `<option value=""${selected ? "" : " selected"}>Select</option>${options}`;
  }

  function applyAutoIfeWeights() {
    setIfeSettings({ weightingMode: "auto" });
    const items = getIfeItems().map((item) => ({ ...item }));
    const rankedItems = getRankedIfeItems();

    if (!rankedItems.length) {
      updateIfePageSummary([]);
      showToast("Belum ada faktor IFE yang lolos AQCD untuk dihitung bobotnya.", "warning");
      return;
    }

    if (rankedItems.length === 1) {
      const onlyId = rankedItems[0].id;
      const nextItems = items.map((item) =>
        item.id === onlyId
          ? { ...item, weight: "1.00", weightedScore: calculateWeightedScore("1.00", item.rating) }
          : item
      );
      setIfeItems(nextItems);
      renderRegisteredIfeTables();
      showToast("Auto pairwise diterapkan untuk 1 faktor IFE aktif.", "success");
      return;
    }

    const weightsById = {};
    let totalPairwise = 0;
    rankedItems.forEach((leftItem, leftIndex) => {
      let wins = 0;
      rankedItems.forEach((rightItem, rightIndex) => {
        if (leftIndex === rightIndex || leftIndex > rightIndex) return;
        const leftScore = leftItem.aqcdScore;
        const rightScore = rightItem.aqcdScore;
        if (leftScore > rightScore) {
          wins += 1;
        } else if (leftScore < rightScore) {
          weightsById[rightItem.id] = (weightsById[rightItem.id] || 0) + 1;
        } else {
          wins += 0.5;
          weightsById[rightItem.id] = (weightsById[rightItem.id] || 0) + 0.5;
        }
        totalPairwise += 1;
      });
      weightsById[leftItem.id] = (weightsById[leftItem.id] || 0) + wins;
    });

    const rankedIds = new Set(rankedItems.map((item) => item.id));
    const formattedWeightsById = {};
    let assignedWeight = 0;
    rankedItems.forEach((item, index) => {
      if (totalPairwise <= 0) {
        formattedWeightsById[item.id] = "0.00";
        return;
      }
      if (index === rankedItems.length - 1) {
        formattedWeightsById[item.id] = Math.max(0, 1 - assignedWeight).toFixed(2);
        return;
      }
      const weight = ((weightsById[item.id] || 0) / totalPairwise).toFixed(2);
      formattedWeightsById[item.id] = weight;
      assignedWeight += Number.parseFloat(weight);
    });

    const nextItems = items.map((item) => {
      if (!rankedIds.has(item.id)) return item;
      const weight = formattedWeightsById[item.id] || "0.00";
      return { ...item, weight, weightedScore: calculateWeightedScore(weight, item.rating) };
    });

    setIfeItems(nextItems);
    renderRegisteredIfeTables();
    showToast("Auto Weight Pairwise IFE berhasil diterapkan.", "success");
  }

  function setManualIfeWeightingMode() {
    setIfeSettings({ weightingMode: "manual" });
    renderRegisteredIfeTables();
    showToast("Mode bobot manual IFE aktif. Pastikan total bobot = 1.00.", "info");
  }

  function renderRegisteredIfeTables() {
    const items = getRankedIfeItems();
    const settings = getIfeSettings();
    const isManual = settings.weightingMode !== "auto";

    ["strength", "weakness"].forEach((bank) => {
      const tbody = document.querySelector(`[data-ife-registered-body="${bank}"]`);
      if (!tbody) return;
      const filtered = items.filter((item) => item.type.toLowerCase() === bank).sort((a, b) => b.aqcdScore - a.aqcdScore || a.slot - b.slot);
      if (!filtered.length) {
        tbody.innerHTML = `
          <tr class="bg-white/5">
            <td colspan="8" class="px-3 py-4 text-sm text-cool-gray">Belum ada ${bank} yang lolos AQCD dan terdaftar.</td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = filtered
        .map((item, index) => {
          const score = item.aqcdScore;
          const quality = getAqcdQuality(score);
          const rowTone = index % 2 === 0 ? "bg-white/5" : "bg-navy-surface/40";
          const qualityTone = quality === "High" ? "border-success/30 bg-success/10 text-success" : "border-warning/30 bg-warning/10 text-warning";
          const weightValue = item.weight || "";
          const weightedScore = calculateWeightedScore(weightValue, item.rating);
          const validationText =
            item.type === "Strength"
              ? "Strength rating hanya boleh 3-4"
              : "Weakness rating hanya boleh 1-2";
          return `
            <tr class="${rowTone}">
              <td class="px-3 py-3 text-soft-white">${item.factor}</td>
              <td class="px-3 py-3 text-cool-gray">${item.source}</td>
              <td class="px-3 py-3 font-mono text-soft-white">${score}/4</td>
              <td class="px-3 py-3"><span class="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.16em] ${qualityTone}">${quality}</span></td>
              <td class="px-3 py-3">
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  ${isManual ? "" : "disabled"}
                  value="${weightValue}"
                  data-managed-action="true"
                  data-ife-table-field="weight"
                  data-ife-id="${item.id}"
                  class="w-24 rounded-xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white disabled:cursor-not-allowed disabled:opacity-60"
                />
              </td>
              <td class="px-3 py-3">
                <select
                  data-managed-action="true"
                  data-ife-table-field="rating"
                  data-ife-id="${item.id}"
                  class="w-24 rounded-xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white"
                >
                  ${buildIfeRatingOptions(item.type, item.rating)}
                </select>
              </td>
              <td class="px-3 py-3 font-mono text-soft-white">${weightedScore || "-"}</td>
              <td class="px-3 py-3">
                <div class="flex flex-wrap gap-2">
                  <button type="button" data-managed-action="true" data-ife-table-action="edit" data-ife-id="${item.id}" class="inline-flex items-center justify-center rounded-xl border border-info/30 bg-info/10 px-3 py-2 text-xs font-medium text-soft-white transition hover:bg-info/20">Edit</button>
                  <button type="button" data-managed-action="true" data-ife-table-action="delete" data-ife-id="${item.id}" class="inline-flex items-center justify-center rounded-xl border border-warning/30 bg-warning/10 px-3 py-2 text-xs font-medium text-soft-white transition hover:bg-warning/20">Delete</button>
                </div>
                <p class="mt-2 text-[11px] text-cool-gray">${validationText}</p>
              </td>
            </tr>
          `;
        })
        .join("");
    });

    updateIfePageSummary(items);
    hydrateIfeRowsFromStore();
  }

  function updateIfeEvaluationField(id, field, value) {
    const items = getIfeItems();
    const item = items.find((entry) => entry.id === id);
    if (!item) return;

    if (field === "rating") {
      const allowed = getAllowedIfeRatings(item.type);
      if (value && !allowed.includes(value)) {
        showToast(item.type === "Strength" ? "Strength hanya boleh memakai rating 3 atau 4." : "Weakness hanya boleh memakai rating 1 atau 2.", "warning");
        renderRegisteredIfeTables();
        return;
      }
    }

    const nextItems = items.map((entry) => {
      if (entry.id !== id) return entry;
      const nextValue = field === "weight" ? normalizeWeightValue(value) : value;
      const nextItem = { ...entry, [field]: nextValue };
      nextItem.weightedScore = calculateWeightedScore(nextItem.weight, nextItem.rating);
      return nextItem;
    });
    setIfeItems(nextItems);
    renderRegisteredIfeTables();
  }

  function saveIfeRow(id, options = {}) {
    const { silent = false } = options;
    const row = getIfeInputRows().find((entry) => getIfeRowMeta(entry).id === id);
    if (!row) return;
    const { type, slot } = getIfeRowMeta(row);
    const fields = getIfeRowFields(row);
    const factor = fields.factorInput?.value?.trim() || "";
    if (!factor) {
      setIfeSlotStatus(row, "Factor wajib diisi sebelum disimpan.", "warning");
      if (!silent) showToast("Factor IFE belum diisi.", "warning");
      return;
    }

    const aqcd = {
      actionable: !!fields.actionable?.checked,
      quantitative: !!fields.quantitative?.checked,
      comparable: !!fields.comparable?.checked,
      divisional: !!fields.divisional?.checked,
    };
    const aqcdScore = getAqcdScore(aqcd);
    if (aqcdScore < 2) {
      setIfeSlotStatus(row, "AQCD masih rendah. Minimal 2 checklist untuk register.", "warning");
      if (!silent) showToast("AQCD terlalu rendah. Faktor belum bisa diregister.", "warning");
      return;
    }

    const source = fields.sourceSelect?.value || "Strategy";
    const items = getIfeItems().filter((item) => item.id !== id);
    const existing = getIfeItems().find((item) => item.id === id);
    items.push({
      id,
      type,
      slot,
      source,
      factor,
      aqcd,
      weight: existing?.weight || "",
      rating: existing?.rating || "",
      weightedScore: existing?.weightedScore || "",
    });
    setIfeItems(items);
    saveAllFields();
    updateDraftIndicators();
    renderRegisteredIfeTables();
    const rankedIds = new Set(getRankedIfeItems().map((item) => item.id));
    setIfeSlotStatus(row, rankedIds.has(id) ? "Lolos AQCD dan masuk tabel IFE." : "Lolos AQCD, tetapi belum masuk top 10.", rankedIds.has(id) ? "success" : "warning");
    if (!silent) showToast(`${type} ${slot} berhasil disimpan dengan AQCD ${aqcdScore}/4.`, "success");
  }

  function saveIfeBank(bank) {
    const rows = getIfeInputRows().filter((row) => getIfeRowMeta(row).bank === bank);
    let savedCount = 0;
    let skippedEmpty = 0;
    let skippedLowAqcd = 0;
    rows.forEach((row) => {
      const meta = getIfeRowMeta(row);
      const fields = getIfeRowFields(row);
      const factor = fields.factorInput?.value?.trim() || "";
      if (!factor) {
        skippedEmpty += 1;
        return;
      }
      const aqcd = {
        actionable: !!fields.actionable?.checked,
        quantitative: !!fields.quantitative?.checked,
        comparable: !!fields.comparable?.checked,
        divisional: !!fields.divisional?.checked,
      };
      if (getAqcdScore(aqcd) < 2) {
        setIfeSlotStatus(row, "AQCD masih rendah. Minimal 2 checklist untuk register.", "warning");
        skippedLowAqcd += 1;
        return;
      }
      saveIfeRow(meta.id, { silent: true });
      savedCount += 1;
    });
    const bankLabel = bank === "weakness" ? "Weakness" : "Strength";
    showToast(`${bankLabel}: ${savedCount} tersimpan, ${skippedLowAqcd} AQCD rendah, ${skippedEmpty} kosong.`, savedCount > 0 ? "success" : "warning");
  }

  function clearIfeRow(id, removeSaved = false) {
    const row = getIfeInputRows().find((entry) => getIfeRowMeta(entry).id === id);
    if (!row) return;
    const fields = getIfeRowFields(row);
    if (fields.sourceSelect) fields.sourceSelect.value = IFE_SOURCE_OPTIONS[0].values[0];
    if (fields.factorInput) fields.factorInput.value = "";
    if (fields.actionable) fields.actionable.checked = false;
    if (fields.quantitative) fields.quantitative.checked = false;
    if (fields.comparable) fields.comparable.checked = false;
    if (fields.divisional) fields.divisional.checked = false;
    if (removeSaved) {
      setIfeItems(getIfeItems().filter((item) => item.id !== id));
      renderRegisteredIfeTables();
      setIfeSlotStatus(row, "Item dihapus dari tabel evaluasi.", "warning");
      showToast("Item IFE berhasil dihapus.", "success");
    } else {
      setIfeSlotStatus(row, "Baris dibersihkan. Simpan lagi jika perlu.", "default");
    }
    saveAllFields();
    updateDraftIndicators();
  }

  function editIfeRow(id) {
    const items = getIfeItems();
    const item = items.find((entry) => entry.id === id);
    const row = getIfeInputRows().find((entry) => getIfeRowMeta(entry).id === id);
    if (!item || !row) return;
    const fields = getIfeRowFields(row);
    if (fields.sourceSelect) fields.sourceSelect.value = item.source;
    if (fields.factorInput) fields.factorInput.value = item.factor;
    if (fields.actionable) fields.actionable.checked = !!item.aqcd?.actionable;
    if (fields.quantitative) fields.quantitative.checked = !!item.aqcd?.quantitative;
    if (fields.comparable) fields.comparable.checked = !!item.aqcd?.comparable;
    if (fields.divisional) fields.divisional.checked = !!item.aqcd?.divisional;
    saveAllFields();
    updateDraftIndicators();
    setIfeSlotStatus(row, "Mode edit aktif. Ubah nilai lalu klik Save.", "success");
    row.scrollIntoView({ behavior: "smooth", block: "center" });
    showToast(`Mode edit dibuka untuk ${item.type.toLowerCase()} ${item.slot}.`, "info");
  }

  function attachIfeInteractions() {
    if (!document.querySelector("[data-ife-input-body]")) return;

    createIfeInputRows();
    hydrateIfeRowsFromStore();
    renderRegisteredIfeTables();

    document.addEventListener("click", (event) => {
      const saveButton = event.target.closest("[data-ife-action='save-row']");
      if (saveButton) {
        saveIfeRow(saveButton.dataset.ifeId);
        return;
      }
      const clearButton = event.target.closest("[data-ife-action='clear-row']");
      if (clearButton) {
        clearIfeRow(clearButton.dataset.ifeId, false);
        return;
      }
      const saveBankButton = event.target.closest("[data-ife-action='save-bank']");
      if (saveBankButton) {
        saveIfeBank(saveBankButton.dataset.ifeBank);
        return;
      }
      const autoWeightButton = event.target.closest("[data-ife-weight-mode='auto']");
      if (autoWeightButton) {
        applyAutoIfeWeights();
        return;
      }
      const manualWeightButton = event.target.closest("[data-ife-weight-mode='manual']");
      if (manualWeightButton) {
        setManualIfeWeightingMode();
        return;
      }
      const editButton = event.target.closest("[data-ife-table-action='edit']");
      if (editButton) {
        editIfeRow(editButton.dataset.ifeId);
        return;
      }
      const deleteButton = event.target.closest("[data-ife-table-action='delete']");
      if (deleteButton) {
        clearIfeRow(deleteButton.dataset.ifeId, true);
      }
    });

    document.addEventListener("change", (event) => {
      const field = event.target.closest("[data-ife-table-field]");
      if (!field) return;
      updateIfeEvaluationField(field.dataset.ifeId, field.dataset.ifeTableField, field.value);
    });
  }

  function getCpmInputRows() {
    return Array.from(document.querySelectorAll("[data-cpm-input-body] tr[data-cpm-row-id]"));
  }

  function getCpmRowMeta(row) {
    const slot = Number(row.dataset.cpmSlot || 0);
    return {
      slot,
      id: `csf-${slot}`,
    };
  }

  function getCpmRowFields(row) {
    return {
      csfInput: row.querySelector("[data-cpm-field='csf']"),
      noteInput: row.querySelector("[data-cpm-field='note']"),
      prioritySelect: row.querySelector("[data-cpm-field='priority']"),
      status: row.querySelector("[data-cpm-row-status]"),
    };
  }

  function getSelectedCpmCategories(excludedRowId = "") {
    return getCpmInputRows()
      .filter((row) => row.dataset.cpmRowId !== excludedRowId)
      .map((row) => getCpmRowFields(row).csfInput?.value?.trim() || "")
      .filter(Boolean);
  }

  function refreshCpmCategoryOptions() {
    const categoryOwners = new Map();
    getCpmInputRows().forEach((row) => {
      const value = getCpmRowFields(row).csfInput?.value?.trim() || "";
      if (!value || categoryOwners.has(value)) return;
      categoryOwners.set(value, getCpmRowMeta(row).slot);
    });

    getCpmInputRows().forEach((row) => {
      const fields = getCpmRowFields(row);
      if (!fields.csfInput) return;
      const currentValue = fields.csfInput.value || "";
      const disabledValues = getSelectedCpmCategories(row.dataset.cpmRowId || "");
      fields.csfInput.innerHTML = `
        <option value="">Pilih kategori CSF</option>
        ${buildCpmCsfOptions(currentValue, disabledValues)}
      `;
      fields.csfInput.value = currentValue;

      const hint = row.querySelector("[data-cpm-category-hint]");
      if (!hint) return;
      if (!currentValue) {
        hint.className = "mt-2 text-xs text-cool-gray";
        hint.textContent = "Pilih satu kategori unik. Kategori yang sudah dipakai akan terkunci di baris lain.";
        return;
      }
      const ownerSlot = categoryOwners.get(currentValue);
      const currentSlot = getCpmRowMeta(row).slot;
      if (ownerSlot === currentSlot) {
        hint.className = "mt-2 text-xs text-emerald-200";
        hint.textContent = `Kategori aktif untuk baris ${currentSlot}. Kategori ini tidak tersedia di baris lain.`;
        return;
      }
      hint.className = "mt-2 text-xs text-amber-200";
      hint.textContent = `Kategori ini sudah dipakai di baris ${ownerSlot}. Pilih kategori lain.`;
    });
  }

  function createCpmInputRows() {
    const tbody = document.querySelector("[data-cpm-input-body]");
    if (!tbody || tbody.children.length) return;

    for (let slot = 1; slot <= 10; slot += 1) {
      const row = document.createElement("tr");
      row.dataset.cpmRowId = `csf-${slot}`;
      row.dataset.cpmSlot = String(slot);
      row.className = slot % 2 === 0 ? "bg-navy-surface/40" : "bg-white/5";
      row.innerHTML = `
        <td class="px-3 py-3 font-mono text-soft-white">${slot}</td>
        <td class="px-3 py-3">
          <select
            data-cpm-field="csf"
            class="w-full rounded-2xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white placeholder:text-cool-gray"
          >
            <option value="">Pilih kategori CSF</option>
            ${buildCpmCsfOptions("")}
          </select>
          <p data-cpm-category-hint class="mt-2 text-xs text-cool-gray">
            Pilih satu kategori unik. Kategori yang sudah dipakai akan terkunci di baris lain.
          </p>
        </td>
        <td class="px-3 py-3">
          <textarea
            data-cpm-field="note"
            placeholder="Industry rationale / benchmark note"
            class="min-h-24 w-full rounded-2xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white placeholder:text-cool-gray"
          ></textarea>
        </td>
        <td class="px-3 py-3">
          <select
            data-cpm-field="priority"
            class="w-full rounded-2xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white"
          >
            <option value="1">1 - Low</option>
            <option value="2">2</option>
            <option value="3" selected>3 - Medium</option>
            <option value="4">4</option>
            <option value="5">5 - High</option>
          </select>
        </td>
        <td class="px-3 py-3">
          <div class="flex min-w-[12rem] flex-col gap-2">
            <div class="flex gap-2">
              <button
                type="button"
                data-managed-action="true"
                data-cpm-action="save-row"
                data-cpm-id="csf-${slot}"
                class="inline-flex flex-1 items-center justify-center rounded-xl border border-info/30 bg-info/10 px-3 py-2 text-xs font-medium text-soft-white transition hover:bg-info/20"
              >
                Save
              </button>
              <button
                type="button"
                data-managed-action="true"
                data-cpm-action="clear-row"
                data-cpm-id="csf-${slot}"
                class="inline-flex flex-1 items-center justify-center rounded-xl border border-border-blue bg-white/5 px-3 py-2 text-xs font-medium text-cool-gray transition hover:text-soft-white"
              >
                Clear
              </button>
            </div>
            <p data-cpm-row-status class="text-xs text-cool-gray">Belum terdaftar.</p>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    }
    refreshCpmCategoryOptions();
  }

  function setCpmRowStatus(row, message, tone = "default") {
    const status = row.querySelector("[data-cpm-row-status]");
    if (!status) return;
    const tones = {
      default: "text-cool-gray",
      success: "text-emerald-200",
      warning: "text-amber-200",
    };
    status.className = `text-xs ${tones[tone] || tones.default}`;
    status.textContent = message;
  }

  function hydrateCpmRowsFromStore() {
    const items = getCpmItems();
    getCpmInputRows().forEach((row) => {
      const meta = getCpmRowMeta(row);
      const item = items.find((entry) => entry.id === meta.id);
      const fields = getCpmRowFields(row);
      if (item) {
        if (fields.csfInput) fields.csfInput.value = item.csf;
        if (fields.noteInput) fields.noteInput.value = item.note || "";
        if (fields.prioritySelect) fields.prioritySelect.value = item.priority || "3";
        setCpmRowStatus(row, "CSF sudah masuk ke tabel CPM.", "success");
      } else {
        setCpmRowStatus(row, "Belum terdaftar.", "default");
      }
    });
    refreshCpmCategoryOptions();
  }

  function ensureCpmSettingsInDom() {
    const phase0CompanyName = getPhase0CompanyName();
    if (phase0CompanyName) {
      setCpmSettings({ companyName: phase0CompanyName });
    }
    const settings = getCpmSettings();
    document.querySelectorAll("[data-cpm-setting]").forEach((field) => {
      const key = field.dataset.cpmSetting;
      if (!key) return;
      if (field.value !== settings[key]) {
        field.value = settings[key] || "";
      }
    });
    document.querySelectorAll("[data-cpm-company-label]").forEach((node) => {
      const key = node.dataset.cpmCompanyLabel;
      if (!key) return;
      node.textContent = settings[key] || "";
    });
  }

  function updateCpmCompanyLabels() {
    const settings = getCpmSettings();
    document.querySelectorAll("[data-cpm-company-label]").forEach((node) => {
      const key = node.dataset.cpmCompanyLabel;
      if (!key) return;
      node.textContent = settings[key] || "";
    });
  }

  function saveCpmRow(id, options = {}) {
    const { silent = false } = options;
    const row = getCpmInputRows().find((entry) => getCpmRowMeta(entry).id === id);
    if (!row) return;
    const { slot } = getCpmRowMeta(row);
    const fields = getCpmRowFields(row);
    const csf = fields.csfInput?.value?.trim() || "";
    if (!csf) {
      setCpmRowStatus(row, "CSF wajib diisi sebelum disimpan.", "warning");
      if (!silent) showToast("CSF CPM belum diisi.", "warning");
      return;
    }
    const duplicateRow = getCpmInputRows().find((entry) => {
      if (entry.dataset.cpmRowId === row.dataset.cpmRowId) return false;
      const otherValue = getCpmRowFields(entry).csfInput?.value?.trim() || "";
      return otherValue === csf;
    });
    if (duplicateRow) {
      const duplicateSlot = getCpmRowMeta(duplicateRow).slot;
      setCpmRowStatus(row, `Kategori ini sudah dipakai di baris ${duplicateSlot}.`, "warning");
      if (!silent) showToast(`Kategori CSF "${csf}" sudah dipakai di baris ${duplicateSlot}.`, "warning");
      refreshCpmCategoryOptions();
      return;
    }
    const items = getCpmItems().filter((item) => item.id !== id);
    const existing = getCpmItems().find((item) => item.id === id);
    items.push({
      id,
      slot,
      csf,
      note: fields.noteInput?.value?.trim() || "",
      priority: fields.prioritySelect?.value || "3",
      weight: existing?.weight || "",
      ratings: existing?.ratings || {
        company: "",
        competitor1: "",
        competitor2: "",
        competitor3: "",
      },
      comments: existing?.comments || {
        company: "",
        competitor1: "",
        competitor2: "",
        competitor3: "",
      },
    });
    setCpmItems(items.sort((a, b) => a.slot - b.slot));
    setCpmRowStatus(row, "CSF sudah masuk ke tabel CPM.", "success");
    renderCpmMatrix();
    saveAllFields();
    updateDraftIndicators();
    refreshCpmCategoryOptions();
    if (!silent) showToast(`CSF ${slot} berhasil disimpan.`, "success");
  }

  function saveAllCpmRows() {
    let savedCount = 0;
    let skippedEmpty = 0;
    let duplicateCount = 0;
    getCpmInputRows().forEach((row) => {
      const meta = getCpmRowMeta(row);
      const fields = getCpmRowFields(row);
      const csf = fields.csfInput?.value?.trim() || "";
      if (!csf) {
        skippedEmpty += 1;
        return;
      }
      const duplicateRow = getCpmInputRows().find((entry) => {
        if (entry.dataset.cpmRowId === row.dataset.cpmRowId) return false;
        const otherValue = getCpmRowFields(entry).csfInput?.value?.trim() || "";
        return otherValue === csf;
      });
      if (duplicateRow) {
        duplicateCount += 1;
        const duplicateSlot = getCpmRowMeta(duplicateRow).slot;
        setCpmRowStatus(row, `Kategori ini sama dengan baris ${duplicateSlot}.`, "warning");
        return;
      }
      saveCpmRow(meta.id, { silent: true });
      savedCount += 1;
    });
    refreshCpmCategoryOptions();
    const tone = savedCount > 0 ? "success" : "warning";
    showToast(`CSF: ${savedCount} tersimpan, ${skippedEmpty} kosong, ${duplicateCount} duplikat.`, tone);
  }

  function clearCpmRow(id, removeSaved = false) {
    const row = getCpmInputRows().find((entry) => getCpmRowMeta(entry).id === id);
    if (!row) return;
    const fields = getCpmRowFields(row);
    if (fields.csfInput) fields.csfInput.value = "";
    if (fields.noteInput) fields.noteInput.value = "";
    if (fields.prioritySelect) fields.prioritySelect.value = "3";
    if (removeSaved) {
      setCpmItems(getCpmItems().filter((item) => item.id !== id));
      renderCpmMatrix();
      setCpmRowStatus(row, "CSF dihapus dari tabel CPM.", "warning");
      showToast("CSF CPM berhasil dihapus.", "success");
    } else {
      setCpmRowStatus(row, "Baris dibersihkan. Simpan lagi jika perlu.", "default");
    }
    saveAllFields();
    updateDraftIndicators();
    refreshCpmCategoryOptions();
  }

  function editCpmRow(id) {
    const items = getCpmItems();
    const item = items.find((entry) => entry.id === id);
    const row = getCpmInputRows().find((entry) => getCpmRowMeta(entry).id === id);
    if (!item || !row) return;
    const fields = getCpmRowFields(row);
    if (fields.csfInput) fields.csfInput.value = item.csf;
    if (fields.noteInput) fields.noteInput.value = item.note || "";
    if (fields.prioritySelect) fields.prioritySelect.value = item.priority || "3";
    setCpmRowStatus(row, "Mode edit aktif. Ubah nilai lalu klik Save.", "success");
    refreshCpmCategoryOptions();
    row.scrollIntoView({ behavior: "smooth", block: "center" });
    showToast(`Mode edit dibuka untuk CSF ${item.slot}.`, "info");
  }

  function calculateCpmValue(weight, rating) {
    const weightNumber = Number.parseFloat(weight);
    const ratingNumber = Number.parseFloat(rating);
    if (Number.isNaN(weightNumber) || Number.isNaN(ratingNumber)) return "";
    return (weightNumber * ratingNumber).toFixed(2);
  }

  function applyAutoCpmWeights() {
    setCpmSettings({ weightingMode: "auto" });
    const items = getCpmItems().map((item) => ({ ...item }));
    if (!items.length) {
      updateCpmSummary([]);
      showToast("Belum ada CSF yang tersimpan untuk dihitung bobotnya.", "warning");
      return;
    }
    if (items.length === 1) {
      const nextItems = items.map((item) => ({ ...item, weight: "1.00" }));
      setCpmItems(nextItems);
      renderCpmMatrix();
      showToast("Auto pairwise diterapkan untuk 1 CSF aktif.", "success");
      return;
    }

    const weightsById = {};
    let totalPairwise = 0;
    items.forEach((leftItem, leftIndex) => {
      let wins = 0;
      items.forEach((rightItem, rightIndex) => {
        if (leftIndex === rightIndex || leftIndex > rightIndex) return;
        const leftScore = Number.parseFloat(leftItem.priority || "3");
        const rightScore = Number.parseFloat(rightItem.priority || "3");
        if (leftScore > rightScore) {
          wins += 1;
        } else if (leftScore < rightScore) {
          weightsById[rightItem.id] = (weightsById[rightItem.id] || 0) + 1;
        } else {
          wins += 0.5;
          weightsById[rightItem.id] = (weightsById[rightItem.id] || 0) + 0.5;
        }
        totalPairwise += 1;
      });
      weightsById[leftItem.id] = (weightsById[leftItem.id] || 0) + wins;
    });

    let assignedWeight = 0;
    const formattedWeightsById = {};
    items
      .slice()
      .sort((a, b) => a.slot - b.slot)
      .forEach((item, index, list) => {
        if (totalPairwise <= 0) {
          formattedWeightsById[item.id] = "0.00";
          return;
        }
        if (index === list.length - 1) {
          formattedWeightsById[item.id] = Math.max(0, 1 - assignedWeight).toFixed(2);
          return;
        }
        const weight = ((weightsById[item.id] || 0) / totalPairwise).toFixed(2);
        formattedWeightsById[item.id] = weight;
        assignedWeight += Number.parseFloat(weight);
      });

    const nextItems = items.map((item) => ({
      ...item,
      weight: formattedWeightsById[item.id] || "0.00",
    }));
    setCpmItems(nextItems);
    renderCpmMatrix();
    showToast("Auto Weight Pairwise CPM berhasil diterapkan.", "success");
  }

  function setManualCpmWeightingMode() {
    setCpmSettings({ weightingMode: "manual" });
    renderCpmMatrix();
    showToast("Mode bobot manual CPM aktif. Pastikan total bobot = 1.00.", "info");
  }

  function updateCpmSettingsFromDom() {
    const phase0CompanyName = getPhase0CompanyName();
    const nextSettings = {};
    document.querySelectorAll("[data-cpm-setting]").forEach((field) => {
      const key = field.dataset.cpmSetting;
      if (!key) return;
      nextSettings[key] = field.value.trim() || getCpmSettings()[key];
    });
    if (phase0CompanyName) {
      nextSettings.companyName = phase0CompanyName;
    }
    setCpmSettings(nextSettings);
    updateCpmCompanyLabels();
  }

  function getCpmTotals(items) {
    const entityKeys = ["company", "competitor1", "competitor2", "competitor3"];
    const totals = {
      weight: items.reduce((sum, item) => sum + Number(item.weight || 0), 0),
      company: 0,
      competitor1: 0,
      competitor2: 0,
      competitor3: 0,
    };
    items.forEach((item) => {
      entityKeys.forEach((key) => {
        totals[key] += Number(calculateCpmValue(item.weight, item.ratings?.[key]) || 0);
      });
    });
    return totals;
  }

  function updateCpmSummary(items = getCpmItems().sort((a, b) => a.slot - b.slot)) {
    const totals = getCpmTotals(items);
    const balanced = Math.abs(totals.weight - 1) < 0.001 || items.length === 0;
    const settings = getCpmSettings();
    const nodes = {
      "weight-total": totals.weight.toFixed(2),
      "weight-total-inline": totals.weight.toFixed(2),
      "company-total": totals.company.toFixed(2),
      "competitor1-total": totals.competitor1.toFixed(2),
      "competitor2-total": totals.competitor2.toFixed(2),
      "competitor3-total": totals.competitor3.toFixed(2),
      "mode": settings.weightingMode === "auto" ? "Auto Pairwise" : "Manual",
      "company-name": settings.companyName,
      "competitor1-name": settings.competitor1Name,
      "competitor2-name": settings.competitor2Name,
      "competitor3-name": settings.competitor3Name,
    };
    Object.entries(nodes).forEach(([key, value]) => {
      document.querySelectorAll(`[data-cpm-summary='${key}']`).forEach((node) => {
        node.textContent = value;
      });
    });

    const grandWeightNode = document.querySelector("[data-cpm-summary='grand-weight-total']");
    if (grandWeightNode) grandWeightNode.textContent = totals.weight.toFixed(2);
    const grandCompanyNode = document.querySelector("[data-cpm-summary='grand-company-total']");
    if (grandCompanyNode) grandCompanyNode.textContent = totals.company.toFixed(2);
    const grandComp1Node = document.querySelector("[data-cpm-summary='grand-competitor1-total']");
    if (grandComp1Node) grandComp1Node.textContent = totals.competitor1.toFixed(2);
    const grandComp2Node = document.querySelector("[data-cpm-summary='grand-competitor2-total']");
    if (grandComp2Node) grandComp2Node.textContent = totals.competitor2.toFixed(2);
    const grandComp3Node = document.querySelector("[data-cpm-summary='grand-competitor3-total']");
    if (grandComp3Node) grandComp3Node.textContent = totals.competitor3.toFixed(2);

    const weightStatus = balanced ? "Total bobot sudah seimbang pada 1.00." : "Total bobot seluruh CSF harus tepat 1.00.";
    const statusNode = document.querySelector("[data-cpm-summary='weight-status']");
    const statusInlineNode = document.querySelector("[data-cpm-summary='weight-status-inline']");
    const grandStatusNode = document.querySelector("[data-cpm-summary='grand-status']");
    if (statusNode) {
      statusNode.textContent = weightStatus;
      statusNode.className = balanced ? "text-sm text-emerald-200" : "text-sm text-amber-200";
    }
    if (statusInlineNode) {
      statusInlineNode.textContent = weightStatus;
      statusInlineNode.className = balanced ? "mt-3 text-sm text-emerald-200" : "mt-3 text-sm text-amber-200";
    }
    if (grandStatusNode) {
      grandStatusNode.textContent = balanced ? "Balanced at 1.00" : "Weight total must equal 1.00";
      grandStatusNode.className = balanced ? "px-3 py-4 text-xs text-emerald-200" : "px-3 py-4 text-xs text-amber-200";
    }

    const analysisNode = document.querySelector("[data-cpm-summary='analysis']");
    if (analysisNode) {
      if (!items.length) {
        analysisNode.textContent = "Belum ada CSF yang masuk ke CPM. Simpan Critical Success Factor terlebih dahulu.";
      } else if (!balanced) {
        analysisNode.textContent = "Analisis belum final karena total bobot CSF belum sama dengan 1.00.";
      } else {
        const entityScores = [
          { key: "company", label: settings.companyName, score: totals.company },
          { key: "competitor1", label: settings.competitor1Name, score: totals.competitor1 },
          { key: "competitor2", label: settings.competitor2Name, score: totals.competitor2 },
          { key: "competitor3", label: settings.competitor3Name, score: totals.competitor3 },
        ].sort((a, b) => b.score - a.score);
        const leader = entityScores[0];
        const runnerUp = entityScores[1];
        const companyRank = entityScores.findIndex((entry) => entry.key === "company") + 1;
        const companyEntry = entityScores.find((entry) => entry.key === "company") || entityScores[0];
        const scoreGapToLeader = Math.max(0, leader.score - companyEntry.score);
        const scoreGapToAbove = companyRank > 1 ? Math.max(0, entityScores[companyRank - 2].score - companyEntry.score) : 0;

        const companyFactorReads = items
          .map((item) => {
            const companyRating = Number(item.ratings?.company || 0);
            const competitorRatings = [
              Number(item.ratings?.competitor1 || 0),
              Number(item.ratings?.competitor2 || 0),
              Number(item.ratings?.competitor3 || 0),
            ];
            const bestCompetitorRating = Math.max(...competitorRatings);
            const weightedValue = Number(calculateCpmValue(item.weight, item.ratings?.company) || 0);
            return {
              csf: item.csf,
              companyRating,
              bestCompetitorRating,
              weightedValue,
              advantage: companyRating - bestCompetitorRating,
            };
          })
          .filter((entry) => entry.companyRating > 0);

        const strongestFactor = companyFactorReads
          .slice()
          .sort((a, b) => {
            if (b.advantage !== a.advantage) return b.advantage - a.advantage;
            return b.weightedValue - a.weightedValue;
          })[0];

        const weakestFactor = companyFactorReads
          .slice()
          .sort((a, b) => {
            if (a.advantage !== b.advantage) return a.advantage - b.advantage;
            return a.weightedValue - b.weightedValue;
          })[0];

        const rankLabel = `${companyRank} dari ${entityScores.length}`;
        let narrative = `${leader.label} berada pada posisi tertinggi CPM dengan total skor ${leader.score.toFixed(2)}, diikuti ${runnerUp.label} pada ${runnerUp.score.toFixed(2)}. `;

        if (companyRank === 1) {
          narrative += `${settings.companyName} menempati peringkat ${rankLabel}, yang menunjukkan posisi kompetitif paling kuat pada himpunan CSF yang dinilai. `;
        } else {
          narrative += `${settings.companyName} berada pada peringkat ${rankLabel} dengan total ${companyEntry.score.toFixed(2)}. Selisih terhadap pemimpin pasar saat ini adalah ${scoreGapToLeader.toFixed(2)}, dan jarak ke peringkat di atasnya adalah ${scoreGapToAbove.toFixed(2)}. `;
        }

        if (strongestFactor) {
          if (strongestFactor.advantage > 0) {
            narrative += `Keunggulan relatif perusahaan paling terlihat pada CSF ${strongestFactor.csf}, karena rating perusahaan lebih tinggi dibanding kompetitor terbaik pada faktor tersebut. `;
          } else if (strongestFactor.advantage === 0) {
            narrative += `Pada CSF ${strongestFactor.csf}, perusahaan masih mampu menyamai pemain terbaik sehingga faktor ini dapat dianggap sebagai area kompetitif yang relatif terjaga. `;
          } else {
            narrative += `Belum ada CSF yang benar-benar unggul secara rating relatif; faktor terbaik saat ini adalah ${strongestFactor.csf}, namun masih perlu diperkuat agar melampaui kompetitor. `;
          }
        }

        if (weakestFactor) {
          if (weakestFactor.advantage < 0) {
            narrative += `Area yang paling perlu diprioritaskan untuk perbaikan adalah CSF ${weakestFactor.csf}, karena di faktor ini perusahaan tertinggal paling jauh dibanding kompetitor terbaik.`;
          } else {
            narrative += `Secara umum tidak terlihat ketertinggalan ekstrem pada satu CSF tertentu, sehingga fokus berikutnya dapat diarahkan pada penguatan diferensiasi agar jarak skor total makin melebar.`;
          }
        }

        analysisNode.textContent = narrative;
      }
    }
  }

  function updateCpmMatrixField(id, field, value) {
    const items = getCpmItems();
    const [group, key] = field.split(":");
    const nextItems = items.map((item) => {
      if (item.id !== id) return item;
      if (field === "weight") {
        return { ...item, weight: normalizeWeightValue(value) };
      }
      if (group === "rating") {
        const numeric = value && ["1", "2", "3", "4"].includes(value) ? value : "";
        return {
          ...item,
          ratings: {
            ...item.ratings,
            [key]: numeric,
          },
        };
      }
      if (group === "comment") {
        return {
          ...item,
          comments: {
            ...item.comments,
            [key]: value,
          },
        };
      }
      return item;
    });
    setCpmItems(nextItems);
    renderCpmMatrix();
  }

  function renderCpmMatrix() {
    const tbody = document.querySelector("[data-cpm-matrix-body]");
    if (!tbody) return;
    const items = getCpmItems().slice().sort((a, b) => a.slot - b.slot);
    const settings = getCpmSettings();
    const isManual = settings.weightingMode !== "auto";

    if (!items.length) {
      tbody.innerHTML = `
        <tr class="bg-white/5">
          <td colspan="10" class="px-3 py-4 text-sm text-cool-gray">Belum ada CSF yang tersimpan ke tabel CPM.</td>
        </tr>
      `;
      updateCpmSummary([]);
      hydrateCpmRowsFromStore();
      ensureCpmSettingsInDom();
      return;
    }

    tbody.innerHTML = items
      .map((item, index) => {
        const rowTone = index % 2 === 0 ? "bg-white/5" : "bg-navy-surface/40";
        const companyValue = calculateCpmValue(item.weight, item.ratings?.company);
        const comp1Value = calculateCpmValue(item.weight, item.ratings?.competitor1);
        const comp2Value = calculateCpmValue(item.weight, item.ratings?.competitor2);
        const comp3Value = calculateCpmValue(item.weight, item.ratings?.competitor3);
        return `
          <tr class="${rowTone}">
            <td class="px-3 py-3 text-soft-white">${item.csf}</td>
            <td class="px-3 py-3">
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                ${isManual ? "" : "disabled"}
                value="${item.weight || ""}"
                data-managed-action="true"
                data-cpm-table-field="weight"
                data-cpm-id="${item.id}"
                class="w-24 rounded-xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white disabled:cursor-not-allowed disabled:opacity-60"
              />
            </td>
            <td class="px-3 py-3">
              <select data-managed-action="true" data-cpm-table-field="rating:company" data-cpm-id="${item.id}" class="w-20 rounded-xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white">
                <option value=""${item.ratings?.company ? "" : " selected"}>Select</option>
                <option value="1"${item.ratings?.company === "1" ? " selected" : ""}>1</option>
                <option value="2"${item.ratings?.company === "2" ? " selected" : ""}>2</option>
                <option value="3"${item.ratings?.company === "3" ? " selected" : ""}>3</option>
                <option value="4"${item.ratings?.company === "4" ? " selected" : ""}>4</option>
              </select>
            </td>
            <td class="px-3 py-3 font-mono text-soft-white">${companyValue || "-"}</td>
            <td class="px-3 py-3">
              <select data-managed-action="true" data-cpm-table-field="rating:competitor1" data-cpm-id="${item.id}" class="w-20 rounded-xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white">
                <option value=""${item.ratings?.competitor1 ? "" : " selected"}>Select</option>
                <option value="1"${item.ratings?.competitor1 === "1" ? " selected" : ""}>1</option>
                <option value="2"${item.ratings?.competitor1 === "2" ? " selected" : ""}>2</option>
                <option value="3"${item.ratings?.competitor1 === "3" ? " selected" : ""}>3</option>
                <option value="4"${item.ratings?.competitor1 === "4" ? " selected" : ""}>4</option>
              </select>
            </td>
            <td class="px-3 py-3 font-mono text-soft-white">${comp1Value || "-"}</td>
            <td class="px-3 py-3">
              <select data-managed-action="true" data-cpm-table-field="rating:competitor2" data-cpm-id="${item.id}" class="w-20 rounded-xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white">
                <option value=""${item.ratings?.competitor2 ? "" : " selected"}>Select</option>
                <option value="1"${item.ratings?.competitor2 === "1" ? " selected" : ""}>1</option>
                <option value="2"${item.ratings?.competitor2 === "2" ? " selected" : ""}>2</option>
                <option value="3"${item.ratings?.competitor2 === "3" ? " selected" : ""}>3</option>
                <option value="4"${item.ratings?.competitor2 === "4" ? " selected" : ""}>4</option>
              </select>
            </td>
            <td class="px-3 py-3 font-mono text-soft-white">${comp2Value || "-"}</td>
            <td class="px-3 py-3">
              <select data-managed-action="true" data-cpm-table-field="rating:competitor3" data-cpm-id="${item.id}" class="w-20 rounded-xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white">
                <option value=""${item.ratings?.competitor3 ? "" : " selected"}>Select</option>
                <option value="1"${item.ratings?.competitor3 === "1" ? " selected" : ""}>1</option>
                <option value="2"${item.ratings?.competitor3 === "2" ? " selected" : ""}>2</option>
                <option value="3"${item.ratings?.competitor3 === "3" ? " selected" : ""}>3</option>
                <option value="4"${item.ratings?.competitor3 === "4" ? " selected" : ""}>4</option>
              </select>
            </td>
            <td class="px-3 py-3 font-mono text-soft-white">${comp3Value || "-"}</td>
          </tr>
          <tr class="border-t border-border-blue/40 bg-black/10">
            <td colspan="10" class="px-3 py-4">
              <div class="grid gap-3 xl:grid-cols-4">
                <label class="text-xs text-cool-gray">Komentar <span class="text-soft-white">${settings.companyName}</span>
                  <textarea data-managed-action="true" data-cpm-table-field="comment:company" data-cpm-id="${item.id}" class="mt-2 min-h-24 w-full rounded-xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white">${item.comments?.company || ""}</textarea>
                </label>
                <label class="text-xs text-cool-gray">Komentar <span class="text-soft-white">${settings.competitor1Name}</span>
                  <textarea data-managed-action="true" data-cpm-table-field="comment:competitor1" data-cpm-id="${item.id}" class="mt-2 min-h-24 w-full rounded-xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white">${item.comments?.competitor1 || ""}</textarea>
                </label>
                <label class="text-xs text-cool-gray">Komentar <span class="text-soft-white">${settings.competitor2Name}</span>
                  <textarea data-managed-action="true" data-cpm-table-field="comment:competitor2" data-cpm-id="${item.id}" class="mt-2 min-h-24 w-full rounded-xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white">${item.comments?.competitor2 || ""}</textarea>
                </label>
                <label class="text-xs text-cool-gray">Komentar <span class="text-soft-white">${settings.competitor3Name}</span>
                  <textarea data-managed-action="true" data-cpm-table-field="comment:competitor3" data-cpm-id="${item.id}" class="mt-2 min-h-24 w-full rounded-xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white">${item.comments?.competitor3 || ""}</textarea>
                </label>
              </div>
              <div class="mt-3 flex flex-wrap gap-2">
                <button type="button" data-managed-action="true" data-cpm-table-action="edit" data-cpm-id="${item.id}" class="inline-flex items-center justify-center rounded-xl border border-info/30 bg-info/10 px-3 py-2 text-xs font-medium text-soft-white transition hover:bg-info/20">Edit CSF</button>
                <button type="button" data-managed-action="true" data-cpm-table-action="delete" data-cpm-id="${item.id}" class="inline-flex items-center justify-center rounded-xl border border-warning/30 bg-warning/10 px-3 py-2 text-xs font-medium text-soft-white transition hover:bg-warning/20">Delete CSF</button>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");

    updateCpmSummary(items);
    hydrateCpmRowsFromStore();
    ensureCpmSettingsInDom();
  }

  function attachCpmInteractions() {
    if (!document.querySelector("[data-cpm-input-body]")) return;
    createCpmInputRows();
    ensureCpmSettingsInDom();
    hydrateCpmRowsFromStore();
    renderCpmMatrix();

    document.addEventListener("click", (event) => {
      const saveButton = event.target.closest("[data-cpm-action='save-row']");
      if (saveButton) {
        saveCpmRow(saveButton.dataset.cpmId);
        return;
      }
      const clearButton = event.target.closest("[data-cpm-action='clear-row']");
      if (clearButton) {
        clearCpmRow(clearButton.dataset.cpmId, false);
        return;
      }
      const saveAllButton = event.target.closest("[data-cpm-action='save-all']");
      if (saveAllButton) {
        saveAllCpmRows();
        return;
      }
      const autoWeightButton = event.target.closest("[data-cpm-weight-mode='auto']");
      if (autoWeightButton) {
        applyAutoCpmWeights();
        return;
      }
      const manualWeightButton = event.target.closest("[data-cpm-weight-mode='manual']");
      if (manualWeightButton) {
        setManualCpmWeightingMode();
        return;
      }
      const editButton = event.target.closest("[data-cpm-table-action='edit']");
      if (editButton) {
        editCpmRow(editButton.dataset.cpmId);
        return;
      }
      const deleteButton = event.target.closest("[data-cpm-table-action='delete']");
      if (deleteButton) {
        clearCpmRow(deleteButton.dataset.cpmId, true);
      }
    });

    document.addEventListener("change", (event) => {
      const cpmField = event.target.closest("[data-cpm-field='csf']");
      if (cpmField) {
        refreshCpmCategoryOptions();
      }
      const tableField = event.target.closest("[data-cpm-table-field]");
      if (tableField) {
        updateCpmMatrixField(tableField.dataset.cpmId, tableField.dataset.cpmTableField, tableField.value);
        return;
      }
      const settingsField = event.target.closest("[data-cpm-setting]");
      if (settingsField) {
        updateCpmSettingsFromDom();
        renderCpmMatrix();
      }
    });

    document.addEventListener("input", (event) => {
      const settingsField = event.target.closest("[data-cpm-setting]");
      if (settingsField) {
        updateCpmSettingsFromDom();
      }
    });
  }

  function getSwotPartOneData() {
    const rankedEfeItems = getRankedEfeItems();
    const rankedIfeItems = getRankedIfeItems();
    const buildEntries = (items, type, codePrefix) =>
      items
        .filter((item) => item.type === type)
        .sort((a, b) => b.aqcdScore - a.aqcdScore || a.slot - b.slot)
        .map((item, index) => ({
          code: `${codePrefix}${index + 1}`,
          factor: item.factor,
          source: item.source,
          weight: item.weight || "-",
          rating: item.rating || "-",
          weightedScore: item.weightedScore || calculateWeightedScore(item.weight, item.rating) || "-",
        }));

    return {
      strengths: buildEntries(rankedIfeItems, "Strength", "S"),
      weaknesses: buildEntries(rankedIfeItems, "Weakness", "W"),
      opportunities: buildEntries(rankedEfeItems, "Opportunity", "O"),
      threats: buildEntries(rankedEfeItems, "Threat", "T"),
    };
  }

  function renderSwotMatrixPartOneTable(group, entries) {
    if (!entries.length) {
      return `
        <tr class="bg-white/5">
          <td colspan="6" class="px-3 py-4 text-sm text-cool-gray">Belum ada faktor ${group} yang tersedia dari phase sumber.</td>
        </tr>
      `;
    }

    return entries
      .map(
        (entry, index) => `
          <tr class="${index % 2 === 0 ? "bg-white/5" : "bg-navy-surface/40"}">
            <td class="px-3 py-3 font-mono text-soft-white">${entry.code}</td>
            <td class="px-3 py-3 text-soft-white">${entry.factor}</td>
            <td class="px-3 py-3 text-cool-gray">${entry.source}</td>
            <td class="px-3 py-3 font-mono text-soft-white">${entry.weight}</td>
            <td class="px-3 py-3 font-mono text-soft-white">${entry.rating}</td>
            <td class="px-3 py-3 font-mono text-soft-white">${entry.weightedScore}</td>
          </tr>
        `
      )
      .join("");
  }

  function renderSwotPartOne() {
    if (document.body.dataset.page !== "phase-swot") return;

    const swot = getSwotPartOneData();
    const tableMap = [
      ["strength", swot.strengths],
      ["weakness", swot.weaknesses],
      ["opportunity", swot.opportunities],
      ["threat", swot.threats],
    ];

    tableMap.forEach(([group, entries]) => {
      const tbody = document.querySelector(`[data-swot-body="${group}"]`);
      if (tbody) {
        tbody.innerHTML = renderSwotMatrixPartOneTable(group, entries);
      }
      const countNode = document.querySelector(`[data-swot-summary='${group}-count']`);
      if (countNode) {
        countNode.textContent = `${entries.length}/10`;
      }
    });

    const syncedNode = document.querySelector("[data-swot-summary='sync-status']");
    if (syncedNode) {
      const hasData = tableMap.some(([, entries]) => entries.length > 0);
      syncedNode.textContent = hasData
        ? "SWOT Part 1 tersinkron dari tabel EFE dan IFE yang aktif."
        : "Belum ada data EFE/IFE yang bisa dipindahkan ke SWOT Matrix.";
      syncedNode.className = hasData ? "mt-4 text-sm text-emerald-200" : "mt-4 text-sm text-amber-200";
    }

    const analysisNode = document.querySelector("[data-swot-summary='analysis']");
    if (analysisNode) {
      if (!tableMap.some(([, entries]) => entries.length > 0)) {
        analysisNode.textContent = "Lengkapi dan simpan dahulu tabel EFE serta IFE agar SWOT Matrix dapat menarik faktor secara otomatis.";
      } else {
        analysisNode.textContent =
          "Part 1 SWOT Matrix ini hanya menyalin faktor yang sudah lolos ke tabel EFE dan IFE. Kode O/T/S/W diberikan otomatis agar siap dipakai pada penyusunan TOWS di bagian berikutnya.";
      }
    }
  }

  function getTowsConfigs() {
    return [
      {
        bank: "growth",
        label: "Growth Strategy",
        shortLabel: "SO",
        leftLabel: "Strength Factor",
        rightLabel: "Opportunity Factor",
        leftGroup: "strengths",
        rightGroup: "opportunities",
      },
      {
        bank: "improvement",
        label: "Improvement Strategy",
        shortLabel: "WO",
        leftLabel: "Weakness Factor",
        rightLabel: "Opportunity Factor",
        leftGroup: "weaknesses",
        rightGroup: "opportunities",
      },
      {
        bank: "offensive-defense",
        label: "Offensive Defense Strategy",
        shortLabel: "ST",
        leftLabel: "Strength Factor",
        rightLabel: "Threat Factor",
        leftGroup: "strengths",
        rightGroup: "threats",
      },
      {
        bank: "total-defense",
        label: "Total Defense Strategy",
        shortLabel: "WT",
        leftLabel: "Weakness Factor",
        rightLabel: "Threat Factor",
        leftGroup: "weaknesses",
        rightGroup: "threats",
      },
    ];
  }

  function getTowsConfig(bank) {
    return getTowsConfigs().find((config) => config.bank === bank);
  }

  function getSwotEntryMap() {
    const swot = getSwotPartOneData();
    return [...swot.strengths, ...swot.weaknesses, ...swot.opportunities, ...swot.threats].reduce((acc, entry) => {
      acc[entry.code] = entry;
      return acc;
    }, {});
  }

  function buildTowsFactorOptions(entries, selectedCode = "") {
    const options = entries
      .map(
        (entry) =>
          `<option value="${entry.code}"${entry.code === selectedCode ? " selected" : ""}>${entry.code} - ${entry.factor}</option>`
      )
      .join("");
    return `<option value=""${selectedCode ? "" : " selected"}>Select factor</option>${options}`;
  }

  function getTowsStrategyCategory(strategyType) {
    return TOWS_STRATEGY_OPTIONS.find((option) => option.type === strategyType)?.category || "";
  }

  function buildTowsStrategyTypeOptions(selectedType = "") {
    const options = TOWS_STRATEGY_OPTIONS.map(
      (option) =>
        `<option value="${option.type}"${option.type === selectedType ? " selected" : ""}>${option.type}</option>`
    ).join("");
    return `<option value=""${selectedType ? "" : " selected"}>Select strategy type</option>${options}`;
  }

  function buildTowsStrategyCategoryOptions(selectedCategory = "", strategyType = "") {
    const matchedCategory = getTowsStrategyCategory(strategyType);
    if (!matchedCategory) {
      return `<option value="" selected>Select category</option>`;
    }
    return `<option value="${matchedCategory}"${selectedCategory === matchedCategory ? " selected" : ""}>${matchedCategory}</option>`;
  }

  function getTowsInputRows() {
    return Array.from(document.querySelectorAll("[data-tows-input-body] tr[data-tows-row-id]"));
  }

  function getTowsRowMeta(row) {
    const bank = row.dataset.towsBank || "";
    const slot = Number(row.dataset.towsSlot || 0);
    return {
      bank,
      slot,
      id: `${bank}-${slot}`,
    };
  }

  function getTowsRowFields(row) {
    return {
      leftSelect: row.querySelector("[data-tows-field='left']"),
      rightSelect: row.querySelector("[data-tows-field='right']"),
      pairField: row.querySelector("[data-tows-field='pair']"),
      initiativeInput: row.querySelector("[data-tows-field='initiative']"),
      strategyTypeSelect: row.querySelector("[data-tows-field='strategy-type']"),
      strategyCategorySelect: row.querySelector("[data-tows-field='strategy-category']"),
      outputInput: row.querySelector("[data-tows-field='output']"),
      status: row.querySelector("[data-tows-row-status]"),
    };
  }

  function getTowsPairCode(leftCode, rightCode) {
    if (!leftCode || !rightCode) return "-";
    return `${leftCode}; ${rightCode}`;
  }

  function refreshTowsRowOptions() {
    const swot = getSwotPartOneData();
    getTowsInputRows().forEach((row) => {
      const { bank } = getTowsRowMeta(row);
      const config = getTowsConfig(bank);
      const fields = getTowsRowFields(row);
      if (!config || !fields.leftSelect || !fields.rightSelect) return;
      const leftEntries = swot[config.leftGroup] || [];
      const rightEntries = swot[config.rightGroup] || [];
      const selectedLeft = fields.leftSelect.value || "";
      const selectedRight = fields.rightSelect.value || "";
      fields.leftSelect.innerHTML = buildTowsFactorOptions(leftEntries, selectedLeft);
      fields.rightSelect.innerHTML = buildTowsFactorOptions(rightEntries, selectedRight);
      fields.leftSelect.value = selectedLeft;
      fields.rightSelect.value = selectedRight;
      if (fields.strategyCategorySelect) {
        const selectedCategory = fields.strategyCategorySelect.value || "";
        fields.strategyCategorySelect.innerHTML = buildTowsStrategyCategoryOptions(selectedCategory, fields.strategyTypeSelect?.value || "");
        fields.strategyCategorySelect.disabled = !(fields.strategyTypeSelect?.value || "");
      }
      if (fields.pairField) {
        fields.pairField.value = getTowsPairCode(selectedLeft, selectedRight);
      }
    });
  }

  function createTowsInputRows() {
    document.querySelectorAll("[data-tows-input-body]").forEach((tbody) => {
      if (tbody.children.length) return;
      const bank = tbody.dataset.towsInputBody;
      const config = getTowsConfig(bank);
      if (!config) return;
      for (let slot = 1; slot <= 10; slot += 1) {
        const row = document.createElement("tr");
        row.dataset.towsRowId = `${bank}-${slot}`;
        row.dataset.towsBank = bank;
        row.dataset.towsSlot = String(slot);
        row.className = slot % 2 === 0 ? "bg-navy-surface/40" : "bg-white/5";
        row.innerHTML = `
          <td class="px-3 py-3 font-mono text-soft-white">${slot}</td>
          <td class="px-3 py-3">
            <select data-tows-field="left" class="w-full rounded-2xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white">
              <option value="">Select factor</option>
            </select>
          </td>
          <td class="px-3 py-3">
            <select data-tows-field="right" class="w-full rounded-2xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white">
              <option value="">Select factor</option>
            </select>
          </td>
          <td class="px-3 py-3">
            <input data-tows-field="pair" type="text" value="-" readonly class="w-full rounded-2xl border border-border-blue bg-black/20 px-3 py-2 text-sm text-soft-white" />
          </td>
          <td class="px-3 py-3">
            <textarea data-tows-field="initiative" placeholder="Strategi initiative" class="min-h-24 w-full rounded-2xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white placeholder:text-cool-gray"></textarea>
          </td>
          <td class="px-3 py-3">
            <select data-tows-field="strategy-type" class="w-full rounded-2xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white">
              ${buildTowsStrategyTypeOptions()}
            </select>
          </td>
          <td class="px-3 py-3">
            <select data-tows-field="strategy-category" class="w-full rounded-2xl border border-border-blue bg-black/20 px-3 py-2 text-sm text-soft-white disabled:cursor-not-allowed disabled:opacity-70" disabled>
              ${buildTowsStrategyCategoryOptions()}
            </select>
          </td>
          <td class="px-3 py-3">
            <textarea data-tows-field="output" placeholder="Produk / Output" class="min-h-24 w-full rounded-2xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white placeholder:text-cool-gray"></textarea>
          </td>
          <td class="px-3 py-3">
            <div class="flex min-w-[12rem] flex-col gap-2">
              <div class="flex gap-2">
                <button type="button" data-managed-action="true" data-tows-action="save-row" data-tows-id="${bank}-${slot}" class="inline-flex flex-1 items-center justify-center rounded-xl border border-info/30 bg-info/10 px-3 py-2 text-xs font-medium text-soft-white transition hover:bg-info/20">Save</button>
                <button type="button" data-managed-action="true" data-tows-action="clear-row" data-tows-id="${bank}-${slot}" class="inline-flex flex-1 items-center justify-center rounded-xl border border-border-blue bg-white/5 px-3 py-2 text-xs font-medium text-cool-gray transition hover:text-soft-white">Clear</button>
              </div>
              <p data-tows-row-status class="text-xs text-cool-gray">Belum terdaftar.</p>
            </div>
          </td>
        `;
        tbody.appendChild(row);
      }
    });
    refreshTowsRowOptions();
  }

  function setTowsRowStatus(row, message, tone = "default") {
    const status = row.querySelector("[data-tows-row-status]");
    if (!status) return;
    const tones = {
      default: "text-cool-gray",
      success: "text-emerald-200",
      warning: "text-amber-200",
    };
    status.className = `text-xs ${tones[tone] || tones.default}`;
    status.textContent = message;
  }

  function hydrateTowsRowsFromStore() {
    const items = getTowsItems();
    getTowsInputRows().forEach((row) => {
      const { id } = getTowsRowMeta(row);
      const item = items.find((entry) => entry.id === id);
      const fields = getTowsRowFields(row);
      if (item) {
        if (fields.leftSelect) fields.leftSelect.value = item.leftCode || "";
        if (fields.rightSelect) fields.rightSelect.value = item.rightCode || "";
        if (fields.pairField) fields.pairField.value = getTowsPairCode(item.leftCode, item.rightCode);
        if (fields.initiativeInput) fields.initiativeInput.value = item.initiative || "";
        if (fields.strategyTypeSelect) fields.strategyTypeSelect.value = item.strategyType || "";
        if (fields.strategyCategorySelect) {
          const category = item.strategyCategory || getTowsStrategyCategory(item.strategyType || "");
          fields.strategyCategorySelect.innerHTML = buildTowsStrategyCategoryOptions(category, item.strategyType || "");
          fields.strategyCategorySelect.value = category;
          fields.strategyCategorySelect.disabled = !(item.strategyType || "");
        }
        if (fields.outputInput) fields.outputInput.value = item.output || "";
        setTowsRowStatus(row, "Strategi sudah tersimpan.", "success");
      } else {
        if (fields.pairField) {
          fields.pairField.value = getTowsPairCode(fields.leftSelect?.value || "", fields.rightSelect?.value || "");
        }
        if (fields.strategyCategorySelect) {
          const category = getTowsStrategyCategory(fields.strategyTypeSelect?.value || "");
          fields.strategyCategorySelect.innerHTML = buildTowsStrategyCategoryOptions(category, fields.strategyTypeSelect?.value || "");
          fields.strategyCategorySelect.value = category;
          fields.strategyCategorySelect.disabled = !(fields.strategyTypeSelect?.value || "");
        }
        setTowsRowStatus(row, "Belum terdaftar.", "default");
      }
    });
    refreshTowsRowOptions();
  }

  function saveTowsRow(id, options = {}) {
    const { silent = false } = options;
    const row = getTowsInputRows().find((entry) => getTowsRowMeta(entry).id === id);
    if (!row) return;
    const { bank, slot } = getTowsRowMeta(row);
    const fields = getTowsRowFields(row);
    const leftCode = fields.leftSelect?.value || "";
    const rightCode = fields.rightSelect?.value || "";
    const initiative = fields.initiativeInput?.value?.trim() || "";
    const strategyType = fields.strategyTypeSelect?.value || "";
    const strategyCategory = fields.strategyCategorySelect?.value || getTowsStrategyCategory(strategyType);
    const output = fields.outputInput?.value?.trim() || "";
    if (!leftCode || !rightCode) {
      setTowsRowStatus(row, "Pilih kedua faktor sebelum menyimpan.", "warning");
      if (!silent) showToast("Faktor TOWS belum lengkap.", "warning");
      return;
    }
    if (!initiative || !strategyType || !output) {
      setTowsRowStatus(row, "Isi strategi initiative, jenis strategi, dan produk/output.", "warning");
      if (!silent) showToast("Jenis strategi atau isian strategi TOWS belum lengkap.", "warning");
      return;
    }
    const config = getTowsConfig(bank);
    const items = getTowsItems().filter((item) => item.id !== id);
    items.push({
      id,
      bank,
      slot,
      shortLabel: config?.shortLabel || "",
      leftCode,
      rightCode,
      pairCode: getTowsPairCode(leftCode, rightCode),
      initiative,
      strategyType,
      strategyCategory,
      output,
    });
    setTowsItems(items.sort((a, b) => a.slot - b.slot || a.bank.localeCompare(b.bank)));
    setTowsRowStatus(row, "Strategi berhasil disimpan.", "success");
    renderTowsSummary();
    if (!silent) showToast(`${config?.label || "Strategi"} ${slot} berhasil disimpan.`, "success");
  }

  function saveAllTowsRows(bank) {
    let savedCount = 0;
    let skippedCount = 0;
    getTowsInputRows()
      .filter((row) => getTowsRowMeta(row).bank === bank)
      .forEach((row) => {
        const fields = getTowsRowFields(row);
        if (
          !(
            fields.leftSelect?.value &&
            fields.rightSelect?.value &&
            fields.initiativeInput?.value?.trim() &&
            fields.strategyTypeSelect?.value &&
            fields.outputInput?.value?.trim()
          )
        ) {
          skippedCount += 1;
          return;
        }
        saveTowsRow(getTowsRowMeta(row).id, { silent: true });
        savedCount += 1;
      });
    const config = getTowsConfig(bank);
    showToast(`${config?.shortLabel || bank}: ${savedCount} tersimpan, ${skippedCount} belum lengkap.`, savedCount > 0 ? "success" : "warning");
  }

  function clearTowsRow(id, removeSaved = false) {
    const row = getTowsInputRows().find((entry) => getTowsRowMeta(entry).id === id);
    if (!row) return;
    const fields = getTowsRowFields(row);
    if (fields.leftSelect) fields.leftSelect.value = "";
    if (fields.rightSelect) fields.rightSelect.value = "";
    if (fields.pairField) fields.pairField.value = "-";
    if (fields.initiativeInput) fields.initiativeInput.value = "";
    if (fields.strategyTypeSelect) fields.strategyTypeSelect.value = "";
    if (fields.strategyCategorySelect) {
      fields.strategyCategorySelect.innerHTML = buildTowsStrategyCategoryOptions();
      fields.strategyCategorySelect.value = "";
      fields.strategyCategorySelect.disabled = true;
    }
    if (fields.outputInput) fields.outputInput.value = "";
    if (removeSaved) {
      setTowsItems(getTowsItems().filter((item) => item.id !== id));
      renderTowsSummary();
      setTowsRowStatus(row, "Strategi dihapus dari tabel TOWS.", "warning");
      showToast("Strategi TOWS berhasil dihapus.", "success");
    } else {
      setTowsRowStatus(row, "Baris dibersihkan. Simpan lagi jika perlu.", "default");
    }
  }

  function editTowsRow(id) {
    const item = getTowsItems().find((entry) => entry.id === id);
    const row = getTowsInputRows().find((entry) => getTowsRowMeta(entry).id === id);
    if (!item || !row) return;
    const fields = getTowsRowFields(row);
    if (fields.leftSelect) fields.leftSelect.value = item.leftCode || "";
    if (fields.rightSelect) fields.rightSelect.value = item.rightCode || "";
    if (fields.pairField) fields.pairField.value = item.pairCode || getTowsPairCode(item.leftCode, item.rightCode);
    if (fields.initiativeInput) fields.initiativeInput.value = item.initiative || "";
    if (fields.strategyTypeSelect) fields.strategyTypeSelect.value = item.strategyType || "";
    if (fields.strategyCategorySelect) {
      const category = item.strategyCategory || getTowsStrategyCategory(item.strategyType || "");
      fields.strategyCategorySelect.innerHTML = buildTowsStrategyCategoryOptions(category, item.strategyType || "");
      fields.strategyCategorySelect.value = category;
      fields.strategyCategorySelect.disabled = !(item.strategyType || "");
    }
    if (fields.outputInput) fields.outputInput.value = item.output || "";
    setTowsRowStatus(row, "Mode edit aktif. Ubah lalu klik Save.", "success");
    row.scrollIntoView({ behavior: "smooth", block: "center" });
    showToast(`Mode edit dibuka untuk strategi ${item.shortLabel}-${item.slot}.`, "info");
  }

  function renderTowsStrategyItems(bank, items, swotEntryMap) {
    const filtered = items.filter((item) => item.bank === bank).sort((a, b) => a.slot - b.slot);
    if (!filtered.length) {
      return `<tr class="bg-white/5"><td colspan="2" class="px-3 py-4 text-sm text-cool-gray">Belum ada strategi yang tersimpan.</td></tr>`;
    }
    return filtered
      .map((item) => {
        const strategyMeta = item.strategyType
          ? `<span class="block text-xs uppercase tracking-[0.14em] text-cool-gray">${item.strategyType} | ${item.strategyCategory || "-"}</span>`
          : "";
        const outputSuffix = item.output ? ` Output: ${item.output}.` : "";
        return `
          <tr class="border-b border-border-blue/40 ${item.slot % 2 === 0 ? "bg-white/5" : "bg-black/10"}">
            <td class="px-3 py-2 align-top font-mono text-soft-white">${item.pairCode.replace(";", "->")}</td>
            <td class="px-3 py-2 align-top text-soft-white">${strategyMeta}${item.initiative}.${outputSuffix}</td>
          </tr>
        `;
      })
      .join("");
  }

  function renderSwotSummaryList(group, entries) {
    const tbody = document.querySelector(`[data-tows-summary-body="${group}"]`);
    if (!tbody) return;
    if (!entries.length) {
      tbody.innerHTML = `<tr class="bg-white/5"><td colspan="2" class="px-3 py-4 text-sm text-cool-gray">Belum ada faktor.</td></tr>`;
      return;
    }
    tbody.innerHTML = entries
      .map(
        (entry, index) => `
          <tr class="${index % 2 === 0 ? "bg-white/5" : "bg-navy-surface/40"}">
            <td class="px-3 py-3 font-mono text-soft-white">${entry.code}</td>
            <td class="px-3 py-3 text-soft-white">${entry.factor}</td>
          </tr>
        `
      )
      .join("");
  }

  function renderTowsSummary() {
    const swot = getSwotPartOneData();
    const items = getTowsItems();
    const swotEntryMap = getSwotEntryMap();

    renderSwotSummaryList("strength", swot.strengths);
    renderSwotSummaryList("weakness", swot.weaknesses);
    renderSwotSummaryList("opportunity", swot.opportunities);
    renderSwotSummaryList("threat", swot.threats);

    getTowsConfigs().forEach((config) => {
      document.querySelectorAll(`[data-tows-strategy-list="${config.bank}"]`).forEach((body) => {
        body.innerHTML = renderTowsStrategyItems(config.bank, items, swotEntryMap);
      });
      const countNode = document.querySelector(`[data-tows-summary='${config.bank}-count']`);
      if (countNode) {
        countNode.textContent = `${items.filter((item) => item.bank === config.bank).length}/10`;
      }
    });

    const analysisNode = document.querySelector("[data-tows-summary='analysis']");
    if (analysisNode) {
      const total = items.length;
      if (!total) {
        analysisNode.textContent = "Belum ada strategi TOWS yang tersimpan. Pilih pasangan faktor pada bagian 2a lalu simpan strategy initiative dan produk/output.";
      } else {
        const counts = getTowsConfigs()
          .map((config) => `${config.shortLabel}: ${items.filter((item) => item.bank === config.bank).length}`)
          .join(" | ");
        analysisNode.textContent = `Ringkasan TOWS sudah memuat ${total} strategi tersimpan. Distribusi strategi saat ini adalah ${counts}.`;
      }
    }
  }

  function attachTowsInteractions() {
    if (!document.querySelector("[data-tows-input-body]")) return;
    createTowsInputRows();
    refreshTowsRowOptions();
    hydrateTowsRowsFromStore();
    renderTowsSummary();

    document.addEventListener("click", (event) => {
      const saveButton = event.target.closest("[data-tows-action='save-row']");
      if (saveButton) {
        saveTowsRow(saveButton.dataset.towsId);
        return;
      }
      const clearButton = event.target.closest("[data-tows-action='clear-row']");
      if (clearButton) {
        clearTowsRow(clearButton.dataset.towsId, false);
        return;
      }
      const saveAllButton = event.target.closest("[data-tows-action='save-all']");
      if (saveAllButton) {
        saveAllTowsRows(saveAllButton.dataset.towsBank);
        return;
      }
      const editButton = event.target.closest("[data-tows-table-action='edit']");
      if (editButton) {
        editTowsRow(editButton.dataset.towsId);
        return;
      }
      const deleteButton = event.target.closest("[data-tows-table-action='delete']");
      if (deleteButton) {
        clearTowsRow(deleteButton.dataset.towsId, true);
      }
    });

    document.addEventListener("change", (event) => {
      const strategySelect = event.target.closest("[data-tows-field='strategy-type']");
      if (strategySelect) {
        const row = strategySelect.closest("[data-tows-row-id]");
        if (!row) return;
        const fields = getTowsRowFields(row);
        if (fields.strategyCategorySelect) {
          const category = getTowsStrategyCategory(fields.strategyTypeSelect?.value || "");
          fields.strategyCategorySelect.innerHTML = buildTowsStrategyCategoryOptions(category, fields.strategyTypeSelect?.value || "");
          fields.strategyCategorySelect.value = category;
          fields.strategyCategorySelect.disabled = !(fields.strategyTypeSelect?.value || "");
        }
        return;
      }
      const select = event.target.closest("[data-tows-field='left'], [data-tows-field='right']");
      if (!select) return;
      const row = select.closest("[data-tows-row-id]");
      if (!row) return;
      const fields = getTowsRowFields(row);
      if (fields.pairField) {
        fields.pairField.value = getTowsPairCode(fields.leftSelect?.value || "", fields.rightSelect?.value || "");
      }
    });
  }

  function getSpaceRows(dimension) {
    return Array.from(document.querySelectorAll(`[data-space-body="${dimension}"] tr[data-space-row-id]`));
  }

  function getSpaceRowFields(row) {
    return {
      valueInput: row.querySelector("[data-space-field='value']"),
      reasonInput: row.querySelector("[data-space-field='reason']"),
    };
  }

  function createSpaceInputRows() {
    Object.entries(SPACE_DIMENSIONS).forEach(([dimension, config]) => {
      const tbody = document.querySelector(`[data-space-body="${dimension}"]`);
      if (!tbody || tbody.children.length) return;
      config.factors.forEach((factor, index) => {
        const row = document.createElement("tr");
        row.dataset.spaceRowId = `${dimension}-${index + 1}`;
        row.dataset.spaceDimension = dimension;
        row.dataset.spaceIndex = String(index);
        row.className = index % 2 === 0 ? "bg-white/5" : "bg-navy-surface/40";
        row.innerHTML = `
          <td class="px-3 py-3 text-soft-white">${factor}</td>
          <td class="px-3 py-3">
            <input
              type="number"
              min="${config.min}"
              max="${config.max}"
              step="1"
              data-space-field="value"
              class="w-24 rounded-2xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white"
            />
          </td>
          <td class="px-3 py-3">
            <textarea
              data-space-field="reason"
              placeholder="Alasan"
              class="min-h-20 w-full rounded-2xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white placeholder:text-cool-gray"
            ></textarea>
          </td>
        `;
        tbody.appendChild(row);
      });
    });
  }

  function hydrateSpaceRows() {
    const state = getSpaceState();
    Object.keys(SPACE_DIMENSIONS).forEach((dimension) => {
      getSpaceRows(dimension).forEach((row) => {
        const index = Number(row.dataset.spaceIndex || 0);
        const rowState = state[dimension]?.[index];
        const fields = getSpaceRowFields(row);
        if (!rowState) return;
        if (fields.valueInput) fields.valueInput.value = rowState.value || "";
        if (fields.reasonInput) fields.reasonInput.value = rowState.reason || "";
      });
    });
  }

  function readSpaceStateFromDom() {
    const state = buildInitialSpaceState();
    Object.keys(SPACE_DIMENSIONS).forEach((dimension) => {
      getSpaceRows(dimension).forEach((row) => {
        const index = Number(row.dataset.spaceIndex || 0);
        const fields = getSpaceRowFields(row);
        state[dimension][index] = {
          factor: state[dimension][index].factor,
          value: fields.valueInput?.value || "",
          reason: fields.reasonInput?.value || "",
        };
      });
    });
    return state;
  }

  function getSpaceDimensionAverage(state, dimension) {
    const values = (state[dimension] || [])
      .map((row) => Number.parseFloat(row.value))
      .filter((value) => !Number.isNaN(value));
    if (!values.length) return null;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function getSpaceQuadrant(x, y) {
    if (x > 0 && y > 0) return "Aggressive";
    if (x < 0 && y > 0) return "Conservative";
    if (x < 0 && y < 0) return "Defensive";
    if (x > 0 && y < 0) return "Competitive";
    return "Borderline";
  }

  function getSpaceApplicableStrategies(quadrant) {
    const map = {
      Aggressive: "Market Penetration, Market Development, Product Development, Integration, Diversification",
      Conservative: "Market Penetration, Market Development, Product Development, Related Diversification",
      Defensive: "Retrenchment, Divestiture, Liquidation, Related Diversification",
      Competitive: "Integration, Market Penetration, Market Development, Product Development",
      Borderline: "Review dimension scores again to confirm the dominant strategic posture.",
    };
    return map[quadrant] || "-";
  }

  function updateSpaceSummary(state = getSpaceState()) {
    const averages = {
      fp: getSpaceDimensionAverage(state, "fp"),
      cp: getSpaceDimensionAverage(state, "cp"),
      sp: getSpaceDimensionAverage(state, "sp"),
      ip: getSpaceDimensionAverage(state, "ip"),
    };
    const x = averages.cp !== null && averages.ip !== null ? averages.cp + averages.ip : null;
    const y = averages.fp !== null && averages.sp !== null ? averages.fp + averages.sp : null;
    const quadrant = x !== null && y !== null ? getSpaceQuadrant(x, y) : "Incomplete";
    const applicable = quadrant !== "Incomplete" ? getSpaceApplicableStrategies(quadrant) : "Lengkapi semua dimensi untuk membaca strategi yang applicable.";

    const mappings = {
      "fp-average": averages.fp !== null ? averages.fp.toFixed(2) : "-",
      "cp-average": averages.cp !== null ? averages.cp.toFixed(2) : "-",
      "sp-average": averages.sp !== null ? averages.sp.toFixed(2) : "-",
      "ip-average": averages.ip !== null ? averages.ip.toFixed(2) : "-",
      "x-axis": x !== null ? x.toFixed(2) : "-",
      "y-axis": y !== null ? y.toFixed(2) : "-",
      quadrant,
      applicable,
    };
    Object.entries(mappings).forEach(([key, value]) => {
      document.querySelectorAll(`[data-space-summary="${key}"]`).forEach((node) => {
        node.textContent = value;
      });
    });

    const analysisNode = document.querySelector('[data-space-summary="analysis"]');
    if (analysisNode) {
      if (quadrant === "Incomplete") {
        analysisNode.textContent = "Lengkapi nilai pada FP, CP, SP, dan IP untuk menghitung koordinat X dan Y serta menentukan kuadran SPACE.";
      } else {
        analysisNode.textContent = `Koordinat SPACE berada pada (${x.toFixed(2)}, ${y.toFixed(2)}) sehingga posisi perusahaan masuk kuadran ${quadrant}. Strategi yang paling sesuai adalah ${applicable}.`;
      }
    }

    const syncedNode = document.querySelector('[data-space-summary="sync-status"]');
    if (syncedNode) {
      const totalFilled = Object.values(state).flat().filter((row) => row.value !== "").length;
      syncedNode.textContent = totalFilled > 0 ? `SPACE draft aktif: ${totalFilled} nilai faktor terisi.` : "SPACE draft belum berisi nilai.";
      syncedNode.className = totalFilled > 0 ? "mt-4 text-sm text-emerald-200" : "mt-4 text-sm text-amber-200";
    }

    renderSpaceDiagram(averages, x, y, quadrant);
  }

  function renderSpaceDiagram(averages, x, y, quadrant) {
    const svg = document.querySelector("[data-space-diagram]");
    const coordLabel = document.querySelector('[data-space-summary="coordinate-label"]');
    const quadrantLabel = document.querySelector('[data-space-summary="diagram-quadrant"]');
    if (!svg) return;

    const width = 980;
    const height = 760;
    const cx = 490;
    const cy = 380;
    const scale = 40;
    const toX = (value) => cx + value * scale;
    const toY = (value) => cy - value * scale;
    const palette = {
      axis: "#67E8F9",
      axisMuted: "#1E3A5F",
      label: "#D6E4F0",
      number: "#C9D7E5",
      panelFill: "#0B1F3A",
      panelStroke: "#8A1F35",
      accent: "#38BDF8",
      diamond: "#F59E0B",
      pointFill: "#F8FAFC",
      pointStroke: "#8A1F35",
      arrow: "#F59E0B",
      grid: "rgba(148,163,184,0.10)",
      shellA: "rgba(56,189,248,0.10)",
      shellB: "rgba(138,31,53,0.12)",
      quadrantAggressive: "rgba(56,189,248,0.08)",
      quadrantConservative: "rgba(34,197,94,0.08)",
      quadrantCompetitive: "rgba(245,158,11,0.08)",
      quadrantDefensive: "rgba(138,31,53,0.12)",
    };

    const fp = averages.fp ?? 0;
    const cp = averages.cp ?? 0;
    const sp = averages.sp ?? 0;
    const ip = averages.ip ?? 0;
    const pointX = x ?? 0;
    const pointY = y ?? 0;
    const gridLines = [];
    for (let i = -7; i <= 7; i += 1) {
      gridLines.push(`<line x1="${toX(i)}" y1="${toY(-7)}" x2="${toX(i)}" y2="${toY(7)}" stroke="${palette.grid}" stroke-width="${i === 0 ? 0 : 1}" />`);
      gridLines.push(`<line x1="${toX(-7)}" y1="${toY(i)}" x2="${toX(7)}" y2="${toY(i)}" stroke="${palette.grid}" stroke-width="${i === 0 ? 0 : 1}" />`);
    }

    const numberLabels = [];
    for (let i = -7; i <= 7; i += 1) {
      if (i !== 0) {
        numberLabels.push(`<text x="${toX(i)}" y="${cy + 34}" fill="${palette.number}" font-size="18" font-weight="600" text-anchor="middle">${i}</text>`);
        numberLabels.push(`<text x="${cx - 24}" y="${toY(i) + 7}" fill="${palette.number}" font-size="18" font-weight="600" text-anchor="middle">${i}</text>`);
      }
    }

    const hasFullAverages = Object.values(averages).every((value) => value !== null) && x !== null && y !== null;
    const diamondPoints = `${cx},${toY(fp)} ${toX(ip)},${cy} ${cx},${toY(sp)} ${toX(cp)},${cy}`;
    const pointRadius = 9;
    const arrowPadding = 8;
    const pointCanvasX = toX(pointX);
    const pointCanvasY = toY(pointY);
    const deltaX = pointCanvasX - cx;
    const deltaY = pointCanvasY - cy;
    const vectorLength = Math.hypot(deltaX, deltaY);
    const arrowEndX = hasFullAverages && vectorLength > 0 ? pointCanvasX - (deltaX / vectorLength) * (pointRadius + arrowPadding) : pointCanvasX;
    const arrowEndY = hasFullAverages && vectorLength > 0 ? pointCanvasY - (deltaY / vectorLength) * (pointRadius + arrowPadding) : pointCanvasY;
    const arrowPath = hasFullAverages ? `<line x1="${cx}" y1="${cy}" x2="${arrowEndX}" y2="${arrowEndY}" stroke="${palette.arrow}" stroke-width="3.5" marker-end="url(#space-arrow)" />` : "";
    const pointNode = hasFullAverages ? `<circle cx="${pointCanvasX}" cy="${pointCanvasY}" r="${pointRadius}" fill="${palette.pointFill}" stroke="${palette.pointStroke}" stroke-width="4" />` : "";
    const diamondNode = hasFullAverages ? `<polygon points="${diamondPoints}" fill="none" stroke="${palette.diamond}" stroke-width="2" stroke-dasharray="7 6" />` : "";
    const coordinateText = hasFullAverages
      ? `<text x="${Math.min(width - 110, pointCanvasX + 24)}" y="${Math.max(46, pointCanvasY - 18)}" fill="${palette.label}" font-size="20" font-weight="700">(${pointX.toFixed(2)}, ${pointY.toFixed(2)})</text>`
      : "";

    svg.innerHTML = `
      <defs>
        <linearGradient id="space-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#071426" />
          <stop offset="55%" stop-color="#0B1F3A" />
          <stop offset="100%" stop-color="#102B4E" />
        </linearGradient>
        <radialGradient id="space-core-a" cx="18%" cy="18%" r="60%">
          <stop offset="0%" stop-color="${palette.shellA}" />
          <stop offset="100%" stop-color="rgba(56,189,248,0)" />
        </radialGradient>
        <radialGradient id="space-core-b" cx="82%" cy="82%" r="60%">
          <stop offset="0%" stop-color="${palette.shellB}" />
          <stop offset="100%" stop-color="rgba(138,31,53,0)" />
        </radialGradient>
        <marker id="space-arrow" markerWidth="5.2" markerHeight="5.2" refX="4.1" refY="1.75" orient="auto">
          <polygon points="0 0, 4.1 1.75, 0 3.5" fill="${palette.arrow}"></polygon>
        </marker>
        <filter id="space-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#38BDF8" flood-opacity="0.18" />
        </filter>
        <filter id="space-point-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="#F59E0B" flood-opacity="0.45" />
        </filter>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" rx="28" fill="url(#space-bg)" />
      <rect x="0" y="0" width="${width}" height="${height}" rx="28" fill="url(#space-core-a)" />
      <rect x="0" y="0" width="${width}" height="${height}" rx="28" fill="url(#space-core-b)" />
      <rect x="40" y="40" width="${cx - 40}" height="${cy - 40}" fill="${palette.quadrantConservative}" />
      <rect x="${cx}" y="40" width="${width - cx - 40}" height="${cy - 40}" fill="${palette.quadrantAggressive}" />
      <rect x="40" y="${cy}" width="${cx - 40}" height="${height - cy - 40}" fill="${palette.quadrantDefensive}" />
      <rect x="${cx}" y="${cy}" width="${width - cx - 40}" height="${height - cy - 40}" fill="${palette.quadrantCompetitive}" />
      ${gridLines.join("")}
      <line x1="${toX(-7)}" y1="${cy}" x2="${toX(7)}" y2="${cy}" stroke="${palette.axis}" stroke-width="3" />
      <line x1="${cx}" y1="${toY(-7)}" x2="${cx}" y2="${toY(7)}" stroke="${palette.axis}" stroke-width="3" />
      <line x1="${toX(-7)}" y1="${toY(7)}" x2="${toX(7)}" y2="${toY(-7)}" stroke="${palette.axisMuted}" stroke-width="1.5" stroke-dasharray="6 6" />
      <line x1="${toX(-7)}" y1="${toY(-7)}" x2="${toX(7)}" y2="${toY(7)}" stroke="${palette.axisMuted}" stroke-width="1.5" stroke-dasharray="6 6" />
      <rect x="${cx - 74}" y="${toY(7) - 62}" width="148" height="54" rx="18" fill="${palette.panelFill}" stroke="${palette.panelStroke}" stroke-width="3" />
      <rect x="${toX(-7) - 148}" y="${cy - 28}" width="140" height="56" rx="18" fill="${palette.panelFill}" stroke="${palette.panelStroke}" stroke-width="3" />
      <rect x="${toX(7) + 12}" y="${cy - 28}" width="140" height="56" rx="18" fill="${palette.panelFill}" stroke="${palette.panelStroke}" stroke-width="3" />
      <rect x="${cx - 74}" y="${toY(-7) + 14}" width="148" height="54" rx="18" fill="${palette.panelFill}" stroke="${palette.panelStroke}" stroke-width="3" />
      <text x="${cx}" y="${toY(7) - 27}" fill="${palette.label}" font-size="24" font-weight="700" text-anchor="middle">FP</text>
      <text x="${toX(-7) - 78}" y="${cy + 8}" fill="${palette.label}" font-size="24" font-weight="700" text-anchor="middle">CP</text>
      <text x="${toX(7) + 82}" y="${cy + 8}" fill="${palette.label}" font-size="24" font-weight="700" text-anchor="middle">IP</text>
      <text x="${cx}" y="${toY(-7) + 48}" fill="${palette.label}" font-size="24" font-weight="700" text-anchor="middle">SP</text>
      <text x="${cx - 205}" y="88" fill="${palette.label}" font-size="26" font-weight="700" text-anchor="middle">Conservative</text>
      <text x="${cx + 205}" y="88" fill="${palette.label}" font-size="26" font-weight="700" text-anchor="middle">Aggressive</text>
      <text x="${cx - 205}" y="${height - 62}" fill="${palette.label}" font-size="26" font-weight="700" text-anchor="middle">Defensive</text>
      <text x="${cx + 205}" y="${height - 62}" fill="${palette.label}" font-size="26" font-weight="700" text-anchor="middle">Competitive</text>
      ${numberLabels.join("")}
      <g filter="url(#space-glow)">${diamondNode}${arrowPath}</g>
      <g filter="url(#space-point-glow)">${pointNode}</g>
      ${coordinateText}
    `;

    if (coordLabel) {
      coordLabel.textContent = hasFullAverages ? `(${pointX.toFixed(2)}; ${pointY.toFixed(2)})` : "(-; -)";
    }
    if (quadrantLabel) {
      quadrantLabel.textContent = quadrant;
    }
  }

  function attachSpaceInteractions() {
    if (document.body.dataset.page !== "phase-space") return;
    createSpaceInputRows();
    hydrateSpaceRows();
    updateSpaceSummary(getSpaceState());

    document.addEventListener("input", (event) => {
      const row = event.target.closest("[data-space-row-id]");
      if (!row) return;
      const dimension = row.dataset.spaceDimension;
      const index = Number(row.dataset.spaceIndex || 0);
      const config = SPACE_DIMENSIONS[dimension];
      if (!config) return;
      const state = readSpaceStateFromDom();
      const numeric = Number.parseFloat(state[dimension][index].value);
      if (!Number.isNaN(numeric)) {
        if (numeric < config.min) state[dimension][index].value = String(config.min);
        if (numeric > config.max) state[dimension][index].value = String(config.max);
      }
      setSpaceState(state);
      updateSpaceSummary(state);
    });
  }

  function getCurrentAnalysisYear() {
    const browserYear = new Date().getFullYear();
    if (Number.isFinite(browserYear) && browserYear >= 2000) {
      return browserYear;
    }
    return 2026;
  }

  function buildInitialBcgState() {
    return {
      marketShares: {
        company: "25",
        competitor1: "30",
        competitor2: "10",
        competitor3: "35",
      },
      revenues: {
        previous: "300",
        current: "325",
      },
    };
  }

  function getBcgState() {
    const fallback = buildInitialBcgState();
    const saved = safeReadJson(BCG_STORAGE_KEY, fallback);
    return {
      marketShares: {
        company: saved?.marketShares?.company ?? fallback.marketShares.company,
        competitor1: saved?.marketShares?.competitor1 ?? fallback.marketShares.competitor1,
        competitor2: saved?.marketShares?.competitor2 ?? fallback.marketShares.competitor2,
        competitor3: saved?.marketShares?.competitor3 ?? fallback.marketShares.competitor3,
      },
      revenues: {
        previous: saved?.revenues?.previous ?? fallback.revenues.previous,
        current: saved?.revenues?.current ?? fallback.revenues.current,
      },
    };
  }

  function setBcgState(state) {
    return safeWriteJson(BCG_STORAGE_KEY, state);
  }

  function buildInitialIntersectionState() {
    return {
      gates: {},
    };
  }

  function getIntersectionState() {
    const fallback = buildInitialIntersectionState();
    const saved = safeReadJson(INTERSECTION_STORAGE_KEY, fallback);
    return {
      gates: typeof saved?.gates === "object" && saved.gates !== null ? saved.gates : {},
    };
  }

  function setIntersectionState(state) {
    return safeWriteJson(INTERSECTION_STORAGE_KEY, {
      gates: state?.gates || {},
    });
  }

  function getStrategyCategoryByType(strategyType) {
    return INTERSECTION_STRATEGY_LIBRARY.find((entry) => entry.type === strategyType)?.category || "General";
  }

  function isIntegrationStrategy(strategyType) {
    return getStrategyCategoryByType(strategyType) === "Integration";
  }

  function getSpaceRecommendedStrategyTypes(quadrant) {
    const map = {
      Aggressive: [
        "Market Penetration",
        "Market Development",
        "Product Development",
        "Backward Integration",
        "Forward Integration",
        "Horizontal Integration",
        "Related Diversification",
        "Unrelated Diversification",
      ],
      Conservative: ["Market Penetration", "Market Development", "Product Development", "Related Diversification"],
      Defensive: ["Retrenchment", "Divestiture", "Liquidation", "Related Diversification"],
      Competitive: [
        "Backward Integration",
        "Forward Integration",
        "Horizontal Integration",
        "Market Penetration",
        "Market Development",
        "Product Development",
      ],
    };
    return map[quadrant] || [];
  }

  function getBcgRecommendedStrategyTypes(quadrant) {
    const map = {
      Stars: [
        "Market Penetration",
        "Market Development",
        "Product Development",
        "Backward Integration",
        "Forward Integration",
        "Horizontal Integration",
      ],
      "Question Marks": ["Market Penetration", "Market Development", "Product Development", "Divestiture"],
      "Cash Cows": ["Product Development", "Related Diversification", "Unrelated Diversification", "Retrenchment"],
      Dogs: ["Retrenchment", "Divestiture", "Liquidation"],
    };
    return map[quadrant] || [];
  }

  function getIeRecommendedStrategyTypes(zone) {
    const map = {
      "Grow & Build": [
        "Market Penetration",
        "Market Development",
        "Product Development",
        "Backward Integration",
        "Forward Integration",
        "Horizontal Integration",
      ],
      "Hold & Maintain": ["Market Penetration", "Product Development"],
      "Harvest/Divest": ["Retrenchment", "Divestiture"],
    };
    return map[zone] || [];
  }

  function getBcgNames() {
    const cpmSettings = getCpmSettings();
    return {
      company: getPhase0CompanyName() || cpmSettings.companyName || "Perusahaan User",
      competitor1: cpmSettings.competitor1Name || "Competitor 1",
      competitor2: cpmSettings.competitor2Name || "Competitor 2",
      competitor3: cpmSettings.competitor3Name || "Competitor 3",
    };
  }

  function getBcgCompanyEntries(state = getBcgState()) {
    const names = getBcgNames();
    const baseEntries = [
      { id: "competitor1", name: names.competitor1, marketShare: Number.parseFloat(state.marketShares.competitor1) || 0 },
      { id: "competitor2", name: names.competitor2, marketShare: Number.parseFloat(state.marketShares.competitor2) || 0 },
      { id: "competitor3", name: names.competitor3, marketShare: Number.parseFloat(state.marketShares.competitor3) || 0 },
      { id: "company", name: names.company, marketShare: Number.parseFloat(state.marketShares.company) || 0 },
    ];
    const leaderShare = Math.max(...baseEntries.map((entry) => entry.marketShare), 0);
    const leader = baseEntries.find((entry) => entry.marketShare === leaderShare) || baseEntries[0];

    return baseEntries.map((entry) => {
      const rmspRaw = leaderShare > 0 ? entry.marketShare / leaderShare : 0;
      const rmsp = entry.marketShare === leaderShare && leaderShare > 0 ? 1 : Math.min(1, rmspRaw);
      return {
        ...entry,
        rmsp,
        isLeader: leaderShare > 0 && entry.marketShare === leaderShare,
        leaderShare,
        leaderName: leader?.name || "-",
      };
    });
  }

  function getBcgMetrics(state = getBcgState()) {
    const entries = getBcgCompanyEntries(state);
    const totalMarketShare = entries.reduce((sum, entry) => sum + entry.marketShare, 0);
    const marketShareBalanced = Math.abs(totalMarketShare - 100) < 0.001;
    const company = entries.find((entry) => entry.id === "company") || entries[0];
    const leader = entries.find((entry) => entry.isLeader) || entries[0];
    const previousRevenue = Number.parseFloat(state.revenues.previous);
    const currentRevenue = Number.parseFloat(state.revenues.current);
    const igr =
      !Number.isNaN(previousRevenue) && previousRevenue > 0 && !Number.isNaN(currentRevenue)
        ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
        : null;
    const rmsp = company ? company.rmsp : null;
    let quadrant = "Incomplete";
    if (marketShareBalanced && rmsp !== null && igr !== null) {
      if (rmsp >= 0.5 && igr >= 10) quadrant = "Stars";
      else if (rmsp < 0.5 && igr >= 10) quadrant = "Question Marks";
      else if (rmsp >= 0.5 && igr < 10) quadrant = "Cash Cows";
      else quadrant = "Dogs";
    }

    const strategyMap = {
      "Question Marks": "Intensive atau Divestiture",
      Stars: "Market Penetration, Market Development, Product Development, Integration",
      "Cash Cows": "Product Development, Diversification, Retrenchment",
      Dogs: "Retrenchment, Divestiture, Liquidation",
      Incomplete: "Lengkapi market share dan revenue untuk membaca kuadran.",
    };

    return {
      entries,
      company,
      leader,
      totalMarketShare,
      marketShareBalanced,
      previousRevenue: Number.isNaN(previousRevenue) ? null : previousRevenue,
      currentRevenue: Number.isNaN(currentRevenue) ? null : currentRevenue,
      igr,
      rmsp,
      quadrant,
      strategy: strategyMap[quadrant] || "-",
    };
  }

  function renderBcgMarketTable() {
    const tbody = document.querySelector("[data-bcg-market-body]");
    if (!tbody) return;
    const state = getBcgState();
    const entries = getBcgCompanyEntries(state);
    const order = ["competitor1", "competitor2", "competitor3", "company"];

    tbody.innerHTML = order
      .map((id, index) => {
        const entry = entries.find((item) => item.id === id);
        if (!entry) return "";
        const rowTone = index % 2 === 0 ? "bg-white/5" : "bg-navy-surface/40";
        const shareValue = state.marketShares[id] ?? "";
        return `
          <tr class="${rowTone}">
            <td class="px-3 py-3 text-soft-white">${entry.name}${id === "company" ? ' <span class="ml-2 rounded-full border border-info/30 bg-info/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-info">User</span>' : ""}</td>
            <td class="px-3 py-3">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value="${shareValue}"
                data-managed-action="true"
                data-field-key="phase-6::market-share-${id}"
                data-bcg-market-share="${id}"
                class="w-28 rounded-xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white"
              />
            </td>
            <td class="px-3 py-3 font-mono text-soft-white">${entry.rmsp.toFixed(2)}</td>
          </tr>
        `;
      })
      .join("");
  }

  function renderBcgRankingTable(metrics = getBcgMetrics()) {
    const tbody = document.querySelector("[data-bcg-ranking-body]");
    if (!tbody) return;
    const rows = [...metrics.entries].sort((a, b) => b.marketShare - a.marketShare || a.name.localeCompare(b.name));
    tbody.innerHTML = rows
      .map((entry, index) => {
        const rowTone = index % 2 === 0 ? "bg-white/5" : "bg-black/10";
        return `
          <tr class="${rowTone}">
            <td class="px-3 py-3 text-soft-white">${entry.name}</td>
            <td class="px-3 py-3 font-mono text-soft-white">${entry.marketShare.toFixed(1)}%</td>
            <td class="px-3 py-3 font-mono text-soft-white">${entry.rmsp.toFixed(2)}</td>
            <td class="px-3 py-3">
              ${entry.isLeader ? '<span class="rounded-full border border-success/30 bg-success/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-success">Leader</span>' : '<span class="text-cool-gray">Follower</span>'}
            </td>
          </tr>
        `;
      })
      .join("");
  }

  function hydrateBcgInputs() {
    const state = getBcgState();
    document.querySelectorAll("[data-bcg-market-share]").forEach((input) => {
      const key = input.dataset.bcgMarketShare;
      if (!key) return;
      input.value = state.marketShares[key] ?? "";
    });
    const previousInput = document.querySelector('[data-bcg-revenue="previous"]');
    const currentInput = document.querySelector('[data-bcg-revenue="current"]');
    if (previousInput) previousInput.value = state.revenues.previous ?? "";
    if (currentInput) currentInput.value = state.revenues.current ?? "";
  }

  function updateBcgLabels() {
    const names = getBcgNames();
    const currentYear = getCurrentAnalysisYear();
    document.querySelectorAll("[data-bcg-company-label]").forEach((node) => {
      const key = node.dataset.bcgCompanyLabel;
      if (!key) return;
      node.textContent = names[key] || "";
    });
    document.querySelectorAll('[data-bcg-year="previous"]').forEach((node) => {
      node.textContent = String(currentYear - 1);
    });
    document.querySelectorAll('[data-bcg-year="current"]').forEach((node) => {
      node.textContent = String(currentYear);
    });
  }

  function readBcgStateFromDom() {
    const state = buildInitialBcgState();
    document.querySelectorAll("[data-bcg-market-share]").forEach((input) => {
      const key = input.dataset.bcgMarketShare;
      if (!key) return;
      state.marketShares[key] = input.value || "";
    });
    const previousInput = document.querySelector('[data-bcg-revenue="previous"]');
    const currentInput = document.querySelector('[data-bcg-revenue="current"]');
    state.revenues.previous = previousInput?.value || "";
    state.revenues.current = currentInput?.value || "";
    return state;
  }

  function renderBcgDiagram(metrics = getBcgMetrics()) {
    const svg = document.querySelector("[data-bcg-diagram]");
    const pointLabel = document.querySelector('[data-bcg-summary="point-label"]');
    if (!svg) return;

    const width = 980;
    const height = 760;
    const plotLeft = 120;
    const plotTop = 120;
    const plotWidth = 720;
    const plotHeight = 520;
    const plotRight = plotLeft + plotWidth;
    const plotBottom = plotTop + plotHeight;
    const xThreshold = plotLeft + plotWidth / 2;
    const yThreshold = plotTop + plotHeight / 2;
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const xFor = (rmsp) => plotLeft + clamp(rmsp, 0, 1) * plotWidth;
    const yFor = (igr) => plotTop + ((20 - clamp(igr, 0, 20)) / 20) * plotHeight;
    const rmsp = metrics.rmsp ?? 0;
    const igr = metrics.igr ?? 0;
    const pointX = xFor(rmsp);
    const pointY = yFor(igr);
    const bubbleRadius = clamp(10 + (metrics.company?.marketShare || 0) * 0.18, 14, 28);

    svg.innerHTML = `
      <defs>
        <linearGradient id="bcg-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#071426" />
          <stop offset="50%" stop-color="#0B1F3A" />
          <stop offset="100%" stop-color="#102B4E" />
        </linearGradient>
        <filter id="bcg-bubble-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="#38BDF8" flood-opacity="0.30" />
        </filter>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" rx="28" fill="url(#bcg-bg)" />
      <rect x="${plotLeft}" y="${plotTop}" width="${plotWidth}" height="${plotHeight}" rx="28" fill="rgba(255,255,255,0.02)" stroke="#38BDF8" stroke-width="2.5" />
      <rect x="${plotLeft}" y="${plotTop}" width="${plotWidth / 2}" height="${plotHeight / 2}" fill="rgba(34,197,94,0.08)" />
      <rect x="${xThreshold}" y="${plotTop}" width="${plotWidth / 2}" height="${plotHeight / 2}" fill="rgba(56,189,248,0.08)" />
      <rect x="${plotLeft}" y="${yThreshold}" width="${plotWidth / 2}" height="${plotHeight / 2}" fill="rgba(245,158,11,0.08)" />
      <rect x="${xThreshold}" y="${yThreshold}" width="${plotWidth / 2}" height="${plotHeight / 2}" fill="rgba(138,31,53,0.12)" />
      <line x1="${xThreshold}" y1="${plotTop}" x2="${xThreshold}" y2="${plotBottom}" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="6 6" />
      <line x1="${plotLeft}" y1="${yThreshold}" x2="${plotRight}" y2="${yThreshold}" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="6 6" />

      <text x="${width / 2}" y="62" fill="#D6E4F0" font-size="30" font-weight="700" text-anchor="middle">Relative Market Share Position (RMSP)</text>

      <text x="42" y="${height / 2}" fill="#D6E4F0" font-size="28" font-weight="700" text-anchor="middle" transform="rotate(-90 42 ${height / 2})">Industry Growth Rate (IGR)</text>
      <text x="${plotLeft - 40}" y="${plotTop + 8}" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">High</text>
      <text x="${plotLeft - 40}" y="${plotTop + 32}" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">20%</text>
      <text x="${plotLeft - 40}" y="${yThreshold + 8}" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">Medium</text>
      <text x="${plotLeft - 40}" y="${yThreshold + 32}" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">10%</text>
      <text x="${plotLeft - 40}" y="${plotBottom - 4}" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">Low</text>
      <text x="${plotLeft - 40}" y="${plotBottom + 20}" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">0%</text>
      <text x="${plotLeft}" y="${plotBottom + 30}" fill="#C9D7E5" font-size="20" font-weight="700" text-anchor="middle">Low</text>
      <text x="${plotLeft}" y="${plotBottom + 56}" fill="#C9D7E5" font-size="20" font-weight="700" text-anchor="middle">0.0</text>
      <text x="${xThreshold}" y="${plotBottom + 30}" fill="#C9D7E5" font-size="20" font-weight="700" text-anchor="middle">Medium</text>
      <text x="${xThreshold}" y="${plotBottom + 56}" fill="#C9D7E5" font-size="20" font-weight="700" text-anchor="middle">0.5</text>
      <text x="${plotRight}" y="${plotBottom + 30}" fill="#C9D7E5" font-size="20" font-weight="700" text-anchor="middle">High</text>
      <text x="${plotRight}" y="${plotBottom + 56}" fill="#C9D7E5" font-size="20" font-weight="700" text-anchor="middle">1.0</text>

      <text x="${plotLeft + plotWidth * 0.25}" y="${plotTop + 54}" fill="#F8FAFC" font-size="26" font-weight="700" text-anchor="middle">I - QUESTION MARKS</text>
      <text x="${plotLeft + plotWidth * 0.75}" y="${plotTop + 54}" fill="#F8FAFC" font-size="26" font-weight="700" text-anchor="middle">II - STARS</text>
      <text x="${plotLeft + plotWidth * 0.25}" y="${yThreshold + 54}" fill="#F8FAFC" font-size="26" font-weight="700" text-anchor="middle">IV - DOGS</text>
      <text x="${plotLeft + plotWidth * 0.75}" y="${yThreshold + 54}" fill="#F8FAFC" font-size="26" font-weight="700" text-anchor="middle">III - CASH COWS</text>

      <text x="${plotLeft + 48}" y="${plotTop + 104}" fill="#D6E4F0" font-size="18" font-weight="700">Strategies:</text>
      <text x="${plotLeft + 48}" y="${plotTop + 132}" fill="#C9D7E5" font-size="15">
        <tspan x="${plotLeft + 48}" dy="0">Intensive Strategies</tspan>
        <tspan x="${plotLeft + 48}" dy="24">atau Divestiture</tspan>
      </text>
      <text x="${xThreshold + 48}" y="${plotTop + 104}" fill="#D6E4F0" font-size="18" font-weight="700">Strategies:</text>
      <text x="${xThreshold + 48}" y="${plotTop + 132}" fill="#C9D7E5" font-size="15">
        <tspan x="${xThreshold + 48}" dy="0">Market Penetration, Market Development,</tspan>
        <tspan x="${xThreshold + 48}" dy="24">Product Development, Integration</tspan>
      </text>
      <text x="${plotLeft + 48}" y="${yThreshold + 104}" fill="#D6E4F0" font-size="18" font-weight="700">Strategies:</text>
      <text x="${plotLeft + 48}" y="${yThreshold + 132}" fill="#C9D7E5" font-size="15">
        <tspan x="${plotLeft + 48}" dy="0">Retrenchment, Divestiture,</tspan>
        <tspan x="${plotLeft + 48}" dy="24">Liquidation</tspan>
      </text>
      <text x="${xThreshold + 48}" y="${yThreshold + 104}" fill="#D6E4F0" font-size="18" font-weight="700">Strategies:</text>
      <text x="${xThreshold + 48}" y="${yThreshold + 132}" fill="#C9D7E5" font-size="15">
        <tspan x="${xThreshold + 48}" dy="0">Product Development, Diversification,</tspan>
        <tspan x="${xThreshold + 48}" dy="24">Retrenchment</tspan>
      </text>

      ${
        metrics.quadrant !== "Incomplete"
          ? `
            <g filter="url(#bcg-bubble-glow)">
              <circle cx="${pointX}" cy="${pointY}" r="${bubbleRadius + 8}" fill="rgba(56,189,248,0.10)" />
              <circle cx="${pointX}" cy="${pointY}" r="${bubbleRadius}" fill="rgba(56,189,248,0.88)" stroke="#071426" stroke-width="4" />
            </g>
            <text x="${Math.min(plotRight - 8, pointX + bubbleRadius + 14)}" y="${Math.max(plotTop + 26, pointY - 14)}" fill="#F8FAFC" font-size="20" font-weight="700">(${rmsp.toFixed(2)}; ${igr.toFixed(1)})</text>
          `
          : ""
      }
    `;

    if (pointLabel) {
      pointLabel.textContent = metrics.quadrant === "Incomplete" ? "(-; -)" : `(${rmsp.toFixed(2)}; ${igr.toFixed(1)})`;
    }
  }

  function updateBcgSummary(state = getBcgState()) {
    updateBcgLabels();
    const metrics = getBcgMetrics(state);
    renderBcgRankingTable(metrics);
    renderBcgDiagram(metrics);

    const summary = {
      "leader-name": metrics.leader?.name || "-",
      "leader-share": metrics.leader ? `${metrics.leader.marketShare.toFixed(1)}%` : "-",
      "market-share-total": `${metrics.totalMarketShare.toFixed(1)}%`,
      rmsp: metrics.rmsp !== null ? metrics.rmsp.toFixed(2) : "-",
      igr: metrics.igr !== null ? `${metrics.igr.toFixed(1)}%` : "-",
      quadrant: metrics.quadrant,
      strategy: metrics.strategy,
    };

    Object.entries(summary).forEach(([key, value]) => {
      document.querySelectorAll(`[data-bcg-summary="${key}"]`).forEach((node) => {
        node.textContent = value;
      });
    });

    const statusNode = document.querySelector('[data-bcg-summary="status"]');
    if (statusNode) {
      const sharesValid = metrics.entries.some((entry) => entry.marketShare > 0);
      if (!sharesValid) {
        statusNode.textContent = "Isi market share perusahaan dan kompetitor untuk mendeteksi market leader.";
        statusNode.className = "mt-4 text-sm text-amber-200";
      } else if (!metrics.marketShareBalanced) {
        const difference = 100 - metrics.totalMarketShare;
        const instruction =
          difference > 0
            ? `Total market share masih kurang ${difference.toFixed(1)}%. Sesuaikan hingga tepat 100.0%.`
            : `Total market share melebihi ${Math.abs(difference).toFixed(1)}%. Kurangi hingga tepat 100.0%.`;
        statusNode.textContent = instruction;
        statusNode.className = "mt-4 text-sm text-amber-200";
      } else if (metrics.igr === null) {
        statusNode.textContent = "Isi revenue tahun sebelumnya dan tahun berjalan untuk menghitung IGR.";
        statusNode.className = "mt-4 text-sm text-amber-200";
      } else {
        statusNode.textContent = `Leader industri saat ini adalah ${metrics.leader?.name || "-"}. RMSP perusahaan user dihitung relatif terhadap market leader dan IGR memakai asumsi growth industri yang sama dengan perusahaan user.`;
        statusNode.className = "mt-4 text-sm text-emerald-200";
      }
    }

    const shareStatusNode = document.querySelector('[data-bcg-summary="market-share-status"]');
    if (shareStatusNode) {
      if (metrics.marketShareBalanced) {
        shareStatusNode.textContent = "Total market share sudah tepat 100.0%.";
        shareStatusNode.className = "mt-3 text-sm text-emerald-200";
      } else {
        const difference = 100 - metrics.totalMarketShare;
        shareStatusNode.textContent =
          difference > 0
            ? `Total market share baru ${metrics.totalMarketShare.toFixed(1)}%. Tambahkan ${difference.toFixed(1)}% agar tepat 100.0%.`
            : `Total market share menjadi ${metrics.totalMarketShare.toFixed(1)}%. Kurangi ${Math.abs(difference).toFixed(1)}% agar kembali ke 100.0%.`;
        shareStatusNode.className = "mt-3 text-sm text-amber-200";
      }
    }

    const analysisNode = document.querySelector('[data-bcg-summary="analysis"]');
    if (analysisNode) {
      if (!metrics.marketShareBalanced) {
        analysisNode.textContent = "Analisis BCG belum final karena total market share seluruh perusahaan harus tepat 100.0% sebelum RMSP dibaca sebagai posisi industri yang konsisten.";
      } else if (metrics.quadrant === "Incomplete") {
        analysisNode.textContent = "Lengkapi market share dan revenue untuk membaca posisi BCG Matrix.";
      } else {
        const companyName = metrics.company?.name || "Perusahaan User";
        const narrativeMap = {
          Stars: `${companyName} berada di kuadran Stars karena RMSP ${metrics.rmsp.toFixed(2)} dan IGR ${metrics.igr.toFixed(1)}%. Posisi ini menunjukkan pangsa pasar relatif kuat di industri yang masih tumbuh cepat, sehingga strategi pertumbuhan agresif masih relevan.`,
          "Question Marks": `${companyName} berada di kuadran Question Marks karena RMSP ${metrics.rmsp.toFixed(2)} masih di bawah 0.50, tetapi IGR ${metrics.igr.toFixed(1)}% berada pada area pertumbuhan tinggi. Bisnis masih memerlukan investasi dan keputusan tegas untuk diperkuat atau dilepas.`,
          "Cash Cows": `${companyName} berada di kuadran Cash Cows karena RMSP ${metrics.rmsp.toFixed(2)} sudah kuat, tetapi IGR ${metrics.igr.toFixed(1)}% berada di bawah batas 10%. Bisnis ini cenderung menjadi penghasil kas yang bisa mendanai strategi pertumbuhan lain.`,
          Dogs: `${companyName} berada di kuadran Dogs karena RMSP ${metrics.rmsp.toFixed(2)} rendah dan IGR ${metrics.igr.toFixed(1)}% juga rendah. Fokus strategi biasanya mengarah pada efisiensi, retrenchment, divestiture, atau liquidation.`,
        };
        analysisNode.textContent = narrativeMap[metrics.quadrant] || "Posisi BCG belum dapat dibaca.";
      }
    }
  }

  function attachBcgInteractions() {
    if (document.body.dataset.page !== "phase-bcg") return;
    renderBcgMarketTable();
    updateBcgLabels();
    hydrateBcgInputs();
    updateBcgSummary(getBcgState());

    document.addEventListener("input", (event) => {
      const marketField = event.target.closest("[data-bcg-market-share]");
      const revenueField = event.target.closest("[data-bcg-revenue]");
      if (!marketField && !revenueField) return;
      const state = readBcgStateFromDom();
      setBcgState(state);
      saveAllFields();
      updateDraftIndicators();
      updateBcgSummary(state);
    });
  }

  function getEfeTotalScore() {
    return getRankedEfeItems().reduce((total, item) => total + Number(item.weightedScore || 0), 0);
  }

  function getIfeTotalScore() {
    return getRankedIfeItems().reduce((total, item) => total + Number(item.weightedScore || 0), 0);
  }

  function getIeBand(score) {
    if (score >= 3) return { level: "high", label: "High", index: 0 };
    if (score >= 2) return { level: "medium", label: "Medium", index: 1 };
    return { level: "low", label: "Low", index: 2 };
  }

  function getIeCell(ifeScore, efeScore) {
    const xBand = getIeBand(ifeScore);
    const yBand = getIeBand(efeScore);
    const cellMap = [
      ["I", "II", "III"],
      ["IV", "V", "VI"],
      ["VII", "VIII", "IX"],
    ];
    const cell = cellMap[yBand.index][xBand.index];
    const zoneMap = {
      I: { zone: "Grow & Build", strategy: "Intensive atau Integration" },
      II: { zone: "Grow & Build", strategy: "Intensive atau Integration" },
      IV: { zone: "Grow & Build", strategy: "Intensive atau Integration" },
      III: { zone: "Hold & Maintain", strategy: "Market Penetration, Product Development" },
      V: { zone: "Hold & Maintain", strategy: "Market Penetration, Product Development" },
      VII: { zone: "Hold & Maintain", strategy: "Market Penetration, Product Development" },
      VI: { zone: "Harvest/Divest", strategy: "Retrenchment, Divestiture" },
      VIII: { zone: "Harvest/Divest", strategy: "Retrenchment, Divestiture" },
      IX: { zone: "Harvest/Divest", strategy: "Retrenchment, Divestiture" },
    };
    return {
      cell,
      xBand,
      yBand,
      ...(zoneMap[cell] || { zone: "-", strategy: "-" }),
    };
  }

  function getIeMetrics() {
    const efeScore = getEfeTotalScore();
    const ifeScore = getIfeTotalScore();
    const hasEfe = getRankedEfeItems().length > 0;
    const hasIfe = getRankedIfeItems().length > 0;
    if (!hasEfe || !hasIfe) {
      return {
        hasEfe,
        hasIfe,
        efeScore: hasEfe ? efeScore : null,
        ifeScore: hasIfe ? ifeScore : null,
        cell: null,
        zone: "Incomplete",
        strategy: "Lengkapi EFE dan IFE terlebih dahulu.",
        xBand: null,
        yBand: null,
      };
    }
    return {
      hasEfe,
      hasIfe,
      efeScore,
      ifeScore,
      ...getIeCell(ifeScore, efeScore),
    };
  }

  function renderIeDiagram(metrics = getIeMetrics()) {
    const svg = document.querySelector("[data-ie-diagram]");
    const pointLabel = document.querySelector('[data-ie-summary="point-label"]');
    if (!svg) return;

    const width = 980;
    const height = 760;
    const plotLeft = 170;
    const plotTop = 110;
    const plotSize = 540;
    const cell = plotSize / 3;
    const plotRight = plotLeft + plotSize;
    const plotBottom = plotTop + plotSize;
    const xFor = (score) => plotLeft + ((Math.min(4, Math.max(1, score)) - 1) / 3) * plotSize;
    const yFor = (score) => plotBottom - ((Math.min(4, Math.max(1, score)) - 1) / 3) * plotSize;
    const pointX = metrics.ifeScore !== null ? xFor(metrics.ifeScore) : null;
    const pointY = metrics.efeScore !== null ? yFor(metrics.efeScore) : null;

    const cellInfo = [
      { id: "I", x: 0, y: 0, fill: "rgba(34,197,94,0.12)", label: "Grow & Build" },
      { id: "II", x: 1, y: 0, fill: "rgba(34,197,94,0.08)", label: "Grow & Build" },
      { id: "III", x: 2, y: 0, fill: "rgba(56,189,248,0.10)", label: "Hold & Maintain" },
      { id: "IV", x: 0, y: 1, fill: "rgba(34,197,94,0.08)", label: "Grow & Build" },
      { id: "V", x: 1, y: 1, fill: "rgba(56,189,248,0.08)", label: "Hold & Maintain" },
      { id: "VI", x: 2, y: 1, fill: "rgba(245,158,11,0.10)", label: "Harvest/Divest" },
      { id: "VII", x: 0, y: 2, fill: "rgba(56,189,248,0.08)", label: "Hold & Maintain" },
      { id: "VIII", x: 1, y: 2, fill: "rgba(245,158,11,0.08)", label: "Harvest/Divest" },
      { id: "IX", x: 2, y: 2, fill: "rgba(138,31,53,0.14)", label: "Harvest/Divest" },
    ];

    svg.innerHTML = `
      <defs>
        <linearGradient id="ie-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#071426" />
          <stop offset="55%" stop-color="#0B1F3A" />
          <stop offset="100%" stop-color="#102B4E" />
        </linearGradient>
        <filter id="ie-bubble-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="#38BDF8" flood-opacity="0.28" />
        </filter>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" rx="28" fill="url(#ie-bg)" />
      ${cellInfo
        .map((entry) => {
          const active = metrics.cell === entry.id;
          const x = plotLeft + entry.x * cell;
          const y = plotTop + entry.y * cell;
          return `
            <rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${entry.fill}" stroke="${active ? "#F8FAFC" : "#38BDF8"}" stroke-width="${active ? 3.5 : 1.5}" />
            <text x="${x + cell / 2}" y="${y + 48}" fill="#F8FAFC" font-size="28" font-weight="700" text-anchor="middle">${entry.id}</text>
            <text x="${x + cell / 2}" y="${y + 86}" fill="#D6E4F0" font-size="18" font-weight="600" text-anchor="middle">${entry.label}</text>
          `;
        })
        .join("")}

      <text x="${plotLeft + plotSize / 2}" y="58" fill="#D6E4F0" font-size="30" font-weight="700" text-anchor="middle">Internal Factor Evaluation (IFE)</text>
      <text x="${plotLeft + cell * 0.5}" y="88" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">Strong</text>
      <text x="${plotLeft + cell * 1.5}" y="88" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">Average</text>
      <text x="${plotLeft + cell * 2.5}" y="88" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">Weak</text>
      <text x="${plotLeft + cell * 0.5}" y="${plotBottom + 30}" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">3.0 - 4.0</text>
      <text x="${plotLeft + cell * 1.5}" y="${plotBottom + 30}" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">2.0 - 2.99</text>
      <text x="${plotLeft + cell * 2.5}" y="${plotBottom + 30}" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">1.0 - 1.99</text>

      <text x="68" y="${plotTop + plotSize / 2}" fill="#D6E4F0" font-size="28" font-weight="700" text-anchor="middle" transform="rotate(-90 68 ${plotTop + plotSize / 2})">External Factor Evaluation (EFE)</text>
      <text x="${plotLeft - 42}" y="${plotTop + cell * 0.5}" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">High</text>
      <text x="${plotLeft - 42}" y="${plotTop + cell * 0.5 + 24}" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">3.0 - 4.0</text>
      <text x="${plotLeft - 42}" y="${plotTop + cell * 1.5}" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">Average</text>
      <text x="${plotLeft - 42}" y="${plotTop + cell * 1.5 + 24}" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">2.0 - 2.99</text>
      <text x="${plotLeft - 42}" y="${plotTop + cell * 2.5}" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">Low</text>
      <text x="${plotLeft - 42}" y="${plotTop + cell * 2.5 + 24}" fill="#C9D7E5" font-size="18" font-weight="700" text-anchor="middle">1.0 - 1.99</text>

      ${
        pointX !== null && pointY !== null
          ? `
            <g filter="url(#ie-bubble-glow)">
              <circle cx="${pointX}" cy="${pointY}" r="18" fill="rgba(56,189,248,0.16)" />
              <circle cx="${pointX}" cy="${pointY}" r="11" fill="#38BDF8" stroke="#071426" stroke-width="4" />
            </g>
            <text x="${Math.min(plotRight - 12, pointX + 22)}" y="${Math.max(plotTop + 20, pointY - 16)}" fill="#F8FAFC" font-size="20" font-weight="700">(${metrics.ifeScore.toFixed(2)}; ${metrics.efeScore.toFixed(2)})</text>
          `
          : ""
      }
    `;

    if (pointLabel) {
      pointLabel.textContent =
        pointX !== null && pointY !== null ? `(${metrics.ifeScore.toFixed(2)}; ${metrics.efeScore.toFixed(2)})` : "(-; -)";
    }
  }

  function updateIeSummary() {
    const metrics = getIeMetrics();
    renderIeDiagram(metrics);
    const mappings = {
      ife: metrics.ifeScore !== null ? metrics.ifeScore.toFixed(2) : "-",
      efe: metrics.efeScore !== null ? metrics.efeScore.toFixed(2) : "-",
      cell: metrics.cell || "Incomplete",
      zone: metrics.zone,
      strategy: metrics.strategy,
    };
    Object.entries(mappings).forEach(([key, value]) => {
      document.querySelectorAll(`[data-ie-summary="${key}"]`).forEach((node) => {
        node.textContent = value;
      });
    });

    const analysisNode = document.querySelector('[data-ie-summary="analysis"]');
    if (analysisNode) {
      if (!metrics.cell) {
        analysisNode.textContent = "IE Matrix belum bisa dibaca karena skor total EFE atau IFE belum tersedia dari phase sebelumnya.";
      } else {
        analysisNode.textContent = `Koordinat IE berada pada IFE ${metrics.ifeScore.toFixed(2)} dan EFE ${metrics.efeScore.toFixed(2)}, sehingga perusahaan masuk sel ${metrics.cell} pada zona ${metrics.zone}. Arah strategi yang paling relevan adalah ${metrics.strategy}.`;
      }
    }

    const statusNode = document.querySelector('[data-ie-summary="status"]');
    if (statusNode) {
      if (!metrics.cell) {
        statusNode.textContent = "Lengkapi dan finalkan tabel EFE serta IFE agar IE Matrix dapat dipetakan.";
        statusNode.className = "mt-4 text-sm text-amber-200";
      } else {
        statusNode.textContent = "IE Matrix tersinkron langsung dari total weighted score EFE dan IFE.";
        statusNode.className = "mt-4 text-sm text-emerald-200";
      }
    }
  }

  function attachIeInteractions() {
    if (document.body.dataset.page !== "phase-ie") return;
    updateIeSummary();
  }

  function buildIntersectionCandidates() {
    const state = getIntersectionState();
    const candidateMap = new Map();
    const touchCandidate = (strategyType, tool, refLabel) => {
      if (!strategyType) return;
      if (!candidateMap.has(strategyType)) {
        candidateMap.set(strategyType, {
          strategyType,
          category: getStrategyCategoryByType(strategyType),
          tools: {
            tows: false,
            space: false,
            bcg: false,
            ie: false,
          },
          refs: {
            tows: [],
            space: [],
            bcg: [],
            ie: [],
          },
        });
      }
      const candidate = candidateMap.get(strategyType);
      candidate.tools[tool] = true;
      if (refLabel && !candidate.refs[tool].includes(refLabel)) {
        candidate.refs[tool].push(refLabel);
      }
    };

    getTowsItems().forEach((item) => {
      touchCandidate(item.strategyType, "tows", `${item.shortLabel}-${item.slot}`);
    });

    const spaceState = getSpaceState();
    const averages = {
      fp: getSpaceDimensionAverage(spaceState, "fp"),
      cp: getSpaceDimensionAverage(spaceState, "cp"),
      sp: getSpaceDimensionAverage(spaceState, "sp"),
      ip: getSpaceDimensionAverage(spaceState, "ip"),
    };
    const spaceX = averages.cp !== null && averages.ip !== null ? averages.cp + averages.ip : null;
    const spaceY = averages.fp !== null && averages.sp !== null ? averages.fp + averages.sp : null;
    const spaceQuadrant = spaceX !== null && spaceY !== null ? getSpaceQuadrant(spaceX, spaceY) : "Incomplete";
    getSpaceRecommendedStrategyTypes(spaceQuadrant).forEach((strategyType) => {
      touchCandidate(strategyType, "space", spaceQuadrant);
    });

    const bcgMetrics = getBcgMetrics();
    getBcgRecommendedStrategyTypes(bcgMetrics.quadrant).forEach((strategyType) => {
      touchCandidate(strategyType, "bcg", bcgMetrics.quadrant);
    });

    const ieMetrics = getIeMetrics();
    getIeRecommendedStrategyTypes(ieMetrics.zone).forEach((strategyType) => {
      touchCandidate(strategyType, "ie", ieMetrics.cell || ieMetrics.zone);
    });

    return Array.from(candidateMap.values())
      .map((candidate) => {
        const toolCount = Object.values(candidate.tools).filter(Boolean).length;
        const gate = state.gates[candidate.strategyType] || {
          status: isIntegrationStrategy(candidate.strategyType) ? "pending" : "not-required",
          justification: "",
        };
        const integrationBlocked = isIntegrationStrategy(candidate.strategyType) && gate.status !== "approved";
        const priority =
          toolCount >= 3
            ? "Prioritas Utama"
            : toolCount === 2
              ? "Kandidat dengan Catatan"
              : "Butuh Justifikasi Eksplisit";
        const readiness = integrationBlocked
          ? "Blocked by Integration Gate"
          : toolCount >= 2
            ? "Ready for QSPM"
            : "Needs explicit justification";
        return {
          ...candidate,
          toolCount,
          gateStatus: gate.status,
          gateJustification: gate.justification || "",
          priority,
          readiness,
          integrationBlocked,
        };
      })
      .sort((a, b) => b.toolCount - a.toolCount || a.strategyType.localeCompare(b.strategyType));
  }

  function getIntersectionToolSummary(candidates) {
    const spaceState = getSpaceState();
    const averages = {
      fp: getSpaceDimensionAverage(spaceState, "fp"),
      cp: getSpaceDimensionAverage(spaceState, "cp"),
      sp: getSpaceDimensionAverage(spaceState, "sp"),
      ip: getSpaceDimensionAverage(spaceState, "ip"),
    };
    const spaceX = averages.cp !== null && averages.ip !== null ? averages.cp + averages.ip : null;
    const spaceY = averages.fp !== null && averages.sp !== null ? averages.fp + averages.sp : null;
    const spaceQuadrant = spaceX !== null && spaceY !== null ? getSpaceQuadrant(spaceX, spaceY) : "Incomplete";
    const bcgMetrics = getBcgMetrics();
    const ieMetrics = getIeMetrics();

    return {
      tows: getTowsItems().length,
      space: spaceQuadrant,
      bcg: bcgMetrics.quadrant,
      ie: ieMetrics.cell || "-",
      candidates: candidates.length,
    };
  }

  function renderIntersectionCandidates(candidates) {
    const tbody = document.querySelector("[data-intersection-body]");
    if (!tbody) return;
    if (!candidates.length) {
      tbody.innerHTML = `<tr class="bg-white/5"><td colspan="11" class="px-4 py-5 text-sm text-cool-gray">Belum ada strategi yang bisa disintesis. Lengkapi TOWS, SPACE, BCG, dan IE terlebih dahulu.</td></tr>`;
      return;
    }
    const toolBadge = (enabled, label) =>
      enabled
        ? `<span class="inline-flex rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-emerald-100">${label}</span>`
        : `<span class="text-cool-gray">-</span>`;
    const gateBadge = (candidate) => {
      if (!isIntegrationStrategy(candidate.strategyType)) {
        return '<span class="inline-flex rounded-full border border-border-blue bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-cool-gray">Not Required</span>';
      }
      const toneMap = {
        approved: "border-success/30 bg-success/10 text-emerald-100",
        pending: "border-warning/30 bg-warning/10 text-amber-100",
        hold: "border-error/30 bg-error/10 text-rose-100",
      };
      const labelMap = {
        approved: "Approved",
        pending: "Pending",
        hold: "Hold",
      };
      return `<span class="inline-flex rounded-full px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] ${toneMap[candidate.gateStatus] || toneMap.pending}">${labelMap[candidate.gateStatus] || "Pending"}</span>`;
    };
    tbody.innerHTML = candidates
      .map((candidate, index) => {
        const rowTone = index % 2 === 0 ? "bg-white/5" : "bg-black/10";
        const refs = ["tows", "space", "bcg", "ie"]
          .filter((tool) => candidate.refs[tool].length)
          .map((tool) => `${tool.toUpperCase()}: ${candidate.refs[tool].join(", ")}`)
          .join(" | ");
        return `
          <tr class="${rowTone}">
            <td class="px-4 py-3 text-soft-white">${candidate.strategyType}</td>
            <td class="px-4 py-3"><span class="inline-flex rounded-full border border-info/30 bg-info/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-sky-100">${candidate.category}</span></td>
            <td class="px-4 py-3">${toolBadge(candidate.tools.tows, "TOWS")}</td>
            <td class="px-4 py-3">${toolBadge(candidate.tools.space, "SPACE")}</td>
            <td class="px-4 py-3">${toolBadge(candidate.tools.bcg, "BCG")}</td>
            <td class="px-4 py-3">${toolBadge(candidate.tools.ie, "IE")}</td>
            <td class="px-4 py-3 font-mono text-soft-white">${candidate.toolCount}</td>
            <td class="px-4 py-3 text-soft-white">${candidate.priority}</td>
            <td class="px-4 py-3">${gateBadge(candidate)}</td>
            <td class="px-4 py-3 text-soft-white">${candidate.readiness}</td>
            <td class="px-4 py-3 text-cool-gray">${refs || "-"}</td>
          </tr>
        `;
      })
      .join("");
  }

  function renderIntegrationGateTable(candidates) {
    const tbody = document.querySelector("[data-integration-gate-body]");
    if (!tbody) return;
    const integrationCandidates = candidates.filter((candidate) => isIntegrationStrategy(candidate.strategyType));
    if (!integrationCandidates.length) {
      tbody.innerHTML = `<tr class="bg-white/5"><td colspan="5" class="px-4 py-5 text-sm text-cool-gray">Belum ada strategi kategori Integration yang perlu melewati gate.</td></tr>`;
      return;
    }
    tbody.innerHTML = integrationCandidates
      .map((candidate, index) => {
        const rowTone = index % 2 === 0 ? "bg-white/5" : "bg-black/10";
        return `
          <tr class="${rowTone}" data-integration-row="${candidate.strategyType}">
            <td class="px-4 py-3 text-soft-white">${candidate.strategyType}</td>
            <td class="px-4 py-3 font-mono text-soft-white">${candidate.toolCount}</td>
            <td class="px-4 py-3 text-cool-gray">${["tows", "space", "bcg", "ie"].filter((tool) => candidate.tools[tool]).map((tool) => tool.toUpperCase()).join(", ")}</td>
            <td class="px-4 py-3">
              <select data-integration-field="status" data-strategy-type="${candidate.strategyType}" class="w-full rounded-2xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white">
                <option value="pending"${candidate.gateStatus === "pending" ? " selected" : ""}>Pending</option>
                <option value="approved"${candidate.gateStatus === "approved" ? " selected" : ""}>Approved</option>
                <option value="hold"${candidate.gateStatus === "hold" ? " selected" : ""}>Hold</option>
              </select>
            </td>
            <td class="px-4 py-3">
              <textarea data-integration-field="justification" data-strategy-type="${candidate.strategyType}" placeholder="Justifikasi eksplisit untuk strategi integration" class="min-h-24 w-full rounded-2xl border border-border-blue bg-navy-deep px-3 py-2 text-sm text-soft-white placeholder:text-cool-gray">${candidate.gateJustification || ""}</textarea>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  function generateUmbrellaStrategies(candidates) {
    const readyCandidates = candidates.filter((candidate) => !candidate.integrationBlocked);
    const buckets = [
      {
        title: "Market Expansion Umbrella",
        filter: (candidate) => ["Market Penetration", "Market Development"].includes(candidate.strategyType),
      },
      {
        title: "Product Development Umbrella",
        filter: (candidate) => candidate.strategyType === "Product Development",
      },
      {
        title: "Integration Control Umbrella",
        filter: (candidate) => isIntegrationStrategy(candidate.strategyType),
      },
      {
        title: "Portfolio Diversification Umbrella",
        filter: (candidate) => ["Related Diversification", "Unrelated Diversification"].includes(candidate.strategyType),
      },
      {
        title: "Efficiency & Harvest Umbrella",
        filter: (candidate) => ["Retrenchment", "Divestiture", "Liquidation"].includes(candidate.strategyType),
      },
      {
        title: "Priority Stack Umbrella",
        filter: () => false,
      },
    ];

    const generated = buckets
      .map((bucket) => ({
        title: bucket.title,
        items: readyCandidates.filter(bucket.filter),
      }))
      .filter((bucket) => bucket.items.length);

    if (generated.length < 4 && readyCandidates.length) {
      generated.push({
        title: "Priority Stack Umbrella",
        items: readyCandidates.slice(0, Math.min(4, readyCandidates.length)),
      });
    }

    return generated.slice(0, 6);
  }

  function renderUmbrellaStrategies(candidates) {
    const host = document.querySelector("[data-umbrella-host]");
    if (!host) return;
    const umbrellas = generateUmbrellaStrategies(candidates);
    if (!umbrellas.length) {
      host.innerHTML = `<article class="rounded-[1.75rem] border border-border-blue bg-white/5 p-5 text-sm text-cool-gray">Belum ada strategi siap-sintesis untuk dibentuk menjadi umbrella strategy. Lengkapi fase sebelumnya atau selesaikan Integration Gate.</article>`;
      return;
    }
    host.innerHTML = umbrellas
      .map((umbrella) => {
        const avgCount =
          umbrella.items.reduce((total, item) => total + item.toolCount, 0) / Math.max(umbrella.items.length, 1);
        return `
          <article class="rounded-[1.75rem] border border-border-blue bg-navy-surface/70 p-5 shadow-panel">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-lg font-semibold text-soft-white">${umbrella.title}</p>
                <p class="mt-2 text-sm leading-7 text-cool-gray">Kelompok ini menyatukan strategi yang muncul lintas tools dan sudah lolos gate yang relevan untuk dipakai sebagai kandidat QSPM.</p>
              </div>
              <span class="inline-flex rounded-full border border-info/30 bg-info/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-sky-100">${umbrella.items.length} Strategies</span>
            </div>
            <div class="mt-4 flex flex-wrap gap-2">
              ${umbrella.items
                .map(
                  (item) =>
                    `<span class="inline-flex rounded-full border border-maroon-glow/30 bg-maroon-glow/10 px-3 py-1 text-xs text-rose-100">${item.strategyType}</span>`
                )
                .join("")}
            </div>
            <div class="mt-4 grid gap-3 sm:grid-cols-2">
              <div class="rounded-2xl border border-border-blue bg-black/10 px-4 py-3">
                <p class="text-[11px] uppercase tracking-[0.16em] text-cool-gray">Average Tool Support</p>
                <p class="mt-2 font-mono text-lg font-semibold text-soft-white">${avgCount.toFixed(2)}</p>
              </div>
              <div class="rounded-2xl border border-border-blue bg-black/10 px-4 py-3">
                <p class="text-[11px] uppercase tracking-[0.16em] text-cool-gray">Traceability</p>
                <p class="mt-2 text-sm text-soft-white">Source: P4 TOWS, P5 SPACE, P6 BCG, P7 IE</p>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function updateIntersectionSummary() {
    if (document.body.dataset.page !== "phase-intersection") return;
    const candidates = buildIntersectionCandidates();
    const summary = getIntersectionToolSummary(candidates);
    renderIntersectionCandidates(candidates);
    renderIntegrationGateTable(candidates);
    renderUmbrellaStrategies(candidates);

    const mappings = {
      tows: String(summary.tows),
      space: summary.space,
      bcg: summary.bcg,
      ie: summary.ie,
      candidates: String(summary.candidates),
      "priority-count": String(candidates.filter((candidate) => candidate.toolCount >= 3 && !candidate.integrationBlocked).length),
    };
    Object.entries(mappings).forEach(([key, value]) => {
      document.querySelectorAll(`[data-intersection-summary="${key}"]`).forEach((node) => {
        node.textContent = value;
      });
    });

    const analysisNode = document.querySelector('[data-intersection-summary="analysis"]');
    if (analysisNode) {
      if (!candidates.length) {
        analysisNode.textContent = "Intersection Rule belum bisa berjalan karena belum ada strategi yang terbaca dari TOWS, SPACE, BCG, atau IE.";
      } else {
        const top = candidates
          .filter((candidate) => !candidate.integrationBlocked)
          .slice(0, 3)
          .map((candidate) => `${candidate.strategyType} (${candidate.toolCount} tools)`)
          .join(", ");
        analysisNode.textContent = `Sintesis saat ini menghasilkan ${candidates.length} strategi unik. Strategi yang muncul di 3+ tools menjadi prioritas utama, 2 tools menjadi kandidat dengan catatan, dan 1 tool memerlukan justifikasi eksplisit. Kandidat teratas saat ini: ${top || "-"}.`;
      }
    }

    const gateStatusNode = document.querySelector('[data-intersection-summary="gate-status"]');
    if (gateStatusNode) {
      const blocked = candidates.filter((candidate) => candidate.integrationBlocked).length;
      gateStatusNode.textContent =
        blocked > 0
          ? `${blocked} strategi integration masih menunggu approval gate atau justifikasi eksplisit.`
          : "Semua strategi integration yang muncul sudah lolos gate atau tidak diperlukan.";
      gateStatusNode.className = blocked > 0 ? "mt-4 text-sm text-amber-200" : "mt-4 text-sm text-emerald-200";
    }
  }

  function attachIntersectionInteractions() {
    if (document.body.dataset.page !== "phase-intersection") return;
    updateIntersectionSummary();

    document.addEventListener("change", (event) => {
      const select = event.target.closest('[data-integration-field="status"]');
      if (!select) return;
      const strategyType = select.dataset.strategyType;
      if (!strategyType) return;
      const state = getIntersectionState();
      const previous = state.gates[strategyType] || { status: "pending", justification: "" };
      state.gates[strategyType] = {
        ...previous,
        status: select.value || "pending",
      };
      setIntersectionState(state);
      updateIntersectionSummary();
      showToast(`Integration Gate untuk ${strategyType} diperbarui.`, "success");
    });

    document.addEventListener("input", (event) => {
      const textarea = event.target.closest('[data-integration-field="justification"]');
      if (!textarea) return;
      const strategyType = textarea.dataset.strategyType;
      if (!strategyType) return;
      const state = getIntersectionState();
      const previous = state.gates[strategyType] || { status: "pending", justification: "" };
      state.gates[strategyType] = {
        ...previous,
        justification: textarea.value || "",
      };
      setIntersectionState(state);
    });
  }

  function getActivePhaseConfig() {
    const params = new URLSearchParams(window.location.search);
    const phaseKey = params.get("phase") || "p0";
    return PHASE_WORKSPACE_MAP.find((entry) => entry.key === phaseKey) || PHASE_WORKSPACE_MAP[0];
  }

  function updatePhaseWorkspaceRouting() {
    const active = getActivePhaseConfig();
    const sections = Array.from(document.querySelectorAll("[data-phase-section]"));
    const currentLabel = document.querySelector("[data-phase-current-label]");
    const currentDesc = document.querySelector("[data-phase-current-desc]");
    const prevLink = document.querySelector("[data-phase-prev]");
    const nextLink = document.querySelector("[data-phase-next]");

    sections.forEach((section) => {
      const shouldShow = section.id === active.section;
      section.hidden = !shouldShow;
      section.open = shouldShow;
    });

    document.querySelectorAll("[data-phase-link]").forEach((link) => {
      const isActive = link.dataset.phaseLink === active.key;
      link.classList.toggle("ring-2", isActive);
      link.classList.toggle("ring-info", isActive);
      link.classList.toggle("ring-offset-2", isActive);
      link.classList.toggle("ring-offset-navy-deep", isActive);
      link.classList.toggle("border-info", isActive);
    });

    if (currentLabel) currentLabel.textContent = active.label;
    if (currentDesc) currentDesc.textContent = active.description;

    const currentIndex = PHASE_WORKSPACE_MAP.findIndex((entry) => entry.key === active.key);
    const prev = PHASE_WORKSPACE_MAP[Math.max(0, currentIndex - 1)];
    const next = PHASE_WORKSPACE_MAP[Math.min(PHASE_WORKSPACE_MAP.length - 1, currentIndex + 1)];

    if (prevLink) {
      prevLink.href = prev.href || `analysis.html?phase=${prev.key}`;
      prevLink.textContent = currentIndex === 0 ? "Previous Phase" : `Previous: ${prev.label}`;
      prevLink.classList.toggle("opacity-50", currentIndex === 0);
      prevLink.classList.toggle("pointer-events-none", currentIndex === 0);
    }

    if (nextLink) {
      nextLink.href = next.href || `analysis.html?phase=${next.key}`;
      nextLink.textContent =
        currentIndex === PHASE_WORKSPACE_MAP.length - 1 ? "Next Phase" : `Next: ${next.label}`;
      nextLink.classList.toggle("opacity-50", currentIndex === PHASE_WORKSPACE_MAP.length - 1);
      nextLink.classList.toggle("pointer-events-none", currentIndex === PHASE_WORKSPACE_MAP.length - 1);
    }
  }

  function exportDraftToExcel() {
    const draft = safeReadDraft();
    let rows = collectFieldRows().map((row) => ({
      ...row,
      value: draft[row.key] ?? row.value,
    }));

    if (!rows.length) {
      rows = Object.entries(draft).map(([key, value]) => {
        const parts = key.split("::");
        return {
          key,
          section: parts[0] || "Saved Draft",
          label: parts[1] || key,
          value,
        };
      });
    }

    if (!rows.length) {
      showToast("Belum ada data yang bisa diexport ke Excel.", "warning");
      return;
    }

    const tableRows = rows
      .map(
        (row) =>
          `<tr><td>${row.section}</td><td>${row.label}</td><td>${String(row.value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</td></tr>`
      )
      .join("");

    const workbook = `
      <html>
        <head>
          <meta charset="UTF-8" />
        </head>
        <body>
          <table border="1">
            <thead>
              <tr>
                <th>Section</th>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([workbook], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sot-drive-analysis-draft.xls";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("File Excel berhasil disiapkan.", "success");
  }

  function attachDraftPersistence() {
    attachEfeInteractions();
    hydrateFieldsFromDraft();
    updateDraftIndicators();

    collectFieldRows().forEach(({ key }) => {
      const field = document.querySelector(`[data-field-key="${CSS.escape(key)}"]`);
      if (!field) return;

      const handler = () => {
        saveAllFields();
        updateDraftIndicators();
      };

      field.addEventListener("input", handler);
      field.addEventListener("change", handler);
    });

    document.querySelectorAll("button[type='button']").forEach((button) => {
      if (button.dataset.managedAction === "true" || button.dataset.export) {
        return;
      }

      const label = button.textContent.trim();

      if (label.startsWith("Save") || label.startsWith("Send") || label.startsWith("Mark")) {
        button.addEventListener("click", () => {
          const saved = saveAllFields();
          updateDraftIndicators();
          showToast(saved ? `${label} berhasil disimpan ke draft browser.` : "Draft tidak bisa disimpan di browser ini.", saved ? "success" : "warning");
        });
        return;
      }

      if (label.startsWith("Validate") || label.startsWith("Check") || label.startsWith("Recompute") || label.startsWith("Recalculate") || label.startsWith("Rank")) {
        button.addEventListener("click", () => {
          saveAllFields();
          updateDraftIndicators();
          showToast(`${label} dijalankan sebagai aksi frontend statis.`, "info");
        });
      }
    });
  }

  function attachExportActions() {
    document.querySelectorAll("[data-export='excel']").forEach((button) => {
      button.addEventListener("click", exportDraftToExcel);
    });

    document.querySelectorAll("[data-export='pdf']").forEach((button) => {
      button.addEventListener("click", () => {
        showToast("Browser print dialog dibuka. Pilih Save as PDF untuk mengunduh PDF.", "info");
        window.print();
      });
    });
  }

  function init() {
    attachExportActions();

    if (document.body.dataset.page === "analysis" || document.body.dataset.page === "phase-efe" || document.body.dataset.page === "phase-ife" || document.body.dataset.page === "phase-cpm" || document.body.dataset.page === "phase-swot" || document.body.dataset.page === "phase-space" || document.body.dataset.page === "phase-bcg" || document.body.dataset.page === "phase-ie" || document.body.dataset.page === "phase-intersection") {
      attachDraftPersistence();
      if (document.body.dataset.page === "phase-ife") {
        attachIfeInteractions();
      }
      if (document.body.dataset.page === "phase-cpm") {
        attachCpmInteractions();
      }
      if (document.body.dataset.page === "phase-swot") {
        attachTowsInteractions();
        renderSwotPartOne();
        renderTowsSummary();
      }
      if (document.body.dataset.page === "phase-space") {
        attachSpaceInteractions();
      }
      if (document.body.dataset.page === "phase-bcg") {
        attachBcgInteractions();
      }
      if (document.body.dataset.page === "phase-ie") {
        attachIeInteractions();
      }
      if (document.body.dataset.page === "phase-intersection") {
        attachIntersectionInteractions();
      }
      if (document.body.dataset.page === "analysis") {
        updatePhaseWorkspaceRouting();
      }
    } else {
      updateDraftIndicators();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
