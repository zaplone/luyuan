'use client';

import { useState, useEffect } from 'react';
import { X, Cookie, Settings, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    localStorage.setItem('cookie-preferences', JSON.stringify(allAccepted));
    setIsVisible(false);
    
    // Initialize analytics if accepted
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      });
    }
  };

  const acceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    setIsVisible(false);
    
    // Update analytics consent
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied',
      });
    }
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary));
    localStorage.setItem('cookie-preferences', JSON.stringify(onlyNecessary));
    setIsVisible(false);
    
    // Deny all non-necessary cookies
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="container-custom py-4">
        {!showSettings ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-start space-x-3 flex-1">
              <Cookie className="h-6 w-6 text-primary-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  We use cookies
                </h3>
                <p className="text-sm text-gray-600">
                  We use cookies to enhance your browsing experience, serve personalized content, 
                  and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
              <button
                onClick={() => setShowSettings(true)}
                className="btn btn-outline btn-sm inline-flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Customize
              </button>
              <button
                onClick={rejectAll}
                className="btn btn-ghost btn-sm"
              >
                Reject All
              </button>
              <button
                onClick={acceptAll}
                className="btn btn-primary btn-sm"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Necessary Cookies */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Necessary Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Required for the website to function properly. Cannot be disabled.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Always Active</span>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>
                <button
                  onClick={() => togglePreference('analytics')}
                  className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    preferences.analytics ? 'bg-primary-600' : 'bg-gray-200'
                  )}
                >
                  <span
                    className={cn(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Used to deliver personalized advertisements and track campaign performance.
                  </p>
                </div>
                <button
                  onClick={() => togglePreference('marketing')}
                  className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    preferences.marketing ? 'bg-primary-600' : 'bg-gray-200'
                  )}
                >
                  <span
                    className={cn(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setShowSettings(false)}
                className="btn btn-outline btn-sm"
              >
                Back
              </button>
              <button
                onClick={acceptSelected}
                className="btn btn-primary btn-sm"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
