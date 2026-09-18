const REGISTERED_USERS_KEY = 'mallManagementRegisteredUsers'

export function getRegisteredUsers() {
  const storedUsers = localStorage.getItem(REGISTERED_USERS_KEY)

  if (!storedUsers) {
    return []
  }

  try {
    const users = JSON.parse(storedUsers)
    return Array.isArray(users) ? users : []
  } catch (error) {
    console.error('Unable to read registered users.', error)
    return []
  }
}

export function saveRegisteredUsers(users) {
  localStorage.setItem(
    REGISTERED_USERS_KEY,
    JSON.stringify(users)
  )
}

export function normalizeEmail(email) {
  return email.trim().toLowerCase()
}
