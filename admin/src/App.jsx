import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  const [messages, setMessages] = useState([]);
  const [gameState, setGameState] = useState(null);
  const [editingPoint, setEditingPoint] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingStartDate, setEditingStartDate] = useState(false);
  const [startDateValue, setStartDateValue] = useState("");
  const [welcomeBanner, setWelcomeBanner] = useState(null);
  const [editingBanner, setEditingBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");
  const [bannerEnabled, setBannerEnabled] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [messagesRes, stateRes, bannerRes] = await Promise.all([
        axios.get(`${API_URL}/api/admin/messages`),
        axios.get(`${API_URL}/api/admin/game-state`),
        axios.get(`${API_URL}/api/admin/welcome-banner`),
      ]);
      setMessages(messagesRes.data);
      setGameState(stateRes.data);
      setWelcomeBanner(bannerRes.data);

      if (stateRes.data?.startDate) {
        // Преобразуем дату в формат для input[type="datetime-local"]
        const date = new Date(stateRes.data.startDate);
        const localDate = new Date(
          date.getTime() - date.getTimezoneOffset() * 60000
        );
        setStartDateValue(localDate.toISOString().slice(0, 16));
      }

      if (bannerRes.data) {
        setBannerMessage(bannerRes.data.message || "");
        setBannerEnabled(bannerRes.data.enabled !== false);
      }
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (point) => {
    setEditingPoint(point.pointIndex);
    setEditText(point.message || "");
  };

  const handleSave = async (pointIndex) => {
    try {
      await axios.post(`${API_URL}/api/admin/messages`, {
        pointIndex,
        message: editText,
      });
      await loadData();
      setEditingPoint(null);
      setEditText("");
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      alert("Ошибка сохранения сообщения");
    }
  };

  const handleCancel = () => {
    setEditingPoint(null);
    setEditText("");
  };

  const handleSaveStartDate = async () => {
    try {
      await axios.put(`${API_URL}/api/admin/game-state/start-date`, {
        startDate: new Date(startDateValue).toISOString(),
      });
      await loadData();
      setEditingStartDate(false);
      alert("Стартовая дата обновлена!");
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      alert("Ошибка сохранения стартовой даты");
    }
  };

  const handleSaveBanner = async () => {
    try {
      await axios.put(`${API_URL}/api/admin/welcome-banner`, {
        message: bannerMessage,
        enabled: bannerEnabled,
      });
      await loadData();
      setEditingBanner(false);
      alert("Настройки баннера обновлены!");
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      alert("Ошибка сохранения настроек баннера");
    }
  };

  const handleCancelBanner = () => {
    if (welcomeBanner) {
      setBannerMessage(welcomeBanner.message || "");
      setBannerEnabled(welcomeBanner.enabled !== false);
    }
    setEditingBanner(false);
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
              <p>
                Последний ход:{" "}
                {new Date(gameState.lastMoveDate).toLocaleString("ru-RU")}
              </p>
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
                    <button
                      onClick={() => setEditingStartDate(false)}
                      className="cancel-btn"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <div className="date-display">
                  <span>
                    {gameState.startDate
                      ? new Date(gameState.startDate).toLocaleString("ru-RU")
                      : "Не установлена"}
                  </span>
                  <button
                    onClick={() => setEditingStartDate(true)}
                    className="edit-btn"
                  >
                    Изменить
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <div className="welcome-banner-section">
        <h2>🎉 Приветственный баннер</h2>
        {welcomeBanner && (
          <div className="banner-card">
            {editingBanner ? (
              <div className="banner-edit-form">
                <label>
                  Сообщение баннера:
                  <textarea
                    value={bannerMessage}
                    onChange={(e) => setBannerMessage(e.target.value)}
                    placeholder="Введите приветственное сообщение..."
                    rows={4}
                    className="banner-textarea"
                  />
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={bannerEnabled}
                    onChange={(e) => setBannerEnabled(e.target.checked)}
                  />
                  <span>Показывать баннер при запуске игры</span>
                </label>
                {welcomeBanner.lastShownAt && (
                  <p className="last-shown">
                    Последний показ:{" "}
                    {new Date(welcomeBanner.lastShownAt).toLocaleString(
                      "ru-RU"
                    )}
                  </p>
                )}
                <div className="banner-buttons">
                  <button onClick={handleSaveBanner} className="save-btn">
                    Сохранить
                  </button>
                  <button onClick={handleCancelBanner} className="cancel-btn">
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              <div className="banner-display">
                <div className="banner-status">
                  <span
                    className={
                      bannerEnabled ? "status-enabled" : "status-disabled"
                    }
                  >
                    {bannerEnabled ? "✅ Включен" : "❌ Выключен"}
                  </span>
                </div>
                <p className="banner-message-preview">
                  {welcomeBanner.message || "Сообщение не задано"}
                </p>
                {welcomeBanner.lastShownAt && (
                  <p className="last-shown">
                    Последний показ:{" "}
                    {new Date(welcomeBanner.lastShownAt).toLocaleString(
                      "ru-RU"
                    )}
                  </p>
                )}
                <button
                  onClick={() => setEditingBanner(true)}
                  className="edit-btn"
                >
                  Редактировать
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="messages-container">
        <h2>Сообщения для точек</h2>
        {gameState && gameState.reachablePositions && (
          <p className="points-info">
            Отображаются только точки, которые будут посещены в течение игры (
            {gameState.reachablePositions.length} точек)
          </p>
        )}
        <div className="messages-grid">
          {(
            gameState?.reachablePositions ||
            Array.from({ length: 90 }, (_, i) => i + 1)
          ).map((pointIndex) => {
            const message = messages.find((m) => m.pointIndex === pointIndex);
            const isEditing = editingPoint === pointIndex;
            const isVisited =
              gameState && pointIndex < gameState.currentPosition;

            return (
              <div
                key={pointIndex}
                className={`message-card ${isVisited ? "visited" : ""} ${
                  pointIndex % 5 === 0 ? "major-point" : ""
                }`}
              >
                <div className="point-header">
                  <span className="point-number">Точка {pointIndex}</span>
                  {pointIndex % 5 === 0 && (
                    <span className="major-badge">⭐</span>
                  )}
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
                      <button
                        onClick={() => handleSave(pointIndex)}
                        className="save-btn"
                      >
                        Сохранить
                      </button>
                      <button onClick={handleCancel} className="cancel-btn">
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="message-content">
                    <p>{message?.message || "Сообщение не задано"}</p>
                    <button
                      onClick={() =>
                        handleEdit(message || { pointIndex, message: "" })
                      }
                      className="edit-btn"
                    >
                      {message ? "Изменить" : "Добавить"}
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
