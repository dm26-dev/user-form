import { useState, useEffect } from 'react'
import styles from './user-form.module.scss'

const initialData = { name: '', lastName: '', age: '', sex: 'hombre', pet: 'Perro', isAdmin: false }
const getDataUser = () => JSON.parse(localStorage.getItem('userLS')) || initialData

export const UserForm = () => {

    // STATE
    const [user, setUser] = useState(getDataUser)

    // DESTRUCTURING
    const { name, lastName, age, sex, isAdmin, pet } = user

    // FUNCTIONS
    const handleForm = (e) => {

        const { name, type, checked, value } = e.target

        setUser({
            ...user,
            [name]: type === 'checkbox' ? checked : value
        })

    }

    const sendData = (e) => {
        e.preventDefault()
        alert(JSON.stringify(user, null, 3))
    }

    useEffect(() => {
        localStorage.setItem('userLS', JSON.stringify(user))
    }, [user])

    return (
        <form className={styles.form} onSubmit={sendData}>

            <h3>Formulario de registro</h3>

            <input
                type="text"
                name='name'
                placeholder='Nombre'
                autoComplete='off'
                value={name}
                onChange={handleForm}
            />

            <input
                type="text"
                name='lastName'
                placeholder='Apellido'
                autoComplete='off'
                value={lastName}
                onChange={handleForm}
            />

            <input type="number" name='age' placeholder='Edad' value={age} onChange={handleForm} />

            <select name="sex" value={sex} onChange={handleForm}>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
                <option value="other">Deje de joder</option>
            </select>

            <label htmlFor="">Perro </label>
            <input
                type="radio"
                name='pet'
                value={'Perro'}
                onChange={handleForm}
                checked={pet === 'Perro' ? true : false}
            />
            <br />

            <label htmlFor="">Gato </label>
            <input
                type="radio"
                name='pet'
                value={'Gato'}
                onChange={handleForm}
                checked={pet === 'Gato' ? true : false}
            />
            <br />

            <label htmlFor="">Eres Admin ? </label>
            <input type="checkbox" checked={isAdmin} onChange={handleForm} name='isAdmin' />

            <button hidden></button>

        </form>
    )
}
