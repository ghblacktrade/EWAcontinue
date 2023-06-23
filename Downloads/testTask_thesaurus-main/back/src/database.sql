create TABLE person(

    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255)
)

create TABLE words (

    id SERIAL PRIMARY KEY,
    eng_word TEXT NOT NULL,
    derived_words TEXT NOT NULL,
    synonims TEXT NOT NULL,
    rus_translate VARCHAR(100),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
)


INSERT INTO words (eng_word, derived_words, synonims, rus_translate) VALUES('')