import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import SkillInput from './SkillInput';

const SearchForm = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    requiredSkills: [],
    teamSize: 3,
    includeBeginner: true
  });

  const [currentRequiredSkill, setCurrentRequiredSkill] = useState('');

  const addRequiredSkill = () => {
    if (!currentRequiredSkill.trim()) return;
    setSearchCriteria(prev => ({
      ...prev,
      requiredSkills: [...prev.requiredSkills, currentRequiredSkill.trim()]
    }));
    setCurrentRequiredSkill('');
  };

  const removeRequiredSkill = (index) => {
    setSearchCriteria(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((_, i) => i !== index)
    }));
  };

  const handleSearch = () => {
    if (searchCriteria.requiredSkills.length === 0) {
      alert('Please specify at least one required skill.');
      return;
    }
    onSearch(searchCriteria);
  };

  return (
    <div className="search-form">
      <h2>
        <Search size={24} />
        Find Your Teammates
      </h2>
      <div className="search-fields">
        <div className="required-skills-section">
          <SkillInput
            label="Required Skills"
            value={currentRequiredSkill}
            onChange={e => setCurrentRequiredSkill(e.target.value)}
            onAdd={addRequiredSkill}
            onRemove={removeRequiredSkill}
            skills={searchCriteria.requiredSkills}
            placeholder="e.g., React, Python, UI/UX Design..."
            type="required"
            required
          />
        </div>
        <div className="filters-section">
          <div>
            <label htmlFor="team-size">Team Size</label>
            <select
              id="team-size"
              value={searchCriteria.teamSize}
              onChange={e =>
                setSearchCriteria(prev => ({
                  ...prev,
                  teamSize: parseInt(e.target.value)
                }))
              }
            >
              <option value={2}>2 members</option>
              <option value={3}>3 members</option>
              <option value={4}>4 members</option>
              <option value={5}>5 members</option>
            </select>
          </div>
          <div className="checkbox-row">
            <input
              type="checkbox"
              id="include-beginner"
              checked={searchCriteria.includeBeginner}
              onChange={e =>
                setSearchCriteria(prev => ({
                  ...prev,
                  includeBeginner: e.target.checked
                }))
              }
            />
            <label htmlFor="include-beginner">
              Include beginners
            </label>
          </div>
          <button
            onClick={handleSearch}
            className="search-btn"
            type="button"
          >
            <Filter size={20} />
            Search Teammates
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
