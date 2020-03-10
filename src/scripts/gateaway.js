//const baseUrl = 'https://crudcrud.com/api/314469b9582641b1b4994da929ea97d2/tasks';
export const baseUrl = "https://crudcrud.com/api/b8ac3cba303b4985b6a6d43685571b00/users"
const mapTasks = tasks =>
    tasks.map(({ _id, ...rest }) => ({...rest, id: _id }))


export const getTasksList = () => {
    return fetch(baseUrl)
        .then(response => response.json())
        .then(tasks => mapTasks(tasks))


}

export const createTask = taskData => {

    return fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(taskData)
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Loading data failed')
            }
        })
        .catch(err => {
            alert(err)
        });
}


export const updateTask = (taskId, updateTaskData) => {
    return fetch(`${baseUrl}/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(updateTaskData)
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Loading data for update failed')
            }
        })
        .catch(err => {
            alert(err)
        });
}

export const deleteTask = (taskId) => {
    return fetch(`${baseUrl}/${taskId}`, {
            method: 'DELETE',
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Loading data for delete failed')
            }
        })
        .catch(err => {
            alert(err)
        });
}