import EditableSlot from './EditableSlot';
import CustomCheckbox from './CustomCheckbox';

export default function FunnelStrategy({ state, onChange }) {
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
