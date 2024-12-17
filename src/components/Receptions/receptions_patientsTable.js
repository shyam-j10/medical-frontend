// PatientsDataGrid.js

import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box,
    Card,
} from '@mui/material';
import AddPatientModal from './add+_patient'; // Adjust the path as necessary

const initialPatients = [
    // ... (your initial patient data here)
];

const PatientsDataGrid = () => {
    const [patients, setPatients] = useState(initialPatients);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleEditClick = (patient) => {
        setSelectedPatient(patient);
        setEditDialogOpen(true);
    };

    const handleDialogClose = () => {
        setEditDialogOpen(false);
        setSelectedPatient(null);
    };

    const handleSaveChanges = () => {
        setPatients((prevPatients) =>
            prevPatients.map((p) => (p.id === selectedPatient.id ? selectedPatient : p))
        );
        handleDialogClose();
    };

    const handleAddPatient = (newPatient) => {
        // Add a new patient with a unique ID
        const newId = patients.length ? Math.max(patients.map(p => p.id)) + 1 : 1;
        setPatients([...patients, { id: newId, ...newPatient }]);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'age', headerName: 'Age', width: 100 },
        { field: 'condition', headerName: 'Condition', width: 150 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'dob', headerName: 'Date of Birth', width: 150 },
        { field: 'emergencyContact', headerName: 'Emergency Contact', width: 180 },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 170,
            renderCell: (params) => (
                <Button variant="contained" color="primary" onClick={() => handleEditClick(params.row)}>
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <div style={{ width: "100%", marginTop: "7vw" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2vw" }}>
                <p>Patient Lists</p>
                <Button color="secondary" variant="outlined" onClick={() => setAddDialogOpen(true)}>
                    Add Patient
                </Button>
            </div>
            <DataGrid
                rows={patients}
                columns={columns}
                pageSize={5}
                disableSelectionOnClick
                sx={{
                    '& .MuiDataGrid-cell:hover': {
                        color: 'inherit',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'transparent',
                    },
                }}
            />

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Edit Patient</DialogTitle>
                <DialogContent>
                    <Card variant="outlined" sx={{ p: 2 }}>
                        {selectedPatient && (
                            <>
                                <TextField
                                    margin="dense"
                                    label="Name"
                                    fullWidth
                                    variant="outlined"
                                    value={selectedPatient.name}
                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, name: e.target.value })}
                                />
                                <TextField
                                    margin="dense"
                                    label="Email"
                                    fullWidth
                                    variant="outlined"
                                    value={selectedPatient.email}
                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, email: e.target.value })}
                                />
                                <TextField
                                    margin="dense"
                                    label="Age"
                                    fullWidth
                                    variant="outlined"
                                    type="number"
                                    value={selectedPatient.age}
                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, age: e.target.value })}
                                />
                                <TextField
                                    margin="dense"
                                    label="Condition"
                                    fullWidth
                                    variant="outlined"
                                    value={selectedPatient.condition}
                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, condition: e.target.value })}
                                />
                                <TextField
                                    margin="dense"
                                    label="Phone"
                                    fullWidth
                                    variant="outlined"
                                    value={selectedPatient.phone}
                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, phone: e.target.value })}
                                />
                                <TextField
                                    margin="dense"
                                    label="Address"
                                    fullWidth
                                    variant="outlined"
                                    value={selectedPatient.address}
                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, address: e.target.value })}
                                />
                                <TextField
                                    margin="dense"
                                    label="Date of Birth"
                                    fullWidth
                                    variant="outlined"
                                    type="date"
                                    value={selectedPatient.dob}
                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, dob: e.target.value })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    margin="dense"
                                    label="Emergency Contact"
                                    fullWidth
                                    variant="outlined"
                                    value={selectedPatient.emergencyContact}
                                    onChange={(e) => setSelectedPatient({ ...selectedPatient, emergencyContact: e.target.value })}
                                />
                            </>
                        )}
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveChanges} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Patient Dialog */}
            <AddPatientModal
                open={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
                onAdd={handleAddPatient}
            />
        </div>
    );
};

export default PatientsDataGrid;
