import EditableSlot from './EditableSlot';

export default function PostMortem({ state, onChange }) {
    return (
        <div className="glass-panel">
            <h2 className="panel-title">ورقة القياس والتحليلات والتقارير</h2>
            <p className="panel-subtitle">متابعة البيانات الفنية، جدول التقارير الدورية، والتعلم المستمر من Post-Mortem نهاية الشهر.</p>

            <h3 className="section-title">19) ورقة التتبع الكاملة للجمهور (Full Funnel Tracking Sheet)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                متابعة دقيقة للأرقام المحققة والنتائج على امتداد قمع المبيعات بالكامل:
            </p>

            <div className="table-wrapper">
                <table className="executive-table" style={{ fontFamily: 'var(--font-english)', direction: 'ltr', textAlign: 'left' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left' }}>Funnel Stage</th>
                            <th style={{ textAlign: 'left' }}>Metric</th>
                            <th style={{ textAlign: 'left' }}>Target Benchmarks</th>
                            <th style={{ textAlign: 'left' }}>Actual Achieved</th>
                            <th style={{ textAlign: 'left' }}>Deviation / Gap</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>TOFU (Awareness)</strong></td>
                            <td>CTR (Click-Through Rate)</td>
                            <td>&gt; 1.5%</td>
                            <td>
                                <EditableSlot id="actual_ctr" placeholder="Actual CTR%" value={state.actual_ctr} onChange={onChange} />
                            </td>
                            <td>
                                <EditableSlot id="gap_ctr" placeholder="Gap" value={state.gap_ctr} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>MOFU (Engagement)</strong></td>
                            <td>Add-to-Cart (ATC%)</td>
                            <td>&gt; 6.0%</td>
                            <td>
                                <EditableSlot id="actual_atc" placeholder="Actual ATC%" value={state.actual_atc} onChange={onChange} />
                            </td>
                            <td>
                                <EditableSlot id="gap_atc" placeholder="Gap" value={state.gap_atc} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>BOFU (Conversion)</strong></td>
                            <td>Purchase Conversion Rate</td>
                            <td>&gt; 1.8%</td>
                            <td>
                                <EditableSlot id="actual_cr" placeholder="Actual CR%" value={state.actual_cr} onChange={onChange} />
                            </td>
                            <td>
                                <EditableSlot id="gap_cr_metric" placeholder="Gap" value={state.gap_cr_metric} onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>ROAS / ROI</strong></td>
                            <td>Average ROAS</td>
                            <td>&gt; 2.5x</td>
                            <td>
                                <EditableSlot id="actual_roas" placeholder="Actual ROAS" value={state.actual_roas} onChange={onChange} />
                            </td>
                            <td>
                                <EditableSlot id="gap_roas" placeholder="Gap" value={state.gap_roas} onChange={onChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <hr />

            <h3 className="section-title">8) جدول التقارير والمتابعة (Reporting Schedule)</h3>
            <div className="grid-cols-3">
                <div className="card-item">
                    <h3>📊 التقارير اليومية</h3>
                    <p style={{ marginTop: '8px' }}>• الصرف اليومي والـ CPA الأساسي.</p>
                    <p>• فحص فني لحالة التتبع والروابط.</p>
                    <p>• مسؤولية: <strong>ميديا باير</strong></p>
                </div>
                
                <div className="card-item" style={{ borderColor: 'rgba(0, 82, 255, 0.15)' }}>
                    <h3>📈 التقارير الأسبوعية</h3>
                    <p style={{ marginTop: '8px' }}>• تحليل أداء الإعلانات وحصاد النتائج.</p>
                    <p>• مقارنة العائد ROAS الفعلي بالمستهدف.</p>
                    <p>• مسؤولية: <strong>ميديا باير + مدير الحساب</strong></p>
                </div>

                <div className="card-item" style={{ borderColor: 'rgba(16, 185, 129, 0.15)' }}>
                    <h3>🏆 تقرير نهاية الشهر</h3>
                    <p style={{ marginTop: '8px' }}>• مراجعة الربحية الكلية للبراند.</p>
                    <p>• التوصيات الاستراتيجية للشهر القادم.</p>
                    <p>• مسؤولية: <strong>الفريق التسويقي بالكامل</strong></p>
                </div>
            </div>

            <hr />

            <h3 className="section-title">23) تقرير التعلميات وقرارات نهاية الشهر (Post-Mortem Log)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                سجل القرارات والتعلميات المستفادة لتفادي أخطاء الماضي وتحسين الكفاءة:
            </p>

            <div className="table-wrapper">
                <table className="executive-table">
                    <thead>
                        <tr>
                            <th>المشكلة أو الخطأ الفني</th>
                            <th>السبب الأساسي للحدث</th>
                            <th>القرار والإجراء التصحيحي الفوري</th>
                            <th>المسؤول</th>
                            <th>النتيجة المستفادة</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" className="inline-input" placeholder="مثال: توقف بكسل تيك توك" value={state.pm_issue_1 || ''} onChange={(e) => onChange('pm_issue_1', e.target.value)} />
                            </td>
                            <td>
                                <input type="text" className="inline-input" placeholder="تغيير كود الهيدر بالموقع" value={state.pm_reason_1 || ''} onChange={(e) => onChange('pm_reason_1', e.target.value)} />
                            </td>
                            <td>
                                <input type="text" className="inline-input" placeholder="ربط البكسل عن طريق GTM وتفعيله" value={state.pm_action_1 || ''} onChange={(e) => onChange('pm_action_1', e.target.value)} />
                            </td>
                            <td>
                                <input type="text" className="inline-input" placeholder="المطور التقني" value={state.pm_owner_1 || ''} onChange={(e) => onChange('pm_owner_1', e.target.value)} style={{ width: '100px' }} />
                            </td>
                            <td>
                                <input type="text" className="inline-input" placeholder="أي كود جديد يمر بمرحلة QA" value={state.pm_lesson_1 || ''} onChange={(e) => onChange('pm_lesson_1', e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" className="inline-input" placeholder="مثال: نفاد ميزانية Meta ظهراً" value={state.pm_issue_2 || ''} onChange={(e) => onChange('pm_issue_2', e.target.value)} />
                            </td>
                            <td>
                                <input type="text" className="inline-input" placeholder="وضع ميزانية ABO مرتفعة بالخطأ" value={state.pm_reason_2 || ''} onChange={(e) => onChange('pm_reason_2', e.target.value)} />
                            </td>
                            <td>
                                <input type="text" className="inline-input" placeholder="تفعيل ميزة CBO ووضع حد صرف أقصى" value={state.pm_action_2 || ''} onChange={(e) => onChange('pm_action_2', e.target.value)} />
                            </td>
                            <td>
                                <input type="text" className="inline-input" placeholder="ميديا باير" value={state.pm_owner_2 || ''} onChange={(e) => onChange('pm_owner_2', e.target.value)} style={{ width: '100px' }} />
                            </td>
                            <td>
                                <input type="text" className="inline-input" placeholder="مراجعة ميزانيات الحملة قبل الإطلاق" value={state.pm_lesson_2 || ''} onChange={(e) => onChange('pm_lesson_2', e.target.value)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
