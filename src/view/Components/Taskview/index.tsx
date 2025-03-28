import * as React from "react";
import Dailiesview from "./Dailiesview"
import Habitsview from "./Habitsview"
import Todoview from "./Todoview"
import Rewardview from "./Rewardview"
import "./taskview.css"; // Import new CSS style file

// Custom SVG icon components
const DuolingoIcons = {
    // Daily tasks icon - calendar style
    DailyIcon: () => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="6" width="24" height="22" rx="3" stroke="currentColor" strokeWidth="2.5" />
            <rect x="8" y="2" width="2" height="6" rx="1" fill="currentColor" />
            <rect x="22" y="2" width="2" height="6" rx="1" fill="currentColor" />
            <line x1="4" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="16" cy="19" r="4" fill="currentColor" />
        </svg>
    ),
    // Habits icon - chart with upward trend
    HabitIcon: () => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="2.5" />
            <polyline points="8,20 14,14 18,16 24,10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="24" cy="10" r="2" fill="currentColor" />
        </svg>
    ),
    // To-Do icon - list with checkboxes
    TodoIcon: () => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="2.5" />
            <rect x="8" y="10" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
            <line x1="16" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="8" y="18" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
            <line x1="16" y1="20" x2="24" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    ),
    // Rewards icon - treasure chest/trophy style
    RewardIcon: () => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4L19 10H27L21 14L23 22L16 18L9 22L11 14L5 10H13L16 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="16" cy="16" r="3" fill="currentColor" />
        </svg>
    )
};

// Define tab data structure
interface TabItem {
    id: number;
    icon: React.ReactNode;
    label: string;
    color: string;
}

export default function Index(props: any){
    // Use basic state management to handle tab switching
    const [activeTab, setActiveTab] = React.useState(0);
    const { i18n } = props.plugin;
    
    // Define tab data
    const tabs: TabItem[] = [
        { id: 0, icon: <DuolingoIcons.DailyIcon />, label: i18n.t("view.tasks.dailies"), color: "#58cc02" },        // Green - Duolingo primary color
        { id: 1, icon: <DuolingoIcons.HabitIcon />, label: i18n.t("view.tasks.habits"), color: "#1cb0f6" },        // Blue
        { id: 2, icon: <DuolingoIcons.TodoIcon />, label: i18n.t("view.tasks.todos"), color: "#ff9600" }, // Orange
        { id: 3, icon: <DuolingoIcons.RewardIcon />, label: i18n.t("view.tasks.rewards"), color: "#ce82ff" }    // Purple
    ];
    
    // Simple click handler function
    const handleTabChange = (index: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveTab(index);
    };

    return (
        <div className="duolingo-taskview">
            {/* Tab navigation */}
            <div className="duolingo-tabs">
                {tabs.map((tab) => (
                    <div 
                        key={tab.id}
                        onClick={(e) => handleTabChange(tab.id, e)} 
                        className={`duolingo-tab ${activeTab === tab.id ? 'active' : ''}`}
                        style={activeTab === tab.id ? {
                            "--tab-color": tab.color,
                            color: tab.color
                        } as React.CSSProperties : {}}
                    >
                        <div className="duolingo-tab-icon">{tab.icon}</div>
                        <span className="tab-label">{tab.label}</span>
                    </div>
                ))}
            </div>
            
            {/* Tab content */}
            <div className="duolingo-tab-content">
                {activeTab === 0 && 
                    <Dailiesview 
                        dailys={props.data.dailys} 
                        settings={props.settings} 
                        onChange={props.handleChangeDailys} 
                        onChangeChecklistItem={props.handleChangeChecklistItem}
                        plugin={props.plugin}
                    />
                }
                {activeTab === 1 && 
                    <Habitsview 
                        habits={props.data.habits} 
                        settings={props.settings} 
                        onChange={props.handleChangeHabits}
                        onToggleHabit={props.handleToggleHabit}
                        plugin={props.plugin}
                    />
                }
                {activeTab === 2 && 
                    <Todoview 
                        todos={props.data.todos} 
                        settings={props.settings} 
                        onChange={props.handleChangeTodos} 
                        onChangeChecklistItem={props.handleChangeChecklistItem}
                        plugin={props.plugin}
                    />
                }
                {activeTab === 3 && 
                    <Rewardview 
                        rewards={props.data.rewards} 
                        settings={props.settings} 
                        onChange={props.handleChangeRewards} 
                        onRewardPurchase={props.handleRewardPurchase}
                        userGold={props.data.gold || 0}
                        plugin={props.plugin}
                    />
                }
            </div>
        </div>
    );
}                 

