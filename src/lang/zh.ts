export default {
    settings: {
        title: "Habitica同步设置",
        userID: {
            name: "Habitica用户ID",
            desc: "可以在设置 > API中找到"
        },
        apiToken: {
            name: "Habitica API令牌",
            desc: "可以在设置 > API中找到"
        },
        showTaskDescription: {
            name: "显示任务描述",
            desc: "更新需要重新打开面板"
        },
        showSubTasks: {
            name: "显示子任务",
            desc: "更新需要重新打开面板"
        },
        dueDateFormat: {
            name: "到期日期格式",
            desc: "更新需要重新打开面板，查看moment.js文档了解格式。当前格式："
        },
        language: {
            name: "语言",
            desc: "覆盖语言设置（需要重启）",
            auto: "自动（跟随Obsidian）",
            en: "英文",
            zh: "中文"
        }
    },
    view: {
        title: "Habitica面板",
        cronMessage: "欢迎回来！请检查您昨天的任务，然后点击继续获取每日奖励。",
        cronButton: "继续",
        loading: "加载中....",
        stats: {
            health: "生命值",
            experience: "经验",
            level: "等级",
            gold: "金币"
        },
        tasks: {
            habits: "习惯",
            dailies: "每日任务",
            todos: "待办事项",
            rewards: "奖励",
            noTasks: "没有找到任务",
            dueDate: "截止日期",
            checklist: "检查清单",
            active: "进行中",
            completed: "已完成",
            notdue: "未到期",
            all: "全部",
            noDailies: "没有每日任务",
            addDailiesMessage: "添加一些每日任务来开始你的习惯养成之旅！",
            allDailiesDone: "太棒了！你已完成所有今日任务！",
            noDailiesCompleted: "你还没有完成任何任务，加油！",
            allTasksScheduled: "所有任务都已排期，请按时完成！",
            noHabits: "没有习惯记录",
            addHabitsMessage: "添加一些习惯来培养持续的好习惯！",
            unused: "未使用",
            positiveActions: "积极行为",
            negativeActions: "消极行为",
            addHabitsStart: "添加一些习惯来开始养成好习惯的旅程！",
            noHabitsRecorded: "还没有记录习惯，立即开始使用吧！",
            allHabitsRecorded: "太棒了！你已经记录了所有习惯！",
            noTodos: "没有待办事项",
            addTodosMessage: "添加一些待办事项开始你的高效之旅！",
            incomplete: "未完成",
            withDueDate: "有期限",
            allTodosDone: "太棒了！你已完成所有待办事项！",
            noTodosCompleted: "你还没有完成任何待办事项，继续加油！",
            noTodosWithDueDate: "你没有任何带有截止日期的待办事项。"
        },
        rewards: {
            availableGold: "可用金币",
            customRewards: "自定义奖励",
            defaultRewards: "默认奖励",
            noRewards: "没有奖励",
            addRewardsMessage: "添加一些奖励来激励自己完成任务！",
            noCustomRewards: "你还没有添加自定义奖励",
            noDefaultRewards: "没有默认奖励可用",
            buyReward: "购买奖励"
        },
        errorBoundary: {
            title: "组件加载错误",
            description: "请检查控制台查看详细信息"
        }
    },
    notices: {
        loginFailed: "登录失败，请检查凭据并重试！",
        apiError: "API错误：请检查凭据",
        invalidTask: "错误：无效的任务ID或操作",
        syncFailed: "同步失败，请稍后再试",
        completed: "已完成！",
        markedIncomplete: "标记为未完成！",
        taskChangeError: "处理任务变更时出错",
        taskDataUnavailable: "任务数据不可用，请刷新",
        taskCompleted: "已完成！",
        taskUncompleted: "标记为未完成！",
        taskNotFound: "找不到指定的任务",
        taskChecked: "已勾选！",
        taskUnChecked: "已取消勾选！",
        taskPlus: "加分！",
        taskMinus: "减分 :(",
        taskRedeemed: "已兑换！",
        taskItemIdentificationError: "错误：无法识别任务项目",
        languageChanged: "语言已更改！重启后生效。"
    }
} 