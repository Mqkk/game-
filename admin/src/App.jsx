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

  // Web (Next.js PWA)
  const [webCards, setWebCards] = useState([]);
  const [newWebCardText, setNewWebCardText] = useState("");
  const [newWebCardImageUrl, setNewWebCardImageUrl] = useState("");
  const [newWebCardOrder, setNewWebCardOrder] = useState(0);
  const [newWebCardEnabled, setNewWebCardEnabled] = useState(true);
  const [webPassword, setWebPassword] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [messagesRes, questionsRes, stateRes, bannerRes, webCardsRes] =
        await Promise.all([
          axios.get(`${API_URL}/api/admin/messages`),
          axios.get(`${API_URL}/api/admin/questions`),
          axios.get(`${API_URL}/api/admin/game-state`),
          axios.get(`${API_URL}/api/admin/welcome-banner`),
          axios.get(`${API_URL}/api/admin/web/cards`),
        ]);
      setMessages(messagesRes.data);
      setQuestions(questionsRes.data);
      setGameState(stateRes.data);
      setWelcomeBanner(bannerRes.data);
      setWebCards(webCardsRes.data || []);

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
      const needsQuestion =
        dayForPoint && dayForPoint >= 4 && !SUDOKU_DAYS.includes(dayForPoint);

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

  // -----------------------
  // Web (Next.js PWA) admin
  // -----------------------

  const updateWebCardLocal = (id, patch) => {
    setWebCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch } : c))
    );
  };

  const handleCreateWebCard = async () => {
    try {
      await axios.post(`${API_URL}/api/admin/web/cards`, {
        text: newWebCardText,
        imageUrl: newWebCardImageUrl?.trim() ? newWebCardImageUrl.trim() : null,
        order: Number(newWebCardOrder) || 0,
        enabled: !!newWebCardEnabled,
      });
      setNewWebCardText("");
      setNewWebCardImageUrl("");
      setNewWebCardOrder(0);
      setNewWebCardEnabled(true);
      await loadData();
      alert("Карточка добавлена!");
    } catch (error) {
      console.error("Ошибка создания карточки:", error);
      alert("Ошибка создания карточки");
    }
  };

  const handleSaveWebCard = async (card) => {
    try {
      await axios.put(`${API_URL}/api/admin/web/cards/${card.id}`, {
        text: card.text,
        imageUrl: card.imageUrl?.trim() ? card.imageUrl.trim() : null,
        order: Number(card.order) || 0,
        enabled: !!card.enabled,
      });
      await loadData();
      alert("Карточка сохранена!");
    } catch (error) {
      console.error("Ошибка сохранения карточки:", error);
      alert("Ошибка сохранения карточки");
    }
  };

  const handleDeleteWebCard = async (id) => {
    if (!confirm("Удалить карточку?")) return;
    try {
      await axios.delete(`${API_URL}/api/admin/web/cards/${id}`);
      await loadData();
    } catch (error) {
      console.error("Ошибка удаления карточки:", error);
      alert("Ошибка удаления карточки");
    }
  };

  const handleSaveWebPassword = async () => {
    if (!webPassword || !webPassword.trim()) {
      alert("Введите пароль");
      return;
    }
    try {
      await axios.put(`${API_URL}/api/admin/web/password`, {
        password: webPassword.trim(),
      });
      setWebPassword("");
      alert("Пароль для Web (PWA) обновлён!");
    } catch (error) {
      console.error("Ошибка сохранения пароля:", error);
      alert("Ошибка сохранения пароля");
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

      <div className="web-section">
        <h2>🌐 Web (Next.js PWA)</h2>

        <div className="web-card">
          <h3>🔐 Пароль авторизации</h3>
          <p className="web-hint">
            Пароль используется на сайте. Текущий пароль не отображается — здесь
            задаётся новый.
          </p>
          <div className="web-row">
            <input
              className="web-input"
              type="password"
              value={webPassword}
              onChange={(e) => setWebPassword(e.target.value)}
              placeholder="Новый пароль…"
            />
            <button className="save-btn" onClick={handleSaveWebPassword}>
              Сохранить
            </button>
          </div>
        </div>

        <div className="web-card">
          <h3>🃏 Карточки (главный экран)</h3>

          <div className="web-new-card">
            <div className="web-row">
              <input
                className="web-input"
                value={newWebCardText}
                onChange={(e) => setNewWebCardText(e.target.value)}
                placeholder="Текст на обратной стороне…"
              />
            </div>
            <div className="web-row">
              <input
                className="web-input"
                value={newWebCardImageUrl}
                onChange={(e) => setNewWebCardImageUrl(e.target.value)}
                placeholder="URL картинки (опционально)…"
              />
              <input
                className="web-input web-input-small"
                type="number"
                value={newWebCardOrder}
                onChange={(e) => setNewWebCardOrder(e.target.value)}
                placeholder="order"
              />
              <label className="web-check">
                <input
                  type="checkbox"
                  checked={newWebCardEnabled}
                  onChange={(e) => setNewWebCardEnabled(e.target.checked)}
                />
                <span>Включена</span>
              </label>
              <button className="save-btn" onClick={handleCreateWebCard}>
                Добавить
              </button>
            </div>
          </div>

          <div className="web-cards-list">
            {webCards.length === 0 ? (
              <p className="web-hint">Карточек пока нет.</p>
            ) : (
              webCards.map((c) => (
                <div className="web-item" key={c.id}>
                  <div className="web-row">
                    <input
                      className="web-input web-input-small"
                      type="number"
                      value={c.order ?? 0}
                      onChange={(e) =>
                        updateWebCardLocal(c.id, {
                          order: Number(e.target.value) || 0,
                        })
                      }
                      placeholder="order"
                    />
                    <label className="web-check">
                      <input
                        type="checkbox"
                        checked={c.enabled !== false}
                        onChange={(e) =>
                          updateWebCardLocal(c.id, {
                            enabled: e.target.checked,
                          })
                        }
                      />
                      <span>Включена</span>
                    </label>
                    <button
                      className="save-btn"
                      onClick={() => handleSaveWebCard(c)}
                    >
                      Сохранить
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => handleDeleteWebCard(c.id)}
                    >
                      Удалить
                    </button>
                  </div>

                  <div className="web-row">
                    <textarea
                      className="web-textarea"
                      value={c.text || ""}
                      onChange={(e) =>
                        updateWebCardLocal(c.id, { text: e.target.value })
                      }
                      placeholder="Текст…"
                      rows={3}
                    />
                  </div>

                  <div className="web-row">
                    <input
                      className="web-input"
                      value={c.imageUrl || ""}
                      onChange={(e) =>
                        updateWebCardLocal(c.id, { imageUrl: e.target.value })
                      }
                      placeholder="URL картинки…"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
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
              3, 1, 2, 2, 1, 5, 3, 2, 1, 4, 2, 1, 6, 1, 2, 3, 5, 1, 2, 3, 1, 6,
              1, 5, 2, 1, 3, 1, 5, 2, 2, 3, 4, 4,
            ];
            const TOTAL_POINTS = 90;

            // Пересчитываем все позиции, на которые реально вставал пользователь
            const visitedPositions = new Set();
            if (
              gameState?.totalMoves !== undefined &&
              gameState.totalMoves > 0
            ) {
              let position = 0;
              visitedPositions.add(0); // Начальная позиция

              // Проходим по всем сделанным ходам
              for (
                let i = 0;
                i < gameState.totalMoves && i < DICE_SEQUENCE.length;
                i++
              ) {
                const diceValue = DICE_SEQUENCE[i];
                position = Math.min(position + diceValue, TOTAL_POINTS);
                visitedPositions.add(position);
              }
            } else if (gameState?.currentPosition !== undefined) {
              // Если totalMoves = 0, но есть currentPosition, добавляем только начальную позицию
              visitedPositions.add(0);
            }

            // Добавляем все пройденные позиции в список для отображения
            visitedPositions.forEach((p) => allPoints.add(p));

            // Добавляем все достижимые точки (будущие) из reachablePositions
            if (gameState?.reachablePositions) {
              gameState.reachablePositions.forEach((p) => allPoints.add(p));
            }

            // Если нет данных, используем все 90 точек
            const pointsToShow =
              allPoints.size > 0
                ? Array.from(allPoints).sort((a, b) => a - b)
                : Array.from({ length: 90 }, (_, i) => i);

            return pointsToShow.map((pointIndex) => {
              const message = messages.find((m) => m.pointIndex === pointIndex);
              const question = questions.find(
                (q) => q.pointIndex === pointIndex
              );
              const isEditing = editingPoint === pointIndex;
              // Точка считается пройденной, если она есть в списке реально посещенных позиций
              const isVisited = visitedPositions.has(pointIndex);
              // Проверяем, нужен ли вопрос для этой точки (начиная с 4 дня, кроме дней с судоку)
              const dayForPoint = gameState?.positionToDay?.[pointIndex];
              const SUDOKU_DAYS = [5, 10, 15, 25, 30];
              const needsQuestion =
                dayForPoint &&
                dayForPoint >= 4 &&
                !SUDOKU_DAYS.includes(dayForPoint);

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
                            Вопрос (обязательно для дней начиная с 4, кроме дней
                            с судоку):
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
                          <p>
                            <strong>❓ Вопрос:</strong> {question.question}
                          </p>
                          <p>
                            <strong>✅ Ответ:</strong> {question.answer}
                          </p>
                        </div>
                      )}
                      {needsQuestion && !question && (
                        <p className="question-warning">
                          ⚠️ Вопрос не задан (обязательно для этой точки)
                        </p>
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
