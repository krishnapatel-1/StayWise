import express from 'express';
import {Router} from 'express';
import PropertyDetailSchema from '../models/PropertyDetails.js';

const router=Router();
// GET /api/locations?q=query
router.get('/locations', async (req, res) => {
  try {
    const search = req.query.q || '';
    const regex = new RegExp(search, 'i'); // case-insensitive partial match

    const cities = await PropertyDetailSchema.aggregate([
      { $match: { 'location.city': regex } },              // Match cities with query
      { $group: { _id: '$location.city' } },                // Get distinct city names
      { $sort: { _id: 1 } }                                 // Sort alphabetically
    ]);

    const result = cities.map(city => city._id);            // Extract city names
    res.json(result);                                       // Send to frontend
  } catch (err) {
    console.error('Error in /api/locations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
