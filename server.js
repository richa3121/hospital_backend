// Import required modules
const express = require("express");
const cors = require("cors");

// Create server
const app = express();
app.use(cors());
app.use(express.json());

// This array works like a singly linked list
let patients = [];

/*
 ADD PATIENT
 Similar to inserting node at end of linked list
*/
app.post("/add", (req, res) => {
    let { id, name, age } = req.body;

    // Convert id to string for consistency
    id = String(id);

    // Default values if not provided
    name = name || "Unknown";
    age = age || "Unknown";

    // Check duplicate ID
    for (let p of patients) {
        if (p.id === id) {
            return res.json({ message: "Patient ID already exists" });
        }
    }

    patients.push({ id, name, age });
    res.json({ message: "Patient added successfully", patient: { id, name, age } });
});

/*
 DISPLAY ALL PATIENTS
*/
app.get("/patients", (req, res) => {
    // Ensure no patient has undefined name or age
    const safePatients = patients.map(p => ({
        id: p.id,
        name: p.name || "Unknown",
        age: p.age || "Unknown"
    }));
    res.json(safePatients);
});

/*
 SEARCH PATIENT BY ID
*/
app.get("/search/:id", (req, res) => {
    const id = String(req.params.id); // convert to string for comparison

    const patient = patients.find(p => p.id === id);

    if (patient) {
        // Ensure name and age are never undefined
        res.json({
            id: patient.id,
            name: patient.name || "Unknown",
            age: patient.age || "Unknown"
        });
    } else {
        res.json({ message: "Patient not found" });
    }
});

/*
 DELETE PATIENT BY ID
*/
app.delete("/delete/:id", (req, res) => {
    const id = String(req.params.id);
    const before = patients.length;

    patients = patients.filter(p => p.id !== id);

    if (patients.length === before) {
        res.json({ message: "Patient not found" });
    } else {
        res.json({ message: "Patient deleted successfully" });
    }
});

/*
 COUNT TOTAL PATIENTS
*/
app.get("/count", (req, res) => {
    res.json({ total: patients.length });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
