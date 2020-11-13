const KEYS ={
    users:'users',
    userId:'userId'
}

export const getDepartmentCollection = ()=>([
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
])

export function insertUser(data) {
    let users=getAllUsers();
    data['id'] = generateuserId()
    users.push(data)
    localStorage.setItem(KEYS.users,JSON.stringify(users))
}

export function generateuserId() {
    if (localStorage.getItem(KEYS.userId) == null)
        localStorage.setItem(KEYS.userId, '0')
    var id = parseInt(localStorage.getItem(KEYS.userId))
    localStorage.setItem(KEYS.userId, (++id).toString())
    return id;
}

export function getAllUsers() {
    if (localStorage.getItem(KEYS.users) == null)
        localStorage.setItem(KEYS.users, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.users));
}