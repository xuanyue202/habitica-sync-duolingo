import * as React from "react";
import TodoItem from "./TodoItem";
import "../taskview.css";

// Tab data interface
interface TabData {
  id: string;
  label: string;
  icon: string;
  color: string;
}

// Error boundary component props
interface ErrorBoundaryProps {
  children: React.ReactNode;
  i18n?: any;
}

// Error boundary component
class ErrorBoundary extends React.Component<ErrorBoundaryProps, {hasError: boolean, error: any}> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    
    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }
    
    componentDidCatch(error: any, errorInfo: any) {
        console.error("TaskView Error:", error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div className="duolingo-error">
                    <span className="material-icons">error_outline</span>
                    <h3>{this.props.i18n?.t("view.errorBoundary.title") || "Component Loading Error"}</h3>
                    <p>{this.props.i18n?.t("view.errorBoundary.description") || "Please check console for details"}</p>
                    <div className="error-details">{this.state.error?.toString()}</div>
                </div>
            );
        }
        
        return this.props.children;
    }
}

export default function Index(props: any){
    // Use React state to track active tab
    const [activeTab, setActiveTab] = React.useState("active");
    const { i18n } = props.plugin || { i18n: undefined };
    
    // If todos is undefined, display no tasks message
    if(props.todos === undefined) {
        return (
            <div className="duolingo-empty-state">
                <div className="duolingo-card">
                    <img src="https://d35aaqx5ub95lt.cloudfront.net/images/owls/tasks-empty.svg" alt="No todos" width="120" />
                    <h3>{i18n?.t("view.tasks.noTodos") || "No to-dos"}</h3>
                    <p>{i18n?.t("view.tasks.addTodosMessage") || "Add some to-dos to start your productivity journey!"}</p>
                </div>
            </div>
        );
    }
    
    // Filter incomplete todos
    const incompleteTodos = props.todos
        .filter((todo: any) => !todo.completed)
        .map((todo: any) => {
            const todo_notes = props.settings.showTaskDescription ? todo.notes : '';
            const todo_subtasks = props.settings.showSubTasks ? todo.checklist : '';
            
            return (
                <ErrorBoundary key={todo.id} i18n={i18n}>
                    <TodoItem 
                        key={todo.id} 
                        id={todo.id} 
                        todo_text={todo.text} 
                        todo_notes={todo_notes} 
                        todo_subtasks={todo_subtasks}
                        onChange={props.onChange} 
                        onChangeChecklistItem={props.onChangeChecklistItem} 
                        completed={todo.completed} 
                        dueDate={todo.date} 
                        dueDateFormat={props.settings.dueDateFormat}
                    />
                </ErrorBoundary>
            );
        });
    
    // Filter completed todos
    const completedTodos = props.todos
        .filter((todo: any) => todo.completed)
        .map((todo: any) => {
            const todo_notes = props.settings.showTaskDescription ? todo.notes : '';
            const todo_subtasks = props.settings.showSubTasks ? todo.checklist : '';
            
            return (
                <ErrorBoundary key={todo.id} i18n={i18n}>
                    <TodoItem 
                        key={todo.id} 
                        id={todo.id} 
                        todo_text={todo.text} 
                        todo_notes={todo_notes} 
                        todo_subtasks={todo_subtasks}
                        onChange={props.onChange} 
                        onChangeChecklistItem={props.onChangeChecklistItem}
                        completed={todo.completed}
                        dueDate={todo.date}
                        dueDateFormat={props.settings.dueDateFormat}
                    />
                </ErrorBoundary>
            );
        });
    
    // Todos with due date
    const withDueDateTodos = props.todos
        .filter((todo: any) => todo.date && !todo.completed)
        .map((todo: any) => {
            const todo_notes = props.settings.showTaskDescription ? todo.notes : '';
            const todo_subtasks = props.settings.showSubTasks ? todo.checklist : '';
            
            return (
                <ErrorBoundary key={todo.id} i18n={i18n}>
                    <TodoItem 
                        key={todo.id} 
                        id={todo.id} 
                        todo_text={todo.text} 
                        todo_notes={todo_notes} 
                        todo_subtasks={todo_subtasks}
                        onChange={props.onChange} 
                        onChangeChecklistItem={props.onChangeChecklistItem}
                        completed={todo.completed}
                        dueDate={todo.date}
                        dueDateFormat={props.settings.dueDateFormat}
                    />
                </ErrorBoundary>
            );
        });
    
    // Task counts
    const incompleteCount = incompleteTodos.length;
    const completedCount = completedTodos.length;
    const withDueDateCount = withDueDateTodos.length;
    const totalCount = props.todos.length;
    
    // Define tab data
    const tabs: TabData[] = [
        { 
            id: "active", 
            label: i18n?.t("view.tasks.incomplete") || "Incomplete", 
            icon: "pending_actions", 
            color: "#58cc02" 
        },
        { 
            id: "completed", 
            label: i18n?.t("view.tasks.completed") || "Completed", 
            icon: "task_alt", 
            color: "#1cb0f6" 
        },
        { 
            id: "due", 
            label: i18n?.t("view.tasks.withDueDate") || "With Due Date", 
            icon: "event", 
            color: "#ff9600" 
        },
        { 
            id: "all", 
            label: i18n?.t("view.tasks.all") || "All", 
            icon: "list_alt", 
            color: "#ce82ff" 
        }
    ];
    
    // Handle tab change
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };
    
    return (
        <div className="duolingo-todos">
            {/* Tab navigation */}
            <div className="duolingo-sub-tabs">
                {tabs.map((tab) => {
                    // Find the current tab color
                    const currentTabColor = tab.color;
                    
                    return (
                        <div 
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)} 
                            className={`duolingo-sub-tab ${activeTab === tab.id ? 'active' : ''}`}
                            style={activeTab === tab.id ? {
                                "--tab-color": currentTabColor,
                                backgroundColor: currentTabColor
                            } as React.CSSProperties : {}}
                        >
                            <span className="material-icons">{tab.icon}</span>
                            <span className="tab-label">{tab.label}</span>
                            <span className="tab-count">
                                {tab.id === "active" && incompleteCount}
                                {tab.id === "completed" && completedCount}
                                {tab.id === "due" && withDueDateCount}
                                {tab.id === "all" && totalCount}
                            </span>
                        </div>
                    );
                })}
            </div>
            
            {/* Tab content */}
            <div className="duolingo-tab-content">
                {activeTab === "active" && (
                    <div className="duolingo-task-list">
                        {incompleteTodos.length > 0 ? (
                            incompleteTodos
                        ) : (
                            <div className="duolingo-empty-message" style={{"--tab-color": "#58cc02"} as React.CSSProperties}>
                                <span className="material-icons">celebration</span>
                                <p>{i18n?.t("view.tasks.allTodosDone") || "Great! You have completed all your to-dos!"}</p>
                            </div>
                        )}
                    </div>
                )}
                
                {activeTab === "completed" && (
                    <div className="duolingo-task-list">
                        {completedTodos.length > 0 ? (
                            completedTodos
                        ) : (
                            <div className="duolingo-empty-message" style={{"--tab-color": "#1cb0f6"} as React.CSSProperties}>
                                <span className="material-icons">pending_actions</span>
                                <p>{i18n?.t("view.tasks.noTodosCompleted") || "You haven't completed any to-dos yet, keep going!"}</p>
                            </div>
                        )}
                    </div>
                )}
                
                {activeTab === "due" && (
                    <div className="duolingo-task-list">
                        {withDueDateTodos.length > 0 ? (
                            withDueDateTodos
                        ) : (
                            <div className="duolingo-empty-message" style={{"--tab-color": "#ff9600"} as React.CSSProperties}>
                                <span className="material-icons">event_available</span>
                                <p>{i18n?.t("view.tasks.noTodosWithDueDate") || "You don't have any to-dos with a due date."}</p>
                            </div>
                        )}
                    </div>
                )}
                
                {activeTab === "all" && (
                    <div className="duolingo-task-list">
                        {props.todos.length > 0 ? (
                            props.todos.map((todo: any) => {
                                const todo_notes = props.settings.showTaskDescription ? todo.notes : '';
                                const todo_subtasks = props.settings.showSubTasks ? todo.checklist : '';
                                
                                return (
                                    <ErrorBoundary key={todo.id} i18n={i18n}>
                                        <TodoItem 
                                            key={todo.id} 
                                            id={todo.id} 
                                            todo_text={todo.text} 
                                            todo_notes={todo_notes} 
                                            todo_subtasks={todo_subtasks}
                                            onChange={props.onChange} 
                                            onChangeChecklistItem={props.onChangeChecklistItem}
                                            completed={todo.completed}
                                            dueDate={todo.date}
                                            dueDateFormat={props.settings.dueDateFormat}
                                        />
                                    </ErrorBoundary>
                                );
                            })
                        ) : (
                            <div className="duolingo-empty-message" style={{"--tab-color": "#ce82ff"} as React.CSSProperties}>
                                <span className="material-icons">list</span>
                                <p>{i18n?.t("view.tasks.noTodos") || "No to-dos"}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}