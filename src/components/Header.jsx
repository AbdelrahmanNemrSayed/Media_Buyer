import { useState } from 'react';

export default function Header({ 
    progressPercentage, 
    badgeText, 
    isBadgeSavedState, 
    lastSavedTime,
    onManualSave,
    onReset, 
    onDownload,
    isDarkMode,
    onToggleTheme,
    onUndo,
    onRedo,
    campaigns = {},
    activeCampaignId,
    onSwitchCampaign,
    onAddCampaign,
    onRenameCampaign,
    onDeleteCampaign,
    onImportJSON,
    onExportJSON,
    onShareURL,
    onExportCSV,
    onOpenGuide,
}) {
    const [showCampaigns, setShowCampaigns] = useState(false);
    const [showDataMenu, setShowDataMenu] = useState(false);
    const campaignList = Object.entries(campaigns);

    return (
        <header className="dashboard-header">
            {/* 1) Right Side: Logo & Campaign Switcher */}
            <div className="header-logo-container">
                <span 
                    id="live-badge" 
                    className={`header-badge ${isBadgeSavedState ? 'saved-pulse' : ''}`}
                >
                    {badgeText}
                </span>
                <span className="header-title">خطة ميديا باينج</span>

                {/* Campaign Switcher */}
                <div className="campaign-switcher-wrap">
                    <button 
                        className="campaign-switch-btn"
                        onClick={() => { setShowCampaigns(s => !s); setShowDataMenu(false); }}
                        title="تبديل الحملة"
                    >
                        📋 {campaigns[activeCampaignId]?.name || 'الحملة الرئيسية'}
                        <span className="campaign-chevron">{showCampaigns ? '▲' : '▼'}</span>
                    </button>
                    {showCampaigns && (
                        <div className="campaign-dropdown" style={{ right: '0', left: 'auto' }}>
                            {campaignList.map(([id, camp]) => (
                                <button
                                    key={id}
                                    className={`campaign-dropdown-item ${id === activeCampaignId ? 'active' : ''}`}
                                    onClick={() => { onSwitchCampaign(id); setShowCampaigns(false); }}
                                >
                                    {id === activeCampaignId && '✓ '}{camp.name}
                                </button>
                            ))}
                            <div className="campaign-dropdown-divider" />
                            <button
                                className="campaign-dropdown-item campaign-add-btn"
                                onClick={() => { onAddCampaign(); setShowCampaigns(false); }}
                            >
                                ＋ عميل جديد (خطة جديدة)
                            </button>
                            <button
                                className="campaign-dropdown-item"
                                onClick={() => { onRenameCampaign(activeCampaignId); setShowCampaigns(false); }}
                            >
                                ✏️ تغيير اسم الحملة
                            </button>
                            <button
                                className="campaign-dropdown-item"
                                style={{ color: 'var(--red)' }}
                                onClick={() => { onDeleteCampaign(activeCampaignId); setShowCampaigns(false); }}
                            >
                                🗑️ حذف الحملة
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            {/* 2) Center: Expanded Progress Bar */}
            <div className="progress-wrapper" style={{ flexGrow: 1.5 }}>
                <span className="progress-label">اكتمال الخطة: {progressPercentage}%</span>
                <div className="progress-container">
                    <div 
                        className="progress-fill" 
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>
            
            {/* 3) Left Side: Organised Control Panel */}
            <div className="header-controls">
                {/* Save Section (glowing button + micro-status) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                    {lastSavedTime && (
                        <span className="last-saved-indicator" title="آخر عملية حفظ تلقائي ناجحة">
                            🟢 {lastSavedTime}
                        </span>
                    )}
                    <button className="btn btn-save" onClick={onManualSave} title="حفظ التغييرات يدوياً فوراً">
                        <span>💾</span> حفظ الآن
                    </button>
                </div>

                {/* Divider */}
                <div style={{ width: '1px', height: '20px', background: 'var(--glass-border)', margin: '0 4px' }} />

                {/* Undo / Redo Group */}
                <div className="btn-group">
                    <button className="btn btn-secondary btn-icon" onClick={onUndo} title="تراجع (Ctrl+Z)">↩</button>
                    <button className="btn btn-secondary btn-icon" onClick={onRedo} title="إعادة (Ctrl+Y)">↪</button>
                </div>

                {/* Quick Guide Button */}
                <button className="btn btn-secondary" onClick={onOpenGuide} title="دليل الاستخدام السريع">
                    <span>📖</span> دليل
                </button>

                {/* Major PDF Print Button */}
                <button className="btn btn-primary" onClick={onDownload} title="تصدير كملف PDF للطباعة">
                    <span>🖨️</span> PDF
                </button>

                {/* Premium Data Options Dropdown */}
                <div className="data-menu-wrap" style={{ position: 'relative' }}>
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => { setShowDataMenu(s => !s); setShowCampaigns(false); }}
                        title="أدوات إدارة وتصدير واستيراد البيانات"
                    >
                        <span>⚙️</span> خيارات الخطة
                        <span className="campaign-chevron">{showDataMenu ? '▲' : '▼'}</span>
                    </button>
                    {showDataMenu && (
                        <div className="campaign-dropdown data-dropdown" style={{ left: 0, right: 'auto' }}>
                            <button className="campaign-dropdown-item" onClick={() => { onShareURL(); setShowDataMenu(false); }} title="نسخ رابط مشفر لمشاركة الخطة مع الزملاء">
                                🔗 مشاركة الرابط السري
                            </button>
                            <button className="campaign-dropdown-item" onClick={() => { onExportCSV(); setShowDataMenu(false); }} title="تحميل البيانات بصيغة CSV لتشغيلها على إكسل">
                                📊 تصدير Excel (CSV)
                            </button>
                            <button className="campaign-dropdown-item" onClick={() => { onExportJSON(); setShowDataMenu(false); }} title="تصدير ملف JSON كنسخة احتياطية آمنة على جهازك">
                                ⬇️ تصدير نسخة احتياطية
                            </button>
                            <button className="campaign-dropdown-item" onClick={() => { document.getElementById('import-json').click(); setShowDataMenu(false); }} title="استرجاع وتطبيق نسخة احتياطية سابقة من جهازك">
                                ⬆️ استيراد نسخة احتياطية
                            </button>
                            <div className="campaign-dropdown-divider" />
                            <button className="campaign-dropdown-item" style={{ color: 'var(--red)' }} onClick={() => { onReset(); setShowDataMenu(false); }} title="تفريغ وإعادة تعيين كافة خانات المتصفح">
                                🧹 تفريغ الخطة بالكامل
                            </button>
                        </div>
                    )}
                    {/* Hidden Import Input */}
                    <input 
                        type="file" 
                        id="import-json" 
                        accept=".json" 
                        style={{ display: 'none' }} 
                        onChange={onImportJSON} 
                    />
                </div>

                {/* Light/Dark Toggle */}
                <button className="btn btn-secondary btn-icon" onClick={onToggleTheme} title="تبديل الإضاءة" style={{ borderRadius: '50%', width: '36px', height: '36px', justifyContent: 'center' }}>
                    <span>{isDarkMode ? '☀️' : '🌙'}</span>
                </button>
            </div>
        </header>
    );
}
