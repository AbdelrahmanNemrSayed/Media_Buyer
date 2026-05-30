import { useEffect } from 'react';
import EditableSlot from './EditableSlot';

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

                <div className="card-item" style={{ borderColor: 'rgba(0, 240, 255, 0.15)' }}>
                    <h3>📊 الافتراضات الحسابية (Assumptions)</h3>
                    <p style={{ marginTop: '12px' }}>
                        • متوسط قيمة السلة (AOV): <strong><EditableSlot id="assumption_aov" placeholder="متوسط قيمة الطلب" value={state.assumption_aov} onChange={onChange} /></strong>
                    </p>
                    <p>
                        • معدل تحويل الموقع المتوقع (CR): <strong><EditableSlot id="assumption_cr" placeholder="نسبة التحويل المتوقعة" value={state.assumption_cr} onChange={onChange} /></strong>
                    </p>
                    <p>
                        • هامش ربح المنتجات التقريبي: <strong><EditableSlot id="assumption_margin" placeholder="نسبة هامش الربح" value={state.assumption_margin} onChange={onChange} /></strong>
                    </p>
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
                <div className="budget-input-group">
                    <span style={{ fontSize: '1rem', fontWeight: '700' }}>الميزانية الكلية للحسابات:</span>
                    <input 
                        type="number" 
                        className="budget-input-field"
                        placeholder="أدخل ميزانيتك الكلية" 
                        value={state.calc_total_budget || ''}
                        onChange={(e) => onChange('calc_total_budget', e.target.value)}
                    />
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--neon-cyan)' }}>
                        {state.currency || 'ر.س'}
                    </span>
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
                        {metaPct}% ({metaVal.toLocaleString()} {state.currency || 'ر.س'})
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
                        {tiktokPct}% ({tiktokVal.toLocaleString()} {state.currency || 'ر.س'})
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
                        {googlePct}% ({googleVal.toLocaleString()} {state.currency || 'ر.س'})
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
                        {otherPct}% ({otherVal.toLocaleString()} {state.currency || 'ر.س'})
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
