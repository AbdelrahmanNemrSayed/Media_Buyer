import { useState, useEffect } from 'react';
import EditableSlot from './EditableSlot';

export default function NamingConvention({ state, onChange }) {
    const [generatedName, setGeneratedName] = useState('');
    const [copied, setCopied] = useState(false);

    const platform = state.naming_platform || 'FB';
    const objective = state.naming_objective || 'Conv';
    const country = state.naming_country || 'EG';
    const audience = state.naming_audience || 'Broad';
    const creative = state.naming_creative || 'V1';
    
    // Auto date (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    const date = state.naming_date || today;

    useEffect(() => {
        const parts = [platform, objective, country, audience, creative, date].filter(Boolean);
        setGeneratedName(parts.join('_').replace(/\s+/g, '-'));
    }, [platform, objective, country, audience, creative, date]);

    const handleCopy = () => {
        if (generatedName) {
            navigator.clipboard.writeText(generatedName);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="glass-panel">
            <h2 className="panel-title">🏷️ أداة تسمية الحملات (Naming Convention Generator)</h2>
            <p className="panel-subtitle">حافظ على تنظيم حملاتك الإعلانية من خلال توحيد طريقة تسمية الحملات والمجموعات الإعلانية.</p>

            <div className="card-item" style={{ marginTop: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>المنصة الإعلانية</label>
                        <EditableSlot id="naming_platform" placeholder="FB, TK, GOOG" value={state.naming_platform} onChange={onChange} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>الهدف (Objective)</label>
                        <EditableSlot id="naming_objective" placeholder="Conv, Lead, Traf" value={state.naming_objective} onChange={onChange} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>الدولة (Country)</label>
                        <EditableSlot id="naming_country" placeholder="EG, SA, AE" value={state.naming_country} onChange={onChange} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>الجمهور (Audience)</label>
                        <EditableSlot id="naming_audience" placeholder="Broad, LAL, Retarget" value={state.naming_audience} onChange={onChange} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>الكرييتف (Creative)</label>
                        <EditableSlot id="naming_creative" placeholder="V1, Img_Blue, UGC2" value={state.naming_creative} onChange={onChange} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>التاريخ (Date)</label>
                        <EditableSlot id="naming_date" placeholder={today} value={state.naming_date} onChange={onChange} />
                    </div>
                </div>

                <div style={{ padding: '16px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--purple)' }}>اسم الحملة النهائي (جاهز للنسخ):</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input 
                            type="text" 
                            readOnly 
                            value={generatedName} 
                            style={{ flex: 1, padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '1.1rem' }}
                        />
                        <button 
                            onClick={handleCopy} 
                            disabled={!generatedName}
                            className="btn btn-primary"
                            style={{ minWidth: '120px', background: 'var(--purple)' }}
                        >
                            {copied ? '✅ تم النسخ' : '📋 انسخ الاسم'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
