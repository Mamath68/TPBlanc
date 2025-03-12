import * as SQLite from 'expo-sqlite';

interface Score {
  id?: number;
  userName: string;
  score: number;
  date: string;
}

export class ScoreDatabase {
  private DB_NAME = 'quiz.db';

  public DBInit = async () => {
    const db = await SQLite.openDatabaseAsync(this.DB_NAME);
      /*await db.execAsync(`
          DROP TABLE IF EXISTS scores;
      `);*/
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userName TEXT NOT NULL,
        score INTEGER NOT NULL,
        date TEXT NOT NULL
      );`);
  }

  public addScore = async (score: Score) => {
  try {
    const db = await SQLite.openDatabaseAsync(this.DB_NAME);
    await db.runAsync(
      'INSERT INTO scores (userName, score, date) VALUES (?, ?, ?);',
      [score.userName, score.score, score.date || new Date().toISOString()]
    );
    return true; // Indication de succès
  } catch (error) {
    console.error("Erreur lors de l'ajout du score:", error);
    return false; // Indication d'échec
  }
};

  public getScores = async (): Promise<Score[]> => {
  try {
    const db = await SQLite.openDatabaseAsync(this.DB_NAME);
    return await db.getAllAsync<Score>('SELECT * FROM scores ORDER BY score DESC;');
  } catch (error) {
    console.error("Erreur lors de la récupération des scores:", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
};
}
