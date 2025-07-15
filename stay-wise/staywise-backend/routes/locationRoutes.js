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
      { $match: {
        $or: [
            { 'location.city': regex },
            { 'location.street': regex }
          ] 
        }
      }, 
      {
        $project: {
          city: '$location.city',
          street: '$location.street',
        }
      },             
      { $group: { _id: {
            city: '$city',
            street: '$street'
          }
        } 
      },               
      { $sort: { 
          '_id.city': 1,
          '_id.street': 1 } }                                 // Sort alphabetically
    ]);

    const suggestions = cities.map(({ _id }) =>
      _id.street ? `${_id.street}, ${_id.city}` : _id.city
    );

    //const result = cities.map(city => city._id);            // Extract city names
    res.json(suggestions);                                       // Send to frontend
  } catch (err) {
    console.error('Error in /api/locations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
