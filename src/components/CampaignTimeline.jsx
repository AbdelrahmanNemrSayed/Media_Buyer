
export default function CampaignTimeline({ state, onChange }) {
    const events = state.timeline_events || [
        { id: '1', date: 'اليوم الأول', title: 'إطلاق حملات الاختبار (Testing)', color: 'var(--primary-color)' },
        { id: '2', date: 'اليوم الثالث', title: 'إيقاف الإعلانات الخاسرة (Kill Losers)', color: 'var(--red)' },
        { id: '3', date: 'اليوم الخامس', title: 'زيادة ميزانية الناجح (Scaling)', color: 'var(--neon-green)' },
        { id: '4', date: 'اليوم السابع', title: 'إطلاق حملات إعادة الاستهداف (Retargeting)', color: 'var(--purple)' },
    ];

    const handleEventChange = (index, field, value) => {
        const newEvents = [...events];
        newEvents[index] = { ...newEvents[index], [field]: value };
        onChange('timeline_events', newEvents);
    };

    const addEvent = () => {
        onChange('timeline_events', [...events, { id: Date.now().toString(), date: 'التاريخ', title: 'حدث جديد', color: 'var(--text-secondary)' }]);
    };

    const removeEvent = (index) => {
        const newEvents = events.filter((_, i) => i !== index);
        onChange('timeline_events', newEvents);
    };

    return (
        <div className="glass-panel">
            <h2 className="panel-title">📅 الجدول الزمني للحملة (Campaign Timeline)</h2>
            <p className="panel-subtitle">خطط لمراحل إطلاق الحملة التسويقية خطوة بخطوة.</p>

            <div style={{ marginTop: '30px', position: 'relative', paddingRight: '20px' }}>
                {/* Timeline vertical line */}
                <div style={{ position: 'absolute', right: '8px', top: '0', bottom: '0', width: '2px', background: 'rgba(255,255,255,0.1)' }}></div>

                {events.map((ev, index) => (
                    <div key={ev.id} style={{ position: 'relative', marginBottom: '24px', paddingRight: '30px' }}>
                        {/* Timeline dot */}
                        <div style={{ 
                            position: 'absolute', 
                            right: '-12px', 
                            top: '8px', 
                            width: '16px', 
                            height: '16px', 
                            borderRadius: '50%', 
                            background: ev.color,
                            border: '3px solid var(--bg-dark)'
                        }}></div>

                        <div className="card-item" style={{ borderColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', alignItems: 'center' }}>
                                <input 
                                    type="text" 
                                    value={ev.date} 
                                    onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                                    style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', padding: '8px', borderRadius: '4px', fontSize: '0.85rem' }}
                                />
                                <input 
                                    type="text" 
                                    value={ev.title} 
                                    onChange={(e) => handleEventChange(index, 'title', e.target.value)}
                                    style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 'bold', outline: 'none' }}
                                />
                            </div>
                            <button className="btn btn-secondary" onClick={() => removeEvent(index)} style={{ padding: '4px 8px', color: 'var(--red)' }}>✕</button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="btn btn-secondary" onClick={addEvent} style={{ marginTop: '16px' }}>
                ＋ إضافة حدث جديد
            </button>
        </div>
    );
}
