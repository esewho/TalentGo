const RemotiveApi = require("../../remotive-api/remotive-api.lib");
const { Op } = require("sequelize");

const { Job } = require("../common/config/db");
const { Category } = require("../common/config/db");

class JobsController {
  static async getJobs() {
    try {
      const jobsFromDb = await Job.findAll({
        include: {
          model: Category,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      });

      const jobs = await RemotiveApi.getJobs({ limit: 20 });

      return [...jobsFromDb, ...jobs];
    } catch (error) {
      throw new Error(`Error al obtener los trabajos: ${error.message}`);
    }
  }

  static async getJobsById(idJob, company_name) {
    try {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      if (!uuidRegex.test(idJob)) {
        const jobFromApi = RemotiveApi.getCompany_nameJobs(idJob, company_name);

        return jobFromApi;
      }

      const jobFromDb = await Job.findOne({
        where: { id: idJob },
        include: {
          model: Category,
          atributes: ["id", "name"],
          through: { attributes: [] },
        },
      });
      if (jobFromDb) {
        return jobFromDb;
      }
    } catch (error) {
      throw new Error(
        `Error al obtener el trabajo con ID ${idJob}: ${error.message}`
      );
    }
  }
  static async searchJobsByTitle(title) {
    try {
      const lowerTitle = title.toLowerCase();

      const jobsFromDb = await Job.findAll({
        where: {
          title: {
            [Op.iLike]: `%${lowerTitle}%`,
          },
        },
        include: {
          model: { Category },
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        limit: 15,
      });

      if (jobsFromDb && jobsFromDb.length > 0) {
        return jobsFromDb;
      }

      const jobFromApi = await RemotiveApi.getJobsByTitle(title);

      if (jobFromApi) {
        return jobFromApi.slice(0, 15);
      }
      return [];
    } catch (error) {
      throw new Error("Error al realizar la búsqueda");
    }
  }
  static async createJob(job) {
    const newJob = await Job.create(job);

    let categoryDB = await Category.findOne({
      where: { name: job.category },
    });
    if (!categoryDB) {
      categoryDB = await Category.create({ name: job.category });
    }
    await newJob.addCategory(categoryDB);
    return newJob;
  }

  static async getCategories() {
    try {
      const categories = await RemotiveApi.getCategories();

      for (const name of categories) {
        await Category.findOrCreate({ where: { name: name } });
      }
      const allCategories = await Category.findAll({});
      return allCategories;
    } catch (error) {
      throw new Error("Error al manejar categorías" + error.message);
    }
  }
}
module.exports = JobsController;
