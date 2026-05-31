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
    const campaignList = Object.entries(campaigns);

    return (
        <header className="dashboard-header">
            {/* Logo + Badge */}
            <div className="header-logo-container">
                <span 
                    id="live-badge" 
                    className={`header-badge ${isBadgeSavedState ? 'saved-pulse' : ''}`}
                >
                    {badgeText}
                </span>
                <span className="header-title">خطة ميديا باينج</span>

                {lastSavedTime && (
                    <span className="last-saved-indicator" title="آخر عملية حفظ تلقائي آمنة">
                        🟢 آخر حفظ: {lastSavedTime}
                    </span>
                )}

                {/* Campaign Switcher */}
                <div className="campaign-switcher-wrap">
                    <button 
                        className="campaign-switch-btn"
                        onClick={() => setShowCampaigns(s => !s)}
                        title="تبديل الحملة"
                    >
                        📋 {campaigns[activeCampaignId]?.name || 'الحملة الرئيسية'}
                        <span className="campaign-chevron">{showCampaigns ? '▲' : '▼'}</span>
                    </button>
                    {showCampaigns && (
                        <div className="campaign-dropdown">
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
            
            {/* Progress bar */}
            <div className="progress-wrapper">
                <span className="progress-label">اكتمال: {progressPercentage}%</span>
                <div className="progress-container">
                    <div 
                        className="progress-fill" 
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>
            
            {/* Controls */}
            <div className="header-controls">
                {/* Manual Save Button */}
                <button className="btn btn-save" onClick={onManualSave} title="حفظ التغييرات يدوياً فوراً">
                    <span>💾</span> حفظ الآن
                </button>

                {/* Undo / Redo */}
                <button className="btn btn-secondary btn-icon" onClick={onUndo} title="تراجع (Ctrl+Z)">↩</button>
                <button className="btn btn-secondary btn-icon" onClick={onRedo} title="إعادة (Ctrl+Y)">↪</button>

                <button className="btn btn-secondary" onClick={onOpenGuide} title="دليل الاستخدام السريع">
                    <span>📖</span> دليل
                </button>
                <button className="btn btn-secondary" onClick={onShareURL} title="نسخ رابط المشاهدة">
                    <span>🔗</span> مشاركة
                </button>
                <button className="btn btn-secondary" onClick={onToggleTheme} title="تبديل الإضاءة">
                    <span>{isDarkMode ? '☀️' : '🌙'}</span>
                </button>
                <button className="btn btn-danger" onClick={onReset} title="تفريغ الخطة">
                    <span>🧹</span> مسح
                </button>
                
                <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.2)', margin: '0 8px' }} />

                <div className="export-menu-wrap" style={{ position: 'relative' }}>
                    <button className="btn btn-primary" onClick={onDownload} title="تصدير كملف PDF">
                        <span>🖨️</span> PDF
                    </button>
                    <button className="btn btn-secondary" onClick={onExportCSV} title="تصدير كملف Excel (CSV)" style={{ marginLeft: '8px' }}>
                        <span>📊</span> CSV
                    </button>
                </div>

                <div className="export-menu-wrap" style={{ position: 'relative' }}>
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => document.getElementById('import-json').click()} 
                        title="استيراد نسخة احتياطية"
                    >
                        <span>⬆️</span> استيراد
                    </button>
                    <input 
                        type="file" 
                        id="import-json" 
                        accept=".json" 
                        style={{ display: 'none' }} 
                        onChange={onImportJSON} 
                    />
                    <button 
                        className="btn btn-secondary" 
                        style={{ marginLeft: '8px' }} 
                        onClick={onExportJSON} 
                        title="تصدير نسخة احتياطية"
                    >
                        <span>⬇️</span> نسخة احتياطية
                    </button>
                </div>
            </div>
        </header>
    );
}
