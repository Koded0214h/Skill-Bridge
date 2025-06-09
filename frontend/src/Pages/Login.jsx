import LoginForm from '../components/LoginForm'
import '../styles/Login.css'

function Login() {
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-info">
                    <h1>Welcome Back</h1>
                    <p>Sign in to access your Skill Bridge account and connect with opportunities that match your skills and aspirations.</p>
                    <div className="login-features">
                        <div className="feature-item">Connect with industry professionals</div>
                        <div className="feature-item">Access exclusive opportunities</div>
                        <div className="feature-item">Build your professional network</div>
                        <div className="feature-item">Track your application progress</div>
                    </div>
                </div>

                <div className="login-form-container">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default Login