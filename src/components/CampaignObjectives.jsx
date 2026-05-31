import { useEffect } from 'react';
import EditableSlot from './EditableSlot';

// ── Industry Benchmarks & Evaluation Logic ──
const getConversionRateBenchmark = (valStr) => {
    if (!valStr) return null;
    const numeric = parseFloat(valStr.replace(/[^\d.]/g, ''));
    if (isNaN(numeric)) return null;
    if (numeric < 1.0) {
        return { text: 'معدل تحويل منخفض (ينصح بتحسين سرعة وسلاسل إقناع المتجر لحماية الصرف إعلانيًا)', color: 'var(--neon-crimson)', bg: 'rgba(255, 0, 85, 0.05)', icon: '🔴' };
    } else if (numeric <= 2.5) {
        return { text: 'معدل تحويل طبيعي ومناسب تماماً للبدء والتسويق الإعلاني الناجح', color: 'var(--neon-green)', bg: 'rgba(16, 185, 129, 0.05)', icon: '🟢' };
    } else {
        return { text: 'معدل تحويل فائق ومثالي للتوسع والنمو ومضاعفة الميزانية بثقة', color: 'var(--neon-cyan)', bg: 'rgba(0, 240, 255, 0.05)', icon: '🔵' };
    }
};

const getMarginBenchmark = (valStr) => {
    if (!valStr) return null;
    const numeric = parseFloat(valStr.replace(/[^\d.]/g, ''));
    if (isNaN(numeric)) return null;
    if (numeric < 30) {
        return { text: 'هامش ربح منخفض (يزيد من مخاطر الحملات، استهدف رفع قيمة السلة AOV)', color: 'var(--neon-amber)', bg: 'rgba(245, 158, 11, 0.05)', icon: '🟡' };
    } else if (numeric <= 50) {
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
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
                        {/* AOV block */}
                        <div className="integrity-row-item">
                            <div className="integrity-field-main">
                                <span className="integrity-field-label">
                                    متوسط قيمة السلة (AOV)
                                    <span className="info-tooltip-trigger" title="متوسط القيمة المالية للطلب الواحد في المتجر. احصل عليه من: لوحة المتجر > الإحصائيات > متوسط قيمة الطلب لآخر 90 يوم.">ℹ️</span>
                                </span>
                                <div className="integrity-input-wrap">
                                    <strong><EditableSlot id="assumption_aov" placeholder="متوسط الطلب" value={state.assumption_aov} onChange={onChange} /></strong>
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
                                    معدل تحويل الموقع المتوقع (CR)
                                    <span className="info-tooltip-trigger" title="نسبة زوار الموقع الذين يقومون بعملية شراء فعلية. احصل عليه من: لوحة المتجر > الإحصائيات > معدل تحويل المتجر.">ℹ️</span>
                                </span>
                                <div className="integrity-input-wrap">
                                    <strong><EditableSlot id="assumption_cr" placeholder="نسبة التحويل" value={state.assumption_cr} onChange={onChange} /></strong>
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
                                const benchmark = getConversionRateBenchmark(state.assumption_cr);
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
                                    هامش ربح المنتجات التقريبي
                                    <span className="info-tooltip-trigger" title="صافي هامش الربح التقريبي للمنتجات البطلة. المعادلة: (سعر البيع - التكلفة شاملة الشحن والتغليف) ÷ سعر البيع.">ℹ️</span>
                                </span>
                                <div className="integrity-input-wrap">
                                    <strong><EditableSlot id="assumption_margin" placeholder="هامش الربح" value={state.assumption_margin} onChange={onChange} /></strong>
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
                                const benchmark = getMarginBenchmark(state.assumption_margin);
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
                    <span style={{ fontSize: '1rem', fontWeight: '700' }}>الميزانية الكلية للحسابات:</span>
                    <input 
                        type="number" 
                        className="budget-input-field"
                        placeholder="أدخل ميزانيتك الكلية" 
                        value={state.calc_total_budget || ''}
                        onChange={(e) => onChange('calc_total_budget', e.target.value)}
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
