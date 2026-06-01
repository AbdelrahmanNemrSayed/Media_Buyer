import { useState } from 'react';
import EditableSlot from './EditableSlot';
import CustomCheckbox from './CustomCheckbox';

export default function FunnelStrategy({ state, onChange }) {
    const [tofuPct, setTofuPct] = useState(70);
    const [mofuPct, setMofuPct] = useState(20);
    const [bofuPct, setBofuPct] = useState(10);

    const totalBudget = parseFloat(state.calc_total_budget || '0') || 0;
    const tofuVal = Math.round((totalBudget * tofuPct) / 100);
    const mofuVal = Math.round((totalBudget * mofuPct) / 100);
    const bofuVal = Math.round((totalBudget * bofuPct) / 100);
    const sumPct = tofuPct + mofuPct + bofuPct;

    return (
        <div className="glass-panel">
            <h2 className="panel-title">الاستراتيجية حسب القمع الإعلاني</h2>
            <p className="panel-subtitle">إدارة القمع التسويقي بالكامل من الاستقطاب للجمهور البارد وحتى إتمام المبيعات وإعادة الاستهداف.</p>

            <h3 className="section-title">4) الاستراتيجية حسب القمع (Funnel Strategy)</h3>
            
            <div className="grid-cols-3">
                <div className="card-item" style={{ borderTop: '4px solid var(--neon-blue)' }}>
                    <h3 style={{ color: 'var(--neon-blue)' }}>🔷 TOFU (Cold Audience)</h3>
                    <p style={{ margin: '8px 0' }}>• الهدف الأساسي: تعريف ناس جديدة وجذب انتباههم.</p>
                    <p>• القنوات: Meta + TikTok</p>
                    
                    <div className="checklist-wrapper" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <CustomCheckbox id="check_tofu_reels" checked={state.check_tofu_reels} onChange={onChange}>
                            إنتاج فيديوهات ريلز سريعة
                        </CustomCheckbox>
                        <CustomCheckbox id="check_tofu_broad" checked={state.check_tofu_broad} onChange={onChange}>
                            استهداف عريض Broad Prospecting
                        </CustomCheckbox>
                        <CustomCheckbox id="check_tofu_ugc" checked={state.check_tofu_ugc} onChange={onChange}>
                            UGC Hooks واضحة وجذابة
                        </CustomCheckbox>
                    </div>
                    <p style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        مؤشرات النجاح: CPM / VTR / CTR / CPC
                    </p>
                </div>

                <div className="card-item" style={{ borderTop: '4px solid var(--neon-amber)' }}>
                    <h3 style={{ color: 'var(--neon-amber)' }}>🔶 MOFU (Warm Audience)</h3>
                    <p style={{ margin: '8px 0' }}>• الهدف الأساسي: تحويل المتفاعلين والزوار إلى مشترين.</p>
                    <p>• القنوات: Meta Ads + Search Ads</p>
                    
                    <div className="checklist-wrapper" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <CustomCheckbox id="check_mofu_benefits" checked={state.check_mofu_benefits} onChange={onChange}>
                            استعراض تفصيلي للمميزات والفوائد
                        </CustomCheckbox>
                        <CustomCheckbox id="check_mofu_proof" checked={state.check_mofu_proof} onChange={onChange}>
                            عرض تقييمات العملاء السابقة
                        </CustomCheckbox>
                        <CustomCheckbox id="check_mofu_reminder" checked={state.check_mofu_reminder} onChange={onChange}>
                            تذكير بالعروض الحالية ومزايا الشحن
                        </CustomCheckbox>
                    </div>
                    <p style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        مؤشرات النجاح: CTR / Add-to-Cart / CPA
                    </p>
                </div>

                <div className="card-item" style={{ borderTop: '4px solid var(--neon-green)' }}>
                    <h3 style={{ color: 'var(--neon-green)' }}>🔷 BOFU (Hot Audience)</h3>
                    <p style={{ margin: '8px 0' }}>• الهدف الأساسي: قفل المبيعات (Retargeting) للأكثر اهتماماً.</p>
                    <p>• القنوات: Catalog DPA + Dynamic Custom</p>
                    
                    <div className="checklist-wrapper" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <CustomCheckbox id="check_bofu_testimonials" checked={state.check_bofu_testimonials} onChange={onChange}>
                            عرض شهادات الضمان والجودة المباشرة
                        </CustomCheckbox>
                        <CustomCheckbox id="check_bofu_urgency" checked={state.check_bofu_urgency} onChange={onChange}>
                            كود خصم حصري ومؤقت &quot;اليوم فقط&quot;
                        </CustomCheckbox>
                        <CustomCheckbox id="check_bofu_dpa" checked={state.check_bofu_dpa} onChange={onChange}>
                            تفعيل حملات الكتالوج الديناميكي DPA
                        </CustomCheckbox>
                    </div>
                    <p style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        مؤشرات النجاح: ROAS / CPA / CR
                    </p>
                </div>
            </div>

            {/* 4.2 قمع المبيعات المرئي التفاعلي (Interactive Visual Funnel Chart) */}
            <hr />
            <h3 className="section-title">4.2 🔽 قمع المبيعات المرئي التفاعلي المتحرك (Visual Funnel Chart)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                بناءً على الميزانية الكلية المعينة في لوحة &quot;الأهداف والميزانيات&quot; (الحالي: {totalBudget.toLocaleString()} {state.currency || 'ج.م'})، يمكنك تخطيط توزيع الميزانية وعرض الهيكل البصري للقمع إعلانيًا:
            </p>

            <div className="grid-cols-2" style={{ gap: '24px', alignItems: 'center', marginBottom: '24px' }}>
                {/* Control Panel */}
                <div className="card-item" style={{ borderColor: 'var(--neon-blue)', background: 'rgba(0, 82, 255, 0.015)' }}>
                    <h3 style={{ color: '#ffffff', marginBottom: '14px' }}>🎛️ معايير التحكم في توزيع نسب القمع:</h3>
                    
                    <div className="slider-group" style={{ marginBottom: '16px' }}>
                        <span className="slider-label" style={{ fontWeight: '600' }}>🔷 TOFU (Cold Audience):</span>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            className="slider-control" 
                            value={tofuPct}
                            onChange={(e) => setTofuPct(parseInt(e.target.value))}
                        />
                        <span className="slider-value-badge" style={{ background: 'rgba(0, 82, 255, 0.1)', color: 'var(--neon-cyan)' }}>
                            {tofuPct}% ({tofuVal.toLocaleString()} {state.currency || 'ج.م'})
                        </span>
                    </div>

                    <div className="slider-group" style={{ marginBottom: '16px' }}>
                        <span className="slider-label" style={{ fontWeight: '600' }}>🔶 MOFU (Warm Audience):</span>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            className="slider-control" 
                            value={mofuPct}
                            onChange={(e) => setMofuPct(parseInt(e.target.value))}
                        />
                        <span className="slider-value-badge" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--neon-amber)' }}>
                            {mofuPct}% ({mofuVal.toLocaleString()} {state.currency || 'ج.م'})
                        </span>
                    </div>

                    <div className="slider-group" style={{ marginBottom: '16px' }}>
                        <span className="slider-label" style={{ fontWeight: '600' }}>🟢 BOFU (Hot Audience):</span>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            className="slider-control" 
                            value={bofuPct}
                            onChange={(e) => setBofuPct(parseInt(e.target.value))}
                        />
                        <span className="slider-value-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--neon-green)' }}>
                            {bofuPct}% ({bofuVal.toLocaleString()} {state.currency || 'ج.م'})
                        </span>
                    </div>

                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                        <span>
                            مجموع نسب القمع: 
                            <strong style={{ color: sumPct === 100 ? 'var(--neon-green)' : 'var(--neon-crimson)', fontSize: '1rem', marginLeft: '6px' }}>
                                {sumPct}%
                            </strong>
                        </span>
                        {sumPct !== 100 ? (
                            <span style={{ color: 'var(--neon-crimson)', background: 'rgba(255, 0, 85, 0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                                ⚠️ يجب أن يساوي 100%
                            </span>
                        ) : (
                            <span style={{ color: 'var(--neon-green)', background: 'rgba(16, 185, 129, 0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                                ✅ النسب متوازنة ومكتملة!
                            </span>
                        )}
                    </div>
                </div>

                {/* Animated Visual Funnel Graphic */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '20px', background: 'rgba(255,255,255,0.01)', borderRadius: '14px', border: '1px solid var(--glass-border)', minHeight: '260px' }}>
                    
                    {/* Layer 1: TOFU */}
                    <div 
                        className="funnel-layer"
                        style={{
                            width: '100%',
                            maxWidth: '320px',
                            height: '60px',
                            background: 'linear-gradient(90deg, rgba(0, 82, 255, 0.2) 0%, rgba(0, 240, 255, 0.25) 100%)',
                            border: '1.5px solid var(--neon-cyan)',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: 'perspective(500px) rotateX(15deg)',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(0, 240, 255, 0.15)',
                            position: 'relative'
                        }}
                        title="TOFU - الوعي والوصول العريض"
                    >
                        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ffffff' }}>🔷 TOFU - الوعي والانتشار ({tofuPct}%)</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--neon-cyan)', fontWeight: '600' }}>
                            {tofuVal.toLocaleString()} {state.currency || 'ج.م'} • CPM &amp; CTR
                        </span>
                    </div>

                    {/* Funnel Spout Connecting Lines */}
                    <div style={{ width: '2px', height: '12px', background: 'var(--glass-border)', opacity: 0.7 }} />

                    {/* Layer 2: MOFU */}
                    <div 
                        className="funnel-layer"
                        style={{
                            width: '80%',
                            maxWidth: '256px',
                            height: '65px',
                            background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.15) 0%, rgba(255, 126, 0, 0.22) 100%)',
                            border: '1.5px solid var(--neon-amber)',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: 'perspective(500px) rotateX(15deg)',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.15)',
                            position: 'relative'
                        }}
                        title="MOFU - تحفيز الاهتمام والاعتبار"
                    >
                        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ffffff' }}>🔶 MOFU - التفاعل والاعتبار ({mofuPct}%)</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--neon-amber)', fontWeight: '600' }}>
                            {mofuVal.toLocaleString()} {state.currency || 'ج.م'} • ATC &amp; IC
                        </span>
                    </div>

                    {/* Funnel Spout Connecting Lines */}
                    <div style={{ width: '2px', height: '12px', background: 'var(--glass-border)', opacity: 0.7 }} />

                    {/* Layer 3: BOFU */}
                    <div 
                        className="funnel-layer"
                        style={{
                            width: '60%',
                            maxWidth: '192px',
                            height: '70px',
                            background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.25) 100%)',
                            border: '1.5px solid var(--neon-green)',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: 'perspective(500px) rotateX(15deg)',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.15)',
                            position: 'relative'
                        }}
                        title="BOFU - التحويل والكتالوج DPA"
                    >
                        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ffffff' }}>🟢 BOFU - إتمام المشتريات ({bofuPct}%)</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--neon-green)', fontWeight: '600' }}>
                            {bofuVal.toLocaleString()} {state.currency || 'ج.م'} • Purchases &amp; ROAS
                        </span>
                    </div>
                </div>
            </div>

            <hr />

            <h3 className="section-title">21) خريطة إعادة الاستهداف (Retargeting Map)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                توزيع وتقسيم شرائح الجمهور الساخن بداخل قمع مبيعات إعادة الاستهداف لضمان عدم تداخل الإعلانات:
            </p>

            <div className="table-wrapper">
                <table className="executive-table">
                    <thead>
                        <tr>
                            <th>الشريحة الإعلانية</th>
                            <th>النافذة الزمنية</th>
                            <th>المحتوى الموجه المفضل</th>
                            <th>كود الخصم / العرض الترويجي</th>
                            <th>الحالة التشغيلية</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>ATC (أضاف للسلة)</strong></td>
                            <td>آخر 14 يوم (14D)</td>
                            <td>مراجعات اجتماعية + شحن مجاني</td>
                            <td>
                                <EditableSlot id="atc_discount" placeholder="مثال: FREE14" value={state.atc_discount} onChange={onChange} />
                            </td>
                            <td>
                                <EditableSlot id="atc_status" placeholder="Live / Paused" value={state.atc_status} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>IC (بدأ إجراء الدفع)</strong></td>
                            <td>آخر 7 أيام (7D)</td>
                            <td>مخاوف الدفع (COD/Tabby/Tamara)</td>
                            <td>
                                <EditableSlot id="ic_discount" placeholder="مثال: GOMORE" value={state.ic_discount} onChange={onChange} />
                            </td>
                            <td>
                                <EditableSlot id="ic_status" placeholder="Live / Paused" value={state.ic_status} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Engagers / زوار الصفحة</strong></td>
                            <td>آخر 30 يوم (30D)</td>
                            <td>أكثر 5 منتجات مبيعاً + USP البراند</td>
                            <td>
                                <EditableSlot id="visitor_discount" placeholder="مثال: BR10" value={state.visitor_discount} onChange={onChange} />
                            </td>
                            <td>
                                <EditableSlot id="visitor_status" placeholder="Live / Paused" value={state.visitor_status} onChange={onChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
