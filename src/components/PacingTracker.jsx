import EditableSlot from './EditableSlot';

export default function PacingTracker({ state, onChange }) {
    const cur = (state && state.currency) || 'ج.م';
    const totalBudget = parseFloat(state.pacing_budget || state.calc_total_budget || '0') || 0;
    const spend = parseFloat(state.pacing_spend || '0') || 0;
    const totalDays = parseFloat(state.pacing_days_total || '30') || 30;
    const daysPassed = parseFloat(state.pacing_days_passed || '1') || 1;

    // Calculations
    const idealDailySpend = totalBudget / totalDays;
    const currentDailySpend = spend / daysPassed;
    
    const remainingBudget = Math.max(0, totalBudget - spend);
    const remainingDays = Math.max(1, totalDays - daysPassed);
    const requiredDailySpend = remainingBudget / remainingDays;

    const pacingRatio = idealDailySpend > 0 ? (currentDailySpend / idealDailySpend) : 0;
    
    let statusText = 'على المسار الصحيح (On Pace)';
    let statusDesc = 'إنفاقك المالي يتماشى تماماً مع الأيام المنقضية. ممتاز!';
    let statusColor = 'var(--neon-green)';
    let statusGlow = 'rgba(16, 185, 129, 0.45)';
    let statusBg = 'rgba(16, 185, 129, 0.03)';
    let pacingDelta = 0;

    if (totalBudget > 0 && totalDays > 0) {
        const spendPct = (spend / totalBudget) * 100;
        const timePct = (daysPassed / totalDays) * 100;
        pacingDelta = spendPct - timePct;
    }

    if (pacingRatio > 1.15) {
        statusText = 'إنفاق زائد (Over-pacing) ⚠️';
        statusDesc = `معدل الصرف أسرع بـ ${Math.abs(pacingDelta).toFixed(1)}% من الجدول الزمني. قد تنفد الميزانية مبكراً!`;
        statusColor = 'var(--neon-crimson)';
        statusGlow = 'rgba(255, 0, 85, 0.45)';
        statusBg = 'rgba(255, 0, 85, 0.03)';
    } else if (pacingRatio < 0.85) {
        statusText = 'إنفاق بطيء (Under-pacing) 💤';
        statusDesc = `الصرف متأخر بـ ${Math.abs(pacingDelta).toFixed(1)}% عن المسار المالي. تحتاج لرفع الاستهداف أو تحسين الصرف.`;
        statusColor = 'var(--neon-cyan)';
        statusGlow = 'rgba(0, 240, 255, 0.45)';
        statusBg = 'rgba(0, 240, 255, 0.03)';
    }

    const progressPct = totalBudget > 0 ? Math.min(100, (spend / totalBudget) * 100) : 0;
    const timePct = totalDays > 0 ? Math.min(100, (daysPassed / totalDays) * 100) : 0;

    // Circumference for r=50 is 2 * Math.PI * 50 = 314.16
    const circ = 314.16;
    const spendDashOffset = circ - (circ * Math.min(100, progressPct)) / 100;
    const timeDashOffset = circ - (circ * Math.min(100, timePct)) / 100;

    return (
        <div className="glass-panel">
            <h2 className="panel-title">💸 متتبع وتيرة الإنفاق الذكي (Budget Pacing Tracker)</h2>
            <p className="panel-subtitle">تأكد من ملاءمة الصرف الإعلاني اليومي وتوقيتات الحملة بدقة لتفادي نفاد الميزانية أو تباطؤ الأداء.</p>

            <div className="grid-cols-2" style={{ marginTop: '24px', alignItems: 'stretch' }}>
                {/* Inputs card */}
                <div className="card-item" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <h3 style={{ marginBottom: '18px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            ⚙️ معايير ومتغيرات الصرف
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '600' }}>
                                    💰 الميزانية الإجمالية المعتمدة للحملة
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <EditableSlot id="pacing_budget" placeholder="أدخل الميزانية الكلية" value={state.pacing_budget || state.calc_total_budget} onChange={onChange} />
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{cur}</span>
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '600' }}>
                                    📈 إجمالي المبالغ المصروفة فعلياً
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <EditableSlot id="pacing_spend" placeholder="المصروف الكلي" value={state.pacing_spend} onChange={onChange} />
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{cur}</span>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '600' }}>
                                        📅 أيام الحملة
                                    </label>
                                    <EditableSlot id="pacing_days_total" placeholder="المدة الكلية" value={state.pacing_days_total} onChange={onChange} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '600' }}>
                                        ⏳ الأيام المنقضية
                                    </label>
                                    <EditableSlot id="pacing_days_passed" placeholder="الأيام المارة" value={state.pacing_days_passed} onChange={onChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px dashed var(--glass-border)' }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', lineHeight: '1.5' }}>
                            💡 ملاحظة: يسحب المتتبع الميزانية تلقائياً من **الأهداف والميزانيات التفاعلية** إذا تركت فارغة لتسريع العمل وتجنب التكرار.
                        </span>
                    </div>
                </div>

                {/* Circular dials & Status card */}
                <div 
                    className="card-item" 
                    style={{ 
                        borderColor: statusColor + '33', 
                        background: statusBg,
                        boxShadow: `inset 0 0 20px ${statusColor}06`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ color: statusColor, margin: 0, fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem' }}>
                                {statusText}
                            </h3>
                            <span 
                                style={{ 
                                    background: statusColor + '1a', 
                                    color: statusColor, 
                                    fontSize: '0.75rem', 
                                    padding: '3px 9px', 
                                    borderRadius: '20px', 
                                    fontWeight: '700',
                                    border: `1px solid ${statusColor}33`,
                                    boxShadow: `0 0 10px ${statusColor}22`
                                }}
                            >
                                وتيرة الصرف: {(pacingRatio * 100).toFixed(0)}%
                            </span>
                        </div>

                        {/* Comparative circular dials container */}
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '16px', margin: '20px 0 24px' }}>
                            
                            {/* Dial 1: Spent Budget */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                                <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                                    <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                                        {/* Background track */}
                                        <circle 
                                            cx="60" cy="60" r="50" 
                                            stroke="rgba(255, 255, 255, 0.04)" 
                                            strokeWidth="8" fill="transparent" 
                                        />
                                        {/* Colored progress */}
                                        <circle 
                                            cx="60" cy="60" r="50" 
                                            stroke="var(--neon-cyan)" 
                                            strokeWidth="9" fill="transparent"
                                            strokeDasharray={circ}
                                            strokeDashoffset={spendDashOffset}
                                            strokeLinecap="round"
                                            style={{
                                                transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                                filter: 'drop-shadow(0 0 6px rgba(0, 240, 255, 0.4))'
                                            }}
                                        />
                                    </svg>
                                    <div style={{
                                        position: 'absolute',
                                        top: 0, left: 0, right: 0, bottom: 0,
                                        display: 'flex', flexDirection: 'column',
                                        alignItems: 'center', justifyContent: 'center',
                                        fontFamily: 'var(--font-english)'
                                    }}>
                                        <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff' }}>{progressPct.toFixed(0)}%</span>
                                        <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '-2px' }}>SPENT</span>
                                    </div>
                                </div>
                                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', marginTop: '10px' }}>
                                    💸 ميزانية مصروفة
                                </span>
                            </div>

                            {/* Dial 2: Time Elapsed */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                                <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                                    <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                                        {/* Background track */}
                                        <circle 
                                            cx="60" cy="60" r="50" 
                                            stroke="rgba(255, 255, 255, 0.04)" 
                                            strokeWidth="8" fill="transparent" 
                                        />
                                        {/* Colored progress */}
                                        <circle 
                                            cx="60" cy="60" r="50" 
                                            stroke="var(--neon-amber)" 
                                            strokeWidth="9" fill="transparent"
                                            strokeDasharray={circ}
                                            strokeDashoffset={timeDashOffset}
                                            strokeLinecap="round"
                                            style={{
                                                transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                                filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.4))'
                                            }}
                                        />
                                    </svg>
                                    <div style={{
                                        position: 'absolute',
                                        top: 0, left: 0, right: 0, bottom: 0,
                                        display: 'flex', flexDirection: 'column',
                                        alignItems: 'center', justifyContent: 'center',
                                        fontFamily: 'var(--font-english)'
                                    }}>
                                        <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff' }}>{timePct.toFixed(0)}%</span>
                                        <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '-2px' }}>DAYS</span>
                                    </div>
                                </div>
                                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', marginTop: '10px' }}>
                                    ⏳ أيام منقضية
                                </span>
                            </div>

                        </div>

                        {/* Status Description Message */}
                        <div style={{
                            background: 'rgba(255,255,255,0.015)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '10px',
                            padding: '10px 14px',
                            marginBottom: '16px',
                            fontSize: '0.825rem',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.6',
                            textAlign: 'center'
                        }}>
                            {statusDesc}
                        </div>
                    </div>

                    {/* Numeric stats block */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.15)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>معدل إنفاقك الفعلي / يوم:</span>
                            <strong style={{ color: '#ffffff', fontSize: '0.92rem', display: 'block', marginTop: '2px' }}>
                                {currentDailySpend.toLocaleString(undefined, { maximumFractionDigits: 1 })} {cur}
                            </strong>
                            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                                مقابل المثالي: {idealDailySpend.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                            </span>
                        </div>
                        
                        <div style={{ background: 'rgba(0,0,0,0.15)', padding: '10px 12px', borderRadius: '8px', border: '1px dashed var(--glass-border)' }}>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>الميزانية المتبقية الكلية:</span>
                            <strong style={{ color: '#ffffff', fontSize: '0.92rem', display: 'block', marginTop: '2px' }}>
                                {remainingBudget.toLocaleString(undefined, { maximumFractionDigits: 1 })} {cur}
                            </strong>
                            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                                مطلوب {requiredDailySpend.toLocaleString(undefined, { maximumFractionDigits: 1 })} {cur} / يوم
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

