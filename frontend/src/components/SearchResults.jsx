import React from 'react';
import { Users } from 'lucide-react';
import ProfileCard from './ProfileCard';

const SearchResults = ({ searchResults, allProfiles, hasSearched, onCreateProfile }) => {
  // Show search results if there was a search
  if (hasSearched && searchResults.length > 0) {
    return (
      <div className="search-results">
        <div className="results-header">
          <h3 className="results-title">
            Found {searchResults.length} potential teammate{searchResults.length !== 1 ? 's' : ''}
          </h3>
        </div>
        
        <div className="results-grid">
          {searchResults.map(profile => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    );
  }

  // Show no results message if search was performed but no results
  if (hasSearched && searchResults.length === 0) {
    return (
      <div className="search-results">
        <div className="no-results">
          <Users className="no-results-icon" />
          <h3>No teammates found</h3>
          <p>Try adjusting your search criteria or check back later for new profiles.</p>
        </div>
      </div>
    );
  }

  // Show all profiles if no search has been performed yet
  if (allProfiles.length === 0) {
    return (
      <div className="search-results">
        <div className="no-results">
          <Users className="no-results-icon" />
          <h3>No profiles yet</h3>
          <p>Be the first to create a developer profile!</p>
          <button onClick={onCreateProfile} className="create-profile-button">
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  // Show all available profiles
  return (
    <div className="search-results">
      <div className="results-header">
        <h3 className="results-title">
          All Available Developers ({allProfiles.length})
        </h3>
      </div>
      
      <div className="results-grid">
        {allProfiles.map(profile => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
