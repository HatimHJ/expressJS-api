const sql_create = `CREATE TABLE IF NOT EXISTS Books (
  Book_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Title VARCHAR(100) NOT NULL,
  Author VARCHAR(100) NOT NULL,
  Comments TEXT
);`;

const sql_seeding = `INSERT INTO Books (Book_ID, Title, Author, Comments) VALUES
  (1, 'Mrs. Bridge', 'Evan S. Connell', 'First in the serie'),
  (2, 'Mr. Bridge', 'Evan S. Connell', 'Second in the serie'),
  (3, 'L''ingénue libertine', 'Colette', 'Minne + Les égarements de Minne');`;

const sql_get_all = "SELECT * FROM Books ORDER BY Book_ID DESC;";

const sql_get_one = (id) => {
	return `SELECT * FROM books where Book_ID = ${id};`;
};

const sql_delete = (id) => {
	return `DELETE FROM books WHERE Book_ID = ${id}`;
};

const sql_update = (id, oldValue, newValue) => {
	return `UPDATE books set 
					Title = '${newValue.title || oldValue.Title}', 
					Author = '${newValue.author || oldValue.Author}' ,
					Comments = '${newValue.comments || oldValue.Comments}'
					WHERE Book_ID = ${id}`;
};

const sql_insert = (data) => {
	const sql = `INSERT INTO Books (Title, Author, Comments) VALUES (?,?,?);`;
	const params = [data.title, data.author, data.comments];
	return { sql, params };
};

module.exports = {
	sql_insert,
	sql_seeding,
	sql_create,
	sql_get_all,
	sql_get_one,
	sql_update,
	sql_delete,
};
