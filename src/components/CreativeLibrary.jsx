import EditableSlot from './EditableSlot';
import CustomCheckbox from './CustomCheckbox';

export default function CreativeLibrary({ state, onChange }) {
    // Deserialize or fallback to default creative rows
    const creatives = state.creative_library || [
        { id: 1, name: 'HFL_TOFU_DealHook_01', brand: 'H For Less', stage: 'TOFU', angle: 'توفير / Bundle', format: 'UGC / Demo', hook: 'هوك جذاب أول ثانيتين', length: '12s', cta: 'اشترِ الآن', status: 'Live', link: 'https://drive.google.com/...' }
    ];

    const updateRowValue = (id, field, value) => {
        const updated = creatives.map(row => {
            if (row.id === id) {
                return { ...row, [field]: value };
            }
            return row;
        });
        onChange('creative_library', updated);
    };

    const addRow = () => {
        const nextId = creatives.length > 0 ? Math.max(...creatives.map(r => r.id)) + 1 : 1;
        const newRow = {
            id: nextId,
            name: `H_Creative_${nextId}`,
            brand: 'H For Less',
            stage: 'TOFU',
            angle: 'زاوية جديدة',
            format: 'UGC',
            hook: 'أول ثانيتين',
            length: '15s',
            cta: 'اشترِ الآن',
            status: 'Ready',
            link: ''
        };
        onChange('creative_library', [...creatives, newRow]);
    };

    const deleteRow = (id) => {
        const filtered = creatives.filter(row => row.id !== id);
        onChange('creative_library', filtered);
    };

    return (
        <div className="glass-panel">
            <h2 className="panel-title">المكتبة الإبداعية وتنسيق المحتوى</h2>
            <p className="panel-subtitle">إدارة أصول الكرييتف، تقييم جودة الفيديوهات، ومزامنة كتالوج المنتجات.</p>

            <h3 className="section-title">6) خطة التنسيق مع فريق الكرييتف (Sync Details)</h3>
            
            <div className="grid-cols-2">
                <div className="card-item">
                    <h3>🎬 تسليم المحتوى المطلوب (Creative Briefs)</h3>
                    <div className="checklist-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                        <CustomCheckbox id="sync_reels" checked={state.sync_reels} onChange={onChange}>
                            تجهيز 5 فيديوهات ريلز قصيرة (Reels) لكل براند.
                        </CustomCheckbox>
                        <CustomCheckbox id="sync_banners" checked={state.sync_banners} onChange={onChange}>
                            تصميم 3 صور بانر مخصصة للعروض القوية.
                        </CustomCheckbox>
                        <CustomCheckbox id="sync_reviews" checked={state.sync_reviews} onChange={onChange}>
                            إنتاج فيديوهين مراجعة وتقييم (Reviews/UGC).
                        </CustomCheckbox>
                    </div>
                </div>

                <div className="card-item" style={{ borderColor: 'rgba(0, 240, 255, 0.15)' }}>
                    <h3>📐 مواصفات المحتوى الإبداعي الإعلاني</h3>
                    <p style={{ marginTop: '12px' }}>• مقاسات الفيديو: <strong>9:16 (رأسي للجوال)</strong> و <strong>1:1 (مربع)</strong>.</p>
                    <p>• المدة الزمنية المفضلة للفيديو: من <strong>10</strong> إلى <strong>25</strong> ثانية كحد أقصى.</p>
                    <p>• شروط أساسية: ترجمة الحوار كتابياً على الشاشة (Subtitles) + إبراز لوجو البراند.</p>
                </div>
            </div>

            <hr />

            <h3 className="section-title">6.4) مكتبة الكرييتف والموشن (Creative Library)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                أضف وحدث روابط أصول الميديا والموشن الخاصة بالحملات هنا:
            </p>

            <div className="table-wrapper">
                <table className="executive-table">
                    <thead>
                        <tr>
                            <th>اسم الإعلان</th>
                            <th>البراند</th>
                            <th>المرحلة</th>
                            <th>الزاوية</th>
                            <th>الصيغة</th>
                            <th>الهوك (Hook)</th>
                            <th>المدة</th>
                            <th>الـ CTA</th>
                            <th>الحالة</th>
                            <th>رابط الملف / Asset</th>
                            <th>إجراء</th>
                        </tr>
                    </thead>
                    <tbody>
                        {creatives.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input type="text" className="inline-input" value={row.name} onChange={(e) => updateRowValue(row.id, 'name', e.target.value)} />
                                </td>
                                <td>
                                    <input type="text" className="inline-input" value={row.brand} onChange={(e) => updateRowValue(row.id, 'brand', e.target.value)} style={{ width: '80px' }} />
                                </td>
                                <td>
                                    <input type="text" className="inline-input" value={row.stage} onChange={(e) => updateRowValue(row.id, 'stage', e.target.value)} style={{ width: '60px' }} />
                                </td>
                                <td>
                                    <input type="text" className="inline-input" value={row.angle} onChange={(e) => updateRowValue(row.id, 'angle', e.target.value)} />
                                </td>
                                <td>
                                    <input type="text" className="inline-input" value={row.format} onChange={(e) => updateRowValue(row.id, 'format', e.target.value)} style={{ width: '90px' }} />
                                </td>
                                <td>
                                    <input type="text" className="inline-input" value={row.hook} onChange={(e) => updateRowValue(row.id, 'hook', e.target.value)} />
                                </td>
                                <td>
                                    <input type="text" className="inline-input" value={row.length} onChange={(e) => updateRowValue(row.id, 'length', e.target.value)} style={{ width: '50px' }} />
                                </td>
                                <td>
                                    <input type="text" className="inline-input" value={row.cta} onChange={(e) => updateRowValue(row.id, 'cta', e.target.value)} style={{ width: '70px' }} />
                                </td>
                                <td>
                                    <select 
                                        className="inline-input" 
                                        value={row.status} 
                                        onChange={(e) => updateRowValue(row.id, 'status', e.target.value)}
                                        style={{ width: '80px', background: 'var(--bg-space)', border: '1px solid var(--glass-border)' }}
                                    >
                                        <option value="Ready">Ready</option>
                                        <option value="Live">Live</option>
                                        <option value="Killed">Killed</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="text" className="inline-input" value={row.link} onChange={(e) => updateRowValue(row.id, 'link', e.target.value)} placeholder="رابط Drive/Figma" />
                                </td>
                                <td>
                                    <button 
                                        className="btn btn-danger" 
                                        style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: '6px' }}
                                        onClick={() => deleteRow(row.id)}
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ textAlign: 'left', marginBottom: '24px' }}>
                <button className="btn btn-primary" onClick={addRow}>
                    ➕ إضافة إعلان جديد للمكتبة
                </button>
            </div>

            <h3 className="section-title">20) تقييم جودة الكرييتف (Creative Scorecard)</h3>
            <div className="grid-cols-2">
                <div className="card-item">
                    <h3>📋 معايير تقييم الفيديو (Video Quality Check)</h3>
                    <p style={{ marginTop: '8px' }}>• Hook أول ثانيتين: هل هو جاذب بصرياً وصوتياً؟</p>
                    <p>• الرسالة والفوائد: هل هي واضحة للجمهور المستهدف؟</p>
                    <p>• الجودة واللوجو: هل اللوجو واضح بجميع لقطات الفيديو؟</p>
                    <p>• الـ CTA في النهاية: هل يدعو صراحة للشراء مع إبراز كود الخصم؟</p>
                </div>
                
                <div className="card-item" style={{ borderLeft: '4px solid var(--neon-green)' }}>
                    <h3>📦 كتالوج المنتجات DPA (Catalog Setup)</h3>
                    <p style={{ marginTop: '8px' }}>• حالة الكتالوج بالمنصة: <strong><EditableSlot id="dpa_catalog_status" placeholder="جاهز للاستخدام / قيد الضبط" value={state.dpa_catalog_status} onChange={onChange} /></strong></p>
                    <p>• مصدر الكتالوج: <strong><EditableSlot id="dpa_catalog_source" placeholder="Shopify XML feed / Meta Pixel" value={state.dpa_catalog_source} onChange={onChange} /></strong></p>
                    <p>• مجموعات المنتجات النشطة: <strong><EditableSlot id="dpa_active_sets" placeholder="كل المنتجات / مجموعات التوفير" value={state.dpa_active_sets} onChange={onChange} /></strong></p>
                </div>
            </div>
        </div>
    );
}
