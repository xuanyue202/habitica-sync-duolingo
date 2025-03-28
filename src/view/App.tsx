import * as React from "react";
import { Notice } from "obsidian";
import { getStats, scoreTask, makeCronReq, costReward, scoreChecklistItem } from "./habiticaAPI"
import Statsview from "./Components/Statsview"
import Taskview from "./Components/Taskview"
import ReactDOM from "react-dom";

class App extends React.Component<any, any> {
    private _username = "";
    public get username() {
        return this._username;
    }
    public set username(value) {
        this._username = value;
    }
    private _credentials = "";
    public get credentials() {
        return this._credentials;
    }
    public set credentials(value) {
        this._credentials = value;
    }
    constructor(props: any) {
        super(props)
        this.username = this.props.plugin.settings.userID
        this.credentials = this.props.plugin.settings.apiToken
        this.state = {
            needCron: false,
            isLoaded: false,
            user_data: {
                profile: {
                    name: "",
                },
                stats: {
                    hp: 0,
                    lvl: 0,
                    gold: 0,
                },
                lastCron: "",
            },
            todos: [],
            dailys: [],
            habits: [],
        }
        this.handleChangeTodos = this.handleChangeTodos.bind(this);
        this.handleChangeDailys = this.handleChangeDailys.bind(this);
        this.handleChangeHabits = this.handleChangeHabits.bind(this);
        this.handleChangeRewards = this.handleChangeRewards.bind(this);
        this.handleChangeChecklistItem = this.handleChangeChecklistItem.bind(this);
        this.runCron = this.runCron.bind(this);

    }
    CheckCron(lastCron: string) {
        let cronDate = new Date(lastCron);
        let now = new Date();
        if (cronDate.getDate() != now.getDate() || (cronDate.getMonth() != now.getMonth() || cronDate.getFullYear() != now.getFullYear())) {
            return (
                <div className="cron">
                    <div id="cronMessage">{this.props.plugin.i18n.t("view.cronMessage")}</div>
                    <button id="cronButton" onClick={this.runCron}>{this.props.plugin.i18n.t("view.cronButton")}</button>
                </div>
            );
        }
        else {
            return null
        };
    }
    async runCron() {
        console.log("running cron");
        try {
            let response = await makeCronReq(this.username, this.credentials);
            this.setState({
                needCron: false,
            })
        } catch (error) {
            console.log(error);
            new Notice(this.props.plugin.i18n.t("notices.syncFailed"));
        }
        this.reloadData();
    }
    async reloadData() {
        try {
            let response = await getStats(this.username, this.credentials);
            let result = await response.json();
            if (result.success === false) {
                new Notice(this.props.plugin.i18n.t("notices.loginFailed"));
            }
            else {
                this.setState({
                    isLoaded: true,
                    user_data: result,
                    tasks: result.tasks,
                });
            }
        } catch (e) {
            console.log(e);
            new Notice(this.props.plugin.i18n.t("notices.apiError"))
        }
    }
    componentDidMount() {
        this.reloadData()
    }

    async sendScore(id: string, score: string, message: string) {
        try {
            if (!id || !score) {
                console.error("Invalid parameters:", {id, score});
                new Notice(this.props.plugin.i18n.t("notices.invalidTask"));
                return;
            }
            
            let response = await scoreTask(this.username, this.credentials, id, score);
            let result = await response.json();
            if (result.success === true) {
                new Notice(message);
                this.reloadData();
            } else {
                console.error("API error:", result);
                new Notice(this.props.plugin.i18n.t("notices.syncFailed"));
                this.reloadData();
            }
        } catch (e) {
            console.error("sendScore error:", e);
            new Notice(this.props.plugin.i18n.t("notices.apiError"))
        }
    }

    async sendReward(id: string, score: string, message: string) {
        try {
            if (!id || !score) {
                console.error("Invalid parameters:", {id, score});
                new Notice(this.props.plugin.i18n.t("notices.invalidTask"));
                return;
            }
            
            let response = await costReward(this.username, this.credentials, id, score);
            let result = await response.json();
            if (result.success === true) {
                new Notice(message);
                this.reloadData();
            } else {
                console.error("API error:", result);
                new Notice(this.props.plugin.i18n.t("notices.syncFailed"));
                this.reloadData();
            }
        } catch (e) {
            console.error("sendReward error:", e);
            new Notice(this.props.plugin.i18n.t("notices.apiError"))
        }
    }

    handleChangeTodos(event: any) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        if (!event || !event.target || !event.target.id) {
            console.error("Invalid event object in handleChangeTodos:", event);
            new Notice(this.props.plugin.i18n.t("notices.taskChangeError"));
            return;
        }

