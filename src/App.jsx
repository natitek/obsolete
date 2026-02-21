import { useState } from 'react';
import './App.css';

import *  as futureJobs from "./suggestedVideos.json" 

function App() {
  const [jobTitle, setJobTitle] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

   
          const embedVideo = futureJobs.videos[(Math.floor(Math.random()*futureJobs.videos.length))]
          
        
        

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!jobTitle.trim()) return;

    setLoading(true);
    setShowResults(false);

    try {
      const response = await fetch('/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobTitle }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze job title');
      }

      const data = await response.json();
      setAnalysis(data);
      setShowResults(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="title silkscreen-regular">Obsolete</h1>
        <p className="tagline">The Future is looking grim, Time to look at reality in the eyes</p>
      </header>
      <main className="app-main">
        <div className="card">
          <form className="form" onSubmit={handleAnalyze}>
            <input
              type="text"
              className="input"
              placeholder="Enter your job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <button type="submit" className="button" disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </form>
        </div>

        {loading && <div className="loading">loading ... Imagine Getting Replaced By A Clanker... LOL</div>}

        {showResults && analysis && (
          <div className="results-card">
            <h2>Analysis for "{jobTitle}"</h2>
            <div className="result-item">
              <strong>Automation :</strong> {analysis.automationPercentage}%
            </div>
            <div className="result-item">
              <strong>Risk Level:</strong> {analysis.riskLevel}
            </div>
            <div className="result-item">
              <strong>Reasoning:</strong> {analysis.reasoning}
            </div>
            <div className="result-item">
              <strong>Options: (to stay a head of the competition)</strong>
              <ul>
                {analysis.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {showResults && (
          <div className="results-card video-recommendation">
            <h2>Might as well change careers to get a head of the competition</h2>
            <p>Embrace your future. Start learning ai-proof jobs today</p>
            <div className="video-container">
              <iframe
                width="560"
                height="315"
                src={embedVideo}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </main>
      <footer className="app-footer">
        <p>&copy; 2026 Obsolete</p>
      </footer>
    </div>
  );
}

export default App;
