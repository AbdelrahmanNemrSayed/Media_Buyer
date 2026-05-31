import { memo } from 'react';

function UserGuideModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const guideSections = [
        {
            title: '1) الملخص التنفيذي وملف البراند (Executive Summary)',
            icon: '📝',
            borderColor: 'rgba(0, 82, 255, 0.25)',
            items: [
                {
                    name: 'اسم البراند، الأهداف، القنوات الأساسية',
                    source: 'من العميل مباشرة (مكالمة الـ Brief أو نموذج الأسئلة)',
                    path: 'سؤال العميل: ما هي المنصات النشطة لديكم؟ ما هو الميزانية المتوقعة؟ وما هو العميل المثالي؟'
                },
                {
                    name: 'المنتجات البطلة (Hero SKUs)',
                    source: 'لوحة تحكم المتجر (Shopify / Salla / WooCommerce)',
                    path: 'المتجر > التقارير (Analytics) > المنتجات الأعلى مبيعاً (Best Selling Products) في آخر 90 يوم.'
                },
                {
                    name: 'شروط الشحن والدفع عند الاستلام (COD)',
                    source: 'متجر العميل مباشرة (صفحة الشحن أو صفحة الدفع)',
                    path: 'أو بسؤال العميل: ما هي شركات الشحن؟ كم يستغرق التوصيل؟ وهل تفضلون الدفع عند الاستلام؟'
                }
            ]
        },
        {
            title: '2) الأهداف والميزانيات التفاعلية (Objectives & Calculator)',
            icon: '📊',
            borderColor: 'rgba(16, 185, 129, 0.25)',
            items: [
                {
                    name: 'متوسط قيمة السلة (AOV)',
                    source: 'لوحة تحكم متجر العميل (Analytics)',
                    path: 'شوبيفاي/سلة > الإحصائيات > متوسط قيمة الطلب (Average Order Value) لآخر 30-90 يوم.'
                },
                {
                    name: 'معدل التحويل المتوقع للموقع (CR)',
                    source: 'لوحة تحكم متجر العميل (Analytics)',
                    path: 'شوبيفاي/سلة > الإحصائيات > معدل تحويل المتجر (Online Store Conversion Rate) - يتراوح عادة بين 1% إلى 3%.'
                },
                {
                    name: 'هامش الربح (Profit Margin)',
                    source: 'سؤال العميل مباشرة وعمل دراسة جدوى مبسطة',
                    path: 'المعادلة: (سعر بيع المنتج - سعر التكلفة شامل الشحن والتغليف والـ COD) ÷ سعر البيع.'
                },
                {
                    name: 'الميزانية الكلية والمستهدفات',
                    source: 'الاتفاق المالي مع إدارة العميل قبل بدء الشهر الجديد',
                    path: 'سؤال العميل: ما هو الرقم الإجمالي المسموح بصرفه إعلانياً هذا الشهر؟'
                }
            ]
        },
        {
            title: '3) الجمهور والرسالة التسويقية (Audience & Messaging)',
            icon: '🧲',
            borderColor: 'rgba(245, 158, 11, 0.25)',
            items: [
                {
                    name: 'نقاط الألم والمخاوف (Pain Points)',
                    source: 'أبحاث السوق (Market Research) ومراجعة المنافسين',
                    path: '1. قراءة التقييمات السلبية (1-3 نجوم) لمنتجات المنافسين على أماكن البيع لمعرفة مشاكل العملاء. 2. تعليقات تيك توك وإنستغرام للمنافسين.'
                },
                {
                    name: 'الجمهور المستهدف والاهتمامات (Interests)',
                    source: 'مدير الإعلانات (Meta / TikTok Ads Manager)',
                    path: '1. البحث في خانة الاهتمامات (Detailed Targeting) في مدير الإعلانات. 2. ميزة الروبوت المدمج أو أبحاث Google Trends لمعرفة الكلمات الرائجة.'
                }
            ]
        },
        {
            title: '4) استراتيجية القمع وتوزيع الميزانيات (Funnel & Splitter)',
            icon: '🔽',
            borderColor: 'rgba(139, 92, 246, 0.25)',
            items: [
                {
                    name: 'توزيع ميزانية القمع (TOFU / MOFU / BOFU)',
                    source: 'خبرتك الإعلانية والممارسات الفضلى لإدارة الحسابات',
                    path: 'القاعدة الذهبية: خصص 60-70% للجمهور البارد الجديد (TOFU)، و 20% للجمهور الدافئ والتفاعل (MOFU)، و 10% لإعادة استهداف زوار السلة شبه المشترين (BOFU).'
                }
            ]
        },
        {
            title: '5) سحب التقارير التلقائي (Reports Parser)',
            icon: '⚡',
            borderColor: 'rgba(239, 68, 68, 0.25)',
            items: [
                {
                    name: 'بيانات الصرف، المبيعات الفعالة، والـ ROAS الفعلي',
                    source: 'مدير الإعلانات النشط (Meta / TikTok / Google Ads)',
                    path: '1. ادخل لحسابك الإعلاني. 2. حدد الفترة الزمنية. 3. اضغط "تصدير كملف CSV" أو ببساطة ظلل جدول الحملات واضغط نسخ (Ctrl+C)، ثم الصقه في صفحة "سحب التقارير" بالموقع لتعبئة الخانات فوراً!'
                }
            ]
        },
        {
            title: '6) قواعد القرار والتحكم (Decision Rules)',
            icon: '🛡️',
            borderColor: 'rgba(6, 182, 212, 0.25)',
            items: [
                {
                    name: 'قواعد إيقاف وزيادة ميزانية الإعلانات',
                    source: 'استراتيجية إدارة المخاطر والأمان (Risk Management)',
                    path: 'القاعدة: إذا صرف الإعلان ما يعادل (3 أضعاف الـ CPA المستهدف) ولم يحقق أي مبيعة، يتم إيقافه تلقائياً لمنع نزيف الميزانية.'
                }
            ]
        }
    ];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '2rem' }}>📖</span>
                        <div>
                            <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 800 }}>الدليل الإرشادي ومصادر البيانات العملي</h2>
                            <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>مرجع سريع يوضح لك من أين تجلب كل قيمة وخانة يحتاجها الموقع في الواقع العملي.</p>
                        </div>
                    </div>
                    <button className="btn btn-secondary" onClick={onClose} style={{ padding: '10px 16px', borderRadius: '30px' }}>✕ إغلاق الدليل</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {guideSections.map((sec, idx) => (
                        <div key={idx} className="card-item" style={{ borderColor: sec.borderColor, borderLeft: `4px solid ${sec.borderColor.replace('0.25', '1')}`, padding: '20px' }}>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span>{sec.icon}</span> {sec.title}
                            </h3>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {sec.items.map((item, itemIdx) => (
                                    <div key={itemIdx} style={{ background: 'rgba(0,0,0,0.15)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                                        <div style={{ fontWeight: 700, color: 'var(--neon-cyan)', fontSize: '0.9rem', marginBottom: '6px' }}>
                                            🔹 {item.name}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                                            <strong>المصدر:</strong> {item.source}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                                            <strong>المسار الفعلي:</strong> {item.path}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="callout callout-blue" style={{ marginTop: '28px', textAlign: 'center', padding: '20px' }}>
                    <span className="callout-icon">💡</span>
                    <div className="callout-content" style={{ textAlign: 'right' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>نصيحة ذهبية من ميديا باير خبير:</h4>
                        <p style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                            احتفظ دوماً بنسخ احتياطية من خططك عبر زر **"نسخة احتياطية"** في الأعلى بصيغة ملف JSON. إذا أردت استكمال العمل على جهاز آخر، قم برفع نفس الملف عبر زر **"استيراد"** وسيسترجع الموقع كافة أرقامك وتوقيتات الحفظ فوراً دون أي نقص!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(UserGuideModal);
