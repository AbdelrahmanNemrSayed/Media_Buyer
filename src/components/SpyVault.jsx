import { useState } from 'react';
import EditableSlot from './EditableSlot';

export default function SpyVault({ state, onChange }) {
    const vaultItems = state.spy_vault_items || [];
    const [sentId, setSentId] = useState('');

    const sendToCreativeLibrary = (item) => {
        const currentCreatives = state.creative_library || [
            { id: 1, name: 'HFL_TOFU_DealHook_01', brand: 'H For Less', stage: 'TOFU', angle: 'توفير / Bundle', format: 'UGC / Demo', hook: 'هوك جذاب أول ثانيتين', length: '12s', cta: 'اشترِ الآن', status: 'Live', link: 'https://drive.google.com/...' }
        ];

        const nextId = currentCreatives.length > 0 ? Math.max(...currentCreatives.map(r => r.id)) + 1 : 1;
        const newRow = {
            id: nextId,
            name: `Spy_Idea_${nextId}`,
            brand: 'H For Less',
            stage: 'TOFU',
            angle: item.notes || 'مستوحى من المنافسين',
            format: 'Spy UGC',
            hook: item.hook || 'هوك المنافس',
            length: '15s',
            cta: 'اشترِ الآن',
            status: 'Ready',
            link: item.url || ''
        };

        onChange('creative_library', [...currentCreatives, newRow]);
        
        setSentId(item.id);
        setTimeout(() => setSentId(''), 2000);
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...vaultItems];
        newItems[index] = { ...newItems[index], [field]: value };
        onChange('spy_vault_items', newItems);
    };

    const addItem = () => {
        onChange('spy_vault_items', [
            { id: Date.now().toString(), url: '', hook: '', notes: '' },
            ...vaultItems
        ]);
    };

    const removeItem = (index) => {
        const newItems = vaultItems.filter((_, i) => i !== index);
        onChange('spy_vault_items', newItems);
    };

    return (
        <div className="glass-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                    <h2 className="panel-title" style={{ margin: 0 }}>🕵️ مخزن المنافسين (Competitor Spy Vault)</h2>
                    <p className="panel-subtitle" style={{ margin: '8px 0 0 0' }}>احتفظ بإعلانات المنافسين الناجحة وحللها لتكون مرجعاً للإلهام في حملاتك.</p>
                </div>
                <button className="btn btn-primary" onClick={addItem}>＋ إضافة إعلان للمخزن</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '24px' }}>
                {vaultItems.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                        لا يوجد إعلانات محفوظة بعد. اضغط على الزر بالأعلى لإضافة إعلان جديد.
                    </div>
                ) : (
                    vaultItems.map((item, index) => (
                        <div key={item.id} className="card-item" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button 
                                onClick={() => removeItem(index)} 
                                style={{ position: 'absolute', top: '12px', left: '12px', background: 'transparent', border: 'none', color: 'var(--red)', cursor: 'pointer', fontSize: '1.2rem' }}
                                title="حذف"
                            >
                                ✕
                            </button>
                            
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', color: 'var(--primary-color)' }}>🔗 رابط الإعلان (Meta Ads Library / TikTok)</label>
                                <EditableSlot 
                                    id={`vault_url_${item.id}`} 
                                    placeholder="أدخل رابط الإعلان هنا" 
                                    value={item.url} 
                                    onChange={(val) => handleItemChange(index, 'url', val)} 
                                />
                                {item.url && item.url.startsWith('http') && (
                                    <a href={item.url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'underline' }}>
                                        فتح الرابط ↗
                                    </a>
                                )}
                            </div>
                            
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', color: 'var(--neon-green)' }}>🎣 الـ Hook (كيف جذب الانتباه؟)</label>
                                <EditableSlot 
                                    id={`vault_hook_${item.id}`} 
                                    placeholder="مثال: بدأ بسؤال صادم عن تساقط الشعر..." 
                                    value={item.hook} 
                                    onChange={(val) => handleItemChange(index, 'hook', val)} 
                                />
                            </div>
                            
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>📝 ملاحظات وزاوية البيع</label>
                                <textarea 
                                    className="editable-input"
                                    placeholder="لماذا نجح الإعلان برأيك؟ وما الذي يمكننا تقليده أو تحسينه؟" 
                                    value={item.notes} 
                                    onChange={(e) => handleItemChange(index, 'notes', e.target.value)} 
                                    style={{ width: '100%', minHeight: '80px', padding: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', borderRadius: '4px', resize: 'vertical' }}
                                />
                            </div>

                            <button 
                                className="btn btn-save"
                                style={{ width: '100%', justifyContent: 'center', height: '36px', fontSize: '0.82rem', marginTop: '4px', background: 'var(--neon-blue)', borderColor: 'var(--neon-blue)', display: 'flex', alignItems: 'center', gap: '6px', color: '#fff' }}
                                onClick={() => sendToCreativeLibrary(item)}
                            >
                                {sentId === item.id ? '🎬 تم الإرسال للمكتبة ✓' : '🎬 إرسال لمكتبة الكرييتف'}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
