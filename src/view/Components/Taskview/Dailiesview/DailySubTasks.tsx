import * as React from "react";
import renderMarkdown from "../markdownRender";

function DailySubTasks(props: any) {
    if (props.subtasks && props.subtasks.length > 0) {
        const subtasks = props.subtasks.map((subtask: any) => {
            const subtask_text = renderMarkdown(subtask.text);
            
            // Color for subtask completion status
            const statusColor = subtask.completed 
                ? "var(--duolingo-blue)" 
                : "var(--duolingo-light-gray)";
                
            return (
                <div 
                    className="subtask" 
                    id={subtask.id} 
                    key={subtask.id}
                    style={{
                        opacity: subtask.completed ? 0.7 : 1,
                        textDecoration: subtask.completed ? 'line-through' : 'none'
                    }}
                >
                    <input 
                        id={subtask.id} 
                        type="checkbox" 
                        className="checkbox-checklist" 
                        onChange={props.onChangeChecklistItem} 
                        checked={subtask.completed} 
                    />
                    <p 
                        id={subtask.id}
                        className="subtask-text"
                    >
                        <span dangerouslySetInnerHTML={{__html: subtask_text}}></span>
                    </p>
                </div>
            );
        });
        
        return (
            <div className="duolingo-subtasks">
                <div className="subtasks-header">
                    <span className="material-icons" style={{fontSize: '16px', marginRight: '6px'}}>checklist</span>
                    <span>子任务 ({props.subtasks.filter((s: any) => s.completed).length}/{props.subtasks.length})</span>
                </div>
                <div className="subtasks-list">
                    {subtasks}
                </div>
            </div>
        );
    }
    
    return null;
}

export default DailySubTasks;