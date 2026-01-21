const axios = require('axios');

// Using Hugging Face free inference API (no API key required for basic usage)
const HF_API_URL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';

const Notice = require('../models/notice.model');
const Timetable = require('../models/timetable.model');
const Marks = require('../models/marks.model');
const Material = require('../models/material.model');
const Exam = require('../models/exam.model');

async function getNotices() {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 }).limit(5);
    return notices.map(n => `${n.title}: ${n.description}`).join('\n');
  } catch (error) {
    return 'Error fetching notices';
  }
}

async function getTimetable(branch, semester) {
  try {
    const timetables = await Timetable.find({ branch, semester });
    return timetables.map(t => `${t.day}: ${t.subjects.join(', ')}`).join('\n');
  } catch (error) {
    return 'Error fetching timetable';
  }
}

async function getMarks(studentId) {
  try {
    const marks = await Marks.find({ student: studentId }).populate('subject', 'name');
    return marks.map(m => `${m.subject.name}: ${m.marks}`).join('\n');
  } catch (error) {
    return 'Error fetching marks';
  }
}

async function getMaterials(branch, semester) {
  try {
    const materials = await Material.find({ branch, semester }).populate('subject', 'name');
    return materials.map(m => `${m.subject.name}: ${m.title} - ${m.description}`).join('\n');
  } catch (error) {
    return 'Error fetching materials';
  }
}

async function getExams(branch, semester) {
  try {
    const exams = await Exam.find({ branch, semester });
    return exams.map(e => `${e.subject}: ${e.date} - ${e.time}`).join('\n');
  } catch (error) {
    return 'Error fetching exams';
  }
}

const tools = [
  {
    type: "function",
    function: {
      name: "getNotices",
      description: "Get the latest notices for the college",
      parameters: {
        type: "object",
        properties: {},
        required: []
      }
    }
  },
  {
    type: "function",
    function: {
      name: "getTimetable",
      description: "Get the timetable for a specific branch and semester",
      parameters: {
        type: "object",
        properties: {
          branch: { type: "string", description: "The branch name" },
          semester: { type: "string", description: "The semester number" }
        },
        required: ["branch", "semester"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "getMarks",
      description: "Get the marks for a specific student",
      parameters: {
        type: "object",
        properties: {
          studentId: { type: "string", description: "The student ID" }
        },
        required: ["studentId"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "getMaterials",
      description: "Get the study materials for a specific branch and semester",
      parameters: {
        type: "object",
        properties: {
          branch: { type: "string", description: "The branch name" },
          semester: { type: "string", description: "The semester number" }
        },
        required: ["branch", "semester"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "getExams",
      description: "Get the exam schedule for a specific branch and semester",
      parameters: {
        type: "object",
        properties: {
          branch: { type: "string", description: "The branch name" },
          semester: { type: "string", description: "The semester number" }
        },
        required: ["branch", "semester"]
      }
    }
  }
];

const chatWithAI = async (req, res) => {
  try {
    const { message, userType } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const lowerMessage = message.toLowerCase();
    let reply = '';

    // Simple keyword-based function calling for free AI
    if (lowerMessage.includes('notice')) {
      const notices = await getNotices();
      reply = `Here are the latest notices:\n${notices}`;
    } else if (lowerMessage.includes('timetable') || lowerMessage.includes('schedule')) {
      // Extract branch and semester from message (simple parsing)
      const branchMatch = lowerMessage.match(/branch\s+(\w+)/i);
      const semesterMatch = lowerMessage.match(/semester\s+(\d+)/i);
      const branch = branchMatch ? branchMatch[1] : 'Computer Science'; // default
      const semester = semesterMatch ? semesterMatch[1] : '1'; // default
      const timetable = await getTimetable(branch, semester);
      reply = `Timetable for ${branch} Branch, Semester ${semester}:\n${timetable}`;
    } else if (lowerMessage.includes('mark') || lowerMessage.includes('grade')) {
      // For demo, use a sample student ID - in real app, get from user session
      const marks = await getMarks('507f1f77bcf86cd799439011'); // sample ObjectId
      reply = `Your marks:\n${marks}`;
    } else if (lowerMessage.includes('material') || lowerMessage.includes('study')) {
      const branchMatch = lowerMessage.match(/branch\s+(\w+)/i);
      const semesterMatch = lowerMessage.match(/semester\s+(\d+)/i);
      const branch = branchMatch ? branchMatch[1] : 'Computer Science';
      const semester = semesterMatch ? semesterMatch[1] : '1';
      const materials = await getMaterials(branch, semester);
      reply = `Study materials for ${branch} Branch, Semester ${semester}:\n${materials}`;
    } else if (lowerMessage.includes('exam')) {
      const branchMatch = lowerMessage.match(/branch\s+(\w+)/i);
      const semesterMatch = lowerMessage.match(/semester\s+(\d+)/i);
      const branch = branchMatch ? branchMatch[1] : 'Computer Science';
      const semester = semesterMatch ? semesterMatch[1] : '1';
      const exams = await getExams(branch, semester);
      reply = `Exam schedule for ${branch} Branch, Semester ${semester}:\n${exams}`;
    } else {
      // Use free Hugging Face API for general responses
      try {
        const hfResponse = await axios.post(HF_API_URL, {
          inputs: {
            past_user_inputs: [],
            generated_responses: [],
            text: message
          },
          parameters: {
            max_length: 100,
            temperature: 0.7
          }
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (hfResponse.data && hfResponse.data.generated_text) {
          reply = hfResponse.data.generated_text;
        } else {
          reply = "I'm here to help with college information. Try asking about notices, timetable, marks, materials, or exams.";
        }
      } catch (hfError) {
        console.error('Hugging Face API error:', hfError);
        reply = "I'm here to help with college information. Try asking about notices, timetable, marks, materials, or exams.";
      }
    }

    return res.json({ reply });
  } catch (error) {
    console.error('Chatbot error:', error);
    return res.status(500).json({ error: 'Error processing the request.' });
  }
};

module.exports = { chatWithAI };