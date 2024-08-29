// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
// require('dotenv').config();
// const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/usermanagementDB');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define User model
const User = mongoose.model('User', {
  name: String,
  email: String,
  phone: String,
  gender: String,
  heardAbout: [String],
  city: String,
  state: String,
  password: String,
});

// Middleware
app.use(express.json());

app.post('/api/AddUsers', async (req, res) => {
  try {
    // Create a new user based on the request body
    const newUser = new User(req.body);

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User registration endpoint
app.post('/api/users', async (req, res) => {
  const { name, email, phone, gender, heardAbout, city, state, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user with the hashed password
    const user = new User({
      name,
      email,
      phone,
      gender,
      heardAbout,
      city,
      state,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: 'User created successfully', user: { email: user.email } });
  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.put('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;

  try {
    // Find the user by ID and update the data
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/api/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (deletedUser) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return a token or any relevant data
    res.json({ message: 'Login successful', user: { email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
