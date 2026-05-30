import EditableSlot from './EditableSlot';

export default function ProfitCalculator({ state, onChange }) {
    const price = parseFloat(state.calc_price) || 0;
    const cogs = parseFloat(state.calc_cogs) || 0;
    const shipping = parseFloat(state.calc_shipping) || 0;
    const returnsPct = parseFloat(state.calc_returns) || 0;

    // Calculations
    const costs = cogs + shipping;
    const returnCost = price * (returnsPct / 100);
    const netProfit = price - costs - returnCost;
    const breakEvenRoas = netProfit > 0 ? (price / netProfit).toFixed(2) : '0.00';
    const targetCpa = netProfit > 0 ? netProfit.toFixed(2) : '0.00';
    const margin = price > 0 ? ((netProfit / price) * 100).toFixed(1) : '0.0';

    return (
        <div className="glass-panel">
            <h2 className="panel-title">🧮 حاسبة الربحية ونقطة التعادل (Break-Even Calculator)</h2>
            <p className="panel-subtitle">أدخل بيانات المنتج بدقة لتعرف الحد الأقصى لتكلفة الاستحواذ (Target CPA) والعائد المطلوب (Break-Even ROAS).</p>

            <div className="grid-cols-2" style={{ marginTop: '20px' }}>
                <div className="card-item" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>بيانات المنتج والتكاليف</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>سعر البيع للعميل</label>
                            <EditableSlot id="calc_price" placeholder="مثال: 500" value={state.calc_price} onChange={onChange} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>تكلفة المنتج (COGS)</label>
                            <EditableSlot id="calc_cogs" placeholder="تكلفة الشراء والتغليف" value={state.calc_cogs} onChange={onChange} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>تكلفة الشحن والتوصيل</label>
                            <EditableSlot id="calc_shipping" placeholder="مثال: 50" value={state.calc_shipping} onChange={onChange} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>نسبة المرتجعات المتوقعة (%)</label>
                            <EditableSlot id="calc_returns" placeholder="مثال: 15" value={state.calc_returns} onChange={onChange} />
                        </div>
                    </div>
                </div>

                <div className="card-item" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                    <h3 style={{ marginBottom: '16px', color: 'var(--neon-green)' }}>النتائج والمؤشرات (KPIs)</h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>صافي الربح قبل الإعلان</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: '8px 0' }}>
                                {netProfit > 0 ? netProfit.toFixed(2) : '0.00'}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>هامش ربح {margin}%</div>
                        </div>

                        <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target CPA (الحد الأقصى)</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--red)', margin: '8px 0' }}>
                                {targetCpa}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>تكلفة الاستحواذ للتعادل</div>
                        </div>
                    </div>

                    <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Break-Even ROAS (عائد التعادل)</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)', margin: '8px 0' }}>
                            {breakEvenRoas}x
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                            أي ROAS أعلى من {breakEvenRoas} يعني أنك تحقق أرباحاً صافية!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
