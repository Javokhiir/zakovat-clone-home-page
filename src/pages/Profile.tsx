
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileView from '@/components/ProfileView';
import ProfileEdit from '@/components/ProfileEdit';
import { Button } from '@/components/ui/button';
import { Edit, Eye } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'view' | 'edit'>('view');

  const tabs = [
    { id: 'view', label: 'Profilni Ko\'rish', icon: Eye },
    { id: 'edit', label: 'Tahrirlash', icon: Edit }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'view' | 'edit')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'view' && <ProfileView />}
            {activeTab === 'edit' && <ProfileEdit />}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
