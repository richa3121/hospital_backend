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
    const { id, name, age } = req.body;

    // Check duplicate ID
    for (let p of patients) {
        if (p.id === id) {
            return res.json({ message: "Patient ID already exists" });
        }
    }

    patients.push({ id, name, age });
    res.json({ message: "Patient added successfully" });
});

/*
 DISPLAY ALL PATIENTS
*/
app.get("/patients", (req, res) => {
    res.json(patients);
});

/*
 SEARCH PATIENT BY ID
*/
app.get("/search/:id", (req, res) => {
    const id = req.params.id;

    for (let p of patients) {
        if (p.id === id) {
            return res.json(p);
        }
    }

    res.json({ message: "Patient not found" });
});

/*
 DELETE PATIENT BY ID
*/
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
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
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});