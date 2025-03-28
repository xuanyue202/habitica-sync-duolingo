// import fetch from "node-fetch";

export async function getStats(username: string, credentials: string){
    // Export API using userdata, providing a stable interface
    const url = "https://habitica.com/export/userdata.json"
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "x-client": "278e719e-5f9c-43b1-9dba-8b73343dc062-HabiticaSync",
                "x-api-user": username,
                "x-api-key": credentials,
            },
        })
        return response
    } catch (error) {
        console.error("Error fetching stats:", error)
        throw error
    }
}

export async function scoreTask(username: string, credentials: string, taskID: string, direction: string) {
    // Keep using v3 API, as v4 is not yet stable
    const url = `https://habitica.com/api/v3/tasks/${taskID}/score/${direction}`
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-client": "278e719e-5f9c-43b1-9dba-8b73343dc062-HabiticaSync",
                "x-api-user": username,
                "x-api-key": credentials,
            }
        })
        return response
    } catch (error) {
        console.error("Error scoring task:", error)
        throw error
    }
}

export async function makeCronReq(username: string, credentials: string){
    const url = "https://habitica.com/api/v3/cron";
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-client": "278e719e-5f9c-43b1-9dba-8b73343dc062-HabiticaSync",
                "x-api-user": username,
                "x-api-key": credentials,
            }
        })
        return response
    } catch (error) {
        console.error("Error making cron request:", error)
        throw error
    }
}

export async function costReward(username: string, credentials: string, taskID: string, direction: string) {
    // Ensure using stable v3 API
    const url = `https://habitica.com/api/v3/tasks/${taskID}/score/${direction}`
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-client": "278e719e-5f9c-43b1-9dba-8b73343dc062-HabiticaSync",
                "x-api-user": username,
                "x-api-key": credentials,
            }
        })
        return response
    } catch (error) {
        console.error("Error scoring reward:", error)
        throw error
    }
}

export async function scoreChecklistItem(username: string, credentials: string, checklistItemID: string, taskID: string) {
    // Add error handling and detailed logging
    const url = `https://habitica.com/api/v3/tasks/${taskID}/checklist/${checklistItemID}/score`
    try {
        console.log(`Scoring checklist item: ${checklistItemID} for task: ${taskID}`)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-client": "278e719e-5f9c-43b1-9dba-8b73343dc062-HabiticaSync",
                "x-api-user": username,
                "x-api-key": credentials,
            }
        })
        const result = await response.json()
        console.log("API response:", result)
        return response
    } catch (error) {
        console.error("Error scoring checklist item:", error)
        throw error
    }
}