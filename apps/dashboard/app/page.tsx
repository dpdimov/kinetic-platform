'use client';

import { useState, useEffect } from 'react';
import { AssessmentResult } from '@kinetic/database';
import FilterPanel from '@/components/FilterPanel';
import PublicFilterPanel from '@/components/PublicFilterPanel';
import AnalyticsPanel from '@/components/AnalyticsPanel';
import ScatterplotHeatmap from '@/components/ScatterplotHeatmap';
import AdminLogin from '@/components/AdminLogin';
import { checkClientAuth, setClientAuth, logout } from '@/lib/auth';
import { getBackgroundImageForAssessment } from '@/lib/config';

interface ResultsResponse {
  results: AssessmentResult[];
  count: number;
  filters: any;
}

export default function Home() {
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<any>({});
  const [publicFilters, setPublicFilters] = useState<any>({ assessmentId: 'kinetic-thinking' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string>(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/plot-background.png`);

  useEffect(() => {
    // Check authentication on component mount
    const authenticated = checkClientAuth();
    setIsAuthenticated(authenticated);
    setAuthChecked(true);
  }, []);

  // Fetch public data when publicFilters is properly initialized
  useEffect(() => {
    if (publicFilters.assessmentId) {
      fetchPublicResults(publicFilters);
    }
  }, [publicFilters]);

  // Update background image when filters change
  useEffect(() => {
    updateBackgroundImage(publicFilters);
  }, [publicFilters]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchResults(filters);
    }
  }, [filters, isAuthenticated, publicFilters]);

  const updateBackgroundImage = async (filterParams: any) => {
    try {
      const assessmentId = filterParams.assessmentId || 'kinetic-thinking';
      const bgImage = await getBackgroundImageForAssessment(assessmentId);
      setBackgroundImage(bgImage);
    } catch (error) {
      console.error('Error loading background image:', error);
      setBackgroundImage(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/plot-background.png`); // fallback
    }
  };

  const fetchPublicResults = async (filterParams: any) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.keys(filterParams).forEach(key => {
        if (filterParams[key]) {
          params.append(key, filterParams[key]);
        }
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/results?${params}`);
      const data: ResultsResponse = await response.json();
      
      setResults(data.results);
      setTotalCount(data.count);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async (filterParams: any) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.keys(filterParams).forEach(key => {
        if (filterParams[key]) {
          params.append(key, filterParams[key]);
        }
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/results?${params}`);
      const data: ResultsResponse = await response.json();
      
      setResults(data.results);
      setTotalCount(data.count);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublicFiltersChange = (newFilters: any) => {
    setPublicFilters(newFilters);
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleLogin = () => {
    setClientAuth(true);
    setIsAuthenticated(true);
    fetchResults(filters);
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    // Restore public data after logout
    fetchPublicResults(publicFilters);
  };

  // Show loading while checking authentication
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/kinetic-logo.png`}
            alt="Kinetic Thinking Styles"
            className="mx-auto mb-6"
            style={{ height: 64, width: 'auto' }}
          />
          <h1 className="text-3xl font-bold text-gray-900">Kinetic Styles Results</h1>
          <p className="mt-2 text-gray-600">
            View and analyze the Kinetic Styles assessments results and visualizations
          </p>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Logout
            </button>
          )}
        </div>

        {/* Public Section - Always Visible */}
        <PublicFilterPanel onFiltersChange={handlePublicFiltersChange} />
        
        <AnalyticsPanel filters={publicFilters} />
        
        <ScatterplotHeatmap results={results} backgroundImage={backgroundImage} assessmentId={publicFilters.assessmentId || 'kinetic-thinking'} />
        
        {/* Admin Section - Only Visible After Login */}
        {!isAuthenticated ? (
          <div className="mt-8">
            <AdminLogin onLogin={handleLogin} />
          </div>
        ) : (
          <>
            <div className="mt-8 pt-8 border-t border-gray-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Panel</h2>
              
              <FilterPanel onFiltersChange={handleFiltersChange} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}