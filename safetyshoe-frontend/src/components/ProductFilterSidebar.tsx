'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

// Filter structure: id + options[].value (labels from i18n)
const FILTER_GROUPS = [
  { id: 'category', options: ['construction', 'mining', 'oil-gas', 'manufacturing', 'logistics', 'food', 'medical'] },
  { id: 'standard', options: ['sb', 'sbp', 's1', 's1p', 's2', 's3', 'ob'] },
  { id: 'feature', options: ['waterproof', 'slip-resistant', 'metal-free', 'esd', 'heat-resistant', 'cold-insulated', 'metatarsal'] },
  { id: 'material', options: ['leather-full', 'leather-split', 'microfiber', 'mesh', 'pvc-rubber'] },
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
  const t = useTranslations('ProductFilterSidebar');
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
          <span>{t('title')}</span>
        </div>
        {hasActiveFilters && (
          <button 
            onClick={onClearFilters}
            className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center"
          >
            {t('clearAll')}
            <X className="w-3 h-3 ml-1" />
          </button>
        )}
      </div>

      {/* Filter Groups */}
      <div className="space-y-6">
        {FILTER_GROUPS.map((group) => {
          const isCollapsed = collapsedGroups.includes(group.id);
          const activeCount = selectedFilters[group.id]?.length || 0;
          const groupLabelKey = `groups.${group.id}.label` as const;

          return (
            <div key={group.id} className="border-b border-slate-50 pb-6 last:border-0 last:pb-0">
              <button 
                onClick={() => toggleGroup(group.id)}
                className="flex items-center justify-between w-full text-left mb-3 group"
              >
                <span className="font-semibold text-slate-800 group-hover:text-primary-600 transition-colors text-sm">
                  {t(groupLabelKey)}
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
                  {group.options.map((value) => {
                    const isSelected = selectedFilters[group.id]?.includes(value);
                    const optionLabelKey = `groups.${group.id}.options.${value}` as const;
                    return (
                      <label 
                        key={value} 
                        className="flex items-start gap-3 cursor-pointer group hover:bg-slate-50 p-1.5 rounded transition-colors"
                      >
                        <div className="relative flex items-center mt-0.5">
                          <input
                            type="checkbox"
                            className="peer h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                            checked={isSelected}
                            onChange={() => onFilterChange(group.id, value)}
                          />
                        </div>
                        <span className={`text-sm ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-600 group-hover:text-slate-900'}`}>
                          {t(optionLabelKey)}
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

