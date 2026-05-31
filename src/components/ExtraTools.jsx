import { useState, useEffect, useRef } from 'react';

// ── Shared Debounced Input ─────────────────────────────────────
function DebouncedInput({ value, onChange, className, placeholder, type = "text", style }) {
    const [localValue, setLocalValue] = useState(value || '');
    const timer = useRef(null);

    useEffect(() => setLocalValue(value || ''), [value]);

    const handleChange = (e) => {
        const val = e.target.value;
        setLocalValue(val);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => onChange(val), 400);
    };

    const handleBlur = () => {
        if (timer.current) clearTimeout(timer.current);
        onChange(localValue);
    };

    return <input type={type} className={className} placeholder={placeholder} style={style} value={localValue} onChange={handleChange} onBlur={handleBlur} />;
}

// ── Shared Debounced Textarea ──────────────────────────────────
function DebouncedTextarea({ value, onChange, className, placeholder, rows, style }) {
    const [localValue, setLocalValue] = useState(value || '');
    const timer = useRef(null);

    useEffect(() => setLocalValue(value || ''), [value]);

    const handleChange = (e) => {
        const val = e.target.value;
        setLocalValue(val);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => onChange(val), 400);
    };

    const handleBlur = () => {
        if (timer.current) clearTimeout(timer.current);
        onChange(localValue);
    };

    return <textarea className={className} placeholder={placeholder} style={style} rows={rows} value={localValue} onChange={handleChange} onBlur={handleBlur} />;
}


