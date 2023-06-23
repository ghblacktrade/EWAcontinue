import pool from "../db";

async function englishController(russianWord: string): Promise<string> {

    const client = await pool.connect()

    try {
 
        const result = await client.query(
            'SELECT eng_word FROM words WHERE rus_word = $1',
            [russianWord]
        )

        return result.rows[0].eng_word

    } finally {

        client.release()
    }
    
}

export default englishController