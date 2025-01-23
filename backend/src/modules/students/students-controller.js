const asyncHandler = require("express-async-handler");
const { 
    getAllStudents, 
    addNewStudent, 
    getStudentDetail, 
    setStudentStatus, 
    updateStudent 
} = require("./students-service");


const handleGetAllStudents = asyncHandler(async (req, res) => {
    try {
        const filters = req.query;
        const students = await getAllStudents(filters);
        res.status(200).json(students);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Error fetching students" });
    }
});

const handleAddStudent = asyncHandler(async (req, res) => {
    try {
        const payload = req.body; 
        const result = await addNewStudent(payload);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Error adding student" });
    }
});


const handleUpdateStudent = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params; 
        const updates = { ...req.body, id }; 
        const result = await updateStudent(updates);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Error updating student" });
    }
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params; 
        const student = await getStudentDetail(id);
        res.status(200).json(student);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Error fetching student details" });
    }
});


const handleStudentStatus = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params; 
        const { status } = req.body; 
        const reviewerId = req.user.id; 
        const result = await setStudentStatus({ userId: id, reviewerId, status });
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Error updating student status" });
    }
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};

