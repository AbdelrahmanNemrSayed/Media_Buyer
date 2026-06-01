import { useEffect } from 'react';
import EditableSlot from './EditableSlot';

// ── Industry Benchmarks & Evaluation Logic ──
const getConversionRateBenchmark = (valStr, industry) => {
    if (!valStr) return null;
    const numeric = parseFloat(valStr.replace(/[^\d.]/g, ''));
    if (isNaN(numeric)) return null;

    let low = 1.0;
    let high = 2.5;

    if (industry === 'beauty') {
        low = 1.5;
        high = 3.5;
    } else if (industry === 'fashion') {
        low = 1.2;
        high = 3.0;
    } else if (industry === 'services') {
        low = 2.5;
        high = 7.0;
    }

    if (numeric < low) {
        return { text: `معدل تحويل منخفض لهذا القطاع (ينصح بتحسين سلاسل إقناع المتجر لحماية الصرف إعلانيًا، المألوف > ${low}%)`, color: 'var(--neon-crimson)', bg: 'rgba(255, 0, 85, 0.05)', icon: '🔴' };
    } else if (numeric <= high) {
        return { text: 'معدل تحويل طبيعي ومناسب تماماً للبدء والتسويق الإعلاني الناجح في قطاعك', color: 'var(--neon-green)', bg: 'rgba(16, 185, 129, 0.05)', icon: '🟢' };
    } else {
        return { text: 'معدل تحويل فائق ومثالي للتوسع والنمو ومضاعفة الميزانية بثقة في قطاعك', color: 'var(--neon-cyan)', bg: 'rgba(0, 240, 255, 0.05)', icon: '🔵' };
    }
};

const getMarginBenchmark = (valStr, industry) => {
    if (!valStr) return null;
    const numeric = parseFloat(valStr.replace(/[^\d.]/g, ''));
    if (isNaN(numeric)) return null;

    let low = 30;
    let high = 50;

    if (industry === 'beauty') {
        low = 50;
        high = 70;
    } else if (industry === 'fashion') {
        low = 40;
        high = 60;
    } else if (industry === 'services') {
        low = 20;
        high = 40;
    }

    if (numeric < low) {
        return { text: `هامش ربح منخفض لهذا القطاع (يزيد مخاطر الحملات، المألوف > ${low}%، استهدف رفع قيمة السلة AOV)`, color: 'var(--neon-amber)', bg: 'rgba(245, 158, 11, 0.05)', icon: '🟡' };
    } else if (numeric <= high) {
        return { text: 'هامش ربح مناسب جداً ومريح للتحكم في تكاليف الحصول على مبيعات CPA', color: 'var(--neon-green)', bg: 'rgba(16, 185, 129, 0.05)', icon: '🟢' };
    } else {
        return { text: 'هامش ربح ممتاز ومرتفع (فرصة هائلة للتوسع والمضاعفة السريعة للمبيعات)', color: 'var(--neon-cyan)', bg: 'rgba(0, 240, 255, 0.05)', icon: '🔵' };
    }
};

