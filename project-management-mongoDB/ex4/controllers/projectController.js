const Project = require('../models/projectModel');
const Member = require('../models/memberModel');
const mongoose = require('mongoose');

// Create Member
exports.createMember = async (req, res) => {
  try {
    const { name, email } = req.body;
    const member = new Member({ name, email });
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create Project
exports.createProject = async (req, res) => {
  try {
    const { name, summary, start_date, manager, team } = req.body;
    const project = new Project({ name, summary, start_date, manager, team });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('manager').populate('team.member');
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add Image to Project
exports.addImageToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { thumb, description } = req.body;
    const project = await Project.findById(projectId);
    if (!project) throw new Error('Project not found');
    const image = { _id: new mongoose.Types.ObjectId(), thumb, description };
    project.images.push(image);
    await project.save();
    res.status(201).json(image);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Image from Project
exports.deleteImageFromProject = async (req, res) => {
  try {
    const { projectId, imageId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) throw new Error('Project not found');
    const imageIndex = project.images.findIndex(img => img._id.toString() === imageId);
    if (imageIndex === -1) throw new Error('Image not found');
    project.images.splice(imageIndex, 1);
    await project.save();
    res.status(200).json({ message: 'Image deleted' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
