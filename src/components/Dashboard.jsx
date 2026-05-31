import { useState } from 'react';

// ── SVG Donut Chart ──────────────────────────────────────────────
function DonutChart({ segments, size = 160, thickness = 28 }) {
    const [hovered, setHovered] = useState(null);
    const r = (size - thickness) / 2;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = 2 * Math.PI * r;
    const total = segments.reduce((s, seg) => s + seg.value, 0);

    let offset = 0;
    const arcs = segments.map((seg) => {
        const pct = total > 0 ? seg.value / total : 0;
        const dash = pct * circumference;
        const gap = circumference - dash;
        const arc = { ...seg, dash, gap, offset: offset * circumference };
        offset += pct;
        return arc;
    });

    return (
        <div className="donut-wrap">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={thickness} />
                {arcs.map((arc, i) => (
                    <circle
                        key={i}
                        cx={cx} cy={cy} r={r}
                        fill="none"
                        stroke={arc.color}
                        strokeWidth={hovered === i ? thickness + 4 : thickness}
                        strokeDasharray={`${arc.dash} ${arc.gap}`}
                        strokeDashoffset={-arc.offset}
                        strokeLinecap="butt"
                        transform={`rotate(-90 ${cx} ${cy})`}
                        style={{
                            transition: 'stroke-width 0.2s ease, opacity 0.2s ease',
                            opacity: hovered !== null && hovered !== i ? 0.35 : 1,
                            cursor: 'pointer'
                        }}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                    />
                ))}
                {hovered !== null ? (
                    <>
                        <text x={cx} y={cy - 6} textAnchor="middle" fill={arcs[hovered].color} fontSize="15" fontWeight="800">
                            {Math.round(arcs[hovered].value / (total || 1) * 100)}%
                        </text>
                        <text x={cx} y={cy + 12} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                            {arcs[hovered].label}
                        </text>
                    </>
                ) : (
                    <text x={cx} y={cy + 5} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
                        الميزانية
                    </text>
                )}
            </svg>
            <div className="donut-legend">
                {segments.map((seg, i) => (
                    <div
                        key={i}
                        className="donut-legend-item"
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <span className="donut-dot" style={{ background: seg.color }} />
                        <span className="donut-legend-label">{seg.label}</span>
                        <span className="donut-legend-pct" style={{ color: seg.color }}>{seg.pct}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── KPI Card ─────────────────────────────────────────────────────
function KpiCard({ icon, label, value, color, sublabel }) {
    return (
        <div className="kpi-card" style={{ '--kpi-color': color }}>
            <div className="kpi-icon">{icon}</div>
            <div className="kpi-body">
                <div className="kpi-value" style={{ color }}>{value || '—'}</div>
                <div className="kpi-label">{label}</div>
                {sublabel && <div className="kpi-sublabel">{sublabel}</div>}
            </div>
        </div>
    );
}

// ── Status Badge ─────────────────────────────────────────────────
function StatusBadge({ done, label }) {
    return (
        <span className={`status-badge ${done ? 'badge-green' : 'badge-gray'}`}>
            {done ? '✓' : '○'} {label}
        </span>
    );
}

// ── Main Dashboard ───────────────────────────────────────────────
export default function Dashboard({ state, progress, setActiveTab }) {
    const totalBudget = parseFloat(state.calc_total_budget || state.total_budget_summary || 0) || 0;
    const currency = state.currency || 'ج.م';

    const budgetSegments = [
        { label: 'Meta', pct: parseInt(state.budget_meta_pct) || 40, value: Math.round(totalBudget * ((parseInt(state.budget_meta_pct) || 40) / 100)), color: '#0052ff' },
        { label: 'TikTok', pct: parseInt(state.budget_tiktok_pct) || 30, value: Math.round(totalBudget * ((parseInt(state.budget_tiktok_pct) || 30) / 100)), color: '#ff0050' },
        { label: 'Google', pct: parseInt(state.budget_google_pct) || 20, value: Math.round(totalBudget * ((parseInt(state.budget_google_pct) || 20) / 100)), color: '#fbbc04' },
        { label: 'أخرى', pct: parseInt(state.budget_other_pct) || 10, value: Math.round(totalBudget * ((parseInt(state.budget_other_pct) || 10) / 100)), color: '#10b981' },
    ];

    const prelaunchChecks = [
        [state.check_sync_cs, 'خدمة العملاء'],
        [state.check_speed_mobile, 'سرعة الموبايل'],
        [state.check_checkout_qa, 'تجربة الدفع'],
        [state.check_payment_gate, 'بوابات الدفع'],
        [state.check_qa_logo, 'اللاندنج QA'],
        [state.check_qa_reviews, 'المراجعات'],
        [state.check_tofu_reels, 'كرييتف TOFU'],
        [state.check_mofu_benefits, 'كرييتف MOFU'],
        [state.check_bofu_dpa, 'كرييتف BOFU'],
    ];
    const doneChecks = prelaunchChecks.filter(([v]) => !!v).length;

    const quickLinks = [
        { id: 'summary',    icon: '📝', label: 'الملخص التنفيذي',    color: '#0052ff' },
        { id: 'objectives', icon: '🎯', label: 'الأهداف والميزانيات', color: '#00f0ff' },
        { id: 'audience',   icon: '🧲', label: 'الجمهور والرسالة',    color: '#f59e0b' },
        { id: 'funnel',     icon: '🔽', label: 'استراتيجية القمع',    color: '#10b981' },
        { id: 'creative',   icon: '🎬', label: 'مكتبة الكرييتف',      color: '#8b5cf6' },
        { id: 'checklist',  icon: '✅', label: 'قائمة الإطلاق',       color: '#06b6d4' },
        { id: 'rules',      icon: '⚡', label: 'قواعد القرار',         color: '#ef4444' },
        { id: 'postmortem', icon: '🏆', label: 'Post-Mortem',          color: '#f97316' },
    ];

    return (
        <div className="glass-panel">
            <h2 className="panel-title">🏠 Dashboard — نظرة عامة</h2>
            <p className="panel-subtitle">
                {state.campaign_name
                    ? `حملة: ${state.campaign_name} • ${state.period_from || '—'} → ${state.period_to || '—'}`
                    : 'أدخل بيانات الحملة لرؤية الملخص التفاعلي هنا'}
            </p>

            {/* Progress Bar */}
            <div className="dashboard-overview-bar">
                <div className="dashboard-overview-fill" style={{ width: `${progress}%` }} />
                <span className="dashboard-overview-text">
                    {progress}% اكتمال الخطة {progress === 100 && '🎉'}
                </span>
            </div>

            {/* KPI Cards */}
            <div className="grid-cols-2" style={{ marginTop: '28px' }}>
                <KpiCard icon="💰" label="الميزانية الإجمالية"
                    value={totalBudget ? `${totalBudget.toLocaleString()} ${currency}` : null}
                    color="var(--neon-cyan)"
                    sublabel={state.primary_channels || 'القنوات غير محددة بعد'} />
                <KpiCard icon="🎯" label="الهدف الأساسي"
                    value={state.main_objective || null}
                    color="var(--neon-blue)"
                    sublabel={state.target_kpi_type ? `${state.target_kpi_type}: ${state.target_kpi_value || '—'}` : 'لم يُحدد KPI بعد'} />
                <KpiCard icon="📈" label="المبيعات المستهدفة"
                    value={state.target_sales_revenue || null}
                    color="var(--neon-green)"
                    sublabel={state.assumption_aov ? `متوسط السلة: ${state.assumption_aov}` : null} />
                <KpiCard icon="🏆" label="Break-even ROAS"
                    value={state.quick_be_roas || null}
                    color="var(--neon-amber)"
                    sublabel={state.assumption_margin ? `هامش الربح: ${state.assumption_margin}` : null} />
            </div>

            {/* Budget Donut + Bars */}
            {totalBudget > 0 && (
                <>
                    <h3 className="section-title">💡 توزيع الميزانية</h3>
                    <div className="budget-visual-row">
                        <DonutChart segments={budgetSegments} size={160} thickness={30} />
                        <div className="budget-split-grid" style={{ flex: 1 }}>
                            {budgetSegments.map(({ label, value: val, pct, color }) => (
                                <div key={label} className="budget-split-bar-item">
                                    <div className="budget-split-top">
                                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{label}</span>
                                        <span style={{ color, fontWeight: 800 }}>{pct}%</span>
                                    </div>
                                    <div className="budget-split-track">
                                        <div className="budget-split-fill" style={{ width: `${pct}%`, background: color }} />
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                        {val.toLocaleString()} {currency}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Readiness */}
            <h3 className="section-title">🚀 جاهزية الإطلاق</h3>
            <div className="readiness-block">
                <div className="readiness-score">
                    <span className="readiness-num" style={{
                        color: doneChecks >= 7 ? 'var(--neon-green)' : doneChecks >= 4 ? 'var(--neon-amber)' : 'var(--neon-crimson)'
                    }}>
                        {doneChecks}/{prelaunchChecks.length}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                        {doneChecks >= 7 ? '✅ جاهز للإطلاق!' : doneChecks >= 4 ? '⚠️ استكمل التحضير' : '🔴 ابدأ التحضير'}
                    </span>
                </div>
                <div className="readiness-badges">
                    {prelaunchChecks.map(([done, label], i) => (
                        <StatusBadge key={i} done={done} label={label} />
                    ))}
                </div>
            </div>

            {/* Quick Navigation */}
            <h3 className="section-title">⚡ انتقال سريع</h3>
            <div className="quicklinks-grid">
                {quickLinks.map(({ id, icon, label, color }) => (
                    <button
                        key={id}
                        className="quicklink-btn"
                        style={{ '--ql-color': color }}
                        onClick={() => setActiveTab(id)}
                    >
                        <span className="quicklink-icon">{icon}</span>
                        <span>{label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
