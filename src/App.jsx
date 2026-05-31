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
  const sections = [
    { title: 'الملخص التنفيذي', fields: [
      ['اسم الحملة', state.campaign_name],
      ['الفترة الزمنية', `${state.period_from} → ${state.period_to}`],
      ['الهدف الأساسي', state.main_objective],
      ['الميزانية الإجمالية', `${state.total_budget_summary} ${state.currency}`],
      ['القنوات الأساسية', state.primary_channels],
      ['الـ KPI المستهدف', `${state.target_kpi_type}: ${state.target_kpi_value}`],
    ]},
    { title: 'الأهداف والميزانيات', fields: [
      ['المبيعات المستهدفة', state.target_sales_revenue],
      ['عدد الليدز المستهدف', state.target_leads_count],
      ['متوسط قيمة السلة (AOV)', state.assumption_aov],
      ['معدل التحويل المتوقع (CR)', state.assumption_cr],
      ['هامش الربح', state.assumption_margin],
      ['تعريف التحويل', state.conversion_event_def],
      ['نافذة الإسناد', state.attribution_window],
      [`Meta (${state.budget_meta_pct}%)`, `${state.meta_calculated_val} ${state.currency}`],
      [`TikTok (${state.budget_tiktok_pct}%)`, `${state.tiktok_calculated_val} ${state.currency}`],
      [`Google (${state.budget_google_pct}%)`, `${state.google_calculated_val} ${state.currency}`],
      [`أخرى (${state.budget_other_pct}%)`, `${state.other_calculated_val} ${state.currency}`],
    ]},
    { title: 'الجمهور والرسالة', fields: [
      ['شريحة 1 — الاسم', state.seg1_name],
      ['شريحة 1 — الفئة العمرية', state.seg1_age],
      ['شريحة 1 — الجغرافيا', state.seg1_geo],
      ['شريحة 1 — الاهتمامات', state.seg1_interests],
      ['شريحة 1 — نقطة الألم', state.seg1_pain],
      ['شريحة 1 — زاوية الرسالة', state.seg1_angle],
      ['شريحة 2 — الاسم', state.seg2_name],
      ['شريحة 2 — الفئة العمرية', state.seg2_age],
      ['شريحة 2 — الجغرافيا', state.seg2_geo],
      ['شريحة 2 — الاهتمامات', state.seg2_interests],
      ['شريحة 2 — نقطة الألم', state.seg2_pain],
      ['شريحة 2 — زاوية الرسالة', state.seg2_angle],
    ]},
    { title: 'استراتيجية القمع وإعادة الاستهداف', fields: [
      ['ميزانية TOFU', state.funnel_tofu_budget],
      ['ميزانية MOFU', state.funnel_mofu_budget],
      ['ميزانية BOFU', state.funnel_bofu_budget],
      ['Retargeting 1 — النافذة', state.retarget_window_1],
      ['Retargeting 1 — الجمهور', state.retarget_audience_1],
      ['Retargeting 1 — الرسالة', state.retarget_msg_1],
    ]},
    { title: 'قواعد القرارات', fields: [
      ['Scale — المحفز', state.rule_scale_trigger],
      ['Scale — الإجراء', state.rule_scale_action],
      ['Kill — المحفز', state.rule_kill_trigger],
      ['Kill — الإجراء', state.rule_kill_action],
      ['Pause — المحفز', state.rule_pause_trigger],
      ['Pause — الإجراء', state.rule_pause_action],
      ['ميزانية الاختبار', state.rule_test_budget],
      ['مدة الاختبار', state.rule_test_duration],
    ]},
    { title: 'Post-Mortem التعلميات', fields: [
      ['الحملة', state.pm_campaign_name],
      ['الفترة', state.pm_period],
      ['الإنفاق', state.pm_spend],
      ['الإيرادات', state.pm_revenue],
      ['ROAS المحقق', state.pm_roas],
      ['CPL المحقق', state.pm_cpl],
      ['التعلميات الرئيسية', state.pm_learnings],
      ['الخطوات القادمة', state.pm_next_steps],
      ['الكرييتف الفائز', state.pm_winner_creative],
      ['الجمهور الفائز', state.pm_winner_audience],
    ]},
  ];

  const sectionsHTML = sections.map(sec => `
    <div class="export-section">
      <h2>${sec.title}</h2>
      <table>
        <tbody>
          ${sec.fields.map(([label, val]) => `
            <tr>
              <th>${label}</th>
              <td>${val || '<span class="empty">—</span>'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `).join('');

  const verifiedItems = [
    { label: 'متوسط قيمة السلة (AOV)', checked: state.verify_aov_checked, source: state.verify_aov_source },
    { label: 'معدل تحويل الموقع (CR)', checked: state.verify_cr_checked, source: state.verify_cr_source },
    { label: 'هامش ربح المنتجات (Margin)', checked: state.verify_margin_checked, source: state.verify_margin_source },
    { label: 'الميزانية الكلية للحملة', checked: state.verify_budget_checked, source: state.verify_budget_source },
  ].filter(item => item.checked && item.source);

  let integrityHTML = '';
  if (verifiedItems.length > 0) {
    integrityHTML = `
      <div class="export-section" style="border: 2px solid #10b981; border-radius: 12px; overflow: hidden; page-break-inside: avoid; margin-top: 24px;">
        <h2 style="background: #ecfdf5; color: #065f46; border-bottom: 2px solid #10b981; font-size: 1.1rem; font-weight: 800; padding: 14px 20px;">
          🛡️ تقرير موثوقية وجودة البيانات (Data Integrity Certificate)
        </h2>
        <p style="padding: 12px 20px; font-size: 0.85rem; color: #047857; background: #f0fdf4; font-weight: 600;">
          تم تدقيق وتأكيد صحة هذه البيانات الإدارية والمالية وإسنادها إلى مصادرها الرسمية الفعالة:
        </p>
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            ${verifiedItems.map(item => `
              <tr>
                <th style="text-align: right; padding: 11px 20px; background: #f8fafc; font-size: 0.85rem; font-weight: 700; color: #065f46; width: 35%; border-bottom: 1px solid #e2e8f0;">${item.label}</th>
                <td style="padding: 11px 20px; font-size: 0.9rem; color: #0f172a; font-weight: 600; border-bottom: 1px solid #e2e8f0;"><span style="color: #10b981; font-weight: 800;">✓ موثق</span> • من خلال: ${item.source}</td>
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
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Cairo', sans-serif;
      background: #f8fafc;
      color: #1e293b;
      padding: 40px;
      line-height: 1.6;
    }
    .export-header {
      text-align: center;
      margin-bottom: 48px;
      padding: 32px;
      background: linear-gradient(135deg, #0052ff 0%, #00f0ff 100%);
      border-radius: 16px;
      color: white;
    }
    .export-header h1 { font-size: 2rem; font-weight: 800; margin-bottom: 8px; }
    .export-header p { font-size: 1rem; opacity: 0.85; }
    .export-header .progress-badge {
      display: inline-block;
      margin-top: 12px;
      padding: 6px 20px;
      background: rgba(255,255,255,0.2);
      border-radius: 20px;
      font-weight: 700;
      font-size: 0.9rem;
    }
    .export-section {
      margin-bottom: 36px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      page-break-inside: avoid;
    }
    .export-section h2 {
      font-size: 1.1rem;
      font-weight: 800;
      padding: 14px 20px;
      background: #f1f5f9;
      border-bottom: 2px solid #e2e8f0;
      color: #0f172a;
    }
    table { width: 100%; border-collapse: collapse; }
    th {
      text-align: right;
      padding: 11px 20px;
      background: #f8fafc;
      font-size: 0.85rem;
      font-weight: 600;
      color: #64748b;
      width: 30%;
      border-bottom: 1px solid #e2e8f0;
    }
    td {
      padding: 11px 20px;
      font-size: 0.9rem;
      color: #1e293b;
      font-weight: 500;
      border-bottom: 1px solid #e2e8f0;
    }
    tr:last-child th, tr:last-child td { border-bottom: none; }
    .empty { color: #94a3b8; font-style: italic; }
    .export-footer {
      text-align: center;
      margin-top: 48px;
      padding: 20px;
      color: #94a3b8;
      font-size: 0.8rem;
    }
    @media print {
      body { padding: 0; background: #fff; }
      .export-header { background: #0052ff !important; -webkit-print-color-adjust: exact; padding: 40px; margin-bottom: 20px; }
      .export-section { page-break-inside: avoid; border: 1px solid #ccc; margin-bottom: 20px; }
      table { border-collapse: collapse; width: 100%; }
      th, td { padding: 8px; border: 1px solid #ddd; }
    }
  </style>
</head>
<body>
  <div class="export-header">
    ${state.agency_name ? `<p style="font-size:1.2rem; margin-bottom:10px; font-weight:bold;">مُقدمة بواسطة: ${state.agency_name}</p>` : ''}
    <h1>🎯 خطة ميديا باينج</h1>
    <p>${state.campaign_name || 'الحملة الإعلانية'} • ${state.period_from || '—'} إلى ${state.period_to || '—'}</p>
    <div class="progress-badge">نسبة اكتمال الخطة: ${progress}%</div>
  </div>
  ${sectionsHTML}
  ${integrityHTML}
  <div class="export-footer">
    تم إنشاء هذه الخطة بواسطة لوحة تحكم ميديا باينج التفاعلية • ${new Date().toLocaleDateString('ar-SA')}
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
        const decodedStr = decodeURIComponent(atob(dataParam));
        const parsedState = JSON.parse(decodedStr);
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
      const dataStr = JSON.stringify(state);
      const encoded = btoa(encodeURIComponent(dataStr));
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
