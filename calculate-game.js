// Скрипт для расчета последовательности ходов кубика
// Игра: 31 декабря - 2 февраля (34 дня)
// Цель: дойти до финиша ровно 2 февраля

const START_DATE = new Date('2024-12-31');
const END_DATE = new Date('2025-02-02');
const TOTAL_POINTS = 90; // Общее количество точек на карте

function calculateDays() {
  const days = [];
  const current = new Date(START_DATE);
  
  while (current <= END_DATE) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return days.length; // 34 дня
}

function calculateSequence() {
  const totalDays = calculateDays();
  const sequence = [];
  let dayIndex = 0;
  const targetSum = TOTAL_POINTS;
  let sum = 0;
  
  // Предопределенная последовательность для более интересной игры
  // С вариативностью, но гарантированным финишем
  const predefinedSequence = [
    4, 5, 3, 6, 2, 4, 3, 5, 2, 4,  // Дни 1-10
    3, 5, 2, 4, 3, 5, 2, 4, 3, 5,  // Дни 11-20
    2, 4, 3, 5, 2, 4, 3, 5, 2, 4,  // Дни 21-30
    3, 5, 2, 3                      // Дни 31-34
  ];
  
  // Генерируем последовательность с вариативностью
  while (dayIndex < totalDays && sum < targetSum) {
    const remainingDays = totalDays - dayIndex;
    const remainingPoints = targetSum - sum;
    
    let diceValue;
    
    if (dayIndex < predefinedSequence.length) {
      // Используем предопределенную последовательность
      diceValue = predefinedSequence[dayIndex];
    } else {
      // Если вышли за пределы, рассчитываем динамически
      const avgNeeded = remainingPoints / remainingDays;
      diceValue = Math.max(1, Math.min(6, Math.round(avgNeeded)));
    }
    
    // Корректируем, если нужно, чтобы точно попасть на финиш
    if (remainingPoints < remainingDays) {
      // Если осталось меньше дней, делаем маленькие ходы
      diceValue = Math.min(remainingPoints, diceValue);
    } else if (remainingPoints > remainingDays * 5) {
      // Если много осталось, можно больше
      diceValue = Math.min(6, diceValue + 1);
    }
    
    // Ограничиваем от 1 до 6
    diceValue = Math.max(1, Math.min(6, diceValue));
    
    // Проверяем, не превысим ли мы финиш
    if (sum + diceValue > targetSum && remainingDays === 1) {
      diceValue = targetSum - sum;
    }
    
    sequence.push({
      day: dayIndex + 1,
      date: new Date(START_DATE.getTime() + dayIndex * 24 * 60 * 60 * 1000),
      diceValue: diceValue,
      positionBefore: sum,
      positionAfter: sum + diceValue
    });
    
    sum += diceValue;
    dayIndex++;
    
    // Если выпало 1, добавляем дополнительный ход в тот же день
    if (diceValue === 1 && dayIndex < totalDays && sum < targetSum) {
      const extraRemaining = targetSum - sum;
      const extraDice = Math.min(6, Math.max(1, Math.min(extraRemaining, 4)));
      
      sequence.push({
        day: dayIndex,
        date: new Date(START_DATE.getTime() + (dayIndex - 1) * 24 * 60 * 60 * 1000),
        diceValue: extraDice,
        positionBefore: sum,
        positionAfter: sum + extraDice,
        isExtra: true
      });
      sum += extraDice;
    }
    
    // Если достигли финиша, останавливаемся
    if (sum >= targetSum) {
      break;
    }
  }
  
  // Корректируем последний ход, чтобы точно попасть на финиш
  if (sum !== targetSum && sequence.length > 0) {
    const lastMove = sequence[sequence.length - 1];
    const diff = sum - targetSum;
    if (diff !== 0) {
      lastMove.diceValue = Math.max(1, lastMove.diceValue - diff);
      lastMove.positionAfter = lastMove.positionBefore + lastMove.diceValue;
      sum = lastMove.positionAfter;
    }
  }
  
  return {
    sequence,
    totalPoints: sum,
    totalDays: sequence.filter(s => !s.isExtra).length
  };
}

const result = calculateSequence();
console.log('Последовательность ходов:');
console.log(JSON.stringify(result, null, 2));
console.log(`\nВсего точек: ${result.totalPoints}`);
console.log(`Всего ходов: ${result.sequence.length}`);

