/**
 * Paginates an array of data based on the given page and limit values.
 *
 * @param {number} page - The current page number.
 * @param {number} limit - The maximum number of items to display per page.
 * @param {{ rows: any; count: number }} data - An object containing the data to paginate, with a `rows` array and a `count` of total items.
 * @returns {{ rows: any; pagination: { total_row: number; total_page: number; current_page: number; next_page: number|null } }}
 */
export const paginate = (
	page: number,
	limit: number,
	data: { rows: any; count: number }
): {
	pagination: { totalRow: number; totalPage: number; nextPage: number | null; currentPage: number };
	rows: any;
} => {
	const { count: totalRow, rows } = data;
	const currentPage = page;
	const totalPage = Math.ceil(totalRow / limit);
	const nextPage = page + 1 <= totalPage ? page + 1 : null;

	return {
		rows,
		pagination: { totalRow, totalPage, currentPage, nextPage }
	};
};
