import EditableSlot from './EditableSlot';
import CustomCheckbox from './CustomCheckbox';

export default function BrandProfiles({ state, onChange }) {
    return (
        <div className="glass-panel">
            <h2 className="panel-title">الملخص التنفيذي وملفات البراند</h2>
            <p className="panel-subtitle">أدخل المعلومات الأساسية والتعريفية لخطتك التسويقية وملخص أرقام البراندات المستهدفة.</p>
            
            <div className="callout callout-red">
                <span className="callout-icon">🎯</span>
                <div className="callout-content">
                    <p><strong>املأ الخانات التفاعلية لتخصيص الخطة:</strong></p>
                    <p>أدخل البيانات بين الأقواس المظللة بالأزرق لتحديث أرقام الحملة وملف البراند، وسيتم حساب نسبة اكتمال الخطة تلقائياً.</p>
                </div>
            </div>

            <h3 className="section-title">1) ملخص تنفيذي (Executive Summary)</h3>
            <div className="table-wrapper">
                <table className="executive-table">
                    <thead>
                        <tr>
                            <th>العنصر</th>
                            <th>القيمة المخصصة</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>مُقدمة بواسطة (الوكالة/الاسم)</strong></td>
                            <td>
                                <EditableSlot id="agency_name" placeholder="اسمك أو اسم وكالتك" value={state.agency_name} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>اسم الحملة</strong></td>
                            <td>
                                <EditableSlot id="campaign_name" placeholder="اسم الحملة" value={state.campaign_name} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>الفترة الزمنية</strong></td>
                            <td>
                                <EditableSlot id="period_from" placeholder="من تاريخ" value={state.period_from} onChange={onChange} /> 
                                <span style={{ margin: '0 8px', color: 'var(--text-muted)' }}>←</span>
                                <EditableSlot id="period_to" placeholder="إلى تاريخ" value={state.period_to} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>الهدف الأساسي</strong></td>
                            <td>
                                <EditableSlot id="main_objective" placeholder="مبيعات / ليدز / رسائل" value={state.main_objective} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>الميزانية الإجمالية المقترحة</strong></td>
                            <td>
                                <EditableSlot id="total_budget_summary" placeholder="الرقم الإجمالي" value={state.total_budget_summary} onChange={onChange} /> 
                                <EditableSlot id="currency" placeholder="العملة (مثال: ج.م)" value={state.currency} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>القنوات الأساسية للتشغيل</strong></td>
                            <td>
                                <EditableSlot id="primary_channels" placeholder="Meta / TikTok / Google" value={state.primary_channels} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>الـ KPI الرئيسي المستهدف</strong></td>
                            <td>
                                <EditableSlot id="target_kpi_type" placeholder="Target ROAS / CPL / CAC" value={state.target_kpi_type} onChange={onChange} /> 
                                <span style={{ margin: '0 8px', color: 'var(--text-muted)' }}>:</span>
                                <EditableSlot id="target_kpi_value" placeholder="القيمة المستهدفة" value={state.target_kpi_value} onChange={onChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="callout callout-blue">
                <span className="callout-icon">💡</span>
                <div className="callout-content">
                    <p><strong>أهداف مؤشرات الأداء السريعة (Quick KPI Targets):</strong></p>
                    <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <p>• الإنفاق الكلي: <strong><EditableSlot id="quick_spend" placeholder="الميزانية" value={state.quick_spend} onChange={onChange} /></strong></p>
                        <p>• تكلفة الاكتساب المستهدفة (CPA/CPL): <strong><EditableSlot id="quick_cpl" placeholder="التكلفة المستهدفة" value={state.quick_cpl} onChange={onChange} /></strong></p>
                        <p>• العائد على الإنفاق الإعلاني المستهدف (Target ROAS): <strong><EditableSlot id="quick_roas" placeholder="ROAS المستهدف" value={state.quick_roas} onChange={onChange} /></strong></p>
                        <p>• العائد المتعادل على الإنفاق (Break-even ROAS): <strong><EditableSlot id="quick_be_roas" placeholder="Break-even ROAS" value={state.quick_be_roas} onChange={onChange} /></strong></p>
                    </div>
                </div>
            </div>

            <h3 className="section-title">1.1) ملفات البراند (Brand Profiles) — السعودية</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                مقارنة تشغيلية بين البراندات المستهدفة للتشغيل داخل المملكة العربية السعودية:
            </p>

            <div className="table-wrapper">
                <table className="executive-table">
                    <thead>
                        <tr>
                            <th style={{ width: '120px' }}>البراند</th>
                            <th>المنتجات الأساسية</th>
                            <th>USP / نقاط التميز للبيع</th>
                            <th>المنتجات البطلة Hero SKUs</th>
                            <th>ملاحظات وقيود التشغيل</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>H For Less</strong></td>
                            <td>مستلزمات منزلية وديكورات</td>
                            <td>
                                <EditableSlot id="hfl_usp" placeholder="سعر / تنوع / Bundles" value={state.hfl_usp} onChange={onChange} />
                            </td>
                            <td>
                                <EditableSlot id="hfl_hero" placeholder="أفضل 10 منتجات مبيعاً" value={state.hfl_hero} onChange={onChange} />
                            </td>
                            <td>
                                <EditableSlot id="hfl_notes" placeholder="شحن / مواسم / عروض" value={state.hfl_notes} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>H Brand</strong></td>
                            <td>ملابس + أحذية + حقائب فاخرة</td>
                            <td>
                                <EditableSlot id="hb_usp" placeholder="ترند / ستايل / جودة عالية" value={state.hb_usp} onChange={onChange} />
                            </td>
                            <td>
                                <EditableSlot id="hb_hero" placeholder="Sneakers / الحقائب البطلة" value={state.hb_hero} onChange={onChange} />
                            </td>
                            <td>
                                <EditableSlot id="hb_notes" placeholder="مقاسات / سياسة الاستبدال" value={state.hb_notes} onChange={onChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <details open>
                <summary>Checklist تشغيلي سريع قبل بدء الشهر الجديد</summary>
                <div className="checklist-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                    <CustomCheckbox id="check_cod" checked={state.check_cod} onChange={onChange}>
                        حالة الدفع عند الاستلام (COD): <EditableSlot id="cod_val" placeholder="Yes / No / To Confirm" value={state.cod_val} onChange={onChange} />
                    </CustomCheckbox>
                    <CustomCheckbox id="check_catalog" checked={state.check_catalog} onChange={onChange}>
                        مزامنة كتالوج المنتجات (Catalog): <EditableSlot id="catalog_val" placeholder="Meta / TikTok / None" value={state.catalog_val} onChange={onChange} />
                    </CustomCheckbox>
                    <CustomCheckbox id="check_shipping" checked={state.check_shipping} onChange={onChange}>
                        مدة الشحن داخل السعودية: <EditableSlot id="shipping_val" placeholder="المدة + شركة الشحن" value={state.shipping_val} onChange={onChange} />
                    </CustomCheckbox>
                    <CustomCheckbox id="check_policy" checked={state.check_policy} onChange={onChange}>
                        تأكيد سياسة الاستبدال المرتجعات بصفحة الدفع (ضروري جداً لـ H Brand)
                    </CustomCheckbox>
                </div>
            </details>
        </div>
    );
}
