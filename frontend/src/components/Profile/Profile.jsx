import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../../api'; // Import your API calls
import { useAuth } from '../../context/AuthContext';
import './Profile.css'; // Add any necessary CSS

const Profile = () => {
    const { user } = useAuth(); // Assuming you have the logged-in user in context
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        bio: '',
        location: '',
        phone: '', // Additional field
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from storage
                const data = await getUserProfile(token); // Call the API function
                setProfile(data);
                setFormData({
                    username: data.username,
                    email: data.email,
                    bio: data.bio || '',
                    location: data.location || '',
                    phone: data.phone || '', // Initialize additional field
                });
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) { // Check if user is logged in
            fetchProfile();
        } else {
            setLoading(false); // If not logged in, stop loading
        }
    }, [user]); // Dependency on user state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Get token from storage
            
            // Update profile without favorites and wishlist
            const updatedProfile = await updateUserProfile(token, {
                ...formData,
            });
    
            setProfile(updatedProfile);
            setIsEditing(false); // Exit edit mode after successful update
        } catch (error) {
            console.error('Failed to update user profile:', error);
        }
    };
    

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    if (!profile) {
        return <div>No profile found.</div>; // Fallback for no profile
    }

    // Generate user avatar URL using UI Avatars
    const userImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.username)}&size=128&background=random&color=fff`;

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <div className="profile-details">
                <img src={userImageUrl} alt={`${profile.username}'s profile`} className="profile-image" />
                {!isEditing ? (
                    <>
                        <p><strong>Username:</strong> {profile.username}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Bio:</strong> {profile.bio || 'No bio available'}</p>
                        <p><strong>Location:</strong> {profile.location || 'Not specified'}</p>
                        <p><strong>Phone:</strong> {profile.phone || 'Not specified'}</p> {/* Additional field */}
                        <p><strong>Joined:</strong> {new Date(profile.dateJoined).toLocaleDateString() || 'Unknown'}</p>
                        <p><strong>Favorites:</strong> {profile.favorites.join(', ') || 'None'}</p>
                        <p><strong>Wishlist:</strong> {profile.wishlist.join(', ') || 'None'}</p>
                        <button onClick={handleEditToggle} className="edit-button">Edit</button>
                    </>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Bio:</label>
                            <textarea name="bio" value={formData.bio} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Location:</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                        <button type="submit" className="submit-button">Save</button>
                        <button type="button" onClick={handleEditToggle} className="cancel-button">Cancel</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;
