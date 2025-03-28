import * as React from "react";
import renderMarkdown from "../markdownRender";

// Custom SVG icon component - Gold coin
const DuolingoGoldIcon = () => (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="#FFF9E5" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx="16" cy="16" r="8" fill="#FFFFFF" />
        <path d="M14 13V19M18 13V19" stroke="#FFF9E5" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

function RewardItem(props: any) {
    const [isHovered, setIsHovered] = React.useState(false);
    const i18n = props.i18n;
    
    // Use the provided text and notes properties
    const text = renderMarkdown(props.text);
    const notes = renderMarkdown(props.notes);
    
    // Set different colors based on reward value
    let priceColor = "var(--duolingo-green)";
    if (props.value > 50) {
        priceColor = "var(--duolingo-purple)";
    } else if (props.value > 20) {
        priceColor = "var(--duolingo-orange)";
    }
    
    // Check if user has enough gold to purchase this reward
    const canAfford = props.userGold >= props.value;
    
    return (
        <div 
            className="duolingo-reward-item" 
            id={props.id}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transform: isHovered ? 'translateY(-2px)' : 'none',
                boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'var(--duolingo-shadow)'
            }}
        >
            <div className="reward-content">
                <div className="reward-text-container">
                    <p className="reward-text">
                        <span dangerouslySetInnerHTML={{__html: text}}></span>
                    </p>
                    {props.notes && (
                        <div className="reward-description" dangerouslySetInnerHTML={{__html: notes}}></div>
                    )}
                </div>
                
                <div className="reward-price-container">
                    <button 
                        className="duolingo-reward-button" 
                        id={props.id} 
                        onClick={() => props.onRewardPurchase(props.id, props.value)}
                        aria-label={i18n?.t("view.rewards.buyReward") || "Purchase Reward"}
                        style={{ 
                            backgroundColor: priceColor,
                            opacity: canAfford ? 1 : 0.5,
                            cursor: canAfford ? 'pointer' : 'not-allowed'
                        }}
                        disabled={!canAfford}
                    >
                        <DuolingoGoldIcon />
                        <span className="price">{props.value}</span>
                    </button>
                </div>
            </div>
            
            {/* Reward difficulty indicator */}
            <div className="reward-difficulty">
                <div 
                    className="reward-difficulty-indicator" 
                    style={{ 
                        width: `${Math.min(100, (props.value / 100) * 100)}%`,
                        backgroundColor: priceColor
                    }}
                ></div>
            </div>
        </div>
    );
}

export default RewardItem;