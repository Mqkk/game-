import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [messages, setMessages] = useState([]);
  const [gameState, setGameState] = useState(null);
  const [editingPoint, setEditingPoint] = useState(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingStartDate, setEditingStartDate] = useState(false);
  const [startDateValue, setStartDateValue] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [messagesRes, stateRes] = await Promise.all([
        axios.get(`${API_URL}/api/admin/messages`),
        axios.get(`${API_URL}/api/admin/game-state`),
      ]);
      setMessages(messagesRes.data);
      setGameState(stateRes.data);
      if (stateRes.data?.startDate) {
        // Преобразуем дату в формат для input[type="datetime-local"]
        const date = new Date(stateRes.data.startDate);
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        setStartDateValue(localDate.toISOString().slice(0, 16));
      }
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (point) => {
    setEditingPoint(point.pointIndex);
    setEditText(point.message || '');
  };

  const handleSave = async (pointIndex) => {
    try {
      await axios.post(`${API_URL}/api/admin/messages`, {
        pointIndex,
        message: editText,
      });
      await loadData();
      setEditingPoint(null);
      setEditText('');
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка сохранения сообщения');
    }
  };

  const handleCancel = () => {
    setEditingPoint(null);
    setEditText('');
  };

  const handleSaveStartDate = async () => {
    try {
      await axios.put(`${API_URL}/api/admin/game-state/start-date`, {
        startDate: new Date(startDateValue).toISOString(),
      });
      await loadData();
      setEditingStartDate(false);
      alert('Стартовая дата обновлена!');
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка сохранения стартовой даты');
    }
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🎁 Админка игры для Иры</h1>
        {gameState && (
          <div className="game-info">
            <p>Текущая позиция: {gameState.currentPosition} / 90</p>
            <p>Всего ходов: {gameState.totalMoves}</p>
            {gameState.lastMoveDate && (
              <p>Последний ход: {new Date(gameState.lastMoveDate).toLocaleString('ru-RU')}</p>
            )}
            <div className="start-date-section">
              <label>Стартовая дата игры:</label>
              {editingStartDate ? (
                <div className="date-edit-form">
                  <input
                    type="datetime-local"
                    value={startDateValue}
                    onChange={(e) => setStartDateValue(e.target.value)}
                    className="date-input"
                  />
                  <div className="date-edit-buttons">
                    <button onClick={handleSaveStartDate} className="save-btn">
                      Сохранить
                    </button>
                    <button onClick={() => setEditingStartDate(false)} className="cancel-btn">
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <div className="date-display">
                  <span>
                    {gameState.startDate
                      ? new Date(gameState.startDate).toLocaleString('ru-RU')
                      : 'Не установлена'}
                  </span>
                  <button onClick={() => setEditingStartDate(true)} className="edit-btn">
                    Изменить
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <div className="messages-container">
        <h2>Сообщения для точек</h2>
        <div className="messages-grid">
          {Array.from({ length: 90 }, (_, i) => i + 1).map((pointIndex) => {
            const message = messages.find((m) => m.pointIndex === pointIndex);
            const isEditing = editingPoint === pointIndex;
            const isVisited = gameState && pointIndex <= gameState.currentPosition;

            return (
              <div
                key={pointIndex}
                className={`message-card ${isVisited ? 'visited' : ''} ${
                  pointIndex % 5 === 0 ? 'major-point' : ''
                }`}
              >
                <div className="point-header">
                  <span className="point-number">Точка {pointIndex}</span>
                  {pointIndex % 5 === 0 && <span className="major-badge">⭐</span>}
                </div>

                {isEditing ? (
                  <div className="edit-form">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      placeholder="Введите сообщение..."
                      rows={4}
                    />
                    <div className="edit-buttons">
                      <button onClick={() => handleSave(pointIndex)} className="save-btn">
                        Сохранить
                      </button>
                      <button onClick={handleCancel} className="cancel-btn">
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="message-content">
                    <p>{message?.message || 'Сообщение не задано'}</p>
                    <button onClick={() => handleEdit(message || { pointIndex, message: '' })} className="edit-btn">
                      {message ? 'Изменить' : 'Добавить'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

