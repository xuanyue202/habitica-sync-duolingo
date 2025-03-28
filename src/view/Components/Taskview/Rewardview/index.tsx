import * as React from "react";
import RewardItem from "./RewardItem";
import "../taskview.css";

// Custom SVG icon component - Gold coin
const DuolingoGoldIcon = () => (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="#FFF9E5" stroke="#FF9600" strokeWidth="2.5" />
        <circle cx="16" cy="16" r="8" fill="#FF9600" />
        <path d="M14 13V19M18 13V19" stroke="#FFF9E5" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

// Tab data interface definition
interface TabData {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export default function Index(props: any) {
    // Use React state to track active tab
    const [activeTab, setActiveTab] = React.useState("custom");
    // Ensure i18n instance is available
    const i18n = props.plugin?.i18n;
    
    // If rewards is undefined, display no rewards message
    if (props.rewards === undefined) {
        return (
            <div className="duolingo-empty-state">
                <div className="duolingo-card">
                    <img src="https://d35aaqx5ub95lt.cloudfront.net/images/owls/rewards-empty.svg" alt="No rewards" width="120" />
                    <h3>{i18n?.t("view.rewards.noRewards") || "No rewards"}</h3>
                    <p>{i18n?.t("view.rewards.addRewardsMessage") || "Add some rewards to motivate yourself to complete tasks!"}</p>
                </div>
            </div>
        );
    }
    
    // Filter custom rewards and default rewards
    const customRewards = props.rewards.filter((reward: any) => reward.type === "reward");
    const defaultRewards = props.rewards.filter((reward: any) => reward.type !== "reward");
    
    // Render reward item
    const renderRewardItem = (reward: any) => {
        const reward_notes = props.settings.showTaskDescription ? reward.notes : '';
        
        return (
            <RewardItem
                key={reward.id}
                id={reward.id}
                text={reward.text}
                notes={reward_notes}
                value={reward.value}
                onRewardPurchase={props.onRewardPurchase}
                userGold={props.userGold}
                onChange={props.onChange}
                i18n={i18n}
            />
        );
    };
    
    // Define tab data
    const tabs: TabData[] = [
        { 
            id: "custom", 
            label: i18n?.t("view.rewards.customRewards") || "Custom Rewards", 
            icon: "emoji_events", 
            color: "#ff9600" 
        },
        { 
            id: "default", 
            label: i18n?.t("view.rewards.defaultRewards") || "Default Rewards", 
            icon: "auto_awesome", 
            color: "#4c4c4c" 
        }
    ];
    
    // Handle tab change
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };
    
    return (
        <div className="duolingo-rewards">
            {/* User gold display */}
            <div className="duolingo-rewards-gold">
                <div className="duolingo-gold-display">
                    <DuolingoGoldIcon />
                    <span>{props.userGold.toFixed(2)}</span>
                </div>
                <p>{i18n?.t("view.rewards.availableGold") || "Available Gold"}</p>
            </div>
            
            {/* Tab navigation */}
            <div className="duolingo-sub-tabs">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`duolingo-sub-tab ${activeTab === tab.id ? 'active' : ''}`}
                        style={activeTab === tab.id ? {
                            "--tab-color": tab.color,
                            backgroundColor: tab.color
                        } as React.CSSProperties : {}}
                    >
                        <span className="material-icons">{tab.icon}</span>
                        <span className="tab-label">{tab.label}</span>
                        <span className="tab-count">
                            {tab.id === "custom" && customRewards.length}
                            {tab.id === "default" && defaultRewards.length}
                        </span>
                    </div>
                ))}
            </div>
            
            {/* Tab content */}
            <div className="duolingo-tab-content">
                {activeTab === "custom" && (
                    <div className="duolingo-reward-list">
                        {customRewards.length > 0 ? (
                            customRewards.map(renderRewardItem)
                        ) : (
                            <div className="duolingo-empty-message" style={{"--tab-color": "#ff9600"} as React.CSSProperties}>
                                <span className="material-icons">card_giftcard</span>
                                <p>{i18n?.t("view.rewards.noCustomRewards") || "You haven't added any custom rewards yet"}</p>
                            </div>
                        )}
                    </div>
                )}
                
                {activeTab === "default" && (
                    <div className="duolingo-reward-list">
                        {defaultRewards.length > 0 ? (
                            defaultRewards.map(renderRewardItem)
                        ) : (
                            <div className="duolingo-empty-message" style={{"--tab-color": "#4c4c4c"} as React.CSSProperties}>
                                <span className="material-icons">card_giftcard</span>
                                <p>{i18n?.t("view.rewards.noDefaultRewards") || "No default rewards available"}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

