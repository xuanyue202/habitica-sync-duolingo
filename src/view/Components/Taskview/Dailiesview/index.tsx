import * as React from "react";
import DailyItem from "./DailyItem"
import "../taskview.css";

// Tab data interface
interface TabData {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export default function Index(props: any){
    const [activeTab, setActiveTab] = React.useState("active");
    const { i18n } = props.plugin || { i18n: undefined };

    if(props.dailys === undefined) {
        return (
            <div className="duolingo-empty-state">
                <div className="duolingo-card">
                    <img src="https://d35aaqx5ub95lt.cloudfront.net/images/owls/medal-empty.svg" alt="No dailies" width="120" />
                    <h3>{i18n?.t("view.tasks.noDailies") || "No dailies"}</h3>
                    <p>{i18n?.t("view.tasks.addDailiesMessage") || "Add some dailies to start your habit-building journey!"}</p>
                </div>
            </div>
        );
    }

    // Define tab data
    const tabs: TabData[] = [
        { 
            id: "active", 
            label: i18n?.t("view.tasks.active") || "Active", 
            icon: "pending_actions", 
            color: "#58cc02" 
        },  // Green
        { 
            id: "completed", 
            label: i18n?.t("view.tasks.completed") || "Completed", 
            icon: "task_alt", 
            color: "#1cb0f6" 
        },     // Blue
        { 
            id: "notdue", 
            label: i18n?.t("view.tasks.notdue") || "Not Due", 
            icon: "event_available", 
            color: "#ff9600" 
        }, // Orange
        { 
            id: "all", 
            label: i18n?.t("view.tasks.all") || "All", 
            icon: "list_alt", 
            color: "#ce82ff" 
        }             // Purple
    ];

    // Handle tab change
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    // Filter not due dailies
    const notDueDailies = props.dailys.map((daily: any) => {
        if (!daily.isDue) {
            const daily_notes = props.settings.showTaskDescription ? daily.notes : '';
            const daily_subtasks = props.settings.showSubTasks ? daily.checklist : '';
            
            return <DailyItem 
                key={daily.id} 
                id={daily.id} 
                daily_text={daily.text}
                daily_notes={daily_notes} 
                daily_subtasks={daily_subtasks}
                onChange={props.onChange} 
                completed={daily.completed} 
                onChangeChecklistItem={props.onChangeChecklistItem}
            />;
        }
        return null;
    }).filter(Boolean);

    // Filter incomplete and due dailies
    const incompleteDailies = props.dailys.map((daily: any) => {
        if (!daily.completed && daily.isDue) {
            const daily_notes = props.settings.showTaskDescription ? daily.notes : '';
            const daily_subtasks = props.settings.showSubTasks ? daily.checklist : '';
            
            return <DailyItem 
                key={daily.id} 
                id={daily.id} 
                daily_text={daily.text}
                daily_notes={daily_notes} 
                daily_subtasks={daily_subtasks}
                onChange={props.onChange} 
                completed={daily.completed} 
                onChangeChecklistItem={props.onChangeChecklistItem}
            />;
        }
        return null;
    }).filter(Boolean);

    // Filter completed dailies
    const completedDailies = props.dailys.map((daily: any) => {
        if (daily.completed) {
            const daily_notes = props.settings.showTaskDescription ? daily.notes : '';
            const daily_subtasks = props.settings.showSubTasks ? daily.checklist : '';
            
            return <DailyItem 
                key={daily.id} 
                id={daily.id} 
                daily_text={daily.text}
                daily_notes={daily_notes} 
                daily_subtasks={daily_subtasks}
                onChange={props.onChange} 
                completed={daily.completed} 
                onChangeChecklistItem={props.onChangeChecklistItem}
            />;
        }
        return null;
    }).filter(Boolean);

    // All dailies
    const allDailies = props.dailys.map((daily: any) => {
        const daily_notes = props.settings.showTaskDescription ? daily.notes : '';
        const daily_subtasks = props.settings.showSubTasks ? daily.checklist : '';
        
        return <DailyItem 
            key={daily.id} 
            id={daily.id} 
            daily_text={daily.text}
            daily_notes={daily_notes} 
            daily_subtasks={daily_subtasks}
            onChange={props.onChange} 
            completed={daily.completed} 
            onChangeChecklistItem={props.onChangeChecklistItem}
        />;
    });
    
    // Task counts
    const activeCount = incompleteDailies.length;
    const completedCount = completedDailies.length;
    const notDueCount = notDueDailies.length;
    const totalCount = allDailies.length;
    
    return (
        <div className="duolingo-dailies">
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
                                {tab.id === "active" && activeCount}
                                {tab.id === "completed" && completedCount}
                                {tab.id === "notdue" && notDueCount}
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
                        {incompleteDailies.length > 0 ? (
                            incompleteDailies
                        ) : (
                            <div className="duolingo-empty-message" style={{"--tab-color": "#58cc02"} as React.CSSProperties}>
                                <span className="material-icons">celebration</span>
                                <p>{i18n?.t("view.tasks.allDailiesDone") || "Great! You have completed all your dailies for today!"}</p>
                            </div>
                        )}
                    </div>
                )}
                
                {activeTab === "completed" && (
                    <div className="duolingo-task-list">
                        {completedDailies.length > 0 ? (
                            completedDailies
                        ) : (
                            <div className="duolingo-empty-message" style={{"--tab-color": "#1cb0f6"} as React.CSSProperties}>
                                <span className="material-icons">pending_actions</span>
                                <p>{i18n?.t("view.tasks.noDailiesCompleted") || "You haven't completed any dailies yet, keep going!"}</p>
                            </div>
                        )}
                    </div>
                )}
                
                {activeTab === "notdue" && (
                    <div className="duolingo-task-list">
                        {notDueDailies.length > 0 ? (
                            notDueDailies
                        ) : (
                            <div className="duolingo-empty-message" style={{"--tab-color": "#ff9600"} as React.CSSProperties}>
                                <span className="material-icons">event_available</span>
                                <p>{i18n?.t("view.tasks.allTasksScheduled") || "All tasks are scheduled, complete them on time!"}</p>
                            </div>
                        )}
                    </div>
                )}
                
                {activeTab === "all" && (
                    <div className="duolingo-task-list">
                        {allDailies.length > 0 ? (
                            allDailies
                        ) : (
                            <div className="duolingo-empty-message" style={{"--tab-color": "#ce82ff"} as React.CSSProperties}>
                                <span className="material-icons">calendar_today</span>
                                <p>{i18n?.t("view.tasks.noDailies") || "No dailies"}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
