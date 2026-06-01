import { useState } from 'react';
import EditableSlot from './EditableSlot';

export default function AudienceMessaging({ state, onChange }) {
    const [hookProd, setHookProd] = useState('حذاء مشي طبي مريح');
    const [hookPain, setHookPain] = useState('آلام الظهر والقدمين أثناء الوقوف والمشي الطويل');
    const [hookUsp, setHookUsp] = useState('وسائد امتصاص صدمات سداسية وفرش سيليكوني داعم');
    const [copiedId, setCopiedId] = useState('');

    const handleCopyCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(''), 2000);
    };

    return (
        <div className="glass-panel">
            <h2 className="panel-title">الجمهور والرسالة الإعلانية</h2>
            <p className="panel-subtitle">حدد شرائح الجمهور المستهدفة، زوايا البيع المقنعة، وصيغ العروض الإبداعية.</p>

            <h3 className="section-title">3) الجمهور والرسالة (Audience &amp; Messaging)</h3>
            
            <div className="grid-cols-3">
                <div className="card-item" style={{ borderColor: 'rgba(0, 82, 255, 0.15)' }}>
                    <h3>🧊 Cold Audience (جمهور جديد)</h3>
                    <p style={{ marginTop: '12px' }}>
                        • الفئة المستهدفة: ناس أول مرة تتعرف على البراند تماماً.
                    </p>
                    <p>
                        • الاستهداف الأساسي: <EditableSlot id="cold_targeting" placeholder="Broad / Interests / Lookalike" value={state.cold_targeting} onChange={onChange} />
                    </p>
                    <p>
                        • الرسالة المقنعة: <EditableSlot id="cold_message" placeholder="وصف سريع لزاوية الجذب الأقوى" value={state.cold_message} onChange={onChange} />
                    </p>
                </div>

                <div className="card-item" style={{ borderColor: 'rgba(245, 158, 11, 0.15)' }}>
                    <h3>🔥 Warm Audience (متفاعلون سابقون)</h3>
                    <p style={{ marginTop: '12px' }}>
                        • الفئة المستهدفة: زوار الموقع أو متفاعلين الحسابات الاجتماعية.
                    </p>
                    <p>
                        • الاستهداف الأساسي: <EditableSlot id="warm_targeting" placeholder="زوار 30 يوم / متفاعلو إنستغرام" value={state.warm_targeting} onChange={onChange} />
                    </p>
                    <p>
                        • الرسالة المقنعة: <EditableSlot id="warm_message" placeholder="إبراز الفوائد والآراء الموثوقة" value={state.warm_message} onChange={onChange} />
                    </p>
                </div>

                <div className="card-item" style={{ borderColor: 'rgba(16, 185, 129, 0.15)' }}>
                    <h3>⚡ Hot Audience (جاهزون للشراء)</h3>
                    <p style={{ marginTop: '12px' }}>
                        • الفئة المستهدفة: من أضاف للسلة ولم يكمل أو بدأ إجراءات الدفع.
                    </p>
                    <p>
                        • الاستهداف الأساسي: <EditableSlot id="hot_targeting" placeholder="أضاف للسلة ATC 14D" value={state.hot_targeting} onChange={onChange} />
                    </p>
                    <p>
                        • الرسالة المقنعة: <EditableSlot id="hot_message" placeholder="عروض حصرية وحل مشكلة الشحن" value={state.hot_message} onChange={onChange} />
                    </p>
                </div>
            </div>

            <h3 className="section-title">3.2 زوايا البيع المقترحة (Angles)</h3>
            <div className="checklist-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p>💡 <strong>الزاوية 1 (الجاذبية المالية):</strong> <EditableSlot id="angle_fin" placeholder="مثال: سعر منافس / خصم باقات التوفير" value={state.angle_fin} onChange={onChange} /></p>
                <p>💡 <strong>الزاوية 2 (الجودة والنتائج):</strong> <EditableSlot id="angle_qual" placeholder="مثال: خامة تدوم طويلاً / استبدال سهل ومريح" value={state.angle_qual} onChange={onChange} /></p>
                <p>💡 <strong>الزاوية 3 (الراحة والسرعة):</strong> <EditableSlot id="angle_speed" placeholder="مثال: شحن سريع للرياض وجدة / دفع عند الاستلام" value={state.angle_speed} onChange={onChange} /></p>
            </div>

            <h3 className="section-title">3.3 العروض الفعالة (Offers)</h3>
            <div className="grid-cols-2">
                <div className="card-item">
                    <h3>🎁 العرض الرئيسي المستهدف</h3>
                    <p style={{ marginTop: '8px' }}>• نوع العرض: <strong><EditableSlot id="offer_type" placeholder="باقة Bundles / خصم مباشر % / شحن مجاني" value={state.offer_type} onChange={onChange} /></strong></p>
                    <p>• شروط وتفاصيل الاستحقاق: <strong><EditableSlot id="offer_terms" placeholder="حد أدنى 200 ريال / استخدام كود خصم" value={state.offer_terms} onChange={onChange} /></strong></p>
                </div>
                
                <div className="card-item">
                    <h3>💬 صياغة الرسائل الجاهزة (Message House)</h3>
                    <p style={{ marginTop: '8px' }}>• العنوان الجاذب: <strong><EditableSlot id="mh_headline" placeholder="وعد قوي أو حل للمشكلة" value={state.mh_headline} onChange={onChange} /></strong></p>
                    <p>• الإثبات المالي/الاجتماعي: <strong><EditableSlot id="mh_proof" placeholder="آراء 500+ عميل سعيد / ضمان استبدال" value={state.mh_proof} onChange={onChange} /></strong></p>
                </div>
            </div>

            <hr />

            <h3 className="section-title">3.4) “وصفات” TOFU لكل براند (TOFU Recipes)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                الوصفات الإبداعية للوصول للجمهور البارد (Top of Funnel) لكل براند تشغيلي:
            </p>

            <div className="grid-cols-2">
                <div className="card-item" style={{ background: 'rgba(255,255,255,0.01)', borderStyle: 'dashed' }}>
                    <h3 style={{ color: 'var(--neon-cyan)', borderBottomColor: 'var(--neon-cyan)' }}>🏠 H For Less — TOFU</h3>
                    <p style={{ marginTop: '12px' }}><strong>• زوايا الجذب الجاهزة:</strong></p>
                    <p>• حلول عملية ومباشرة للبيت: <EditableSlot id="hfl_tofu_angles" placeholder="Problem/Solution للترتيب والتنظيم" value={state.hfl_tofu_angles} onChange={onChange} /></p>
                    
                    <p style={{ marginTop: '8px' }}><strong>• صيغ الكرييتف المطبقة:</strong></p>
                    <p>• مقارنات مباشرة وعروض باقات: <EditableSlot id="hfl_tofu_formats" placeholder="فيديو UGC + استعراض الحجم والتوفير" value={state.hfl_tofu_formats} onChange={onChange} /></p>
                    
                    <p style={{ marginTop: '8px' }}><strong>• رابط الهبوط المستهدف:</strong></p>
                    <p>• صفحة المنتجات الأكثر مبيعاً: <EditableSlot id="hfl_tofu_landing" placeholder="أقسام العروض / Best Sellers" value={state.hfl_tofu_landing} onChange={onChange} /></p>
                </div>

                <div className="card-item" style={{ background: 'rgba(255,255,255,0.01)', borderStyle: 'dashed' }}>
                    <h3 style={{ color: 'var(--neon-crimson)', borderBottomColor: 'var(--neon-crimson)' }}>👗 H Brand — TOFU</h3>
                    <p style={{ marginTop: '12px' }}><strong>• زوايا الجذب الجاهزة:</strong></p>
                    <p>• ستايلات وتنسيقات ملابس للمواسم: <EditableSlot id="hb_tofu_angles" placeholder="Outfit Ideas + لوكات للمناسبات" value={state.hb_tofu_angles} onChange={onChange} /></p>
                    
                    <p style={{ marginTop: '8px' }}><strong>• صيغ الكرييتف المطبقة:</strong></p>
                    <p>• فيديوهات قياس واستعراض الخامة: <EditableSlot id="hb_tofu_formats" placeholder="Try-on Haul + انتقالات موشن جذابة" value={state.hb_tofu_formats} onChange={onChange} /></p>
                    
                    <p style={{ marginTop: '8px' }}><strong>• رابط الهبوط المستهدف:</strong></p>
                    <p>• صفحة التشكيلات الجديدة والترند: <EditableSlot id="hb_tofu_landing" placeholder="New In / Best Sellers" value={state.hb_tofu_landing} onChange={onChange} /></p>
                </div>
            </div>

            {/* 3.5 مولد زوايا الكرييتف التلقائي (Creative Hook Generator) */}
            <hr />
            <h3 className="section-title">3.5 🪄 مولد زوايا الكرييتف وحطافات الإعلانات الذكي (Creative Hook Generator)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                أدخل مواصفات منتجك والمشكلة التي يحلها، وسيقوم النظام بتصميم 3 صيغ إعلانية متكاملة (خطاف + نص إقناعي + زر دعوة) جاهزة للنسخ والاستخدام:
            </p>

            <div className="card-item" style={{ borderColor: 'var(--neon-cyan)', background: 'rgba(0, 240, 255, 0.01)', marginBottom: '24px' }}>
                <div className="grid-cols-3" style={{ gap: '16px' }}>
                    <div>
                        <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', fontWeight: '600' }}>🛍️ اسم المنتج / الخدمة:</label>
                        <input 
                            type="text" 
                            className="budget-input-field" 
                            style={{ width: '100%', padding: '8px 12px', fontSize: '0.85rem', height: '36px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '8px' }}
                            placeholder="مثال: حذاء مشي طبي" 
                            value={hookProd}
                            onChange={(e) => setHookProd(e.target.value)}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', fontWeight: '600' }}>🚨 نقطة الألم / المشكلة الكبرى للعميل:</label>
                        <input 
                            type="text" 
                            className="budget-input-field" 
                            style={{ width: '100%', padding: '8px 12px', fontSize: '0.85rem', height: '36px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '8px' }}
                            placeholder="مثال: آلام القدمين عند المشي الطويل" 
                            value={hookPain}
                            onChange={(e) => setHookPain(e.target.value)}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', fontWeight: '600' }}>💎 الميزة التنافسية الكبرى (USP):</label>
                        <input 
                            type="text" 
                            className="budget-input-field" 
                            style={{ width: '100%', padding: '8px 12px', fontSize: '0.85rem', height: '36px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '8px' }}
                            placeholder="مثال: فرش سيليكوني مرن يمتص الصدمات" 
                            value={hookUsp}
                            onChange={(e) => setHookUsp(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid-cols-3" style={{ gap: '20px' }}>
                {/* Option 1 */}
                <div className="card-item" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <span className="benchmark-badge" style={{ backgroundColor: 'rgba(255, 0, 85, 0.05)', color: 'var(--neon-crimson)', borderColor: 'rgba(255, 0, 85, 0.2)', marginBottom: '12px', width: 'fit-content' }}>
                            🚨 زاوية الألم والحل (PAS)
                        </span>
                        <div style={{ marginTop: '10px' }}>
                            <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>🪝 الخطاف البصري (Hook):</strong>
                            <p style={{ fontSize: '0.92rem', fontWeight: '700', margin: '4px 0 12px 0', color: '#ffffff', lineHeight: '1.4' }}>
                                "{hookPain ? `هل تعبت من ${hookPain}؟` : 'هل تعبت من هذه المشكلة المستمرة؟'} 🤔✋"
                            </p>
                        </div>
                        <div>
                            <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>📝 نص الإعلان الإقناعي (Body):</strong>
                            <p style={{ fontSize: '0.88rem', margin: '4px 0 12px 0', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                كل خطوة بتدفع تمنها؟ بلاش تضحي براحتك. مع {hookProd || 'منتجنا الرائد'}، الحل صار بين يديك! بفضل {hookUsp || 'تقنيتنا الفائقة'}، ستشعر بالخفة والنشاط طول اليوم.
                            </p>
                        </div>
                        <div>
                            <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>🎯 زر اتخاذ الإجراء (CTA):</strong>
                            <p style={{ fontSize: '0.88rem', margin: '4px 0', color: 'var(--neon-green)', fontWeight: '600' }}>
                                🛍️ اطلب الآن بخصم 15% والدفع عند الاستلام!
                            </p>
                        </div>
                    </div>
                    <button 
                        className="btn btn-save" 
                        style={{ marginTop: '16px', width: '100%', justifyContent: 'center', height: '36px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                        onClick={() => handleCopyCopy(`🪝 الخطاف: "هل تعبت من ${hookPain}؟ 🤔✋"\n\n📝 النص: كل خطوة بتدفع تمنها؟ بلاش تضحي براحتك. مع ${hookProd}، الحل صار بين يديك! بفضل ${hookUsp}، ستشعر بالخفة والنشاط طول اليوم.\n\n🎯 العرض: 🛍️ اطلب الآن بخصم 15% والدفع عند الاستلام!`, 'copy1')}
                    >
                        {copiedId === 'copy1' ? '✓ تم النسخ بنجاح' : '📋 نسخ الإعلان بالكامل'}
                    </button>
                </div>

                {/* Option 2 */}
                <div className="card-item" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <span className="benchmark-badge" style={{ backgroundColor: 'rgba(0, 82, 255, 0.05)', color: 'var(--neon-blue)', borderColor: 'rgba(0, 82, 255, 0.2)', marginBottom: '12px', width: 'fit-content' }}>
                            🧐 زاوية الفضول والأسئلة
                        </span>
                        <div style={{ marginTop: '10px' }}>
                            <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>🪝 الخطاف البصري (Hook):</strong>
                            <p style={{ fontSize: '0.92rem', fontWeight: '700', margin: '4px 0 12px 0', color: '#ffffff', lineHeight: '1.4' }}>
                                "لماذا يستمر الكثيرون في تحمل {hookPain || 'هذه الآلام المزعجة'}؟ 🧐"
                            </p>
                        </div>
                        <div>
                            <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>📝 نص الإعلان الإقناعي (Body):</strong>
                            <p style={{ fontSize: '0.88rem', margin: '4px 0 12px 0', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                السر مش في المجهود الزايد، السر هو الدعم اللي ناقصك! {hookProd || 'هذا الحل المبتكر'} يغير القواعد تماماً بفضل {hookUsp || 'الميزات الاستثنائية'}. لا تستسلم للتعب بعد اليوم وجرب الفرق بنفسك!
                            </p>
                        </div>
                        <div>
                            <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>🎯 زر اتخاذ الإجراء (CTA):</strong>
                            <p style={{ fontSize: '0.88rem', margin: '4px 0', color: 'var(--neon-green)', fontWeight: '600' }}>
                                🔗 اضغط هنا واكتشف سر الراحة اليومية!
                            </p>
                        </div>
                    </div>
                    <button 
                        className="btn btn-save" 
                        style={{ marginTop: '16px', width: '100%', justifyContent: 'center', height: '36px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                        onClick={() => handleCopyCopy(`🪝 الخطاف: "لماذا يستمر الكثيرون في تحمل ${hookPain}؟ 🧐"\n\n📝 النص: السر مش في المجهود الزايد، السر هو الدعم اللي ناقصك! ${hookProd} يغير القواعد تماماً بفضل ${hookUsp}. لا تستسلم للتعب بعد اليوم وجرب الفرق بنفسك!\n\n🎯 العرض: 🔗 اضغط هنا واكتشف سر الراحة اليومية!`, 'copy2')}
                    >
                        {copiedId === 'copy2' ? '✓ تم النسخ بنجاح' : '📋 نسخ الإعلان بالكامل'}
                    </button>
                </div>

                {/* Option 3 */}
                <div className="card-item" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <span className="benchmark-badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', color: 'var(--neon-green)', borderColor: 'rgba(16, 185, 129, 0.2)', marginBottom: '12px', width: 'fit-content' }}>
                            🛑 زاوية التحدي المباشر
                        </span>
                        <div style={{ marginTop: '10px' }}>
                            <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>🪝 الخطاف البصري (Hook):</strong>
                            <p style={{ fontSize: '0.92rem', fontWeight: '700', margin: '4px 0 12px 0', color: '#ffffff', lineHeight: '1.4' }}>
                                "توقف عن إهمال صحتك والتأقلم مع {hookPain || 'التعب اليومي'}! 🛑🛡️"
                            </p>
                        </div>
                        <div>
                            <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>📝 نص الإعلان الإقناعي (Body):</strong>
                            <p style={{ fontSize: '0.88rem', margin: '4px 0 12px 0', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                صحتك تبدأ من خطوتك الأولى. حان الوقت للاستثمار في {hookProd || 'الحل الطبي الأصلي'} المدعوم بـ {hookUsp || 'تقنيات دعم المفاصل والعظام'}. راحة تدوم طويلاً تليق بك وبنشاطك المستمر.
                            </p>
                        </div>
                        <div>
                            <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>🎯 زر اتخاذ الإجراء (CTA):</strong>
                            <p style={{ fontSize: '0.88rem', margin: '4px 0', color: 'var(--neon-green)', fontWeight: '600' }}>
                                ⚡ احصل على التوصيل السريع والضمان الذهبي 100%!
                            </p>
                        </div>
                    </div>
                    <button 
                        className="btn btn-save" 
                        style={{ marginTop: '16px', width: '100%', justifyContent: 'center', height: '36px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                        onClick={() => handleCopyCopy(`🪝 الخطاف: "توقف عن إهمال صحتك والتأقلم مع ${hookPain}! 🛑🛡️"\n\n📝 النص: صحتك تبدأ من خطوتك الأولى. حان الوقت للاستثمار في ${hookProd} المدعوم بـ ${hookUsp}. راحة تدوم طويلاً تليق بك وبنشاطك المستمر.\n\n🎯 العرض: ⚡ احصل على التوصيل السريع والضمان الذهبي 100%!`, 'copy3')}
                    >
                        {copiedId === 'copy3' ? '✓ تم النسخ بنجاح' : '📋 نسخ الإعلان بالكامل'}
                    </button>
                </div>
            </div>
        </div>
    );
}
