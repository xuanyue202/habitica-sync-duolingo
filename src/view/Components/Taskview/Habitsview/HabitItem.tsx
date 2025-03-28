import * as React from "react";
import renderMarkdown from "../markdownRender";

function HabitItem(props: any) {
    const [isHovered, setIsHovered] = React.useState(false);
    
    const text = renderMarkdown(props.text);
    const notes = renderMarkdown(props.notes);
    
    // Determine color based on habit count
    const hasPositive = props.upCount > 0;
    const hasNegative = props.downCount > 0;
    
    let statusColor = "var(--duolingo-light-gray)";
    
    if (hasPositive && !hasNegative) {
        statusColor = "var(--duolingo-green)"; // Positive behavior only
    } else if (!hasPositive && hasNegative) {
        statusColor = "var(--duolingo-red)"; // Negative behavior only
    } else if (hasPositive && hasNegative) {
        statusColor = "var(--duolingo-blue)"; // Both positive and negative behaviors
    }
    
    return (
        <div 
            className="duolingo-habit-item" 
            id={props.id}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                borderLeft: `4px solid ${statusColor}`,
                transform: isHovered ? 'translateY(-2px)' : 'none',
                boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'var(--duolingo-shadow)'
            }}
        >
            <div className="habit-content">
                <div className="habit-text-container">
                    <p className="habit-text">
                        <span dangerouslySetInnerHTML={{__html: text}}></span>
                    </p>
                    {props.notes && (
                        <div className="habit-description" dangerouslySetInnerHTML={{__html: notes}}></div>
                    )}
                </div>
                
                <div className="habit-actions">
                    <button 
                        className="duolingo-habit-button positive" 
                        id={"plus" + props.id} 
                        onClick={() => props.onToggle(props.id, 'up')}
                        aria-label="增加积极行为"
                    >
                        <span className="material-icons">add</span>
                        <span className="count">{props.upCount}</span>
                    </button>
                    <button 
                        className="duolingo-habit-button negative" 
                        id={"mins" + props.id} 
                        onClick={() => props.onToggle(props.id, 'down')}
                        aria-label="增加消极行为"
                    >
                        <span className="material-icons">remove</span>
                        <span className="count">{props.downCount}</span>
                    </button>
                </div>
            </div>
            
            {/* 简单的进度条，表示积极/消极的比例 */}
            {(props.upCount > 0 || props.downCount > 0) && (
                <div className="habit-progress">
                    <div 
                        className="habit-progress-positive" 
                        style={{
                            width: `${props.upCount / (props.upCount + props.downCount) * 100}%`
                        }}
                    ></div>
                </div>
            )}
        </div>
    );
}

export default HabitItem;