import EditableSlot from './EditableSlot';
import CustomCheckbox from './CustomCheckbox';

export default function PreLaunchChecklist({ state, onChange }) {
    return (
        <div className="glass-panel">
            <h2 className="panel-title">قائمة الإطلاق والتتبع الفني</h2>
            <p className="panel-subtitle">أهم خطوة قبل البدء بضخ أي ميزانيات إعلانية: مراجعة القياس الفني وتجربة الشراء.</p>

            <h3 className="section-title">9) قائمة ما قبل الإطلاق (Pre-Launch Checklist)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                تأكد من إتمام المهام التالية للحصول على إطلاق خالٍ من المشاكل:
            </p>

            <div className="grid-cols-2">
                <div className="card-item">
                    <h3>👥 خدمة العملاء والتشغيل المشترك</h3>
                    <div className="checklist-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                        <CustomCheckbox id="check_sync_cs" checked={state.check_sync_cs} onChange={onChange}>
                            إبلاغ فريق خدمة العملاء بمواعيد وتفاصيل العروض الكبرى.
                        </CustomCheckbox>
                        <CustomCheckbox id="check_script_cs" checked={state.check_script_cs} onChange={onChange}>
                            تجهيز Script ردود جاهزة بصفحة الدفع.
                        </CustomCheckbox>
                        <CustomCheckbox id="check_sla_cs" checked={state.check_sla_cs} onChange={onChange}>
                            تثبيت حد أقصى للرد: <EditableSlot id="sla_time" placeholder="3 دقائق / 5 دقائق" value={state.sla_time} onChange={onChange} />.
                        </CustomCheckbox>
                    </div>
                </div>

                <div className="card-item" style={{ borderColor: 'rgba(16, 185, 129, 0.15)' }}>
                    <h3>🌐 سرعة الموقع الإلكتروني وتجربة المستخدم</h3>
                    <div className="checklist-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                        <CustomCheckbox id="check_speed_mobile" checked={state.check_speed_mobile} onChange={onChange}>
                            فحص سرعة تحميل صفحة الهبوط على الجوال (Mobile Speed).
                        </CustomCheckbox>
                        <CustomCheckbox id="check_checkout_qa" checked={state.check_checkout_qa} onChange={onChange}>
                            فحص تجربة الشراء بالكامل (Checkout QA) من السلة وحتى الدفع.
                        </CustomCheckbox>
                        <CustomCheckbox id="check_payment_gate" checked={state.check_payment_gate} onChange={onChange}>
                            التأكد من عمل بوابات الدفع (مدى، الفيزا، أبل باي، تمارا، تابي).
                        </CustomCheckbox>
                    </div>
                </div>
            </div>

            <hr />

            <h3 className="section-title">10) تتبع الحسابات والبيانات (Tracking &amp; Attribution)</h3>
            <div className="table-wrapper">
                <table className="executive-table">
                    <thead>
                        <tr>
                            <th>المنصة الإعلانية</th>
                            <th>حالة الـ Pixel الفنية</th>
                            <th>تفعيل Conversion API (CAPI)</th>
                            <th>الأحداث الأساسية المفعلة</th>
                            <th>حالة التتبع ومعدل المطابقة</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Meta Ads</strong></td>
                            <td>
                                <EditableSlot id="meta_pixel_status" placeholder="Active / Testing" value={state.meta_pixel_status} onChange={onChange} />
                            </td>
                            <td>
                                <EditableSlot id="meta_capi_status" placeholder="Enabled (Yes/No)" value={state.meta_capi_status} onChange={onChange} />
                            </td>
                            <td>ViewContent, AddToCart, Purchase</td>
                            <td>
                                <EditableSlot id="meta_match_score" placeholder="Matching Score: High / Med" value={state.meta_match_score} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>TikTok Ads</strong></td>
                            <td>
                                <EditableSlot id="tiktok_pixel_status" placeholder="Active / Testing" value={state.tiktok_pixel_status} onChange={onChange} />
                            </td>
                            <td>
                                <EditableSlot id="tiktok_capi_status" placeholder="Enabled (Yes/No)" value={state.tiktok_capi_status} onChange={onChange} />
                            </td>
                            <td>CompletePayment, AddToCart</td>
                            <td>
                                <EditableSlot id="tiktok_match_score" placeholder="Matching Score: High / Med" value={state.tiktok_match_score} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Google Ads</strong></td>
                            <td>
                                <EditableSlot id="google_pixel_status" placeholder="Active (GTM)" value={state.google_pixel_status} onChange={onChange} />
                            </td>
                            <td>
                                <EditableSlot id="google_capi_status" placeholder="Enhanced Conversions" value={state.google_capi_status} onChange={onChange} />
                            </td>
                            <td>Purchase, Submit Lead</td>
                            <td>
                                <EditableSlot id="google_match_score" placeholder="Match Quality: High" value={state.google_match_score} onChange={onChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 className="section-title">16) مراجعة اللاندنج وصفحة الدفع (Landing &amp; Checkout QA)</h3>
            <div className="checklist-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <CustomCheckbox id="check_qa_logo" checked={state.check_qa_logo} onChange={onChange}>
                    اللوجو ظاهر بدقة عالية في الهيدر والفوتر.
                </CustomCheckbox>
                <CustomCheckbox id="check_qa_product" checked={state.check_qa_product} onChange={onChange}>
                    صور المنتج حقيقية وعالية الجودة بميزة التكبير والزووم.
                </CustomCheckbox>
                <CustomCheckbox id="check_qa_reviews" checked={state.check_qa_reviews} onChange={onChange}>
                    قسم المراجعات والتقييمات بالصفحة محدّث بآراء حقيقية.
                </CustomCheckbox>
                <CustomCheckbox id="check_qa_checkout" checked={state.check_qa_checkout} onChange={onChange}>
                    صفحة الدفع سريعة وتضم خيارات التوصيل السريع للمدن الأساسية بالمملكة.
                </CustomCheckbox>
            </div>
        </div>
    );
}
