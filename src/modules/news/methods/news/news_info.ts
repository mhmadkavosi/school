import { Sequelize } from 'sequelize';
import { AppLogger } from '../../../../lib/logger/Logger';
import { paginate } from '../../../../utils/paginate.utility';
import SchoolModel from '../../../school/models/school.model';
import SectionModel from '../../../school/models/section.model';
import NewsModel from '../../models/news.model';
import NewsCategoryModel from '../../models/news_category.model';
import ClassesModel from '../../../school_class/models/classes.model';
import StudentModel from '../../../student/models/student.model';
import StudentClassesModel from '../../../student/models/student_class.model';

export class NewsInfo {
	async get_all_news_by_school_id(
		school_id: string,
		page: number,
		limit: number
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;

			const result = await NewsModel.findAndCountAll({
				where: { school_id },
				distinct: true,
				limit: limit,
				offset: skip,
				order: [['created_at', 'DESC']],
				include: [{ model: NewsCategoryModel }]
			});

			return {
				is_success: true,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in NewsInfo get_all_news_by_school_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_all_news_by_student_id(
		student_id: string,
		page: number,
		limit: number
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;

			const result = await NewsModel.findAndCountAll({
				distinct: true,
				limit: limit,
				offset: skip,
				order: [['created_at', 'DESC']],
				include: [
					{ model: NewsCategoryModel },
					{
						model: SchoolModel,
						as: 'school',
						required: true,
						include: [
							{
								model: ClassesModel,
								as: 'classes',
								required: true,
								attributes: ['id', 'name'],
								include: [
									{
										model: StudentClassesModel,
										include: [
											{
												model: StudentModel,
												where: { id: student_id },
												required: true,
												attributes: ['id']
											}
										]
									}
								]
							}
						]
					}
				]
			});

			return {
				is_success: true,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in NewsInfo get_all_news_by_student_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_count_news_by_student_id(student_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NewsModel.count({
				include: [
					{
						model: SchoolModel,
						as: 'school',
						required: true,
						include: [
							{
								model: ClassesModel,
								as: 'classes',
								required: true,
								attributes: ['id', 'name'],
								include: [
									{
										model: StudentClassesModel,
										include: [
											{
												model: StudentModel,
												where: { id: student_id },
												required: true,
												attributes: ['id']
											}
										]
									}
								]
							}
						]
					}
				]
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in NewsInfo get_count_news_by_student_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_all_news_by_category_id(
		news_category_id: string,
		page: number,
		limit: number,
		sort: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;

			let sort_value = '';
			if (sort === 'max_count') {
				sort_value = 'DESC';
			} else if (sort === 'min_count') {
				sort_value = 'ASC';
			}

			const result = await NewsModel.findAndCountAll({
				where: { news_category_id },
				distinct: true,
				limit: limit,
				offset: skip,
				order: [['views', sort_value]],
				include: [{ model: NewsCategoryModel }]
			});

			return {
				is_success: true,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in NewsInfo get_all_news_by_category_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_info_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NewsModel.findOne({ where: { id } });

			return { is_success: !!result, data: result };
		} catch (error) {
			AppLogger.error('Error in NewsInfo get_info_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_counts(school_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NewsModel.count({ where: { school_id } });

			return { is_success: !!result, data: result };
		} catch (error) {
			AppLogger.error('Error in NewsInfo get_counts', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_total_news(): Promise<RestApi.ObjectResInterface> {
		try {
			const totalNews = await NewsModel.count();
			return {
				is_success: true,
				data: totalNews
			};
		} catch (error) {
			AppLogger.error('Error in get_total_news', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_total_news_by_section(): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NewsModel.findAll({
				include: [
					{
						model: SchoolModel,
						as: 'school', // Must match the alias used in NewsModel.belongsTo(SchoolModel, { as: 'school' })
						required: true, // Only count news items that belong to a school
						attributes: [],
						include: [
							{
								model: SectionModel,
								as: 'section', // Must match the alias used in SchoolModel.belongsTo(SectionModel, { as: 'section' })
								required: true, // Only include schools that have an associated section
								attributes: [] // We only need the section name in the final output
							}
						]
					}
				],
				attributes: [
					// Count news items. Use the correct alias for the News model; if your model name is 'news', then:
					[Sequelize.fn('COUNT', Sequelize.col('news.id')), 'total_news'],
					// Retrieve the section name from the nested association
					[Sequelize.col('school.section.name'), 'section_name']
				],
				// Group by the section name to get totals per section.
				group: ['school.section.name'],
				raw: true
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in get_total_news_by_section', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_total_news_school(): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await NewsModel.findAll({
				attributes: [
					// Retrieve the school's name from the associated SchoolModel (alias "school")
					[Sequelize.col('school.name'), 'school_name'],
					[Sequelize.col('school.id'), 'school_id'],
					// Count the number of news items for each school.
					[Sequelize.fn('COUNT', Sequelize.col('news.id')), 'total_news']
				],
				include: [
					{
						model: SchoolModel,
						as: 'school', // Must match the alias used in NewsModel.belongsTo(SchoolModel, { as: 'school' })
						attributes: [] // No additional school attributes are needed for this query
					}
				],
				// Group by the school's name so that we get one row per school
				group: ['school.id'],
				raw: true
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in get_total_news_by_school', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}