export default function CampaignObjectives({ state, onChange }) {
    // Local auto-calculation helper for budgets
    const totalBudget = parseFloat(state.calc_total_budget || '0') || 0;
    const metaPct = parseInt(state.budget_meta_pct || '40') || 0;
    const tiktokPct = parseInt(state.budget_tiktok_pct || '30') || 0;
    const googlePct = parseInt(state.budget_google_pct || '20') || 0;
    const otherPct = parseInt(state.budget_other_pct || '10') || 0;

    const metaVal = Math.round((totalBudget * metaPct) / 100);
    const tiktokVal = Math.round((totalBudget * tiktokPct) / 100);
    const googleVal = Math.round((totalBudget * googlePct) / 100);
    const otherVal = Math.round((totalBudget * otherPct) / 100);

    const sumPct = metaPct + tiktokPct + googlePct + otherPct;
    const isSumCorrect = sumPct === 100;

    // We can update the calculated values back to the global state dynamically
    useEffect(() => {
        onChange('meta_calculated_val', metaVal.toString());
        onChange('tiktok_calculated_val', tiktokVal.toString());
        onChange('google_calculated_val', googleVal.toString());
        onChange('other_calculated_val', otherVal.toString());
    }, [totalBudget, metaPct, tiktokPct, googlePct, otherPct, metaVal, tiktokVal, googleVal, otherVal, onChange]);

    // ── Smart Financial Estimator Calculations ──
    const salesRevenue = parseFloat(state.target_sales_revenue?.replace(/[^\d.]/g, '')) || 0;
    const aov = parseFloat(state.assumption_aov?.replace(/[^\d.]/g, '')) || 0;
    const cr = parseFloat(state.assumption_cr?.replace(/[^\d.]/g, '')) || 0;
    const margin = parseFloat(state.assumption_margin?.replace(/[^\d.]/g, '')) || 0;

    const hasEstimatorData = salesRevenue > 0 && aov > 0 && cr > 0;
    let suggestedOrders = 0;
    let suggestedVisitors = 0;
    let breakevenCPA = 0;
    let targetCPA = 0;
    let suggestedBudget = 0;
    let estimatedROAS = 0;

    if (hasEstimatorData) {
        suggestedOrders = Math.ceil(salesRevenue / aov);
        suggestedVisitors = Math.ceil(suggestedOrders / (cr / 100));
        if (margin > 0) {
            breakevenCPA = aov * (margin / 100);
            targetCPA = Math.round(breakevenCPA * 0.7 * 10) / 10;
            suggestedBudget = Math.round(suggestedOrders * targetCPA);
            estimatedROAS = Math.round((aov / targetCPA) * 100) / 100;
        }
    }

    return (
        <div className="glass-panel">
            <h2 className="panel-title">الأهداف والميزانيات التفاعلية</h2>
            <p className="panel-subtitle">حدد أهدافك البيعية، الميزانية الإجمالية وتوزيع الحصص الإعلانية مع حاسبة النسب الذكية.</p>

            <h3 className="section-title">2) الأهداف الرئيسية (Campaign Objectives)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                الإجابة على سؤال الإدارة الكلاسيكي: <strong>إحنا هنصرف كام عشان نجيب إيه؟</strong>
            </p>

            <div className="grid-cols-2">
                <div className="card-item">
                    <h3>🎯 الأهداف البيعية والمالية</h3>
                    <p style={{ marginTop: '12px' }}>
                        • الهدف المالي المطلوب: تحقيق مبيعات بقيمة <strong><EditableSlot id="target_sales_revenue" placeholder="مبيعات مستهدفة" value={state.target_sales_revenue} onChange={onChange} /></strong>
                    </p>
                    <p>
                        • أو الحصول على عدد ليدز مستهدف: <strong><EditableSlot id="target_leads_count" placeholder="عدد الليدز" value={state.target_leads_count} onChange={onChange} /></strong>
                    </p>
                    <p>
                        • الميزانية الإجمالية التقديرية: <strong><EditableSlot id="target_total_budget_text" placeholder="الرقم الإجمالي" value={state.target_total_budget_text} onChange={onChange} /></strong>
                    </p>
                </div>

                <div className="card-item" style={{ borderColor: 'rgba(0, 240, 255, 0.22)' }}>
                    <h3>📊 الافتراضات الحسابية وتدقيق البيانات (Assumptions)</h3>
                    
                    <div style={{ marginBottom: '14px', borderBottom: '1px dashed var(--glass-border)', paddingBottom: '12px', marginTop: '10px' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '700' }}>
                            🛒 تخصص قطاع المتجر / البراند لتعديل المعايير:
                        </label>
                        <select 
                            value={state.industry_category || 'general'} 
                            onChange={(e) => onChange('industry_category', e.target.value)}
                            style={{
                                width: '100%',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text-primary)',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                fontSize: '0.85rem',
                                outline: 'none'
                            }}
                        >
                            <option value="general">🛍️ التجارة الإلكترونية العامة (General E-Commerce)</option>
                            <option value="beauty">💄 مستحضرات التجميل والعناية (Beauty &amp; Cosmetics)</option>
                            <option value="fashion">👗 الملابس والأزياء والترند (Apparel &amp; Fashion)</option>
                            <option value="services">⚡ الخدمات والتسجيل والليدز (Services &amp; Leads)</option>
                        </select>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* AOV block */}
                        <div className="integrity-row-item">
                            <div className="integrity-field-main">
                                <span className="integrity-field-label">
                                    متوسط قيمة السلة (AOV) {state.verify_aov_checked ? '🔒' : ''}
                                    <span className="info-tooltip-trigger" title="متوسط القيمة المالية للطلب الواحد في المتجر. احصل عليه من: لوحة المتجر > الإحصائيات > متوسط قيمة الطلب لآخر 90 يوم.">ℹ️</span>
                                </span>
                                <div className="integrity-input-wrap">
                                    <strong><EditableSlot id="assumption_aov" placeholder="متوسط الطلب" value={state.assumption_aov} onChange={onChange} disabled={state.verify_aov_checked} /></strong>
                                    <span className="currency-badge">{state.currency || 'ج.م'}</span>
                                </div>
                            </div>
                            <div className="integrity-verification-panel">
                                <label className="verify-checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        checked={state.verify_aov_checked || false}
                                        onChange={(e) => onChange('verify_aov_checked', e.target.checked)}
                                    />
                                    <span className="verify-checkmark"></span>
                                    <span className="verify-label-text">{state.verify_aov_checked ? '✓ موثق' : 'توثيق'}</span>
                                </label>
                                <select 
                                    className="integrity-source-select"
                                    value={state.verify_aov_source || ''}
                                    onChange={(e) => onChange('verify_aov_source', e.target.value)}
                                    disabled={!state.verify_aov_checked}
                                >
                                    <option value="">-- اختر المصدر --</option>
                                    <option value="لوحة تحكم المتجر (سلة / شوبيفاي)">سلة / شوبيفاي</option>
                                    <option value="تحليلات جوجل (GA4 Analytics)">تحليلات جوجل (GA4)</option>
                                    <option value="دراسة مالية تقديرية">دراسة تقديرية</option>
                                    <option value="اتفاق مباشر مع العميل">اتفاق مع العميل</option>
                                </select>
                            </div>
                        </div>

                        {/* CR block */}
                        <div className="integrity-row-item">
                            <div className="integrity-field-main">
                                <span className="integrity-field-label">
                                    معدل تحويل الموقع المتوقع (CR) {state.verify_cr_checked ? '🔒' : ''}
                                    <span className="info-tooltip-trigger" title="نسبة زوار الموقع الذين يقومون بعملية شراء فعلية. احصل عليه من: لوحة المتجر > الإحصائيات > معدل تحويل المتجر.">ℹ️</span>
                                </span>
                                <div className="integrity-input-wrap">
                                    <strong><EditableSlot id="assumption_cr" placeholder="نسبة التحويل" value={state.assumption_cr} onChange={onChange} disabled={state.verify_cr_checked} /></strong>
                                    <span className="currency-badge">%</span>
                                </div>
                            </div>
                            <div className="integrity-verification-panel">
                                <label className="verify-checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        checked={state.verify_cr_checked || false}
                                        onChange={(e) => onChange('verify_cr_checked', e.target.checked)}
                                    />
                                    <span className="verify-checkmark"></span>
                                    <span className="verify-label-text">{state.verify_cr_checked ? '✓ موثق' : 'توثيق'}</span>
                                </label>
                                <select 
                                    className="integrity-source-select"
                                    value={state.verify_cr_source || ''}
                                    onChange={(e) => onChange('verify_cr_source', e.target.value)}
                                    disabled={!state.verify_cr_checked}
                                >
                                    <option value="">-- اختر المصدر --</option>
                                    <option value="لوحة تحكم المتجر (سلة / شوبيفاي)">سلة / شوبيفاي</option>
                                    <option value="تحليلات جوجل (GA4 Analytics)">تحليلات جوجل (GA4)</option>
                                    <option value="دراسة مالية تقديرية">دراسة تقديرية</option>
                                    <option value="اتفاق مباشر مع العميل">اتفاق مع العميل</option>
                                </select>
                            </div>
                            {state.assumption_cr && (() => {
                                const benchmark = getConversionRateBenchmark(state.assumption_cr, state.industry_category);
                                if (!benchmark) return null;
                                return (
                                    <div className="benchmark-badge" style={{ backgroundColor: benchmark.bg, color: benchmark.color, borderColor: benchmark.color + '22' }}>
                                        <span>{benchmark.icon}</span> {benchmark.text}
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Margin block */}
                        <div className="integrity-row-item">
                            <div className="integrity-field-main">
                                <span className="integrity-field-label">
                                    هامش ربح المنتجات التقريبي {state.verify_margin_checked ? '🔒' : ''}
                                    <span className="info-tooltip-trigger" title="صافي هامش الربح التقريبي للمنتجات البطلة. المعادلة: (سعر البيع - التكلفة شاملة الشحن والتغليف) ÷ سعر البيع.">ℹ️</span>
                                </span>
                                <div className="integrity-input-wrap">
                                    <strong><EditableSlot id="assumption_margin" placeholder="هامش الربح" value={state.assumption_margin} onChange={onChange} disabled={state.verify_margin_checked} /></strong>
                                    <span className="currency-badge">%</span>
                                </div>
                            </div>
                            <div className="integrity-verification-panel">
                                <label className="verify-checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        checked={state.verify_margin_checked || false}
                                        onChange={(e) => onChange('verify_margin_checked', e.target.checked)}
                                    />
                                    <span className="verify-checkmark"></span>
                                    <span className="verify-label-text">{state.verify_margin_checked ? '✓ موثق' : 'توثيق'}</span>
                                </label>
                                <select 
                                    className="integrity-source-select"
                                    value={state.verify_margin_source || ''}
                                    onChange={(e) => onChange('verify_margin_source', e.target.value)}
                                    disabled={!state.verify_margin_checked}
                                >
                                    <option value="">-- اختر المصدر --</option>
                                    <option value="دراسة مالية وجدوى للمنتج">دراسة جدوى المنتج</option>
                                    <option value="حسابات الإدارة المباشرة">حسابات الإدارة</option>
                                    <option value="اتفاق مباشر مع العميل">اتفاق مع العميل</option>
                                </select>
                            </div>
                            {state.assumption_margin && (() => {
                                const benchmark = getMarginBenchmark(state.assumption_margin, state.industry_category);
                                if (!benchmark) return null;
                                return (
                                    <div className="benchmark-badge" style={{ backgroundColor: benchmark.bg, color: benchmark.color, borderColor: benchmark.color + '22' }}>
                                        <span>{benchmark.icon}</span> {benchmark.text}
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Smart Financial Estimator Card */}
            {hasEstimatorData ? (
                <div className="card-item" style={{ marginTop: '20px', borderColor: 'var(--neon-green)', background: 'rgba(16, 185, 129, 0.015)' }}>
                    <h3 style={{ color: 'var(--neon-green)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        💡 التقدير المالي والميزانية الذكية المقترحة (Budget Estimator)
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: '1.6' }}>
                        بناءً على أهداف المبيعات والافتراضات التي أدخلتها، إليك الهيكل المالي المقترح لتحقيق أهدافك بأمان وربحية:
                    </p>
                    <div className="grid-cols-3" style={{ margin: '10px 0', gap: '16px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>الطلبات المطلوبة لتحقيق الهدف:</span>
                            <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>
                                {suggestedOrders.toLocaleString()} طلب
                            </div>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>معدل زيارات مطلوب: {suggestedVisitors.toLocaleString()} زائر</span>
                        </div>
                        
                        {margin > 0 ? (
                            <>
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>الـ CPA المستهدفة والـ ROAS:</span>
                                    <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--neon-cyan)', marginTop: '4px' }}>
                                        {targetCPA} {state.currency || 'ج.م'}
                                    </div>
                                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CPA التعادل: {breakevenCPA.toFixed(1)} | ROAS: {estimatedROAS}x</span>
                                </div>
                                
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid var(--neon-green)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <span style={{ fontSize: '0.78rem', color: 'var(--neon-green)', fontWeight: '700' }}>الميزانية الإعلانية المقترحة:</span>
                                        <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>
                                            {suggestedBudget.toLocaleString()} {state.currency || 'ج.م'}
                                        </div>
                                    </div>
                                    <button 
                                        className="btn btn-save" 
                                        style={{ padding: '4px 8px', fontSize: '0.75rem', marginTop: '8px', height: '26px', width: '100%', justifyContent: 'center', boxShadow: 'none' }}
                                        onClick={() => {
                                            onChange('calc_total_budget', suggestedBudget.toString());
                                            onChange('verify_budget_checked', true);
                                            onChange('verify_budget_source', 'التقدير المالي والميزانية الذكية المقترحة');
                                        }}
                                    >
                                        💾 تطبيق الميزانية تلقائياً
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ gridColumn: 'span 2', background: 'rgba(245, 158, 11, 0.02)', padding: '16px', borderRadius: '10px', border: '1px dashed var(--neon-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '0.85rem', color: 'var(--neon-amber)', textAlign: 'center', fontWeight: '600' }}>
                                    ⚠️ أدخل **هامش ربح المنتجات %** في حقل الافتراضات لحساب الـ CPA والميزانية الذكية.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="card-item" style={{ marginTop: '20px', border: '1px dashed var(--glass-border)', background: 'rgba(255,255,255,0.005)', textAlign: 'center', padding: '16px' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        💡 أدخل قيم **المبيعات المستهدفة**، و**متوسط الطلب AOV**، و**معدل تحويل المتجر CR** لتفعيل حاسبة التقدير المالي الذكية تلقائياً.
                    </span>
                </div>
            )}

            <details>
                <summary>توجيهات الإدارة لـ KPIs ومحددات الإسناد</summary>
                <div style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                    <p>• <strong>تثبيت الـ KPI قبل البدء:</strong> يجب الاتفاق الكامل على مؤشر الأداء سواء كان تكلفة ليد ثابتة أو عائد إعلاني ROAS لمنع تعديل الاستراتيجية أثناء الصرف.</p>
                    <p>• <strong>الميزانية اليومية المسموحة:</strong> من <strong><EditableSlot id="daily_budget_min" placeholder="الحد الأدنى" value={state.daily_budget_min} onChange={onChange} /></strong> إلى <strong><EditableSlot id="daily_budget_max" placeholder="الحد الأقصى" value={state.daily_budget_max} onChange={onChange} /></strong> لتفادي الصرف السريع.</p>
                    <p>• <strong>تعريف التحويل المالي:</strong> يتم احتسابه بناءً على حدث <strong><EditableSlot id="conversion_event_def" placeholder="Purchase / WhatsApp Lead" value={state.conversion_event_def} onChange={onChange} /></strong> بنظام نافذة إسناد <strong><EditableSlot id="attribution_window" placeholder="7-day click / 1-day view" value={state.attribution_window} onChange={onChange} /></strong>.</p>
                </div>
            </details>

            <hr />

            <h3 className="section-title">5) حاسبة توزيع الميزانية التفاعلية (Interactive Budget Splitter)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                أدخل الميزانية الكلية بالرقم، ثم حرك أشرطة التمرير لتحديد نسب التوزيع المئوية لكل منصة إعلانية، وسيقوم النظام بحساب المبالغ الفعلية تلقائياً:
            </p>

            <div className="budget-calculator-box">
                <div className="budget-input-group" style={{ flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1rem', fontWeight: '700' }}>الميزانية الكلية للحسابات {state.verify_budget_checked ? '🔒' : ''}:</span>
                    <input 
                        type="number" 
                        className={`budget-input-field ${state.verify_budget_checked ? 'disabled-slot' : ''}`}
                        placeholder="أدخل ميزانيتك الكلية" 
                        value={state.calc_total_budget || ''}
                        onChange={(e) => onChange('calc_total_budget', e.target.value)}
                        disabled={state.verify_budget_checked}
                    />
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--neon-cyan)', marginLeft: '24px' }}>
                        {state.currency || 'ج.م'}
                    </span>

                    {/* Total budget verification */}
                    <div className="budget-integrity-wrap" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)' }}>
                        <label className="verify-checkbox-label" style={{ margin: 0 }}>
                            <input 
                                type="checkbox" 
                                checked={state.verify_budget_checked || false}
                                onChange={(e) => onChange('verify_budget_checked', e.target.checked)}
                            />
                            <span className="verify-checkmark"></span>
                            <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>{state.verify_budget_checked ? '✓ موثق' : 'توثيق الميزانية'}</span>
                        </label>
                        <select 
                            className="integrity-source-select"
                            style={{ padding: '4px 8px', fontSize: '0.75rem', height: '28px', minWidth: '130px' }}
                            value={state.verify_budget_source || ''}
                            onChange={(e) => onChange('verify_budget_source', e.target.value)}
                            disabled={!state.verify_budget_checked}
                        >
                            <option value="">-- المصدر --</option>
                            <option value="الخطة المالية السنوية">الخطة المالية للشركة</option>
                            <option value="حد الصرف اليومي للمحفظة">حد المحفظة الإعلانية</option>
                            <option value="الاتفاق المباشر المعتمد">اتفاق مباشر معتمد</option>
                        </select>
                    </div>
                </div>

                <div className="slider-group">
                    <span className="slider-label">Meta (FB / IG)</span>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        className="slider-control" 
                        value={metaPct}
                        onChange={(e) => onChange('budget_meta_pct', e.target.value)}
                    />
                    <span className="slider-value-badge">
                        {metaPct}% ({metaVal.toLocaleString()} {state.currency || 'ج.م'})
                    </span>
                </div>

                <div className="slider-group">
                    <span className="slider-label">TikTok</span>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        className="slider-control" 
                        value={tiktokPct}
                        onChange={(e) => onChange('budget_tiktok_pct', e.target.value)}
                    />
                    <span className="slider-value-badge">
                        {tiktokPct}% ({tiktokVal.toLocaleString()} {state.currency || 'ج.م'})
                    </span>
                </div>

                <div className="slider-group">
                    <span className="slider-label">Google Ads</span>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        className="slider-control" 
                        value={googlePct}
                        onChange={(e) => onChange('budget_google_pct', e.target.value)}
                    />
                    <span className="slider-value-badge">
                        {googlePct}% ({googleVal.toLocaleString()} {state.currency || 'ج.م'})
                    </span>
                </div>

                <div className="slider-group">
                    <span className="slider-label">قنوات أخرى (Snap/X)</span>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        className="slider-control" 
                        value={otherPct}
                        onChange={(e) => onChange('budget_other_pct', e.target.value)}
                    />
                    <span className="slider-value-badge">
                        {otherPct}% ({otherVal.toLocaleString()} {state.currency || 'ج.م'})
                    </span>
                </div>

                <div style={{ 
                    marginTop: '24px', 
                    paddingTop: '16px',
                    borderTop: '1px dashed var(--glass-border)',
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        مجموع النسب المئوية الحالي: 
                        <strong style={{ 
                            marginLeft: '8px', 
                            color: isSumCorrect ? 'var(--neon-green)' : 'var(--neon-crimson)',
                            fontSize: '1.1rem'
                        }}>
                            {sumPct}%
                        </strong>
                    </span>
                    
                    {!isSumCorrect && (
                        <span style={{ 
                            fontSize: '0.8rem', 
                            color: 'var(--neon-crimson)', 
                            background: 'rgba(255, 0, 85, 0.05)',
                            padding: '4px 12px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255, 0, 85, 0.15)'
                        }}>
                            ⚠️ يرجى معايرة النسب ليكون المجموع المساوي تماماً لـ 100%
                        </span>
                    )}
                    {isSumCorrect && (
                        <span style={{ 
                            fontSize: '0.8rem', 
                            color: 'var(--neon-green)', 
                            background: 'rgba(16, 185, 129, 0.05)',
                            padding: '4px 12px',
                            borderRadius: '8px',
                            border: '1px solid rgba(16, 185, 129, 0.15)'
                        }}>
                            ✅ توزيع الميزانية متناسق وممتاز!
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