        console.log("Todo change event:", event.target.id);
        
        if (!this.state.tasks || !this.state.tasks.todos) {
            console.error("Tasks data not available");
            new Notice(this.props.plugin.i18n.t("notices.taskDataUnavailable"));
            return;
        }

        let taskFound = false;
        this.state.tasks.todos.forEach((element: any) => {
            if (element.id === event.target.id) {
                taskFound = true;
                if (!element.completed) {
                    console.log("Marking todo as completed:", element.id, element.text);
                    this.sendScore(event.target.id, "up", this.props.plugin.i18n.t("notices.taskCompleted"));
                } else {
                    console.log("Marking todo as incomplete:", element.id, element.text);
                    this.sendScore(event.target.id, "down", this.props.plugin.i18n.t("notices.taskUncompleted"));
                }
            }
        });

        if (!taskFound) {
            console.error("Task not found:", event.target.id);
            new Notice(this.props.plugin.i18n.t("notices.taskNotFound"));
        }
    }
    
    handleChangeDailys(event: any) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        this.state.tasks.dailys.forEach((element: any) => {
            if (element.id === event.target.id) {
                if (!element.completed) {
                    this.sendScore(event.target.id, "up", this.props.plugin.i18n.t("notices.taskChecked"));
                } else {
                    this.sendScore(event.target.id, "down", this.props.plugin.i18n.t("notices.taskUnChecked"));
                }
            }
        })
    }
    
    handleChangeHabits(event: any) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        const target_id = event.target.id.slice(4)
        if (event.target.id.slice(0, 4) === "plus") {
            this.state.tasks.habits.forEach((element: any) => {
                if (element.id === target_id) {
                    this.sendScore(target_id, "up", this.props.plugin.i18n.t("notices.taskPlus"));
                }
            })
        }
        else {
            this.state.tasks.habits.forEach((element: any) => {
                if (element.id === target_id) {
                    this.sendScore(target_id, "down", this.props.plugin.i18n.t("notices.taskMinus"));
                }
            })
        }
    }
    
    handleChangeRewards(event: any) {
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        const target_id = event.target.id
        this.state.tasks.rewards.forEach((element: any) => {
            if (element.id === target_id) {
                this.sendReward(target_id, "down", this.props.plugin.i18n.t("notices.taskRedeemed"));
            }
        })
    }
    
    async handleChangeChecklistItem(event: any){
        if (event && event.stopPropagation) {
            event.stopPropagation();
        }
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        try {
            let parentID = event.target && event.target.parentNode && 
                         event.target.parentNode.parentNode && 
                         event.target.parentNode.parentNode.parentNode &&
                         event.target.parentNode.parentNode.parentNode.getAttribute("id");
            
            let targetID = event.target && event.target.id;
            
            if (!parentID || !targetID) {
                console.error("Missing parentID or targetID", {parentID, targetID});
                new Notice(this.props.plugin.i18n.t("notices.taskItemIdentificationError"));
                return;
            }
            
            console.log(parentID+ " , " + targetID);
            
            let response = await scoreChecklistItem(this.username, this.credentials, targetID, parentID);
            let result = await response.json();
            if (result.success === true) {
                new Notice(this.props.plugin.i18n.t("notices.taskChecked"));
                this.reloadData();
            } else {
                console.error("API error:", result);
                new Notice(this.props.plugin.i18n.t("notices.syncFailed"));
                this.reloadData();
            }
        } catch (e) {
            console.error("handleChangeChecklistItem error:", e);
            new Notice(this.props.plugin.i18n.t("notices.apiError"))
        }
    }

    render() {
        let content = this.CheckCron(this.state.user_data.lastCron);
        if (this.state.error)
            return (<div className="loading">{this.props.plugin.i18n.t("view.loading")}</div>)
        else if (!this.state.isLoaded)
            return <div className="loading">{this.props.plugin.i18n.t("view.loading")}</div>
        else {
            return (<div className="plugin-root">
                {content}
                <Statsview className="stats-view" user_data={this.state.user_data} plugin={this.props.plugin} />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <Taskview data={this.state.tasks} 
                    handleChangeTodos={this.handleChangeTodos} 
                    settings={this.props.plugin.settings} 
                    handleChangeDailys={this.handleChangeDailys} 
                    handleChangeHabits={this.handleChangeHabits} 
                    handleChangeRewards={this.handleChangeRewards} 
                    handleChangeChecklistItem={this.handleChangeChecklistItem}
                    plugin={this.props.plugin}
                />
                
            </div>
            );
        }
    }
}
export default App