// ── Naming Convention Builder ──────────────────────────────────
function NamingGenerator({ state }) {
    const brand = state.campaign_name ? state.campaign_name.replace(/\s+/g, '_').slice(0, 8).toUpperCase() : 'BRAND';
    const date = new Date().toISOString().slice(2, 7).replace('-', '');
    const obj = state.main_objective ? state.main_objective.slice(0, 4).toUpperCase() : 'CONV';
    const channels = ['Meta', 'TikTok', 'Google'];
    const stages = ['TOFU', 'MOFU', 'BOFU'];
    const formats = ['VID', 'IMG', 'CAR', 'UGC'];

    const examples = channels.flatMap(ch =>
        stages.map(st => `${brand}_${date}_${obj}_${ch}_${st}_${formats[Math.floor(Math.random() * formats.length)]}_V1`)
    );

    const [copied, setCopied] = useState(null);

    const copy = (text, idx) => {
        navigator.clipboard.writeText(text);
        setCopied(idx);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div>
            <div className="callout callout-blue" style={{ marginBottom: '20px' }}>
                <span className="callout-icon">💡</span>
                <div className="callout-content">
                    <p><strong>هيكل التسمية الموحدة:</strong></p>
                    <p style={{ fontFamily: 'monospace', fontSize: '0.85rem', marginTop: '4px' }}>
                        <code style={{ color: 'var(--neon-cyan)' }}>
                            [BRAND]_[YY-MM]_[OBJECTIVE]_[CHANNEL]_[STAGE]_[FORMAT]_[VERSION]
                        </code>
                    </p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {examples.map((ex, i) => (
                    <div key={i} className="naming-row">
                        <code className="naming-code">{ex}</code>
                        <button
                            className={`btn btn-secondary naming-copy-btn ${copied === i ? 'btn-success' : ''}`}
                            onClick={() => copy(ex, i)}
                        >
                            {copied === i ? '✓ تم' : '📋 نسخ'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── A/B Test Tracker ────────────────────────────────────────────
const EMPTY_TEST = { name: '', hypothesis: '', metric: '', platform: '', result_a: '', result_b: '', winner: '', status: 'جاري الاختبار' };

function ABTestTracker({ tests, onUpdate }) {
    const addTest = () => onUpdate([...tests, { ...EMPTY_TEST, id: Date.now() }]);
    const updateTest = (id, field, val) => onUpdate(tests.map(t => t.id === id ? { ...t, [field]: val } : t));
    const removeTest = (id) => onUpdate(tests.filter(t => t.id !== id));

    return (
        <div>
            <button className="btn btn-primary" onClick={addTest} style={{ marginBottom: '20px' }}>
                ＋ إضافة اختبار جديد
            </button>
            {tests.length === 0 && (
                <div className="callout callout-gray">
                    <span className="callout-icon">🧪</span>
                    <div className="callout-content">
                        <p>لا يوجد اختبارات بعد. اضغط &quot;إضافة اختبار جديد&quot; لبدء التتبع.</p>
                    </div>
                </div>
            )}
            {tests.map(t => (
                <div key={t.id} className="ab-test-card">
                    <div className="ab-test-header">
                        <input
                            className="inline-input"
                            placeholder="اسم الاختبار..."
                            value={t.name}
                            onChange={e => updateTest(t.id, 'name', e.target.value)}
                            style={{ flex: 1, fontWeight: 700, fontSize: '1rem' }}
                        />
                        <select
                            className="ab-status-select"
                            value={t.status}
                            onChange={e => updateTest(t.id, 'status', e.target.value)}
                            style={{ borderColor: t.status === 'فائز' ? 'var(--neon-green)' : t.status === 'مُلغى' ? 'var(--neon-crimson)' : 'var(--neon-amber)' }}
                        >
                            <option>جاري الاختبار</option>
                            <option>فائز</option>
                            <option>بدون نتيجة</option>
                            <option>مُلغى</option>
                        </select>
                        <button className="btn btn-danger" style={{ padding: '6px 10px', fontSize: '0.75rem' }} onClick={() => removeTest(t.id)}>🗑️</button>
                    </div>
                    <div className="grid-cols-2" style={{ marginTop: '12px' }}>
                        <div>
                            <label className="field-label">الفرضية</label>
                            <DebouncedInput className="inline-input" placeholder="ما الذي نختبره؟" value={t.hypothesis} onChange={v => updateTest(t.id, 'hypothesis', v)} />
                        </div>
                        <div>
                            <label className="field-label">المقياس الأساسي</label>
                            <DebouncedInput className="inline-input" placeholder="CTR / CPA / ROAS..." value={t.metric} onChange={v => updateTest(t.id, 'metric', v)} />
                        </div>
                        <div>
                            <label className="field-label">نتيجة A</label>
                            <DebouncedInput className="inline-input" placeholder="الرقم الفعلي لـ A" value={t.result_a} onChange={v => updateTest(t.id, 'result_a', v)} />
                        </div>
                        <div>
                            <label className="field-label">نتيجة B</label>
                            <DebouncedInput className="inline-input" placeholder="الرقم الفعلي لـ B" value={t.result_b} onChange={v => updateTest(t.id, 'result_b', v)} />
                        </div>
                    </div>
                    {t.winner && (
                        <div style={{ marginTop: '8px', color: 'var(--neon-green)', fontWeight: 700, fontSize: '0.85rem' }}>
                            🏆 الفائز: {t.winner}
                        </div>
                    )}
                    <DebouncedInput className="inline-input" placeholder="ملاحظات / التعلميات..." value={t.winner} onChange={v => updateTest(t.id, 'winner', v)} style={{ marginTop: '8px', fontSize: '0.85rem' }} />
                </div>
            ))}
        </div>
    );
}

// ── Budget Pacing Calculator ─────────────────────────────────────
function BudgetPacing({ state, onChange }) {
    const totalBudget = parseFloat(state.calc_total_budget || 0) || 0;
    const currency = state.currency || 'ج.م';
    const daysInMonth = parseInt(state.pacing_days || '30') || 30;
    const daysSpent = parseInt(state.pacing_days_spent || '0') || 0;
    const actualSpend = parseFloat(state.pacing_actual_spend || '0') || 0;

    const dailyBudget = totalBudget / daysInMonth;
    const expectedSpend = dailyBudget * daysSpent;
    const paceRatio = expectedSpend > 0 ? (actualSpend / expectedSpend) * 100 : 0;
    const remainingBudget = totalBudget - actualSpend;
    const remainingDays = daysInMonth - daysSpent;
    const projectedTotal = daysSpent > 0 ? (actualSpend / daysSpent) * daysInMonth : 0;
    const dailyRemaining = remainingDays > 0 ? remainingBudget / remainingDays : 0;

    const paceColor = paceRatio > 110 ? 'var(--neon-crimson)' : paceRatio > 90 ? 'var(--neon-green)' : 'var(--neon-amber)';
    const paceLabel = paceRatio > 110 ? '⚠️ صرف سريع!' : paceRatio > 90 ? '✅ صرف متوازن' : '🐢 صرف بطيء';

    return (
        <div>
            <div className="grid-cols-3" style={{ marginBottom: '20px' }}>
                <div className="card-item">
                    <h3>📅 إجمالي أيام الحملة</h3>
                    <DebouncedInput type="number" className="budget-input-field" style={{ width: '100%', marginTop: '8px' }}
                        placeholder="30" value={state.pacing_days || ''} onChange={v => onChange('pacing_days', v)} />
                </div>
                <div className="card-item">
                    <h3>📆 الأيام المنقضية</h3>
                    <DebouncedInput type="number" className="budget-input-field" style={{ width: '100%', marginTop: '8px' }}
                        placeholder="0" value={state.pacing_days_spent || ''} onChange={v => onChange('pacing_days_spent', v)} />
                </div>
                <div className="card-item">
                    <h3>💸 الإنفاق الفعلي حتى الآن</h3>
                    <DebouncedInput type="number" className="budget-input-field" style={{ width: '100%', marginTop: '8px' }}
                        placeholder="0" value={state.pacing_actual_spend || ''} onChange={v => onChange('pacing_actual_spend', v)} />
                </div>
            </div>

            {totalBudget > 0 && daysSpent > 0 && (
                <div className="pacing-results-grid">
                    <div className="pacing-metric">
                        <span className="pacing-num" style={{ color: 'var(--neon-cyan)' }}>{dailyBudget.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        <span className="pacing-lbl">ميزانية يومية مستهدفة ({currency})</span>
                    </div>
                    <div className="pacing-metric">
                        <span className="pacing-num" style={{ color: paceColor }}>{paceRatio.toFixed(0)}%</span>
                        <span className="pacing-lbl">{paceLabel}</span>
                    </div>
                    <div className="pacing-metric">
                        <span className="pacing-num" style={{ color: 'var(--neon-green)' }}>{dailyRemaining.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        <span className="pacing-lbl">ميزانية يومية متبقية ({currency})</span>
                    </div>
                    <div className="pacing-metric">
                        <span className="pacing-num" style={{ color: projectedTotal > totalBudget * 1.05 ? 'var(--neon-crimson)' : 'var(--text-primary)' }}>
                            {projectedTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                        <span className="pacing-lbl">الإنفاق المتوقع نهاية الشهر ({currency})</span>
                    </div>
                </div>
            )}

            {totalBudget === 0 && (
                <div className="callout callout-gray">
                    <span className="callout-icon">💡</span>
                    <div className="callout-content">
                        <p>أدخل الميزانية الإجمالية في قسم <strong>الأهداف والميزانيات</strong> أولاً لرؤية حسابات الصرف.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── KPI Tracker ─────────────────────────────────────────────────
function KPITracker({ state, onChange }) {
    const kpis = [
        { id: 'kpi_roas', label: 'ROAS المحقق', target: state.quick_roas || '—', icon: '📈', color: 'var(--neon-green)' },
        { id: 'kpi_cpl', label: 'CPL / CPA المحقق', target: state.quick_cpl || '—', icon: '🎯', color: 'var(--neon-cyan)' },
        { id: 'kpi_ctr', label: 'CTR المتوسط', target: '2%+', icon: '👆', color: 'var(--neon-blue)' },
        { id: 'kpi_cvr', label: 'Conversion Rate', target: state.assumption_cr || '—', icon: '🔄', color: 'var(--neon-amber)' },
        { id: 'kpi_spend', label: 'إجمالي الإنفاق الفعلي', target: state.calc_total_budget || '—', icon: '💰', color: 'var(--neon-crimson)' },
        { id: 'kpi_revenue', label: 'إجمالي الإيرادات المحققة', target: state.target_sales_revenue || '—', icon: '🏆', color: 'var(--neon-green)' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {kpis.map(kpi => {
                const actual = state[kpi.id] || '';
                const hasActual = actual.trim() !== '';
                return (
                    <div key={kpi.id} className="kpi-tracker-row">
                        <span className="kpi-tracker-icon">{kpi.icon}</span>
                        <div className="kpi-tracker-label">
                            <span style={{ fontWeight: 700 }}>{kpi.label}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>المستهدف: {kpi.target}</span>
                        </div>
                        <DebouncedInput
                            className="kpi-tracker-input"
                            type="text"
                            placeholder="أدخل الرقم الفعلي"
                            value={actual}
                            onChange={v => onChange(kpi.id, v)}
                            style={{ borderColor: hasActual ? kpi.color : undefined }}
                        />
                        {hasActual && (
                            <span className="kpi-tracker-badge" style={{ background: `${kpi.color}18`, color: kpi.color, borderColor: `${kpi.color}40` }}>
                                كود خصم حصري ومؤقت &quot;اليوم فقط&quot;
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// ── Campaign Timeline ────────────────────────────────────────────
function CampaignTimeline({ state, onChange }) {
    const phases = [
        { id: 'tl_prep', label: '🛠️ مرحلة التحضير', color: '#64748b', desc: 'إعداد الكرييتف، الحسابات، البيكسلز' },
        { id: 'tl_tofu', label: '🔷 TOFU — الاستقطاب', color: 'var(--neon-blue)', desc: 'حملات التوعية والجمهور البارد' },
        { id: 'tl_mofu', label: '🔶 MOFU — التفاعل', color: 'var(--neon-amber)', desc: 'حملات التحويل والجمهور الدافئ' },
        { id: 'tl_bofu', label: '🔹 BOFU — الإغلاق', color: 'var(--neon-green)', desc: 'إعادة الاستهداف والإغلاق' },
        { id: 'tl_analysis', label: '📊 التحليل والتعلم', color: '#8b5cf6', desc: 'Post-Mortem وتقارير الأداء' },
    ];

    return (
        <div className="timeline-container">
            {phases.map((phase, i) => (
                <div key={phase.id} className="timeline-phase">
                    <div className="timeline-dot" style={{ background: phase.color }} />
                    {i < phases.length - 1 && <div className="timeline-line" />}
                    <div className="timeline-content">
                        <div className="timeline-phase-header">
                            <span style={{ fontWeight: 700, color: phase.color }}>{phase.label}</span>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <input
                                    className="timeline-date-input"
                                    type="date"
                                    value={state[`${phase.id}_start`] || ''}
                                    onChange={e => onChange(`${phase.id}_start`, e.target.value)}
                                    title="تاريخ البداية"
                                />
                                <span style={{ color: 'var(--text-muted)' }}>→</span>
                                <input
                                    className="timeline-date-input"
                                    type="date"
                                    value={state[`${phase.id}_end`] || ''}
                                    onChange={e => onChange(`${phase.id}_end`, e.target.value)}
                                    title="تاريخ النهاية"
                                />
                            </div>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{phase.desc}</p>
                        <DebouncedInput
                            className="inline-input"
                            placeholder="ملاحظات هذه المرحلة..."
                            value={state[`${phase.id}_notes`] || ''}
                            onChange={v => onChange(`${phase.id}_notes`, v)}
                            style={{ marginTop: '8px', fontSize: '0.82rem' }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

// ── Notes System ─────────────────────────────────────────────────
const NOTE_COLORS = ['#0052ff', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
const EMPTY_NOTE = { text: '', color: '#0052ff', pinned: false };

function NotesSystem({ notes, onUpdate }) {
    const addNote = () => onUpdate([...notes, { ...EMPTY_NOTE, id: Date.now(), text: '', color: NOTE_COLORS[notes.length % NOTE_COLORS.length] }]);
    const updateNote = (id, field, val) => onUpdate(notes.map(n => n.id === id ? { ...n, [field]: val } : n));
    const removeNote = (id) => onUpdate(notes.filter(n => n.id !== id));

    return (
        <div>
            <button className="btn btn-primary" onClick={addNote} style={{ marginBottom: '20px' }}>
                ＋ ملاحظة جديدة
            </button>
            {notes.length === 0 && (
                <div className="callout callout-gray">
                    <span className="callout-icon">📝</span>
                    <div className="callout-content">
                        <p>لا يوجد ملاحظات بعد. اضغط &quot;ملاحظة جديدة&quot; لإضافة أي فكرة أو تحذير سريع.</p>
                    </div>
                </div>
            )}
            <div className="notes-grid">
                {[...notes].sort((a, b) => b.pinned - a.pinned).map(note => (
                    <div key={note.id} className="sticky-note" style={{ borderTopColor: note.color }}>
                        <div className="sticky-note-header">
                            <div style={{ display: 'flex', gap: '6px' }}>
                                {NOTE_COLORS.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => updateNote(note.id, 'color', c)}
                                        style={{
                                            width: '14px', height: '14px', borderRadius: '50%',
                                            background: c, border: note.color === c ? '2px solid white' : 'none',
                                            cursor: 'pointer', padding: 0
                                        }}
                                    />
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <button
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', opacity: note.pinned ? 1 : 0.4 }}
                                    onClick={() => updateNote(note.id, 'pinned', !note.pinned)}
                                    title={note.pinned ? 'إلغاء التثبيت' : 'تثبيت'}
                                >📌</button>
                                <button
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--neon-crimson)' }}
                                    onClick={() => removeNote(note.id)}
                                >✕</button>
                            </div>
                        </div>
                        <DebouncedTextarea
                            className="sticky-note-textarea"
                            placeholder="اكتب ملاحظتك هنا..."
                            value={note.text}
                            onChange={v => updateNote(note.id, 'text', v)}
                            rows={4}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Main Extras Page ─────────────────────────────────────────────
const EXTRA_TABS = [
    { id: 'pacing',   icon: '📆', label: 'Budget Pacing' },
    { id: 'kpi',      icon: '📊', label: 'KPI Tracker' },
    { id: 'ab',       icon: '🧪', label: 'A/B Tests' },
    { id: 'timeline', icon: '📅', label: 'Timeline' },
    { id: 'naming',   icon: '🏷️', label: 'Naming Conv.' },
    { id: 'notes',    icon: '📝', label: 'Notes' },
];

export default function ExtraTools({ state, onChange }) {
    const [activeExtra, setActiveExtra] = useState('pacing');

    // A/B tests live as JSON in state
    const abTests = state._ab_tests ? JSON.parse(state._ab_tests) : [];
    const setAbTests = (arr) => onChange('_ab_tests', JSON.stringify(arr));

    // Notes live as JSON in state
    const notes = state._notes ? JSON.parse(state._notes) : [];
    const setNotes = (arr) => onChange('_notes', JSON.stringify(arr));

    return (
        <div className="glass-panel">
            <h2 className="panel-title">🛠️ أدوات إضافية</h2>
            <p className="panel-subtitle">مجموعة أدوات تحليلية وتشغيلية مساعدة لضمان كفاءة إدارة الحملات.</p>

            {/* Sub-tab bar */}
            <div className="extra-tabs-bar">
                {EXTRA_TABS.map(tab => (
                    <button
                        key={tab.id}
                        className={`extra-tab-btn ${activeExtra === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveExtra(tab.id)}
                    >
                        <span>{tab.icon}</span>
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            <div style={{ marginTop: '28px' }}>
                {activeExtra === 'pacing' && (
                    <>
                        <h3 className="section-title">📆 حاسبة Pacing — تحكم بسرعة الصرف</h3>
                        <BudgetPacing state={state} onChange={onChange} />
                    </>
                )}
                {activeExtra === 'kpi' && (
                    <>
                        <h3 className="section-title">📊 متابعة الأرقام الفعلية مقابل المستهدفة</h3>
                        <KPITracker state={state} onChange={onChange} />
                    </>
                )}
                {activeExtra === 'ab' && (
                    <>
                        <h3 className="section-title">🧪 تتبع الاختبارات التجريبية A/B</h3>
                        <ABTestTracker tests={abTests} onUpdate={setAbTests} />
                    </>
                )}
                {activeExtra === 'timeline' && (
                    <>
                        <h3 className="section-title">📅 الجدول الزمني للحملة</h3>
                        <CampaignTimeline state={state} onChange={onChange} />
                    </>
                )}
                {activeExtra === 'naming' && (
                    <>
                        <h3 className="section-title">🏷️ مولّد أسماء الحملات الموحدة</h3>
                        <NamingGenerator state={state} />
                    </>
                )}
                {activeExtra === 'notes' && (
                    <>
                        <h3 className="section-title">📝 ملاحظات سريعة</h3>
                        <NotesSystem notes={notes} onUpdate={setNotes} />
                    </>
                )}
            </div>
        </div>
    );
}
