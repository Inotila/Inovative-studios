const { client } = require('../contentful_connector/contentful');

const fetchProjectsFromContentful = async () => {
  try {
    console.log("Fetching Projects from Contentful...");

    const projectEntries = await client.getEntries({ content_type: 'project' });

    const projects = projectEntries.items.map((item) => {
      const fields = item.fields;

      const thumbnailUrl = fields.thumbnailCover?.fields?.file?.url;

      return {
        id: item.sys.id,
        Title: fields.title,
        SummaryDescription: fields.summaryDescription,
        GeneralDescription: fields.generalDescription,
        Link: fields.link || null,
        ThumbnailCover: thumbnailUrl,
        ProjectOwner: fields.projectOwner,
        FundingGoals: fields.fundingGoals || null,
        ReleaseDate: fields.releaseDate,
        ProjectReleaseStatus: fields.projectReleaseStatus,
        Version: fields.version
      };
    });

    console.log(`Fetched ${projects.length} projects`);
    return projects;

  } catch (err) {
    console.error('Error fetching projects from Contentful:', err);
    throw err;
  }
};

module.exports = { fetchProjectsFromContentful };
