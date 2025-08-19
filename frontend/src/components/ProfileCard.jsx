import React from 'react';
import { FaCode, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import SkillTag from './SkillTag';

const ProfileCard = ({ profile }) => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <h3 className="profile-name">{profile.name}</h3>
        
        <div className="profile-badges">
          {profile.isBeginner && (
            <span className="beginner-badge">Beginner Friendly</span>
          )}
        </div>
      </div>

      <div className="profile-links">
        <a href={`mailto:${profile.email}`} className="profile-link">
          <FaEnvelope />
          Email
        </a>
        
        {profile.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="profile-link">
            <FaLinkedin />
            LinkedIn
          </a>
        )}
        
        {profile.github && (
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="profile-link">
            <FaGithub />
            GitHub
          </a>
        )}
      </div>

      {profile.knownSkills.length > 0 && (
        <div className="skills-section">
          <h4>Known Skills</h4>
          <div className="skills-list">
            {profile.knownSkills.map((skill, index) => (
              <SkillTag key={index} skill={skill} type="known" removable={false} />
            ))}
          </div>
        </div>
      )}

      {profile.desiredSkills.length > 0 && (
        <div className="skills-section">
          <h4>Wants to Learn</h4>
          <div className="skills-list">
            {profile.desiredSkills.map((skill, index) => (
              <SkillTag key={index} skill={skill} type="desired" removable={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
