import { useState } from 'react';

export default function PerformanceReports({ state, onChange }) {
    const [activeInputTab, setActiveInputTab] = useState('upload'); // 'upload' | 'paste'
    const [pastedText, setPastedText] = useState('');
    const [reportData, setReportData] = useState([]);
    const [fileName, setFileName] = useState('');
    const [selectedTarget, setSelectedTarget] = useState('postmortem'); // 'postmortem' | 'quick' | 'pacing'
    const [successMessage, setSuccessMessage] = useState('');

    const [summaryMetrics, setSummaryMetrics] = useState({
        totalSpend: 0,
        totalPurchases: 0,
        averageCpa: 0,
        averageRoas: 0,
        totalRevenue: 0,
        averageCtr: 0,
        averageCr: 0,
        highestSpendCampaignName: ''
    });

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            processReportText(text);
        };
        reader.readAsText(file);
    };

    const handlePasteSubmit = () => {
        if (!pastedText.trim()) {
            alert('الرجاء لصق محتوى التقرير أولاً.');
            return;
        }
        setFileName('بيانات ملصوقة يدوياً');
        processReportText(pastedText);
    };

    const processReportText = (text) => {
        // Strip UTF-8 BOM if present
        let cleanText = text;
        if (cleanText.startsWith('\ufeff')) {
            cleanText = cleanText.substring(1);
        } else if (cleanText.startsWith('\uFFFD')) {
            cleanText = cleanText.substring(1);
        }

        const lines = cleanText.split(/\r?\n/).map(line => line.trim()).filter(line => line !== '');
        if (lines.length < 2) {
            alert('عذراً، التقرير فارغ أو غير مكتمل.');
            return;
        }

        // Detect default fallback delimiter globally first
        let delimiter = ',';
        const totalCommas = (cleanText.match(/,/g) || []).length;
        const totalTabs = (cleanText.match(/\t/g) || []).length;
        const totalSemicolons = (cleanText.match(/;/g) || []).length;
        if (totalTabs > totalCommas && totalTabs > totalSemicolons) delimiter = '\t';
        else if (totalSemicolons > totalCommas && totalSemicolons > totalTabs) delimiter = ';';

        // Find the best header line in the first 15 lines by scoring occurrences of campaign metrics
        let headerLineIndex = 0;
        let maxScore = -1;
        const scanLimit = Math.min(lines.length, 15);

        for (let i = 0; i < scanLimit; i++) {
            const line = lines[i];
            
            // Detect delimiter for this specific line
            const commas = (line.match(/,/g) || []).length;
            const tabs = (line.match(/\t/g) || []).length;
            const semicolons = (line.match(/;/g) || []).length;
            
            let currentDelim = ',';
            if (tabs > commas && tabs > semicolons) currentDelim = '\t';
            else if (semicolons > commas && semicolons > tabs) currentDelim = ';';

            const fields = line.split(currentDelim).map(f => f.replace(/["']/g, '').toLowerCase().trim());
            
            // Metrics and keywords that define a standard report header
            const kw = ['campaign', 'حملة', 'spend', 'إنفاق', 'cost', 'purchases', 'results', 'leads', 'تحويلات', 'مشتريات', 'roas', 'clicks', 'نقرات', 'impressions', 'ظهور', 'cpr', 'cpa', 'المبلغ المنفق', 'النتائج'];
            
            let score = 0;
            fields.forEach(field => {
                if (kw.some(k => field.includes(k))) {
                    score++;
                }
            });

            if (score > maxScore && score > 0) {
                maxScore = score;
                headerLineIndex = i;
                delimiter = currentDelim;
            }
        }

        const firstLine = lines[headerLineIndex];
        const headers = firstLine.split(delimiter).map(h => h.replace(/["']/g, '').trim());

        const findIndex = (keywords) => {
            return headers.findIndex(h => {
                const headerLower = h.toLowerCase().trim();
                return keywords.some(keyword => {
                    // Check either long-keyword includes short-header, or short-keyword includes long-header
                    // e.g. "campaign name" includes "campaign", or "campaign" includes "campaign"
                    return headerLower.includes(keyword) || keyword.includes(headerLower);
                });
            });
        };

        // Advanced header mapping (covers Facebook, TikTok, Google in EN & AR)
        // Using highly atomic keywords so we can match short headers (like "Campaign") or long headers (like "Campaign Name")
        const campIdx = findIndex(['campaign', 'حملة', 'ad set', 'adset', 'ad', 'إعلان', 'اسم']);
        const spendIdx = findIndex(['spend', 'cost', 'amount', 'إنفاق', 'صرف', 'منفق', 'تكلفة', 'مبلغ']);
        const conversionsIdx = findIndex(['purchase', 'lead', 'conversion', 'result', 'مشتريات', 'تحويل', 'نتائج', 'تسجيل', 'مبيعات']);
        const roasIdx = findIndex(['roas', 'return', 'عائد', 'عائدات']);
        const ctrIdx = findIndex(['ctr', 'click-through', 'نقر', 'نسبة النقر']);
        const crIdx = findIndex(['cr', 'conv. rate', 'conversion rate', 'معدل التحويل', 'معدل تحويل']);
        const clicksIdx = findIndex(['click', 'نقر', 'نقرات']);
        const impressionsIdx = findIndex(['impression', 'ظهور', 'مشاهدة']);

        if (spendIdx === -1) {
            alert(`عذراً، لم نتمكن من العثور على عمود الإنفاق (Spend/Cost) تلقائياً.\n\n` +
                  `🔍 تشخيص الملف:\n` +
                  `- السطر المعتمد كعناوين: ${headerLineIndex + 1}\n` +
                  `- الفاصل المستخدم: [ ${delimiter === '\t' ? 'Tab' : delimiter} ]\n` +
                  `- الأعمدة التي تم اكتشافها:\n[ ${headers.join(' | ')} ]\n\n` +
                  `تأكد من وجود رأس جدول واضح يحتوي على الكلمات المفتاحية باللغة العربية أو الإنجليزية.`);
            return;
        }

        const parseNumber = (val) => {
            if (!val) return 0;
            let clean = val.replace(/["' $£€ر.سج.مegp]/gi, '').trim();
            // If it contains both comma and dot, e.g. 1,200.50
            if (clean.includes(',') && clean.includes('.')) {
                clean = clean.replace(/,/g, '');
            } else if (clean.includes(',')) {
                // If it contains only a comma, e.g. 1200,50 or 1,200
                // Let's check if the comma is a decimal separator or thousand separator
                const parts = clean.split(',');
                if (parts[parts.length - 1].length === 3) {
                    // Thousands separator: replace with nothing
                    clean = clean.replace(/,/g, '');
                } else {
                    // Decimal separator: replace with dot
                    clean = clean.replace(/,/g, '.');
                }
            }
            return parseFloat(clean) || 0;
        };

        const splitRow = (line) => {
            if (delimiter === '\t' || delimiter === ';') {
                return line.split(delimiter).map(cell => cell.trim());
            }
            // Robust CSV parser that respects quoted commas
            const result = [];
            let current = '';
            let inQuotes = false;
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"' || char === "'") {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    result.push(current.trim());
                    current = '';
                } else {
                    current += char;
                }
            }
            result.push(current.trim());
            return result;
        };

        let totalSpend = 0;
        let totalPurchases = 0;
        let totalImpressions = 0;
        let totalClicks = 0;
        let totalCtrSum = 0;
        let totalCrSum = 0;
        let validCtrRows = 0;
        let validCrRows = 0;
        let weightedRoasSum = 0;
        let validRoasRows = 0;
        let maxSpend = -1;
        let highestSpendCampaignName = '';

        const data = [];

        // Start parsing data from the row AFTER the header row
        for (let i = headerLineIndex + 1; i < lines.length; i++) {
            const row = splitRow(lines[i]);
            if (row.length <= Math.max(campIdx, spendIdx)) continue;

            const name = campIdx !== -1 ? row[campIdx].replace(/["']/g, '').trim() : `حملة #${i}`;
            const spend = parseNumber(row[spendIdx]);
            const purchases = conversionsIdx !== -1 ? parseNumber(row[conversionsIdx]) : 0;
            const roas = roasIdx !== -1 ? parseNumber(row[roasIdx]) : 0;
            const ctr = ctrIdx !== -1 ? parseNumber(row[ctrIdx]) : 0;
            const cr = crIdx !== -1 ? parseNumber(row[crIdx]) : 0;
            const clicks = clicksIdx !== -1 ? parseNumber(row[clicksIdx]) : 0;
            const impressions = impressionsIdx !== -1 ? parseNumber(row[impressionsIdx]) : 0;

            if (!name && spend === 0) continue;

            // Skip total and summary rows to prevent double calculations
            const nameLower = name.toLowerCase();
            if (nameLower === 'total' || nameLower === 'totals' || nameLower === 'إجمالي' || nameLower === 'إجمالى' || nameLower === 'المجموع' || nameLower === 'المجموع الكلي') {
                continue;
            }

            totalSpend += spend;
            totalPurchases += purchases;
            totalImpressions += impressions;
            totalClicks += clicks;

            if (roas > 0) {
                weightedRoasSum += (spend * roas);
                validRoasRows += spend;
            }

            if (ctr > 0) {
                totalCtrSum += ctr;
                validCtrRows++;
            }
            if (cr > 0) {
                totalCrSum += cr;
                validCrRows++;
            }

            if (spend > maxSpend) {
                maxSpend = spend;
                highestSpendCampaignName = name;
            }

            const cpa = purchases > 0 ? (spend / purchases) : 0;

            data.push({
                id: i,
                name,
                spend,
                purchases,
                cpa: cpa.toFixed(2),
                roas,
                ctr,
                cr
            });
        }

        // Calculations
        const averageCpa = totalPurchases > 0 ? (totalSpend / totalPurchases) : 0;
        const averageRoas = validRoasRows > 0 ? (weightedRoasSum / validRoasRows) : 0;
        const totalRevenue = averageRoas > 0 ? (totalSpend * averageRoas) : 0;
        
        const averageCtr = (totalImpressions > 0 && totalClicks > 0) 
            ? ((totalClicks / totalImpressions) * 100) 
            : (validCtrRows > 0 ? (totalCtrSum / validCtrRows) : 0);

        const averageCr = (totalClicks > 0 && totalPurchases > 0) 
            ? ((totalPurchases / totalClicks) * 100) 
            : (validCrRows > 0 ? (totalCrSum / validCrRows) : 0);

        setSummaryMetrics({
            totalSpend,
            totalPurchases,
            averageCpa,
            averageRoas,
            totalRevenue,
            averageCtr,
            averageCr,
            highestSpendCampaignName
        });

        // Sort by spend descending
        data.sort((a, b) => b.spend - a.spend);
        setReportData(data);
        setSuccessMessage('تم سحب وتحليل البيانات بنجاح! راجع لوحة المؤشرات على اليسار.');
        setTimeout(() => setSuccessMessage(''), 5000);
    };

    const handleApplyData = () => {
        if (reportData.length === 0) {
            alert('الرجاء رفع أو لصق تقرير أولاً.');
            return;
        }

        const {
            totalSpend,
            averageCpa,
            averageRoas,
            totalRevenue,
            averageCtr,
            averageCr,
            highestSpendCampaignName
        } = summaryMetrics;

        if (selectedTarget === 'postmortem') {
            // Apply to Post-Mortem Tab
            onChange('pm_spend', totalSpend.toFixed(2));
            onChange('pm_revenue', totalRevenue.toFixed(2));
            onChange('pm_roas', averageRoas.toFixed(2));
            onChange('pm_cpl', averageCpa.toFixed(2));
            onChange('pm_campaign_name', highestSpendCampaignName);
            
            // Also apply to funnel stage actual values if applicable
            onChange('actual_roas', averageRoas.toFixed(2));
            if (averageCtr > 0) onChange('actual_ctr', averageCtr.toFixed(2));
            if (averageCr > 0) onChange('actual_cr', averageCr.toFixed(2));

            setSuccessMessage('🎉 تم ملء وتحديث خانات "تقرير نهاية الشهر (Post-Mortem)" بنجاح!');
        } else if (selectedTarget === 'quick') {
            // Apply to Executive Summary / Quick Metrics
            onChange('quick_spend', totalSpend.toFixed(2));
            onChange('quick_roas', averageRoas.toFixed(2));
            onChange('quick_cpl', averageCpa.toFixed(2));
            onChange('campaign_name', highestSpendCampaignName);

            setSuccessMessage('🎉 تم تحديث "الملخص السريع وخانات المشروع" بنجاح!');
        } else if (selectedTarget === 'pacing') {
            // Apply to Pacing Tracker
            onChange('pacing_spend', totalSpend.toFixed(2));

            setSuccessMessage('🎉 تم تحديث "متتبع وتيرة الصرف (Pacing)" بنجاح!');
        }

    };

    const generateDiagnostics = () => {
        const { averageRoas, averageCtr, averageCr, averageCpa } = summaryMetrics;
        const diagnostics = [];
        const cur = (state && state.currency) || 'ج.م';

        // ROAS Diagnostic
        if (averageRoas > 0) {
            if (averageRoas < 1.5) {
                diagnostics.push({
                    type: 'danger',
                    title: `العائد على الإنفاق (ROAS) منخفض جداً (${averageRoas.toFixed(2)}x)`,
                    desc: `الحملات تخسر حالياً. افحص العروض فوراً، وتأكد من جودة صفحة الهبوط وعدم وجود مشاكل تقنية تمنع الشراء.`,
                    icon: '🔴'
                });
            } else if (averageRoas < 2.5) {
                diagnostics.push({
                    type: 'warning',
                    title: `العائد على الإنفاق في منطقة التعادل (${averageRoas.toFixed(2)}x)`,
                    desc: `الأداء مقبول ولكنه غير مربح بالكامل. ينصح برفع قيمة السلة المتوسطة AOV أو تحسين جودة الجمهور المستهدف لرفع الربحية.`,
                    icon: '🟡'
                });
            } else {
                diagnostics.push({
                    type: 'success',
                    title: `العائد على الإنفاق رابح وممتاز (${averageRoas.toFixed(2)}x) 🎉`,
                    desc: `أداء قوي ومثالي للتوسع! يمكنك زيادة الميزانية اليومية تدريجياً بنسبة 15-20% كل 3 أيام مع مراقبة ثبات النتائج.`,
                    icon: '🔵'
                });
            }
        }

        // CTR Diagnostic
        if (averageCtr > 0) {
            if (averageCtr < 1.0) {
                diagnostics.push({
                    type: 'danger',
                    title: `نسبة النقر CTR منخفضة دون المألوف (${averageCtr.toFixed(2)}%)`,
                    desc: `الفيديوهات والصور الإعلانية لم تجذب الجمهور. يجب فحص وتغيير أول 3 ثوانٍ من الفيديوهات (Hooks) فوراً، وجرب تصاميم وعناوين أكثر جاذبية.`,
                    icon: '🔴'
                });
            } else if (averageCtr < 2.0) {
                diagnostics.push({
                    type: 'warning',
                    title: `نسبة النقر CTR مقبولة ولكن متوسطة (${averageCtr.toFixed(2)}%)`,
                    desc: `المحتوى الإبداعي يعمل، ولكن يمكن تحسينه. جرّب إبراز الفوائد الرئيسية للمنتج في السطر الأول من الإعلان ورفع جودة تصوير الموشن.`,
                    icon: '🟡'
                });
            } else {
                diagnostics.push({
                    type: 'success',
                    title: `نسبة النقر CTR قوية وجذابة (${averageCtr.toFixed(2)}%) ✨`,
                    desc: `المحتوى الإبداعي ممتاز وينال إعجاب الجمهور بشكل رائع. احتفظ بهذا النمط الإبداعي وقم بصياغة زوايا جديدة تعتمد على نفس الفكرة.`,
                    icon: '🔵'
                });
            }
        }

        // CR Diagnostic
        if (averageCr > 0) {
            if (averageCr < 1.0) {
                diagnostics.push({
                    type: 'danger',
                    title: `معدل تحويل المتجر CR ضعيف وحرج (${averageCr.toFixed(2)}%)`,
                    desc: `الزوار يدخلون المتجر ولكنهم يغادرون دون شراء. افحص سرعة تحميل موقعك، وسهّل عملية الدفع (Checkout) مثل تفعيل خيار الدفع السريع والـ COD.`,
                    icon: '🔴'
                });
            } else if (averageCr < 2.5) {
                diagnostics.push({
                    type: 'warning',
                    title: `معدل تحويل المتجر CR متوسط ومستقر (${averageCr.toFixed(2)}%)`,
                    desc: `المتجر يعمل بشكل جيد، ولكن يمكنك مضاعفة مبيعاتك بتعديل بسيط. أضف مراجعات وصور حقيقية للعملاء، وأبرز سياسة الاستبدال والضمان لرفع الثقة.`,
                    icon: '🟡'
                });
            } else {
                diagnostics.push({
                    type: 'success',
                    title: `معدل تحويل المتجر CR ممتاز وفائق الجودة (${averageCr.toFixed(2)}%) 🚀`,
                    desc: `رحلة مستخدم رائعة وعرض مقنع للغاية بداخل المتجر. أنت مستعد تماماً لاستيعاب كميات أكبر من الزوار ومضاعفة الحملات الإعلانية.`,
                    icon: '🔵'
                });
            }
        }

        // CPA vs AOV Diagnostic
        const aov = parseFloat(state.assumption_aov?.replace(/[^\d.]/g, '')) || 0;
        if (averageCpa > 0 && aov > 0) {
            const cpaRatio = averageCpa / aov;
            if (cpaRatio > 0.4) {
                diagnostics.push({
                    type: 'danger',
                    title: `تكلفة الحصول على عميل (CPA) مرتفعة مقارنة بـ AOV (${averageCpa.toFixed(2)} ${cur})`,
                    desc: `تكلفة الشراء تلتهم أكثر من 40% من قيمة السلة (${aov} ${cur}). ينصح فوراً بتحسين العروض الترويجية أو تغيير الجماهير لخفض الـ CPA وتفادي الخسارة.`,
                    icon: '🔴'
                });
            } else if (cpaRatio > 0.25) {
                diagnostics.push({
                    type: 'warning',
                    title: `تكلفة الحصول على عميل (CPA) مقبولة ولكنها تحتاج ترشيد (${averageCpa.toFixed(2)} ${cur})`,
                    desc: `تكلفة الشراء تمثل حوالي ${Math.round(cpaRatio * 100)}% من قيمة السلة. يمكنك خفض الأثر بتقديم باقات ترفع الـ AOV أو تحسين استهداف الإعلان.`,
                    icon: '🟡'
                });
            } else {
                diagnostics.push({
                    type: 'success',
                    title: `تكلفة الحصول على عميل (CPA) ممتازة ومثالية للربح (${averageCpa.toFixed(2)} ${cur}) 💸`,
                    desc: `تكلفة الطلب تمثل أقل من 25% من قيمة السلة (${aov} ${cur}). هذه ميزة تنافسية فائقة تتيح لك توسيع الحملات الإعلانية ومضاعفة الإنفاق بأمان!`,
                    icon: '🔵'
                });
            }
        }

        // Individual Campaign diagnostic
        if (reportData.length > 0) {
            const topCampaign = reportData[0]; // sorted by spend desc
            if (topCampaign.spend > 0 && topCampaign.purchases === 0) {
                diagnostics.push({
                    type: 'danger',
                    title: `حملة الإنفاق الأعلى [${topCampaign.name}] تصرف بلا مبيعات!`,
                    desc: `أنفقت الحملة الكبرى مبلغ ${topCampaign.spend.toLocaleString()} ${cur} دون تحقيق أي طلبات. أوقف هذه الحملة فوراً أو وجّه ميزانيتها لجمهور آخر.`,
                    icon: '🔴'
                });
            }
        }

        return diagnostics;
    };

    return (
        <div className="glass-panel">
            <h2 className="panel-title">📊 سحب البيانات التلقائي من تقارير الإعلانات (Auto Report Parser)</h2>
            <p className="panel-subtitle">ارفع تقرير CSV أو الصق البيانات مباشرة من مدير الإعلانات، وسيقوم النظام بتحليلها وتعبئة كافة الخانات المطلوبة في موقعك بضغطة زر واحدة!</p>

            {successMessage && (
                <div style={{
                    padding: '16px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid var(--neon-green)',
                    borderRadius: '10px',
                    color: 'var(--neon-green)',
                    marginBottom: '20px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    animation: 'pulse 2s infinite'
                }}>
                    {successMessage}
                </div>
            )}

            <div className="grid-cols-2" style={{ marginTop: '20px', gap: '24px' }}>
                
                {/* القسم الأيمن: رفع ولصق التقارير */}
                <div className="card-item" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
                        <button 
                            className={`btn ${activeInputTab === 'upload' ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setActiveInputTab('upload')}
                            style={{ flex: 1, borderRadius: '8px 8px 0 0', borderBottom: 'none', padding: '12px' }}
                        >
                            📁 رفع ملف CSV
                        </button>
                        <button 
                            className={`btn ${activeInputTab === 'paste' ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setActiveInputTab('paste')}
                            style={{ flex: 1, borderRadius: '8px 8px 0 0', borderBottom: 'none', padding: '12px' }}
                        >
                            📝 لصق تقرير مباشر (من الحافظة)
                        </button>
                    </div>

                    {activeInputTab === 'upload' ? (
                        <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                            <input 
                                type="file" 
                                id="csv-upload" 
                                accept=".csv" 
                                style={{ display: 'none' }} 
                                onChange={handleFileUpload} 
                            />
                            <button 
                                className="btn btn-primary" 
                                onClick={() => document.getElementById('csv-upload').click()}
                                style={{ fontSize: '1.1rem', padding: '12px 24px', borderRadius: '30px' }}
                            >
                                اختر ملف CSV للتقرير
                            </button>
                            {fileName && (
                                <p style={{ marginTop: '16px', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                                    📁 الملف الحالي: {fileName}
                                </p>
                            )}
                            <p style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                * يدعم ملفات CSV المصدرة من **فيسبوك إعلانات**، **تيك توك إعلانات**، و **جوجل إعلانات**.<br />
                                يفضل وجود أعمدة: `Campaign Name`, `Amount Spent`, `Purchases/Leads`, `ROAS`.
                            </p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                حدد الجدول من مدير الإعلانات ثم اضغط نسخ (Ctrl+C)، والصقه هنا مباشرة:
                            </label>
                            <textarea
                                value={pastedText}
                                onChange={(e) => setPastedText(e.target.value)}
                                placeholder="انسخ الأعمدة من مدير الإعلانات والصقها هنا...&#10;مثال:&#10;Campaign Name	Budget	Amount Spent	Purchases	ROAS&#10;حملة المنتجات	100	450.2	15	2.4"
                                style={{
                                    width: '100%',
                                    height: '180px',
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: 'var(--text-primary)',
                                    padding: '12px',
                                    fontFamily: 'monospace',
                                    fontSize: '0.85rem',
                                    direction: 'ltr',
                                    textAlign: 'left',
                                    outline: 'none'
                                }}
                            />
                            <button 
                                className="btn btn-primary"
                                onClick={handlePasteSubmit}
                                style={{ alignSelf: 'flex-start', padding: '10px 20px' }}
                            >
                                ⚡ تحليل ولصق البيانات
                            </button>
                        </div>
                    )}
                </div>

                {/* القسم الأيسر: لوحة المؤشرات الجاهزة للتعبئة */}
                <div className="card-item" style={{ 
                    background: reportData.length > 0 ? 'rgba(0, 82, 255, 0.03)' : 'rgba(255,255,255,0.01)',
                    borderColor: reportData.length > 0 ? 'rgba(0, 82, 255, 0.25)' : 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <h3 style={{ marginBottom: '16px', color: 'var(--primary-color)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>📈</span> ملخص البيانات المستخرجة
                        </h3>

                        {reportData.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>إجمالي الإنفاق الكلي</div>
                                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--red)', margin: '4px 0' }}>
                                        ${summaryMetrics.totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>التحويلات الكلية (المبيعات)</div>
                                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: '4px 0' }}>
                                        {summaryMetrics.totalPurchases}
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>متوسط تكلفة التحويل (CPA)</div>
                                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--neon-green)', margin: '4px 0' }}>
                                        ${summaryMetrics.averageCpa.toFixed(2)}
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>متوسط العائد الإعلاني (ROAS)</div>
                                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary-color)', margin: '4px 0' }}>
                                        {summaryMetrics.averageRoas.toFixed(2)}x
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', textAlign: 'center', gridColumn: 'span 2' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>الإيرادات الإجمالية المستردة (المحسوبة)</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--neon-green)', margin: '4px 0' }}>
                                        ${summaryMetrics.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>📊</span>
                                الرجاء رفع ملف التقرير أو لصق النص لعرض ملخص الأداء.
                            </div>
                        )}
                    </div>

                    {reportData.length > 0 && (
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginTop: '10px' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                                ⚡ اختر مكان تعبئة البيانات في موقعك:
                            </label>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                <select 
                                    value={selectedTarget}
                                    onChange={(e) => setSelectedTarget(e.target.value)}
                                    style={{
                                        flex: 1,
                                        background: 'var(--bg-dark)',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        color: 'var(--text-primary)',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        fontSize: '0.9rem',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="postmortem">ورقة القياس وتقارير نهاية الشهر (Post-Mortem)</option>
                                    <option value="quick">الملخص التنفيذي السريع للمشروع (Dashboard/Brand)</option>
                                    <option value="pacing">متتبع الصرف والميزانية (Pacing Tracker)</option>
                                </select>
                            </div>
                            <button 
                                className="btn btn-primary"
                                onClick={handleApplyData}
                                style={{ width: '100%', padding: '12px', fontSize: '1rem', fontWeight: 'bold' }}
                            >
                                🚀 تحديث وتعبئة الخانات تلقائياً
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* الطبيب الإعلاني الآلي AI Ad-Doctor Diagnostics */}
            {reportData.length > 0 && (
                <div style={{ marginTop: '36px' }}>
                    <h3 style={{ marginBottom: '16px', color: 'var(--primary-color)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>🩺</span> الطبيب الإعلاني الآلي الذكي (AI Ad-Doctor)
                    </h3>
                    <div style={{
                        background: 'rgba(15, 18, 28, 0.5)',
                        border: '1px dashed var(--glass-border)',
                        borderRadius: '12px',
                        padding: '20px',
                        marginBottom: '20px'
                    }}>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                            يقوم الطبيب الآلي بفحص مؤشرات أداء الحملات ومطابقتها بالمعايير العالمية لتحديد مكامن الخلل وحلول تحسين العائد:
                        </p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {generateDiagnostics().map((item, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    gap: '12px',
                                    padding: '14px 16px',
                                    borderRadius: '10px',
                                    background: item.type === 'danger' ? 'rgba(255, 0, 85, 0.05)' : item.type === 'warning' ? 'rgba(245, 158, 11, 0.05)' : 'rgba(0, 240, 255, 0.05)',
                                    border: `1px solid ${item.type === 'danger' ? 'rgba(255, 0, 85, 0.15)' : item.type === 'warning' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(0, 240, 255, 0.15)'}`,
                                    alignItems: 'flex-start'
                                }}>
                                    <span style={{ fontSize: '1.2rem', marginTop: '2px' }}>{item.icon}</span>
                                    <div>
                                        <h4 style={{ 
                                            fontSize: '0.92rem', 
                                            fontWeight: '700', 
                                            color: item.type === 'danger' ? 'var(--neon-crimson)' : item.type === 'warning' ? 'var(--neon-amber)' : 'var(--neon-cyan)',
                                            marginBottom: '4px'
                                        }}>
                                            {item.title}
                                        </h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* جدول تفصيلي بالحملات المكتشفة */}
            {reportData.length > 0 && (
                <div style={{ marginTop: '36px', overflowX: 'auto' }}>
                    <h3 style={{ marginBottom: '16px', color: 'var(--primary-color)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>📋</span> تفاصيل الحملات المستخرجة ({reportData.length} حملة)
                    </h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', textAlign: 'right' }}>اسم الحملة</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>الإنفاق</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>التحويلات</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>تكلفة التحويل CPA</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>العائد ROAS</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>CTR</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>CR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.map(row => (
                                <tr key={row.id} style={{ 
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: '12px', color: 'var(--text-primary)', fontWeight: '500', textAlign: 'right' }}>{row.name}</td>
                                    <td style={{ padding: '12px', color: 'var(--red)', fontWeight: 'bold', textAlign: 'center' }}>${row.spend.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                    <td style={{ padding: '12px', color: 'var(--text-primary)', textAlign: 'center' }}>{row.purchases}</td>
                                    <td style={{ padding: '12px', color: 'var(--neon-green)', fontWeight: 'bold', textAlign: 'center' }}>${row.cpa}</td>
                                    <td style={{ padding: '12px', color: 'var(--primary-color)', fontWeight: 'bold', textAlign: 'center' }}>{row.roas > 0 ? `${row.roas.toFixed(2)}x` : '—'}</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)', textAlign: 'center' }}>{row.ctr > 0 ? `${row.ctr.toFixed(2)}%` : '—'}</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)', textAlign: 'center' }}>{row.cr > 0 ? `${row.cr.toFixed(2)}%` : '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
