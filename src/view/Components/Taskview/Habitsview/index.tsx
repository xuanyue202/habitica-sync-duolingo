import * as React from "react";
import HabitItem from "./HabitItem";
import "../taskview.css";

export default function Index(props: any){
    const { i18n } = props.plugin || { i18n: undefined };
    
    if(props.habits === undefined) {
        return (
            <div className="duolingo-empty-state">
                <div className="duolingo-card">
                    <img src="https://d35aaqx5ub95lt.cloudfront.net/images/owls/streak-empty.svg" alt="No habits" width="120" />
                    <h3>{i18n?.t("view.tasks.noHabits") || "No habits"}</h3>
                    <p>{i18n?.t("view.tasks.addHabitsMessage") || "Add some habits to build consistent good habits!"}</p>
                </div>
            </div>
        );
    }
    
    // Categorize habits: active (clicked) and unused (never clicked)
    const activeHabits = props.habits.filter((habit: any) => 
        habit.counterUp > 0 || habit.counterDown > 0
    );
    
    const unusedHabits = props.habits.filter((habit: any) => 
        habit.counterUp === 0 && habit.counterDown === 0
    );
    
    // Render habit item
    const renderHabitItem = (habit: any) => {
        const habit_notes = props.settings.showTaskDescription ? habit.notes : '';
        
        return (
            <HabitItem
                key={habit.id}
                id={habit.id}
                text={habit.text}
                notes={habit_notes}
                upCount={habit.counterUp || 0}
                downCount={habit.counterDown || 0}
                onToggle={props.onToggleHabit}
            />
        );
    };
    
    // Render habit lists
    const activeHabitItems = activeHabits.map(renderHabitItem);
    const unusedHabitItems = unusedHabits.map(renderHabitItem);
    const allHabitItems = props.habits.map(renderHabitItem);
    
    // Tab data
    const [activeTab, setActiveTab] = React.useState("all");
    const tabs = [
        { 
            id: "all", 
            label: i18n?.t("view.tasks.all") || "All", 
            icon: "list_alt", 
            color: "#58cc02", 
            count: props.habits.length 
        },
        { 
            id: "active", 
            label: i18n?.t("view.tasks.active") || "Active", 
            icon: "repeat", 
            color: "#1cb0f6", 
            count: activeHabits.length 
        },
        { 
            id: "unused", 
            label: i18n?.t("view.tasks.unused") || "Unused", 
            icon: "new_releases", 
            color: "#ff9600", 
            count: unusedHabits.length 
        }
    ];
    
    return (
        <div className="duolingo-habits">
            {/* Tab navigation */}
            <div className="duolingo-sub-tabs">
                {tabs.map((tab) => {
                    // Find the current tab color
                    const currentTabColor = tab.color;
                    
                    return (
                        <div 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)} 
                            className={`duolingo-sub-tab ${activeTab === tab.id ? 'active' : ''}`}
                            style={activeTab === tab.id ? {
                                "--tab-color": currentTabColor,
                                backgroundColor: currentTabColor
                            } as React.CSSProperties : {}}
                        >
                            <span className="material-icons">{tab.icon}</span>
                            <span className="tab-label">{tab.label}</span>
                            <span className="tab-count">{tab.count}</span>
                        </div>
                    );
                })}
            </div>
            
            {/* Habit statistics */}
            <div className="duolingo-habits-stats">
                <div className="habit-stat">
                    <span className="material-icons" style={{color: "var(--duolingo-green)"}}>trending_up</span>
                    <div className="habit-stat-content">
                        <div className="habit-stat-value">
                            {props.habits.reduce((sum: number, habit: any) => sum + habit.counterUp, 0)}
                        </div>
                        <div className="habit-stat-label">{i18n?.t("view.tasks.positiveActions") || "Positive Actions"}</div>
                    </div>
                </div>
                <div className="habit-stat">
                    <span className="material-icons" style={{color: "var(--duolingo-red)"}}>trending_down</span>
                    <div className="habit-stat-content">
                        <div className="habit-stat-value">
                            {props.habits.reduce((sum: number, habit: any) => sum + habit.counterDown, 0)}
                        </div>
                        <div className="habit-stat-label">{i18n?.t("view.tasks.negativeActions") || "Negative Actions"}</div>
                    </div>
                </div>
            </div>
            
            {/* Tab content */}
            <div className="duolingo-tab-content">
                {activeTab === "all" && (
                    <div className="duolingo-task-list">
                        {allHabitItems.length > 0 ? (
                            allHabitItems
                        ) : (
                            <div className="duolingo-empty-message" style={{"--tab-color": "#58cc02"} as React.CSSProperties}>
                                <span className="material-icons">add_task</span>
                                <p>{i18n?.t("view.tasks.addHabitsStart") || "Add some habits to start your habit-building journey!"}</p>
                            </div>
                        )}
                    </div>
                )}
                
                {activeTab === "active" && (
                    <div className="duolingo-task-list">
                        {activeHabitItems.length > 0 ? (
                            activeHabitItems
                        ) : (
                            <div className="duolingo-empty-message" style={{"--tab-color": "#1cb0f6"} as React.CSSProperties}>
                                <span className="material-icons">touch_app</span>
                                <p>{i18n?.t("view.tasks.noHabitsRecorded") || "No habits recorded yet, start using them now!"}</p>
                            </div>
                        )}
                    </div>
                )}
                
                {activeTab === "unused" && (
                    <div className="duolingo-task-list">
                        {unusedHabitItems.length > 0 ? (
                            unusedHabitItems
                        ) : (
                            <div className="duolingo-empty-message" style={{"--tab-color": "#ff9600"} as React.CSSProperties}>
                                <span className="material-icons">check_circle</span>
                                <p>{i18n?.t("view.tasks.allHabitsRecorded") || "Great! You have recorded all your habits!"}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

