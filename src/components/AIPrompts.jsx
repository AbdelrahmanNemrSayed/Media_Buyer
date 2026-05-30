import { useState } from 'react';
import EditableSlot from './EditableSlot';

export default function AIPrompts({ state, onChange }) {
    const [copiedIndex, setCopiedIndex] = useState(null);

    const product = state.ai_product || '[اسم المنتج]';
    const audience = state.ai_audience || '[الجمهور المستهدف]';
    const angle = state.ai_angle || '[زاوية البيع]';

    const prompts = [
        {
            title: '🎥 أمر كتابة سكريبت فيديو إعلاني (Video Script)',
            content: `أنت خبير تسويق رقمي وكتابة إعلانات (Direct Response Copywriter). 
أريدك أن تكتب لي سكريبت فيديو إعلاني مدته 30 ثانية لمنتج: ${product}.
الجمهور المستهدف هو: ${audience}.
زاوية البيع الأساسية التي نركز عليها هي: ${angle}.

يجب أن يكون السكريبت مقسماً كالتالي:
1. Hook (أول 3 ثواني): خطاف بصري ولفظي يجذب الانتباه فوراً ويعالج مشكلة الجمهور.
2. Body (15 ثانية): شرح كيف يحل المنتج المشكلة مع التركيز على الفوائد (Benefits) وليس الميزات فقط.
3. Social Proof (5 ثواني): دليل اجتماعي سريع للثقة.
4. CTA (أخر 5 ثواني): دعوة واضحة وقوية لاتخاذ إجراء.

قدم الوصف البصري (ما يظهر في الشاشة) والوصف الصوتي (ما يقوله المعلق/الممثل) في جدول.`
        },
        {
            title: '✍️ أمر كتابة نصوص إعلانية (Ad Copy)',
            content: `أنت خبير في كتابة إعلانات فيسبوك وإنستغرام عالية التحويل.
اكتب لي 3 نصوص إعلانية (Ad Copies) مختلفة لمنتج: ${product} يستهدف ${audience} بناءً على زاوية: ${angle}.

أريد النصوص بالأساليب التالية:
1. إعلان طويل (Storytelling): يروي قصة سريعة عن المشكلة وكيف حلها المنتج.
2. إعلان قصير (Punchy & Direct): مباشر يركز على العرض والحل في 3 أسطر فقط.
3. إعلان يعتمد على التساؤل (Question based): يبدأ بسؤال يستفز ألم العميل ثم يطرح المنتج كحل.

استخدم الإيموجيز بشكل احترافي وغير مبالغ فيه، واختم كل نص بـ Call to Action واضح.`
        },
        {
            title: '🎯 أمر استخراج زوايا بيعية جديدة (New Angles)',
            content: `أنا أبيع منتج: ${product} للجمهور: ${audience}.
حتى الآن كنت أركز على زاوية: ${angle} ولكنني أريد اختبار زوايا جديدة تماماً لتوسيع الاستهداف.

كمسوق عبقري، قم بعصف ذهني (Brainstorming) وأعطني 5 زوايا بيعية (Marketing Angles) مبتكرة وغير تقليدية لم يفكر فيها منافسي. 
لكل زاوية:
- اعطني اسماً للزاوية.
- اشرح لماذا ستنجح بسيكولوجية العميل (Psychology).
- اكتب لي "خطاف" (Hook) مثالي يمكن استخدامه كأول جملة في الإعلان لتطبيق هذه الزاوية.`
        }
    ];

    const handleCopy = (text, idx) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="glass-panel">
            <h2 className="panel-title">🤖 مساعد الذكاء الاصطناعي (AI Prompt Generator)</h2>
            <p className="panel-subtitle">أدخل تفاصيل منتجك وسيقوم النظام بتوليد أوامر احترافية جاهزة للنسخ لاستخدامها في ChatGPT أو Claude.</p>

            <div className="grid-cols-3" style={{ marginTop: '20px' }}>
                <div className="card-item">
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>اسم المنتج / الخدمة</label>
                    <EditableSlot id="ai_product" placeholder="مثال: مكنسة لاسلكية ذكية" value={state.ai_product} onChange={onChange} />
                </div>
                <div className="card-item">
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>الجمهور المستهدف</label>
                    <EditableSlot id="ai_audience" placeholder="مثال: الأمهات العاملات" value={state.ai_audience} onChange={onChange} />
                </div>
                <div className="card-item">
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '6px' }}>زاوية البيع الأساسية</label>
                    <EditableSlot id="ai_angle" placeholder="مثال: توفير الوقت والجهد" value={state.ai_angle} onChange={onChange} />
                </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {prompts.map((prompt, idx) => (
                    <div key={idx} className="card-item" style={{ position: 'relative', paddingRight: '20px' }}>
                        <h3 style={{ color: 'var(--primary-color)', marginBottom: '12px' }}>{prompt.title}</h3>
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)', 
                            padding: '16px', 
                            borderRadius: '8px', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            whiteSpace: 'pre-wrap',
                            fontSize: '0.9rem',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.6'
                        }}>
                            {prompt.content}
                        </div>
                        <button 
                            className={`btn ${copiedIndex === idx ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ position: 'absolute', top: '16px', left: '16px', padding: '6px 12px', fontSize: '0.85rem' }}
                            onClick={() => handleCopy(prompt.content, idx)}
                        >
                            {copiedIndex === idx ? '✅ تم النسخ' : '📋 نسخ الأمر'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
