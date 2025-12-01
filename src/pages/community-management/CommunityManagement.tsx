import { useState } from 'react';
import TabButton from '../../components/ui/visitor-log/TabButton';
import EstateStreet from './street/EstateStreet';
import Building from './building/Building';

import Flat from './flat/Flat';
import Resident from './resident/Resident';
import { MdKeyboardArrowDown } from 'react-icons/md';

type Visitor = 'resident-directory' | 'estate-street' | 'building' | 'flat';

const CommunityManagement = () => {
  const [activeTab, setActiveTab] = useState<Visitor>('resident-directory');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const tabs = [
    {
      id: 'resident-directory',
      label: 'Resident Directory',
      shortLabel: 'Resident Directory',
    },
    {
      id: 'estate-street',
      label: 'Estate Street',
      shortLabel: 'Estate Street',
    },
    {
      id: 'building',
      label: 'Building',
      shortLabel: 'Building',
    },
    {
      id: 'flat',
      label: 'Flat',
      shortLabel: 'Flat',
    },
  ];

  return (
    <section className="min-h-screen flex flex-col">
      {/* Desktop Tabs - Hidden on Mobile */}
      <div className="hidden md:block border-b border-border px-4 lg:px-5 my-5">
        <nav className="flex space-x-4 lg:space-x-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id as Visitor)}
            />
          ))}
        </nav>
      </div>

      {/* Mobile Dropdown Tabs */}
      <div className="md:hidden px-4 py-3 border-b border-border bg-white my-5">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-pry-text">
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </span>
          </div>
          <MdKeyboardArrowDown
            className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
              showMobileFilters ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Mobile Dropdown Menu */}
        {showMobileFilters && (
          <div className="absolute left-0 right-0 mt-2 mx-4 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as Visitor);
                  setShowMobileFilters(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-pry text-light-text'
                    : 'text-pry-text hover:bg-gray-100'
                }`}
              >
                <span className="">{tab.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pb-5">
        {activeTab === 'resident-directory' && <Resident />}
        {activeTab === 'estate-street' && <EstateStreet />}
        {activeTab === 'building' && <Building />}
        {activeTab === 'flat' && <Flat />}
      </div>
    </section>
  );
};

export default CommunityManagement;
