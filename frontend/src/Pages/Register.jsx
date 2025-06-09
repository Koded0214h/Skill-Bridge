import RegisterForm from '../components/RegisterForm'
import '../styles/Register.css'

function Register() {
    return (
        <div className="register-page">
            <div className="register-header">
                <h1>Welcome to Skill Bridge</h1>
                <p>Join our community of students and employers to bridge the gap between education and industry</p>
            </div>
            <div className="register-content">
                <div className="register-info">
                    <h2>Why Join Skill Bridge?</h2>
                    <p>Skill Bridge connects talented students with forward-thinking employers, creating opportunities for growth and innovation.</p>
                    <div className="register-features">
                        <div className="feature-item">Connect with industry professionals</div>
                        <div className="feature-item">Access exclusive job opportunities</div>
                        <div className="feature-item">Build your professional network</div>
                        <div className="feature-item">Showcase your skills and projects</div>
                    </div>
                </div>
                <RegisterForm />
            </div>
        </div>
    )
}

export default Register