import * as React from "react";
import DailySubTasks from "./DailySubTasks";
import renderMarkdown from "../markdownRender";

function DailyItem(props: any) {
    const [isHovered, setIsHovered] = React.useState(false);
    
    const text_html = renderMarkdown(props.daily_text);
    const note_html = renderMarkdown(props.daily_notes);
    
    // Determine the color based on task completion status
    const statusColor = props.completed 
        ? "var(--duolingo-green)" 
        : "var(--duolingo-light-gray)";
    
    return (
        <div 
            className="todo-item" 
            id={props.id}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                borderLeft: `4px solid ${statusColor}`,
                transform: isHovered ? 'translateY(-2px)' : 'none'
            }}
        >
            <input 
                type="checkbox" 
                className="checkbox" 
                id={props.id} 
                onChange={props.onChange} 
                checked={props.completed} 
            />
            <div className="todo-item-content">
                <p className="todo-item-title">
                    <span dangerouslySetInnerHTML={{__html: text_html}}></span>
                </p>
                {props.daily_notes && (
                    <div className="description" dangerouslySetInnerHTML={{__html: note_html}}></div>
                )}
                
                {props.daily_subtasks && props.daily_subtasks.length > 0 && (
                    <div className="subtasks-container">
                        <DailySubTasks 
                            key={props.id} 
                            subtasks={props.daily_subtasks} 
                            onChangeChecklistItem={props.onChangeChecklistItem}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default DailyItem;