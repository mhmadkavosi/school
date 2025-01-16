/**
 * Sequelize DB config.
 * Note: There is just one config for the database in every environment(stage, test, production).
 * Database change due to environment will be in "process.env.DATABASE_URL". Every environment will have its own DATABASE_URL.
 */

module.exports = {
	url: `${process.env.POSTGRES_URL}/${process.env.POSTGRES_DB}?sslmode=require`
};
