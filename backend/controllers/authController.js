const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic input validation (add more as needed)
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        // More specific error handling (e.g., duplicate key error)
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Username or email already exists.' });
        }
        res.status(500).json({ message: err.message });
    }
};

// Login a user
exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      // User Lookup console log
      console.log("User found:", user); // This will log the user object or null

      if (!user) return res.status(401).json({ message: 'Invalid credentials' });

      console.log("Entered password:", password);
      console.log("Stored hashed password:", user.password);

      const isMatch = await bcrypt.compare(password, user.password);

      console.log("Password match:", isMatch);

      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
// ... other controller functions ...

// Update a user
exports.updateUser = async (req, res) => {
  try {
      const { id } = req.params;
      const updates = req.body; // Fields to update (e.g., username, email)

      // Exclude password from updates if not provided (for security)
      if (!updates.password) {
          delete updates.password;
      }

      const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
// ... other controller functions ...

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User deleted successfully' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
// ... other controller functions ...

// Get a user
exports.getUser = async (req, res) => {
  try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};