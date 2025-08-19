import React, { useState } from 'react';
import SkillInput from './SkillInput';

const commonSkills = [
  'JavaScript', 'Python', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Java',
  'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'Flutter', 'Vue.js',
  'Angular', 'TypeScript', 'HTML', 'CSS', 'SASS', 'Bootstrap', 'Tailwind CSS',
  'Machine Learning', 'Data Science', 'AI', 'Deep Learning', 'TensorFlow', 'PyTorch',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'DevOps', 'CI/CD', 'Git', 'GitHub',
  'Figma', 'Adobe XD', 'Photoshop', 'UI/UX Design', 'Graphic Design'
];

const ProfileForm = ({ onSubmit }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    linkedin: '',
    github: '',
    gender: '',
    knownSkills: [],
    desiredSkills: [],
    isBeginner: false
  });

  const [currentKnownSkill, setCurrentKnownSkill] = useState('');
  const [currentDesiredSkill, setCurrentDesiredSkill] = useState('');

  const addKnownSkill = () => {
    if (!currentKnownSkill.trim()) return;
    setProfile(prev => ({
      ...prev,
      knownSkills: [...prev.knownSkills, currentKnownSkill.trim()]
    }));
    setCurrentKnownSkill('');
  };

  const addDesiredSkill = () => {
    if (!currentDesiredSkill.trim()) return;
    setProfile(prev => ({
      ...prev,
      desiredSkills: [...prev.desiredSkills, currentDesiredSkill.trim()]
    }));
    setCurrentDesiredSkill('');
  };

  const removeKnownSkill = (index) => {
    setProfile(prev => ({
      ...prev,
      knownSkills: prev.knownSkills.filter((_, i) => i !== index)
    }));
  };

  const removeDesiredSkill = (index) => {
    setProfile(prev => ({
      ...prev,
      desiredSkills: prev.desiredSkills.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (!profile.name || !profile.email || profile.knownSkills.length === 0) {
      alert('Please fill in name, email, and at least one known skill.');
      return;
    }

    const newProfile = {
      ...profile,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    onSubmit(newProfile);

    // Reset form
    setProfile({
      name: '',
      email: '',
      linkedin: '',
      github: '',
      gender: '',
      knownSkills: [],
      desiredSkills: [],
      isBeginner: false
    });

    alert('Profile created successfully!');
  };

  return (
    <div className="profile-form">
      <div className="form-card">
        <h2 className="form-title">Create Your Developer Profile</h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Gender (Optional)</label>
            <select
              value={profile.gender}
              onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value }))}
              className="form-select"
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div className="url-grid">
          <div className="form-group">
            <label className="form-label">LinkedIn URL</label>
            <input
              type="url"
              value={profile.linkedin}
              onChange={(e) => setProfile(prev => ({ ...prev, linkedin: e.target.value }))}
              className="form-input"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">GitHub URL</label>
            <input
              type="url"
              value={profile.github}
              onChange={(e) => setProfile(prev => ({ ...prev, github: e.target.value }))}
              className="form-input"
              placeholder="https://github.com/yourusername"
            />
          </div>
        </div>

        <div className="checkbox-container">
          <input
            type="checkbox"
            id="beginner"
            checked={profile.isBeginner}
            onChange={(e) => setProfile(prev => ({ ...prev, isBeginner: e.target.checked }))}
            className="checkbox"
          />
          <label htmlFor="beginner" className="checkbox-label">I'm a beginner</label>
        </div>

        <div className="skills-grid">
          <SkillInput
            label="Known Tech Stack *"
            value={currentKnownSkill}
            onChange={setCurrentKnownSkill}
            onAdd={addKnownSkill}
            onRemove={removeKnownSkill}
            skills={profile.knownSkills}
            placeholder="e.g., JavaScript, Python, React..."
            type="known"
            suggestions={commonSkills}
            required={true}
          />

          <SkillInput
            label="Desired Tech Stack (What you want to learn)"
            value={currentDesiredSkill}
            onChange={setCurrentDesiredSkill}
            onAdd={addDesiredSkill}
            onRemove={removeDesiredSkill}
            skills={profile.desiredSkills}
            placeholder="e.g., Machine Learning, Vue.js, Docker..."
            type="desired"
            suggestions={commonSkills}
          />
        </div>

        <div className="submit-container">
          <button onClick={handleSubmit} className="submit-button">
            Create Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
