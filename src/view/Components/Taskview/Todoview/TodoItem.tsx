import * as React from "react";
import TodoSubTasks from "./TodoSubTasks";
import renderMarkdown from "../markdownRender"
import moment from "moment";

function TodoItem(props: any) {
    const [isHovered, setIsHovered] = React.useState(false);
    
    // Add click event handler
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Prevent event bubbling and default behavior
        e.stopPropagation();
        e.preventDefault();
        
        // Call the onChange handler passed from the parent component
        if (props.onChange) {
            props.onChange(e);
        }
    };
    
    // Render Markdown content, ensuring it's a string type
    const ensureString = (value: any): string => {
        if (value === undefined || value === null) return '';
        return typeof value === 'string' ? value : String(value);
    };
    
    // Format due date
    let dueDateStr = "";
    let isOverdue = false;
    
    if (props.dueDate) {
        dueDateStr = moment(props.dueDate).format(props.dueDateFormat || "YYYY-MM-DD");
        isOverdue = moment().isAfter(moment(props.dueDate)) && !props.completed;
    }
    
    // Determine the color based on task completion status
    const statusColor = props.completed 
        ? "var(--duolingo-green)" 
        : isOverdue 
            ? "var(--duolingo-red)" 
            : "var(--duolingo-light-gray)";
    
    // Safely render Markdown
    let text_html = '';
    let note_html = '';
    
    try {
        const todoText = ensureString(props.todo_text);
        const todoNotes = ensureString(props.todo_notes);
        
        text_html = renderMarkdown(todoText);
        note_html = renderMarkdown(todoNotes);
    } catch (error) {
        console.error("Error rendering markdown in TodoItem:", error);
    }
    
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
                onChange={handleCheckboxChange} 
                checked={props.completed}
            />
            <div className="todo-item-content">
                <p className="todo-item-title">
                    <span dangerouslySetInnerHTML={{__html: text_html}}></span>
                </p>
                
                {props.todo_notes && (
                    <div className="description" dangerouslySetInnerHTML={{__html: note_html}}></div>
                )}
                
                {props.todo_subtasks && props.todo_subtasks.length > 0 && (
                    <div className="subtasks-container">
                        <TodoSubTasks 
                            todoID={props.id} 
                            subtasks={props.todo_subtasks} 
                            onChange={props.onChangeChecklistItem}
                        />
                    </div>
                )}
                
                {dueDateStr && (
                    <div className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                        <span className="material-icons">
                            {isOverdue ? 'event_busy' : 'event_available'}
                        </span>
                        <span className="due-date-text">
                            {isOverdue ? '已过期: ' : '截止日期: '}
                            {dueDateStr}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TodoItem