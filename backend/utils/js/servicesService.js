const { client } = require('../contentful_connector/contentful');

const fetchServicesFromContentful = async () => {
  try {
    console.log("Fetching Services from Contentful...");

    const serviceEntries = await client.getEntries({ content_type: 'service' });

    const services = serviceEntries.items.map((item) => {
      const fields = item.fields;

      const thumbnailUrl = fields.thumbnailCover?.fields?.file?.url;
      const typeOfService = fields.typeOfService?.fields?.title || null;
      const relatedProjects = Array.isArray(fields.relatedProjects)
        ? fields.relatedProjects.map(proj => proj.fields?.title || null)
        : [];

      return {
        id: item.sys.id,
        Title: fields.title,
        TypeOfService: typeOfService,
        SummaryDescription: fields.summaryDescription,
        GeneralDescription: fields.generalDescription,
        DesignProcess: fields.designProcess,
        ThumbnailCover: thumbnailUrl,
        IsAvailable: fields.isAvailable,
        RelatedProjects: relatedProjects
      };
    });

    console.log(`Fetched ${services.length} services`);
    return services;

  } catch (err) {
    console.error('Error fetching services from Contentful:', err);
    throw err;
  }
};

module.exports = { fetchServicesFromContentful };
