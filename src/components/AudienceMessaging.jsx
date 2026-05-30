import EditableSlot from './EditableSlot';

export default function AudienceMessaging({ state, onChange }) {
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
        </div>
    );
}
