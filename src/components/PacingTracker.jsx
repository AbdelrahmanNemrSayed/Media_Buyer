import EditableSlot from './EditableSlot';

export default function PacingTracker({ state, onChange }) {
    const totalBudget = parseFloat(state.pacing_budget) || 0;
    const spend = parseFloat(state.pacing_spend) || 0;
    const totalDays = parseFloat(state.pacing_days_total) || 1;
    const daysPassed = parseFloat(state.pacing_days_passed) || 1;

    // Calculations
    const idealDailySpend = totalBudget / totalDays;
    const currentDailySpend = spend / daysPassed;
    
    const remainingBudget = Math.max(0, totalBudget - spend);
    const remainingDays = Math.max(1, totalDays - daysPassed);
    const requiredDailySpend = remainingBudget / remainingDays;

    const pacingRatio = idealDailySpend > 0 ? (currentDailySpend / idealDailySpend) : 0;
    
    let statusText = 'على المسار (On Pace)';
    let statusColor = 'var(--neon-green)';
    if (pacingRatio > 1.1) {
        statusText = 'إنفاق زائد (Over-pacing)';
        statusColor = 'var(--red)';
    } else if (pacingRatio < 0.85) {
        statusText = 'إنفاق بطيء (Under-pacing)';
        statusColor = 'var(--primary-color)'; // using blue for underpacing
    }

    const progressPct = totalBudget > 0 ? Math.min(100, (spend / totalBudget) * 100) : 0;
    const timePct = totalDays > 0 ? Math.min(100, (daysPassed / totalDays) * 100) : 0;

    return (
        <div className="glass-panel">
            <h2 className="panel-title">💸 متتبع وتيرة الإنفاق (Budget Pacing Tracker)</h2>
            <p className="panel-subtitle">تأكد من أنك تنفق ميزانيتك الشهرية بالسرعة الصحيحة دون أن تنفد قبل نهاية الشهر.</p>

            <div className="grid-cols-2" style={{ marginTop: '24px' }}>
                <div className="card-item">
                    <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>المدخلات الحالية</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>الميزانية الإجمالية للحملة/الشهر</label>
                            <EditableSlot id="pacing_budget" placeholder="مثال: 10000" value={state.pacing_budget} onChange={onChange} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>الإنفاق الفعلي حتى اليوم</label>
                            <EditableSlot id="pacing_spend" placeholder="مثال: 3500" value={state.pacing_spend} onChange={onChange} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>إجمالي أيام الحملة</label>
                                <EditableSlot id="pacing_days_total" placeholder="مثال: 30" value={state.pacing_days_total} onChange={onChange} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>الأيام المنقضية</label>
                                <EditableSlot id="pacing_days_passed" placeholder="مثال: 10" value={state.pacing_days_passed} onChange={onChange} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-item" style={{ borderColor: `rgba(${statusColor === 'var(--red)' ? '239, 68, 68' : statusColor === 'var(--neon-green)' ? '16, 185, 129' : '0, 82, 255'}, 0.3)` }}>
                    <h3 style={{ marginBottom: '16px', color: statusColor }}>الحالة: {statusText}</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>الإنفاق اليومي الفعلي:</span>
                            <strong style={{ color: 'var(--text-primary)' }}>${currentDailySpend.toFixed(2)}</strong>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>الإنفاق اليومي المثالي:</span>
                            <strong style={{ color: 'var(--text-primary)' }}>${idealDailySpend.toFixed(2)}</strong>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>الميزانية المتبقية:</span>
                            <strong style={{ color: 'var(--text-primary)' }}>${remainingBudget.toFixed(2)}</strong>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', borderLeft: '3px solid var(--purple)' }}>
                            <span style={{ color: 'var(--text-muted)' }}>الإنفاق المطلوب للأيام القادمة:</span>
                            <strong style={{ color: 'var(--purple)' }}>${requiredDailySpend.toFixed(2)} / يوم</strong>
                        </div>
                    </div>

                    <div style={{ marginTop: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>الإنفاق ({progressPct.toFixed(0)}%)</span>
                            <span style={{ color: 'var(--text-secondary)' }}>الوقت ({timePct.toFixed(0)}%)</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
                            {/* Time bar (background) */}
                            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${timePct}%`, background: 'rgba(255,255,255,0.2)' }} />
                            {/* Spend bar (foreground) */}
                            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${progressPct}%`, background: statusColor }} />
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
                            * الشريط الملون يمثل الإنفاق، والشريط الرمادي الفاتح يمثل الوقت. إذا سبق الملون الرمادي، فأنت تنفق بسرعة كبيرة.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
