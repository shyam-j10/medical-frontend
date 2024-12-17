import React, { useContext, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { AppContext } from '../../../context/context';
import { apiList } from '../../../utils/apiList/api';
import Action from '../../../context/action';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const {state : {registerUser},apiPostCall} = useContext(AppContext)
  const [registerData, setRegisterData] = useState({})
  const navigate = useNavigate()
  const registgerChangeHandler = (e) => {
    const {name, value} = e.target
    setRegisterData({...registerData,[name]:value})

  }
  console.log(registerData,"./////////// register datt")
  const handleRegister = (event) => {
    event.preventDefault();
    apiPostCall(apiList.registerUser,Action.registerUser,registerData).then(res => {
      if(res.code === 200){
        localStorage.setItem("medicalToken", res.data.accessToken)
        navigate("/medical/receptions")
      }
    })
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleRegister} onChange={registgerChangeHandler}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
          />
          <FormControl fullWidth margin="normal" required>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            label="Role"
            value={registerData?.role}
            onChange={(e) => setRegisterData({...registerData, role:e.target.value})}
          >
              <MenuItem value="" disabled>
              <em>Select Role</em> {/* Placeholder */}
            </MenuItem>
            <MenuItem value="reception">Reception</MenuItem>
            <MenuItem value="doctor">Doctor</MenuItem>
          </Select>
        </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </form>
        <Typography variant="body2" align="center">
          Already have an account?{' '}
          <Link href="/login" variant="body2">
            Log in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Registration;
