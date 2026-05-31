import{r as x,j as e}from"./index-rzadLqYF.js";import{E as r}from"./EditableSlot-6s-TpTly.js";function h({state:i,onChange:a}){const[c,d]=x.useState(null),o=i.ai_product||"[اسم المنتج]",s=i.ai_audience||"[الجمهور المستهدف]",n=i.ai_angle||"[زاوية البيع]",p=[{title:"🎥 أمر كتابة سكريبت فيديو إعلاني (Video Script)",content:`أنت خبير تسويق رقمي وكتابة إعلانات (Direct Response Copywriter). 
أريدك أن تكتب لي سكريبت فيديو إعلاني مدته 30 ثانية لمنتج: ${o}.
الجمهور المستهدف هو: ${s}.
زاوية البيع الأساسية التي نركز عليها هي: ${n}.

يجب أن يكون السكريبت مقسماً كالتالي:
1. Hook (أول 3 ثواني): خطاف بصري ولفظي يجذب الانتباه فوراً ويعالج مشكلة الجمهور.
2. Body (15 ثانية): شرح كيف يحل المنتج المشكلة مع التركيز على الفوائد (Benefits) وليس الميزات فقط.
3. Social Proof (5 ثواني): دليل اجتماعي سريع للثقة.
4. CTA (أخر 5 ثواني): دعوة واضحة وقوية لاتخاذ إجراء.

قدم الوصف البصري (ما يظهر في الشاشة) والوصف الصوتي (ما يقوله المعلق/الممثل) في جدول.`},{title:"✍️ أمر كتابة نصوص إعلانية (Ad Copy)",content:`أنت خبير في كتابة إعلانات فيسبوك وإنستغرام عالية التحويل.
اكتب لي 3 نصوص إعلانية (Ad Copies) مختلفة لمنتج: ${o} يستهدف ${s} بناءً على زاوية: ${n}.

أريد النصوص بالأساليب التالية:
1. إعلان طويل (Storytelling): يروي قصة سريعة عن المشكلة وكيف حلها المنتج.
2. إعلان قصير (Punchy & Direct): مباشر يركز على العرض والحل في 3 أسطر فقط.
3. إعلان يعتمد على التساؤل (Question based): يبدأ بسؤال يستفز ألم العميل ثم يطرح المنتج كحل.

استخدم الإيموجيز بشكل احترافي وغير مبالغ فيه، واختم كل نص بـ Call to Action واضح.`},{title:"🎯 أمر استخراج زوايا بيعية جديدة (New Angles)",content:`أنا أبيع منتج: ${o} للجمهور: ${s}.
حتى الآن كنت أركز على زاوية: ${n} ولكنني أريد اختبار زوايا جديدة تماماً لتوسيع الاستهداف.

كمسوق عبقري، قم بعصف ذهني (Brainstorming) وأعطني 5 زوايا بيعية (Marketing Angles) مبتكرة وغير تقليدية لم يفكر فيها منافسي. 
لكل زاوية:
- اعطني اسماً للزاوية.
- اشرح لماذا ستنجح بسيكولوجية العميل (Psychology).
- اكتب لي "خطاف" (Hook) مثالي يمكن استخدامه كأول جملة في الإعلان لتطبيق هذه الزاوية.`}],m=(t,l)=>{navigator.clipboard.writeText(t),d(l),setTimeout(()=>d(null),2e3)};return e.jsxs("div",{className:"glass-panel",children:[e.jsx("h2",{className:"panel-title",children:"🤖 مساعد الذكاء الاصطناعي (AI Prompt Generator)"}),e.jsx("p",{className:"panel-subtitle",children:"أدخل تفاصيل منتجك وسيقوم النظام بتوليد أوامر احترافية جاهزة للنسخ لاستخدامها في ChatGPT أو Claude."}),e.jsxs("div",{className:"grid-cols-3",style:{marginTop:"20px"},children:[e.jsxs("div",{className:"card-item",children:[e.jsx("label",{style:{display:"block",fontSize:"0.9rem",marginBottom:"6px"},children:"اسم المنتج / الخدمة"}),e.jsx(r,{id:"ai_product",placeholder:"مثال: مكنسة لاسلكية ذكية",value:i.ai_product,onChange:a})]}),e.jsxs("div",{className:"card-item",children:[e.jsx("label",{style:{display:"block",fontSize:"0.9rem",marginBottom:"6px"},children:"الجمهور المستهدف"}),e.jsx(r,{id:"ai_audience",placeholder:"مثال: الأمهات العاملات",value:i.ai_audience,onChange:a})]}),e.jsxs("div",{className:"card-item",children:[e.jsx("label",{style:{display:"block",fontSize:"0.9rem",marginBottom:"6px"},children:"زاوية البيع الأساسية"}),e.jsx(r,{id:"ai_angle",placeholder:"مثال: توفير الوقت والجهد",value:i.ai_angle,onChange:a})]})]}),e.jsx("div",{style:{marginTop:"24px",display:"flex",flexDirection:"column",gap:"16px"},children:p.map((t,l)=>e.jsxs("div",{className:"card-item",style:{position:"relative",paddingRight:"20px"},children:[e.jsx("h3",{style:{color:"var(--primary-color)",marginBottom:"12px"},children:t.title}),e.jsx("div",{style:{background:"rgba(0,0,0,0.3)",padding:"16px",borderRadius:"8px",border:"1px solid rgba(255,255,255,0.1)",whiteSpace:"pre-wrap",fontSize:"0.9rem",color:"var(--text-secondary)",lineHeight:"1.6"},children:t.content}),e.jsx("button",{className:`btn ${c===l?"btn-primary":"btn-secondary"}`,style:{position:"absolute",top:"16px",left:"16px",padding:"6px 12px",fontSize:"0.85rem"},onClick:()=>m(t.content,l),children:c===l?"✅ تم النسخ":"📋 نسخ الأمر"})]},l))})]})}export{h as default};
