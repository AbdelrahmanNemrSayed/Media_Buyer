import { useState, useEffect } from 'react';
import EditableSlot from './EditableSlot';

export default function UTMBuilder({ state, onChange }) {
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [copied, setCopied] = useState(false);

    const baseUrl = state.utm_base_url || '';
    const source = state.utm_source || '';
    const medium = state.utm_medium || '';
    const campaign = state.utm_campaign || '';
    const content = state.utm_content || '';

    useEffect(() => {
        if (!baseUrl) {
            setGeneratedUrl('');
            return;
        }
        try {
            const url = new URL(baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`);
            if (source) url.searchParams.set('utm_source', source);
            if (medium) url.searchParams.set('utm_medium', medium);
            if (campaign) url.searchParams.set('utm_campaign', campaign);
            if (content) url.searchParams.set('utm_content', content);
            setGeneratedUrl(url.toString());
        } catch {
            setGeneratedUrl('الرابط الأساسي غير صالح');
        }
    }, [baseUrl, source, medium, campaign, content]);

    const handleCopy = () => {
        if (generatedUrl && generatedUrl !== 'الرابط الأساسي غير صالح') {
            navigator.clipboard.writeText(generatedUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="glass-panel">
            <h2 className="panel-title">🔗 منشئ الروابط الذكي (UTM Builder)</h2>
            <p className="panel-subtitle">قم ببناء روابط تتبع دقيقة لحملاتك الإعلانية لمعرفة مصدر المبيعات في Google Analytics.</p>

            <div className="card-item" style={{ marginTop: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>الرابط الأساسي (Website URL) *</label>
                        <EditableSlot id="utm_base_url" placeholder="https://yourstore.com/product" value={state.utm_base_url} onChange={onChange} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>المصدر (utm_source)</label>
                        <EditableSlot id="utm_source" placeholder="مثال: facebook, tiktok, google" value={state.utm_source} onChange={onChange} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>الوسيط (utm_medium)</label>
                        <EditableSlot id="utm_medium" placeholder="مثال: cpc, social, email" value={state.utm_medium} onChange={onChange} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>اسم الحملة (utm_campaign)</label>
                        <EditableSlot id="utm_campaign" placeholder="مثال: summer_sale_2026" value={state.utm_campaign} onChange={onChange} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>المحتوى/الإعلان (utm_content)</label>
                        <EditableSlot id="utm_content" placeholder="مثال: video_v1, image_red" value={state.utm_content} onChange={onChange} />
                    </div>
                </div>

                <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(0, 82, 255, 0.1)', borderRadius: '8px', border: '1px solid rgba(0, 82, 255, 0.3)' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--primary-color)' }}>الرابط النهائي الجاهز للاستخدام:</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input 
                            type="text" 
                            readOnly 
                            value={generatedUrl} 
                            style={{ flex: 1, padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: 'var(--text-primary)' }}
                        />
                        <button 
                            onClick={handleCopy} 
                            disabled={!generatedUrl || generatedUrl === 'الرابط الأساسي غير صالح'}
                            className="btn btn-primary"
                            style={{ minWidth: '100px' }}
                        >
                            {copied ? '✅ تم النسخ' : '📋 نسخ الرابط'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
