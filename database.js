import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('zone_diet.db');

const initDb = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS foods (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, category TEXT NOT NULL, grams_per_block INTEGER NOT NULL);',
        [],
        () => {
          console.log('Table created successfully or already exists.'),
            resolve();
        },
        (_, { rows }) => {
          if (rows.length > 0) console.log('Row Count: ', rows.item(0).rowCount);
          tx.executeSql(
            'SELECT COUNT(id) AS rowCount FROM foods;',
            [],
            (_, { rows }) => {
              if (rows._array[0].rowCount === 0) {
                const FoodInfo = [
                  { name: 'Protein powder', category: 'Proteins', grams_per_block: 7 },
                  { name: 'Chicken breasts', category: 'Proteins', grams_per_block: 28 },
                  { name: 'Turkey breasts', category: 'Proteins', grams_per_block: 28 },
                  { name: 'Checken ham', category: 'Proteins', grams_per_block: 42 },
                  { name: 'Turkey ham', category: 'Proteins', grams_per_block: 35 },
                  { name: 'Rabbit', category: 'Proteins', grams_per_block: 28 },
                  { name: 'Fish', category: 'Proteins', grams_per_block: 35 },
                  { name: 'Tuna', category: 'Proteins', grams_per_block: 28 },
                  { name: 'Shrimps', category: 'Proteins', grams_per_block: 28 },
                  { name: 'Shellfish', category: 'Proteins', grams_per_block: 42 },
                  { name: 'Lobster', category: 'Proteins', grams_per_block: 42 },
                  { name: 'Salmon', category: 'Proteins', grams_per_block: 42 },
                  { name: 'Pork', category: 'Proteins', grams_per_block: 35 },
                  { name: 'Tofu Cheese', category: 'Proteins', grams_per_block: 70 },
                  { name: 'Tofu (soft)', category: 'Proteins', grams_per_block: 85 },
                  { name: 'Tofu (hard)', category: 'Proteins', grams_per_block: 85 },
                  { name: 'Beef', category: 'Proteins', grams_per_block: 28 },
                  { name: 'Beef mince', category: 'Proteins', grams_per_block: 42 },
                  { name: 'Lamb', category: 'Proteins', grams_per_block: 33 },
                  { name: 'Duck', category: 'Proteins', grams_per_block: 35 },
                  { name: 'Ham', category: 'Proteins', grams_per_block: 42 },
                  { name: 'Mozzarella', category: 'Proteins', grams_per_block: 28 },
                  { name: 'Mozzarella light', category: 'Proteins', grams_per_block: 35 },
                  { name: 'Ricotta', category: 'Proteins', grams_per_block: 56 },
                  { name: 'Eggs', category: 'Proteins', grams_per_block: 1 },
                  { name: 'Cottage cheese', category: 'Proteins', grams_per_block: 56 },
                  { name: 'Cheese (yellow)', category: 'Proteins', grams_per_block: 28 },
                  { name: 'Cheese (white)', category: 'Proteins', grams_per_block: 40 },
                  { name: 'Liver', category: 'Proteins', grams_per_block: 28 },
                  { name: 'Broccoli', category: 'Carbs', grams_per_block: 230 },
                  { name: 'Mushrooms', category: 'Carbs', grams_per_block: 360 },
                  { name: 'Tomatos', category: 'Carbs', grams_per_block: 330 },
                  { name: 'Chinese Cabbage', category: 'Carbs', grams_per_block: 250 },
                  { name: 'Cabbage', category: 'Carbs', grams_per_block: 300 },
                  { name: 'Cabbage (sour)', category: 'Carbs', grams_per_block: 450 },
                  { name: 'Cauliflower', category: 'Carbs', grams_per_block: 270 },
                  { name: 'Cucumber', category: 'Carbs', grams_per_block: 600 },
                  { name: 'Cucumers (sour)', category: 'Carbs', grams_per_block: 150 },
                  { name: 'Lentil (cookes)', category: 'Carbs', grams_per_block: 40 },
                  { name: 'Lentil', category: 'Carbs', grams_per_block: 28 },
                  { name: 'Carrots', category: 'Carbs', grams_per_block: 130 },
                  { name: 'Turnip', category: 'Carbs', grams_per_block: 300 },
                  { name: 'Onion (green)', category: 'Carbs', grams_per_block: 140 },
                  { name: 'Onion (dry)', category: 'Carbs', grams_per_block: 120 },
                  { name: 'Salad', category: 'Carbs', grams_per_block: 0 },
                  { name: 'Chickpeas (cooked)', category: 'Carbs', grams_per_block: 40 },
                  { name: 'Eggplant', category: 'Carbs', grams_per_block: 380 },
                  { name: 'Pepper', category: 'Carbs', grams_per_block: 270 },
                  { name: 'Pepper (cooked)', category: 'Carbs', grams_per_block: 140 },
                  { name: 'Leeks', category: 'Carbs', grams_per_block: 100 },
                  { name: 'Zucchini', category: 'Carbs', grams_per_block: 360 },
                  { name: 'Zucchini (cooked)', category: 'Carbs', grams_per_block: 180 },
                  { name: 'Celery', category: 'Carbs', grams_per_block: 130 },
                  { name: 'Beans', category: 'Carbs', grams_per_block: 25 },
                  { name: 'Beans (cooked)', category: 'Carbs', grams_per_block: 50 },
                  { name: 'Potatoes', category: 'Carbs', grams_per_block: 60 },
                  { name: 'Potatoes (cooked)', category: 'Carbs', grams_per_block: 45 },
                  { name: 'Peas (frozen)', category: 'Carbs', grams_per_block: 100 },
                  { name: 'Pumpkin', category: 'Carbs', grams_per_block: 140 },
                  { name: 'Pumpkin (cooked)', category: 'Carbs', grams_per_block: 100 },
                  { name: 'Corn (bolied)', category: 'Carbs', grams_per_block: 40 },
                  { name: 'Beetroot', category: 'Carbs', grams_per_block: 130 },
                  { name: 'Blueberries', category: 'Carbs', grams_per_block: 80 },
                  { name: 'Grape', category: 'Carbs', grams_per_block: 80 },
                  { name: 'Grapefruit', category: 'Carbs', grams_per_block: 140 },
                  { name: 'Kiwi', category: 'Carbs', grams_per_block: 60 },
                  { name: 'Pear', category: 'Carbs', grams_per_block: 75 },
                  { name: 'Appricot', category: 'Carbs', grams_per_block: 3 },
                  { name: 'Apple', category: 'Carbs', grams_per_block: 100 },
                  { name: 'Orange', category: 'Carbs', grams_per_block: 100 },
                  { name: 'Pomelo', category: 'Carbs', grams_per_block: 100 },
                  { name: 'Cherries', category: 'Carbs', grams_per_block: 8 },
                  { name: 'Strawberries', category: 'Carbs', grams_per_block: 140 },
                  { name: 'Raspberries', category: 'Carbs', grams_per_block: 130 },
                  { name: 'Pomegranate', category: 'Carbs', grams_per_block: 60 },
                  { name: 'Cherrie (sour)', category: 'Carbs', grams_per_block: 10 },
                  { name: 'Blackberries', category: 'Carbs', grams_per_block: 130 },
                  { name: 'Tangerine', category: 'Carbs', grams_per_block: 75 },
                  { name: 'Plums', category: 'Carbs', grams_per_block: 90 },
                  { name: 'Oats', category: 'Carbs', grams_per_block: 14 },
                  { name: 'Kinoa', category: 'Carbs', grams_per_block: 14 },
                  { name: 'Rice', category: 'Carbs', grams_per_block: 12 },
                  { name: 'Rice (boiled)', category: 'Carbs', grams_per_block: 35 },
                  { name: 'Flour', category: 'Carbs', grams_per_block: 14 },
                  { name: 'Pasta', category: 'Carbs', grams_per_block: 14 },
                  { name: 'Bread', category: 'Carbs', grams_per_block: 25 },
                  { name: 'Beer', category: 'Carbs', grams_per_block: 260 },
                  { name: 'Wine', category: 'Carbs', grams_per_block: 90 },
                  { name: 'Alcohol', category: 'Carbs', grams_per_block: 30 },
                  { name: 'Honey', category: 'Carbs', grams_per_block: 12 },
                  { name: 'Agave', category: 'Carbs', grams_per_block: 12 },
                  { name: 'Maple syrup', category: 'Carbs', grams_per_block: 12 },
                  { name: 'Melasa', category: 'Carbs', grams_per_block: 12 },
                  { name: 'Jam', category: 'Carbs', grams_per_block: 12 },
                  { name: 'Jam (no sugar)', category: 'Carbs', grams_per_block: 25 },
                  { name: 'Pineapple', category: 'Carbs', grams_per_block: 75 },
                  { name: 'Banana', category: 'Carbs', grams_per_block: 40 },
                  { name: 'Watermelon', category: 'Carbs', grams_per_block: 120 },
                  { name: 'Melon', category: 'Carbs', grams_per_block: 100 },
                  { name: 'Dates', category: 'Carbs', grams_per_block: 12 },
                  { name: 'Fig', category: 'Carbs', grams_per_block: 12 },
                  { name: 'Peach', category: 'Carbs', grams_per_block: 110 },
                  { name: 'Peaches', category: 'Carbs', grams_per_block: 110 },
                  { name: 'Avocado', category: 'Fats', grams_per_block: 10 },
                  { name: 'Olive oil', category: 'Fats', grams_per_block: 0.33 },
                  { name: 'Olives', category: 'Fats', grams_per_block: 11 },
                  { name: 'Tahini', category: 'Fats', grams_per_block: 3 },
                  { name: 'Cashew', category: 'Fats', grams_per_block: 2 },
                  { name: 'Peanuts', category: 'Fats', grams_per_block: 6 },
                  { name: 'Almonds', category: 'Fats', grams_per_block: 3 },
                  { name: 'Hazelnuts', category: 'Fats', grams_per_block: 3 },
                  { name: 'Pistachios', category: 'Fats', grams_per_block: 3 },
                  { name: 'Mayonnaise', category: 'Fats', grams_per_block: 0.33 },
                  { name: 'Cacao beans', category: 'Fats', grams_per_block: 3 },
                  { name: 'Butter', category: 'Fats', grams_per_block: 0.33 },
                  { name: 'Coconut butter', category: 'Fats', grams_per_block: 0.33 },
                  { name: 'Cream (sour)', category: 'Fats', grams_per_block: 0.5 },
                  { name: 'Pork oil', category: 'Fats', grams_per_block: 0.33 },
                  { name: 'GHI', category: 'Fats', grams_per_block: 0.33 },
                ];

                FoodInfo.forEach(food => {
                  tx.executeSql(
                    'INSERT INTO foods (name, category, grams_per_block) VALUES (?, ?, ?);',
                    [food.name, food.category, food.grams_per_block]
                  );
                });
              }
            },
            (t, error) => {
              console.log("Error checking if table is empty", error);
            }
          );
        },
        (_, error) => {
          console.log('Error creating table', error)
          reject(error);
        }
      );
    });
  })
}

export { initDb, db};