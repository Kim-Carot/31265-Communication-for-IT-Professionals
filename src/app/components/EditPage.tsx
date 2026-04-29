import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useData } from '../context/DataContext';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

export function EditPage() {
  const navigate = useNavigate();
  const { todayActions, upcomingActions, updateTodayActions, updateUpcomingActions } = useData();

  const [todayItems, setTodayItems] = useState(todayActions.map(a => a.text));
  const [upcomingItems, setUpcomingItems] = useState(upcomingActions.map(a => a.text));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateTodayActions(todayItems.filter(t => t.trim()).map(text => ({
      text,
      icon: todayActions[0].icon
    })));

    updateUpcomingActions(upcomingItems.filter(t => t.trim()).map(text => ({
      text,
      icon: upcomingActions[0].icon
    })));

    navigate('/');
  };

  const addTodayItem = () => {
    setTodayItems([...todayItems, '']);
  };

  const addUpcomingItem = () => {
    setUpcomingItems([...upcomingItems, '']);
  };

  const removeTodayItem = (index: number) => {
    setTodayItems(todayItems.filter((_, i) => i !== index));
  };

  const removeUpcomingItem = (index: number) => {
    setUpcomingItems(upcomingItems.filter((_, i) => i !== index));
  };

  const updateTodayItem = (index: number, value: string) => {
    const newItems = [...todayItems];
    newItems[index] = value;
    setTodayItems(newItems);
  };

  const updateUpcomingItem = (index: number, value: string) => {
    const newItems = [...upcomingItems];
    newItems[index] = value;
    setUpcomingItems(newItems);
  };

  return (
    <div className="min-h-dvh bg-slate-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-700 hover:text-blue-900 text-xl"
          >
            <ArrowLeft className="w-6 h-6" />
            Back to Display
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
          <h1 className="text-3xl mb-6 text-slate-900">Edit Action Items</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* What to do today */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl text-orange-900">What to do today</h2>
                <button
                  type="button"
                  onClick={addTodayItem}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  <Plus className="w-5 h-5" />
                  Add Item
                </button>
              </div>
              <div className="space-y-3">
                {todayItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateTodayItem(index, e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-lg text-lg focus:outline-none focus:border-orange-500"
                      placeholder="Enter action item"
                    />
                    <button
                      type="button"
                      onClick={() => removeTodayItem(index)}
                      className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Up / Be Ready */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl text-red-900">Coming Up / Be Ready</h2>
                <button
                  type="button"
                  onClick={addUpcomingItem}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <Plus className="w-5 h-5" />
                  Add Item
                </button>
              </div>
              <div className="space-y-3">
                {upcomingItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateUpcomingItem(index, e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-lg text-lg focus:outline-none focus:border-red-500"
                      placeholder="Enter action item"
                    />
                    <button
                      type="button"
                      onClick={() => removeUpcomingItem(index)}
                      className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-xl"
              >
                Save and Update Display
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-4 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 text-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
