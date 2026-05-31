export default function ProToolsGuide() {
    return (
        <div className="glass-panel" style={{ padding: '24px' }}>
            <h2 className="panel-title">🧰 ترسانة الميديا باير (Pro Tools Guide)</h2>
            <p className="panel-subtitle">دليلك الشامل لأقوى الأدوات الخارجية التي يستخدمها كبار الميديا بايرز لرفع جودة العمل وإبهار العملاء.</p>

            <div style={{ display: 'grid', gap: '24px', marginTop: '24px' }}>
                
                {/* 1. قسم أدوات التتبع المتقدمة */}
                <div className="card-item" style={{ borderLeft: '4px solid var(--primary-color)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--primary-color)' }}>
                        <span style={{ marginRight: '8px' }}>🎯</span> أدوات التتبع وتحليل البيانات
                    </h3>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>1. Google Tag Manager (GTM) & GA4</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>
                            أدوات جوجل الأساسية والمجانية لإدارة بيكسلات التتبع وتحليل رحلة العميل بالتفصيل.
                        </p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>2. Microsoft Clarity / Hotjar</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>
                            لتسجيل شاشة الزوار بالفيديو وعمل خرائط حرارية (Heatmaps) لاكتشاف لماذا يخرج الزوار دون شراء.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>3. Triple Whale / Hyros / Northbeam</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>
                            أدوات مدفوعة وباهظة الثمن (تستخدم للعملاء الكبار في الإي كوميرس) تحل مشكلة تتبع (iOS 14) وتخبرك بالضبط أي إعلان جلب المبيعة بدقة 100%.
                        </p>
                    </div>
                </div>

                {/* 2. قسم التقارير والتواصل */}
                <div className="card-item" style={{ borderLeft: '4px solid var(--purple)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--purple)' }}>
                        <span style={{ marginRight: '8px' }}>📈</span> أدوات التقارير والظهور الاحترافي
                    </h3>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>1. Loom</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>
                            لتسجيل شاشتك مع صورتك والصوت. <strong style={{ color: 'var(--neon-green)' }}>الاستخدام:</strong> سجل فيديوهات قصيرة أسبوعية تشرح للعميل أداء الحملات بدلاً من الرسائل النصية الطويلة.
                        </p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>2. Looker Studio (Google Data Studio)</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>
                            لإنشاء Dashboards احترافية تشاركها مع العميل ليرى الأرقام تتحدث تلقائياً.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>3. Supermetrics / Porter Metrics</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>
                            إضافات تُستخدم لربط (Facebook Ads, TikTok Ads, Snapchat) بـ Looker Studio أو Google Sheets لسحب الأرقام يومياً بشكل آلي (Automation).
                        </p>
                    </div>
                </div>

                {/* 3. قسم الكرييتف والتجسس */}
                <div className="card-item" style={{ borderLeft: '4px solid var(--red)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--red)' }}>
                        <span style={{ marginRight: '8px' }}>🎬</span> أدوات الكرييتف ومراقبة المنافسين
                    </h3>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>1. Foreplay.co / SwipeWell</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>
                            إضافة متصفح تتيح لك حفظ أي إعلان ناجح تراه على فيسبوك أو تيك توك للأبد، وتجميعه في لوحات ليكون مرجعاً للمصممين.
                        </p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>2. Facebook Ads Library & TikTok Creative Center</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>
                            الأدوات الرسمية المجانية لمعرفة ماذا يطلق المنافسون، ومعرفة أحدث التريندات والأغاني الرائجة حالياً للإعلانات.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>3. Canva Pro / Figma</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>
                            أدوات أساسية لعمل تعديلات سريعة على الإعلانات (مثل إضافة شريط أحمر للخصم) دون انتظار فريق التصميم، أو لرسم هيكل صفحة الهبوط (Wireframing).
                        </p>
                    </div>
                </div>

                {/* 4. قسم الإدارة والأتمتة */}
                <div className="card-item" style={{ borderLeft: '4px solid #f59e0b' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#f59e0b' }}>
                        <span style={{ marginRight: '8px' }}>🤖</span> الأتمتة وإدارة مشاريع العملاء
                    </h3>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>1. Zapier / Make.com</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>
                            لربط الأنظمة. <strong style={{ color: 'var(--neon-green)' }}>الاستخدام:</strong> إذا جاء عميل محتمل (Lead) من إعلانات فيسبوك، يقوم بإرساله فوراً في رسالة واتساب إلى مسؤول المبيعات ليتصل به في غضون 5 دقائق.
                        </p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>2. Notion / ClickUp</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>
                            لإدارة المهام وإنشاء (Client Portal). مكان واحد يرى فيه العميل العقود، الفواتير، خطة الإعلانات الشهرية، والروابط الهامة.
                        </p>
                    </div>
                </div>

                {/* 5. قسم الذكاء الاصطناعي ورفع العائد */}
                <div className="card-item" style={{ borderLeft: '4px solid #10b981' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#10b981' }}>
                        <span style={{ marginRight: '8px' }}>🧠</span> الذكاء الاصطناعي ورفع العائد (ROAS)
                    </h3>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>1. ChatGPT Plus / Claude 3</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>
                            للعصف الذهني لاكتشاف ألم العميل (Pain Points)، كتابة نصوص إعلانية (Ad Copies)، وبناء إسكريبتات لفيديوهات الـ UGC.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>2. Klaviyo / ActiveCampaign</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>
                            كميديا باير محترف، يجب أن تنصح عملاء الإي كوميرس باستخدام التسويق بالإيميل لاسترجاع &quot;السلات المتروكة&quot; مجاناً، مما يرفع إجمالي الـ ROAS بشكل مرعب.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
