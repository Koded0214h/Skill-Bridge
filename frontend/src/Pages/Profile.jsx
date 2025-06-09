import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import ProfileForm from '../components/ProfileForm';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
                headers: { Authorization: `Token ${token}` }
            });
            console.log('Profile data:', response.data);
            setUser(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching profile:', err);
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            setError('Failed to load profile');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCloseEdit = () => {
        setIsEditing(false);
    };

    const handleProfileUpdate = (updatedData) => {
        setUser(updatedData);
        setIsEditing(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            console.log('Formatting date:', dateString);
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.log('Invalid date:', dateString);
                return 'N/A';
            }
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'N/A';
        }
    };

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!user) return <div className="error">No user data found</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Profile</h1>
                <div className="profile-actions">
                    <button className="edit-button" onClick={handleEdit}>
                        Edit Profile
                    </button>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="profile-content">
                <div className="profile-section">
                    <h2>Personal Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Username</label>
                            <span>{user.username}</span>
                        </div>
                        <div className="info-item">
                            <label>Email</label>
                            <span>{user.email}</span>
                        </div>
                        <div className="info-item">
                            <label>Role</label>
                            <span>{user.role}</span>
                        </div>
                        <div className="info-item">
                            <label>Member Since</label>
                            <span>{formatDate(user.date_joined)}</span>
                        </div>
                    </div>
                </div>

                <div className="profile-section">
                    <h2>Professional Information</h2>
                    <div className="info-grid">
                        <div className="info-item full-width">
                            <label>Bio</label>
                            <p>{user.bio || 'No bio provided'}</p>
                        </div>
                        <div className="info-item full-width">
                            <label>Skills</label>
                            <div className="skills-list">
                                {user.skills && user.skills.length > 0 ? (
                                    user.skills.map(skill => (
                                        <span key={skill.id} className="skill-tag">
                                            {skill.name}
                                        </span>
                                    ))
                                ) : (
                                    <span>No skills listed</span>
                                )}
                            </div>
                        </div>
                        <div className="info-item full-width">
                            <label>CV</label>
                            {user.cv ? (
                                <a href={user.cv} target="_blank" rel="noopener noreferrer" className="cv-link">
                                    View CV
                                </a>
                            ) : (
                                <span>No CV provided</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isEditing && (
                <ProfileForm
                    user={user}
                    onClose={handleCloseEdit}
                    onSubmit={handleProfileUpdate}
                />
            )}
        </div>
    );
}
