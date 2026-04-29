import { Cloud, Wind, CloudRain, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useData } from '../context/DataContext';
import { Settings } from 'lucide-react';

export function DisplayPage() {
  const navigate = useNavigate();
  const { todayActions, upcomingActions } = useData();

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const timeString = currentDate.toLocaleTimeString('en-AU', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const risks = [
    {
      text: 'Strong winds 1–4 pm',
      hasRedDot: false,
      icon: Wind
    },
    {
      text: 'Storm risk after 2 pm',
      hasRedDot: false,
      icon: AlertTriangle
    },
    {
      text: 'Heavy rain after 6 pm',
      hasRedDot: true,
      icon: CloudRain
    },
  ];

  return (
    <div className="min-h-dvh bg-slate-50 flex items-center justify-center py-6">
      <div className="flex flex-col gap-2.5" style={{ width: 'min(1100px, calc(100vw - 120px))' }}>
        {/* Header */}
        <header className="bg-blue-700 text-white px-6 py-2.5 flex items-center justify-between rounded-xl flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="text-2xl">Weather &amp; Preparedness</div>
            <div className="text-base text-blue-200">Source: BoM</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 rounded-lg px-4 py-2 flex-shrink-0">
              <div className="text-xl">{timeString}</div>
              <div className="text-sm text-blue-200">{dateString}</div>
            </div>
            <button
              onClick={() => navigate('/edit')}
              className="bg-blue-600 hover:bg-blue-500 rounded-lg px-4 py-2 flex items-center gap-2"
              title="Edit Actions"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Today's Risk Summary */}
        <section className="bg-white rounded-xl p-4 shadow-lg border-2 border-blue-200 flex-shrink-0">
          <h2 className="text-2xl mb-2.5 text-blue-900">Today's weather risks</h2>

          <div className="flex gap-4">
            {/* Weather Icon Placeholder */}
            <div className="w-28 h-28 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Cloud className="w-14 h-14 text-blue-600" />
            </div>

            {/* Risk Items */}
            <div className="flex-1 flex flex-col gap-2 min-w-0">
              {risks.map((risk, index) => {
                const Icon = risk.icon;
                return (
                  <div key={index} className="flex items-center gap-3 min-w-0">
                    <Icon className="w-6 h-6 text-blue-700 flex-shrink-0" />
                    <div className="flex items-center gap-2">
                      <div className="text-xl text-gray-800">{risk.text}</div>
                      {risk.hasRedDot && (
                        <div className="w-4 h-4 rounded-full bg-red-600 flex-shrink-0"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Preparedness Actions - Two Columns */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Left Column: What to do today */}
          <section className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 shadow-lg border-2 border-orange-400 flex-shrink-0">
            <h2 className="text-2xl mb-2.5 text-orange-900">What to do today</h2>

            <div className="flex flex-col gap-2">
              {todayActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-2.5 flex items-center gap-4 shadow-md border border-orange-200 min-w-0">
                    <div className="w-11 h-11 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xl text-gray-900 min-w-0">{action.text}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Right Column: Coming Up / Be Ready */}
          <section className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 shadow-lg border-2 border-red-400 flex-shrink-0">
            <h2 className="text-2xl mb-2.5 text-red-900">Coming Up / Be Ready</h2>

            <div className="flex flex-col gap-2">
              {upcomingActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-2.5 flex items-center gap-4 shadow-md border border-red-200 min-w-0">
                    <div className="w-11 h-11 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xl text-gray-900 min-w-0">{action.text}</div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-slate-200 px-4 py-2 text-slate-700 rounded-xl flex-shrink-0">
          <div className="flex items-center justify-between text-base">
            <div>Updated by staff</div>
            <div>Last updated: {timeString}</div>
            <div>Official information from BoM</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
