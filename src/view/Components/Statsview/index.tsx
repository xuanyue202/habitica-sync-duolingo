import * as React from 'react';
import './index.css';

// Custom SVG icon components
const DuolingoStatIcons = {
    // HP icon - heart shape
    HPIcon: () => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 26C16 26 4 19.6569 4 11.7778C4 7.46659 7.58172 4 12 4C13.8487 4 15.5509 4.64552 16.9576 5.71938C18.3643 4.64552 20.0666 4 21.9153 4C26.3336 4 30 7.46659 30 11.7778C30 19.6569 16 26 16 26Z" 
                fill="#FFECEC" stroke="#FF4B4B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    // Level icon - level badge
    LevelIcon: () => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 3L19.5 10.5H28L21.5 15.5L24 23.5L16 18.5L8 23.5L10.5 15.5L4 10.5H12.5L16 3Z" 
                fill="#E6F4FF" stroke="#1CB0F6" strokeWidth="2.5" strokeLinejoin="round"/>
            <circle cx="16" cy="16" r="3" fill="#1CB0F6" />
        </svg>
    ),
    // Gold icon - coin
    GoldIcon: () => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="12" fill="#FFF9E5" stroke="#FF9600" strokeWidth="2.5" />
            <circle cx="16" cy="16" r="8" fill="#FF9600" />
            <path d="M14 13V19M18 13V19" stroke="#FFF9E5" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
};

export default function Index(props: any) {
    const { i18n } = props.plugin || { i18n: undefined };
    
    return(
        <div className="duolingo-statsview">
            {/* HP Statistics */}
            <div className="duolingo-stat hp">
                <div className="duolingo-stat-icon">
                    <DuolingoStatIcons.HPIcon />
                </div>
                <div className="duolingo-stat-text">
                    <span className="duolingo-stat-label">{i18n?.t("view.stats.health") || "Health"}</span>
                    <span className="duolingo-stat-value">{numberWithCommas((props.user_data.stats.hp).toFixed(0))}</span>
                </div>
            </div>
            
            {/* Level Statistics */}
            <div className="duolingo-stat level">
                <div className="duolingo-stat-icon">
                    <DuolingoStatIcons.LevelIcon />
                </div>
                <div className="duolingo-stat-text">
                    <span className="duolingo-stat-label">{i18n?.t("view.stats.level") || "Level"}</span>
                    <span className="duolingo-stat-value">{props.user_data.stats.lvl}</span>
                </div>
            </div>
            
            {/* Gold Statistics */}
            <div className="duolingo-stat gold">
                <div className="duolingo-stat-icon">
                    <DuolingoStatIcons.GoldIcon />
                </div>
                <div className="duolingo-stat-text">
                    <span className="duolingo-stat-label">{i18n?.t("view.stats.gold") || "Gold"}</span>
                    <span className="duolingo-stat-value">{numberWithCommas(props.user_data.stats.gp.toFixed(2))}</span>
                </div>
            </div>
        </div>
    );
}

// Format number with commas (e.g. 1,234)
function numberWithCommas(x: any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}