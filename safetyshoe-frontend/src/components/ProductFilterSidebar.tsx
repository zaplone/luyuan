'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

// Filter Data Configuration
const FILTER_GROUPS = [
  {
    id: 'category',
    label: 'Industry / Category',
    options: [
      { value: 'construction', label: 'Construction & Building' },
      { value: 'mining', label: 'Mining & Quarrying' },
      { value: 'oil-gas', label: 'Oil & Gas' },
      { value: 'manufacturing', label: 'Manufacturing' },
      { value: 'logistics', label: 'Logistics & Warehousing' },
      { value: 'food', label: 'Food Industry' },
      { value: 'medical', label: 'Medical & Healthcare' },
    ]
  },
  {
    id: 'standard',
    label: 'Safety Standard',
    options: [
      { value: 'sb', label: 'SB (Basic Safety)' },
      { value: 'sbp', label: 'SBP (SB + Puncture)' },
      { value: 's1', label: 'S1 (Anti-static)' },
      { value: 's1p', label: 'S1P (S1 + Puncture)' },
      { value: 's2', label: 'S2 (S1 + Waterproof)' },
      { value: 's3', label: 'S3 (S2 + Puncture)' },
      { value: 'ob', label: 'OB (Occupational)' },
    ]
  },
  {
    id: 'feature',
    label: 'Special Features',
    options: [
      { value: 'waterproof', label: 'Waterproof (WR)' },
      { value: 'slip-resistant', label: 'Slip Resistant (SRC)' },
      { value: 'metal-free', label: '100% Metal Free' },
      { value: 'esd', label: 'ESD / Anti-static' },
      { value: 'heat-resistant', label: 'Heat Resistant (HRO)' },
      { value: 'cold-insulated', label: 'Cold Insulated (CI)' },
      { value: 'metatarsal', label: 'Metatarsal Guard (M)' },
    ]
  },
  {
    id: 'material',
    label: 'Upper Material',
    options: [
      { value: 'leather-full', label: 'Full Grain Leather' },
      { value: 'leather-split', label: 'Split Leather' },
      { value: 'microfiber', label: 'Microfiber' },
      { value: 'mesh', label: 'Breathable Mesh' },
      { value: 'pvc-rubber', label: 'PVC / Rubber' },
    ]
  }
];

interface FilterSidebarProps {
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, value: string) => void;
  onClearFilters: () => void;
  className?: string;
}

export function ProductFilterSidebar({ 
  selectedFilters, 
  onFilterChange, 
  onClearFilters,
  className = '' 
}: FilterSidebarProps) {
  // Manage collapse state for each group
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([]);

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId) 
        : [...prev, groupId]
    );
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm p-5 ${className}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-900 font-bold">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <button 
            onClick={onClearFilters}
            className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center"
          >
            Clear All
            <X className="w-3 h-3 ml-1" />
          </button>
        )}
      </div>

      {/* Filter Groups */}
      <div className="space-y-6">
        {FILTER_GROUPS.map((group) => {
          const isCollapsed = collapsedGroups.includes(group.id);
          const activeCount = selectedFilters[group.id]?.length || 0;

          return (
            <div key={group.id} className="border-b border-slate-50 pb-6 last:border-0 last:pb-0">
              <button 
                onClick={() => toggleGroup(group.id)}
                className="flex items-center justify-between w-full text-left mb-3 group"
              >
                <span className="font-semibold text-slate-800 group-hover:text-primary-600 transition-colors text-sm">
                  {group.label}
                  {activeCount > 0 && (
                    <span className="ml-2 bg-primary-100 text-primary-600 text-xs px-1.5 py-0.5 rounded-full">
                      {activeCount}
                    </span>
                  )}
                </span>
                {isCollapsed ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {!isCollapsed && (
                <div className="space-y-2 animate-fade-in">
                  {group.options.map((option) => {
                    const isSelected = selectedFilters[group.id]?.includes(option.value);
                    return (
                      <label 
                        key={option.value} 
                        className="flex items-start gap-3 cursor-pointer group hover:bg-slate-50 p-1.5 rounded transition-colors"
                      >
                        <div className="relative flex items-center mt-0.5">
                          <input
                            type="checkbox"
                            className="peer h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                            checked={isSelected}
                            onChange={() => onFilterChange(group.id, option.value)}
                          />
                        </div>
                        <span className={`text-sm ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-600 group-hover:text-slate-900'}`}>
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

