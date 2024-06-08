import Student from "../models/StudentsModel.js";

const Home = (req, res) => {
  res.send("this is home route");
};

const AddStudentData = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json({
      success: true,
      message: "data added successfully",
      newStudent,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Please check id",
      err,
    });
  }
};

const ReadStudentData = async (req, res) => {
  try {
    const page = req.query.page || 1; // Default page is 1 if not provided
    const limit = 20; // Number of records per page

    const totalData = await Student.countDocuments(); // Get the total count of documents
    const totalPages = Math.ceil(totalData / limit); // Calculate the total pages

    let currentPage = parseInt(page);
    if (currentPage > totalPages) {
      currentPage = totalPages; // Set current page to the last page if requested page is greater
    }

    const skip = (currentPage - 1) * limit; // Calculate the number of records to skip

    const result = await Student.find().select("-__v").skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      currentPage: currentPage,
      totalPages: totalPages,
      totalData: totalData,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in getting data",
    });
  }
};

const searchByName = async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    const page = req.query.page || 1;
    const limit = 20;

    let query = {};

    if (first_name && last_name) {
      query = {
        $or: [
          { first_name: { $regex: new RegExp(`^${first_name}`, "i") } },
          { last_name: { $regex: new RegExp(`^${last_name}`, "i") } },
        ],
      };
    } else if (first_name) {
      query = { first_name: { $regex: new RegExp(`^${first_name}`, "i") } };
    } else if (last_name) {
      query = { last_name: { $regex: new RegExp(`^${last_name}`, "i") } };
    } else {
      return res.status(400).json({
        success: false,
        message:
          "Please provide at least one field (first_name or last_name) to search.",
      });
    }

    const totalResults = await Student.countDocuments(query);
    const totalPages = Math.ceil(totalResults / limit);
    let currentPage = parseInt(page);
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    const skip = (currentPage - 1) * limit;

    const results = await Student.find(query)
      .select("-__v")
      .skip(skip)
      .limit(limit);

    if (results.length > 0) {
      return res.status(200).json({
        success: true,
        currentPage: currentPage,
        totalPages: totalPages,
        totalResults: totalResults,
        data: results,
      });
    }

    res.status(404).json({ success: false, message: "No records found" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in searching data",
    });
  }
};

const filterStudents = async (req, res) => {
  try {
    let { domain, gender, availability } = req.body;
    const page = req.query.page || 1;
    const limit = 20;

    const filterCriteria = {};

    if (domain && gender) {
      filterCriteria.domain = domain;
      filterCriteria.gender = gender;
    } else if (domain) {
      filterCriteria.domain = domain;
    } else if (gender) {
      filterCriteria.gender = gender;
    } else if (availability !== null) {
      filterCriteria.available = availability;
    } else {
      return res.status(400).json({
        success: false,
        message: "At least one filtering parameter is required",
      });
    }

    const totalResults = await Student.countDocuments(filterCriteria);
    const totalPages = Math.ceil(totalResults / limit);
    let currentPage = parseInt(page);
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    const skip = (currentPage - 1) * limit;

    const results = await Student.find(filterCriteria)
      .select("-__v")
      .skip(skip)
      .limit(limit);

    if (results.length > 0) {
      return res.status(200).json({
        success: true,
        currentPage: currentPage,
        totalPages: totalPages,
        totalResults: totalResults,
        data: results,
      });
    }

    res.status(404).json({ success: false, message: "No records found" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in filtering data",
    });
  }
};

const GetStudentById = async (req, res) => {
  try {
    const customId = req.params.id; // Extracting the custom id from route parameter

    let result = await Student.findOne({ id: customId }).select("-__v"); // Modify the query to find by your custom 'id'

    if (result) {
      return res.status(200).json({
        success: true,
        data: result,
      });
    }

    res.status(404).json({ success: false, message: "No record found" });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error in getting data based on id",
    });
  }
};

const UpdateById = async (req, res) => {
  try {
    const customId = parseInt(req.params.id); // Extracting the custom id from route parameters

    const result = await Student.findOneAndUpdate({ id: customId }, req.body, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (result) {
      return res.status(200).json({
        success: true,
        data: result,
      });
    }

    res.status(404).json({ success: false, message: "No record found" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error in updating the data ${error}`,
    });
  }
};

const DeleteById = async (req, res) => {
  try {
    const customId = parseInt(req.params.id); // Extracting the custom id from route parameters

    const result = await Student.findOneAndDelete({ id: customId });

    if (result) {
      return res.status(204).json({
        success: true,
        message: "Successfully deleted",
      });
    }

    res.status(404).json({ success: false, message: "No record found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in deleting the data",
    });
  }
};

export {
  Home,
  AddStudentData,
  ReadStudentData,
  searchByName,
  filterStudents,
  GetStudentById,
  UpdateById,
  DeleteById,
};
