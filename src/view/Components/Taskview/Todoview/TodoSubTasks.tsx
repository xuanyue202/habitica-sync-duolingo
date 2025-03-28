import * as React from "react";
import renderMarkdown from "../markdownRender";

function TodoSubTasks(props: any) {
    // Add subtask checkbox event handler
    const handleSubtaskChange = (e: React.ChangeEvent<HTMLInputElement>, subtask: any) => {
        // Prevent event bubbling and default behavior
        e.stopPropagation();
        e.preventDefault();
        
        // Call the onChange handler passed from the parent component
        if (props.onChange) {
            props.onChange(e);
        }
    };

    if (props.subtasks && props.subtasks.length > 0) {
        const completedCount = props.subtasks.filter((subtask: any) => subtask.completed).length;
        const totalCount = props.subtasks.length;
        const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
        
        const subtasks = props.subtasks.map((subtask: any) => {
            // Ensure text is a string
            const subtaskText = subtask && subtask.text ? subtask.text : '';
            let subtask_text = renderMarkdown(subtaskText);
            
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
                        type="checkbox" 
                        className="checkbox-checklist" 
                        onChange={(e) => handleSubtaskChange(e, subtask)} 
                        checked={subtask.completed} 
                        id={subtask.id}
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
                    <span>子任务 ({completedCount}/{totalCount})</span>
                </div>
                
                <div className="duolingo-progress" style={{margin: '8px 0 12px'}}>
                    <div 
                        className="duolingo-progress-bar" 
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                
                <div className="subtasks-list">
                    {subtasks}
                </div>
            </div>
        );
    }
    
    return null;
}

export default TodoSubTasks;