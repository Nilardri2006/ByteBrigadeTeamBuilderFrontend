import React, { useState, useEffect } from 'react';
import Header from './Header';
import NavigationTabs from './NavigationTabs';
import ProfileForm from './ProfileForm';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import './HackathonTeamBuilder.css';

const HackathonTeamBuilder = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profiles, setProfiles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Load profiles from localStorage on component mount
  useEffect(() => {
    const savedProfiles = localStorage.getItem('hackathonProfiles');
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }
  }, []);

  // Save profiles to localStorage whenever profiles change
  useEffect(() => {
    localStorage.setItem('hackathonProfiles', JSON.stringify(profiles));
  }, [profiles]);

  const handleProfileSubmit = (newProfile) => {
    setProfiles(prev => [...prev, newProfile]);
  };

  const handleSearch = (searchCriteria) => {
    const results = profiles.filter(profile => {
      // Check if profile has any of the required skills
      const hasRequiredSkills = searchCriteria.requiredSkills.some(skill =>
        profile.knownSkills.some(knownSkill =>
          knownSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );

      // Check beginner preference
      const beginnerMatch = searchCriteria.includeBeginner || !profile.isBeginner;

      return hasRequiredSkills && beginnerMatch;
    });

    setSearchResults(results);
    setHasSearched(true);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'search') {
      setHasSearched(false); // Reset search state when switching to search tab
    }
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <Header />
        <NavigationTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      <div className="content-wrapper">
        <div className="tab-content">
          {activeTab === 'profile' && (
            <ProfileForm onSubmit={handleProfileSubmit} />
          )}
          {activeTab === 'search' && (
            <>
              <SearchForm onSearch={handleSearch} />
              <SearchResults
                searchResults={searchResults}
                allProfiles={profiles}
                hasSearched={hasSearched}
                onCreateProfile={() => setActiveTab('profile')}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );


};

export default HackathonTeamBuilder;
