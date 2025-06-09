import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/RegisterForm.css'

function RegisterForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
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
        if(!formData.email) newErrors.email = "Email required"
        if(!formData.password) newErrors.password = "Password required"
        if(!formData.role) newErrors.role = "Role required"

        return newErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate ();
        if(Object.keys(validationErrors).length > 0) {
            setFieldErrors(validationErrors);
            return;
        }
        setLoading(true)
        setSuccess(false)
        setApiErrors(null)
        setFieldErrors({});

        axios
            .post('http://127.0.0.1:8000/api/register/', {
                username:formData.username,
                password: formData.password,
                email: formData.email,
                role: formData.role
            })
            .then((res) => {
                const { token, username, email} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('username', username)
                localStorage.setItem('email', email)

                setSuccess(true)
                setLoading(false)
                navigate('/profile')
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
                    setApiErrors('An error occurred')
                }
                setLoading(false)
            })
    }

    return (
        <div className='register-form'>
            <h1>Create Account</h1>
            <div className="status-messages">
                {loading && <p className="loading">Creating your account...</p>}
                {apiErrors && <p className="error">{apiErrors}</p>}
                {success && <p className="success">Registration successful!</p>}
            </div>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        placeholder="Enter username"
                        onChange={handleChange}
                    />
                    {fieldErrors.username && <p className="error">{fieldErrors.username}</p>}
                </div>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        placeholder="Enter email address"
                        onChange={handleChange}
                    />
                    {fieldErrors.email && <p className="error">{fieldErrors.email}</p>}
                </div>
                <div className='form-control'>
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="role-select"
                    >
                        <option value="">Select a role</option>
                        <option value="student">Student</option>
                        <option value="employer">Employer</option>
                    </select>
                    {fieldErrors.role && <p className="error">{fieldErrors.role}</p>}
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        placeholder="Enter password"
                        onChange={handleChange}
                    />
                    {fieldErrors.password && <p className="error">{fieldErrors.password}</p>}
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>
                <p>Already have an account? <Link to='/login'>Login Here</Link></p>
            </form>
        </div>
    )
}

export default RegisterForm