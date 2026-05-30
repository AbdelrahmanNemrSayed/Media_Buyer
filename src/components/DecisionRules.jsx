import EditableSlot from './EditableSlot';
import CustomCheckbox from './CustomCheckbox';

export default function DecisionRules({ state, onChange }) {
    return (
        <div className="glass-panel">
            <h2 className="panel-title">قواعد اتخاذ القرار والتحسين</h2>
            <p className="panel-subtitle">أتمتة القرارات لحماية ميزانياتك الإعلانية؛ قواعد واضحة للتحجيم والإيقاف وتوزيع التجريب.</p>

            <h3 className="section-title">11) قواعد التحجيم والإيقاف (Decision Rules)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                قواعد تشغيل ثابتة يتفق عليها الفريق الإعلاني لتجنب قرارات العاطفة أثناء الصرف:
            </p>

            <div className="grid-cols-3">
                <div className="card-item" style={{ borderTop: '4px solid var(--neon-green)' }}>
                    <h3 style={{ color: 'var(--neon-green)' }}>📈 Scale (تحجيم وزيادة صرف)</h3>
                    <p style={{ margin: '8px 0' }}>• متى نزيد الميزانية؟</p>
                    <p>• الشرط الأول: عند تحقيق عائد <strong><EditableSlot id="scale_roas_min" placeholder="ROAS > 3.0" value={state.scale_roas_min} onChange={onChange} /></strong>.</p>
                    <p>• الشرط الثاني: عند ثبات تكلفة CPA أقل من <strong><EditableSlot id="scale_cpa_max" placeholder="CPA < 40 ر.س" value={state.scale_cpa_max} onChange={onChange} /></strong> لمدة 3 أيام.</p>
                    <p style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        الإجراء: نزيد ميزانية الحساب الإعلاني بمقدار 20% كل 48 ساعة.
                    </p>
                </div>

                <div className="card-item" style={{ borderTop: '4px solid var(--neon-crimson)' }}>
                    <h3 style={{ color: 'var(--neon-crimson)' }}>📉 Kill (إيقاف وتجميد حملة)</h3>
                    <p style={{ margin: '8px 0' }}>• متى نوقف الصرف؟</p>
                    <p>• الشرط الأول: عند صرف <strong><EditableSlot id="kill_spend_limit" placeholder="مثال: 3x target CPA" value={state.kill_spend_limit} onChange={onChange} /></strong> دون أي مبيعات.</p>
                    <p>• الشرط الثاني: انخفاض العائد ROAS الفعلي أقل من <strong><EditableSlot id="kill_roas_limit" placeholder="ROAS < 1.2" value={state.kill_roas_limit} onChange={onChange} /></strong>.</p>
                    <p style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        الإجراء: إيقاف الإعلان أو المجموعة الإعلانية فوراً دون تردد.
                    </p>
                </div>

                <div className="card-item" style={{ borderTop: '4px solid var(--neon-amber)' }}>
                    <h3 style={{ color: 'var(--neon-amber)' }}>🔄 Rotate (تدوير وتحسين الكرييتف)</h3>
                    <p style={{ margin: '8px 0' }}>• متى نغير الكرييتف؟</p>
                    <p>• الشرط الأول: عند انخفاض نسبة النقر CTR أقل من <strong><EditableSlot id="rotate_ctr_limit" placeholder="CTR < 1.0%" value={state.rotate_ctr_limit} onChange={onChange} /></strong>.</p>
                    <p>• الشرط الثاني: ارتفاع تكلفة النقرة CPC أعلى من <strong><EditableSlot id="rotate_cpc_limit" placeholder="CPC > 2.5 ر.س" value={state.rotate_cpc_limit} onChange={onChange} /></strong>.</p>
                    <p style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        الإجراء: استبدال الهوكس (Hooks) أو تغيير صور العروض الإعلانية.
                    </p>
                </div>
            </div>

            <hr />

            <h3 className="section-title">18) التحكم بالصرف والسرعة (Budget Pacing &amp; Guardrails)</h3>
            <div className="checklist-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <CustomCheckbox id="rule_guard_daily" checked={state.rule_guard_daily} onChange={onChange}>
                    تفعيل ميزة الميزانيات الذكية على مستوى الحملة (CBO) بدلاً من المجموعات الإعلانية (ABO).
                </CustomCheckbox>
                <CustomCheckbox id="rule_guard_check" checked={state.rule_guard_check} onChange={onChange}>
                    فحص الصرف اليومي الساعة 12 منتصف الليل بتوقيت السعودية لتفادي تجاوز الصرف الكلي.
                </CustomCheckbox>
                <CustomCheckbox id="rule_guard_limit" checked={state.rule_guard_limit} onChange={onChange}>
                    وضع حدود صرف قصوى للحساب الإعلاني (Account Spend Limit) لمنع الصرف المفرط عند الأخطاء الفنية.
                </CustomCheckbox>
            </div>

            <h3 className="section-title">22) قائمة اختبارات التجريب والتحسين (Experiment Backlog)</h3>
            <div className="table-wrapper">
                <table className="executive-table">
                    <thead>
                        <tr>
                            <th>نوع التجربة</th>
                            <th>الفرضية الحسابية</th>
                            <th>المقياس الأساسي المستهدف</th>
                            <th>المنصة المختارة</th>
                            <th>الحالة</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>اختبار Broad vs Interest</strong></td>
                            <td>الاستهداف العريض يعطي تكلفة اكتساب أقل واستمرارية أطول</td>
                            <td>CPA / ROAS</td>
                            <td>Meta Ads</td>
                            <td>
                                <EditableSlot id="exp1_status" placeholder="To do / Testing / Done" value={state.exp1_status} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>اختبار Hook A vs B</strong></td>
                            <td>الهوك الحواري التفاعلي UGC يعطي VTR أعلى بنسبة 20%</td>
                            <td>3-Second Video View / CTR</td>
                            <td>TikTok Ads</td>
                            <td>
                                <EditableSlot id="exp2_status" placeholder="To do / Testing / Done" value={state.exp2_status} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>اختبار Landing Page B</strong></td>
                            <td>صفحة العروض السريعة المباشرة تزيد نسبة الشراء بنسبة 15%</td>
                            <td>Conversion Rate (CR%)</td>
                            <td>Google / Meta</td>
                            <td>
                                <EditableSlot id="exp3_status" placeholder="To do / Testing / Done" value={state.exp3_status} onChange={onChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
