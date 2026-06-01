import { useState } from 'react';

const MENU_GROUPS = [
    {
        title: '📂 1. التجهيز والملف العام (Setup)',
        items: [
            { id: 'dashboard',  icon: '🏠', title: 'لوحة التحكم العامة' },
            { id: 'summary',    icon: '📝', title: 'الملخص التنفيذي' },
            { id: 'objectives', icon: '🎯', title: 'الأهداف والميزانيات' },
            { id: 'audience',   icon: '🧲', title: 'الجمهور والرسالة' },
            { id: 'funnel',     icon: '🔽', title: 'استراتيجية القمع' },
        ]
    },
    {
        title: '🎬 2. أصول وإعدادات الحملة (Launch)',
        items: [
            { id: 'creative',  icon: '🎬', title: 'مكتبة الكرييتف والموشن' },
            { id: 'timeline',  icon: '📅', title: 'الجدول الزمني (Timeline)' },
            { id: 'checklist', icon: '✅', title: 'قائمة ما قبل الإطلاق' },
            { id: 'naming',     icon: '🏷️', title: 'أداة تسمية الحملات' },
            { id: 'utm',        icon: '🔗', title: 'منشئ روابط UTM' },
            { id: 'spyvault',   icon: '🕵️', title: 'مخزن المنافسين (Spy Vault)' },
        ]
    },
    {
        title: '📊 3. تشخيص الأداء والتقارير (Reports)',
        items: [
            { id: 'reports',    icon: '📈', title: 'تقارير الأداء المتقدمة' },
            { id: 'pacing',     icon: '💸', title: 'متتبع سرعة الإنفاق' },
            { id: 'rules',      icon: '⚡', title: 'قواعد التحجيم والإيقاف' },
            { id: 'postmortem', icon: '🏆', title: 'Post-Mortem والتعلميات' },
        ]
    },
    {
        title: '🛠️ 4. أدوات Pro المساعدة (Helpers)',
        items: [
            { id: 'calculator', icon: '🧮', title: 'حاسبة الربحية والتعادل' },
            { id: 'ai',         icon: '🤖', title: 'مساعد الذكاء الاصطناعي' },
            { id: 'protools',   icon: '🧰', title: 'ترسانة الميديا باير' },
            { id: 'extras',     icon: '⚙️', title: 'A/B Testing • Notes' },
        ]
    },
];

export default function Sidebar({ activeTab, setActiveTab, progress }) {
    const [searchQuery, setSearchQuery] = useState('');


    const filteredGroups = MENU_GROUPS.map(group => ({
        ...group,
        items: group.items.filter(item =>
            (item.title || '').toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(g => g.items.length > 0);

    const [expandedGroups, setExpandedGroups] = useState(() => {
        const init = {};
        MENU_GROUPS.forEach((_, i) => init[i] = true);
        return init;
    });

    const toggleGroup = (idx) => {
        setExpandedGroups(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    return (
        <aside className="sidebar-container">
            {/* Progress Ring */}
            <div className="sidebar-progress-block">
                <div className="sidebar-progress-ring">
                    <svg viewBox="0 0 60 60" width="60" height="60">
                        <circle cx="30" cy="30" r="24" fill="none" stroke="var(--glass-border)" strokeWidth="5" />
                        <circle
                            cx="30" cy="30" r="24" fill="none"
                            stroke="url(#prog-grad)" strokeWidth="5"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 24}`}
                            strokeDashoffset={`${2 * Math.PI * 24 * (1 - progress / 100)}`}
                            transform="rotate(-90 30 30)"
                            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                        />
                        <defs>
                            <linearGradient id="prog-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0052ff" />
                                <stop offset="100%" stopColor="#00f0ff" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="sidebar-progress-pct">{progress}%</span>
                </div>
                <div className="sidebar-progress-label">
                    <span>اكتمال الخطة</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {progress < 30 ? 'ابدأ بملء البيانات' : progress < 70 ? 'استمر، أنت في المنتصف!' : 'رائع! الخطة شبه جاهزة 🎉'}
                    </span>
                </div>
            </div>

            {/* Search */}
            <input
                type="text"
                className="sidebar-search-box"
                placeholder="🔍 بحث في القسم..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Nav */}
            <nav className="sidebar-menu-list">
                {filteredGroups.map((group, gi) => (
                    <div key={gi} className="sidebar-group">
                        <h4 
                            className="sidebar-group-title" 
                            onClick={() => toggleGroup(gi)}
                            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            title="انقر لطي/توسيع القسم"
                        >
                            <span>{group.title}</span>
                            <span style={{ fontSize: '0.65rem', opacity: 0.6, transition: 'transform 0.2s', transform: expandedGroups[gi] ? 'rotate(0deg)' : 'rotate(90deg)' }}>
                                ▼
                            </span>
                        </h4>
                        
                        <div style={{
                            maxHeight: expandedGroups[gi] ? '500px' : '0',
                            overflow: 'hidden',
                            transition: 'max-height 0.3s ease, opacity 0.3s ease',
                            opacity: expandedGroups[gi] ? 1 : 0
                        }}>
                            {group.items.map(item => (
                                <button
                                    key={item.id}
                                    className={`sidebar-menu-button ${activeTab === item.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(item.id)}
                                >
                                    <span className="sidebar-item-icon">{item.icon}</span>
                                    <span>{item.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
}
