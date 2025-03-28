export default {
    settings: {
        title: "Habitica Sync Settings",
        userID: {
            name: "Habitica User ID",
            desc: "Can be found in Settings > API"
        },
        apiToken: {
            name: "Habitica API Token",
            desc: "Can be found in Settings > API"
        },
        showTaskDescription: {
            name: "Show Task Descriptions",
            desc: "Updates require pane re-opening"
        },
        showSubTasks: {
            name: "Show Sub-Tasks",
            desc: "Updates require pane re-opening"
        },
        dueDateFormat: {
            name: "Due Date Format",
            desc: "Update requires pane re-opening, check moment.js docs for formatting. Current Format:"
        },
        language: {
            name: "Language",
            desc: "Override language setting (requires restart)",
            auto: "Auto (Follow Obsidian)",
            en: "English",
            zh: "Chinese"
        }
    },
    view: {
        title: "Habitica Pane",
        cronMessage: "Welcome back! Please check your tasks for the last day and hit continue to get your daily rewards.",
        cronButton: "Continue",
        loading: "Loading....",
        stats: {
            health: "Health",
            experience: "Experience",
            level: "Level",
            gold: "Gold"
        },
        tasks: {
            habits: "Habits",
            dailies: "Dailies",
            todos: "To-Dos",
            rewards: "Rewards",
            noTasks: "No tasks found",
            dueDate: "Due Date",
            checklist: "Checklist",
            active: "Active",
            completed: "Completed",
            notdue: "Not Due",
            all: "All",
            noDailies: "No dailies",
            addDailiesMessage: "Add some dailies to start your habit-building journey!",
            allDailiesDone: "Great! You have completed all your dailies for today!",
            noDailiesCompleted: "You haven't completed any dailies yet, keep going!",
            allTasksScheduled: "All tasks are scheduled, complete them on time!",
            noHabits: "No habits",
            addHabitsMessage: "Add some habits to build consistent good habits!",
            unused: "Unused",
            positiveActions: "Positive Actions",
            negativeActions: "Negative Actions",
            addHabitsStart: "Add some habits to start your habit-building journey!",
            noHabitsRecorded: "No habits recorded yet, start using them now!",
            allHabitsRecorded: "Great! You have recorded all your habits!",
            noTodos: "No to-dos",
            addTodosMessage: "Add some to-dos to start your productivity journey!",
            incomplete: "Incomplete",
            withDueDate: "With Due Date",
            allTodosDone: "Great! You have completed all your to-dos!",
            noTodosCompleted: "You haven't completed any to-dos yet, keep going!",
            noTodosWithDueDate: "You don't have any to-dos with a due date."
        },
        rewards: {
            availableGold: "Available Gold",
            customRewards: "Custom Rewards",
            defaultRewards: "Default Rewards",
            noRewards: "No rewards",
            addRewardsMessage: "Add some rewards to motivate yourself to complete tasks!",
            noCustomRewards: "You haven't added any custom rewards yet",
            noDefaultRewards: "No default rewards available",
            buyReward: "Purchase Reward"
        },
        errorBoundary: {
            title: "Component Loading Error",
            description: "Please check console for details"
        }
    },
    notices: {
        loginFailed: "Login Failed, Please check credentials and try again!",
        apiError: "API Error: Please check credentials",
        invalidTask: "Error: Invalid task ID or operation",
        syncFailed: "Sync failed, please try again later",
        completed: "Completed!",
        markedIncomplete: "Marked as incomplete!",
        taskChangeError: "Error processing task change",
        taskDataUnavailable: "Task data unavailable, please refresh",
        taskCompleted: "Completed!",
        taskUncompleted: "Marked as incomplete!",
        taskNotFound: "Task not found",
        taskChecked: "Checked!",
        taskUnChecked: "Un-Checked!",
        taskPlus: "Plus!",
        taskMinus: "Minus :(",
        taskRedeemed: "Redeemed!",
        taskItemIdentificationError: "Error: Cannot identify task item",
        languageChanged: "Language changed! Restart to apply changes."
    }
} 