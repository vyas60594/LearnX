import pool from './src/config/db.js';

async function seed() {
  try {
    const pythonContent = {
      levels: [
        {
          id: 1, title: 'Beginner Level', badge: 'Beginner',
          description: 'Learn Python fundamentals: syntax, variables, and control flow.',
          modules: [
            { id: 101, title: 'Python Basics', type: 'module', duration: '45 min', desc: 'Introduction to Python.', color: 'indigo' },
            { 
              id: 102, title: 'Basics Quiz', type: 'test', duration: '15 min', desc: 'Test your knowledge.', 
              questions: [
                { question: 'What is Python?', options: ['Snake', 'Language', 'Fruit', 'Car'], correct: 1 },
                { question: 'Who developed Python?', options: ['Guido van Rossum', 'Elon Musk', 'Bill Gates', 'Steve Jobs'], correct: 0 }
              ] 
            }
          ]
        }
      ]
    };

    await pool.query(
      "INSERT INTO skill_paths (title, description, image_url, color, status, content, modules_count, levels_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        'Python Mastery', 
        'Master Python from zero to hero.', 
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800', 
        'blue', 
        'Published', 
        pythonContent,
        2,
        1
      ]
    );

    console.log('Seeded initial skill path successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
