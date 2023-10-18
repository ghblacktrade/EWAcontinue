import {useState} from 'react';

const Auth = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        checkbox: false,
    })

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        checkbox: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            name,
            value,
            type,
            checked
        } = e.target
        const newValue = type === 'checkbox' ? checked : value
        setFormData({
            ...formData,
            [name]: newValue
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors = {} as any

        if (!formData.name) {
            newErrors.name = 'Имя обязательно'
        }

        if (!formData.email) {
            newErrors.email = 'Почта обязательна'
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Неверный формат почты'
        }

        if (!formData.phone) {
            newErrors.phone = 'Телефон обязателен'
        }

        if (!formData.password) {
            newErrors.password = 'Пароль обязателен'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен содержать минимум 6 символов'
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают'
        }

        if (!formData.checkbox) {
            newErrors.checkbox = 'Вы должны согласиться с условиями'
        }

        if (Object.keys(newErrors).length === 0) {
            // server
        } else {
            setErrors(newErrors);
        }
    }

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    return (
        <div>
            <h1>Форма</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Имя:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email">Почта:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="phone">Телефон:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <p className="error">{errors.phone}</p>}
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPassword">Подтвердить пароль:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                        <p className="error">{errors.confirmPassword}</p>
                    )}
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="checkbox"
                            checked={formData.checkbox}
                            onChange={handleChange}
                        />
                        Я согласен с условиями
                    </label>
                    {errors.checkbox && <p className="error">{errors.checkbox}</p>}
                </div>
                <div>
                    <button type="submit">Отправить</button>
                </div>
            </form>
        </div>
    )
}

export default Auth;