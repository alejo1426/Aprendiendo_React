import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './config.js'
import DBlocal from 'db-local'
const { Schema } = new DBlocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static async create ({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })
    if (user) throw new Error('El nombre de usuario ya existe')
    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    User.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()

    return id
  }

  static async login ({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })
    if (!user) throw new Error('El nombre de usuario no existe')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('La clave es incorrecta')
    const { password: _, ...publicUser } = user

    return publicUser
  }
}

class Validation {
  static username (username) {
    if (typeof username !== 'string') throw new Error('El usuario debe contener solo letras')
    if (username.length < 7) throw new Error('El usuario es demasiado corto')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('La clave debe contener solo letras')
    if (password.length < 7) throw new Error('La clave es demasiado corta')
  }
}
