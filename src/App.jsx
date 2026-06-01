import { useState, useEffect, useCallback, useRef, useMemo, lazy, Suspense } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// Lazy-loaded page components (faster initial load)
const Dashboard         = lazy(() => import('./components/Dashboard'));
const BrandProfiles     = lazy(() => import('./components/BrandProfiles'));
const CampaignObjectives= lazy(() => import('./components/CampaignObjectives'));
const AudienceMessaging = lazy(() => import('./components/AudienceMessaging'));
const FunnelStrategy    = lazy(() => import('./components/FunnelStrategy'));
const CreativeLibrary   = lazy(() => import('./components/CreativeLibrary'));
const PreLaunchChecklist= lazy(() => import('./components/PreLaunchChecklist'));
const DecisionRules     = lazy(() => import('./components/DecisionRules'));
const PostMortem        = lazy(() => import('./components/PostMortem'));
const ExtraTools        = lazy(() => import('./components/ExtraTools'));
const UserGuideModal    = lazy(() => import('./components/UserGuideModal'));
const ProfitCalculator  = lazy(() => import('./components/ProfitCalculator'));
const UTMBuilder        = lazy(() => import('./components/UTMBuilder'));
const AIPrompts         = lazy(() => import('./components/AIPrompts'));
const PerformanceReports= lazy(() => import('./components/PerformanceReports'));
const CampaignTimeline  = lazy(() => import('./components/CampaignTimeline'));
const NamingConvention  = lazy(() => import('./components/NamingConvention'));
const SpyVault          = lazy(() => import('./components/SpyVault'));
const PacingTracker     = lazy(() => import('./components/PacingTracker'));
const ProToolsGuide     = lazy(() => import('./components/ProToolsGuide'));

// Page loader fallback
function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: 'var(--text-muted)' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="spinner" />
        <p style={{ marginTop: '12px', fontSize: '0.85rem' }}>جاري التحميل...</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// INITIAL STATE — default empty values for all editable fields
// ─────────────────────────────────────────────────────────────────
const INITIAL_STATE = {
  // Executive Summary / Brand Profiles
  campaign_name: '',
  period_from: '',
  period_to: '',
  main_objective: '',
  total_budget_summary: '',
  currency: 'ج.م',
  primary_channels: '',
  target_kpi_type: '',
  target_kpi_value: '',
  quick_spend: '',
  quick_cpl: '',
  quick_roas: '',
  quick_be_roas: '',
  hfl_usp: '',
  hfl_hero: '',
  hfl_notes: '',
  hb_usp: '',
  hb_hero: '',
  hb_notes: '',
  check_cod: false,
  cod_val: '',
  check_catalog: false,
  catalog_val: '',
  check_shipping: false,
  shipping_val: '',
  check_policy: false,

  // Campaign Objectives & Budget Calculator
  target_sales_revenue: '',
  target_leads_count: '',
  target_total_budget_text: '',
  assumption_aov: '',
  assumption_cr: '',
  assumption_margin: '',
  
  // Data Verification Fields
  verify_aov_checked: false,
  verify_aov_source: '',
  verify_cr_checked: false,
  verify_cr_source: '',
  verify_margin_checked: false,
  verify_margin_source: '',
  verify_budget_checked: false,
  verify_budget_source: '',
  daily_budget_min: '',
  daily_budget_max: '',
  conversion_event_def: '',
  attribution_window: '',
  calc_total_budget: '',
  budget_meta_pct: '40',
  budget_tiktok_pct: '30',
  budget_google_pct: '20',
  budget_other_pct: '10',
  meta_calculated_val: '',
  tiktok_calculated_val: '',
  google_calculated_val: '',
  other_calculated_val: '',

  // Audience & Messaging
  seg1_name: '',
  seg1_age: '',
  seg1_geo: '',
  seg1_interests: '',
  seg1_pain: '',
  seg1_angle: '',
  seg2_name: '',
  seg2_age: '',
  seg2_geo: '',
  seg2_interests: '',
  seg2_pain: '',
  seg2_angle: '',
  tofu_brand1: '',
  tofu_brand2: '',
  tofu_platform1: '',
  tofu_format1: '',
  tofu_hook1: '',
  tofu_platform2: '',
  tofu_format2: '',
  tofu_hook2: '',

  // Funnel Strategy
  funnel_tofu_budget: '',
  funnel_mofu_budget: '',
  funnel_bofu_budget: '',
  funnel_tofu_objective: '',
  funnel_mofu_objective: '',
  funnel_bofu_objective: '',
  retarget_window_1: '',
  retarget_audience_1: '',
  retarget_msg_1: '',
  retarget_window_2: '',
  retarget_audience_2: '',
  retarget_msg_2: '',
  retarget_window_3: '',
  retarget_audience_3: '',
  retarget_msg_3: '',

  // Creative Library
  creative_row1_type: '',
  creative_row1_name: '',
  creative_row1_format: '',
  creative_row1_platform: '',
  creative_row1_status: '',
  creative_row2_type: '',
  creative_row2_name: '',
  creative_row2_format: '',
  creative_row2_platform: '',
  creative_row2_status: '',
  creative_row3_type: '',
  creative_row3_name: '',
  creative_row3_format: '',
  creative_row3_platform: '',
  creative_row3_status: '',

  // Pre-Launch Checklist
  check_pixel_meta: false,
  check_pixel_tiktok: false,
  check_pixel_google: false,
  check_ads_account: false,
  check_catalog_approved: false,
  check_landing_tested: false,
  check_budget_approved: false,
  check_creatives_ready: false,
  check_audiences_saved: false,
  check_utm_ready: false,
  pixel_meta_id: '',
  pixel_tiktok_id: '',
  pixel_google_id: '',

  // Decision Rules
  rule_scale_trigger: '',
  rule_scale_action: '',
  rule_kill_trigger: '',
  rule_kill_action: '',
  rule_pause_trigger: '',
  rule_pause_action: '',
  rule_test_budget: '',
  rule_test_duration: '',

  // Post-Mortem
  pm_campaign_name: '',
  pm_period: '',
  pm_spend: '',
  pm_revenue: '',
  pm_roas: '',
  pm_cpl: '',
  pm_learnings: '',
  pm_next_steps: '',
  pm_winner_creative: '',
  pm_winner_audience: '',
  
  // Custom Branding
  agency_name: '',
  
  // Spy Vault
  spy_vault_items: [],

  // Calculator
  calc_price: '',
  calc_cogs: '',
  calc_shipping: '',
  calc_returns: '',

  // UTM
  utm_base_url: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',

  // AI Prompts
  ai_product: '',
  ai_audience: '',
  ai_angle: '',

  // Timeline
  timeline_events: [
      { id: '1', date: 'اليوم الأول', title: 'إطلاق حملات الاختبار (Testing)', color: 'var(--primary-color)' },
      { id: '2', date: 'اليوم الثالث', title: 'إيقاف الإعلانات الخاسرة (Kill Losers)', color: 'var(--red)' },
      { id: '3', date: 'اليوم الخامس', title: 'زيادة ميزانية الناجح (Scaling)', color: 'var(--neon-green)' },
      { id: '4', date: 'اليوم السابع', title: 'إطلاق حملات إعادة الاستهداف (Retargeting)', color: 'var(--purple)' }
  ],

  // Naming Convention
  naming_platform: '',
  naming_objective: '',
  naming_country: '',
  naming_audience: '',
  naming_creative: '',
  naming_date: '',

  // Pacing Tracker
  pacing_budget: '',
  pacing_spend: '',
  pacing_days_total: '',
  pacing_days_passed: '',
};

