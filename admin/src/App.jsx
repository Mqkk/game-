import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL =
  import.meta.env.VITE_API_URL || "https://game-api.dev.datefrueet.ru";

function App() {
  const [messages, setMessages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [gameState, setGameState] = useState(null);
  const [editingPoint, setEditingPoint] = useState(null);
  const [editText, setEditText] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
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
      const [messagesRes, questionsRes, stateRes, bannerRes] = await Promise.all([
        axios.get(`${API_URL}/api/admin/messages`),
        axios.get(`${API_URL}/api/admin/questions`),
        axios.get(`${API_URL}/api/admin/game-state`),
        axios.get(`${API_URL}/api/admin/welcome-banner`),
      ]);
      setMessages(messagesRes.data);
      setQuestions(questionsRes.data);
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
    setEditImageUrl(point.imageUrl || "");
    const question = questions.find((q) => q.pointIndex === point.pointIndex);
    setEditQuestion(question?.question || "");
    setEditAnswer(question?.answer || "");
  };

  const handleSave = async (pointIndex) => {
    try {
      const payload = {
        pointIndex,
        message: editText,
      };

      // Отправляем imageUrl только если он не пустой
      if (editImageUrl && editImageUrl.trim() !== "") {
        payload.imageUrl = editImageUrl.trim();
      } else {
        payload.imageUrl = null;
      }

      await axios.post(`${API_URL}/api/admin/messages`, payload);
      
      // Сохраняем вопрос, если он указан
      const dayForPoint = gameState?.positionToDay?.[pointIndex];
      const SUDOKU_DAYS = [5, 10, 15, 25, 30];
      const needsQuestion = dayForPoint && dayForPoint >= 4 && !SUDOKU_DAYS.includes(dayForPoint);
      
      if (needsQuestion && editQuestion.trim() && editAnswer.trim()) {
        await axios.post(`${API_URL}/api/admin/questions`, {
          pointIndex,
          question: editQuestion.trim(),
          answer: editAnswer.trim(),
        });
      }
      
      await loadData();
      setEditingPoint(null);
      setEditText("");
      setEditImageUrl("");
      setEditQuestion("");
      setEditAnswer("");
    } catch (error) {
      console.error("Ошибка сохранения:", error);
      alert(
        `Ошибка сохранения сообщения: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleCancel = () => {
    setEditingPoint(null);
    setEditText("");
    setEditImageUrl("");
    setEditQuestion("");
    setEditAnswer("");
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
          {(() => {
            // Формируем список всех точек для отображения
            // Включаем только те точки, на которые реально вставал пользователь
            const allPoints = new Set();
            
            // Последовательность кубика (та же, что на бэкенде)
            const DICE_SEQUENCE = [
              3, 1, 2, 2, 1, 5, 3, 2, 1, 4, 2, 1, 6, 1, 2, 3, 5, 1, 2, 3, 1, 6, 1, 5, 2,
              1, 3, 1, 5, 2, 2, 3, 4, 4,
            ];
            const TOTAL_POINTS = 90;
            
            // Пересчитываем все позиции, на которые реально вставал пользователь
            const visitedPositions = new Set();
            if (gameState?.totalMoves !== undefined && gameState.totalMoves > 0) {
              let position = 0;
              visitedPositions.add(0); // Начальная позиция
              
              // Проходим по всем сделанным ходам
              for (let i = 0; i < gameState.totalMoves && i < DICE_SEQUENCE.length; i++) {
                const diceValue = DICE_SEQUENCE[i];
                position = Math.min(position + diceValue, TOTAL_POINTS);
                visitedPositions.add(position);
              }
            } else if (gameState?.currentPosition !== undefined) {
              // Если totalMoves = 0, но есть currentPosition, добавляем только начальную позицию
              visitedPositions.add(0);
            }
            
            // Добавляем все пройденные позиции в список для отображения
            visitedPositions.forEach(p => allPoints.add(p));
            
            // Добавляем все достижимые точки (будущие) из reachablePositions
            if (gameState?.reachablePositions) {
              gameState.reachablePositions.forEach(p => allPoints.add(p));
            }
            
            // Если нет данных, используем все 90 точек
            const pointsToShow = allPoints.size > 0 
              ? Array.from(allPoints).sort((a, b) => a - b)
              : Array.from({ length: 90 }, (_, i) => i);
            
            return pointsToShow.map((pointIndex) => {
            const message = messages.find((m) => m.pointIndex === pointIndex);
            const question = questions.find((q) => q.pointIndex === pointIndex);
            const isEditing = editingPoint === pointIndex;
            // Точка считается пройденной, если она есть в списке реально посещенных позиций
            const isVisited = visitedPositions.has(pointIndex);
            // Проверяем, нужен ли вопрос для этой точки (начиная с 4 дня, кроме дней с судоку)
            const dayForPoint = gameState?.positionToDay?.[pointIndex];
            const SUDOKU_DAYS = [5, 10, 15, 25, 30];
            const needsQuestion = dayForPoint && dayForPoint >= 4 && !SUDOKU_DAYS.includes(dayForPoint);

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
                    <label>
                      Сообщение:
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="Введите сообщение... Можно использовать ссылки (https://example.com) и изображения [image:https://example.com/image.jpg]"
                        rows={4}
                      />
                    </label>
                    <label>
                      URL изображения (опционально):
                      <input
                        type="url"
                        value={editImageUrl}
                        onChange={(e) => setEditImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </label>
                    {editImageUrl && (
                      <div className="image-preview">
                        <p>Превью изображения:</p>
                        <img
                          src={editImageUrl}
                          alt="Preview"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                        <p style={{ display: "none", color: "red" }}>
                          Не удалось загрузить изображение
                        </p>
                      </div>
                    )}
                    {needsQuestion && (
                      <>
                        <label>
                          Вопрос (обязательно для дней начиная с 4, кроме дней с судоку):
                          <textarea
                            value={editQuestion}
                            onChange={(e) => setEditQuestion(e.target.value)}
                            placeholder="Введите вопрос..."
                            rows={3}
                          />
                        </label>
                        <label>
                          Правильный ответ:
                          <input
                            type="text"
                            value={editAnswer}
                            onChange={(e) => setEditAnswer(e.target.value)}
                            placeholder="Введите правильный ответ..."
                          />
                        </label>
                      </>
                    )}
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
                    {message?.imageUrl && (
                      <div className="message-image-preview">
                        <img
                          src={message.imageUrl}
                          alt="Message"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                    <p>{message?.message || "Сообщение не задано"}</p>
                    {question && (
                      <div className="question-preview">
                        <p><strong>❓ Вопрос:</strong> {question.question}</p>
                        <p><strong>✅ Ответ:</strong> {question.answer}</p>
                      </div>
                    )}
                    {needsQuestion && !question && (
                      <p className="question-warning">⚠️ Вопрос не задан (обязательно для этой точки)</p>
                    )}
                    <button
                      onClick={() =>
                        handleEdit(
                          message || { pointIndex, message: "", imageUrl: "" }
                        )
                      }
                      className="edit-btn"
                    >
                      {message ? "Изменить" : "Добавить"}
                    </button>
                  </div>
                )}
              </div>
            );
            });
          })()}
        </div>
      </div>
    </div>
  );
}

export default App;
