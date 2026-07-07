(() => {
  const STORAGE_KEY = "sotdrive-analysis-draft-v1";
  const EFE_STORAGE_KEY = "sotdrive-efe-items-v1";
  const EFE_SETTINGS_KEY = "sotdrive-efe-settings-v1";
  const IFE_STORAGE_KEY = "sotdrive-ife-items-v1";
  const IFE_SETTINGS_KEY = "sotdrive-ife-settings-v1";
  const CPM_STORAGE_KEY = "sotdrive-cpm-items-v1";
  const CPM_SETTINGS_KEY = "sotdrive-cpm-settings-v1";
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
  const PHASE_WORKSPACE_MAP = [
    { key: "p0", section: "phase-0", label: "P0 Intake & Diagnosis", description: "Company baseline, objective, scope, and data assumptions." },
    { key: "p1", section: "phase-1", label: "P1 EFE Matrix", description: "External factor identification and EFE workspace.", href: "phase-1-efe.html" },
    { key: "p2", section: "phase-2", label: "P2 IFE Matrix", description: "Internal factor evaluation and validation workspace.", href: "phase-2-ife.html" },
    { key: "p3", section: "phase-3", label: "P3 CPM Matrix", description: "Competitive profile input and comparison workspace.", href: "phase-3-cpm.html" },
    { key: "p4", section: "phase-4", label: "P4 SWOT & TOWS", description: "TOWS strategy drafting based on approved external and internal factors." },
    { key: "p5", section: "phase-5", label: "P5 SPACE Matrix", description: "Matching tools workspace for SPACE, BCG, IE, and Intersection Rule." },
    { key: "p6", section: "phase-5", label: "P6 BCG Matrix", description: "Sub-page focus routed into the matching tools workspace." },
    { key: "p7", section: "phase-5", label: "P7 IE Matrix", description: "Sub-page focus routed into the matching tools workspace." },
    { key: "p8", section: "phase-5", label: "P8 Intersection Rule", description: "Sub-page focus routed into the matching tools workspace." },
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

    if (document.body.dataset.page === "analysis" || document.body.dataset.page === "phase-efe" || document.body.dataset.page === "phase-ife" || document.body.dataset.page === "phase-cpm") {
      attachDraftPersistence();
      if (document.body.dataset.page === "phase-ife") {
        attachIfeInteractions();
      }
      if (document.body.dataset.page === "phase-cpm") {
        attachCpmInteractions();
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
