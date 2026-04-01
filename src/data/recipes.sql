CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE,
  title TEXT,
  description TEXT,
  image_url TEXT,
  time TEXT,
  difficulty TEXT,
  servings TEXT,
  calories TEXT,
  rating FLOAT
);

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  recipe_id INT REFERENCES recipes(id),
  text TEXT
);

CREATE TABLE steps (
  id SERIAL PRIMARY KEY,
  recipe_id INT REFERENCES recipes(id),
  title TEXT,
  description TEXT,
  step_order INT
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE recipe_categories (
  recipe_id INT REFERENCES recipes(id),
  category_id INT REFERENCES categories(id)
);