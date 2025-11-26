import { useState } from 'react';
import TabButton from '../../components/ui/visitor-log/TabButton';
import EstateStreet from './street/EstateStreet';
import Building from './building/Building';

import Flat from './flat/Flat';
import Resident from './resident/Resident';

type Visitor = 'Resident Directory' | 'Estate Street' | 'Building' | 'Flat';

const CommunityManagement = () => {
  const [activeTab, setActiveTab] = useState<Visitor>('Resident Directory');

  return (
    <section className="h-screen">
      {/* Header Tabs */}
      <div className="border-b border-gray-200 px-5 mb-5">
        <nav className="flex space-x-8">
          <TabButton
            label="Resident Directory"
            isActive={activeTab === 'Resident Directory'}
            onClick={() => {
              setActiveTab('Resident Directory');
            }}
          />
          <TabButton
            label="Estate Street"
            isActive={activeTab === 'Estate Street'}
            onClick={() => {
              setActiveTab('Estate Street');
            }}
          />
          <TabButton
            label="Building"
            isActive={activeTab === 'Building'}
            onClick={() => {
              setActiveTab('Building');
            }}
          />
          <TabButton
            label="Flat"
            isActive={activeTab === 'Flat'}
            onClick={() => {
              setActiveTab('Flat');
            }}
          />
        </nav>
      </div>
      <div className="pb-5">
        {activeTab === 'Resident Directory' && <Resident />}
        {activeTab === 'Estate Street' && <EstateStreet />}
        {activeTab === 'Building' && <Building />}
        {activeTab === 'Flat' && <Flat />}
      </div>
    </section>
  );
};

export default CommunityManagement;
