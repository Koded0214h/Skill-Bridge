import { useState, useEffect } from 'react';
import '../styles/ProfileForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProfileForm({ user, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        bio: '',
        skills: [],
        cv: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                bio: user.bio || '',
                skills: user.skills || [],
                cv: user.cv || ''
            });
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        axios
            .put('http://127.0.0.1:8000/api/profile/', {
                username: formData.username,
                email: formData.email,
                bio: formData.bio,
                skills: formData.skills,
                cv: formData.cv
            }, {
                headers: { Authorization: `Token ${token}`}
            })
            .then((res) => {
                onSubmit(res.data);
                onClose();
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
                if (error.response?.data) {
                    // Handle validation errors
                    const errors = error.response.data;
                    const errorMessages = Object.entries(errors)
                        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                        .join('\n');
                    setError(errorMessages);
                } else {
                    setError('Failed to update profile. Please try again.');
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="profile-form-overlay">
            <div className="profile-form-container">
                <div className="profile-form-header">
                    <h2>Edit Profile</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                
                {error && (
                    <div className="error-message">
                        {error.split('\n').map((line, index) => (
                            <div key={index}>{line}</div>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows="4"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cv">CV URL</label>
                        <input
                            type="url"
                            id="cv"
                            name="cv"
                            value={formData.cv}
                            onChange={handleChange}
                            placeholder="https://example.com/cv"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="cancel-button" 
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="save-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
