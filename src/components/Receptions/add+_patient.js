// AddPatientModal.js

import React, { useContext, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Card,
} from '@mui/material';
import { AppContext } from '../../context/context';
import { apiList } from '../../utils/apiList/api';
import Action from '../../context/action';

const AddPatientModal = ({ open, onClose, onAdd }) => {
    const {apiPostCall, state:{addPatient}} = useContext(AppContext)
    const [newPatient, setNewPatient] = useState({
       
    });
    const [addPatientLoading, setAddPatientLoading] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPatient({
            ...newPatient,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAddPatientLoading(true)
        apiPostCall(apiList.addPatient,Action?.addPatient,newPatient).then(res => {
          setAddPatientLoading(false)
          if(res.code === 200){
            onClose(); // Close modal after adding
            setNewPatient({}); // Reset form
          }
        })
       
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Patient</DialogTitle>
            <DialogContent>
                <Card variant="outlined" sx={{ p: 2 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="dense"
                            name="name"
                            label="Name"
                            fullWidth
                            variant="outlined"
                            value={newPatient.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            value={newPatient.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            name="age"
                            label="Age"
                            fullWidth
                            variant="outlined"
                            type="number"
                            value={newPatient.age}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            name="condition"
                            label="Condition"
                            fullWidth
                            variant="outlined"
                            value={newPatient.condition}
                            onChange={handleChange}
                        />
                         <TextField
                            margin="dense"
                            name="blood_group"
                            label="Blood group"
                            fullWidth
                            variant="outlined"
                            value={newPatient.blood_group}
                            onChange={handleChange}
                        />
                        
                        <TextField
                            margin="dense"
                            name="phone"
                            label="Phone"
                            fullWidth
                            variant="outlined"
                            value={newPatient.phone}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="address"
                            label="Address"
                            fullWidth
                            variant="outlined"
                            value={newPatient.address}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="dob"
                            label="Date of Birth"
                            fullWidth
                            variant="outlined"
                            type="date"
                            value={newPatient.dob}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="dense"
                            name="emergency_contact"
                            label="Emergency Contact"
                            fullWidth
                            variant="outlined"
                            value={newPatient.emergencyContact}
                            onChange={handleChange}
                        />
                        <DialogActions>
                            <Button onClick={onClose} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </form>
                </Card>
            </DialogContent>
        </Dialog>
    );
};

export default AddPatientModal;
