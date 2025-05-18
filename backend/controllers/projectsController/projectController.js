const contentStore = require('../../utils/js/contentStore');

const getAllProjects = async (req, res) => {
  try {
    const projects = contentStore.getProjects();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error in getAllProjects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

module.exports = { getAllProjects };
