import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function LoginForm() {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const [fieldErrors, setFieldErrors] = useState({})
    const [apiErrors, setApiErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({...prev, [name]:value}))
    }

    const validate = (e) => {
        const newErrors = {}

        if(!formData.username) newErrors.username = "Username required"
        if(!formData.password) newErrors.password = "Password required"

        return newErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate ();
        if(Object.keys(validationErrors).length > 0) {
            setFieldErrors(validationErrors);
            return;
        }
        setLoading(false)
        setSuccess(false)
        setApiErrors(null)
        setFieldErrors({});

        axios
            .post('http://127.0.0.1:8000/api/login/', {
                username:formData.username,
                password: formData.password
            })
            .then((res) => {
                const { token, username, email} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('username', username)
                localStorage.setItem('email', email)

                setTimeout(() => {
                    setSuccess(true)
                    setLoading(false)
                    navigate('/profile')
                })
            })
            .catch((error) => {
                if(error.response && error.response.data) {
                    const data = error.response.data

                    if (typeof(data) === 'object') {
                        setFieldErrors(data)
                    } else {
                        setApiErrors(data.toString())
                    }
                } else {
                    setApiErrors('An error occured')
                }
            })
            setLoading(false)
    }

    return (
        <div className='register-form'>
            <div>
                {loading && <p>Submitting...</p>}
                {apiErrors && <p style={{ color: "red" }}>{apiErrors}</p>}
                {success && <p style={{ color: "green" }}>Welcome back!</p>}
            </div>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <p style={{ color: "red" }}>{fieldErrors.username}</p>
                    <input
                        name="username"
                        type="text"
                        value={formData.username}
                        placeholder="Enter username"
                        onChange={handleChange}
                    />
                </div>
                <div className='form-control last'>
                    <p style={{ color: "red" }}>{fieldErrors.password}</p>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        placeholder="Enter password"
                        onChange={handleChange}
                    />
                </div>
                <button disabled={loading}>Login</button>
                <p>Don't have an account? <Link to='/'>Register Here</Link></p>
            </form>
        </div>
    )

}

export default LoginForm;