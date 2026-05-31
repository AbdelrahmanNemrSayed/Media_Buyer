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

                {/* 6. قسم استخراج مقاييس المنصات الثلاثة */}
                <div className="card-item" style={{ borderLeft: '4px solid var(--neon-cyan)', gridColumn: 'span 2' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--neon-cyan)' }}>
                        <span style={{ marginRight: '8px' }}>🚀</span> الدليل العملي لاستخراج البيانات من منصات الإعلانات
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: '1.7' }}>
                        لسحب أرقام الميزانيات، الصرف، والمبيعات بشكل صحيح وإدخالها في خطتك، اتبع التخصيص الدقيق لكل منصة:
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                        <div style={{ background: 'rgba(0, 0, 0, 0.15)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)' }}>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '6px' }}>🔵 إعلانات ميتا (Meta Ads)</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: '1.6' }}>
                                1. من مدير الإعلانات، اضغط <strong>Columns: Performance ▼</strong>.<br />
                                2. اختر <strong>Customize Columns</strong>.<br />
                                3. حدد كلاً من:<br />
                                • <strong>Amount Spent</strong> (المصروف)<br />
                                • <strong>Purchases</strong> (المبيعات)<br />
                                • <strong>Cost per Purchase</strong> (تكلفة الطلب CPA)<br />
                                • <strong>Purchase ROAS</strong> (العائد الإعلاني)<br />
                                • <strong>Link CTR</strong> (معدل النقر على الرابط)<br />
                                4. احفظ القالب (Preset) باسم <code>Media Buyer</code> للرجوع له دائماً.
                            </p>
                        </div>

                        <div style={{ background: 'rgba(0, 0, 0, 0.15)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)' }}>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '6px' }}>⚫ إعلانات تيك توك (TikTok Ads)</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: '1.6' }}>
                                1. اذهب لتبويب <strong>Campaign</strong>.<br />
                                2. اضغط زر <strong>Columns &gt; Custom Columns ▼</strong>.<br />
                                3. حدد المقاييس الآتية:<br />
                                • <strong>Cost</strong> (المصروف الإجمالي)<br />
                                • <strong>Complete Payment</strong> (المبيعات الفعالة)<br />
                                • <strong>Cost per Complete Payment</strong> (CPA)<br />
                                • <strong>Complete Payment ROAS</strong> (العائد الإعلاني)<br />
                                • <strong>CTR</strong> (معدل النقر الإجمالي)<br />
                                4. احفظ القالب للتحميل التلقائي يومياً.
                            </p>
                        </div>

                        <div style={{ background: 'rgba(0, 0, 0, 0.15)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)' }}>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '6px' }}>🟡 إعلانات سناب شات (Snapchat Ads)</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: '1.6' }}>
                                1. ادخل لـ <strong>Manage Ads</strong> واضغط <strong>Columns ▼</strong>.<br />
                                2. اختر <strong>Customize Columns</strong>.<br />
                                3. حدد المقاييس من قسم الـ Conversions والـ Spend:<br />
                                • <strong>Spend</strong> (الإنفاق الإجمالي)<br />
                                • <strong>Purchases</strong> (المبيعات)<br />
                                • <strong>Cost per Purchase</strong> (CPA)<br />
                                • <strong>Purchase ROAS</strong> (العائد الإعلاني)<br />
                                • <strong>eCTR</strong> (معدل النقر المتوقع)<br />
                                4. احفظ التنسيق كقالب دائم.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