// ─────────────────────────────────────────────────────────────────
// SECURE & COMPACT SHAREABLE STATE HELPERS
// ─────────────────────────────────────────────────────────────────
function encryptState(state) {
  const filtered = {};
  Object.keys(INITIAL_STATE).forEach(key => {
    if (JSON.stringify(state[key]) !== JSON.stringify(INITIAL_STATE[key])) {
      filtered[key] = state[key];
    }
  });
  
  Object.keys(state).forEach(key => {
    if (!(key in INITIAL_STATE)) {
      filtered[key] = state[key];
    }
  });

  const jsonStr = JSON.stringify(filtered);
  const salt = "MB_SALT_2026_SECURE";
  let cipher = "";
  for (let i = 0; i < jsonStr.length; i++) {
    const charCode = jsonStr.charCodeAt(i) ^ salt.charCodeAt(i % salt.length);
    cipher += String.fromCharCode(charCode);
  }
  return btoa(unescape(encodeURIComponent(cipher)));
}

function decryptState(encodedStr) {
  const cipher = decodeURIComponent(escape(atob(encodedStr)));
  const salt = "MB_SALT_2026_SECURE";
  let jsonStr = "";
  for (let i = 0; i < cipher.length; i++) {
    const charCode = cipher.charCodeAt(i) ^ salt.charCodeAt(i % salt.length);
    jsonStr += String.fromCharCode(charCode);
  }
  const parsed = JSON.parse(jsonStr);
  return { ...INITIAL_STATE, ...parsed };
}

// ─────────────────────────────────────────────────────────────────
// LOCAL STORAGE PERSISTENCE HELPERS
// ─────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────
// PROGRESS CALCULATOR
// ─────────────────────────────────────────────────────────────────
const TEXT_FIELDS = [
  'agency_name', 'campaign_name', 'period_from', 'period_to', 'main_objective',
  'total_budget_summary', 'primary_channels', 'target_kpi_type', 'target_kpi_value',
  'quick_spend', 'quick_cpl', 'quick_roas',
  'hfl_usp', 'hfl_hero', 'hb_usp', 'hb_hero',
  'target_sales_revenue', 'target_total_budget_text',
  'assumption_aov', 'assumption_cr', 'assumption_margin',
  'conversion_event_def', 'attribution_window',
  'seg1_name', 'seg1_age', 'seg1_interests', 'seg1_pain', 'seg1_angle',
  'seg2_name', 'seg2_interests', 'seg2_pain', 'seg2_angle',
  'funnel_tofu_budget', 'funnel_mofu_budget', 'funnel_bofu_budget',
  'retarget_window_1', 'retarget_audience_1', 'retarget_msg_1',
  'rule_scale_trigger', 'rule_scale_action', 'rule_kill_trigger', 'rule_kill_action',
  'pm_spend', 'pm_revenue', 'pm_roas', 'pm_learnings', 'pm_next_steps',
];

const BOOL_FIELDS = [
  'check_cod', 'check_catalog', 'check_shipping', 'check_policy',
  'check_pixel_meta', 'check_pixel_tiktok', 'check_pixel_google',
  'check_ads_account', 'check_catalog_approved', 'check_landing_tested',
  'check_budget_approved', 'check_creatives_ready', 'check_audiences_saved', 'check_utm_ready',
];

function calculateProgress(state) {
  const textFilled = TEXT_FIELDS.filter(k => state[k] && String(state[k]).trim() !== '').length;
  const boolFilled = BOOL_FIELDS.filter(k => !!state[k]).length;
  const total = TEXT_FIELDS.length + BOOL_FIELDS.length;
  const filled = textFilled + boolFilled;
  return Math.round((filled / total) * 100);
}

// ─────────────────────────────────────────────────────────────────
// MULTI-CAMPAIGN SUPPORT
// ─────────────────────────────────────────────────────────────────
const CAMPAIGNS_KEY = 'media_buyer_campaigns_v1';
const ACTIVE_CAMPAIGN_KEY = 'media_buyer_active_campaign';

function loadCampaigns() {
  try {
    const data = localStorage.getItem(CAMPAIGNS_KEY);
    if (!data) return { default: { name: 'الحملة الرئيسية', state: INITIAL_STATE } };
    const parsed = JSON.parse(data);
    if (!parsed || typeof parsed !== 'object' || Object.keys(parsed).length === 0) {
      return { default: { name: 'الحملة الرئيسية', state: INITIAL_STATE } };
    }
    
    // Auto-migrate old default currencies from 'ر.س' to 'ج.م' for existing campaigns in localStorage
    let hasMigrated = false;
    Object.keys(parsed).forEach(key => {
      if (parsed[key] && parsed[key].state) {
        if (!parsed[key].state.currency || parsed[key].state.currency === 'ر.س') {
          parsed[key].state.currency = 'ج.م';
          hasMigrated = true;
        }
      }
    });
    
    if (hasMigrated) {
      try { localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(parsed)); } catch (e) { console.error(e); }
    }
    
    return parsed;
  } catch { 
    return { default: { name: 'الحملة الرئيسية', state: INITIAL_STATE } }; 
  }
}

