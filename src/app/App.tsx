import { BrowserRouter, Routes, Route } from 'react-router';
import { DataProvider } from './context/DataContext';
import { DisplayPage } from './components/DisplayPage';
import { EditPage } from './components/EditPage';

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayPage />} />
          <Route path="/edit" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}