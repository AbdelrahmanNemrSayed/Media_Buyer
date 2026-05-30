import { memo } from 'react';

function UserGuideModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', maxHeight: '85vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem' }}>💡 دليل الاستخدام (كيف تبني خطتك؟)</h2>
                    <button className="btn btn-secondary" onClick={onClose} style={{ padding: '8px 12px' }}>✕ إغلاق</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="card-item" style={{ borderColor: 'rgba(0, 82, 255, 0.2)' }}>
                        <h3 style={{ color: 'var(--primary-color)' }}>1. أهداف الحملة (Objectives) 🎯</h3>
                        <p><strong>من أين تحصل على الميزانية؟</strong></p>
                        <p>يتم تحديدها بالاتفاق مع العميل بناءً على أهدافه (مبيعات، تجميع بيانات، زيادة وعي). قم بتوزيع الميزانية على المنصات (Meta, TikTok, Google) بناءً على أين يتواجد جمهورك المستهدف أكثر.</p>
                    </div>

                    <div className="card-item" style={{ borderColor: 'rgba(245, 158, 11, 0.2)' }}>
                        <h3 style={{ color: 'var(--neon-green)' }}>2. استراتيجية القمع البيعي (Funnel Strategy) 🚀</h3>
                        <p><strong>كيف أوزع الحملات؟</strong></p>
                        <ul>
                            <li style={{ marginBottom: '8px' }}><strong>TOFU (جمهور جديد):</strong> خصص لها الميزانية الأكبر (60-70%) لجلب عملاء جدد.</li>
                            <li style={{ marginBottom: '8px' }}><strong>MOFU (متفاعلون):</strong> خصص (20-30%) لإعادة استهداف من تفاعلوا مع إعلاناتك.</li>
                            <li><strong>BOFU (شبه مشترين):</strong> خصص (10%) لمن أضافوا للسلة ولم يشتروا (Retargeting/DPA).</li>
                        </ul>
                    </div>

                    <div className="card-item" style={{ borderColor: 'rgba(139, 92, 246, 0.2)' }}>
                        <h3 style={{ color: 'var(--purple)' }}>3. الجمهور والرسالة (Audience &amp; Messaging) 👥</h3>
                        <p><strong>من أين أحصل على الجمهور؟</strong></p>
                        <p>الجمهور الـ Cold يحدد بناءً على اهتمامات المنتج (Interests/Broad). أما الجمهور الـ Warm والـ Hot فتحصل عليه من خلال بيانات البيكسل (Pixel) في حسابك الإعلاني (مثل زوار الموقع آخر 30 يوم).</p>
                    </div>

                    <div className="card-item" style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                        <h3 style={{ color: 'var(--red)' }}>4. مؤشرات الأداء والقواعد (KPIs &amp; Rules) 📊</h3>
                        <p><strong>من أين تأتي بهذه الأرقام (CPA, CTR, ROAS)؟</strong></p>
                        <p>تستخرج هذه الأرقام من بيانات الحملات السابقة للعميل. إذا كان المشروع جديداً، استند إلى متوسطات السوق لمجال العمل. هذه الأرقام هي معيارك لإيقاف أو زيادة ميزانية الإعلان.</p>
                    </div>

                    <div className="card-item" style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                        <h3 style={{ color: 'var(--text-primary)' }}>5. المكتبة الإبداعية (Creative Library) 🎨</h3>
                        <p><strong>من أين أحصل على الفيديوهات/الصور؟</strong></p>
                        <p>روابط جوجل درايف يزودك بها فريق المونتاج (Video Editors) والـ Copywriters. دورك هو تقييم &quot;الخطاف - Hook&quot; واختيار أفضل الإعلانات وتصنيفها بناءً على زاوية البيع.</p>
                    </div>
                </div>

                <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>💡 تلميح: يمكنك تصدير الخطة كملف وحفظها على جهازك للمستقبل باستخدام زر &quot;تصدير الخطة&quot; في الأعلى.</p>
                </div>
            </div>
        </div>
    );
}

export default memo(UserGuideModal);