function saveCampaigns(campaigns) {
  try { localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns)); } catch (err) { console.error('Failed to save campaigns:', err); }
}

function getActiveCampaignId() {
  return localStorage.getItem(ACTIVE_CAMPAIGN_KEY) || 'default';
}

function setActiveCampaignId(id) {
  localStorage.setItem(ACTIVE_CAMPAIGN_KEY, id);
}
// ─────────────────────────────────────────────────────────────────
// TAB → COMPONENT MAP
// ─────────────────────────────────────────────────────────────────
const TAB_COMPONENTS = {
  dashboard:  null,
  summary:    BrandProfiles,
  objectives: CampaignObjectives,
  audience:   AudienceMessaging,
  funnel:     FunnelStrategy,
  creative:   CreativeLibrary,
  checklist:  PreLaunchChecklist,
  rules:      DecisionRules,
  postmortem: PostMortem,
  extras:     ExtraTools,
  timeline:   CampaignTimeline,
  reports:    PerformanceReports,
  calculator: ProfitCalculator,
  utm:        UTMBuilder,
  ai:         AIPrompts,
  naming:     NamingConvention,
  spyvault:   SpyVault,
  pacing:     PacingTracker,
  protools:   ProToolsGuide,
};

// ─────────────────────────────────────────────────────────────────
// TOAST NOTIFICATION SYSTEM
// ─────────────────────────────────────────────────────────────────
function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span>{t.icon}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// HTML EXPORTER
// ─────────────────────────────────────────────────────────────────
function buildExportHTML(state, progress) {
  // Pacing Calculations
  const pacingBudget = parseFloat(state.pacing_budget || state.calc_total_budget || '0') || 0;
  const pacingSpend = parseFloat(state.pacing_spend || '0') || 0;
  const pacingDaysTotal = parseFloat(state.pacing_days_total || '30') || 30;
  const pacingDaysPassed = parseFloat(state.pacing_days_passed || '1') || 1;

  const spendPct = pacingBudget > 0 ? Math.min(100, (pacingSpend / pacingBudget) * 100) : 0;
  const timePct = pacingDaysTotal > 0 ? Math.min(100, (pacingDaysPassed / pacingDaysTotal) * 100) : 0;

  const idealDailySpend = pacingBudget / pacingDaysTotal;
  const currentDailySpend = pacingSpend / pacingDaysPassed;
  const pacingRatio = idealDailySpend > 0 ? (currentDailySpend / idealDailySpend) : 0;

  let pacingText = 'متوازن وعلي المسار الصحيح (On Pace) ✅';
  let pacingColor = '#10b981';
  let pacingDelta = 0;
  if (pacingBudget > 0 && pacingDaysTotal > 0) {
    pacingDelta = (pacingSpend / pacingBudget) * 100 - (pacingDaysPassed / pacingDaysTotal) * 100;
  }
  
  if (pacingRatio > 1.15) {
    pacingText = 'إنفاق متسارع (Over-pacing) ⚠️';
    pacingColor = '#ff0055';
  } else if (pacingRatio < 0.85) {
    pacingText = 'إنفاق متباطئ (Under-pacing) 🐢';
    pacingColor = '#0052ff';
  }

  const remainingBudget = Math.max(0, pacingBudget - pacingSpend);
  const remainingDays = Math.max(1, pacingDaysTotal - pacingDaysPassed);
  const requiredDailySpend = remainingBudget / remainingDays;

  // Budget split Calculations
  const totalBudget = parseFloat(state.calc_total_budget || state.total_budget_summary || 0) || 0;
  const currency = state.currency || 'ج.م';
  const metaPct = parseInt(state.budget_meta_pct) || 40;
  const tiktokPct = parseInt(state.budget_tiktok_pct) || 30;
  const googlePct = parseInt(state.budget_google_pct) || 20;
  const otherPct = parseInt(state.budget_other_pct) || 10;

  const metaVal = Math.round(totalBudget * (metaPct / 100));
  const tiktokVal = Math.round(totalBudget * (tiktokPct / 100));
  const googleVal = Math.round(totalBudget * (googlePct / 100));
  const otherVal = Math.round(totalBudget * (otherPct / 100));

  // Verified items
  const verifiedItems = [
    { label: 'متوسط قيمة السلة (AOV)', checked: state.verify_aov_checked, source: state.verify_aov_source },
    { label: 'معدل تحويل الموقع (CR)', checked: state.verify_cr_checked, source: state.verify_cr_source },
    { label: 'هامش ربح المنتجات (Margin)', checked: state.verify_margin_checked, source: state.verify_margin_source },
    { label: 'الميزانية الكلية للحملة', checked: state.verify_budget_checked, source: state.verify_budget_source },
  ].filter(item => item.checked && item.source);

  let integrityHTML = '';
  if (verifiedItems.length > 0) {
    integrityHTML = `
      <div class="bento-card data-integrity-cert" style="grid-column: 1 / -1;">
        <div class="cert-header">
          🛡️ تقرير موثوقية وجودة البيانات (Data Integrity Certificate)
        </div>
        <p class="cert-desc">
          تم تدقيق وتأكيد صحة هذه البيانات الإدارية والمالية وإسنادها إلى مصادرها الرسمية الفعالة:
        </p>
        <table class="cert-table">
          <tbody>
            ${verifiedItems.map(item => `
              <tr>
                <th>${item.label}</th>
                <td><span class="cert-badge">✓ موثق</span> • من خلال: ${item.source}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>خطة ميديا باينج — ${state.campaign_name || 'بدون اسم'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Cairo', sans-serif;
      background: #f8fafc;
      color: #0f172a;
      padding: 40px;
      line-height: 1.6;
    }
    .export-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .export-header {
      margin-bottom: 32px;
      padding: 40px;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      border-radius: 24px;
      color: white;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .export-header::before {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at 80% 20%, rgba(0, 82, 255, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 20% 80%, rgba(0, 240, 255, 0.1) 0%, transparent 50%);
      pointer-events: none;
    }
    .export-header h1 {
      font-size: 2.2rem;
      font-weight: 900;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
      background: linear-gradient(135deg, #ffffff 40%, #a5b4fc 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .export-header p { font-size: 1rem; color: #94a3b8; font-weight: 500; }
    .export-header .progress-badge {
      display: inline-block;
      margin-top: 16px;
      padding: 6px 20px;
      background: rgba(255, 255, 255, 0.07);
      border-radius: 20px;
      font-weight: 700;
      font-size: 0.9rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* Bento Grid Layout */
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
    .bento-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 28px;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.02);
      break-inside: avoid;
      transition: all 0.3s ease;
    }
    .bento-card:hover {
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
      border-color: #cbd5e1;
    }
    .bento-card h2 {
      font-size: 1.2rem;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 2px solid #f1f5f9;
      padding-bottom: 12px;
    }
    .bento-card h2 span {
      font-size: 1.4rem;
    }

    /* Standardized Tables */
    table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
    tr { border-bottom: 1px solid #f1f5f9; }
    tr:last-child { border-bottom: none; }
    th {
      text-align: right;
      padding: 10px 12px;
      font-size: 0.85rem;
      font-weight: 700;
      color: #64748b;
      width: 40%;
    }
    td {
      padding: 10px 12px;
      font-size: 0.9rem;
      color: #1e293b;
      font-weight: 600;
      text-align: left;
    }
    .empty { color: #94a3b8; font-style: italic; }

    /* Custom visual component: Progress split bars */
    .bar-split-item {
      margin-bottom: 16px;
    }
    .bar-split-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 0.85rem;
      font-weight: 700;
      color: #334155;
    }
    .bar-split-track {
      height: 8px;
      background: #f1f5f9;
      border-radius: 10px;
      overflow: hidden;
    }
    .bar-split-fill {
      height: 100%;
      border-radius: 10px;
    }

    /* Data Integrity Certificate box */
    .data-integrity-cert {
      border: 2px solid #10b981;
      background: #f0fdf4;
    }
    .cert-header {
      font-size: 1.15rem;
      font-weight: 800;
      color: #065f46;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .cert-desc {
      font-size: 0.88rem;
      color: #047857;
      margin-bottom: 16px;
      font-weight: 600;
    }
    .cert-table th {
      color: #047857;
      background: transparent;
      border-bottom: 1px solid #d1fae5;
    }
    .cert-table td {
      color: #065f46;
      border-bottom: 1px solid #d1fae5;
    }
    .cert-badge {
      color: #10b981;
      font-weight: 800;
    }

    /* Pacing layout components */
    .pacing-overview {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
      background: #f8fafc;
      padding: 16px;
      border-radius: 12px;
      border: 1px dashed #e2e8f0;
      justify-content: space-between;
      align-items: center;
    }
    .pacing-status-pill {
      font-size: 0.8rem;
      padding: 4px 12px;
      border-radius: 20px;
      font-weight: 800;
      color: white;
    }

    .export-footer {
      text-align: center;
      margin-top: 56px;
      padding: 24px;
      color: #94a3b8;
      font-size: 0.85rem;
      border-top: 1px solid #e2e8f0;
    }

    /* Print Specific styles to prevent gaps and splits */
    @media print {
      body { padding: 0; background: #fff; color: #000; }
      .export-header { background: #0f172a !important; -webkit-print-color-adjust: exact; padding: 30px; margin-bottom: 24px; border-radius: 12px; }
      .bento-card { box-shadow: none !important; border: 1px solid #ccc !important; padding: 20px !important; margin-bottom: 24px !important; page-break-inside: avoid; }
      .bento-grid { display: block !important; }
      th, td { padding: 6px 10px; border-bottom: 1px solid #ddd !important; }
      .bar-split-track { background: #eee !important; -webkit-print-color-adjust: exact; }
      .bar-split-fill { -webkit-print-color-adjust: exact; }
      .pacing-overview { background: #fdfdfd !important; border: 1px solid #ddd !important; -webkit-print-color-adjust: exact; }
      .pacing-status-pill { border: 1px solid #777 !important; -webkit-print-color-adjust: exact; }
      .data-integrity-cert { border: 2px solid #10b981 !important; background: #f9fffb !important; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="export-container">
    <div class="export-header">
      ${state.agency_name ? `<p style="font-size:1.15rem; margin-bottom:8px; font-weight:bold; color: #a5b4fc;">مُقدمة بواسطة: ${state.agency_name}</p>` : ''}
      <h1>🎯 خطة ميديا باينج متكاملة</h1>
      <p>${state.campaign_name || 'الحملة الإعلانية'} • الفترة: ${state.period_from || '—'} إلى ${state.period_to || '—'}</p>
      <div class="progress-badge">نسبة اكتمال تخطيط الحملة: ${progress}%</div>
    </div>

    <div class="bento-grid">
      
      <!-- Card 1: Executive Summary -->
      <div class="bento-card">
        <h2><span>📝</span> الملخص التنفيذي للمشروع</h2>
        <table>
          <tbody>
            <tr>
              <th>اسم الحملة الإعلانية</th>
              <td>${state.campaign_name || '<span class="empty">—</span>'}</td>
            </tr>
            <tr>
              <th>الفترة الزمنية للحملة</th>
              <td>${state.period_from ? `${state.period_from} ← ${state.period_to}` : '<span class="empty">—</span>'}</td>
            </tr>
            <tr>
              <th>الهدف الأساسي للحملة</th>
              <td>${state.main_objective || '<span class="empty">—</span>'}</td>
            </tr>
            <tr>
              <th>الميزانية الإجمالية المعتمدة</th>
              <td>${state.total_budget_summary ? `${state.total_budget_summary} ${state.currency}` : '<span class="empty">—</span>'}</td>
            </tr>
            <tr>
              <th>القنوات الإعلانية الأساسية</th>
              <td>${state.primary_channels || '<span class="empty">—</span>'}</td>
            </tr>
            <tr>
              <th>مؤشر الأداء المستهدف KPI</th>
              <td>${state.target_kpi_type ? `${state.target_kpi_type}: ${state.target_kpi_value}` : '<span class="empty">—</span>'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Card 2: Financial Objectives & Channel Split -->
      <div class="bento-card">
        <h2><span>📊</span> الأهداف الإستراتيجية وتوزيع الميزانية</h2>
        <table>
          <tbody>
            <tr>
              <th>المبيعات المستهدفة الكلية</th>
              <td>${state.target_sales_revenue ? `${state.target_sales_revenue} ${currency}` : '<span class="empty">—</span>'}</td>
            </tr>
            <tr>
              <th>عدد المبيعات/الليدز المستهدف</th>
              <td>${state.target_leads_count ? `${state.target_leads_count} عميل` : '<span class="empty">—</span>'}</td>
            </tr>
            <tr>
              <th>متوسط قيمة السلة (AOV)</th>
              <td>${state.assumption_aov ? `${state.assumption_aov} ${currency}` : '<span class="empty">—</span>'}</td>
            </tr>
            <tr>
              <th>معدل تحويل المتجر المتوقع (CR)</th>
              <td>${state.assumption_cr ? `${state.assumption_cr}%` : '<span class="empty">—</span>'}</td>
            </tr>
            <tr>
              <th>هامش ربح المنتجات التقريبي</th>
              <td>${state.assumption_margin ? `${state.assumption_margin}%` : '<span class="empty">—</span>'}</td>
            </tr>
          </tbody>
        </table>

        ${totalBudget > 0 ? `
          <div style="margin-top: 20px;">
            <p style="font-size: 0.88rem; font-weight: 800; color: #475569; margin-bottom: 12px; border-top: 1px solid #f1f5f9; padding-top: 12px;">
              💡 توزيع الحصص الإعلانية المنصات الإعلانية:
            </p>
            
            <div class="bar-split-item">
              <div class="bar-split-top">
                <span>Meta (Facebook / Instagram)</span>
                <span>${metaPct}% (${metaVal.toLocaleString()} ${currency})</span>
              </div>
              <div class="bar-split-track">
                <div class="bar-split-fill" style="width: ${metaPct}%; background: #0052ff;"></div>
              </div>
            </div>

            <div class="bar-split-item">
              <div class="bar-split-top">
                <span>TikTok Ads</span>
                <span>${tiktokPct}% (${tiktokVal.toLocaleString()} ${currency})</span>
              </div>
              <div class="bar-split-track">
                <div class="bar-split-fill" style="width: ${tiktokPct}%; background: #ff0050;"></div>
              </div>
            </div>

            <div class="bar-split-item">
              <div class="bar-split-top">
                <span>Google Ads</span>
                <span>${googlePct}% (${googleVal.toLocaleString()} ${currency})</span>
              </div>
              <div class="bar-split-track">
                <div class="bar-split-fill" style="width: ${googlePct}%; background: #fbbc04;"></div>
              </div>
            </div>

            <div class="bar-split-item" style="margin-bottom: 0;">
              <div class="bar-split-top">
                <span>قنوات أخرى (Snapchat / X)</span>
                <span>${otherPct}% (${otherVal.toLocaleString()} ${currency})</span>
              </div>
              <div class="bar-split-track">
                <div class="bar-split-fill" style="width: ${otherPct}%; background: #10b981;"></div>
              </div>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Card 3: Target Audience & Persona Specs -->
      <div class="bento-card">
        <h2><span>🧲</span> شرائح الجمهور والرسائل الإقناعية</h2>
        
        ${state.seg1_name ? `
          <div style="margin-bottom: 16px; background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <p style="font-weight: 800; font-size: 0.95rem; color: #0052ff; margin-bottom: 8px;">👤 شريحة الجمهور 1: ${state.seg1_name}</p>
            <p style="font-size: 0.85rem; color: #334155;">• <strong>الديموغرافيا:</strong> ${state.seg1_age || '—'} | ${state.seg1_geo || '—'}</p>
            <p style="font-size: 0.85rem; color: #334155;">• <strong>الاهتمامات الأساسية:</strong> ${state.seg1_interests || '—'}</p>
            <p style="font-size: 0.85rem; color: #334155;">• <strong>نقطة الألم / المخاوف:</strong> ${state.seg1_pain || '—'}</p>
            <p style="font-size: 0.85rem; color: #334155;">• <strong>زاوية الرسالة الإعلانية:</strong> ${state.seg1_angle || '—'}</p>
          </div>
        ` : ''}

        ${state.seg2_name ? `
          <div style="background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <p style="font-weight: 800; font-size: 0.95rem; color: #f59e0b; margin-bottom: 8px;">👤 شريحة الجمهور 2: ${state.seg2_name}</p>
            <p style="font-size: 0.85rem; color: #334155;">• <strong>الديموغرافيا:</strong> ${state.seg2_age || '—'} | ${state.seg2_geo || '—'}</p>
            <p style="font-size: 0.85rem; color: #334155;">• <strong>الاهتمامات الأساسية:</strong> ${state.seg2_interests || '—'}</p>
            <p style="font-size: 0.85rem; color: #334155;">• <strong>نقطة الألم / المخاوف:</strong> ${state.seg2_pain || '—'}</p>
            <p style="font-size: 0.85rem; color: #334155;">• <strong>زاوية الرسالة الإعلانية:</strong> ${state.seg2_angle || '—'}</p>
          </div>
        ` : ''}

        ${!state.seg1_name && !state.seg2_name ? '<p class="empty">لا يوجد شرائح جمهور مسجلة بعد في هذه الخطة.</p>' : ''}
      </div>

      <!-- Card 4: Funnel Strategy & Retargeting Playbook -->
      <div class="bento-card">
        <h2><span>🔽</span> استراتيجية القمع وإعادة الاستهداف</h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div>
            <p style="font-size: 0.8rem; color: #64748b; font-weight: 700;">🔷 TOFU (الميزانية والمستهدف):</p>
            <p style="font-size: 0.9rem; font-weight: 700; color: #0f172a;">${state.funnel_tofu_budget ? `${state.funnel_tofu_budget} ${currency}` : '—'}</p>
          </div>
          <div>
            <p style="font-size: 0.8rem; color: #64748b; font-weight: 700;">🔶 MOFU (الميزانية والمستهدف):</p>
            <p style="font-size: 0.9rem; font-weight: 700; color: #0f172a;">${state.funnel_mofu_budget ? `${state.funnel_mofu_budget} ${currency}` : '—'}</p>
          </div>
          <div style="grid-column: span 2; border-top: 1px solid #f1f5f9; padding-top: 8px;">
            <p style="font-size: 0.8rem; color: #64748b; font-weight: 700;">🔹 BOFU (ميزانية إعادة الاستهداف):</p>
            <p style="font-size: 0.9rem; font-weight: 700; color: #0f172a;">${state.funnel_bofu_budget ? `${state.funnel_bofu_budget} ${currency}` : '—'}</p>
          </div>
        </div>

        ${state.retarget_audience_1 ? `
          <div style="background: #f8fafc; padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0;">
            <p style="font-weight: 800; font-size: 0.88rem; color: #8b5cf6; margin-bottom: 6px;">🎯 إعادة استهداف 1 (النافذة: ${state.retarget_window_1 || '—'})</p>
            <p style="font-size: 0.8rem; color: #334155;">• <strong>الجمهور المستهدف:</strong> ${state.retarget_audience_1}</p>
            <p style="font-size: 0.8rem; color: #334155; margin-top: 2px;">• <strong>الرسالة الإعلانية:</strong> ${state.retarget_msg_1}</p>
          </div>
        ` : ''}
      </div>

      <!-- Card 5: Automation & Decision Rules Playbook -->
      <div class="bento-card">
        <h2><span>⚡</span> قواعد الأتمتة والتحكم في المخاطر</h2>
        <table>
          <tbody>
            <tr>
              <th style="color: #10b981;">🚀 قاعدة التوسيع (Scale)</th>
              <td style="text-align: right;">
                <strong>المحفز:</strong> ${state.rule_scale_trigger || '—'}<br/>
                <strong>الإجراء:</strong> ${state.rule_scale_action || '—'}
              </td>
            </tr>
            <tr>
              <th style="color: #ff0055;">🔴 قاعدة الإيقاف (Kill)</th>
              <td style="text-align: right;">
                <strong>المحفز:</strong> ${state.rule_kill_trigger || '—'}<br/>
                <strong>الإجراء:</strong> ${state.rule_kill_action || '—'}
              </td>
            </tr>
            <tr>
              <th style="color: #f59e0b;">⏳ قاعدة الإيقاف المؤقت (Pause)</th>
              <td style="text-align: right;">
                <strong>المحفز:</strong> ${state.rule_pause_trigger || '—'}<br/>
                <strong>الإجراء:</strong> ${state.rule_pause_action || '—'}
              </td>
            </tr>
            <tr>
              <th>🔬 معايير الاختبار (Testing)</th>
              <td style="text-align: right;">
                <strong>ميزانية الاختبار:</strong> ${state.rule_test_budget || '—'}<br/>
                <strong>مدة الاختبار الفنية:</strong> ${state.rule_test_duration || '—'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Card 6: Smart Budget Pacing Tracker -->
      ${pacingBudget > 0 ? `
        <div class="bento-card">
          <h2><span>💸</span> وتيرة صرف الميزانية والجدول الزمني</h2>
          <div class="pacing-overview">
            <span style="font-weight: 800; font-size: 0.95rem;">وتيرة الإنفاق الحالية:</span>
            <div style="text-align: left; display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
              <span class="pacing-status-pill" style="background: ${pacingColor};">${pacingText}</span>
              ${pacingDelta !== 0 ? `<span style="font-size: 0.72rem; font-weight: 700; color: ${pacingDelta > 0 ? '#ff0055' : '#0052ff'};">انحراف الوتيرة: ${pacingDelta > 0 ? '+' : ''}${pacingDelta.toFixed(1)}%</span>` : ''}
            </div>
          </div>
          
          <div class="bar-split-item">
            <div class="bar-split-top">
              <span>💸 نسبة الميزانية المصروفة</span>
              <span>${spendPct.toFixed(1)}% (${pacingSpend.toLocaleString()} / ${pacingBudget.toLocaleString()} ${currency})</span>
            </div>
            <div class="bar-split-track">
              <div class="bar-split-fill" style="width: ${spendPct}%; background: #00f0ff;"></div>
            </div>
          </div>

          <div class="bar-split-item">
            <div class="bar-split-top">
              <span>⏳ نسبة الأيام المنقضية للحملة</span>
              <span>${timePct.toFixed(1)}% (${pacingDaysPassed} / ${pacingDaysTotal} يوم)</span>
            </div>
            <div class="bar-split-track">
              <div class="bar-split-fill" style="width: ${timePct}%; background: #f59e0b;"></div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px; border-top: 1px solid #f1f5f9; padding-top: 14px;">
            <div style="background: #f8fafc; padding: 10px; border-radius: 8px;">
              <span style="font-size: 0.72rem; color: #64748b; display: block;">الصرف اليومي الفعلي الحالي:</span>
              <strong style="color: #0f172a; font-size: 0.9rem;">${currentDailySpend.toLocaleString(undefined, { maximumFractionDigits: 1 })} ${currency} / يوم</strong>
            </div>
            <div style="background: #f8fafc; padding: 10px; border-radius: 8px;">
              <span style="font-size: 0.72rem; color: #64748b; display: block;">الصرف اليومي المطلوب المتبقي:</span>
              <strong style="color: #0f172a; font-size: 0.9rem;">${requiredDailySpend.toLocaleString(undefined, { maximumFractionDigits: 1 })} ${currency} / يوم</strong>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Card 7: Post-Mortem Performance Learnings -->
      ${(state.pm_spend || state.pm_learnings || state.pm_campaign_name) ? `
        <div class="bento-card" style="${pacingBudget > 0 ? '' : 'grid-column: span 2;'}">
          <h2><span>🏆</span> تقرير أداء وإغلاق الشهر (Post-Mortem)</h2>
          <table>
            <tbody>
              <tr>
                <th>إجمالي المبالغ المصروفة فعلياً</th>
                <td>${state.pm_spend ? `${state.pm_spend} ${currency}` : '—'}</td>
              </tr>
              <tr>
                <th>إجمالي الإيرادات المحققة</th>
                <td>${state.pm_revenue ? `${state.pm_revenue} ${currency}` : '—'}</td>
              </tr>
              <tr>
                <th style="color: #10b981;">العائد الإعلاني الفعلي المحقق ROAS</th>
                <td>${state.pm_roas ? `${state.pm_roas}x` : '—'}</td>
              </tr>
              <tr>
                <th>تكلفة الطلب CPA المحققة</th>
                <td>${state.pm_cpl ? `${state.pm_cpl} ${currency}` : '—'}</td>
              </tr>
              <tr>
                <th>الجمهور والابتكار الفائز</th>
                <td style="text-align: right;">
                  <strong>الجمهور:</strong> ${state.pm_winner_audience || '—'}<br/>
                  <strong>المحتوى:</strong> ${state.pm_winner_creative || '—'}
                </td>
              </tr>
            </tbody>
          </table>
          ${state.pm_learnings ? `
            <div style="margin-top: 14px; background: #faf5ff; border: 1px solid #f3e8ff; padding: 12px; border-radius: 10px;">
              <p style="font-weight: 800; font-size: 0.85rem; color: #8b5cf6; margin-bottom: 4px;">📝 الدروس المستفادة والخطوات القادمة:</p>
              <p style="font-size: 0.8rem; color: #5b21b6; line-height: 1.5;">${state.pm_learnings}</p>
              ${state.pm_next_steps ? `<p style="font-size: 0.8rem; color: #5b21b6; line-height: 1.5; margin-top: 4px;"><strong>الخطوات:</strong> ${state.pm_next_steps}</p>` : ''}
            </div>
          ` : ''}
        </div>
      ` : ''}

      <!-- Data Integrity Certificate inside Bento -->
      ${integrityHTML}

    </div>

    <div class="export-footer">
      تم إنشاء وتدقيق هذه الخطة بواسطة لوحة تحكم ميديا باينج التفاعلية • ${new Date().toLocaleDateString('ar-SA')}
    </div>
  </div>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────
// MAIN APP COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // ─ Theme Sync ─
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);



  // ─ Multi-Campaign ─
  const [campaigns, setCampaigns] = useState(loadCampaigns);
  const [activeCampaignId, setActiveCampaignIdState] = useState(getActiveCampaignId);
  const currentCampaign = campaigns[activeCampaignId] || campaigns['default'] || Object.values(campaigns)[0];
  const state = currentCampaign?.state || INITIAL_STATE;

  // ─ Last Saved Time ─
  const [lastSavedTime, setLastSavedTime] = useState(() => {
    return localStorage.getItem('media_buyer_last_saved_time') || '';
  });

  // ─ Undo/Redo History ─
  const historyRef = useRef([state]);
  const historyIdxRef = useRef(0);
  const isUndoRedoRef = useRef(false);

  // ─ Toast Notifications ─
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = 'success', icon = '✓') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, icon }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  // ─ Parse Shared URL on Mount ─
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('data');
    if (dataParam) {
      try {
        let parsedState;
        try {
          // Try new encrypted/compressed format first
          parsedState = decryptState(dataParam);
        } catch (err) {
          // Fallback to old format
          const decodedStr = decodeURIComponent(atob(dataParam));
          parsedState = JSON.parse(decodedStr);
        }
        const id = 'shared_' + Date.now();
        setCampaigns(prev => ({ ...prev, [id]: { name: 'حملة مشتركة', state: parsedState } }));
        setActiveCampaignIdState(id);
        setActiveCampaignId(id);
        addToast('تم استيراد الخطة المشتركة بنجاح!', 'success', '📥');
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch {
        addToast('رابط غير صالح أو تالف', 'error', '❌');
      }
    }
  }, [addToast]);

  // ─ Badge (save indicator) ─
  const [badgeText, setBadgeText] = useState('LIVE');
  const [isSavedState, setIsSavedState] = useState(false);
  const saveTimeoutRef = useRef(null);

  // Helper to update state for active campaign
  const setActiveState = useCallback((updater) => {
    setCampaigns(prev => {
      const newState = typeof updater === 'function' ? updater(prev[activeCampaignId]?.state || INITIAL_STATE) : updater;
      return { ...prev, [activeCampaignId]: { ...prev[activeCampaignId], state: newState } };
    });
  }, [activeCampaignId]);

  // Manual save handler
  const handleManualSave = useCallback(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveCampaigns(campaigns);
    
    const timeStr = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    localStorage.setItem('media_buyer_last_saved_time', timeStr);
    setLastSavedTime(timeStr);
    
    setBadgeText('✓ تم الحفظ');
    setIsSavedState(true);
    addToast('💾 تم حفظ جميع بياناتك ومشاريعك بأمان في متصفحك!', 'success', '💾');
    
    setTimeout(() => {
      setBadgeText('LIVE');
      setIsSavedState(false);
    }, 2000);
  }, [campaigns, addToast]);

  // Auto-save campaigns to localStorage
  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    if (!isUndoRedoRef.current) {
      setBadgeText('جاري الحفظ...');
      setIsSavedState(false);
    }
    isUndoRedoRef.current = false;

    saveTimeoutRef.current = setTimeout(() => {
      saveCampaigns(campaigns);
      const timeStr = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      localStorage.setItem('media_buyer_last_saved_time', timeStr);
      setLastSavedTime(timeStr);
      setBadgeText('✓ محفوظ');
      setIsSavedState(true);
      setTimeout(() => { setBadgeText('LIVE'); setIsSavedState(false); }, 2000);
    }, 800);

    return () => { if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current); };
  }, [campaigns]);

  // Push to undo history on state change
  useEffect(() => {
    const h = historyRef.current;
    const idx = historyIdxRef.current;
    if (JSON.stringify(h[idx]) !== JSON.stringify(state)) {
      historyRef.current = [...h.slice(0, idx + 1), state];
      historyIdxRef.current = historyRef.current.length - 1;
    }
  }, [state]);

  // Undo handler
  const handleUndo = useCallback(() => {
    const idx = historyIdxRef.current;
    if (idx > 0) {
      historyIdxRef.current = idx - 1;
      isUndoRedoRef.current = true;
      setActiveState(historyRef.current[historyIdxRef.current]);
      addToast('تم التراجع عن آخر تغيير', 'info', '↩️');
    }
  }, [setActiveState, addToast]);

  // Redo handler
  const handleRedo = useCallback(() => {
    const idx = historyIdxRef.current;
    if (idx < historyRef.current.length - 1) {
      historyIdxRef.current = idx + 1;
      isUndoRedoRef.current = true;
      setActiveState(historyRef.current[historyIdxRef.current]);
      addToast('تم إعادة التطبيق', 'info', '↪️');
    }
  }, [setActiveState, addToast]);

  // Keyboard shortcuts: Ctrl+Z / Ctrl+Y
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); handleUndo(); }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); handleRedo(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleUndo, handleRedo]);

  // Global onChange
  const handleChange = useCallback((key, value) => {
    setActiveState(prev => ({ ...prev, [key]: value }));
  }, [setActiveState]);

  // Progress (memoized)
  const progress = useMemo(() => calculateProgress(state), [state]);

  // Tab change with animation trigger
  const handleSetActiveTab = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  // Reset current campaign
  const handleReset = useCallback(() => {
    if (window.confirm('هل أنت متأكد من إعادة تعيين بيانات هذه الحملة؟')) {
      setActiveState(INITIAL_STATE);
      addToast('تمت إعادة تعيين الحملة', 'warning', '🔄');
    }
  }, [setActiveState, addToast]);

  // Add new campaign
  const handleAddCampaign = useCallback(() => {
    const name = prompt('اسم الحملة الجديدة:');
    if (!name?.trim()) return;
    const id = `campaign_${Date.now()}`;
    setCampaigns(prev => ({ ...prev, [id]: { name: name.trim(), state: { ...INITIAL_STATE, campaign_name: name.trim() } } }));
    setActiveCampaignIdState(id);
    setActiveCampaignId(id);
    addToast(`تم إنشاء "${name.trim()}"`, 'success', '🎉');
  }, [addToast]);

  // Switch campaign
  const handleSwitchCampaign = useCallback((id) => {
    setActiveCampaignIdState(id);
    setActiveCampaignId(id);
    addToast(`تم التبديل إلى "${campaigns[id]?.name || id}"`, 'info', '📋');
  }, [campaigns, addToast]);

  // Rename campaign
  const handleRenameCampaign = useCallback((id) => {
    const newName = prompt('أدخل الاسم الجديد:', campaigns[id]?.name);
    if (!newName?.trim()) return;
    setCampaigns(prev => ({ ...prev, [id]: { ...prev[id], name: newName.trim() } }));
    addToast('تم تغيير الاسم', 'success', '✏️');
  }, [campaigns, addToast]);

  // Delete campaign
  const handleDeleteCampaign = useCallback((id) => {
    if (Object.keys(campaigns).length <= 1) {
      alert('لا يمكنك حذف الحملة الوحيدة. قم بإنشاء حملة أخرى أولاً.');
      return;
    }
    if (window.confirm('هل أنت متأكد من حذف هذه الحملة نهائياً؟')) {
      setCampaigns(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      if (activeCampaignId === id) {
        const firstKey = Object.keys(campaigns).filter(k => k !== id)[0];
        setActiveCampaignIdState(firstKey);
        setActiveCampaignId(firstKey);
      }
      addToast('تم حذف الحملة', 'warning', '🗑️');
    }
  }, [campaigns, activeCampaignId, addToast]);

  // Share URL
  const handleShareURL = useCallback(() => {
    try {
      const encoded = encryptState(state);
      const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
      navigator.clipboard.writeText(url);
      addToast('تم نسخ الرابط السري! يمكنك إرساله لزميلك.', 'success', '🔗');
    } catch {
      addToast('حدث خطأ أثناء إنشاء الرابط', 'error', '❌');
    }
  }, [state, addToast]);

  // Export CSV
  const handleExportCSV = useCallback(() => {
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // BOM for Arabic
    csvContent += "المتغير,القيمة\n";
    Object.keys(state).forEach(key => {
      let val = state[key];
      if (typeof val === 'object') val = JSON.stringify(val);
      val = String(val || '').replace(/"/g, '""');
      csvContent += `${key},"${val}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `plan_${state.campaign_name || 'export'}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('تم التصدير بصيغة CSV', 'success', '📊');
  }, [state, addToast]);

  // Download HTML
  const handleDownload = useCallback(() => {
    const html = buildExportHTML(state, progress);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeName = (state.campaign_name || 'خطة-ميديا-باينج').replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\u0600-\u06FF\-_]/g, '');
    link.download = `${safeName}_${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast('تم تحميل الخطة بنجاح!', 'success', '📥');
  }, [state, progress, addToast]);

  // Export JSON (Backup)
  const handleExportJSON = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(campaigns));
    const link = document.createElement('a');
    link.href = dataStr;
    link.download = `media_buyer_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('تم تصدير البيانات بنجاح', 'success', '📥');
  }, [campaigns, addToast]);

  // Import JSON (Restore)
  const handleImportJSON = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported && typeof imported === 'object') {
          setCampaigns(imported);
          const firstId = Object.keys(imported)[0] || 'default';
          setActiveCampaignIdState(firstId);
          setActiveCampaignId(firstId);
          addToast('تم استيراد البيانات بنجاح', 'success', '🎉');
        }
      } catch {
        addToast('ملف غير صالح', 'error', '❌');
      }
    };
    reader.readAsText(file);
    // reset input
    e.target.value = null;
  }, [addToast]);

  const ActiveComponent = TAB_COMPONENTS[activeTab];
  const animKey = activeTab; // triggers re-mount for CSS animation

  return (
    <div className={isDarkMode ? 'theme-dark' : 'theme-light'}>
      <ToastContainer toasts={toasts} />
      <Header
        progressPercentage={progress}
        badgeText={badgeText}
        isBadgeSavedState={isSavedState}
        lastSavedTime={lastSavedTime}
        onManualSave={handleManualSave}
        onReset={handleReset}
        onDownload={handleDownload}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(d => !d)}
        onUndo={handleUndo}
        onRedo={handleRedo}
        campaigns={campaigns}
        activeCampaignId={activeCampaignId}
        onAddCampaign={handleAddCampaign}
        onSwitchCampaign={handleSwitchCampaign}
        onRenameCampaign={handleRenameCampaign}
        onDeleteCampaign={handleDeleteCampaign}
        onShareURL={handleShareURL}
        onExportCSV={handleExportCSV}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      <div className="app-container">
        <div className="dashboard-grid">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={handleSetActiveTab}
            state={state}
            progress={progress}
          />

          <main className="content-container" role="main">
            <Suspense fallback={<PageLoader />}>
              <div key={animKey} className="page-fade-in">
                {activeTab === 'dashboard' ? (
                  <Dashboard
                    state={state}
                    progress={progress}
                    setActiveTab={handleSetActiveTab}
                  />
                ) : ActiveComponent ? (
                  <ActiveComponent
                    state={state}
                    onChange={handleChange}
                    activeTab={activeTab}
                  />
                ) : (
                  <BrandProfiles state={state} onChange={handleChange} />
                )}
              </div>
            </Suspense>
          </main>
        </div>
      </div>
      <Suspense fallback={null}>
        <UserGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      </Suspense>
    </div>
  );
}
